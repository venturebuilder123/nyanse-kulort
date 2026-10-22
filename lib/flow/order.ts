// Validates an order from the checkout. Only known fields, sane lengths; the amount is computed
// here, never taken from the browser.

import { BRANDS, VOICES } from "@/lib/brand/config";
import type { BrandKey, VoiceKey } from "@/lib/brand/types";
import { SEASONS } from "@/lib/color/seasons";
import { sanitize, type Answers } from "./answers";
import { checkCode } from "./discount";
import { amountFor } from "./payment";
import type { Tier } from "./pricing";
import { parseReferral } from "./referral";

export type OrderRow = {
  ref: string; tier: Tier; amount_cents: number; brand: BrandKey; voice: VoiceKey | null; season: string | null;
  email: string; name: string | null; street: string | null; postcode: string | null; city: string | null;
  country: "NL" | "BE" | "DE" | null; friend_code: string | null; waiver: boolean;
  /** numbers only: enough to rebuild the guide on any device (never a photo) */
  profile: StoredProfile | null;
};

export type StoredProfile = { measurements?: unknown; hair?: string; jewel?: string; declared?: string; confirm?: Record<string, string>; locale?: "nl" | "en"; answers?: Answers };

const num = (v: unknown) => typeof v === "number" && Number.isFinite(v);
/** Keeps only the known, numeric parts of a profile, capped in size. */
export function parseProfile(raw: unknown): StoredProfile | null {
  const p = (raw ?? {}) as Record<string, unknown>;
  const out: StoredProfile = {};
  if (typeof p.declared === "string" && p.declared in SEASONS) out.declared = p.declared;
  if (["natural", "dyed", "grey", "none", "covered"].includes(p.hair as string)) out.hair = p.hair as string;
  if (["goud", "zilver", "weetniet"].includes(p.jewel as string)) out.jewel = p.jewel as string;
  if (p.locale === "en" || p.locale === "nl") out.locale = p.locale;
  if (p.answers) {
    const a = sanitize(p.answers);
    if (a.occasions.length || a.budget || a.shops.length) out.answers = a;
  }
  const c = p.confirm as Record<string, unknown> | undefined;
  if (c && typeof c === "object") {
    const kept = Object.fromEntries(["skin", "iris", "hair"].filter((k) => ["lighter", "match", "darker"].includes(c[k] as string)).map((k) => [k, c[k] as string]));
    if (Object.keys(kept).length) out.confirm = kept;
  }
  const m = p.measurements as Record<string, unknown> | undefined;
  const skin = (m?.skin as { lab?: Record<string, unknown> } | undefined)?.lab;
  if (m && skin && num(skin.L) && num(skin.a) && num(skin.b)) {
    const json = JSON.stringify(m);
    // a measurement object is a few hundred bytes; anything large is not ours
    if (json.length < 4000 && !/data:|base64|http/i.test(json)) out.measurements = m;
  }
  return out.declared || out.measurements ? out : null;
}

const str = (v: unknown, max: number) => (typeof v === "string" && v.trim().length > 0 && v.trim().length <= max ? v.trim() : null);

export function parseOrder(body: unknown): OrderRow | null {
  const b = (body ?? {}) as Record<string, unknown>;
  const ref = str(b.ref, 9);
  const tier = b.tier as Tier;
  const brand = b.brand as BrandKey;
  const email = str(b.email, 200);
  if (!ref || !/^KN-[A-HJ-NP-Z2-9]{6}$/.test(ref)) return null;
  if (!["digital", "card", "session"].includes(tier)) return null;
  if (!(brand in BRANDS) || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return null;
  const voice = typeof b.voice === "string" && b.voice in VOICES ? (b.voice as VoiceKey) : null;
  const season = typeof b.season === "string" && b.season in SEASONS ? b.season : null;
  // a discount code wins over a friend code; they never stack. A free code is for the digital guide only.
  const checked = checkCode(b.discountCode, tier);
  const percent = checked.ok ? checked.percent : null;
  const friend = percent ? null : parseReferral(typeof b.friendCode === "string" ? b.friendCode : null);
  const country = ["NL", "BE", "DE"].includes(b.country as string) ? (b.country as "NL" | "BE" | "DE") : null;
  const physical = tier !== "digital";
  const row: OrderRow = {
    ref, tier, brand, voice, season, email,
    amount_cents: Math.round(amountFor(tier, !!friend, percent ?? 0) * 100),
    name: physical ? str(b.name, 120) : null,
    street: physical ? str(b.street, 160) : null,
    postcode: physical ? str(b.postcode, 16) : null,
    city: physical ? str(b.city, 80) : null,
    country: physical ? country : null,
    // the code column records whichever code was used (a friend code or a discount code)
    friend_code: checked.ok ? checked.code : friend?.code ?? null,
    waiver: b.waiver === true,
    profile: parseProfile(b.profile),
  };
  // the colour card needs a full address in NL, BE or DE
  if (physical && (!row.name || !row.street || !row.postcode || !row.city || !row.country)) return null;
  return row;
}
