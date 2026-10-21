// The automatic Instagram calendar (founder, 19 Oct 2026: "jij doet het"). Week 1 starts on
// SOCIAL_START (a Monday). Wednesday 18:30: that week's season carousel. Thursday 12:00, the first
// weeks: a follow image. Times from the large 2026 studies (Buffer, 9.6M posts: Wednesday 12:00 and
// 18:00 and Thursday 09:00 best, Friday and Saturday worst; Metricool: carousels peak on Wednesday).
// Slot keys stay as they were ("w1-mon-…"), so a post that already went out is never posted again.
// Tuesday 19:00: a Reel with the same-face effect (Gemini models), the teaser for Wednesday's season;
// from week 5 the Thursday slot shows an effect photo. Those keys carry no image name ("w3-tue-reel"),
// so new Gemini images can change the choice without anything being posted twice. The models are
// AI-generated: the caption says so (Meta asks for it on photorealistic AI content).

import DATA from "./seasons-data.json";
import EFFECTS from "./effect-posts.json";
import BENEFITS from "./benefits.json";

export const SEASON_ORDER = ["softAutumn", "deepWinter", "softSummer", "lightSpring", "warmAutumn", "coolWinter", "lightSummer", "brightSpring", "deepAutumn", "coolSummer", "warmSpring", "brightWinter"] as const;

// "short" = the same reel on YouTube Shorts (title + description instead of a caption)
export type Slot = { key: string; at: Date; kind: "carousel" | "image" | "reel" | "short"; images: string[]; caption: string; title?: string; tags?: string[] };
type Effect = { key: string; brand: "nyanse" | "kulort"; n: number; dir: string; bad: string; good: string; season: string };

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
    `Not a ${s.name}? Comment SEASON and we'll DM you the free colour check.`,
    `Know you're a ${s.name}? The ${s.name} guides are also on Etsy: KULORTNYANSE.`,
    `Send this to the ${s.name} you know 💌`,
    ``,
    `${tag} ${TAGS}`,
  ].join("\n");
}

const AI_LINE = "Models are AI-generated; the colours are the real ones from your guide.";

function effectCaption(e: Effect, reel: boolean, teaser = false): string {
  const tag = "#" + e.season.toLowerCase().replace(/\s+/g, "");
  return [
    reel ? `Same face. Different colour. Watch what one colour change does 👀` : `Same face. Different colour. Left or right? 👀`,
    ``,
    `This is a ${e.season}${e.brand === "nyanse" ? "" : " (for him)"}: the wrong colour makes the skin look dull, the right one makes the face light up.`,
    teaser ? `Tomorrow: the full ${e.season} guide with all the colours.` : `Which one do you see first: the drape or the face?`,
    ``,
    `Comment SEASON and we'll DM you the free colour check: one selfie, one minute.`,
    ``,
    AI_LINE,
    ``,
    `${tag} #coloranalysis #seasonalcoloranalysis #${e.brand === "nyanse" ? "personalstyle" : "mensstyle"} #samefacedifferentcolour`,
  ].join("\n");
}

function shortMeta(e: Effect, base: string): { title: string; caption: string; tags: string[] } {
  const slug = e.season.toLowerCase().replace(/\s+/g, "-");
  return {
    title: `Same face, different colour: ${e.season}${e.brand === "kulort" ? " (men)" : ""} #Shorts`,
    caption: [
      `Same face. Only the colour under the chin changes. This is a ${e.season}: the wrong colour makes the skin look dull, the right one makes the face light up.`,
      ``,
      `Find your own season with one selfie, free: ${base}/kleuranalyse?utm_source=youtube&utm_medium=short&utm_content=${slug}`,
      ``,
      AI_LINE,
      ``,
      `#coloranalysis #seasonalcoloranalysis #${e.season.toLowerCase().replace(/\s+/g, "")} #Shorts`,
    ].join("\n"),
    tags: ["color analysis", "colour analysis", "seasonal color analysis", e.season, e.brand === "kulort" ? "mens style" : "personal style", "what colours suit me"],
  };
}

