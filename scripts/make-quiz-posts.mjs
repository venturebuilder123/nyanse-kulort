// "Which season is she/he?" (growth sprint, 21 Oct 2026): a two-slide quiz per Gemini portrait.
// Slide 1: the model dressed in their season, three options A/B/C (the two wrong ones are close:
// the same family or the same strongest trait). Slide 2: the answer, why, the palette and the call
// to comment SEASON. Run: node scripts/make-quiz-posts.mjs
//   → public/social/quiz/{season}-{brand}/slide-{1,2}.jpg + lib/social/quiz-posts.json
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const D = JSON.parse(readFileSync("assets/social/seasons/data.json", "utf8"));
const HEROES = JSON.parse(readFileSync("lib/brand/heroes.json", "utf8"));
const img = (p) => "data:image/jpeg;base64," + readFileSync(`public/brand/${p}`).toString("base64");
const FAMILY = (k) => D[k].name.split(" ").pop();
// the season that shares the strongest trait (Light, Deep, Bright, Soft, Warm, Cool)
const TRAIT = { lightSpring: "lightSummer", lightSummer: "lightSpring", deepAutumn: "deepWinter", deepWinter: "deepAutumn", brightSpring: "brightWinter", brightWinter: "brightSpring", softAutumn: "softSummer", softSummer: "softAutumn", warmSpring: "warmAutumn", warmAutumn: "warmSpring", coolWinter: "coolSummer", coolSummer: "coolWinter" };
const WHY = (k) => {
  const { u, d, c } = D[k].scales;
  return [u < -0.15 ? "cool undertone" : u > 0.15 ? "warm undertone" : "neutral undertone", d > 0.65 ? "deep colouring" : d < 0.3 ? "light colouring" : "medium depth", c > 0.6 ? "clear, bright features" : c < 0.35 ? "soft, blended features" : "rich, not loud"];
};
// a fixed order (no randomness between runs), alternating her and him, every season once if possible
const ORDER = ["softAutumn", "coolWinter", "lightSpring", "deepAutumn", "softSummer", "warmSpring", "brightWinter", "coolSummer", "warmAutumn", "lightSummer", "brightSpring", "deepWinter"];

const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const CSS = `<link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{font-family:Manrope,sans-serif;color:#141414}.bod{font-family:'Bodoni Moda',serif;font-weight:400}
.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}</style>`;
const MARK = (c = "#141414") => `<span class="bod" style="font-size:28px;letter-spacing:.06em;color:${c}">KUL<span class="o">O</span>RT <span style="opacity:.45">|</span> NYANSE</span>`;

const made = [];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [i, key] of ORDER.entries()) {
  // her for even rows, him for odd ones; fall back to the other when a portrait is missing
  const prefer = i % 2 ? "kulort" : "nyanse";
  const brand = HEROES.includes(`${key}-${prefer}`) ? prefer : prefer === "kulort" ? "nyanse" : "kulort";
  if (!HEROES.includes(`${key}-${brand}`)) continue;
  const sameFamily = ORDER.find((k) => k !== key && FAMILY(k) === FAMILY(key) && k !== TRAIT[key]);
  // the right answer moves between A, B and C
  const opts = [key, sameFamily, TRAIT[key]];
  const rot = i % 3;
  const options = [...opts.slice(rot), ...opts.slice(0, rot)];
  const letter = "ABC"[options.indexOf(key)];
  const who = brand === "nyanse" ? "she" : "he";
  const s = D[key], pal = (brand === "nyanse" ? s.nyanse : s.kulort).slice(0, 2).concat(s.palette).map((c) => c.hex).filter((h, j, all) => all.indexOf(h) === j).slice(0, 8);
  const dir = `public/social/quiz/${key}-${brand}`;
  mkdirSync(dir, { recursive: true });
  const slide1 = `<div id="s" style="width:1080px;height:1350px;background:#F6F2EC;display:grid;grid-template-columns:540px 1fr">
    <img src="${img(`heroes/${key}-${brand}.jpg`)}" style="width:540px;height:1350px;object-fit:cover;object-position:50% 35%">
    <div style="padding:70px 50px;display:grid;grid-template-rows:auto auto 1fr auto;gap:34px">
      <span style="font-weight:800;letter-spacing:.2em;text-transform:uppercase;font-size:22px;border:2px solid #141414;padding:10px 20px;border-radius:40px;justify-self:start">Quiz</span>
      <div class="bod" style="font-size:88px;line-height:.95">Which season is <i>${who}?</i></div>
      <div style="display:grid;gap:18px;align-content:center">${options.map((k, j) => `<div style="display:grid;grid-template-columns:70px 1fr;align-items:center;gap:18px;border-top:2px solid #141414;padding-top:16px"><span class="bod" style="font-size:60px">${"ABC"[j]}</span><span style="font-size:34px;font-weight:800">${D[k].name}</span></div>`).join("")}</div>
      <div style="display:grid;gap:14px"><div style="font-size:26px;font-weight:700">Comment A, B or C · answer on slide 2 →</div>${MARK()}</div></div></div>`;
  const slide2 = `<div id="s" style="width:1080px;height:1350px;background:${pal[0]};display:grid;grid-template-rows:1fr auto">
    <div style="padding:90px 80px;display:grid;align-content:center;gap:34px;color:#F6F2EC;text-shadow:0 1px 2px rgba(0,0,0,.15)">
      <span style="font-weight:800;letter-spacing:.2em;text-transform:uppercase;font-size:24px">Answer</span>
      <div class="bod" style="font-size:150px;line-height:.9">${letter} · ${s.name.replace(" ", "<br><i>")}</i></div>
      <div style="font-size:36px;line-height:1.4">${WHY(key).map((w) => `✓ ${w[0].toUpperCase()}${w.slice(1)}`).join("<br>")}</div></div>
    <div style="background:#F6F2EC;padding:46px 80px 54px;display:grid;gap:26px">
      <div style="display:flex;gap:14px">${pal.map((h) => `<i style="width:96px;height:96px;border-radius:50%;background:${h};display:block"></i>`).join("")}</div>
      <div style="font-size:32px;font-weight:800">Your own season? Comment SEASON for the free check</div>${MARK()}</div></div>`;
  for (const [n, html] of [[1, slide1], [2, slide2]]) {
    await p.setContent(`<!doctype html><meta charset="utf-8">${CSS}<body>${html}</body>`, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.locator("#s").screenshot({ path: `${dir}/slide-${n}.jpg`, type: "jpeg", quality: 90 });
  }
  made.push({ key, brand, dir: dir.replace("public", ""), answer: letter, options: options.map((k) => D[k].name), season: s.name, who });
  console.log("wrote", dir, "answer", letter);
}
await b.close();
writeFileSync("lib/social/quiz-posts.json", JSON.stringify(made, null, 1));
console.log("wrote lib/social/quiz-posts.json", made.length);
