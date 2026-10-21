// Pinterest: per season a palette pin, an outfit pin and a look pin for her and for him (the Gemini
// portraits, public/brand/heroes), 1000×1500 (2:3, what Pinterest shows best), plus a CSV for
// Pinterest's bulk upload. English, as all social (decision 15 Oct 2026).
// Run: node scripts/make-pinterest.mjs  →  public/social/pinterest/*.jpg + assets/social/pinterest/pins.csv
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const D = JSON.parse(readFileSync("assets/social/seasons/data.json", "utf8"));
const OUT = "public/social/pinterest";
mkdirSync(OUT, { recursive: true });
mkdirSync("assets/social/pinterest", { recursive: true });
const img = (p) => "data:image/jpeg;base64," + readFileSync(resolve("public/brand", p)).toString("base64");
const HEROES = JSON.parse(readFileSync("lib/brand/heroes.json", "utf8"));
const ORDER = ["softAutumn", "deepWinter", "softSummer", "lightSpring", "warmAutumn", "coolWinter", "lightSummer", "brightSpring", "deepAutumn", "coolSummer", "warmSpring", "brightWinter"];
const FAMILY = (n) => n.split(" ").pop();
const BOARD = { Spring: "Spring colour palettes", Summer: "Summer colour palettes", Autumn: "Autumn colour palettes", Winter: "Winter colour palettes" };
const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const BASE = `<link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{background:#F6F2EC;color:#141414;font-family:Manrope,sans-serif}
.bod{font-family:'Bodoni Moda',serif;font-weight:400}.eyebrow{font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:22px;color:#6F6862}
.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}</style>`;
const MARK = `<span class="bod" style="font-size:26px;letter-spacing:.06em">KUL<span class="o">O</span>RT <span style="opacity:.45">|</span> NYANSE</span>`;
const hexes = (s) => [...s.nyanse.slice(0, 8), ...s.kulort.slice(0, 8)].filter((c, i, a) => a.findIndex((x) => x.hex === c.hex) === i).slice(0, 12);

const palettePin = (s) => `<div style="width:1000px;height:1500px;padding:70px;display:grid;grid-template-rows:auto auto 1fr auto;gap:36px">
  <div style="display:flex;justify-content:space-between;align-items:center">${MARK}<span class="eyebrow">${FAMILY(s.name)}</span></div>
  <div class="bod" style="font-size:104px;line-height:.95">${s.name}<br><i>colour palette</i></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${hexes(s).map((c) => `<div style="display:grid;gap:8px"><div style="height:220px;background:${c.hex};box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)"></div><span style="font-size:22px;font-weight:700;letter-spacing:.06em;color:#4a4540">${c.hex.toUpperCase()}</span></div>`).join("")}</div>
  <div style="display:flex;justify-content:space-between;font-size:26px;font-weight:800"><span>Find your season: free colour check</span><span>kulort-nyanse.com</span></div></div>`;
const outfitPin = (key, s) => `<div style="width:1000px;height:1500px;padding:70px;display:grid;grid-template-rows:auto auto 1fr auto auto;gap:30px">
  <div style="display:flex;justify-content:space-between;align-items:center">${MARK}<span class="eyebrow">${FAMILY(s.name)}</span></div>
  <div class="bod" style="font-size:96px;line-height:.95">${s.name}<br><i>outfit ideas</i></div>
  <img src="${img(`outfits/${key}-both.jpg`)}" style="width:100%;height:100%;object-fit:cover;min-height:0">
  <div style="display:flex;height:70px">${hexes(s).slice(0, 8).map((c) => `<i style="flex:1;background:${c.hex}"></i>`).join("")}</div>
  <div style="display:flex;justify-content:space-between;font-size:26px;font-weight:800"><span>For him &amp; her · head to toe</span><span>kulort-nyanse.com</span></div></div>`;

