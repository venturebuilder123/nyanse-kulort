// Renders the app icons per brand (home screen, PWA) with Playwright. Run once: node scripts/make-icons.mjs
// KULØRT: the Ø with its cognac hairline on ink. NYANSE: a Bodoni N on paper.
import { chromium } from "@playwright/test";

const FONTS = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,300&family=Bodoni+Moda:opsz,wght@96,400&display=block";

const icon = (brand, size, pad) => {
  const k = brand === "kulort";
  const glyph = k
    ? `<span style="position:relative;font-family:Archivo;font-stretch:125%;font-weight:300;font-size:${size * 0.56 * pad}px;color:#F4F0EA;line-height:1">O<i style="position:absolute;left:50%;top:50%;width:${size * 0.5 * pad}px;height:${Math.max(2, size * 0.018)}px;background:#B8743F;transform:translate(-50%,-50%) rotate(-58deg)"></i></span>`
    : `<span style="font-family:'Bodoni Moda';font-weight:400;font-size:${size * 0.62 * pad}px;color:#121212;line-height:1;transform:translateY(-3%)">N</span>`;
  return `<!doctype html><html><head><link rel="stylesheet" href="${FONTS}"></head>
<body style="margin:0"><div id="i" style="width:${size}px;height:${size}px;display:grid;place-items:center;background:${k ? "#111418" : "#FBF6F2"}">${glyph}</div></body></html>`;
};

const browser = await chromium.launch();
const page = await browser.newPage();
for (const brand of ["kulort", "nyanse"]) {
  for (const [size, name, pad] of [[192, "192", 1], [512, "512", 1], [180, "apple", 1], [512, "maskable", 0.78]]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(icon(brand, size, pad), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#i").screenshot({ path: `public/icons/${brand}-${name}.png` });
  }
}
await browser.close();
console.log("icons written to public/icons");
