"use client";

// Fashion "technical flats": every garment and accessory as a clean line drawing, coloured
// per person with their own palette. One drawing serves every colour, so each guide is unique
// without a single stock photo. (Later replaceable by recoloured photo sprites, AI-FLATLAY.md.)

import { useId } from "react";

export type FlatKind =
  | "tee" | "shirt" | "blouse" | "wide" | "polo" | "knit" | "blazer" | "coat" | "pants" | "jeans" | "skirt" | "dress"
  | "shoe" | "scarf" | "watch" | "belt" | "glasses" | "necklace" | "bag";

/** Dutch garment names as used in the guide → drawing. */
export function flatFor(item: string): FlatKind {
  const k = item.toLowerCase();
  if (k.includes("colbert") || k.includes("blazer")) return "blazer";
  if (k.includes("jas")) return "coat";
  if (k.includes("blouse")) return "blouse";
  if (k.includes("overhemd")) return "shirt";
  if (k.includes("polo")) return "polo";
  if (k.includes("trui")) return "knit";
  if (k.includes("jeans")) return "jeans";
  if (k.includes("pantalon")) return "wide";
  if (k.includes("chino") || k.includes("broek")) return "pants";
  if (k.includes("rok")) return "skirt";
  if (k.includes("jurk")) return "dress";
  if (k.includes("schoen")) return "shoe";
  if (k.includes("sjaal")) return "scarf";
  if (k.includes("horloge")) return "watch";
  if (k.includes("riem")) return "belt";
  if (k.includes("bril")) return "glasses";
  if (k.includes("sierad") || k.includes("ketting")) return "necklace";
  if (k.includes("tas")) return "bag";
  return "tee";
}

type Shape = { body: string; details?: string[]; dots?: [number, number][]; second?: string };

