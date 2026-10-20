// The Etsy shop itself (founder, 20 Oct 2026): banner, icon, five About photos and a shop video.
// Run after scripts/make-etsy.ts (it reuses the Soft Autumn listing images).
// Run: npx tsx scripts/make-etsy-shop.ts  →  assets/etsy/_shop/
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, resolve } from "node:path";
import { paletteFor } from "@/lib/color/palette";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";

const FFMPEG: string = createRequire(import.meta.url)("ffmpeg-static");
const OUT = "assets/etsy/_shop";
const A = "https://etsy.local";
mkdirSync(OUT, { recursive: true });

const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const CSS = `<link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{font-family:Manrope,sans-serif;color:#141414;background:#F6F2EC}
.bod{font-family:'Bodoni Moda',serif;font-weight:400}.eb{font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#6F6862}
.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}</style>`;
const MARK = (size: string, color = "#141414") => `<span class="bod" style="font-size:${size};letter-spacing:.06em;color:${color}">KUL<span class="o">O</span>RT <span style="opacity:.45">|</span> NYANSE</span>`;
const hero = (k: string) => `${A}/brand/heroes/${k}.jpg`;
const effect = (k: string) => `${A}/gemini/effect/effect-${k}.jpg`;
const dots = (key: SeasonKey, n = 8, size = 40) => paletteFor(SEASONS[key].centre, "nyanse", 30).colors.slice(0, n).map((c) => `<i style="width:${size}px;height:${size}px;border-radius:50%;background:${c.hex};display:block"></i>`).join("");
const ORDER: SeasonKey[] = ["lightSpring", "warmSpring", "brightSpring", "lightSummer", "coolSummer", "softSummer", "softAutumn", "warmAutumn", "deepAutumn", "deepWinter", "coolWinter", "brightWinter"];

// big banner: the text stays in the middle third (Etsy crops the sides on phones)
const banner = `<div style="width:3360px;height:840px;background:#F6F2EC;position:relative;overflow:hidden">
  ${["softAutumn-nyanse", "brightSpring-kulort", "lightSummer-nyanse"].map((k, i) => `<img src="${hero(k)}" style="position:absolute;left:${i * 300}px;top:0;width:300px;height:840px;object-fit:cover;object-position:50% 30%">`).join("")}
  ${["coolWinter-kulort", "warmSpring-nyanse", "deepAutumn-kulort"].map((k, i) => `<img src="${hero(k)}" style="position:absolute;right:${i * 300}px;top:0;width:300px;height:840px;object-fit:cover;object-position:50% 30%">`).join("")}
  <div style="position:absolute;left:900px;right:900px;top:0;bottom:0;display:grid;align-content:center;justify-items:center;gap:34px;text-align:center">
    ${MARK("60px")}<div class="bod" style="font-size:118px;line-height:.95">Your colours, <i>ready to use.</i></div>
    <div style="font-size:40px;font-weight:700">Seasonal colour guides for her and for him · instant download</div></div></div>`;

// About photos, 2000×1500
const about = [
  // 1. the effect: four people, wrong and right colour
  `<div style="width:2000px;height:1500px;background:#F6F2EC;display:grid;grid-template-rows:auto 1fr;padding:80px 90px;gap:50px">
    <div style="display:flex;justify-content:space-between;align-items:baseline"><div class="bod" style="font-size:96px">Same face. <i>Different colour.</i></div>${MARK("36px")}</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:30px;min-height:0">${["softAutumn-nyanse-1", "deepWinter-kulort-2"].map((k) => `<img src="${effect(k)}" style="width:100%;height:100%;min-height:0;object-fit:cover;object-position:top">`).join("")}</div></div>`,
  // 2. the guides: the pages of the complete collection
  `<img src="${A}/etsy-local/softAutumn/4-complete/listing-2.jpg" style="width:2000px;height:1500px;display:block">`,
  // 3. for her and for him
  `<div style="width:2000px;height:1500px;background:#E9E3DA;display:grid;grid-template-columns:560px 560px 1fr;gap:0">
    <img src="${hero("warmAutumn-nyanse")}" style="width:560px;height:1500px;object-fit:cover"><img src="${hero("warmAutumn-kulort")}" style="width:560px;height:1500px;object-fit:cover">
    <div style="padding:0 80px;display:grid;align-content:center;gap:34px"><div class="eb" style="font-size:26px">Warm Autumn</div><div class="bod" style="font-size:104px;line-height:.95">For her<br><i>and for him</i></div>
      <div style="font-size:32px;line-height:1.5;color:#4a4540">Every guide has looks, a capsule wardrobe and first buys for women and for men.</div><div style="display:flex;gap:12px">${dots("warmAutumn", 8, 46)}</div></div></div>`,
  // 4. calculated, not guessed: all twelve palettes
  `<div style="width:2000px;height:1500px;background:#F6F2EC;padding:80px 90px;display:grid;grid-template-rows:auto 1fr;gap:44px">
    <div style="display:flex;justify-content:space-between;align-items:baseline"><div class="bod" style="font-size:88px">Twelve seasons, <i>calculated</i></div><span class="eb" style="font-size:24px">Not guessed, not copied</span></div>
    <div style="display:grid;gap:12px">${ORDER.map((k) => `<div style="display:grid;grid-template-columns:300px 1fr;align-items:center;gap:20px"><span style="font-size:28px;font-weight:700">${SEASONS[k].name}</span><div style="display:grid;grid-template-columns:repeat(12,1fr);height:62px">${paletteFor(SEASONS[k].centre, "nyanse", 30).colors.slice(0, 12).map((c) => `<i style="background:${c.hex}"></i>`).join("")}</div></div>`).join("")}</div></div>`,
  // 5. the four packages
  `<img src="${A}/etsy-local/softAutumn/4-complete/listing-3.jpg" style="width:2000px;height:1500px;display:block">`,
];

