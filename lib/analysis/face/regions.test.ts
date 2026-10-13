import { describe, expect, it } from "vitest";
import { pointInPolygon, robustStat } from "./regions";

describe("pointInPolygon", () => {
  const square = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
  it("separates inside from outside", () => {
    expect(pointInPolygon({ x: 5, y: 5 }, square)).toBe(true);
    expect(pointInPolygon({ x: 15, y: 5 }, square)).toBe(false);
  });
});

describe("robustStat", () => {
  const skin = (L: number) => ({ lab: { L, a: 14, b: 18 }, clipped: false });

  it("ignores specular highlights and deep shadows", () => {
    const samples = [
      ...Array.from({ length: 80 }, (_, i) => skin(60 + (i % 5) * 0.5)),
      ...Array.from({ length: 10 }, () => ({ lab: { L: 98, a: 1, b: 2 }, clipped: true })), // shine
      ...Array.from({ length: 10 }, () => ({ lab: { L: 15, a: 5, b: 5 }, clipped: false })), // shadow
    ];
    const s = robustStat(samples);
    expect(s.lab.L).toBeGreaterThan(59);
    expect(s.lab.L).toBeLessThan(62);
    expect(s.lab.a).toBe(14);
  });

  it("returns NaN for an empty region instead of throwing", () => {
    expect(robustStat([]).n).toBe(0);
  });
});
