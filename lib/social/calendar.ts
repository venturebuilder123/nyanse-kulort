// The automatic Instagram calendar (founder, 19 Oct 2026: "jij doet het"). Week 1 starts on
// SOCIAL_START (a Monday). Wednesday 18:30: that week's season carousel. Thursday 12:00, the first
// weeks: a follow image. Times from the large 2026 studies (Buffer, 9.6M posts: Wednesday 12:00 and
// 18:00 and Thursday 09:00 best, Friday and Saturday worst; Metricool: carousels peak on Wednesday).
// Slot keys stay as they were ("w1-mon-…"), so a post that already went out is never posted again. Only product shots (fabrics, flat-lays, palettes): no generated people,
// so no AI label is needed (docs/marketing/GUERRILLA.md §8).

import DATA from "./seasons-data.json";

export const SEASON_ORDER = ["softAutumn", "deepWinter", "softSummer", "lightSpring", "warmAutumn", "coolWinter", "lightSummer", "brightSpring", "deepAutumn", "coolSummer", "warmSpring", "brightWinter"] as const;

export type Slot = { key: string; at: Date; kind: "carousel" | "image"; images: string[]; caption: string };

const TAGS = "#coloranalysis #seasonalcoloranalysis #personalstyle #capsulewardrobe #mensstyle";
const D = DATA as Record<string, { name: string; scales: { u: number; d: number; c: number } }>;

function signs({ u, d, c }: { u: number; d: number; c: number }): string[] {
  return [
    u < -0.15 ? "Silver flatters you more than gold." : u > 0.15 ? "Gold flatters you more than silver." : "Both metals work; rose gold is your safe bet.",
    d > 0.65 ? "Deep, rich colours carry you; pastels fade." : d < 0.3 ? "Light and mid tones make you glow; black feels heavy." : "Mid tones are your base.",
    c > 0.6 ? "Clear, vivid colours match your eyes." : c < 0.35 ? "Soft, muted shades look polished on you." : "Rich, not loud: colours with depth.",
  ];
}

function seasonCaption(key: string, no: number): string {
  const s = D[key]!;
  const tag = "#" + s.name.toLowerCase().replace(/\s+/g, "");
  const [a, b, c] = signs(s.scales);
  return [
    `Are you a ${s.name}? 🎨 Season ${no} of 12.`,
    ``,
    `3 signs:`,
    `1. ${a}`,
    `2. ${b}`,
    `3. ${c}`,
    ``,
    `Your colours for her and for him are on slide 3. What to leave on the rack: slide 5.`,
    ``,
    `Not a ${s.name}? Find your season with one selfie. Free colour check, link in bio.`,
    `Send this to the ${s.name} you know 💌`,
    ``,
    `${tag} ${TAGS}`,
  ].join("\n");
}

const FOLLOW: [file: string, caption: string][] = [
  ["feed-1-one-season-a-week", "12 seasons. One every Wednesday. 🎨 Spring, Summer, Autumn or Winter: find yours before we post it.\n\nFree colour check, link in bio. Follow along.\n\n#coloranalysis #seasonalcoloranalysis #personalstyle"],
  ["feed-7-every-week", "What you get every week on our page: 1 season explained, 6 colours that work, 1 outfit head to toe and 1 thing to leave on the rack. For him and for her.\n\n#coloranalysis #capsulewardrobe #mensstyle"],
  ["feed-5-save-deepWinter", "Save this if you're a Deep Winter 🖤 Send it to the Deep Winter you know. Not one? Yours is coming. Follow.\n\n#deepwinter #coloranalysis #seasonalcoloranalysis"],
  ["feed-6-save-softAutumn", "Save this if you're a Soft Autumn 🍂 Send it to your Soft Autumn friend. Not one? Follow, yours is next.\n\n#softautumn #coloranalysis #seasonalcoloranalysis"],
];

/** A local Amsterdam time on a given date (CET/CEST handled by the time zone database). */
function amsterdamAt(y: number, m: number, d: number, hour: number, minute: number): Date {
  for (const off of [1, 2]) {
    const t = new Date(Date.UTC(y, m - 1, d, hour - off, minute));
    const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", hour12: false }).format(t));
    if (h === hour) return t;
  }
  return new Date(Date.UTC(y, m - 1, d, hour - 1, minute));
}
export const POST_TIMES = { carousel: { weekday: 2, hour: 18, minute: 30 }, image: { weekday: 3, hour: 12, minute: 0 } } as const;

export function calendar(start = process.env.SOCIAL_START ?? "2026-10-26", base = "https://www.kulort-nyanse.com"): Slot[] {
  const [y, m, d] = start.split("-").map(Number) as [number, number, number];
  const day = (offset: number, at: { hour: number; minute: number }) => {
    const t = new Date(Date.UTC(y, m - 1, d + offset));
    return amsterdamAt(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), at.hour, at.minute);
  };
  const slots: Slot[] = [];
  SEASON_ORDER.forEach((key, i) => {
    const dir = `${String(i + 1).padStart(2, "0")}-${key}`;
    slots.push({ key: `w${i + 1}-mon-${key}`, at: day(i * 7 + POST_TIMES.carousel.weekday, POST_TIMES.carousel), kind: "carousel", images: [1, 2, 3, 4, 5, 6].map((n) => `${base}/social/seasons/${dir}/slide-${n}.jpg`), caption: seasonCaption(key, i + 1) });
    const f = FOLLOW[i];
    if (f) slots.push({ key: `w${i + 1}-thu-${f[0]}`, at: day(i * 7 + POST_TIMES.image.weekday, POST_TIMES.image), kind: "image", images: [`${base}/social/follow/${f[0]}.jpg`], caption: f[1] });
  });
  return slots;
}
