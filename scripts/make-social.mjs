// Renders Instagram assets for @kulortnyanse in the house style (docs/brand/BRANDBOOK.md).
// Run: node scripts/make-social.mjs  →  assets/social/
//   avatar-*.png (1080×1080, safe in Instagram's circle crop), highlight-*.png (1080×1920),
//   pinned-*.png (1080×1350, the three pinned posts).
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT = "assets/social";
mkdirSync(OUT, { recursive: true });
// inline as data URIs: a page from setContent may not load local files
const img = (p) => "data:image/jpeg;base64," + readFileSync(resolve("public/brand", p)).toString("base64");
const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700&display=block";
const BASE = `<link rel="stylesheet" href="${FONTS}"><style>
  *{box-sizing:border-box;margin:0}
  body{background:#F6F2EC;color:#141414;font-family:Manrope,sans-serif}
  .bod{font-family:'Bodoni Moda',serif;font-weight:400}
  .o{position:relative;display:inline-block}
  .o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}
  .eyebrow{font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:22px;color:#6F6862}
</style>`;
const KUL = `KUL<span class="o">O</span>RT`;

const pages = {
  // 1. stacked lock-up in the circle
  "avatar-lockup": [1080, 1080, `<div style="width:1080px;height:1080px;display:grid;place-items:center">
    <div class="bod" style="display:grid;justify-items:center;gap:26px;font-size:118px;letter-spacing:.04em;line-height:1">
      <span>${KUL}</span><span style="width:170px;height:2px;background:#141414"></span><span>NYANSE</span></div></div>`],
  // 2. monogram Ø | N (reads at 110 px)
  "avatar-monogram": [1080, 1080, `<div style="width:1080px;height:1080px;display:grid;place-items:center">
    <div class="bod" style="display:flex;align-items:center;gap:60px;font-size:380px;line-height:1">
      <span class="o">O</span><span style="width:3px;height:300px;background:#141414"></span><span>N</span></div></div>`],
  // 3. ink variant
  "avatar-ink": [1080, 1080, `<div style="width:1080px;height:1080px;display:grid;place-items:center;background:#141414;color:#F6F2EC">
    <div class="bod" style="display:grid;justify-items:center;gap:26px;font-size:118px;letter-spacing:.04em;line-height:1">
      <span>${KUL}</span><span style="width:170px;height:2px;background:#F6F2EC"></span><span>NYANSE</span></div></div>`],
};

// story highlight covers: one word, centred in the circle area
for (const [key, word, swatches] of [
  ["kleuren", "Kleuren", ["#3F6A6A", "#B67C73", "#E8C468"]],
  ["seizoenen", "Seizoenen", ["#8FBF6A", "#AFC6E0", "#A0522D", "#1B2A5C"]],
  ["stijlgids", "Stijlgids", ["#141414"]],
  ["kleurenpas", "Pas", ["#121316"]],
  ["looks", "Looks", ["#6E1F2A", "#2F4F3A", "#B9926B"]],
  ["vragen", "Vragen", ["#6F6862"]],
]) {
  pages[`highlight-${key}`] = [1080, 1920, `<div style="width:1080px;height:1920px;display:grid;place-items:center">
    <div style="display:grid;justify-items:center;gap:60px">
      <div style="display:flex;gap:14px">${swatches.map((c) => `<i style="width:130px;height:130px;border-radius:50%;background:${c};display:block"></i>`).join("")}</div>
      <div class="bod" style="font-size:200px">${word}</div></div></div>`];
}

// the three pinned posts: what it is, the seasons, what you get
pages["pinned-1-wat"] = [1080, 1350, `<div style="width:1080px;height:1350px;position:relative;overflow:hidden">
  <div style="position:absolute;left:70px;top:80px;right:70px;display:grid;gap:18px">
    <div class="eyebrow">Atelier voor persoonlijke kleur</div>
    <div class="bod" style="font-size:88px;line-height:1">Je kleuren. <i>Je kast.<br>Je gids.</i></div></div>
  <img src="${img("editorial/maison-hero-1.jpg")}" style="position:absolute;left:0;right:0;bottom:0;width:100%;height:820px;object-fit:cover;object-position:78% 50%">
  <div class="bod" style="position:absolute;left:70px;top:420px;font-size:34px;letter-spacing:.04em">${KUL} <span style="opacity:.5">|</span> NYANSE</div></div>`];
pages["pinned-2-seizoenen"] = [1080, 1350, `<div style="width:1080px;height:1350px;padding:80px 70px;display:grid;grid-template-rows:auto 1fr auto;gap:40px">
  <div><div class="eyebrow">Vier seizoenen, twaalf kleurtypen</div><div class="bod" style="font-size:92px;line-height:1.02;margin-top:18px">Welk seizoen<br><i>ben jij?</i></div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:400px 400px;gap:18px">${["lente", "zomer", "herfst", "winter"].map((s) => `<div style="position:relative;overflow:hidden"><img src="${img(`seasons/family-${s}.jpg`)}" style="width:100%;height:100%;object-fit:cover;display:block"><span class="bod" style="position:absolute;left:18px;bottom:14px;font-size:40px;background:#F6F2EC;padding:2px 12px">${s[0].toUpperCase() + s.slice(1)}</span></div>`).join("")}</div>
  <div style="font-size:26px;font-weight:700">Doe de gratis kleurcheck · link in bio</div></div>`];
pages["pinned-3-krijg"] = [1080, 1350, `<div style="width:1080px;height:1350px;padding:80px 70px;display:grid;grid-template-rows:auto 1fr auto;gap:36px">
  <div><div class="eyebrow">Wat je krijgt</div><div class="bod" style="font-size:88px;line-height:1.02;margin-top:18px">Een kast die<br><i>voor je werkt.</i></div></div>
  <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:18px">
    <img src="${img("outfits/softAutumn-both.jpg")}" style="width:100%;height:100%;object-fit:cover">
    <div style="display:grid;gap:18px"><img src="${img("ads/workbook.jpg")}" style="width:100%;height:100%;object-fit:cover"><img src="${img("ads/best-fit.jpg")}" style="width:100%;height:100%;object-fit:cover;object-position:50% 40%"></div></div>
  <div style="font-size:24px;line-height:1.5"><b>Gratis</b> je kleurprofiel · <b>€6,99</b> je stijlgids · <b>€9,99</b> met kleurenpas</div></div>`];

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
