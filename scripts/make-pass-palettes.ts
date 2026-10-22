// The 8 colours on each colour card, straight from the colour engine, so the card always matches the
// guide. Dutch and English (21 Oct 2026: English customers too). Run before scripts/make-passes.mjs:
//   npx tsx scripts/make-pass-palettes.ts  →  assets/passes/palettes.json
import { writeFileSync } from "node:fs";
import { profileForSeason } from "@/lib/color/declared";
import { familyOf } from "@/lib/color/describe";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide } from "@/lib/guide/build";
import { guideEn } from "@/lib/guide/en";
import { familyName } from "@/lib/i18n/words";

const out: Record<string, unknown> = {};
for (const brand of ["kulort", "nyanse"] as const) {
  for (const season of Object.keys(SEASONS) as SeasonKey[]) {
    const nl = buildGuide(profileForSeason(season), brand);
    const en = guideEn(buildGuide(profileForSeason(season), brand));
    out[`${brand}-${season}`] = {
      brand, season, name: SEASONS[season].name,
      family: familyOf(season), familyEn: familyName(familyOf(season), "en"),
      metal: nl.summary.metal, metalEn: en.summary.metal,
      pass: nl.pass.map((c, i) => ({ name: c.name, nameEn: en.pass[i]!.name, hex: c.hex })),
    };
  }
}
writeFileSync("assets/passes/palettes.json", JSON.stringify(out, null, 1) + "\n");
console.log("wrote", Object.keys(out).length, "palettes");
