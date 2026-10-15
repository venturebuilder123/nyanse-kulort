// The personal style guide (the paid product). Everything is derived from the person's own
// profile and palette, so every guide is unique (CLAUDE.md §4: "PDF uniek per gebruiker").
// Content rules are plain colour logic; nothing here is unmeasured marketing.

import type { BrandKey } from "@/lib/brand/types";
import { hexToLab, labToLch } from "@/lib/color/convert";
import { clarityWord, depthWord, familyOf, undertoneWord } from "@/lib/color/describe";
import { colorName, paletteFor, type PaletteColor } from "@/lib/color/palette";
import type { Profile } from "@/lib/color/profile";
import { SEASONS } from "@/lib/color/seasons";

export type Swatch = { name: string; hex: string };
export type Piece = { item: string; color: Swatch; /** metal or leather of a two-part accessory */ second?: string };
export type Combo = { title: string; occasion: string; pieces: Piece[]; tip: string; /** accessories in the person's metal and leather */ extras: Piece[] };
export type Accessory = { title: string; text: string; swatches: Swatch[] };

export type Swap = { avoid: Swatch; instead: Swatch; reason: string };

export type Guide = {
  /** one-glance summary (page 2) */
  summary: { core: Swatch[]; avoid: Swatch[]; metal: string; leather: string; rules: string[] };
  /** "niet dit, maar dit": each colour to avoid with the nearest colour that does work */
  swaps: Swap[];
  brand: BrandKey;
  season: string;
  family: string;
  second?: string;
  scales: { undertone: string; depth: string; clarity: string; values: { undertone: number; depth: number; clarity: number } };
  groups: { title: string; text: string; colors: Swatch[] }[];
  contrast: { title: string; text: string };
  combos: Combo[];
  accessories: Accessory[];
  makeup?: Accessory[];
  avoid: { color: Swatch; reason: string }[];
  capsule: { item: string; color: Swatch }[];
  shopping: string[];
  pass: Swatch[];
  /** your own white, dark and denim: the basics everyone buys most */
  basics: { title: string; text: string; color: Swatch }[];
  /** the first five pieces to buy, in order of impact */
  firstBuys: { item: string; color: Swatch; why: string }[];
  /** a ten-minute wardrobe check */
  audit: string[];
};

const lch = (hex: string) => labToLch(hexToLab(hex));

