import { describe, expect, it } from "vitest";
import { hexToLab, type Lab } from "./convert";
import { estimateMonk, monkGroup } from "./monk";
import { computeProfile, type Measurements } from "./profile";
import { nearestSeason, SEASONS, type SeasonKey } from "./seasons";

const stat = (lab: Lab, n = 3000) => ({ lab, n, sdL: 3 });

function measure(skin: Lab, hair?: Lab, iris?: Lab, calibrated = true): Measurements {
  return {
    skin: stat(skin),
    cheekLeft: stat(skin),
    cheekRight: stat(skin),
    hair: hair && stat(hair),
    iris: iris && stat(iris, 200),
    faceWidthPx: 400,
    calibrated,
  };
}

describe("seasons", () => {
  it("maps every centre onto itself", () => {
    for (const key of Object.keys(SEASONS) as SeasonKey[]) {
      expect(nearestSeason(SEASONS[key].centre).season).toBe(key);
    }
  });

  it("flags a point halfway between two seasons as a border", () => {
    const a = SEASONS.softSummer.centre;
    const b = SEASONS.softAutumn.centre;
    const mid = { undertone: (a.undertone + b.undertone) / 2, depth: a.depth, clarity: a.clarity };
    expect(nearestSeason(mid).border).toBe(true);
  });
});

describe("computeProfile", () => {
  const neutralHair = { L: 35, a: 3, b: 6 };

  it("rates yellower skin warmer than pinker skin", () => {
    const warm = computeProfile(measure({ L: 65, a: 12, b: 22 }, neutralHair));
    const cool = computeProfile(measure({ L: 65, a: 16, b: 12 }, neutralHair));
    expect(warm.undertone).toBeGreaterThan(0);
    expect(cool.undertone).toBeLessThan(0);
  });

  it("rates darker colouring deeper", () => {
    const light = computeProfile(measure({ L: 72, a: 12, b: 16 }, { L: 60, a: 5, b: 20 }));
    const deep = computeProfile(measure({ L: 38, a: 12, b: 16 }, { L: 15, a: 1, b: 2 }));
    expect(deep.depth).toBeGreaterThan(light.depth + 0.3);
  });

  it("rates high hair/skin contrast brighter than low contrast", () => {
    const soft = computeProfile(measure({ L: 60, a: 12, b: 16 }, { L: 50, a: 4, b: 10 }));
    const bright = computeProfile(measure({ L: 70, a: 12, b: 16 }, { L: 15, a: 1, b: 2 }, { L: 45, a: -5, b: -20 }));
    expect(bright.clarity).toBeGreaterThan(soft.clarity);
  });

  it("stays stable on pale, low-chroma skin (regression: first end-to-end test)", () => {
    // calibrated skin of one photo under neutral, warm and cool light (ΔE ≈ 1.2 apart)
    const skins = [{ L: 90.1, a: 7.5, b: 9.2 }, { L: 90.9, a: 6.4, b: 9.3 }, { L: 90.0, a: 7.7, b: 9.1 }];
    const u = skins.map((s) => computeProfile(measure(s, neutralHair)).undertone);
    expect(Math.max(...u) - Math.min(...u)).toBeLessThan(0.3);
  });

  it("ignores dyed hair and the undertone of grey hair", () => {
    const m = measure({ L: 65, a: 13, b: 16 }, { L: 40, a: 18, b: 30 }); // vivid copper hair
    const natural = computeProfile(m);
    const dyed = computeProfile(m, { hair: "dyed" });
    const grey = computeProfile(m, { hair: "grey" });
    const noHair = computeProfile({ ...m, hair: undefined });
    expect(natural.undertone).toBeGreaterThan(dyed.undertone);
    expect(dyed.undertone).toBeCloseTo(noHair.undertone, 6);
    expect(grey.undertone).toBeCloseTo(noHair.undertone, 6);
    expect(grey.depth).toBeCloseTo(natural.depth, 6);
  });

  it("keeps all scales within range", () => {
    const p = computeProfile(measure({ L: 99, a: 60, b: 90 }, { L: 0, a: 0, b: 0 }));
    expect(p.undertone).toBeGreaterThanOrEqual(-1);
    expect(p.undertone).toBeLessThanOrEqual(1);
    for (const v of [p.depth, p.clarity]) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it("lowers confidence without card, hair or iris", () => {
    const full = computeProfile(measure({ L: 60, a: 12, b: 16 }, neutralHair, { L: 40, a: 5, b: 15 }));
    const bare = computeProfile(measure({ L: 60, a: 12, b: 16 }, undefined, undefined, false));
    expect(bare.confidence.overall).toBeLessThan(full.confidence.overall);
  });

  it("lowers undertone confidence when the cheeks disagree (uneven light)", () => {
    const m = measure({ L: 60, a: 12, b: 16 }, neutralHair);
    const even = computeProfile(m);
    const uneven = computeProfile({ ...m, cheekLeft: stat({ L: 60, a: 18, b: 10 }), cheekRight: stat({ L: 60, a: 8, b: 24 }) });
    expect(uneven.confidence.undertone).toBeLessThan(even.confidence.undertone);
  });
});

describe("Monk", () => {
  it("maps the scale's own swatches to their tone", () => {
    expect(estimateMonk(hexToLab("#f6ede4"))).toBe(1);
    expect(estimateMonk(hexToLab("#825c43"))).toBe(7);
    expect(estimateMonk(hexToLab("#292420"))).toBe(10);
  });

  it("groups tones in pairs", () => {
    expect(monkGroup(1)).toBe("1–2");
    expect(monkGroup(2)).toBe("1–2");
    expect(monkGroup(10)).toBe("9–10");
  });
});
