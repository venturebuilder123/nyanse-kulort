// The colour engine's guide per season and brand, for the Etsy packages (season centre as profile).
import { buildGuide, type Guide } from "@/lib/guide/build";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import type { Profile } from "@/lib/color/profile";

export function seasonGuide(key: SeasonKey, brand: "nyanse" | "kulort"): Guide {
  const c = SEASONS[key].centre;
  const p: Profile = { ...c, confidence: { ...c, overall: 1 }, match: { season: key, second: key, border: false } as Profile["match"], rulesVersion: 0 };
  return buildGuide(p, brand);
}
