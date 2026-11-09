// TikTok (founder, 9 Nov 2026): posted by hand from /lab/tiktok, one a day. No API (TikTok's posting
// API needs an audited app); the founder downloads the video, pastes the text and ticks "geplaatst".
// The same reels as Instagram, her and him in turn, each with a hook that fits TikTok.
import EFFECTS from "./effect-posts.json";

type Effect = { key: string; brand: "nyanse" | "kulort"; dir: string; season: string };
export type TikTok = { key: string; day: string; video: string; cover: string; season: string; who: "her" | "him"; caption: string };

const HOOKS = {
  nyanse: ["POV: the right colour does the work of your whole makeup bag", "Same face. One colour change. Watch her skin.", "Wait for the second colour 👀", "Your undertone is lying to you in the shop lights", "This is why that 'gorgeous' top never looked right on you"],
  kulort: ["Same guy. Different shirt colour. Which one would you trust?", "Men, this is why you look tired in photos", "One colour change, a completely different first impression", "Wait for the second colour 👀", "Stop buying shirts in the wrong colour"],
};

export function tiktokPosts(start = "2026-11-10"): TikTok[] {
  const her = (EFFECTS as Effect[]).filter((e) => e.brand === "nyanse"), him = (EFFECTS as Effect[]).filter((e) => e.brand === "kulort");
  const order: Effect[] = [];
  while (her.length || him.length) { const a = her.shift(), b = him.shift(); if (a) order.push(a); if (b) order.push(b); }
  const [y, m, d] = start.split("-").map(Number) as [number, number, number];
  return order.map((e, i) => {
    const tag = "#" + e.season.toLowerCase().replace(/\s+/g, "");
    const hook = HOOKS[e.brand][i % 5]!;
    return {
      key: `tiktok-${e.dir.split("/").pop()}`,
      day: new Date(Date.UTC(y, m - 1, d + i)).toISOString().slice(0, 10),
      video: `${e.dir}/reel.mp4`,
      cover: `${e.dir}/cover.jpg`,
      season: e.season,
      who: e.brand === "nyanse" ? "her" : "him",
      caption: `${hook} This is a ${e.season}${e.brand === "nyanse" ? "" : " (for him)"}. Find your season with one selfie, free: link in bio. ${tag} #coloranalysis #seasonalcoloranalysis #kleuranalyse #${e.brand === "nyanse" ? "personalstyle" : "mensstyle"} #samefacedifferentcolour`,
    };
  });
}
