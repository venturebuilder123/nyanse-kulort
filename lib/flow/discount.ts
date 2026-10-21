// Discount codes. Kept in the environment, never in the source:
//   DISCOUNT_CODES="FAMILIE-XXXX:100,VRIENDEN-XXXX:25"   reusable, for the inner circle (18 Oct 2026)
//   GIFT_CODES="WIN-XXXXXX,WIN-YYYYYY"                   single use, free, for giveaways (21 Oct 2026)
// Rule (founder, 21 Oct 2026, "dit geldt altijd"): a free (100%) code is for the digital guide only,
// never for the colour card or the personal consult. A code replaces the friend discount; they never stack.
import type { Tier } from "./pricing";

export function parseDiscountCodes(raw = process.env.DISCOUNT_CODES ?? ""): Map<string, number> {
  const m = new Map<string, number>();
  for (const part of raw.split(",")) {
    const [code, pct] = part.split(":").map((s) => s?.trim());
    const n = Number(pct);
    if (code && /^[A-Z0-9-]{4,32}$/i.test(code) && Number.isInteger(n) && n >= 1 && n <= 100) m.set(code.toUpperCase(), n);
  }
  return m;
}

export function parseGiftCodes(raw = process.env.GIFT_CODES ?? ""): Set<string> {
  return new Set(raw.split(",").map((c) => c.trim().toUpperCase()).filter((c) => /^[A-Z0-9-]{4,32}$/.test(c)));
}

/** forgiving: a pasted "CODE:100" or stray spaces still match the code itself */
export const cleanCode = (code: string) => code.split(":")[0]!.replace(/\s+/g, "").toUpperCase();

export type CodeCheck = { ok: true; percent: number; single: boolean; code: string } | { ok: false; reason: "unknown" | "digital_only" };

/** Whether a code applies to this tier (without the "already used" check, which needs the database). */
export function checkCode(code: unknown, tier: Tier, raw?: string, giftRaw?: string): CodeCheck {
  if (typeof code !== "string") return { ok: false, reason: "unknown" };
  const c = cleanCode(code);
  const single = parseGiftCodes(giftRaw).has(c);
  const percent = single ? 100 : parseDiscountCodes(raw).get(c);
  if (!percent) return { ok: false, reason: "unknown" };
  if (percent === 100 && tier !== "digital") return { ok: false, reason: "digital_only" };
  return { ok: true, percent, single, code: c };
}

/** The percentage for a code, or null (any tier). Kept for callers that only need the number. */
export function discountFor(code: unknown, raw?: string): number | null {
  if (typeof code !== "string") return null;
  return parseDiscountCodes(raw).get(cleanCode(code)) ?? null;
}
