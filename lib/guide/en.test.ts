import { describe, expect, it } from "vitest";
import type { Profile } from "@/lib/color/profile";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide } from "./build";
import { guideEn, itemSafe } from "./en";

// Every season, both brands: the English guide must contain no Dutch left (a gap falls back to Dutch silently on the site)
const DUTCH = /\b(je|jouw|het|een|van|niet|kleur|kleuren|onder|middel|liever|broek|schoenen|trui|koel|diep|zacht|helder)\b/i;
const strings = (v: unknown, key = ""): string[] =>
  typeof v === "string" ? (["item", "hex", "brand", "season", "second"].includes(key) ? [] : [v]) : Array.isArray(v) ? v.flatMap((x) => strings(x, key)) : v && typeof v === "object" ? Object.entries(v).flatMap(([k, x]) => (k === "values" ? [] : strings(x, k))) : [];

describe("guide in English", () => {
  for (const key of Object.keys(SEASONS) as SeasonKey[]) {
    for (const brand of ["nyanse", "kulort"] as const) {
      it(`${key} ${brand}`, () => {
        const c = SEASONS[key].centre;
        const p = { ...c, confidence: { ...c, overall: 1 }, match: { season: key, second: key, border: false, distance: 0, secondDistance: 1 }, rulesVersion: 4 } as Profile;
        const g = guideEn(buildGuide(p, brand));
        const left = strings(g).filter((s) => DUTCH.test(s));
        expect(left).toEqual([]);
        for (const i of [...g.capsule, ...g.firstBuys].map((x) => itemSafe(x.item))) expect(i).not.toMatch(DUTCH);
      });
    }
  }
});
