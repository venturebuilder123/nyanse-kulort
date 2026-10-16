// Renders follow-ads for @kulortnyanse in the house style (English copy, see docs/marketing/VOLGERS.md).
// Run: node scripts/make-follow-ads.mjs  →  assets/social/follow/
//   feed-*.png (1080×1350, 4:5) and story-*.png (1080×1920, 9:16; top 250 px and bottom 340 px kept free for the app UI).
// Palettes come from the colour engine (assets/social/follow/palettes.json, regenerated from lib/guide/build).
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT = "assets/social/follow";
const PAL = JSON.parse(readFileSync(`${OUT}/palettes.json`, "utf8"));
const img = (p) => "data:image/jpeg;base64," + readFileSync(resolve("public/brand", p)).toString("base64");
const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700&display=block";
const BASE = `<link rel="stylesheet" href="${FONTS}"><style>
  *{box-sizing:border-box;margin:0}
  body{background:#F6F2EC;color:#141414;font-family:Manrope,sans-serif}
  .bod{font-family:'Bodoni Moda',serif;font-weight:400}
  .o{position:relative;display:inline-block}
  .o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}
  .eyebrow{font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:22px;color:#6F6862}
  .mark{font-family:'Bodoni Moda',serif;font-size:30px;letter-spacing:.06em}
  .follow{display:inline-flex;align-items:center;gap:18px;background:#141414;color:#F6F2EC;font-weight:700;font-size:30px;padding:22px 34px;letter-spacing:.02em}
  .follow b{font-weight:700;opacity:.6}
  .sw{display:flex}.sw i{flex:1;display:block}
</style>`;
const KUL = `KUL<span class="o">O</span>RT`;
const MARK = `<span class="mark">${KUL} <span style="opacity:.45">|</span> NYANSE</span>`;
const FOLLOW = (t = "Follow") => `<span class="follow">${t} <b>@kulortnyanse</b></span>`;
const swatches = (cols, h) => `<div class="sw" style="height:${h}px">${cols.map((c) => `<i style="background:${c.hex}"></i>`).join("")}</div>`;

const pages = {};

// 1. the series promise: one season a week
pages["feed-1-one-season-a-week"] = [1080, 1350, `<div style="width:1080px;height:1350px;padding:70px;display:grid;grid-template-rows:auto 1fr auto;gap:36px">
  <div style="display:flex;justify-content:space-between;align-items:center">${MARK}<span class="eyebrow">Every Monday</span></div>
  <div style="display:grid;grid-template-rows:auto 1fr;gap:30px">
    <div class="bod" style="font-size:96px;line-height:1">12 seasons.<br><i>One a week.</i></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:380px 380px;gap:14px">${["lente", "zomer", "herfst", "winter"].map((s, i) => `<div style="position:relative;overflow:hidden"><img src="${img(`seasons/family-${s}.jpg`)}" style="width:100%;height:100%;object-fit:cover;display:block"><span class="bod" style="position:absolute;left:14px;bottom:12px;font-size:34px;background:#F6F2EC;padding:2px 12px">${["Spring", "Summer", "Autumn", "Winter"][i]}</span></div>`).join("")}</div></div>
  <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:28px;font-weight:700">Find yours before we post it.</span>${FOLLOW()}</div></div>`];

// 2. for him
pages["feed-2-for-him"] = [1080, 1350, `<div style="width:1080px;height:1350px;position:relative;overflow:hidden">
  <img src="${img("editorial/kulort-jong-campagne-1.jpg")}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%">
  <div style="position:absolute;left:0;right:0;bottom:0;padding:60px 70px 70px;background:#F6F2EC;display:grid;gap:22px">
    <div class="eyebrow">For him · ${KUL}</div>
    <div class="bod" style="font-size:78px;line-height:1.02">Colour tips for men<br><i>who'd rather not guess.</i></div>
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:26px;line-height:1.4">What to wear, in your colours.<br>Short, sharp, weekly.</span>${FOLLOW()}</div></div></div>`];

// 3. for her
pages["feed-3-for-her"] = [1080, 1350, `<div style="width:1080px;height:1350px;position:relative;overflow:hidden">
  <img src="${img("editorial/nyanse-jong-campagne-1.jpg")}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%">
  <div style="position:absolute;left:0;right:0;bottom:0;padding:60px 70px 70px;background:#F6F2EC;display:grid;gap:22px">
    <div class="eyebrow">For her · NYANSE</div>
    <div class="bod" style="font-size:78px;line-height:1.02">Stop buying what<br><i>you never wear.</i></div>
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:26px;line-height:1.4">Your palette, your basics,<br>one season every week.</span>${FOLLOW()}</div></div></div>`];

