// The 12 seasons as centre points in the three-scale profile space (CLAUDE.md §5).
// undertone: -1 cool … +1 warm · depth: 0 light … 1 deep · clarity: 0 soft … 1 bright
// v1 positions follow the classic 12-season definitions; they are tuned on phase A data.

export type Scales = { undertone: number; depth: number; clarity: number };

export type SeasonKey =
  | "lightSpring" | "warmSpring" | "brightSpring"
  | "lightSummer" | "coolSummer" | "softSummer"
  | "softAutumn" | "warmAutumn" | "deepAutumn"
  | "deepWinter" | "coolWinter" | "brightWinter";

export const SEASONS: Record<SeasonKey, { name: string; centre: Scales }> = {
  lightSpring: { name: "Light Spring", centre: { undertone: 0.45, depth: 0.15, clarity: 0.6 } },
  warmSpring: { name: "Warm Spring", centre: { undertone: 0.9, depth: 0.4, clarity: 0.65 } },
  brightSpring: { name: "Bright Spring", centre: { undertone: 0.4, depth: 0.45, clarity: 0.95 } },
  lightSummer: { name: "Light Summer", centre: { undertone: -0.45, depth: 0.15, clarity: 0.4 } },
  coolSummer: { name: "Cool Summer", centre: { undertone: -0.9, depth: 0.4, clarity: 0.4 } },
  softSummer: { name: "Soft Summer", centre: { undertone: -0.35, depth: 0.5, clarity: 0.12 } },
  softAutumn: { name: "Soft Autumn", centre: { undertone: 0.35, depth: 0.5, clarity: 0.12 } },
  warmAutumn: { name: "Warm Autumn", centre: { undertone: 0.9, depth: 0.6, clarity: 0.35 } },
  deepAutumn: { name: "Deep Autumn", centre: { undertone: 0.45, depth: 0.88, clarity: 0.45 } },
  deepWinter: { name: "Deep Winter", centre: { undertone: -0.45, depth: 0.88, clarity: 0.6 } },
  coolWinter: { name: "Cool Winter", centre: { undertone: -0.9, depth: 0.6, clarity: 0.7 } },
  brightWinter: { name: "Bright Winter", centre: { undertone: -0.4, depth: 0.45, clarity: 0.95 } },
};

/** Undertone spans 2 units (-1..1), the others 1; halve it so all axes weigh the same. */
export function profileDistance(p: Scales, q: Scales): number {
  return Math.hypot((p.undertone - q.undertone) / 2, p.depth - q.depth, p.clarity - q.clarity);
}

/** Within this distance margin the second season counts as a neighbour ("tussen X en Y"). */
export const BORDER_MARGIN = 0.05;

export type SeasonMatch = {
  season: SeasonKey;
  distance: number;
  second: SeasonKey;
  secondDistance: number;
  /** true when the second season is nearly as close: show the border and mix palettes */
  border: boolean;
};

export function nearestSeason(p: Scales): SeasonMatch {
  const ranked = (Object.keys(SEASONS) as SeasonKey[])
    .map((key) => ({ key, d: profileDistance(p, SEASONS[key].centre) }))
    .sort((x, y) => x.d - y.d);
  const [first, second] = ranked as [(typeof ranked)[number], (typeof ranked)[number]];
  return {
    season: first.key,
    distance: first.d,
    second: second.key,
    secondDistance: second.d,
    border: second.d - first.d < BORDER_MARGIN,
  };
}
