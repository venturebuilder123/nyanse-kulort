// A profile for someone who already knows their season ("ik weet mijn kleurtype al"):
// the season's centre point on the three scales. No measurement, so no confidence claim
// beyond "this is what you told us"; the app says so and offers the free selfie to check.

import { RULES, type Profile } from "./profile";
import { nearestSeason, SEASONS, type SeasonKey } from "./seasons";

export function profileForSeason(key: SeasonKey): Profile {
  const c = SEASONS[key].centre;
  return {
    ...c,
    confidence: { undertone: 1, depth: 1, clarity: 1, overall: 1 },
    match: nearestSeason(c),
    rulesVersion: RULES.version,
  };
}
