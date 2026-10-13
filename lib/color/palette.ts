// Master palette (CLAUDE.md §5): ±150 named colours, tagged with the season they come from.
// A profile's palette is the 30 colours nearest to the profile point; colours to avoid are
// the furthest in undertone and clarity. Names differ per brand where menswear and womenswear
// use different words (KULØRT "Navy", "Cognac"; NYANSE "Poederroze", "Salie").

import type { BrandKey } from "@/lib/brand/types";
import { hexToLab, labToLch } from "./convert";
import { profileDistance, SEASONS, type Scales, type SeasonKey } from "./seasons";

type Entry = readonly [hex: string, name: string, brandNames?: Partial<Record<BrandKey, string>>];

const MASTER: Record<SeasonKey, readonly Entry[]> = {
  lightSpring: [
    ["#F6CBA8", "Perzik"], ["#F3A27A", "Abrikoos"], ["#EE7A67", "Koraal"], ["#F4A3A0", "Zalmroze"],
    ["#F4E3A1", "Boter", { kulort: "Zand" }], ["#E8C468", "Lichtgoud"], ["#A8DDBE", "Munt"], ["#7FCBC4", "Aqua"],
    ["#98C1E9", "Hemelsblauw"], ["#C3B1E1", "Lila"], ["#C9A47E", "Licht camel"], ["#FAF0DC", "Warm ivoor"],
    ["#8FBF6A", "Lentegroen"],
  ],
  warmSpring: [
    ["#F28C38", "Mandarijn"], ["#E2533A", "Tomaat"], ["#F2B632", "Goudgeel"], ["#F7A168", "Papaya"],
    ["#79B94B", "Grasgroen"], ["#2BB3A8", "Turkoois"], ["#C79A5E", "Camel"], ["#4E86C4", "Korenblauw"],
    ["#D6403A", "Warm rood"], ["#A6A04C", "Licht olijf"], ["#9A6230", "Karamel", { kulort: "Cognac" }], ["#F6E7C8", "Crème"],
    ["#E58A5B", "Zalm"],
  ],
  brightSpring: [
    ["#FF6F61", "Helder koraal"], ["#FF8C1A", "Feloranje"], ["#FFD23F", "Zonnegeel"], ["#00A86B", "Jadegroen"],
    ["#00B5CC", "Helder turkoois"], ["#2F6FDE", "Felblauw"], ["#E6194B", "Klaprood"], ["#F75D9E", "Warm roze"],
    ["#8E5BD6", "Paars"], ["#FFFFF0", "Ivoorwit"], ["#23305E", "Helder navy", { nyanse: "Inktblauw" }], ["#8FD14F", "Limoen"],
    ["#C68E4E", "Goudbruin"],
  ],
  lightSummer: [
    ["#AFC6E0", "Poederblauw"], ["#BDB3DD", "Lavendel"], ["#F0B7C8", "Roze", { nyanse: "Poederroze", kulort: "Lichtroze" }], ["#A9D8CF", "Koele munt"],
    ["#7FA8C9", "Zeeblauw"], ["#C9CDD4", "Lichtgrijs"], ["#D9789A", "Zachte framboos"], ["#CFA9D6", "Pastelpaars"],
    ["#6F82A0", "Duifblauw"], ["#CFE5DD", "IJsgroen"], ["#CF9DA4", "Licht rozenhout"], ["#F4F3F0", "Zachtwit"],
    ["#9AA9C9", "Maagdenpalm"],
  ],
  coolSummer: [
    ["#5B7DB1", "Middenblauw"], ["#8C6BAE", "Koel paars"], ["#C25B86", "Framboos"], ["#4F8F8B", "Blauwgroen"],
    ["#2F4A6D", "Marine", { kulort: "Navy" }], ["#A7B3C2", "Staalgrijs"], ["#E3A1B9", "Koel roze"], ["#6D6E8C", "Grijsblauw"],
    ["#B04A6A", "Bessenrood"], ["#3E6E9C", "Denim"], ["#D7D9DE", "Zilvergrijs"], ["#F1F1F4", "Koel wit"],
    ["#7E9DB8", "Koel hemelsblauw"],
  ],
  softSummer: [
    ["#8FA3B8", "Stoffig blauw"], ["#B88A8E", "Rozenhout"], ["#A3B09A", "Salie"], ["#A6879C", "Mauve"],
    ["#5E6A7A", "Leisteen"], ["#6E5468", "Zachte pruim"], ["#C9A9AC", "Grijsroze"], ["#7FA39B", "Zeegroen"],
    ["#9A8F8A", "Koel taupe"], ["#4F6886", "Denim", { kulort: "Washed denim" }], ["#A9A2BD", "Lavendelgrijs"], ["#ECE8E2", "Gebroken wit"],
    ["#7D8471", "Grijsgroen", { kulort: "Steengroen" }],
  ],
  softAutumn: [
    ["#B9926B", "Kameel", { kulort: "Camel" }], ["#7A7449", "Olijf"], ["#B8735A", "Zachte terracotta"], ["#6D7A4C", "Mosgroen"],
    ["#D49A82", "Warme zalm"], ["#A89A72", "Kaki"], ["#3F6A6A", "Zachte petrol"], ["#A8764B", "Karamel"],
    ["#B67C73", "Roestroze"], ["#6B4B38", "Chocolademelk", { kulort: "Tabak" }], ["#D8C3A0", "Zand"], ["#EFE6D6", "Warm wit"],
    ["#C9A86A", "Honing"],
  ],
  warmAutumn: [
    ["#C1440E", "Pompoen"], ["#D9822B", "Amber"], ["#B8860B", "Oker"], ["#6B8E23", "Olijfgroen"],
    ["#8B4513", "Zadelbruin", { kulort: "Cognac" }], ["#A0522D", "Siena"], ["#C9A227", "Mosterd"], ["#2E6B5E", "Petrolgroen"],
    ["#7B3F00", "Kastanje"], ["#E0A96D", "Licht kameel"], ["#9E2A2B", "Steenrood"], ["#556B2F", "Legergroen"],
    ["#F2E3C6", "Room"],
  ],
  deepAutumn: [
    ["#4E3022", "Chocolade"], ["#A2462A", "Roest"], ["#C99A1E", "Diep mosterd"], ["#2F4F3A", "Bosgroen"],
    ["#5A2F3F", "Warme aubergine"], ["#1F5C63", "Petrol"], ["#B5382C", "Diep tomaat"], ["#5B5A2E", "Diep olijf"],
    ["#B5652F", "Koper"], ["#8E5432", "Kaneel"], ["#6E1F2A", "Warm bordeaux", { kulort: "Bordeaux" }], ["#EADCC2", "Kalkwit"],
    ["#3B2F2F", "Espresso"],
  ],
  deepWinter: [
    ["#1B2A5C", "Inktblauw", { kulort: "Navy" }], ["#0B6B4F", "Diep smaragd"], ["#9E0F35", "Robijn"], ["#3F1A44", "Aubergine"],
    ["#1E50B4", "Kobalt"], ["#C2177A", "Fuchsia"], ["#C8102E", "Koel rood"], ["#2C2C30", "Houtskool", { kulort: "Antraciet" }],
    ["#00848C", "Koel turkoois"], ["#111111", "Zwart"], ["#D9DDE3", "IJsgrijs"], ["#FFFFFF", "Wit"],
    ["#3A2A6B", "Indigo"],
  ],
  coolWinter: [
    ["#1F4FC4", "Koningsblauw"], ["#009B77", "Smaragd"], ["#D61A7F", "Fuchsia"], ["#F3D3E3", "IJsroze"],
    ["#0F3D8C", "Saffier"], ["#B0103A", "Robijnrood"], ["#3A3D45", "Antraciet"], ["#CFE6F5", "IJsblauw"],
    ["#6A2C91", "Koel paars"], ["#B9BEC6", "Zilver"], ["#141414", "Zwart"], ["#FFFFFF", "Helder wit"],
    ["#0E4C92", "Royal navy", { nyanse: "Nachtblauw" }],
  ],
  brightWinter: [
    ["#FF1493", "Felroze", { kulort: "Fuchsia" }], ["#0047AB", "Kobalt"], ["#00A693", "Helder smaragd"], ["#DC143C", "Karmijn"],
    ["#7B2CBF", "Helder paars"], ["#00B7EB", "Helder cyaan"], ["#FFFFFF", "Wit"], ["#111111", "Zwart"],
    ["#2E3A87", "Ultramarijn"], ["#E0F7FF", "IJsblauw"], ["#F9E000", "Citroengeel"], ["#9B111E", "Diep robijn"],
    ["#C0C0C8", "Zilver"],
  ],
};

