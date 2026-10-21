// The Instagram giveaway posts (founder, 21 Oct 2026): the launch (Mon 2 Nov) and the last call (Fri 6 Nov).
// Run: node scripts/make-giveaway.mjs  →  public/social/giveaway/{giveaway,last-call}.jpg
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
const img = (p) => "data:image/jpeg;base64," + readFileSync(`public/brand/${p}`).toString("base64");
const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const CSS = `<link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{font-family:Manrope,sans-serif;color:#141414}.bod{font-family:'Bodoni Moda',serif;font-weight:400}
.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}</style>`;
const MARK = `<span class="bod" style="font-size:30px;letter-spacing:.06em">KUL<span class="o">O</span>RT <span style="opacity:.45">|</span> NYANSE</span>`;
const post = (last) => `<div id="p" style="width:1080px;height:1350px;background:#141414;color:#F6F2EC;display:grid;grid-template-rows:auto 640px 1fr;padding:56px 60px;gap:34px">
  <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:800;letter-spacing:.24em;text-transform:uppercase;font-size:24px;border:2px solid #F6F2EC;padding:10px 22px;border-radius:40px">${last ? "Last chance · ends Sunday" : "Giveaway · 10 winners"}</span>${MARK}</div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">${["softAutumn-nyanse", "coolWinter-kulort", "lightSpring-nyanse", "warmSpring-kulort"].map((k) => `<img src="${img(`heroes/${k}.jpg`)}" style="width:100%;height:640px;object-fit:cover;object-position:50% 35%">`).join("")}</div>
  <div style="display:grid;gap:20px;align-content:start">
    <div class="bod" style="font-size:104px;line-height:.92">Win <i>your colours.</i></div>
    <div style="font-size:32px;line-height:1.35;color:#d8d2ca">10 × your personal colour analysis and style guide (worth €12.99).</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;font-size:27px;font-weight:700;margin-top:6px">${["Follow @kulortnyanse", "Comment the season you think you are", "Tag one friend"].map((t, i) => `<div style="border-top:2px solid #F6F2EC;padding-top:12px"><span class="bod" style="font-size:44px;display:block">0${i + 1}</span>${t}</div>`).join("")}</div>
    <div style="font-size:22px;color:#a8a29b;margin-top:4px">Until Sun 8 Nov 2026 · 18+ · EU · free to enter · terms: kulort-nyanse.com/winactie</div></div></div>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [file, last] of [["giveaway", false], ["last-call", true]]) {
  await p.setContent(`<!doctype html><meta charset="utf-8">${CSS}<body>${post(last)}</body>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.locator("#p").screenshot({ path: `public/social/giveaway/${file}.jpg`, type: "jpeg", quality: 90 });
  console.log("wrote", file);
}
await b.close();
