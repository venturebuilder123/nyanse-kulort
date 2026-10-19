import { describe, expect, it } from "vitest";
import { calendar } from "./calendar";

describe("instagram calendar", () => {
  const c = calendar("2026-10-26", "https://x");
  it("posts every Wednesday at 18:30 Amsterdam, plus four Thursdays at 12:00", () => {
    expect(c.filter((s) => s.kind === "carousel")).toHaveLength(12);
    expect(c.filter((s) => s.kind === "image" && !s.key.endsWith("-thu-effect"))).toHaveLength(4);
    // 28 Oct 2026 is winter time (UTC+1): 18:30 local = 17:30 UTC
    expect(c[0]!.at.toISOString()).toBe("2026-10-28T17:30:00.000Z");
    expect(c[1]!.at.toISOString()).toBe("2026-10-29T11:00:00.000Z");
    expect(c[0]!.key).toBe("w1-mon-softAutumn"); // keys never change: no double posts
  });
  it("uses public JPEG URLs and a caption under Instagram's limits", () => {
    for (const s of c.filter((x) => x.kind !== "reel" && x.kind !== "short")) {
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

describe("effect reels and photos", () => {
  const c = calendar("2026-10-26", "https://x");
  it("adds a Tuesday 19:00 reel per week and effect photos on the Thursdays without a follow image", () => {
    const reels = c.filter((s) => s.kind === "reel");
    expect(reels).toHaveLength(12);
    expect(reels[0]!.key).toBe("w1-tue-reel");
    expect(reels[0]!.at.toISOString()).toBe("2026-10-27T18:00:00.000Z");
    expect(reels.every((r) => r.images[0]!.endsWith("/reel.mp4") && r.images[1]!.endsWith("/cover.jpg"))).toBe(true);
    expect(c.filter((s) => s.key.endsWith("-thu-effect"))).toHaveLength(8);
    expect(reels[0]!.caption).toContain("AI-generated");
  });
  it("puts every reel on YouTube Shorts too, with a title under 100 characters", () => {
    const shorts = c.filter((s) => s.kind === "short");
    expect(shorts).toHaveLength(12);
    expect(shorts[0]!.key).toBe("w1-tue-short");
    for (const s of shorts) {
      expect(s.title!.length).toBeLessThanOrEqual(100);
      expect(s.title).toContain("#Shorts");
      expect(s.caption).toContain("utm_source=youtube");
      expect(s.images[0]).toMatch(/reel\.mp4$/);
    }
  });
  it("never shows the same image twice and prefers the week's season", () => {
    const urls = c.filter((s) => s.kind === "reel" || s.key.endsWith("-thu-effect")).map((s) => s.images[0]!.replace(/\/[^/]+$/, ""));
    expect(new Set(urls).size).toBe(urls.length);
    expect(c.find((s) => s.key === "w1-tue-reel")!.images[0]).toContain("/softAutumn-kulort-");
    expect(c.find((s) => s.key === "w2-tue-reel")!.images[0]).toContain("/deepWinter-nyanse-");
  });
});