/** Per week: the reel (KULØRT and NYANSE in turn) and a second effect image for Thursday, preferring the week's season. */
export function pickEffects(effects: Effect[] = EFFECTS as Effect[]): { reel?: Effect; still?: Effect }[] {
  const used = new Set<string>();
  // the first wish that still has an unused image wins; the last resort is any unused image
  const take = (...wants: ((e: Effect) => boolean)[]) => {
    for (const want of [...wants, () => true]) {
      const e = effects.find((x) => !used.has(x.dir) && want(x));
      if (e) return used.add(e.dir), e;
    }
  };
  // first the weeks whose season has images, so a season without images only takes leftovers
  const weeks = SEASON_ORDER.map((key, i) => ({ key, i, brand: (i % 2 ? "nyanse" : "kulort") as Effect["brand"], has: effects.some((e) => e.key === key) }));
  const out: { reel?: Effect; still?: Effect }[] = SEASON_ORDER.map(() => ({}));
  for (const w of [...weeks.filter((w) => w.has), ...weeks.filter((w) => !w.has)]) {
    // no image of this season: borrow one from a season that was already on, never from a coming one
    const past = (e: Effect) => SEASON_ORDER.indexOf(e.key as (typeof SEASON_ORDER)[number]) < w.i;
    out[w.i]!.reel = take((e) => e.key === w.key && e.brand === w.brand, (e) => e.key === w.key, (e) => past(e) && e.brand === w.brand, past);
  }
  for (const w of [...weeks.filter((w) => w.has), ...weeks.filter((w) => !w.has)]) {
    if (w.i < FOLLOW.length) continue; // weeks 1–4 have a follow image on Thursday
    out[w.i]!.still = take((e) => e.key === w.key && e.brand !== out[w.i]!.reel?.brand, (e) => e.key === w.key, (e) => SEASON_ORDER.indexOf(e.key as (typeof SEASON_ORDER)[number]) < w.i);
  }
  return out;
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
export const POST_TIMES = { benefit: { weekday: 0, hour: 18, minute: 30 }, reel: { weekday: 1, hour: 19, minute: 0 }, carousel: { weekday: 2, hour: 18, minute: 30 }, image: { weekday: 3, hour: 12, minute: 0 } } as const;

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
  // effect posts after the original slots, so the keys and order above never move
  pickEffects().forEach(({ reel, still }, i) => {
    if (reel) {
      const at = day(i * 7 + POST_TIMES.reel.weekday, POST_TIMES.reel);
      const images = [`${base}${reel.dir}/reel.mp4`, `${base}${reel.dir}/cover.jpg`];
      slots.push({ key: `w${i + 1}-tue-reel`, at, kind: "reel", images, caption: effectCaption(reel, true, reel.key === SEASON_ORDER[i]) });
      slots.push({ key: `w${i + 1}-tue-short`, at, kind: "short", images, ...shortMeta(reel, base) });
    }
    if (still) slots.push({ key: `w${i + 1}-thu-effect`, at: day(i * 7 + POST_TIMES.image.weekday, POST_TIMES.image), kind: "image", images: [`${base}${still.dir}/post.jpg`], caption: effectCaption(still, false) });
  });
  // once: the Etsy shop opened (21 Oct 2026); a fixed date, outside the weekly rhythm
  slots.push({
    key: "etsy-launch-2026-10-23", at: amsterdamAt(2026, 10, 23, 12, 0), kind: "image", images: [`${base}/social/etsy/now-on-etsy.jpg`],
    caption: [`We're on Etsy now 🎉`, ``, `Every season in four packages, from a palette card to the complete collection, for her and for him. Not sure of your season yet? Start with the "Which season am I?" self-test.`, ``, `Find us on Etsy: KULORTNYANSE (second link in bio).`, `Prefer your personal analysis from one selfie? That's the first link in bio, free.`, ``, AI_LINE, ``, `#coloranalysis #seasonalcoloranalysis #etsyfinds #capsulewardrobe #personalstyle`].join("\n"),
  });
  // the giveaway (docs/marketing/GROEI-SPRINT.md; terms on /winactie): launch Mon 2 Nov, last call Fri 6 Nov
  const giveawayRules = [`How to enter:`, `1. Follow @kulortnyanse`, `2. Comment the season you think you are (a guess is fine)`, `3. Tag one friend`, ``, `Until Sunday 8 November, 23:59 (Amsterdam). 18+, living in the EU. Free to enter. Winners are drawn at random on 9 November and contacted only by DM from @kulortnyanse: we never ask for payment or passwords.`, `Terms: kulort-nyanse.com/winactie`, `This giveaway is not sponsored, endorsed or administered by, or associated with Instagram.`];
  slots.push({ key: "giveaway-2026-11-02", at: amsterdamAt(2026, 11, 2, 12, 0), kind: "image", images: [`${base}/social/giveaway/giveaway.jpg`], caption: [`GIVEAWAY 🎉 Win your colours.`, ``, `10 winners each get their personal colour analysis from one selfie and their personal style guide (worth €12.99).`, ``, ...giveawayRules, ``, AI_LINE, ``, `#giveaway #coloranalysis #seasonalcoloranalysis #winactie`].join("\n") });
  slots.push({ key: "giveaway-last-2026-11-06", at: amsterdamAt(2026, 11, 6, 12, 0), kind: "image", images: [`${base}/social/giveaway/last-call.jpg`], caption: [`Last chance ⏳ The giveaway closes on Sunday at 23:59.`, ``, `10 × personal colour analysis and style guide (worth €12.99).`, ``, ...giveawayRules, ``, AI_LINE, ``, `#giveaway #coloranalysis #seasonalcoloranalysis #winactie`].join("\n") });
  // Monday 18:30, weeks 2–9: the benefit scenes (a moment where your colours make the difference)
  BENEFITS.forEach((b, i) => {
    const season = D[b.key.split("-")[1]!]!.name;
    const tag = "#" + season.toLowerCase().replace(/\s+/g, "");
    slots.push({
      key: `w${i + 2}-monday-benefit`, at: day((i + 1) * 7 + POST_TIMES.benefit.weekday, POST_TIMES.benefit), kind: "image", images: [`${base}/social/benefit/${b.key}.jpg`],
      caption: [`${b.headline.join(" ")} ✨`, ``, `${b.line} This look: ${season}.`, ``, `Which season are you? Comment SEASON and we'll DM you the free colour check.`, ``, AI_LINE, ``, `${tag} #coloranalysis #seasonalcoloranalysis #${b.key.endsWith("kulort") ? "mensstyle" : "personalstyle"} #capsulewardrobe`].join("\n"),
    });
  });
  return slots;
}
