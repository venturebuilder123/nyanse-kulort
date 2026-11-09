// TikTok (founder, 9 Nov 2026): posted by hand from /lab/tiktok, one a day. No API (TikTok's posting
// API needs an audited app); the founder downloads the video, pastes the text and ticks "geplaatst".
// The same reels as Instagram, her and him in turn, each with a hook that fits TikTok.
import AURA from "./aura-posts.json";
import EFFECTS from "./effect-posts.json";

type Effect = { key: string; brand: "nyanse" | "kulort"; dir: string; season: string };
export type TikTok = { key: string; day: string; video: string; cover: string; season: string; who: "her" | "him"; caption: string; campaign: "aura" | "effect" };

// "Colour Aura" (9 Nov 2026, for 18–25): goes first, her and him in turn (scripts/make-aura.ts)
const AURA_HOOKS = {
  nyanse: ["aura check ✨ wait for her colour", "POV: your aura is grey because of your top", "grey aura → glow, in one colour change", "not a vibe. a measurement.", "which aura are you? comment it 👇", "the wrong colour mutes your whole face"],
  kulort: ["aura check, for him. wait for it", "same guy, wrong colour = grey aura", "his aura went from grey to main character", "not a vibe. a measurement.", "rate his aura before and after 👇", "first impression = colour"],
};

const HOOKS = {
  nyanse: ["POV: the right colour does the work of your whole makeup bag", "Same face. One colour change. Watch her skin.", "Wait for the second colour 👀", "Your undertone is lying to you in the shop lights", "This is why that 'gorgeous' top never looked right on you"],
  kulort: ["Same guy. Different shirt colour. Which one would you trust?", "Men, this is why you look tired in photos", "One colour change, a completely different first impression", "Wait for the second colour 👀", "Stop buying shirts in the wrong colour"],
};

type Aura = { slug: string; brand: "nyanse" | "kulort"; season: string; dir: string };

function alternate<T extends { brand: string }>(list: T[]): T[] {
  const her = list.filter((e) => e.brand === "nyanse"), him = list.filter((e) => e.brand === "kulort");
  const out: T[] = [];
  while (her.length || him.length) { const a = her.shift(), b = him.shift(); if (a) out.push(a); if (b) out.push(b); }
  return out;
}

const dayAfter = (start: string, n: number) => { const [y, m, d] = start.split("-").map(Number) as [number, number, number]; return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };

export function tiktokPosts(start = "2026-11-10"): TikTok[] {
  const aura = alternate(AURA as Aura[]).map((a, i): TikTok => {
    const him = a.brand === "kulort";
    return {
      key: `tiktok-aura-${a.slug}`, day: dayAfter(start, i), video: `${a.dir}/reel.mp4`, cover: `${a.dir}/cover.jpg`, season: a.season, who: him ? "him" : "her", campaign: "aura",
      caption: `${AURA_HOOKS[a.brand][Math.floor(i / 2) % 6]} This is a ${a.season} aura${him ? " (for him)" : ""}. What's yours? One selfie, free: link in bio. #colouraura #auracheck #coloranalysis #${a.season.toLowerCase().replace(/\s+/g, "")} #seasonalcoloranalysis #${him ? "mensstyle" : "personalstyle"}`,
    };
  });
  return [...aura, ...effectPosts(dayAfter(start, aura.length))];
}

function effectPosts(start: string): TikTok[] {
  return alternate(EFFECTS as Effect[]).map((e, i): TikTok => {
    const tag = "#" + e.season.toLowerCase().replace(/\s+/g, "");
    const hook = HOOKS[e.brand][i % 5]!;
    return {
      key: `tiktok-${e.dir.split("/").pop()}`,
      day: dayAfter(start, i),
      video: `${e.dir}/reel.mp4`,
      cover: `${e.dir}/cover.jpg`,
      season: e.season,
      who: e.brand === "nyanse" ? "her" : "him",
      campaign: "effect",
      caption: `${hook} This is a ${e.season}${e.brand === "nyanse" ? "" : " (for him)"}. Find your season with one selfie, free: link in bio. ${tag} #coloranalysis #seasonalcoloranalysis #kleuranalyse #${e.brand === "nyanse" ? "personalstyle" : "mensstyle"} #samefacedifferentcolour`,
    };
  });
}
