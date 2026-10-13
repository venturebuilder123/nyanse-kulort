import { describe, expect, it } from "vitest";
import { makeReferralCode, referralUrl } from "./referral";

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
