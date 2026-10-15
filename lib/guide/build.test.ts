import { describe, expect, it } from "vitest";
import { computeProfile, type Measurements } from "@/lib/color/profile";
import { nearestSeason, SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide } from "./build";
import { profileForSeason } from "@/lib/color/declared";
import { paletteFor } from "@/lib/color/palette";
import { hexToLab, labToLch } from "@/lib/color/convert";

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
        expect(g.summary.core).toHaveLength(8);
        expect(g.summary.rules).toHaveLength(3);
        expect(g.swaps.length).toBe(g.avoid.length);
        // jacket and trousers of the work look are never the same colour
        expect(g.combos[0]!.pieces[0]!.color.hex).not.toBe(g.combos[0]!.pieces[2]!.color.hex);
        expect(g.combos.every((c) => c.extras.length === (brand === "nyanse" ? 1 : 0))).toBe(true);
        // the alternative is always a colour from the person's own palette
        g.swaps.forEach((sw) => expect(g.groups.flatMap((gr) => gr.colors).some((c) => c.hex === sw.instead.hex)).toBe(true));
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

// Guide review 15 Oct 2026: errors a colour consultant would spot at a glance
describe("guide realism, every season and brand", () => {
  const all = (Object.keys(SEASONS) as SeasonKey[]).flatMap((k) => (["kulort", "nyanse"] as const).map((b) => ({ k, b, g: buildGuide(profileForSeason(k), b) })));
  const chroma = (hex: string) => labToLch(hexToLab(hex)).C;

  it("a cool palette has no clearly warm colours, and vice versa", () => {
    for (const k of Object.keys(SEASONS) as SeasonKey[]) {
      const p = profileForSeason(k);
      if (Math.abs(p.undertone) <= 0.2) continue;
      for (const c of paletteFor(p, "kulort").colors.concat(paletteFor(p, "nyanse").colors)) {
        const crossed = Math.abs(c.point.undertone) > 0.2 && Math.sign(c.point.undertone) !== Math.sign(p.undertone) && chroma(c.hex) >= 12;
        expect(crossed, `${k}: ${c.name}`).toBe(false);
      }
    }
  });

  it("no colour name shows twice in one palette", () => {
    for (const { k, b, g } of all) {
      const names = g.groups.flatMap((gr) => gr.colors.map((c) => c.name));
      expect(new Set(names).size, `${b} ${k}: ${names.join(",")}`).toBe(names.length);
    }
  });

  it("jackets, trousers and shoes come in wearable, quiet colours", () => {
    for (const { k, b, g } of all) {
      for (const c of g.combos) for (const pc of c.pieces) {
        if (/Colbert|Overshirt|Chino|Pantalon|Schoenen|Sneakers/.test(pc.item)) expect(chroma(pc.color.hex), `${b} ${k} ${c.title}: ${pc.item} ${pc.color.name}`).toBeLessThan(45); // cognac leather is ~41
        if (pc.item === "Jeans") expect(pc.color.hex).toMatch(/^#/);
      }
    }
  });

  it("Deep Winter is told it carries contrast", () => {
    expect(buildGuide(profileForSeason("deepWinter"), "kulort").contrast.title).toBe("Jij kunt contrast hebben");
  });
});
