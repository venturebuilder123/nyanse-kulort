import { describe, expect, it } from "vitest";
import { parseOrder } from "./order";

const base = { ref: "KN-ABC234", tier: "digital", brand: "nyanse", email: "a@b.nl", waiver: true };

describe("parseOrder", () => {
  it("computes the amount itself", () => {
    expect(parseOrder({ ...base, amount_cents: 1 })?.amount_cents).toBe(1299);
    expect(parseOrder({ ...base, friendCode: "DANIEL-7K3Q" })?.amount_cents).toBe(1199);
  });
  it("requires a full address for the card and the session", () => {
    expect(parseOrder({ ...base, tier: "card" })).toBeNull();
    expect(parseOrder({ ...base, tier: "card", name: "A", street: "B 1", postcode: "1234AB", city: "C", country: "NL" })?.amount_cents).toBe(3999);
  });
  it("rejects bad input", () => {
    expect(parseOrder({ ...base, ref: "x" })).toBeNull();
    expect(parseOrder({ ...base, email: "nope" })).toBeNull();
    expect(parseOrder({ ...base, tier: "gold" })).toBeNull();
  });
});

describe("parseProfile", () => {
  it("keeps numbers and known answers only", async () => {
    const { parseProfile } = await import("./order");
    expect(parseProfile({ declared: "softSummer", evil: "x" })).toEqual({ declared: "softSummer" });
    expect(parseProfile({ measurements: { skin: { lab: { L: 60, a: 12, b: 16 } } }, hair: "natural" })?.hair).toBe("natural");
    expect(parseProfile({ measurements: { skin: { lab: { L: 60, a: 12, b: 16 } }, photo: "data:image/png;base64,AAAA" } })).toBeNull();
    expect(parseProfile(null)).toBeNull();
    // the own check travels with the order, unknown values are dropped
    expect(parseProfile({ measurements: { skin: { lab: { L: 60, a: 12, b: 16 } } }, confirm: { skin: "darker", iris: "evil", hair: "match" } })?.confirm).toEqual({ skin: "darker", hair: "match" });
  });
});

describe("mollie amounts", () => {
  it("formats cents as Mollie's two-decimal string", async () => {
    const { mollieValue } = await import("@/lib/payments/mollie");
    expect(mollieValue(699)).toBe("6.99");
    expect(mollieValue(999)).toBe("9.99");
    expect(mollieValue(8900)).toBe("89.00");
    expect(mollieValue(599)).toBe("5.99");
  });
});

describe("discount codes", () => {
  it("parses codes from the environment and ignores junk", async () => {
    const { discountFor } = await import("./discount");
    const raw = "FAMILIE-K7Q2:100, vrienden-p3x9:25,BAD:0,x:50,OK-CODE:abc";
    expect(discountFor("familie-k7q2", raw)).toBe(100);
    expect(discountFor(" VRIENDEN-P3X9 ", raw)).toBe(25);
    expect(discountFor("BAD", raw)).toBeNull();
    expect(discountFor("nope", raw)).toBeNull();
    expect(discountFor(undefined, raw)).toBeNull();
  });
  it("applies the percentage, never stacks with a friend code, never goes below zero", async () => {
    const { amountFor } = await import("./payment");
    expect(amountFor("digital", false, 25)).toBe(9.74);
    expect(amountFor("card", true, 25)).toBe(29.99);
    expect(amountFor("session", false, 100)).toBe(0);
    expect(amountFor("digital", true)).toBe(11.99);
  });
  it("uses the code in an order (reusable: the same code works every time)", () => {
    process.env.DISCOUNT_CODES = "FAMILIE-K7Q2:100,VRIENDEN-P3X9:25";
    expect(parseOrder({ ...base, discountCode: "familie-k7q2" })?.amount_cents).toBe(0);
    expect(parseOrder({ ...base, discountCode: "familie-k7q2" })?.friend_code).toBe("FAMILIE-K7Q2");
    expect(parseOrder({ ...base, discountCode: "VRIENDEN-P3X9", friendCode: "DANIEL-7K3Q" })?.amount_cents).toBe(974);
    expect(parseOrder({ ...base, discountCode: "WRONG" })?.amount_cents).toBe(1299);
    delete process.env.DISCOUNT_CODES;
  });
});

describe("discount code input", () => {
  it("forgives a pasted ':100' and spaces", async () => {
    const { discountFor } = await import("./discount");
    expect(discountFor("FAMILIE-BN26E:100", "FAMILIE-BN26E:100")).toBe(100);
    expect(discountFor(" familie-bn26e ", "FAMILIE-BN26E:100")).toBe(100);
  });
});

describe("free codes: digital guide only, giveaway codes once (rule of 21 Oct 2026)", () => {
  it("a 100% code never applies to the colour card or the consult, a 25% code does", async () => {
    const { checkCode } = await import("./discount");
    const raw = "FAMILIE-K7Q2:100,VRIENDEN-P3X9:25", gifts = "WIN-AB12CD,WIN-EF34GH";
    expect(checkCode("familie-k7q2", "digital", raw, gifts)).toMatchObject({ ok: true, percent: 100 });
    expect(checkCode("familie-k7q2", "card", raw, gifts)).toEqual({ ok: false, reason: "digital_only" });
    expect(checkCode("familie-k7q2", "session", raw, gifts)).toEqual({ ok: false, reason: "digital_only" });
    expect(checkCode("VRIENDEN-P3X9", "card", raw, gifts)).toMatchObject({ ok: true, percent: 25 });
    expect(checkCode("win-ab12cd", "digital", raw, gifts)).toMatchObject({ ok: true, percent: 100, single: true, code: "WIN-AB12CD" });
    expect(checkCode("WIN-AB12CD", "card", raw, gifts)).toEqual({ ok: false, reason: "digital_only" });
    expect(checkCode("nope", "digital", raw, gifts)).toEqual({ ok: false, reason: "unknown" });
  });
  it("an order for the colour card with a free code pays the full price", () => {
    process.env.DISCOUNT_CODES = "FAMILIE-K7Q2:100";
    const card = { ...base, tier: "card", name: "A B", street: "Straat 1", postcode: "1234 AB", city: "Utrecht", country: "NL" };
    expect(parseOrder({ ...card, discountCode: "FAMILIE-K7Q2" })?.amount_cents).toBe(3999);
    expect(parseOrder({ ...card, discountCode: "FAMILIE-K7Q2" })?.friend_code).toBeNull();
    delete process.env.DISCOUNT_CODES;
  });
});