// shop video scenes (1600×1200, silent): the effect twice, the people, the pages, the packages, the end
const scenes = [
  { html: `<div style="width:1600px;height:1200px;background:#F6F2EC;display:grid;grid-template-columns:967px 1fr"><img src="${effect("softAutumn-nyanse-1")}" style="width:967px;height:1200px;object-fit:cover;object-position:top"><div style="padding:0 60px;display:grid;align-content:center;gap:28px"><div class="bod" style="font-size:90px;line-height:.95">Same face.<br><i>Different colour.</i></div></div></div>`, dur: 2.4, tr: "slideleft" },
  { html: `<div style="width:1600px;height:1200px;background:#F6F2EC;display:grid;grid-template-columns:1fr 967px"><div style="padding:0 60px;display:grid;align-content:center;gap:28px"><div class="bod" style="font-size:90px;line-height:.95">For her,<br><i>and for him.</i></div></div><img src="${effect("deepWinter-kulort-2")}" style="width:967px;height:1200px;object-fit:cover;object-position:top"></div>`, dur: 2.2, tr: "fade" },
  { html: `<div style="width:1600px;height:1200px;background:#E9E3DA;display:grid;grid-template-columns:repeat(4,1fr)">${["softAutumn-nyanse", "coolWinter-kulort", "lightSpring-nyanse", "warmSpring-kulort"].map((k) => `<div style="position:relative"><img src="${hero(k)}" style="width:100%;height:1200px;object-fit:cover;object-position:50% 40%"><span style="position:absolute;left:0;right:0;bottom:40px;text-align:center;color:#fff;font-size:30px;font-weight:800;text-shadow:0 2px 10px rgba(0,0,0,.5)">${SEASONS[k.split("-")[0] as SeasonKey].name}</span></div>`).join("")}</div>`, dur: 2.2, tr: "fade" },
  { html: `<img src="${A}/etsy-local/softAutumn/4-complete/listing-2.jpg" style="width:1600px;height:1200px;display:block">`, dur: 2.0, tr: "fade" },
  { html: `<img src="${A}/etsy-local/softAutumn/4-complete/listing-3.jpg" style="width:1600px;height:1200px;display:block">`, dur: 2.2, tr: "fade" },
  { html: `<div style="width:1600px;height:1200px;background:#F6F2EC;display:grid;align-content:center;justify-items:center;gap:40px;text-align:center">${MARK("44px")}<div class="bod" style="font-size:112px;line-height:.95">Your colours,<br><i>ready to use.</i></div><div style="font-size:34px;font-weight:700">12 seasons · 4 packages · instant download</div><div style="display:flex;gap:12px">${dots("softAutumn", 8, 60)}</div></div>`, dur: 2.0, tr: "fade" },
];

const b = await chromium.launch();
const ctx = await b.newContext();
await ctx.route(`${A}/**`, async (route) => {
  const path = decodeURIComponent(new URL(route.request().url()).pathname);
  if (path === "/") return route.fulfill({ contentType: "text/html", body: "<!doctype html><title>shop</title>" });
  const f = path.startsWith("/gemini/") ? resolve("assets", "." + path) : path.startsWith("/etsy-local/") ? resolve("assets/etsy", "." + path.slice("/etsy-local".length)) : resolve("public", "." + path);
  const type = { ".jpg": "image/jpeg", ".png": "image/png" }[extname(f)] ?? "application/octet-stream";
  return existsSync(f) ? route.fulfill({ body: readFileSync(f), contentType: type }) : route.fulfill({ status: 404 });
});
const p = await ctx.newPage();
await p.goto(`${A}/`);
const shot = async (file: string, html: string, w: number, h: number) => {
  await p.setViewportSize({ width: w, height: h });
  await p.setContent(`<!doctype html><meta charset="utf-8">${CSS}<body>${html}</body>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: file, type: "jpeg", quality: 90 });
};
await shot(`${OUT}/banner-3360x840.jpg`, banner, 3360, 840);
for (const [i, html] of about.entries()) await shot(`${OUT}/about-${i + 1}.jpg`, html, 2000, 1500);
execFileSync("sips", ["-z", "500", "500", "assets/social/avatar-monogram.png", "--out", `${OUT}/icon-500.png`], { stdio: "ignore" });

const tmp = `${OUT}/_video`; mkdirSync(tmp, { recursive: true });
for (const [i, sc] of scenes.entries()) await shot(`${tmp}/${i}.jpg`, sc.html, 1600, 1200);
const X = 0.5, args = ["-y", "-loglevel", "error"];
for (const [i, sc] of scenes.entries()) args.push("-loop", "1", "-t", String(sc.dur), "-framerate", "30", "-i", `${tmp}/${i}.jpg`);
let f = scenes.map((_, i) => `[${i}:v]scale=1600:1200,setsar=1,fps=30,format=yuv420p[s${i}]`).join(";"), prev = "s0", t = scenes[0]!.dur;
for (let i = 1; i < scenes.length; i++) { f += `;[${prev}][s${i}]xfade=transition=${scenes[i - 1]!.tr}:duration=${X}:offset=${(t - X).toFixed(2)}[x${i}]`; t += scenes[i]!.dur - X; prev = `x${i}`; }
execFileSync(FFMPEG, [...args, "-filter_complex", f, "-map", `[${prev}]`, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high", "-crf", "21", "-movflags", "+faststart", `${OUT}/shop-video.mp4`]);
rmSync(tmp, { recursive: true });
await b.close();
console.log("wrote", OUT, `(video ${t.toFixed(1)} s)`);