// viewBox 0 0 100 100, garments face front, centred
const SHAPES: Record<FlatKind, Shape> = {
  tee: {
    body: "M36 10 Q50 18 64 10 L80 16 L94 34 L82 42 L74 36 L74 94 L26 94 L26 36 L18 42 L6 34 L20 16 Z",
    details: ["M36 10 Q50 22 64 10", "M26 88 L74 88", "M20 38 L26 34", "M80 38 L74 34"],
  },
  shirt: {
    body: "M38 8 L50 15 L62 8 L76 12 L90 76 L80 80 L72 42 L72 95 L28 95 L28 42 L20 80 L10 76 L24 12 Z",
    details: ["M38 8 L43 21 L50 15 L57 21 L62 8", "M50 15 L50 95", "M12 70 L21 73", "M88 70 L79 73", "M30 24 L40 24 L40 30 L30 30"],
    dots: [[52.5, 30], [52.5, 44], [52.5, 58], [52.5, 72], [52.5, 86]],
  },
  blouse: {
    // soft shoulders, a fluid body, a tie-less soft collar, no pocket
    body: "M40 9 Q50 16 60 9 L75 13 Q84 40 90 74 L80 78 Q74 56 70 44 Q72 70 76 95 L24 95 Q28 70 30 44 Q26 56 20 78 L10 74 Q16 40 25 13 Z",
    details: ["M40 9 L45 20 Q50 24 55 20 L60 9", "M50 22 L50 60", "M12 68 Q16 70 21 72", "M88 68 Q84 70 79 72", "M30 44 Q50 48 70 44"],
    dots: [[50, 30], [50, 42], [50, 54]],
  },
  wide: {
    // high-waisted wide-leg trousers
    body: "M32 5 L68 5 L84 97 L56 97 L50 30 L44 97 L16 97 Z",
    details: ["M32 12 L68 12", "M50 12 L50 30", "M40 12 L38 97", "M60 12 L62 97"],
  },
  polo: {
    body: "M37 10 L50 14 L63 10 L80 16 L94 34 L82 42 L74 36 L74 94 L26 94 L26 36 L18 42 L6 34 L20 16 Z",
    details: ["M37 10 L42 20 L50 14 L58 20 L63 10", "M50 14 L50 34", "M26 88 L74 88"],
    dots: [[52.5, 22], [52.5, 29]],
  },
  knit: {
    body: "M37 9 Q50 17 63 9 L77 13 L91 78 L80 82 L72 42 L73 95 L27 95 L28 42 L20 82 L9 78 L23 13 Z",
    details: [
      "M37 9 Q50 21 63 9", "M28 88 L72 88", "M12 72 L21 75", "M88 72 L79 75",
      "M34 89 L34 95", "M40 89 L40 95", "M46 89 L46 95", "M52 89 L52 95", "M58 89 L58 95", "M64 89 L64 95",
    ],
  },
  blazer: {
    body: "M37 7 L50 12 L63 7 L78 12 L90 80 L80 83 L72 40 L73 96 L27 96 L28 40 L20 83 L10 80 L22 12 Z",
    details: ["M37 7 L42 22 L36 30 L50 62", "M63 7 L58 22 L64 30 L50 62", "M50 62 L50 96", "M31 74 L42 74", "M58 74 L69 74", "M58 34 L66 34"],
    dots: [[50, 70], [50, 80]],
  },
  coat: {
    body: "M36 6 L50 11 L64 6 L79 11 L91 84 L81 87 L73 40 L75 98 L25 98 L27 40 L19 87 L9 84 L21 11 Z",
    details: ["M36 6 L42 24 L35 32 L52 56", "M64 6 L58 24 L65 32 L52 56", "M52 56 L54 98", "M29 70 L40 72", "M60 72 L71 70"],
    dots: [[45, 62], [59, 62], [45, 76], [59, 76]],
  },
  pants: {
    body: "M30 5 L70 5 L76 97 L57 97 L50 34 L43 97 L24 97 Z",
    details: ["M30 11 L70 11", "M50 11 L50 34", "M50 11 Q46 22 50 30", "M33 11 Q37 18 41 20", "M67 11 Q63 18 59 20", "M36 30 L33 90", "M64 30 L67 90"],
  },
  jeans: {
    body: "M30 5 L70 5 L75 97 L57 97 L50 34 L43 97 L25 97 Z",
    details: ["M30 11 L70 11", "M50 11 L50 34", "M50 11 Q45 24 50 31", "M31 11 Q35 21 42 22", "M69 11 Q65 21 58 22", "M26 92 L43 92", "M57 92 L74 92"],
    dots: [[36, 8], [64, 8]],
  },
  skirt: {
    body: "M34 8 L66 8 L82 92 Q50 98 18 92 Z",
    details: ["M34 14 L66 14", "M44 14 L38 92", "M56 14 L62 92"],
  },
  dress: {
    body: "M38 6 Q50 14 62 6 L66 8 L68 34 Q66 40 64 42 L84 94 Q50 100 16 94 L36 42 Q34 40 32 34 L34 8 Z",
    details: ["M38 6 Q50 18 62 6", "M35 40 Q50 45 65 40", "M44 46 L36 94", "M56 46 L64 94"],
  },
  shoe: {
    // a derby in profile: heel left, toe right
    body: "M6 70 L6 42 Q6 36 13 36 L28 37 Q36 44 48 45 L60 47 Q82 51 91 58 Q96 62 95 70 Z",
    details: ["M5 70 L96 70 L95 75 L6 75 Z", "M28 37 Q30 50 26 58", "M40 45 L46 50", "M46 46 L52 51", "M52 47 L57 51", "M14 36 Q12 54 18 66"],
  },
  scarf: {
    body: "M30 4 L70 4 L72 86 L28 86 Z",
    details: ["M30 4 Q52 30 70 4", "M44 30 L42 86", "M56 30 L58 86", "M30 86 L30 96", "M36 86 L36 96", "M42 86 L42 96", "M48 86 L48 96", "M54 86 L54 96", "M60 86 L60 96", "M66 86 L66 96", "M72 86 L72 96"],
  },
  watch: {
    // strap in the main colour, case in the second
    body: "M40 4 L60 4 L60 96 L40 96 Z",
    details: ["M40 18 L60 18", "M40 82 L60 82"],
    second: "M50 32 A18 18 0 1 1 49.99 32 Z",
  },
  belt: {
    body: "M4 42 L96 42 Q98 50 96 58 L4 58 Z",
    details: ["M4 45 L72 45", "M4 55 L72 55"],
    dots: [[84, 50], [90, 50]],
    second: "M62 36 L76 36 L76 64 L62 64 Z M66 41 L66 59 L72 59 L72 41 Z",
  },
  glasses: {
    body: "M8 40 Q8 34 14 34 L40 34 Q46 34 46 40 L44 56 Q43 64 34 64 L18 64 Q10 64 9 56 Z M54 40 Q54 34 60 34 L86 34 Q92 34 92 40 L91 56 Q90 64 82 64 L66 64 Q57 64 56 56 Z",
    details: ["M46 42 Q50 38 54 42", "M8 40 L2 38", "M92 40 L98 38"],
  },
  necklace: {
    body: "M48 72 Q50 66 52 72 L56 84 Q50 92 44 84 Z",
    details: [],
    second: "M14 10 Q16 64 50 70 Q84 64 86 10",
  },
  bag: {
    body: "M14 40 L86 40 L92 92 L8 92 Z",
    details: ["M30 40 Q30 8 50 8 Q70 8 70 40", "M36 40 Q36 16 50 16 Q64 16 64 40", "M12 54 L88 54"],
    dots: [[50, 60]],
  },
};