export type PaletteColor = {
  id: string;
  hex: string;
  name: string;
  season: SeasonKey;
  /** position in profile space: the season centre, nudged by the colour's own depth and chroma */
  point: Scales;
};

const ALL: PaletteColor[] = (Object.keys(MASTER) as SeasonKey[]).flatMap((season) =>
  MASTER[season].map(([hex, name], i) => {
    const { L, C } = labToLch(hexToLab(hex));
    const c = SEASONS[season].centre;
    return {
      id: `${season}-${i}`,
      hex,
      name,
      season,
      point: {
        undertone: c.undertone,
        depth: 0.75 * c.depth + 0.25 * (1 - L / 100),
        clarity: 0.75 * c.clarity + 0.25 * Math.min(1, C / 70),
      },
    };
  }),
);

const brandNames = new Map<string, Partial<Record<BrandKey, string>> | undefined>(
  (Object.keys(MASTER) as SeasonKey[]).flatMap((season) =>
    MASTER[season].map(([, , names], i) => [`${season}-${i}`, names] as const),
  ),
);

export function colorName(c: PaletteColor, brand: BrandKey): string {
  return brandNames.get(c.id)?.[brand] ?? c.name;
}

export const MASTER_SIZE = ALL.length;

export type ProfilePalette = {
  /** 30 colours, nearest first */
  colors: PaletteColor[];
  /** 3–6 colours to avoid: furthest in undertone and clarity */
  avoid: PaletteColor[];
};