// 4. the amnesty (launch campaign teaser)
pages["feed-4-amnesty"] = [1080, 1350, `<div style="width:1080px;height:1350px;padding:70px;display:grid;grid-template-rows:auto 1fr auto;gap:30px">
  <div style="display:flex;justify-content:space-between;align-items:center">${MARK}<span class="eyebrow">Coming soon</span></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center">
    <img src="${img("ads/closet-choices.jpg")}" style="width:100%;height:880px;object-fit:cover">
    <div style="display:grid;gap:26px"><div class="eyebrow">Exhibit A</div>
      <div class="bod" style="font-size:84px;line-height:1">Never<br><i>worn.</i></div>
      <p style="font-size:28px;line-height:1.45">Everyone has one. It wasn't you. It was the colour.</p>
      <p class="bod" style="font-size:40px"><i>Wrong Colour Amnesty.</i></p></div></div>
  <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:26px;font-weight:700">Follow so you don't miss it.</span>${FOLLOW()}</div></div>`];

// 5–6. save-and-follow palette posts (the format people save and send to a friend)
for (const [n, key, brand, photo] of [[5, "deepWinter", "kulort", "outfits/deepWinter-both.jpg"], [6, "softAutumn", "nyanse", "outfits/softAutumn-both.jpg"]]) {
  const p = PAL[key];
  pages[`feed-${n}-save-${key}`] = [1080, 1350, `<div style="width:1080px;height:1350px;padding:70px;display:grid;grid-template-rows:auto auto 1fr auto auto;gap:28px">
    <div style="display:flex;justify-content:space-between;align-items:center">${MARK}<span class="eyebrow">Save this</span></div>
    <div class="bod" style="font-size:84px;line-height:1">If you're a<br><i>${p.name}.</i></div>
    <img src="${img(photo)}" style="width:100%;height:100%;object-fit:cover;min-height:0">
    ${swatches(p[brand], 90)}
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:26px;font-weight:700">Not a ${p.name}? Yours is next week.</span>${FOLLOW()}</div></div>`];
}

// 7. what you get by following
pages["feed-7-every-week"] = [1080, 1350, `<div style="width:1080px;height:1350px;padding:80px 70px;display:grid;grid-template-rows:auto auto 1fr auto;gap:40px">
  ${MARK}
  <div class="bod" style="font-size:92px;line-height:1">Every week<br><i>on our page.</i></div>
  <ol style="list-style:none;padding:0;display:grid;gap:0;align-content:start">${[
    ["1", "season, explained"], ["6", "colours that work"], ["1", "outfit, head to toe"], ["1", "thing to leave on the rack"],
  ].map(([a, b]) => `<li style="display:grid;grid-template-columns:120px 1fr;align-items:baseline;border-top:1px solid #141414;padding:26px 0"><span class="bod" style="font-size:80px">${a}</span><span style="font-size:36px;font-weight:500">${b}</span></li>`).join("")}</ol>
  <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:26px;font-weight:700">For him and for her.</span>${FOLLOW()}</div></div>`];

// stories (9:16): keep the top 250 px and bottom 340 px free for the app UI
pages["story-1-whats-your-season"] = [1080, 1920, `<div style="width:1080px;height:1920px;position:relative;overflow:hidden">
  <img src="${img("seasons/family-winter.jpg")}" style="position:absolute;left:0;right:0;top:0;width:100%;height:1220px;object-fit:cover">
  <div style="position:absolute;left:70px;right:70px;top:1260px;display:grid;gap:30px">
    <div class="bod" style="font-size:100px;line-height:1">What's<br><i>your season?</i></div>
    <p style="font-size:32px;line-height:1.4">One season every Monday. Find yours.</p>
    <div>${FOLLOW()}</div></div></div>`];
pages["story-2-same-face"] = [1080, 1920, `<div style="width:1080px;height:1920px;position:relative;overflow:hidden">
  <div style="position:absolute;top:250px;left:70px;right:70px" class="bod"><div style="font-size:96px;line-height:1">Same face.<br><i>Different colour.</i></div></div>
  <img src="${img("ads/proof-men.jpg")}" style="position:absolute;left:70px;right:70px;top:560px;width:940px;height:940px;object-fit:cover">
  <div style="position:absolute;left:70px;right:70px;bottom:360px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:30px;font-weight:700">See the difference, weekly.</span>${FOLLOW()}</div></div>`];
pages["story-3-her"] = [1080, 1920, `<div style="width:1080px;height:1920px;position:relative;overflow:hidden">
  <div style="position:absolute;top:250px;left:70px;right:70px" class="bod"><div style="font-size:96px;line-height:1">Bought it.<br><i>Never wore it?</i></div></div>
  <img src="${img("ads/proof-women.jpg")}" style="position:absolute;left:70px;right:70px;top:560px;width:940px;height:940px;object-fit:cover">
  <div style="position:absolute;left:70px;right:70px;bottom:360px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:30px;font-weight:700">It's the colour. We'll show you.</span>${FOLLOW()}</div></div>`];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [name, [w, h, html]] of Object.entries(pages)) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><meta charset="utf-8">${BASE}<body>${html}</body>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log("wrote", name);
}
await browser.close();
