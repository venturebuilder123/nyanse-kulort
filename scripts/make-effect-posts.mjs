// "Same face. Different colour." From each Gemini effect diptych (assets/gemini/effect/) we make:
//   post.jpg   1080×1350 feed post: ✕ wrong / ✓ right labels, season, "often named as", CTA
//   reel.mp4   1080×1920, 7 s: wrong colour → wipe → right colour → end card (H.264, silent track)
//   cover.jpg  1080×1920 Reel cover
// into public/social/effect/{season}-{brand}-{n}/ (public: Instagram fetches them by URL).
// Needs a local ffmpeg: `npm install --no-save ffmpeg-static` (kept out of package.json on purpose).
// Run: node scripts/make-effect-posts.mjs
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const FFMPEG = require("ffmpeg-static");
const SRC = "assets/gemini/effect";
const OUT = "public/social/effect";
const D = JSON.parse(readFileSync("assets/social/seasons/data.json", "utf8"));

// colour names in English (social is English), for the drapes the prompts used
const EN = { "#F3A27A": "Apricot", "#A6A04C": "Light olive", "#2F6FDE": "Bright blue", "#F0B7C8": "Powder pink", "#5B7DB1": "Mid blue", "#7D8471": "Sage grey", "#3F6A6A": "Soft teal", "#2E6B5E": "Deep teal", "#6E1F2A": "Burgundy", "#3A2A6B": "Indigo", "#0E4C92": "Midnight navy", "#FF1493": "Hot pink", "#DC143C": "Crimson", "#4F8F8B": "Blue-green", "#7B2CBF": "Bright purple", "#B0103A": "Wine red", "#F2B632": "Golden yellow", "#1F4FC4": "Royal blue", "#E2533A": "Tomato", "#9E2A2B": "Brick red" };
// "often named as": family level, names only (lib/brand/seasons-copy.ts)
const NAMED = {
  nyanse: { Spring: "Taylor Swift · Amy Adams · Cameron Diaz", Summer: "Jennifer Aniston · Cate Blanchett", Autumn: "Julia Roberts · Jessica Chastain", Winter: "Anne Hathaway · Liv Tyler" },
  kulort: { Spring: "Chris Hemsworth · Eddie Redmayne", Summer: "Daniel Craig · Mark Ruffalo", Autumn: "Ryan Reynolds · Jude Law", Winter: "Idris Elba · Henry Cavill" },
};
const AVOID = {
  lightSpring: ["#4F8F8B", "#7B2CBF"], warmSpring: ["#4F8F8B", "#7B2CBF"], brightSpring: ["#4F8F8B", "#B0103A"],
  lightSummer: ["#F2B632", "#2F6FDE"], coolSummer: ["#F2B632", "#2F6FDE"], softSummer: ["#F2B632", "#2F6FDE"],
  softAutumn: ["#1F4FC4", "#DC143C"], warmAutumn: ["#1F4FC4", "#DC143C"], deepAutumn: ["#1F4FC4", "#DC143C"],
  deepWinter: ["#2E6B5E", "#E2533A"], coolWinter: ["#2E6B5E", "#9E2A2B"], brightWinter: ["#2E6B5E", "#9E2A2B"],
};

const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const BASE = `<link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{background:transparent;font-family:Manrope,sans-serif}
.bod{font-family:'Bodoni Moda',serif;font-weight:400}.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}
.chip{display:inline-flex;align-items:center;gap:14px;padding:14px 22px;border-radius:999px;font-weight:800;font-size:30px}
.chip i{width:30px;height:30px;border-radius:50%;display:block;box-shadow:0 0 0 3px rgba(255,255,255,.9)}</style>`;
const MARK = (color = "#F6F2EC", size = 30) => `<span class="bod" style="font-size:${size}px;letter-spacing:.06em;color:${color}">KUL<span class="o">O</span>RT <span style="opacity:.5">|</span> NYANSE</span>`;
const chip = (ok, hex) => `<span class="chip" style="background:${ok ? "#F6F2EC" : "rgba(20,20,20,.78)"};color:${ok ? "#141414" : "#F6F2EC"}"><b style="font-size:34px">${ok ? "✓" : "✕"}</b><i style="background:${hex}"></i>${EN[hex] ?? hex}</span>`;

const browser = await chromium.launch();
const page = await browser.newPage();
async function overlay(html, w, h) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><meta charset="utf-8">${BASE}<body>${html}</body>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return page.screenshot({ omitBackground: true, type: "png" });
}

