import { describe, expect, it } from "vitest";
import { cohenKappa, isAdjacent, rates, riskCoverage, thresholdFor, wilsonLower, type Scored } from "./agreement";

describe("agreement metrics", () => {
  it("treats same family and shared-dominant borders as adjacent", () => {
    expect(isAdjacent("softSummer", "softAutumn")).toBe(true);
    expect(isAdjacent("softSummer", "lightSummer")).toBe(true);
    expect(isAdjacent("softSummer", "brightWinter")).toBe(false);
    expect(isAdjacent("lightSpring", "deepWinter")).toBe(false);
  });

  it("gives a conservative lower bound", () => {
    expect(wilsonLower(54, 60)).toBeGreaterThan(0.79);
    expect(wilsonLower(54, 60)).toBeLessThan(0.81);
    expect(wilsonLower(9, 10)).toBeLessThan(0.62); // 90% on 10 people proves little
    expect(wilsonLower(0, 0)).toBe(0);
  });

  it("computes Cohen's kappa", () => {
    expect(cohenKappa(["a", "b", "a", "b"], ["a", "b", "a", "b"])).toBe(1);
    // agreement no better than chance
    expect(cohenKappa(["a", "a", "b", "b"], ["a", "b", "a", "b"])).toBeCloseTo(0);
  });

  it("finds the threshold that keeps the promise for the most people", () => {
    const items: Scored[] = [
      ...Array.from({ length: 50 }, () => ({ predicted: "softSummer" as const, truth: "softSummer" as const, confidence: 0.9 })),
      ...Array.from({ length: 5 }, () => ({ predicted: "softSummer" as const, truth: "coolSummer" as const, confidence: 0.9 })),
      ...Array.from({ length: 30 }, (_, i) => ({ predicted: "softSummer" as const, truth: i % 2 ? ("softSummer" as const) : ("warmAutumn" as const), confidence: 0.4 })),
    ];
    const curve = riskCoverage(items, (x) => x.predicted === x.truth);
    expect(curve).toHaveLength(2);
    const t = thresholdFor(curve, 0.8);
    expect(t?.threshold).toBe(0.9);
    expect(t?.coverage).toBeCloseTo(55 / 85);
    expect(thresholdFor(curve, 0.95)).toBeNull();
    expect(rates(items).exact).toBeCloseTo(65 / 85);
  });
});
