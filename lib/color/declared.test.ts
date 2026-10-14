import { describe, expect, it } from "vitest";
import { profileForSeason } from "./declared";
import { SEASONS, type SeasonKey } from "./seasons";

describe("profileForSeason", () => {
  it("lands on the season that was chosen, for all 12", () => {
    for (const k of Object.keys(SEASONS) as SeasonKey[]) expect(profileForSeason(k).match.season).toBe(k);
  });
});
