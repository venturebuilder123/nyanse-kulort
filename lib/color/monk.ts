// Monk Skin Tone Scale (Google, CC-BY 4.0): https://skintone.google
// Internal use only (CLAUDE.md §5): for accuracy breakdowns and choosing examples.
// Never shown to users as a label and never used to classify anyone.

import { deltaE2000, hexToLab, type Lab } from "./convert";

export const MONK_HEX = [
  "#f6ede4", "#f3e7db", "#f7ead0", "#eadaba", "#d7bd96",
  "#a07e56", "#825c43", "#604134", "#3a312a", "#292420",
] as const;

const MONK_LAB = MONK_HEX.map(hexToLab);

/** Nearest Monk tone (1–10) for a measured skin colour. */
export function estimateMonk(skin: Lab): number {
  let best = 0;
  let bestD = Infinity;
  MONK_LAB.forEach((lab, i) => {
    const d = deltaE2000(skin, lab);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best + 1;
}

/** Report groups of two tones, as in the recruitment plan (1–2, 3–4, …). */
export function monkGroup(tone: number): string {
  const lo = tone % 2 === 0 ? tone - 1 : tone;
  return `${lo}–${lo + 1}`;
}
