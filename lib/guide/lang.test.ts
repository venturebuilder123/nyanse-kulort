import { describe, expect, it } from "vitest";
import { profileForSeason } from "@/lib/color/declared";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide, type Guide } from "./build";
import { guideEn } from "./en";
import { DE } from "./de";
import { ES } from "./es";
import { guideFor, type GuidePack } from "./lang";

// German and Spanish (9 Nov 2026): every sentence and colour name the English guide produces must
// have a translation, for all 12 seasons and both brands, so nothing English slips into a paid guide.
const all = (Object.keys(SEASONS) as SeasonKey[]).flatMap((k) => (["kulort", "nyanse"] as const).map((b) => buildGuide(profileForSeason(k), b)));

function sentences(g: Guide): string[] {
  return [
    ...g.summary.rules, ...g.swaps.map((s) => s.reason), g.contrast.title, g.contrast.text,
    ...g.groups.flatMap((x) => [x.title, x.text]), ...g.combos.flatMap((c) => [c.title, c.tip]),
    ...(g.makeup ?? []).flatMap((m) => [m.title, m.text]), ...g.avoid.map((a) => a.reason), ...g.shopping,
    ...g.basics.flatMap((b) => [b.title, b.text]), ...g.firstBuys.map((f) => f.why), ...g.audit,
  ];
}
function names(g: Guide): string[] {
  const sw = [...g.summary.core, ...g.summary.avoid, ...g.groups.flatMap((x) => x.colors), ...g.pass, ...g.capsule.map((c) => c.color), ...g.basics.map((b) => b.color), ...g.firstBuys.map((f) => f.color), ...g.swaps.flatMap((s) => [s.avoid, s.instead])];
  return [...sw.map((s) => s.name), ...g.summary.metal.split(" or "), ...g.summary.leather.split(" or ")];
}

describe.each([["de", DE], ["es", ES]] as [string, GuidePack][])("guide in %s", (lang, pack) => {
  it("translates every sentence and colour name of all 24 guides", () => {
    const missing = new Set<string>();
    for (const g of all) {
      const en = guideEn(g);
      for (const s of sentences(en)) if (!pack.sent[s]) missing.add(`sentence: ${s}`);
      for (const n of names(en)) if (!pack.colour[n]) missing.add(`colour: ${n}`);
    }
    expect([...missing]).toEqual([]);
  });

  it("builds without throwing and changes the language", () => {
    const g = guideFor(all[0]!, lang as "de" | "es");
    expect(g.summary.rules[0]).not.toBe(guideEn(all[0]!).summary.rules[0]);
    expect(g.accessories).toHaveLength(4);
  });
});
