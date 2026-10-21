// One-off Instagram post "Now on Etsy" (founder, 21 Oct 2026). Run: node scripts/make-now-on-etsy.mjs
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
const img = (p) => "data:image/jpeg;base64," + readFileSync(`public/brand/${p}`).toString("base64");
const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const html = `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{font-family:Manrope,sans-serif;color:#141414}.bod{font-family:'Bodoni Moda',serif;font-weight:400}
.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}</style>
<div id="p" style="width:1080px;height:1350px;background:#F6F2EC;display:grid;grid-template-rows:880px 1fr">
  <div style="display:grid;grid-template-columns:repeat(4,1fr)">${["softAutumn-nyanse", "coolWinter-kulort", "lightSpring-nyanse", "warmSpring-kulort"].map((k) => `<img src="${img(`heroes/${k}.jpg`)}" style="width:100%;height:880px;object-fit:cover;object-position:50% 35%">`).join("")}</div>
  <div style="padding:36px 60px 40px;display:grid;gap:14px;align-content:center">
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:22px;color:#6F6862">New · instant download</span><span class="bod" style="font-size:28px;letter-spacing:.06em">KUL<span class="o">O</span>RT <span style="opacity:.45">|</span> NYANSE</span></div>
    <div class="bod" style="font-size:92px;line-height:.95">Now on <i>Etsy.</i></div>
    <div style="font-size:29px;line-height:1.4;color:#4a4540">Every season in four packages, for her and for him. Not sure of your season? Start with the self-test.</div>
    <div style="font-size:29px;font-weight:800;margin-top:4px">Etsy: KULORTNYANSE · link in bio</div></div></div>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
await p.setContent(html, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.locator("#p").screenshot({ path: "public/social/etsy/now-on-etsy.jpg", type: "jpeg", quality: 90 });
await b.close();
console.log("wrote public/social/etsy/now-on-etsy.jpg");
