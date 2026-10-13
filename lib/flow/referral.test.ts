import { describe, expect, it } from "vitest";
import { makeReferralCode, parseReferral, referralUrl } from "./referral";

describe("referral code", () => {
  it("uses the first name and an unambiguous tail", () => {
    const code = makeReferralCode("Daniël", () => 0.5);
    expect(code).toMatch(/^DANIEL-[A-Z2-9]{4}$/);
    expect(code).not.toMatch(/[01IO]-?$/);
  });
  it("falls back when there is no name", () => {
    expect(makeReferralCode(undefined, () => 0)).toBe("KLEUR-AAAA");
  });
  it("builds a share link", () => {
    expect(referralUrl("https://kulort.nl", "DAAN-7K3Q")).toBe("https://kulort.nl/?ref=DAAN-7K3Q");
  });
});

describe("parseReferral", () => {
  it("reads the friend's first name from the code", () => {
    expect(parseReferral("daniel-7k3q")).toEqual({ code: "DANIEL-7K3Q", friend: "Daniel" });
  });
  it("has no name for anonymous codes", () => {
    expect(parseReferral("KLEUR-7K3Q")).toEqual({ code: "KLEUR-7K3Q" });
  });
  it("rejects anything else", () => {
    for (const bad of ["", "DANIEL", "DANIEL-7K3", "<script>-7K3Q", "DANIEL-7K3O", null]) expect(parseReferral(bad)).toBeNull();
  });
  it("round-trips codes we make", () => {
    expect(parseReferral(makeReferralCode("Daniël"))?.friend).toBe("Daniel");
  });
});
