// The guide in every language (9 Nov 2026). The engine writes Dutch; lib/guide/en.ts turns that into
// English; German and Spanish translate the English (one table per language, keyed by the English
// text), so there is one source per sentence and a new sentence shows up as a gap in the test.
import type { Guide, Swatch } from "@/lib/guide/build";
import type { Locale } from "@/lib/i18n/locale";
import { colourSafe, FAMILY_EN, guideEn, itemSafe, SCALE_WORD_EN, tSafe } from "./en";
import { DE } from "./de";
import { ES } from "./es";

type Acc = { title: string; text: string; swatches: Swatch[] };
export type GuidePack = {
  sent: Record<string, string>; colour: Record<string, string>; item: Record<string, string>;
  scale: Record<string, string>; family: Record<string, string>;
  /** accessories rebuilt from translated swatches, in the engine's order (watch/jewellery first) */
  acc: (accessories: Acc[], men: boolean, undertone: number) => Acc[];
};
const PACKS: Partial<Record<Locale, GuidePack>> = { de: DE, es: ES };

/** A name from English into a pack's language; lists ("Gold or Bronze") part by part. */
function colourIn(p: GuidePack, en: string): string {
  if (p.colour[en]) return p.colour[en]!;
  if (en.includes(" or ")) return en.split(" or ").map((x) => colourIn(p, x)).join(p === DE ? " oder " : " o ");
  return en;
}

/** Display helpers for single words, from the Dutch the engine writes. */
export const colourIn_ = (nl: string, l: Locale) => (l === "nl" ? nl : l === "en" ? colourSafe(nl) : colourIn(PACKS[l]!, colourSafe(nl)));
export const itemIn = (nl: string, l: Locale) => (l === "nl" ? nl : l === "en" ? itemSafe(nl) : PACKS[l]!.item[itemSafe(nl)] ?? itemSafe(nl));
export const scaleIn = (nl: string, l: Locale) => { const en = SCALE_WORD_EN[nl] ?? nl; return l === "nl" ? nl : l === "en" ? en : PACKS[l]!.scale[en] ?? en; };
export const familyIn = (nl: string, l: Locale) => { const en = FAMILY_EN[nl] ?? nl; return l === "nl" ? nl : l === "en" ? en : PACKS[l]!.family[en] ?? en; };
export const sentenceIn = (nl: string, l: Locale) => { const en = tSafe(nl); return l === "nl" ? nl : l === "en" ? en : PACKS[l]!.sent[en] ?? en; };

/** The guide in a language. Garment names (item) stay Dutch in the data (photo lookup); show them with itemIn(). */
export function guideFor(g: Guide, l: Locale): Guide {
  if (l === "nl") return g;
  const en = guideEn(g);
  if (l === "en") return en;
  const p = PACKS[l]!;
  const S = (s: Swatch): Swatch => ({ name: colourIn(p, s.name), hex: s.hex });
  const t = (x: string) => p.sent[x] ?? x;
  let accessories = en.accessories;
  try { accessories = p.acc(en.accessories.map((a) => ({ ...a, swatches: a.swatches.map(S) })), g.brand === "kulort", g.scales.values.undertone); } catch { /* keep English rather than break a paid guide */ }
  return {
    ...en,
    summary: { core: en.summary.core.map(S), avoid: en.summary.avoid.map(S), metal: colourIn(p, en.summary.metal), leather: colourIn(p, en.summary.leather), rules: en.summary.rules.map(t) },
    swaps: en.swaps.map((s) => ({ avoid: S(s.avoid), instead: S(s.instead), reason: t(s.reason) })),
    family: p.family[en.family] ?? en.family,
    scales: { ...en.scales, undertone: p.scale[en.scales.undertone] ?? en.scales.undertone, depth: p.scale[en.scales.depth] ?? en.scales.depth, clarity: p.scale[en.scales.clarity] ?? en.scales.clarity },
    groups: en.groups.map((gr) => ({ title: t(gr.title), text: t(gr.text), colors: gr.colors.map(S) })),
    contrast: { title: t(en.contrast.title), text: t(en.contrast.text) },
    combos: en.combos.map((c) => ({ ...c, title: t(c.title), tip: t(c.tip), pieces: c.pieces.map((x) => ({ ...x, color: S(x.color) })), extras: c.extras.map((x) => ({ ...x, color: S(x.color) })) })),
    accessories,
    makeup: en.makeup?.map((m) => ({ title: t(m.title), text: t(m.text), swatches: m.swatches.map(S) })),
    avoid: en.avoid.map((a) => ({ color: S(a.color), reason: t(a.reason) })),
    capsule: en.capsule.map((c) => ({ item: c.item, color: S(c.color) })),
    shopping: en.shopping.map(t),
    pass: en.pass.map(S),
    basics: en.basics.map((b) => ({ title: t(b.title), text: t(b.text), color: S(b.color) })),
    firstBuys: en.firstBuys.map((f) => ({ item: f.item, color: S(f.color), why: t(f.why) })),
    audit: en.audit.map(t),
  };
}
