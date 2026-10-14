// AI-generated people for the landing (docs/fase-b/AI-BEELDEN.md). Filled by
// scripts/measure-people.mjs, which runs our own analysis on every image: the face box for
// cropping and the drape colours come from the engine, not from hand-picking.
import data from "./people.json";
import type { Segment } from "./segment";
import type { BrandKey } from "./types";

export type Person = {
  src: string;
  face: { cx: number; cy: number; w: number; h?: number; aspect: number };
  /** colours the engine recommends / advises against for this face */
  good: string;
  bad: string;
  season: string;
  /** age segment from the file name (kulort-jong-1.jpg, nyanse-40-2.jpg); absent = the core set */
  segment?: Segment;
};

export const PEOPLE = data as Record<BrandKey, Person[]>;

/** The models for this visitor: their age segment when there are images for it, else the core set. */
export function peopleFor(brand: BrandKey, segment: Segment | null): Person[] {
  const all = PEOPLE[brand];
  const own = segment ? all.filter((p) => p.segment === segment) : [];
  return own.length ? own : all.filter((p) => !p.segment);
}
