// The benefits: moments where your colours make the difference (Gemini scenes, assets/gemini/benefit/).
// Each becomes a 1080×1350 feed post in the style of the effect posts: the photo on top, an ivory
// band with the moment, a headline and the call to action. The calendar posts them on Mondays.
// Run: node scripts/make-benefit-posts.mjs  →  public/social/benefit/{scene}-{season}-{brand}.jpg
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import sharp from "sharp";

const SRC = "assets/gemini/benefit";
const OUT = "public/social/benefit";
const D = JSON.parse(readFileSync("assets/social/seasons/data.json", "utf8"));
// key = file name without "benefit-"; the same list (and order) as lib/social/benefits.json
const POSTS = JSON.parse(readFileSync("lib/social/benefits.json", "utf8"));

const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const BASE = `<link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{background:transparent;font-family:Manrope,sans-serif}
.bod{font-family:'Bodoni Moda',serif;font-weight:400}.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}</style>`;
const MARK = `<span class="bod" style="font-size:26px;letter-spacing:.06em;color:#141414">KUL<span class="o">O</span>RT <span style="opacity:.5">|</span> NYANSE</span>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
const IMG_H = 960;
for (const p of POSTS) {
  const [, key, brand] = p.key.match(/^\w+-(\w+)-(nyanse|kulort)$/);
  const s = D[key];
  const dots = (brand === "nyanse" ? s.nyanse : s.kulort).slice(0, 6).map((c) => `<i style="width:34px;height:34px;border-radius:50%;background:${c.hex};display:block"></i>`).join("");
  await page.setContent(`<!doctype html><meta charset="utf-8">${BASE}<body><div style="width:1080px;height:1350px;position:relative">
    <div style="position:absolute;left:0;right:0;top:${IMG_H}px;bottom:0;background:#F6F2EC;padding:30px 56px 36px;display:grid;gap:10px;align-content:start;color:#141414">
      <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:21px;color:#6F6862">${p.moment} · ${s.name}</span>${MARK}</div>
      <div class="bod" style="font-size:66px;line-height:1">${p.headline[0]} <i>${p.headline[1]}</i></div>
      <div style="font-size:24px;color:#4a4540">${p.line}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px"><span style="font-size:25px;font-weight:800">Find your season · free colour check, link in bio</span><span style="display:flex;gap:8px">${dots}</span></div></div></div></body>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const band = await page.screenshot({ omitBackground: true, type: "png" });
  // the scene from the top down: every face sits in the upper part ("attention" picked the clothes and cut heads)
  const top = await sharp(`${SRC}/benefit-${p.key}.jpg`).resize(1080, IMG_H, { fit: "cover", position: "top" }).toBuffer();
  await sharp({ create: { width: 1080, height: 1350, channels: 3, background: "#F6F2EC" } }).composite([{ input: top, top: 0, left: 0 }, { input: band }]).jpeg({ quality: 90 }).toFile(`${OUT}/${p.key}.jpg`);
  console.log("wrote", `${OUT}/${p.key}.jpg`);
}
await browser.close();
