// Plain-language words for the three scales and the season family (UI copy, Dutch).
import { FAMILY_NL } from "@/lib/brand/common";
import { SEASONS, type SeasonKey } from "./seasons";

const pick = (v: number, cuts: number[], words: string[]) => words[cuts.findIndex((c) => v < c)] ?? words[words.length - 1]!;

export const undertoneWord = (u: number) => pick(u, [-0.5, -0.15, 0.15, 0.5], ["koel", "koel-neutraal", "neutraal", "warm-neutraal", "warm"]);
export const depthWord = (d: number) => pick(d, [0.25, 0.45, 0.6, 0.78], ["licht", "licht-midden", "midden", "midden-diep", "diep"]);
export const clarityWord = (c: number) => pick(c, [0.3, 0.45, 0.6, 0.78], ["zacht", "eerder zacht", "midden", "eerder helder", "helder"]);

/** "Bright Winter" -> "Winter" (in Dutch). */
export function familyOf(season: SeasonKey): string {
  const en = SEASONS[season].name.split(" ").pop() as keyof typeof FAMILY_NL;
  return FAMILY_NL[en];
}
