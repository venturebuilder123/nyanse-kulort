// "Breaking the frame" (founder's inspiration, 21 Oct 2026): colour pours through a fake Instagram
// post bar and becomes the drape on someone's shoulders. Gemini makes the picture with an empty,
// flat black band across the middle (docs/brand/FRAME-BREAK.md); this script finds that band, draws
// our own post bar on it (handle, question, icons; never fake like counts) and lays the paint or
// fabric that crosses the band back on top, so it really flows "through" the post.
// Run: node scripts/make-frame-break.mjs  →  assets/gemini/framebreak/*.{png,jpg} → public/social/framebreak/*.jpg
import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import sharp from "sharp";

const SRC = process.argv[2] ?? "assets/gemini/framebreak";
const OUT = process.argv[3] ?? "public/social/framebreak";
const QUESTION = { default: "Same face. Different colour. Which season are you?" };
mkdirSync(OUT, { recursive: true });

const FONTS = "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Bodoni+Moda:opsz,wght@6..96,400..600&display=block";
const ICON = {
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.2 5.2 3 1.6-1.8 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>`,
  comment: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.1A8.5 8.5 0 1 1 20.5 11.5z"/></svg>`,
  send: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M21.5 3 10 13.5M21.5 3l-7 18-4.5-7.5L2.5 9z"/></svg>`,
  save: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8"><path d="M5.5 3.5h13v17L12 15.5l-6.5 5z"/></svg>`,
};
const bar = (w, h, question) => {
  const u = h / 100; // everything scales with the band height
  return `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{background:transparent}</style>
  <div id="b" style="width:${w}px;height:${h}px;background:#0B0B0E;color:#fff;font-family:Manrope,sans-serif;padding:${10 * u}px ${4 * w / 100}px;display:grid;grid-template-rows:auto 1fr auto;gap:${6 * u}px">
    <div style="display:flex;gap:${7 * u}px;align-items:center">${["heart", "comment", "send"].map((k) => `<span style="width:${17 * u}px;height:${17 * u}px;display:block">${ICON[k]}</span>`).join("")}<span style="flex:1"></span><span style="width:${17 * u}px;height:${17 * u}px;display:block">${ICON.save}</span></div>
    <div style="font-size:${15 * u}px;line-height:1.25"><b style="font-weight:800">kulortnyanse</b> &nbsp;${question}</div>
    <div style="display:flex;align-items:center;gap:${5 * u}px"><span style="width:${19 * u}px;height:${19 * u}px;border-radius:50%;background:#F6F2EC;color:#141414;display:grid;place-items:center;font-family:'Bodoni Moda',serif;font-size:${8 * u}px;letter-spacing:.02em">Ø|N</span><b style="font-size:${15 * u}px;font-weight:800">kulortnyanse</b></div></div>`;
};

/** The band: the longest run of rows, in the middle half, that are almost entirely near-black. */
function findBand(data, W, H) {
  const dark = (i) => data[i] < 32 && data[i + 1] < 32 && data[i + 2] < 32;
  let best = [0, 0], run = null;
  for (let y = Math.floor(H * 0.2); y < Math.floor(H * 0.8); y++) {
    let n = 0;
    for (let x = 0; x < W; x += 2) if (dark((y * W + x) * 4)) n++;
    const isBand = n / (W / 2) > 0.55; // the paint may cover up to ~45% of a row
    if (isBand && run === null) run = y;
    if ((!isBand || y === Math.floor(H * 0.8) - 1) && run !== null) {
      if (y - run > best[1] - best[0]) best = [run, y];
      run = null;
    }
  }
  return best[1] - best[0] > H * 0.06 ? best : null;
}

const browser = await chromium.launch();
const page = await browser.newPage();
const files = existsSync(SRC) ? readdirSync(SRC).filter((f) => /\.(png|jpe?g)$/i.test(f)) : [];
for (const f of files) {
  const base = sharp(`${SRC}/${f}`).ensureAlpha();
  const meta = await base.metadata();
  // posts 4:5, everything taller as 9:16
  const W = 1080, H = (meta.height ?? 0) / (meta.width ?? 1) > 1.5 ? 1920 : 1350;
  const { data } = await sharp(`${SRC}/${f}`).resize(W, H, { fit: "cover" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const band = findBand(data, W, H);
  if (!band) { console.warn("no black band found in", f); continue; }
  const [y0, y1] = band, bh = y1 - y0;
  await page.setViewportSize({ width: W, height: bh });
  await page.setContent(bar(W, bh, QUESTION.default), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const ui = await page.locator("#b").screenshot({ omitBackground: true });
  // what crosses the band (not near-black) goes back on top of the bar
  const front = Buffer.from(data);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const inBand = y >= y0 && y < y1;
    const object = data[i] > 40 || data[i + 1] > 40 || data[i + 2] > 40;
    front[i + 3] = inBand && object ? 255 : 0;
  }
  const out = `${OUT}/${f.replace(/\.(png|jpe?g)$/i, ".jpg")}`;
  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .composite([{ input: ui, top: y0, left: 0 }, { input: await sharp(front, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer(), top: 0, left: 0 }])
    .flatten({ background: "#ffffff" }).jpeg({ quality: 90 }).toFile(out);
  console.log("wrote", out, `(band ${y0}–${y1})`);
}
await browser.close();
if (!files.length) console.log(`no images in ${SRC} yet`);