const files = readdirSync(SRC).filter((f) => /^effect-.*\.(jpg|png)$/.test(f)).sort();
const made = [];
for (const f of files) {
  const [, key, brand, n] = f.match(/^effect-(\w+)-(nyanse|kulort)-(\d)\./);
  const s = D[key], fam = s.name.split(" ").pop();
  const bad = AVOID[key][Number(n) - 1], good = (brand === "nyanse" ? s.nyanse : s.kulort)[0].hex.toUpperCase();
  const dir = `${OUT}/${key}-${brand}-${n}`;
  mkdirSync(dir, { recursive: true });
  const src = sharp(`${SRC}/${f}`);
  const { width: W, height: H } = await src.metadata();

  // ---- feed post 1080×1350: the diptych on top (colours untouched), an ivory band with the text below
  const IMG_H = 940;
  const top = await sharp(`${SRC}/${f}`).resize(1080, IMG_H, { fit: "cover", position: "top" }).toBuffer();
  const post = await overlay(`<div style="width:1080px;height:1350px;position:relative">
    <div style="position:absolute;left:24px;top:24px">${chip(false, bad)}</div>
    <div style="position:absolute;left:564px;top:24px">${chip(true, good)}</div>
    <div style="position:absolute;left:0;right:0;top:${IMG_H}px;bottom:0;background:#F6F2EC;padding:34px 56px 40px;display:grid;gap:12px;align-content:start;color:#141414">
      <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:21px;color:#6F6862">${s.name} · ${brand === "nyanse" ? "for her" : "for him"}</span>${MARK("#141414", 26)}</div>
      <div class="bod" style="font-size:76px;line-height:.95">Same face. <i>Different colour.</i></div>
      <div style="font-size:23px;color:#4a4540">Often named as ${fam}: ${NAMED[brand][fam]}</div>
      <div style="font-size:25px;font-weight:800;margin-top:4px">Find your season · free colour check, link in bio</div></div></div>`, 1080, 1350);
  await sharp({ create: { width: 1080, height: 1350, channels: 3, background: "#F6F2EC" } }).composite([{ input: top, top: 0, left: 0 }, { input: post }]).jpeg({ quality: 90 }).toFile(`${dir}/post.jpg`);

  // ---- Reel: halves cropped to 9:16 around the face
  const half = Math.floor(W / 2), cropH = Math.min(H, Math.round(half * 16 / 9));
  const halfImg = (i) => sharp(`${SRC}/${f}`).extract({ left: i * half, top: 0, width: half, height: cropH }).resize(1080, 1920, { fit: "cover", position: "top" }).toBuffer();
  const [L, R] = await Promise.all([halfImg(0), halfImg(1)]);
  const lab = (ok, hex) => overlay(`<div style="width:1080px;height:1920px;position:relative"><div style="position:absolute;left:60px;top:260px">${chip(ok, hex).replace(/font-size:30px/g, "font-size:40px")}</div></div>`, 1080, 1920);
  // one page renders one overlay at a time (in parallel they overwrite each other)
  const labBad = await lab(false, bad);
  const labGood = await lab(true, good);
  const title = await overlay(`<div style="width:1080px;height:1920px;position:relative"><div style="position:absolute;left:0;right:0;bottom:0;height:820px;background:linear-gradient(transparent,rgba(12,12,12,.8) 60%)"></div>
    <div style="position:absolute;left:70px;right:70px;bottom:400px;color:#F6F2EC" class="bod"><div style="font-size:112px;line-height:.95">Same face.<br><i>Different colour.</i></div></div></div>`, 1080, 1920);
  const pal = (brand === "nyanse" ? s.nyanse : s.kulort).slice(0, 6);
  const end = await overlay(`<div style="width:1080px;height:1920px;background:#F6F2EC;position:relative;color:#141414">
    <div style="position:absolute;left:80px;right:80px;top:420px;display:grid;gap:40px">
      <div style="font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:28px;color:#6F6862">${fam} · ${brand === "nyanse" ? "for her" : "for him"}</div>
      <div class="bod" style="font-size:132px;line-height:.95">Are you a<br><i>${s.name}?</i></div>
      <div style="display:flex;gap:16px">${pal.map((c) => `<i style="width:110px;height:110px;border-radius:50%;background:${c.hex};display:block"></i>`).join("")}</div>
      <div style="font-size:40px;line-height:1.4">Find your season with one selfie.<br><b>Free colour check · link in bio</b></div></div>
    <div style="position:absolute;left:0;right:0;bottom:380px;text-align:center">${MARK("#141414", 40)}</div></div>`, 1080, 1920);

  const tmp = `${dir}/_frames`;
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp);
  const FPS = 30, T = 7 * FPS;
  for (let i = 0; i < T; i++) {
    const t = i / FPS;
    let layers;
    if (t < 1.6) layers = sharp(L).composite([{ input: labBad }]);
    else if (t < 2.6) {
      // wipe from left to right: the right colour slides over the wrong one
      const p = (t - 1.6) / 1.0, e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2, w = Math.max(1, Math.round(1080 * e));
      const strip = await sharp(R).extract({ left: 0, top: 0, width: w, height: 1920 }).toBuffer();
      const line = await sharp({ create: { width: 6, height: 1920, channels: 4, background: "#F6F2EC" } }).png().toBuffer();
      layers = sharp(L).composite([{ input: strip, left: 0, top: 0 }, ...(w < 1074 ? [{ input: line, left: w, top: 0 }] : [])]);
    } else if (t < 5.2) layers = sharp(R).composite([{ input: labGood }, ...(t > 3.2 ? [{ input: title }] : [])]);
    else layers = sharp(end);
    await layers.jpeg({ quality: 88 }).toFile(`${tmp}/${String(i).padStart(4, "0")}.jpg`);
  }
  execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", `${tmp}/%04d.jpg`, "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high", "-crf", "20", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", `${dir}/reel.mp4`]);
  // cover: the right colour with the title
  await sharp(R).composite([{ input: labGood }, { input: title }]).jpeg({ quality: 90 }).toFile(`${dir}/cover.jpg`);
  rmSync(tmp, { recursive: true, force: true });
  made.push({ key, brand, n: Number(n), dir: dir.replace("public", ""), bad, good, season: s.name });
  console.log("wrote", dir);
}
await browser.close();
writeFileSync("lib/social/effect-posts.json", JSON.stringify(made, null, 1));
console.log("wrote lib/social/effect-posts.json", made.length);
