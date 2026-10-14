// Server-only: push subscriptions in Supabase (EU), via the REST API with the service role.
// No SDK needed for three queries. Without the env vars the feature is off (503), not broken.

import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import type { BrandKey, VoiceKey } from "@/lib/brand/types";

export type PushRow = {
  endpoint: string;
  p256dh: string;
  auth: string;
  brand: BrandKey;
  voice: VoiceKey;
  season: SeasonKey;
  time_zone: string;
  last_sent_at: string | null;
  sent_count: number;
};

const TABLE = "push_subscriptions";

export function pushConfigured(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
}

async function rest(path: string, init: RequestInit & { prefer?: string } = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  // accept both the project URL and the "API URL" with /rest/v1 that the dashboard also shows
  const base = process.env.SUPABASE_URL!.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
  const res = await fetch(`${base}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      // legacy service_role keys are JWTs and go in Authorization too; new sb_secret_ keys only in apikey
      ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
      "Content-Type": "application/json",
      ...(init.prefer ? { Prefer: init.prefer } : {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
  return res;
}

const BRANDS: BrandKey[] = ["nyanse", "kulort"];
const VOICES: VoiceKey[] = ["wingman", "atelier", "girlmath", "signature"];

/** Validates what the browser sends; anything unexpected is rejected, nothing extra is stored. */
export function parseSubscription(body: unknown): Omit<PushRow, "last_sent_at" | "sent_count"> | null {
  const b = (body ?? {}) as Record<string, unknown>;
  const sub = (b.subscription ?? {}) as { endpoint?: unknown; keys?: { p256dh?: unknown; auth?: unknown } };
  const str = (v: unknown, max: number) => (typeof v === "string" && v.length > 0 && v.length <= max ? v : null);
  const endpoint = str(sub.endpoint, 1000);
  const p256dh = str(sub.keys?.p256dh, 200);
  const auth = str(sub.keys?.auth, 100);
  const tz = str(b.timeZone, 60) ?? "Europe/Amsterdam";
  if (!endpoint || !endpoint.startsWith("https://") || !p256dh || !auth) return null;
  if (!BRANDS.includes(b.brand as BrandKey) || !VOICES.includes(b.voice as VoiceKey)) return null;
  if (!(typeof b.season === "string" && b.season in SEASONS)) return null;
  if (!/^[A-Za-z_]+(\/[A-Za-z0-9_+-]+)*$/.test(tz)) return null;
  return { endpoint, p256dh, auth, brand: b.brand as BrandKey, voice: b.voice as VoiceKey, season: b.season as SeasonKey, time_zone: tz };
}

export const pushStore = {
  upsert: (row: Omit<PushRow, "last_sent_at" | "sent_count">) =>
    rest(`${TABLE}?on_conflict=endpoint`, { method: "POST", body: JSON.stringify(row), prefer: "resolution=merge-duplicates" }),
  remove: (endpoint: string) => rest(`${TABLE}?endpoint=eq.${encodeURIComponent(endpoint)}`, { method: "DELETE" }),
  async due(before: Date, limit = 500): Promise<PushRow[]> {
    const res = await rest(`${TABLE}?select=*&or=(last_sent_at.is.null,last_sent_at.lt.${before.toISOString()})&limit=${limit}`);
    return (await res.json()) as PushRow[];
  },
  sent: (row: PushRow, at: Date) =>
    rest(`${TABLE}?endpoint=eq.${encodeURIComponent(row.endpoint)}`, {
      method: "PATCH",
      body: JSON.stringify({ last_sent_at: at.toISOString(), sent_count: row.sent_count + 1 }),
    }),
};
