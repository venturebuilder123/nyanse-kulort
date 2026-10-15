import { describe, expect, it } from "vitest";
import { parseOrder } from "./order";

const base = { ref: "KN-ABC234", tier: "digital", brand: "nyanse", email: "a@b.nl", waiver: true };

describe("parseOrder", () => {
  it("computes the amount itself", () => {
    expect(parseOrder({ ...base, amount_cents: 1 })?.amount_cents).toBe(699);
    expect(parseOrder({ ...base, friendCode: "DANIEL-7K3Q" })?.amount_cents).toBe(599);
  });
  it("requires a full address for the card and the session", () => {
    expect(parseOrder({ ...base, tier: "card" })).toBeNull();
    expect(parseOrder({ ...base, tier: "card", name: "A", street: "B 1", postcode: "1234AB", city: "C", country: "NL" })?.amount_cents).toBe(999);
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
  });
});
