// Gold or silver as a tiebreak (CLAUDE.md §6: "goud/zilver als snelle check").
// It only decides when the measurement sits on the border between a warm and a cool season;
// it never overrides a clear measurement.
import type { Profile } from "@/lib/color/profile";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import type { Jewel } from "./session";

const warm = (s: SeasonKey) => SEASONS[s].centre.undertone > 0;

export function applyJewel(p: Profile, jewel?: Jewel): Profile {
  const m = p.match;
  if (!jewel || jewel === "weetniet" || !m.border || warm(m.season) === warm(m.second)) return p;
  const prefersWarm = jewel === "goud";
  if (warm(m.season) === prefersWarm) return p;
  return {
    ...p,
    match: { ...m, season: m.second, second: m.season, distance: m.secondDistance, secondDistance: m.distance },
  };
}