/** One garment, coloured. `second` is the metal/leather of two-part accessories. */
export function Flat({ kind, color, second, className = "" }: { kind: FlatKind; color: string; second?: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const sh = SHAPES[kind];
  const necklace = kind === "necklace";
  return (
    <svg className={`flat flat-${kind} ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}l`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".16" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".2" />
        </linearGradient>
      </defs>
      {necklace && sh.second && <path d={sh.second} fill="none" stroke={second ?? color} strokeWidth="1.6" strokeLinecap="round" />}
      <path d={sh.body} fill={color} fillRule="evenodd" />
      <path d={sh.body} fill={`url(#${id}l)`} fillRule="evenodd" />
      <path d={sh.body} fill="none" stroke="rgba(0,0,0,.42)" strokeWidth=".6" strokeLinejoin="round" fillRule="evenodd" />
      {sh.details?.map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="rgba(0,0,0,.28)" strokeWidth=".55" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth=".4" strokeLinecap="round" transform="translate(.5 .5)" />
        </g>
      ))}
      {sh.dots?.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill={second ?? "rgba(0,0,0,.35)"} />)}
      {!necklace && sh.second && (
        <>
          <path d={sh.second} fill={second ?? "#C9A24A"} fillRule="evenodd" />
          <path d={sh.second} fill={`url(#${id}l)`} fillRule="evenodd" />
          <path d={sh.second} fill="none" stroke="rgba(0,0,0,.4)" strokeWidth=".6" fillRule="evenodd" />
          {kind === "watch" && <path d="M50 38 L50 50 L58 54" fill="none" stroke="rgba(0,0,0,.55)" strokeWidth="1" strokeLinecap="round" />}
        </>
      )}
    </svg>
  );
}

export type LookPiece = { item: string; color: { hex: string; name: string }; second?: string };

// Where each kind lies on the board (percent of the square): a hand-styled flat-lay.
const SLOTS: Partial<Record<FlatKind, { x: number; y: number; w: number; r: number; z: number }>> = {
  blazer: { x: -2, y: 2, w: 56, r: -5, z: 2 },
  coat: { x: -3, y: 0, w: 58, r: -4, z: 1 },
  shirt: { x: 30, y: 3, w: 46, r: 4, z: 3 },
  blouse: { x: 30, y: 3, w: 46, r: 4, z: 3 },
  wide: { x: 54, y: 18, w: 46, r: 4, z: 2 },
  tee: { x: 31, y: 5, w: 44, r: 3, z: 3 },
  polo: { x: 31, y: 5, w: 44, r: 3, z: 3 },
  knit: { x: 2, y: 3, w: 54, r: -3, z: 3 },
  dress: { x: 4, y: 2, w: 54, r: -3, z: 3 },
  pants: { x: 56, y: 18, w: 44, r: 5, z: 2 },
  jeans: { x: 56, y: 18, w: 44, r: 5, z: 2 },
  skirt: { x: 58, y: 30, w: 40, r: 5, z: 2 },
  shoe: { x: 0, y: 60, w: 40, r: -4, z: 4 },
  scarf: { x: 72, y: 0, w: 28, r: 14, z: 4 },
};
const EXTRA_SLOTS = [
  { x: 40, y: 62, w: 18, r: 10, z: 5 },
  { x: 60, y: 66, w: 34, r: -3, z: 5 },
];

/** A flat-lay of one look: garments plus accessories, on paper. */
export function FlatLay({ pieces, extras = [], className = "" }: { pieces: LookPiece[]; extras?: LookPiece[]; className?: string }) {
  const used = new Set<string>();
  return (
    <div className={`flatlay ${className}`} role="img" aria-label={[...pieces, ...extras].map((p) => `${p.item} in ${p.color.name}`).join(", ")}>
      {pieces.map((p, i) => {
        const kind = flatFor(p.item);
        // a second top on the board (shirt + knit) moves aside
        let slot = SLOTS[kind] ?? { x: 30, y: 30, w: 40, r: 0, z: 3 };
        if (used.has(String(slot.x) + slot.y)) slot = { ...slot, x: slot.x > 30 ? 6 : 36, r: -slot.r };
        used.add(String(slot.x) + slot.y);
        return (
          <div key={i} className="flatlay-item" style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, transform: `rotate(${slot.r}deg)`, zIndex: slot.z }}>
            <Flat kind={kind} color={p.color.hex} second={p.second} />
          </div>
        );
      })}
      {extras.slice(0, 2).map((p, i) => {
        const s = EXTRA_SLOTS[i]!;
        return (
          <div key={`x${i}`} className="flatlay-item" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, transform: `rotate(${s.r}deg)`, zIndex: s.z }}>
            <Flat kind={flatFor(p.item)} color={p.color.hex} second={p.second} />
          </div>
        );
      })}
    </div>
  );
}
