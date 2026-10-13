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
  // neutrals: low chroma; base: dark anchors (dark AND not loud); accents: everything with colour
  const neutrals = withL.filter((x) => x.C < 18);
  const base = withL.filter((x) => x.C >= 18 && x.L < 40 && x.C < 50);
  const accents = withL.filter((x) => x.C >= 18 && !(x.L < 40 && x.C < 50));
  const groups = [
    { title: "Basis", text: "Je donkere ankers: broeken, jassen, colberts en schoenen. Hier begint elke outfit.", colors: base.map((x) => sw(x.c)) },
    { title: "Neutraal", text: "Rustige kleuren die alles verbinden: shirts, truien en lagen onder of over je accenten.", colors: neutrals.map((x) => sw(x.c)) },
    { title: "Accent", text: "De kleuren die je gezicht laten oplichten. Draag ze dicht bij je gezicht: shirt, trui, sjaal.", colors: accents.map((x) => sw(x.c)) },
  ].filter((g) => g.colors.length > 0);

  // pick helpers: colours matched to garment types (jeans in denim blue, chinos in a mid neutral)
  const darkest = [...withL].sort((a, b) => a.L - b.L);
  const lightest = [...withL].sort((a, b) => b.L - a.L);
  const loudest = [...accents.length ? accents : withL].sort((a, b) => b.C - a.C);
  const at = (list: typeof withL, i: number) => (list.length ? list[Math.min(i, list.length - 1)]!.c : darkest[0]!.c);
  const anchors = base.length ? [...base].sort((a, b) => a.L - b.L) : darkest;
  const dark = (i: number) => at(anchors, i);
  const light = (i: number) => at(lightest, i);
  const accent = (i: number) => at(loudest, i);
  const denim = at([...withL].filter((x) => x.L < 50 && x.h > 220 && x.h < 290).sort((a, b) => a.L - b.L), 0);
  const midNeutral = at(
    [...withL].filter((x) => x.C < 30 && x.L >= 40 && x.L <= 80).sort((a, b) => Math.abs(a.L - 60) - Math.abs(b.L - 60)),
    0,
  );
  const hasDenim = withL.some((x) => x.L < 50 && x.h > 220 && x.h < 290);
  // trousers under a jacket must differ from the jacket
  const trousers = midNeutral !== dark(0) ? midNeutral : dark(1) !== dark(0) ? dark(1) : light(1);

  const men = brand === "kulort";
  const items = men
    ? { top: "Overhemd", knit: "Trui", jacket: "Colbert", pants: "Chino", jeans: "Jeans", shoes: "Schoenen", tee: "T-shirt", coat: "Jas", scarf: "Sjaal" }
    : { top: "Blouse", knit: "Trui", jacket: "Blazer", pants: "Pantalon", jeans: "Jeans", shoes: "Schoenen", tee: "Top", coat: "Jas", scarf: "Sjaal" };

  const contrast = bright
    ? { title: "Jij kunt contrast hebben", text: "Licht naast donker en een heldere kleur bij je gezicht staan je sterk. Te veel van hetzelfde maakt je juist vlak." }
    : soft
      ? { title: "Jij wint met tonaal", text: "Kleuren die dicht bij elkaar liggen laten je rustig en verzorgd ogen. Harde contrasten, zoals zwart met wit, trekken de aandacht weg van je gezicht." }
      : { title: "Jij zit in het midden", text: "Gemiddeld contrast werkt het best: één duidelijk accent per outfit, de rest rustig." };

  const combos: Combo[] = [
    {
      title: "Werk",
      occasion: "werk",
      pieces: [
        { item: items.jacket, color: sw(dark(0)) },
        { item: items.top, color: sw(light(0)) },
        { item: items.pants, color: sw(trousers) },
      ],
      tip: bright
        ? men ? "Een das of pochet in een heldere accentkleur maakt het af." : "Een sjaal of sieraad in een heldere accentkleur maakt het af."
        : "Houd het tonaal: één familie van kleuren, verschillende diepten.",
      extras: [],
    },
    {
      title: "Weekend",
      occasion: "weekend",
      pieces: [
        { item: items.knit, color: sw(accent(1)) },
        { item: items.jeans, color: sw(hasDenim ? denim : dark(1)) },
        { item: items.shoes, color: sw(dark(2)) },
      ],
      tip: "De accentkleur zit bij je gezicht, de rest ondersteunt.",
      extras: [],
    },
    {
      title: "Date",
      occasion: "date",
      pieces: [
        { item: items.tee, color: sw(accent(0)) },
        { item: items.pants, color: sw(dark(1)) },
        { item: items.coat, color: sw(dark(0)) },
      ],
      tip: "Je sterkste kleur onder je gezicht: daar kijkt de ander naar.",
      extras: [],
    },
    {
      title: "Feest",
      occasion: "feest",
      pieces: [
        { item: items.jacket, color: sw(dark(0)) },
        { item: items.top, color: sw(accent(2)) },
        { item: items.scarf, color: sw(accent(3)) },
      ],
      tip: "Diep en rijk, met één kleur die opvalt.",
      extras: [],
    },
  ];

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
  const extras: Piece[] = men
    ? [
        { item: "Horloge", color: leather[0]!, second: metal[0]!.hex },
        { item: "Riem", color: leather[0]!, second: metal[0]!.hex },
      ]
    : [
        { item: "Sieraden", color: metal[0]!, second: metal[0]!.hex },
        { item: "Tas", color: leather[0]!, second: metal[0]!.hex },
      ];
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
    const reason =
      c.point.undertone > 0 && cool ? "te warm voor je koele ondertoon"
      : c.point.undertone < 0 && warm ? "te koel voor je warme ondertoon"
      : c.point.clarity > p.clarity + 0.25 ? "te fel naast je zachte kleuren"
      : c.point.clarity < p.clarity - 0.25 ? "te vlak naast je contrast"
      : "trekt de aandacht weg van je gezicht";
    return { color: sw(c), reason };
  });

  // --- capsule: 12 pieces that combine with each other ---
  const capsuleItems = men
    ? ["Colbert", "Jas", "Chino", "Jeans", "Overhemd", "Overhemd", "T-shirt", "T-shirt", "Trui", "Trui", "Polo", "Sjaal"]
    : ["Blazer", "Jas", "Pantalon", "Jeans", "Blouse", "Blouse", "Top", "Top", "Trui", "Jurk", "Rok", "Sjaal"];
  // colour per garment type, so the capsule reads like a real wardrobe
  const capsuleColors = men
    ? [dark(0), dark(1), midNeutral, hasDenim ? denim : dark(2), light(0), light(1), light(2), accent(0), accent(1), midNeutral, accent(2), accent(3)]
    : [dark(0), dark(1), midNeutral, hasDenim ? denim : dark(2), light(0), accent(2), light(1), accent(0), accent(1), dark(2), midNeutral, accent(3)];
  const capsule = capsuleItems.map((item, i) => ({ item, color: sw(capsuleColors[i]!) }));

  const shopping = [
    "Houd het kledingstuk bij daglicht onder je kin. Lichten je ogen op en oogt je huid egaal? Dan is het jouw kleur.",
    "Twijfel tussen twee tinten? Kies de tint die het dichtst bij een kleur op je pas ligt.",
    "Een kleur die je niet staat, kan wel onder je middel: als broek, rok of schoenen.",
    "Online: vergelijk de productfoto met je pas op hetzelfde scherm. Productfoto's zijn vaak warmer of feller dan in het echt.",
    contrast.title + ": " + contrast.text.split(".")[0] + ".",
  ];

  // "Niet dit, maar dit": the palette colour closest in hue to each colour to avoid
  const hueDist = (a: number, b: number) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
  const swaps: Swap[] = avoid.map(({ color, reason }) => {
    const h = lch(color.hex).h;
    const best = [...withL].filter((x) => x.C > 15).sort((a, b) => hueDist(a.h, h) - hueDist(b.h, h))[0] ?? withL[0]!;
    return { avoid: color, instead: sw(best.c), reason };
  });

  const rules = [
    bright ? "Contrast mag: licht naast donker." : soft ? "Kies tonaal: kleuren dicht bij elkaar." : "Eén accent per outfit, de rest rustig.",
    warm ? "Warm boven koel: goud, camel, roest." : cool ? "Koel boven warm: zilver, navy, ijstinten." : "Neutraal: je kunt beide kanten op, kies zacht.",
    deep ? "Diepe kleuren dragen je; pastel valt weg." : pale ? "Lichte kleuren laten je stralen; zwart is te zwaar." : "Middentinten zijn je basis; extremen spaarzaam.",
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