export function buildGuide(p: Profile, brand: BrandKey): Guide {
  const pal = paletteFor(p, brand);
  const sw = (c: PaletteColor): Swatch => ({ name: colorName(c, brand), hex: c.hex });
  const warm = p.undertone > 0.15, cool = p.undertone < -0.15;
  const deep = p.depth > 0.6, pale = p.depth < 0.35;
  const bright = p.clarity > 0.6, soft = p.clarity < 0.35;

  // --- groups: neutrals, base (dark anchors), accents ---
  const withL = pal.colors.map((c) => ({ c, ...lch(c.hex) }));
  // a usable wardrobe split, by rank rather than fixed thresholds (fixed ones gave 3/2/25):
  // 6 neutrals (least chroma), 8 base (darkest of the rest), the remaining 16 are accents
  const byC = [...withL].sort((a, b) => a.C - b.C);
  // a neutral is genuinely quiet (low chroma); bright palettes simply have fewer of them
  const neutrals = byC.filter((x) => x.C < 32).slice(0, 6);
  const rest = byC.filter((x) => !neutrals.includes(x));
  const base = [...rest].sort((a, b) => a.L - b.L).slice(0, 8);
  const accents = rest.filter((x) => !base.includes(x));
  const groups = [
    { title: "Basis", text: "Je donkere ankers: broeken, jassen, colberts en schoenen. Hier begint elke outfit.", colors: base.map((x) => sw(x.c)) },
    { title: "Neutraal", text: "Rustige kleuren die alles verbinden: shirts, truien en lagen onder of over je accenten.", colors: neutrals.map((x) => sw(x.c)) },
    { title: "Accent", text: "De kleuren die je gezicht laten oplichten. Draag ze dicht bij je gezicht: shirt, trui, sjaal.", colors: accents.map((x) => sw(x.c)) },
  ].filter((g) => g.colors.length > 0);

  // pick helpers: colours matched to garment types (jeans in denim blue, chinos in a mid neutral)
  const darkest = [...withL].sort((a, b) => a.L - b.L);
  const lightest = [...withL].sort((a, b) => b.L - a.L);
  const men = brand === "kulort";
  // men's tops stay wearable: moderate chroma first, the loudest last (a menswear knit is rarely neon)
  // soft types: the accent closest to their own colouring (the list is nearest-first), never the
  // loudest (review: Soft Autumn got a lime "Olijfgroen" knit)
  const loudest = soft
    ? [...(accents.length ? accents : withL)].sort((a, b) => withL.indexOf(a) - withL.indexOf(b))
    : [...(accents.length ? accents : withL)].sort((a, b) => (men ? Number(a.C > 65) - Number(b.C > 65) : 0) || b.C - a.C);
  const at = (list: typeof withL, i: number) => (list.length ? list[Math.min(i, list.length - 1)]!.c : darkest[0]!.c);
  const anchors = base.length ? [...base].sort((a, b) => a.L - b.L) : darkest;
  const dark = (i: number) => at(anchors, i);
  const light = (i: number) => at(lightest, i);
  // tops never repeat the trouser colour (set once the trousers are known, below)
  let topPool = loudest;
  const accent = (i: number) => at(topPool, i);
  const isDenim = (x: { L: number; C: number; h: number }) => x.L < 50 && x.C > 12 && x.h > 220 && x.h < 290;
  // a real denim depth (not the darkest navy, which is "your dark" already)
  const darkestAll = darkest[0]!.c;
  const denimList = [...withL].filter(isDenim).sort((a, b) => Number(a.c === darkestAll) - Number(b.c === darkestAll) || Math.abs(a.L - 38) - Math.abs(b.L - 38));
  const denim = at(denimList, 0);
  const midNeutral = at(
    [...withL].filter((x) => x.C < 30 && x.L >= 40 && x.L <= 80).sort((a, b) => Math.abs(a.L - 60) - Math.abs(b.L - 60)),
    0,
  );
  const hasDenim = withL.some(isDenim);
  // jeans are always denim: from the palette when it has a denim blue, otherwise a plain wash by depth
  const jeansFromPalette = hasDenim && !(denimList.length === 1 && denim === darkestAll);
  const jeans: Swatch = jeansFromPalette
    ? { name: colorName(denim, brand), hex: denim.hex }
    : p.depth > 0.55 ? { name: "Donker denim", hex: "#26334A" } : p.depth < 0.3 ? { name: "Licht denim", hex: "#7D93AE" } : { name: "Middenblauw denim", hex: "#4A607E" };
  // Garment realism (guide review 15 Oct: a turquoise chino, purple shoes, a mustard overshirt):
  // jackets and overshirts come from quiet dark anchors (navy, charcoal, espresso, deep olive),
  // trousers from quiet mid tones or denim, shoes and belts from the leather colours, and colour
  // lives on tops, knits and scarves.
  // classic tailoring hues: grey and charcoal, navy and blue, stone, khaki, brown and olive
  const classic = (x: { C: number; h: number }) => x.C < 12 || (x.h >= 220 && x.h <= 300) || (x.h >= 35 && x.h <= 110);
  const quietDark = [...withL]
    .filter((x) => x.C < 32 && x.L < 45)
    .sort((a, b) => Number(!classic(a)) - Number(!classic(b)) || Number(a.L < 14) - Number(b.L < 14) || a.L - b.L);
  const jacket = quietDark[0]?.c ?? dark(0);
  const outerwear =
    quietDark.find((x) => x.c !== jacket)?.c ??
    [...withL].filter((x) => x.c !== jacket && x.L < 55).sort((a, b) => a.C - b.C)[0]?.c ??
    dark(1);
  const trouserList = [...withL]
    .filter((x) => x.C < 30 && x.L >= 22 && x.L <= 78 && x.c !== jacket && classic(x) && !/zilver|ijs|wit/i.test(x.c.name))
    .sort((a, b) => Math.abs(a.L - (men ? 55 : 50)) - Math.abs(b.L - (men ? 55 : 50)));
  // no quiet mid tone in the palette (winters, clear springs): a plain grey or stone trouser,
  // never a fashion colour and never the jacket's colour
  const trousers: Swatch = trouserList[0]
    ? sw(trouserList[0].c)
    : warm ? { name: "Steen", hex: "#B5A88F" } : { name: "Middengrijs", hex: "#8B8E94" };
  topPool = loudest.filter((x) => x.c.hex !== trousers.hex);
  if (!topPool.length) topPool = loudest;

  // garments we have real photos of (docs/brand/GEMINI-HANDBOEK.md §8), recoloured per person
  const items = men
    ? { top: "Overhemd", knit: "Trui", jacket: "Colbert", pants: "Chino", jeans: "Jeans", shoes: "Sneakers", dateTop: "Overhemd", dateBottom: "Chino", outer: "Overshirt", finish: "Schoenen" }
    : { top: "Blouse", knit: "Trui", jacket: "Blazer", pants: "Pantalon", jeans: "Jeans", shoes: "Schoenen", dateTop: "Top", dateBottom: "Rok", outer: "Blazer", finish: "Sjaal" };

  // --- accessories ---
  const metal: Swatch[] = warm
    ? [{ name: "Goud", hex: "#C9A24A" }, { name: "Brons", hex: "#A97142" }, { name: "Koper", hex: "#B5652F" }]
    : cool
      ? [{ name: "Zilver", hex: "#BFC4CB" }, { name: "Witgoud", hex: "#D9DADC" }, { name: "Platina", hex: "#A9AEB4" }]
      : [{ name: "Roségoud", hex: "#C99383" }, { name: "Goud", hex: "#C9A24A" }, { name: "Zilver", hex: "#BFC4CB" }];
  const leather: Swatch[] = warm
    ? deep ? [{ name: "Donkerbruin", hex: "#4E3022" }, { name: "Cognac", hex: "#9A5B2E" }] : [{ name: "Cognac", hex: "#9A5B2E" }, { name: "Camel", hex: "#B88A5A" }]
    : cool
      ? deep ? [{ name: "Zwart", hex: "#151515" }, { name: "Bordeaux", hex: "#5B1A2B" }] : [{ name: "Grijsbruin", hex: "#6E6460" }, { name: "Navy", hex: "#26324A" }]
      : [{ name: "Donkerbruin", hex: "#4E3022" }, { name: "Taupe", hex: "#8A7B6E" }];
  const leatherFirst = leather[0]!;

  // a deep, clear person (Deep and Cool Winter) carries contrast as well as a bright one
  const high = bright || (deep && p.clarity > 0.45);
  const contrast = high
    ? { title: "Jij kunt contrast hebben", text: "Licht naast donker en een heldere kleur bij je gezicht staan je sterk. Te veel van hetzelfde maakt je juist vlak." }
    : soft
      ? { title: "Jij wint met tonaal", text: "Kleuren die dicht bij elkaar liggen laten je rustig en verzorgd ogen. Harde contrasten, zoals zwart met wit, trekken de aandacht weg van je gezicht." }
      : { title: "Jij zit in het midden", text: "Gemiddeld contrast werkt het best: één duidelijk accent per outfit, de rest rustig." };

  const combos: Combo[] = [
    {
      title: "Werk",
      occasion: "werk",
      pieces: [
        { item: items.jacket, color: sw(jacket) },
        { item: items.top, color: sw(light(0)) },
        { item: items.pants, color: trousers },
      ],
      tip: high
        ? men ? "Een das of pochet in een heldere accentkleur maakt het af." : "Een sjaal of sieraad in een heldere accentkleur maakt het af."
        : "Houd het tonaal: één familie van kleuren, verschillende diepten.",
      extras: [],
    },
    {
      title: "Weekend",
      occasion: "weekend",
      pieces: [
        { item: items.knit, color: sw(accent(1)) },
        { item: items.jeans, color: jeans },
        { item: items.shoes, color: men ? sw(light(0)) : leatherFirst },
      ],
      tip: "De accentkleur zit bij je gezicht, de rest ondersteunt.",
      extras: [],
    },
    {
      title: "Date",
      occasion: "date",
      pieces: [
        { item: items.dateTop, color: sw(accent(0)) },
        { item: items.dateBottom, color: men ? trousers : sw(dark(1)) },
        { item: items.outer, color: sw(men ? outerwear : jacket) },
      ],
      tip: "Je sterkste kleur onder je gezicht: daar kijkt de ander naar.",
      extras: [],
    },
    {
      title: "Feest",
      occasion: "feest",
      pieces: [
        { item: items.jacket, color: sw(men ? jacket : dark(0)) },
        { item: items.top, color: sw(accent(2)) },
        { item: items.finish, color: men ? leatherFirst : sw(accent(3)) },
      ],
      tip: "Diep en rijk, met één kleur die opvalt.",
      extras: [],
    },
  ];

  const frame: Swatch = pale
    ? { name: "Licht schildpad of transparant", hex: "#C9A27A" }
    : deep ? { name: "Donker schildpad of zwart", hex: "#2B1E16" } : { name: "Zacht schildpad of grijs", hex: "#7A6656" };
  const metalText = warm ? "Warm metaal laat je huid gloeien." : cool ? "Koel metaal past bij je koele ondertoon." : "Je ondertoon is neutraal: roségoud en beide metalen werken.";

  const accessories: Accessory[] = men
    ? [
        { title: "Horloge", text: `${metal[0]!.name} kast, ${leather[0]!.name.toLowerCase()} band. ${metalText}`, swatches: [metal[0]!, leather[0]!] },
        { title: "Riem", text: `${leather[0]!.name} leer met een ${metal[0]!.name.toLowerCase()} gesp; laat hem matchen met je schoenen.`, swatches: [leather[0]!, metal[0]!] },
        { title: "Schoenen", text: `${leather.map((l) => l.name).join(" of ")} leer of suède.`, swatches: leather },
        { title: "Bril en zonnebril", text: `${frame.name}: het montuur sluit aan bij je diepte.`, swatches: [frame] },
      ]
    : [
        { title: "Sieraden", text: `${metal.map((m) => m.name).join(", ")}. ${metalText}`, swatches: metal },
        { title: "Tas en schoenen", text: `${leather.map((l) => l.name).join(" of ")}: kies één leerkleur en houd die vast.`, swatches: leather },
        { title: "Sjaal", text: `Een accentkleur bij je gezicht: ${sw(accent(0)).name.toLowerCase()} of ${sw(accent(1)).name.toLowerCase()}.`, swatches: [sw(accent(0)), sw(accent(1))] },
        { title: "Zonnebril", text: `${frame.name}.`, swatches: [frame] },
      ];

  // every look gets the same metal and leather: one leather colour, held throughout
  // men's looks stay clean (no accessories in the flat-lay); women's get the bag in their leather
  const extras: Piece[] = men ? [] : [{ item: "Tas", color: leather[0]!, second: metal[0]!.hex }];
  for (const c of combos) c.extras = extras;

  // make-up (NYANSE): lips from the red/pink accents, blush lighter, eyes from the base
  let makeup: Accessory[] | undefined;
  if (!men) {
    const reds = withL.filter((x) => (x.h < 40 || x.h > 330) && x.C > 25).sort((a, b) => b.C - a.C);
    const lip = reds[0]?.c ?? accent(0);
    const blush = withL.filter((x) => (x.h < 60 || x.h > 320) && x.L > 60).sort((a, b) => b.C - a.C)[0]?.c ?? light(1);
    const eyes = [dark(0), dark(1)];
    makeup = [
      { title: "Lippen", text: soft ? "Gedempt en romig, niet te glanzend." : "Een heldere tint mag: hij past bij je contrast.", swatches: [sw(lip)] },
      { title: "Blush", text: warm ? "Perzik- en koraaltinten." : cool ? "Roze- en bestinten." : "Zacht rozenhout.", swatches: [sw(blush)] },
      { title: "Ogen", text: "Je basiskleuren als oogschaduw of eyeliner.", swatches: eyes.map(sw) },
    ];
  }

  // --- avoid, with the reason ---
  const avoid = pal.avoid.map((c) => {
    // the reason follows what the eye sees: a yellow is "too warm", a vivid cobalt "too bright"
    const { h, C } = lch(c.hex);
    const warmHue = C > 20 && h >= 20 && h <= 110, coolHue = C > 20 && h >= 180 && h <= 320;
    const reason =
      cool && warmHue && c.point.undertone > 0 ? "te warm voor je koele ondertoon"
      : warm && coolHue && c.point.undertone < 0 ? "te koel voor je warme ondertoon"
      : c.point.clarity > p.clarity + 0.25 ? (soft ? "te fel naast je zachte kleuren" : "te fel: hij overstemt je gezicht")
      : c.point.clarity < p.clarity - 0.25 ? "te vlak naast je contrast"
      : c.point.undertone > 0 && cool ? "te warm voor je koele ondertoon"
      : c.point.undertone < 0 && warm ? "te koel voor je warme ondertoon"
      : "trekt de aandacht weg van je gezicht";
    return { color: sw(c), reason };
  });

  // --- capsule: 12 pieces that combine with each other ---
  const capsuleItems = men
    ? ["Colbert", "Overshirt", "Chino", "Jeans", "Overhemd", "Overhemd", "Trui", "Trui", "Overshirt", "Sneakers", "Schoenen", "Riem"]
    : ["Blazer", "Longsleeve", "Pantalon", "Jeans", "Blouse", "Blouse", "Top", "Top", "Trui", "Rok", "Sjaal", "Tas"];
  // colour per garment type, so the capsule reads like a real wardrobe
  const capsuleColors = men
    ? [sw(jacket), sw(outerwear), trousers, jeans, sw(light(0)), sw(light(1)), sw(accent(0)), sw(accent(1)), sw(dark(1) !== jacket ? dark(1) : dark(2)), sw(light(0)), leather[0]!, leather[0]!]
    : [sw(jacket), sw(light(2)), trousers, jeans, sw(light(0)), sw(accent(2)), sw(light(1)), sw(accent(0)), sw(accent(1)), sw(dark(2)), sw(accent(3)), leather[0]!];
  const capsule = capsuleItems.map((item, i) => ({ item, color: capsuleColors[i]! }));

  const shopping = [
    "Houd het kledingstuk bij daglicht onder je kin. Lichten je ogen op en oogt je huid egaal? Dan is het jouw kleur.",
    "Twijfel tussen twee tinten? Kies de tint die het dichtst bij een kleur op je pas ligt.",
    `Een kleur die je niet staat, kan wel onder je middel: ${men ? "als broek of schoenen" : "als broek, rok of schoenen"}.`,
    "Online: vergelijk de productfoto met je pas op hetzelfde scherm. Productfoto's zijn vaak warmer of feller dan in het echt.",
    contrast.title + ": " + contrast.text.split(".")[0] + ".",
  ];

  // "Niet dit, maar dit": the palette colour closest in hue to each colour to avoid
  const hueDist = (a: number, b: number) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
  const used = new Set<PaletteColor>();
  const swaps: Swap[] = avoid.map(({ color, reason }) => {
    const t = lch(color.hex);
    const pool = withL.filter((x) => !used.has(x.c) && (t.C < 25 && (t.L > 70 || t.C < 12) ? x.C < 15 : x.C > 15));
    const score = (x: (typeof withL)[number]) => hueDist(x.h, t.h) + 0.8 * Math.abs(x.L - t.L);
    const best = [...(pool.length ? pool : withL)].sort((a, b) => score(a) - score(b))[0]!;
    used.add(best.c);
    return { avoid: color, instead: sw(best.c), reason };
  });

  const rules = [
    high ? "Contrast mag: licht naast donker." : soft ? "Kies tonaal: kleuren dicht bij elkaar." : "Eén accent per outfit, de rest rustig.",
    warm ? "Warm boven koel: goud, camel, roest." : cool ? "Koel boven warm: zilver, navy, ijstinten." : "Neutraal: je kunt beide kanten op, kies zacht.",
    deep ? "Diepe kleuren dragen je; pastel valt weg." : pale ? "Lichte kleuren laten je stralen; zwart is te zwaar." : "Middentinten zijn je basis; extremen spaarzaam.",
  ];

  // --- basics: your white, your dark, your denim ---
  const lightestNeutral = [...withL].sort((a, b) => b.L - a.L)[0]!;
  const darkestBase = [...withL].sort((a, b) => a.L - b.L)[0]!;
  const pureWhite = lightestNeutral.L > 96 && lightestNeutral.C < 4;
  const realBlack = darkestBase.L < 16 && darkestBase.C < 8;
  const basics = [
    {
      title: "Jouw wit",
      text: pureWhite
        ? "Helder wit staat je, ook dicht bij je gezicht. Gebroken wit en crème maken je juist vaal."
        : warm
          ? "Geen helder wit, maar een warme, romige tint. Die laat je huid gloeien in plaats van grauw."
          : "Geen spierwit, maar een zachte, gebroken tint. Die oogt frisser bij jouw gezicht.",
      color: sw(lightestNeutral.c),
    },
    {
      title: men ? "Jouw zwart" : "Jouw donker",
      text: realBlack
        ? "Zwart mag, juist naast wit of een heldere kleur. Je gezicht kan die diepte aan."
        : "Liever niet zwart bij je gezicht: deze tint geeft dezelfde diepte zonder je te overstemmen.",
      color: sw(darkestBase.c),
    },
    {
      title: "Jouw denim",
      text: jeansFromPalette
        ? "Kies denim in deze tint: dan combineert je jeans met al je bovenstukken."
        : soft
          ? "Een egale, iets vergrijsde wassing. Felle stonewash en bijna-zwart zijn te hard naast je zachte kleuren."
          : "Egaal en zonder vaal of verwassen effect, in deze diepte.",
      color: jeans,
    },
  ];

  // --- first five buys, in order of impact (face first, then the anchors) ---
  const firstBuys = (men
    ? [
        { item: "Overhemd", color: sw(light(0)), why: "Dicht bij je gezicht en elke dag te dragen." },
        { item: "Trui", color: sw(accent(0)), why: "Je sterkste kleur, daar kijken mensen naar." },
        { item: "Chino", color: trousers, why: "Een rustige basis onder alles." },
        { item: "Colbert of overshirt", color: sw(jacket), why: "Maakt elke outfit af, van werk tot weekend." },
        { item: "Schoenen en riem", color: leather[0]!, why: "Eén leerkleur die je steeds herhaalt." },
      ]
    : [
        { item: "Blouse of top", color: sw(accent(0)), why: "Je sterkste kleur dicht bij je gezicht." },
        { item: "Trui", color: sw(light(0)), why: "Zacht, licht en met alles te combineren." },
        { item: "Pantalon", color: trousers, why: "Een rustige basis onder al je kleuren." },
        { item: "Blazer", color: sw(jacket), why: "Maakt elke outfit af, van werk tot diner." },
        { item: "Sjaal", color: sw(accent(1)), why: "De snelste manier om een outfit in je kleuren te brengen." },
      ]);

  const audit = [
    "Leg alles wat je bij je gezicht draagt (shirts, truien, sjaals) op bed, bij daglicht.",
    "Houd je kleurenpas of je 30 kleuren ernaast. Lijkt een stuk op een van je kleuren? Houden.",
    "Twijfel? Houd het onder je kin voor de spiegel. Licht je gezicht op, dan houden.",
    `Staat het je niet, maar draag je het graag? Draag het onder je middel: ${men ? "als broek of schoenen" : "als broek, rok of schoenen"}.`,
    "Wat overblijft: doorverkopen of weggeven. Zo heb je minder, maar draag je alles.",
  ];

  return {
    summary: {
      core: pal.colors.slice(0, 8).map(sw),
      avoid: avoid.slice(0, 3).map((a) => a.color),
      metal: metal.slice(0, 2).map((m) => m.name).join(" of "),
      leather: leather.map((l) => l.name).join(" of "),
      rules,
    },
    swaps,
    brand,
    season: SEASONS[p.match.season].name,
    family: familyOf(p.match.season),
    second: p.match.border ? SEASONS[p.match.second].name : undefined,
    scales: {
      undertone: undertoneWord(p.undertone),
      depth: depthWord(p.depth),
      clarity: clarityWord(p.clarity),
      values: { undertone: p.undertone, depth: p.depth, clarity: p.clarity },
    },
    groups,
    basics,
    firstBuys,
    audit,
    contrast,
    combos,
    accessories,
    makeup,
    avoid,
    capsule,
    shopping,
    pass: pal.colors.slice(0, 8).map(sw),
  };
}
