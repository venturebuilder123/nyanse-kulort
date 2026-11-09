// The young campaign photos (models v2, 9 Nov 2026; docs/brand/MODELLEN-V2.md), labelled by the season
// whose colours they wear. One place to pick the best photo for a brand and season.
import { familyOf } from "@/lib/color/describe";
import type { SeasonKey } from "@/lib/color/seasons";
import DATA from "./campaign.json";
import type { BrandKey } from "./types";

export type CampaignPhoto = { src: string; brand: BrandKey; season: SeasonKey; alt: string };
export const CAMPAIGN = DATA as CampaignPhoto[];

/** Exactly this season, else the same family (Spring, Summer, Autumn, Winter); null when there is none. */
export function campaignFor(brand: BrandKey, season: SeasonKey, exactOnly = false): CampaignPhoto | null {
  const mine = CAMPAIGN.filter((c) => c.brand === brand);
  return mine.find((c) => c.season === season) ?? (exactOnly ? null : mine.find((c) => familyOf(c.season) === familyOf(season)) ?? null);
}

/** All photos of a brand, for rotating doors and the like. */
export const campaignOf = (brand: BrandKey) => CAMPAIGN.filter((c) => c.brand === brand);
