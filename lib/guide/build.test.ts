import { describe, expect, it } from "vitest";
import { computeProfile, type Measurements } from "@/lib/color/profile";
import { nearestSeason, SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide } from "./build";

const base = computeProfile({ skin: { lab: { L: 60, a: 12, b: 16 }, n: 3000, sdL: 3 }, faceWidthPx: 400, calibrated: true } as Measurements);
const at = (key: SeasonKey) => {
  const c = SEASONS[key].centre;
  return { ...base, ...c, match: nearestSeason(c) };
};

describe("buildGuide", () => {
  for (const key of Object.keys(SEASONS) as SeasonKey[]) {
    for (const brand of ["kulort", "nyanse"] as const) {
      it(`makes a complete guide for ${key} (${brand})`, () => {
        const g = buildGuide(at(key), brand);
        expect(g.season).toBe(SEASONS[key].name);
        expect(g.groups.reduce((n, gr) => n + gr.colors.length, 0)).toBe(30);
        expect(g.combos).toHaveLength(4);
        g.combos.forEach((c) => expect(c.pieces).toHaveLength(3));
        expect(g.accessories).toHaveLength(4);
        expect(g.capsule).toHaveLength(12);
        expect(g.avoid.length).toBeGreaterThanOrEqual(3);
        expect(g.pass).toHaveLength(8);
        expect(!!g.makeup).toBe(brand === "nyanse");
      });
    }
  }

  it("gives warm metals to warm types and cool metals to cool types", () => {
    expect(buildGuide(at("warmAutumn"), "kulort").accessories[0]!.text).toContain("Goud");
    expect(buildGuide(at("coolWinter"), "kulort").accessories[0]!.text).toContain("Zilver");
  });

  it("explains why each colour to avoid does not work", () => {
    const g = buildGuide(at("coolWinter"), "nyanse");
    g.avoid.forEach((a) => expect(a.reason).toMatch(/warm|koel|fel|vlak|aandacht/));
  });
});
