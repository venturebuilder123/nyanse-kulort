// Print-ready colour cards (CLAUDE.md §7): 12 seasons × 2 brands = 24 fronts, plus one back per brand.
// Run: node scripts/make-passes.mjs  →  assets/passes/
//   kleurenpassen-v1.pdf   one page per card, 85.6 × 53.98 mm + 3 mm bleed on every side (for the print shop)
//   preview-*.png          screen previews
// Colours come from the colour engine (assets/passes/palettes.json, the guide's 8 pass colours).
// Calibration area (verification selfie, phase C): ArUco DICT_4X4_50 id 1, 18% grey and an unprinted
// white patch, at fixed positions (tools/card/pass-layout-v1.json).
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import QRCode from "qrcode";

const OUT = "assets/passes";
const PAL = JSON.parse(readFileSync(`${OUT}/palettes.json`, "utf8"));
const BITS = JSON.parse(readFileSync("tools/card/marker-4x4-id1.json", "utf8"));
const W = 85.6, H = 53.98, BLEED = 3;

// one place for the calibration geometry (mm from the card's top-left, without bleed)
const LAYOUT = {
  version: 1,
  card: { width: W, height: H, cornerRadius: 3.18 },
  marker: { dictionary: "DICT_4X4_50", id: 1, x: 5, y: 40, size: 10 },
  patches: [
    { key: "grey18", srgb: "#777777", x: 17, y: 40, w: 10, h: 10 },
    { key: "white", srgb: null, x: 29, y: 40, w: 10, h: 10, note: "unprinted paper, thin outline only" },
  ],
};
writeFileSync("tools/card/pass-layout-v1.json", JSON.stringify(LAYOUT, null, 2) + "\n");

const marker = (size) => {
  const n = BITS.length, c = size / n;
  return `<svg width="${size}mm" height="${size}mm" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><rect width="${n}" height="${n}" fill="#000"/>${BITS.flatMap((row, y) => row.map((b, x) => (b ? `<rect x="${x}" y="${y}" width="1" height="1" fill="#fff"/>` : ""))).join("")}</svg>`;
};
const KUL = `KUL<span class="o">O</span>RT`;
const wordmark = (brand) => (brand === "kulort" ? KUL : "NYANSE");

const CSS = `
  @page { size: ${W + 2 * BLEED}mm ${H + 2 * BLEED}mm; margin: 0 }
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Manrope,sans-serif;color:#141414;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .page{width:${W + 2 * BLEED}mm;height:${H + 2 * BLEED}mm;padding:${BLEED}mm;background:var(--bg);break-after:page;position:relative;overflow:hidden}
  .card{position:relative;width:${W}mm;height:${H}mm}
  .bod{font-family:'Bodoni Moda',serif;font-weight:400}
  .o{position:relative;display:inline-block}
  .o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.06em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}
  .abs{position:absolute}
  .mark{font-size:3.4mm;letter-spacing:.08em}
  .tag{font-size:1.9mm;letter-spacing:.22em;text-transform:uppercase;font-weight:700;color:#6F6862}
  .season{font-size:7.4mm;line-height:1}
  .nyanse .season{font-style:italic}
  .fam{font-size:2.1mm;letter-spacing:.14em;text-transform:uppercase;color:#6F6862}
  .sw{display:grid;grid-template-columns:repeat(8,1fr);gap:.6mm}
  .sw i{display:block;height:12mm;box-shadow:inset 0 0 0 .1mm rgba(0,0,0,.12)}
  .sw span{display:block;font-size:1.55mm;line-height:1.15;margin-top:.6mm;color:#3a3633;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .cal{font-size:1.5mm;color:#6F6862;letter-spacing:.06em}
`;

