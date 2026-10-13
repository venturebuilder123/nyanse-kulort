import { describe, expect, it } from "vitest";
import { computeProfile, type Measurements } from "@/lib/color/profile";
import { nearestSeason, SEASONS } from "@/lib/color/seasons";
import { applyJewel } from "./tiebreak";

const base = computeProfile({ skin: { lab: { L: 60, a: 12, b: 16 }, n: 3000, sdL: 3 }, faceWidthPx: 400, calibrated: true } as Measurements);
const withMatch = (u: number) => {
  const c = SEASONS.softSummer.centre;
  const point = { undertone: u, depth: c.depth, clarity: c.clarity };
  return { ...base, ...point, match: nearestSeason(point) };
};

describe("applyJewel", () => {
  it("decides a warm/cool border case", () => {
    const p = withMatch(-0.01); // just on the cool side, border with Soft Autumn
    expect(p.match.border).toBe(true);
    expect(applyJewel(p, "goud").match.season).toBe("softAutumn");
    expect(applyJewel(p, "zilver").match.season).toBe("softSummer");
  });

  it("never overrides a clear measurement", () => {
    const p = withMatch(-0.6);
    expect(p.match.border).toBe(false);
    expect(applyJewel(p, "goud").match.season).toBe(p.match.season);
  });

  it("ignores 'geen voorkeur'", () => {
    const p = withMatch(-0.01);
    expect(applyJewel(p, "weetniet")).toBe(p);
  });
});
