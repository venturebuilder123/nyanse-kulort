// AI-generated people for the landing (docs/fase-b/AI-BEELDEN.md). Filled by
// scripts/measure-people.mjs, which runs our own analysis on every image: the face box for
// cropping and the drape colours come from the engine, not from hand-picking.
import data from "./people.json";
import type { BrandKey } from "./types";

export type Person = {
  src: string;
  face: { cx: number; cy: number; w: number; aspect: number };
  /** colours the engine recommends / advises against for this face */
  good: string;
  bad: string;
  season: string;
};

export const PEOPLE = data as Record<BrandKey, Person[]>;