function front(key) {
  const p = PAL[key];
  const m = LAYOUT.marker, [grey, white] = LAYOUT.patches;
  return `<div class="page ${p.brand}" style="--bg:#F6F2EC"><div class="card">
    <div class="abs bod mark" style="left:5mm;top:4.2mm">${wordmark(p.brand)}</div>
    <div class="abs tag" style="right:5mm;top:5mm">Kleurenpas</div>
    <div class="abs bod season" style="left:5mm;top:10.5mm">${p.name}</div>
    <div class="abs fam" style="right:5mm;top:13.2mm">${p.family} · ${p.metal.split(" of ")[0]}</div>
    <div class="abs sw" style="left:5mm;right:5mm;top:20.5mm">${p.pass.map((c) => `<div><i style="background:${c.hex}"></i><span>${c.name}</span></div>`).join("")}</div>
    <div class="abs" style="left:${m.x}mm;top:${m.y}mm">${marker(m.size)}</div>
    <div class="abs" style="left:${grey.x}mm;top:${grey.y}mm;width:${grey.w}mm;height:${grey.h}mm;background:${grey.srgb}"></div>
    <div class="abs" style="left:${white.x}mm;top:${white.y}mm;width:${white.w}mm;height:${white.h}mm;background:#fff;box-shadow:inset 0 0 0 .12mm #b9b0a6"></div>
    <div class="abs cal" style="left:41mm;top:42mm;width:40mm;line-height:1.35">Houd de pas bij daglicht naast een kledingstuk.<br>Lijkt het op een van deze kleuren? Dan is het jouw kleur.</div>
  </div></div>`;
}

async function back(brand) {
  const url = `https://www.kulort-nyanse.com/gids?utm_source=pass&brand=${brand}`;
  const qr = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#141414", light: "#F6F2EC" } });
  return `<div class="page ${brand}" style="--bg:#141414;color:#F6F2EC"><div class="card" style="color:#F6F2EC">
    <div class="abs bod" style="left:5mm;top:5mm;font-size:4.2mm;letter-spacing:.08em">${wordmark(brand)}</div>
    <div class="abs bod" style="left:5mm;top:15mm;font-size:5.2mm;line-height:1.1;width:44mm">Je kleuren,<br><i>altijd bij je.</i></div>
    <div class="abs" style="left:5mm;top:31mm;font-size:2.1mm;line-height:1.45;width:44mm;color:#cfc8bf">Scan voor je stijlgids. Open hem op de telefoon waarmee je bestelde, of via de link uit je mail.</div>
    <div class="abs" style="left:5mm;bottom:5mm;font-size:2mm;letter-spacing:.06em;color:#cfc8bf">Vriendencode: ____________________</div>
    <div class="abs" style="right:5mm;top:8mm;width:28mm;height:28mm;background:#F6F2EC;padding:2mm">${qr.replace("<svg", '<svg width="24mm" height="24mm"')}</div>
    <div class="abs" style="right:5mm;bottom:5mm;font-size:1.8mm;letter-spacing:.12em;color:#cfc8bf">KULORT-NYANSE.COM</div>
  </div></div>`;
}

const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700&display=block">`;
const keys = Object.keys(PAL).sort((a, b) => a.localeCompare(b));
const pages = [...keys.map(front), await back("kulort"), await back("nyanse")];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`<!doctype html><meta charset="utf-8">${FONTS}<style>${CSS}</style><body>${pages.join("")}</body>`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: `${OUT}/kleurenpassen-v1.pdf`, width: `${W + 2 * BLEED}mm`, height: `${H + 2 * BLEED}mm`, printBackground: true, pageRanges: "" });
console.log("wrote", `${OUT}/kleurenpassen-v1.pdf`, pages.length, "pages");

// screen previews: all cards on one sheet per brand
await page.setViewportSize({ width: 1400, height: 1000 });
for (const brand of ["kulort", "nyanse"]) {
  const mine = keys.filter((k) => PAL[k].brand === brand).map(front).join("") + (await back(brand));
  await page.setContent(`<!doctype html><meta charset="utf-8">${FONTS}<style>${CSS} body{display:grid;grid-template-columns:repeat(4,max-content);gap:4mm;padding:6mm;background:#ddd} .page{break-after:auto}</style><body>${mine}</body>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}/preview-${brand}.png`, fullPage: true });
  console.log("wrote preview", brand);
}
await browser.close();
