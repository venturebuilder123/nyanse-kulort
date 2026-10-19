import { describe, expect, it } from "vitest";
import { calendar } from "./calendar";

describe("instagram calendar", () => {
  const c = calendar("2026-10-26", "https://x");
  it("posts every Monday at 19:00 Amsterdam, plus four Thursdays", () => {
    expect(c.filter((s) => s.kind === "carousel")).toHaveLength(12);
    expect(c.filter((s) => s.kind === "image")).toHaveLength(4);
    // 26 Oct 2026 is winter time (UTC+1): 19:00 local = 18:00 UTC
    expect(c[0]!.at.toISOString()).toBe("2026-10-26T18:00:00.000Z");
    expect(c[1]!.at.toISOString()).toBe("2026-10-29T18:00:00.000Z");
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
    expect(calendar("2027-04-05", "https://x")[0]!.at.toISOString()).toBe("2027-04-05T17:00:00.000Z");
  });
});
