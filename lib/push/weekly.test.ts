import { describe, expect, it } from "vitest";
import { canSend, localHour, weeklyMessage } from "./weekly";

const at = (iso: string) => new Date(iso);
const DAY = 24 * 60 * 60 * 1000;

describe("weekly colour tip", () => {
  it("never sends in the evening or early morning, in local time", () => {
    // 19:30 UTC = 21:30 in Amsterdam (summer time)
    expect(canSend({ lastSentAt: null, timeZone: "Europe/Amsterdam" }, at("2026-07-06T19:30:00Z"))).toBe(false);
    expect(canSend({ lastSentAt: null, timeZone: "Europe/Amsterdam" }, at("2026-07-06T06:30:00Z"))).toBe(false);
    expect(canSend({ lastSentAt: null, timeZone: "Europe/Amsterdam" }, at("2026-07-06T09:00:00Z"))).toBe(true);
  });

  it("sends at most once a week", () => {
    const now = at("2026-07-06T09:00:00Z");
    expect(canSend({ lastSentAt: now.getTime() - 3 * DAY, timeZone: "Europe/Amsterdam" }, now)).toBe(false);
    expect(canSend({ lastSentAt: now.getTime() - 7 * DAY, timeZone: "Europe/Amsterdam" }, now)).toBe(true);
  });

  it("falls back to Amsterdam for an unknown time zone", () => {
    expect(localHour(at("2026-07-06T09:00:00Z"), "Not/AZone")).toBe(11);
  });

  it("uses a colour from the person's own palette and their type", () => {
    const m = weeklyMessage({ brand: "kulort", voice: "wingman", season: "deepAutumn" }, at("2026-07-06T09:00:00Z"));
    expect(m.title).toBe("Deep Autumn · kleur van de week");
    expect(m.body).not.toContain("{");
    expect(m.color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("never uses a voice of the other brand", () => {
    const m = weeklyMessage({ brand: "kulort", voice: "girlmath", season: "coolWinter" }, at("2026-07-06T09:00:00Z"));
    expect(m.body).not.toMatch(/✨|👀|Done/);
  });
});
