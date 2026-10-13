// How good is the analysis, measured against expert colour consultants (docs/fase-a/BETROUWBAARHEID.md).
// Pure functions: accuracy (exact and with neighbouring seasons), Cohen's kappa between two raters,
// and a risk–coverage curve with a conservative lower bound, so a claim like "80% correct when we
// are sure" is statistically supported rather than lucky.

import type { SeasonKey } from "@/lib/color/seasons";

export type Family = "spring" | "summer" | "autumn" | "winter";

export const FAMILY: Record<SeasonKey, Family> = {
  lightSpring: "spring", warmSpring: "spring", brightSpring: "spring",
  lightSummer: "summer", coolSummer: "summer", softSummer: "summer",
  softAutumn: "autumn", warmAutumn: "autumn", deepAutumn: "autumn",
  deepWinter: "winter", coolWinter: "winter", brightWinter: "winter",
};

// The 12-season "flow": each season borders the season that shares its dominant characteristic
// in the neighbouring family (Light Spring ↔ Light Summer, Warm Spring ↔ Warm Autumn, …).
const SHARED_DOMINANT: [SeasonKey, SeasonKey][] = [
  ["lightSpring", "lightSummer"],
  ["warmSpring", "warmAutumn"],
  ["brightSpring", "brightWinter"],
  ["coolSummer", "coolWinter"],
  ["softSummer", "softAutumn"],
  ["deepAutumn", "deepWinter"],
];

/** Same season, same family, or the season across the border with the same dominant trait. */
export function isAdjacent(a: SeasonKey, b: SeasonKey): boolean {
  if (a === b || FAMILY[a] === FAMILY[b]) return true;
  return SHARED_DOMINANT.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

/** Wilson score interval lower bound (95% by default): the conservative estimate of a rate. */
export function wilsonLower(correct: number, n: number, z = 1.96): number {
  if (n === 0) return 0;
  const p = correct / n;
  const z2 = z * z;
  return (p + z2 / (2 * n) - z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / (1 + z2 / n);
}

/** Cohen's kappa for two raters on the same items (any categorical labels). */
export function cohenKappa<T>(a: T[], b: T[]): number {
  if (a.length !== b.length || a.length === 0) return NaN;
  const n = a.length;
  const labels = [...new Set([...a, ...b])];
  const po = a.filter((x, i) => x === b[i]).length / n;
  const pe = labels.reduce((s, l) => s + (a.filter((x) => x === l).length / n) * (b.filter((x) => x === l).length / n), 0);
  return pe === 1 ? 1 : (po - pe) / (1 - pe);
}

export type Scored = { predicted: SeasonKey; truth: SeasonKey; confidence: number };

export type Rates = { n: number; exact: number; adjacent: number; family: number; exactLower: number; familyLower: number };

export function rates(items: Scored[]): Rates {
  const n = items.length;
  const exact = items.filter((x) => x.predicted === x.truth).length;
  const adjacent = items.filter((x) => isAdjacent(x.predicted, x.truth)).length;
  const family = items.filter((x) => FAMILY[x.predicted] === FAMILY[x.truth]).length;
  return {
    n,
    exact: n ? exact / n : 0,
    adjacent: n ? adjacent / n : 0,
    family: n ? family / n : 0,
    exactLower: wilsonLower(exact, n),
    familyLower: wilsonLower(family, n),
  };
}

export type CoveragePoint = { threshold: number; coverage: number; n: number; correct: number; accuracy: number; lower: number };

/**
 * Risk–coverage: if we only give a firm answer above a confidence threshold, how many people get
 * one (coverage) and how often is it right (accuracy, with its 95% lower bound)?
 * `isCorrect` decides what counts as right (exact season, family, …).
 */
export function riskCoverage(items: Scored[], isCorrect: (x: Scored) => boolean): CoveragePoint[] {
  const sorted = [...items].sort((a, b) => b.confidence - a.confidence);
  const out: CoveragePoint[] = [];
  let correct = 0;
  sorted.forEach((x, i) => {
    if (isCorrect(x)) correct++;
    const n = i + 1;
    // one point per distinct threshold (the last item with this confidence)
    if (i === sorted.length - 1 || sorted[i + 1]!.confidence < x.confidence) {
      out.push({ threshold: x.confidence, coverage: n / sorted.length, n, correct, accuracy: correct / n, lower: wilsonLower(correct, n) });
    }
  });
  return out;
}

/**
 * The lowest confidence threshold at which the 95% lower bound of accuracy still meets the
 * target: the most people we can give a firm answer while keeping the promise. null = not reachable.
 */
export function thresholdFor(curve: CoveragePoint[], target: number, minN = 20): CoveragePoint | null {
  const ok = curve.filter((p) => p.n >= minN && p.lower >= target);
  return ok.length ? ok.reduce((best, p) => (p.coverage > best.coverage ? p : best)) : null;
}
