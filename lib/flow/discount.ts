// Reusable discount codes for the founder's inner circle (decision 18 Oct 2026): unlimited use,
// a fixed percentage (25% or 100% = free). Kept in the environment, never in the source:
//   DISCOUNT_CODES="FAMILIE-XXXX:100,VRIENDEN-XXXX:25"
// A code replaces the friend discount; they never stack.

export function parseDiscountCodes(raw = process.env.DISCOUNT_CODES ?? ""): Map<string, number> {
  const m = new Map<string, number>();
  for (const part of raw.split(",")) {
    const [code, pct] = part.split(":").map((s) => s?.trim());
    const n = Number(pct);
    if (code && /^[A-Z0-9-]{4,32}$/i.test(code) && Number.isInteger(n) && n >= 1 && n <= 100) m.set(code.toUpperCase(), n);
  }
  return m;
}

/** The percentage for a code, or null. Case-insensitive. */
export function discountFor(code: unknown, raw?: string): number | null {
  if (typeof code !== "string") return null;
  // forgiving: a pasted "CODE:100" or stray spaces still match the code itself
  const clean = code.split(":")[0]!.replace(/\s+/g, "").toUpperCase();
  return parseDiscountCodes(raw).get(clean) ?? null;
}