// the model in the season's colours on the left, the colours and the name on the right
const lookPin = (key, s, brand) => { const cols = (brand === "nyanse" ? s.nyanse : s.kulort).slice(0, 6); const who = brand === "nyanse" ? "her" : "him"; return `<div style="width:1000px;height:1500px;display:grid;grid-template-columns:520px 1fr">
  <img src="${img(`heroes/${key}-${brand}.jpg`)}" style="width:520px;height:1500px;object-fit:cover;object-position:50% 45%">
  <div style="padding:70px 56px;display:grid;grid-template-rows:auto auto 1fr auto;gap:34px">${MARK}
    <div style="display:grid;gap:18px"><span class="eyebrow">${FAMILY(s.name)} · for ${who}</span><div class="bod" style="font-size:84px;line-height:.95">${s.name}<br><i>for ${who}</i></div></div>
    <div style="display:grid;gap:12px;align-content:center">${cols.map((c) => `<div style="height:74px;background:${c.hex}"></div>`).join("")}</div>
    <div style="display:grid;gap:8px;font-size:25px;font-weight:800"><span>Find your season:<br>free colour check</span><span style="font-weight:700;color:#6F6862">kulort-nyanse.com</span></div></div></div>`; };

// standard CSV as Pinterest's template: quotes only where needed, CRLF line ends (21 Oct 2026: a fully
// quoted file with LF was refused as "not uploaded correctly")
const csvEsc = (v) => (/[",\r\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
const rows = [["Title", "Media URL", "Pinterest board", "Thumbnail", "Description", "Link", "Publish date", "Keywords"]];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 1500 } });
// two pins a day, 12:00 and 20:00 Amsterdam, from the day after tomorrow (Pinterest plans up to ±30 days ahead)
const start = new Date(); start.setUTCDate(start.getUTCDate() + 2);
let n = 0;
for (const key of ORDER) {
  const s = D[key];
  const slug = s.name.toLowerCase().replace(/\s+/g, "-");
  const link = `https://www.kulort-nyanse.com/kleuranalyse?utm_source=pinterest&utm_medium=pin&utm_content=${slug}`;
  const looks = ["nyanse", "kulort"].filter((b) => HEROES.includes(`${key}-${b}`)).map((b) => [
    `look-${b === "nyanse" ? "her" : "him"}`, lookPin(key, s, b), `${s.name} outfit for ${b === "nyanse" ? "women" : "men"}`,
    `What a ${s.name} looks like in their own colours: one colour family from head to toe, the strongest shade close to the face. Find your own season with a free colour check at kulort-nyanse.com. Model is AI-generated.`,
  ]);
  for (const [kind, html, title, desc] of [
    ["palette", palettePin(s), `${s.name} colour palette`, `The ${s.name} colour palette: the shades that suit a ${s.name}, for her and for him. Not sure which season you are? Take the free colour check with one selfie at kulort-nyanse.com.`],
    ["outfit", outfitPin(key, s), `${s.name} outfit ideas for him and her`, `${s.name} outfits head to toe: one colour family, everything goes together. Find your own season with a free colour check at kulort-nyanse.com.`],
    ...looks,
  ]) {
    await p.setContent(`<!doctype html><meta charset="utf-8">${BASE}<body>${html}</body>`, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    const file = `${slug}-${kind}.jpg`;
    await p.screenshot({ path: `${OUT}/${file}`, type: "jpeg", quality: 90 });
    const d = new Date(start); d.setUTCDate(start.getUTCDate() + Math.floor(n / 2));
    const date = `${d.toISOString().slice(0, 10)}T${n++ % 2 ? "19" : "11"}:00:00`; // 12:00 and 20:00 CET
    rows.push([title, `https://www.kulort-nyanse.com/social/pinterest/${file}`, BOARD[FAMILY(s.name)], "", desc, link, date, `${s.name}, colour analysis, seasonal colour analysis, colour palette, ${kind === "palette" ? "personal colours" : "outfit ideas, capsule wardrobe"}`]);
    console.log("wrote", file);
  }
}
await b.close();
writeFileSync("assets/social/pinterest/pins.csv", rows.map((r) => r.map(csvEsc).join(",")).join("\r\n") + "\r\n");
// one pin without a date, to test an upload on its own
writeFileSync("assets/social/pinterest/pins-test.csv", [rows[0], [...rows[1].slice(0, 6), "", rows[1][7]]].map((r) => r.map(csvEsc).join(",")).join("\r\n") + "\r\n");
console.log("wrote assets/social/pinterest/pins.csv", rows.length - 1, "pins");
