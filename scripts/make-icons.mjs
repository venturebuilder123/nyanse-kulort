// Renders the app icons and the favicon: the house monogram Ø|N on ivory (founder, 20 Oct 2026; was
// one icon per brand). Run: node scripts/make-icons.mjs  →  public/icons/monogram-*.png, app/favicon.ico
// Small sizes get a heavier Bodoni and a thicker divider, so the monogram still reads at 16 px.
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";

const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400..700&display=block";
const icon = (size, pad, small) => {
  const fs = size * 0.5 * pad;
  return `<!doctype html><html><head><link rel="stylesheet" href="${FONTS}"></head>
<body style="margin:0"><div id="i" style="width:${size}px;height:${size}px;display:grid;place-items:center;background:#F6F2EC">
  <span style="font-family:'Bodoni Moda';font-optical-sizing:auto;font-weight:${small ? 600 : 400};font-size:${fs}px;color:#141414;line-height:1;display:flex;align-items:center;gap:${fs * 0.12}px">
    <span style="position:relative;display:inline-block">O<i style="position:absolute;left:-14%;right:-14%;top:50%;height:${Math.max(1.5, fs * (small ? 0.075 : 0.05))}px;margin-top:-${fs * 0.03}px;background:#141414;transform:rotate(-62deg)"></i></span>
    <i style="display:block;width:${Math.max(1, fs * (small ? 0.05 : 0.025))}px;height:${fs * 0.78}px;background:#141414;opacity:${small ? 0.55 : 0.4}"></i>
    <span>N</span></span></div></body></html>`;
};

const browser = await chromium.launch();
const page = await browser.newPage();
for (const [size, name, pad, small] of [[512, "512", 1, false], [192, "192", 1, false], [180, "apple", 1, false], [512, "maskable", 0.78, false], [256, "favicon-256", 1.15, true]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(icon(size, pad, small), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#i").screenshot({ path: `public/icons/monogram-${name}.png` });
}
await browser.close();
// favicon.ico (16, 32, 48) from the heavier 256 render; app/favicon.ico is picked up by Next.js for every page
execFileSync("python3", ["-c", "from PIL import Image; Image.open('public/icons/monogram-favicon-256.png').convert('RGBA').save('app/favicon.ico', sizes=[(16,16),(32,32),(48,48)], bitmap_format='bmp')"]);
console.log("icons written to public/icons and app/favicon.ico");
