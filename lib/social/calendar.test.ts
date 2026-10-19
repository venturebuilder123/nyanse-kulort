import { describe, expect, it } from "vitest";
import { calendar } from "./calendar";

describe("instagram calendar", () => {
  const c = calendar("2026-10-26", "https://x");
  it("posts every Wednesday at 18:30 Amsterdam, plus four Thursdays at 12:00", () => {
    expect(c.filter((s) => s.kind === "carousel")).toHaveLength(12);
    expect(c.filter((s) => s.kind === "image")).toHaveLength(4);
    // 28 Oct 2026 is winter time (UTC+1): 18:30 local = 17:30 UTC
    expect(c[0]!.at.toISOString()).toBe("2026-10-28T17:30:00.000Z");
    expect(c[1]!.at.toISOString()).toBe("2026-10-29T11:00:00.000Z");
    expect(c[0]!.key).toBe("w1-mon-softAutumn"); // keys never change: no double posts
  });
  it("uses public JPEG URLs and a caption under Instagram's limits", () => {
    for (const s of c) {
      expect(s.images.every((u) => u.startsWith("https://x/social/") && u.endsWith(".jpg"))).toBe(true);
      expect(s.caption.length).toBeLessThan(2200);
      expect((s.caption.match(/#/g) ?? []).length).toBeLessThanOrEqual(30);
    }
    expect(c[0]!.caption).toContain("Are you a Soft Autumn?");
  });
  it("handles summer time too", () => {
    expect(calendar("2027-04-05", "https://x")[0]!.at.toISOString()).toBe("2027-04-07T16:30:00.000Z");
  });
});
