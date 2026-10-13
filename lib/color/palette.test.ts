import { describe, expect, it } from "vitest";
import { colorName, MASTER_SIZE, paletteFor, spread } from "./palette";
import { SEASONS, type SeasonKey } from "./seasons";

describe("master palette", () => {
  it("has ±150 colours", () => {
    expect(MASTER_SIZE).toBeGreaterThanOrEqual(140);
    expect(MASTER_SIZE).toBeLessThanOrEqual(170);
  });

  it("gives every season a palette led by its own colours", () => {
    for (const key of Object.keys(SEASONS) as SeasonKey[]) {
      const { colors } = paletteFor(SEASONS[key].centre);
      expect(colors).toHaveLength(30);
      const own = colors.slice(0, 10).filter((c) => c.season === key).length;
      expect(own, key).toBeGreaterThanOrEqual(7);
    }
  });

  it("never recommends a colour it also says to avoid", () => {
    for (const key of Object.keys(SEASONS) as SeasonKey[]) {
      const { colors, avoid } = paletteFor(SEASONS[key].centre);
      expect(avoid.length).toBeGreaterThanOrEqual(3);
      expect(avoid.some((a) => colors.some((c) => c.hex === a.hex)), key).toBe(false);
    }
  });

  it("avoids warm colours for a cool winter and cool colours for a warm autumn", () => {
    expect(paletteFor(SEASONS.coolWinter.centre).avoid.every((c) => c.point.undertone > 0)).toBe(true);
    expect(paletteFor(SEASONS.warmAutumn.centre).avoid.every((c) => c.point.undertone < 0)).toBe(true);
  });

  it("mixes both seasons for a profile on the border", () => {
    const a = SEASONS.softSummer.centre, b = SEASONS.softAutumn.centre;
    const mid = { undertone: 0, depth: (a.depth + b.depth) / 2, clarity: (a.clarity + b.clarity) / 2 };
    const seasons = new Set(paletteFor(mid).colors.map((c) => c.season));
    expect(seasons.has("softSummer") && seasons.has("softAutumn")).toBe(true);
  });

  it("uses brand-specific names where they differ", () => {
    const navy = paletteFor(SEASONS.coolSummer.centre).colors.find((c) => c.name === "Marine")!;
    expect(colorName(navy, "kulort")).toBe("Navy");
    expect(colorName(navy, "nyanse")).toBe("Marine");
  });

  it("spreads the showcase colours instead of picking six near-identical ones", () => {
    const six = spread(paletteFor(SEASONS.deepAutumn.centre).colors, 6);
    expect(six).toHaveLength(6);
    expect(new Set(six.map((c) => c.hex)).size).toBe(6);
  });
});