export function paletteFor(p: Scales, size = 30, avoidCount = 4): ProfilePalette {
  const near = [...ALL].sort((a, b) => profileDistance(p, a.point) - profileDistance(p, b.point));
  const colors = dedupe(near).slice(0, size);
  // Avoid: opposite undertone and clarity matter most; depth less so (CLAUDE.md §5).
  const clash = (c: PaletteColor) => Math.abs(c.point.undertone - p.undertone) / 2 + Math.abs(c.point.clarity - p.clarity);
  const candidates = dedupe([...ALL].sort((a, b) => clash(b) - clash(a)))
    // keep avoid colours recognisable: skip near-neutrals like white and black
    .filter((c) => labToLch(hexToLab(c.hex)).C > 20)
    .slice(0, 15);
  // spread them, so the list is not four shades of the same mistake
  const avoid = spread(candidates, avoidCount);
  return { colors, avoid };
}

/** Pick `n` colours from a palette that are spread over hue and lightness (for the 6 free colours). */
export function spread(colors: PaletteColor[], n: number): PaletteColor[] {
  const lab = new Map(colors.map((c) => [c.id, hexToLab(c.hex)]));
  const picked: PaletteColor[] = [];
  const pool = colors.filter((c) => labToLch(lab.get(c.id)!).C > 12); // skip near-greys for the showcase
  if (pool[0]) picked.push(pool[0]);
  while (picked.length < n && picked.length < pool.length) {
    let best: PaletteColor | null = null;
    let bestD = -1;
    for (const c of pool) {
      if (picked.includes(c)) continue;
      const a = lab.get(c.id)!;
      const d = Math.min(...picked.map((q) => {
        const b = lab.get(q.id)!;
        return Math.hypot(a.L - b.L, a.a - b.a, a.b - b.b);
      }));
      if (d > bestD) { bestD = d; best = c; }
    }
    if (!best) break;
    picked.push(best);
  }
  return picked;
}

/** The colour that differs most from `ref` (for a clear before/after). */
export function mostDifferent(ref: PaletteColor, list: PaletteColor[]): PaletteColor | undefined {
  const r = hexToLab(ref.hex);
  return [...list].sort((a, b) => {
    const A = hexToLab(a.hex), B = hexToLab(b.hex);
    return Math.hypot(B.L - r.L, B.a - r.a, B.b - r.b) - Math.hypot(A.L - r.L, A.a - r.a, A.b - r.b);
  })[0];
}

/** Showcase colours: diverse, but only from the core of the palette. */
export const showcase = (p: ProfilePalette, n = 6) => spread(p.colors.slice(0, 15), n);

function dedupe(list: PaletteColor[]): PaletteColor[] {
  const seen = new Set<string>();
  return list.filter((c) => (seen.has(c.hex) ? false : (seen.add(c.hex), true)));
}
