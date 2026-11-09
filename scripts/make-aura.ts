// "Colour Aura" (founder, 9 Nov 2026: a new campaign for the young crowd, 18–25, with that colour-flow
// feel). Aura photography is a Gen Z trend: a polaroid with a mist of colour around you. Ours is not a
// vibe but measured: each young model's aura is their own season's palette, straight from the engine.
//
// Per young model (lib/brand/people.json, segment "jong") into public/social/aura/{brand}-jong-{n}/:
//   reel.mp4   1080×1920, 8 s: "aura check" → wrong colours, grey aura → palette sweep → their colour,
//              their aura blooms → end card. H.264 with a silent track (sound is added in TikTok/IG).
//   cover.jpg  1080×1920 frame of the reveal, as the Reel/TikTok cover
//   post.jpg   1080×1350 feed post
//   slide-1..4.jpg  Instagram carousel: wrong colour → their colour → the palette with names → "comment AURA"
// plus public/social/aura/grid-{brand}.jpg, all 12 seasons as auras ("which aura are you?").
// Writes lib/social/aura-posts.json (read by /lab/tiktok).
// Needs ffmpeg: `npm install --no-save ffmpeg-static`. Run: npx tsx scripts/make-aura.ts
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import PEOPLE from "@/lib/brand/people.json";
import { nameForHex } from "@/lib/color/palette";
import { profileForSeason } from "@/lib/color/declared";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { clothPath } from "@/lib/flow/cloth";
import { buildGuide } from "@/lib/guide/build";
import { guideFor } from "@/lib/guide/lang";
import { colourName } from "@/lib/i18n/words";

const FFMPEG = createRequire(import.meta.url)("ffmpeg-static") as string;
const OUT = "public/social/aura";
const FPS = 30, SECONDS = 8;
const FIT = { w: 0.44, cy: 0.4 }; // as on the home stage
type Brand = "nyanse" | "kulort";

const palette = (season: SeasonKey, brand: Brand) => {
  const g = guideFor(buildGuide(profileForSeason(season), brand), "en");
  return { core: g.summary.core.slice(0, 7).map((c) => ({ hex: c.hex, name: c.name })), avoid: g.summary.avoid.map((c) => c.hex) };
};

const avgLum = (hs: string[]) => hs.reduce((a, h) => { const n = parseInt(h.slice(1), 16); return a + (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; }, 0) / hs.length;

type Person = { src: string; face: { cx: number; cy: number; w: number; h: number; aspect: number }; good: string; bad: string; season: string; segment?: string };
const jobs = (["nyanse", "kulort"] as const).flatMap((brand) =>
  (PEOPLE[brand] as Person[]).filter((p) => p.segment === "jong").map((p) => {
    const season = p.season as SeasonKey;
    const pal = palette(season, brand);
    const f = p.face;
    const s = FIT.w / f.w;
    const nl = nameForHex(p.good, brand);
    return {
      slug: p.src.split("/").pop()!.replace(".jpg", ""),
      brand, season, seasonName: SEASONS[season].name,
      img: `data:image/jpeg;base64,${readFileSync(`public${p.src}`).toString("base64")}`,
      // where the photo sits in the 4:5 frame (fractions of the frame), as in app/(flow)/Drape.tsx
      photo: { s, left: 0.5 - f.cx * s, top: (FIT.cy * 1.25 - f.cy * (s / f.aspect)) / 1.25, aspect: f.aspect },
      cloth: clothPath(FIT, f.h * (s / f.aspect), 0.12), // shoulders a little higher: no T-shirt beside the cloth
      good: p.good, goodName: nl ? colourName(nl, "en") : "",
      names: pal.core.map((c) => c.name),
      wrong: [...new Set([p.bad, ...pal.avoid])].slice(0, 4),
      palette: pal.core.map((c) => c.hex),
      dark: avgLum(pal.core.map((c) => c.hex)) < 0.36, // dark aura: light text
    };
  }),
);
const grids = (["nyanse", "kulort"] as const).map((brand) => ({
  brand,
  seasons: (Object.keys(SEASONS) as SeasonKey[]).map((k) => ({ name: SEASONS[k].name, palette: palette(k, brand).core.map((c) => c.hex) })),
}));

const FONTS = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;1,6..96,400&family=Caveat:wght@700&display=block";

// Everything is drawn on one canvas in the browser; render(job, t, mode) is deterministic in t.
const PAGE = `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}">
<style>body{margin:0;background:#000}canvas{display:block}</style>
<span style="font-family:'Bricolage Grotesque';font-weight:800">a</span><span style="font-family:'Bricolage Grotesque';font-weight:500">a</span><span style="font-family:'Bodoni Moda';font-style:italic">a</span><span style="font-family:'Bodoni Moda'">a</span><span style="font-family:Caveat">a</span>
<canvas id="c"></canvas>
<script>
const C = document.getElementById("c"), X = C.getContext("2d");
const INK = "#141414", PAPER = "#FBF8F3";
const BRIC = (w, px) => w + " " + px + "px 'Bricolage Grotesque'";
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const easeOut = (p) => 1 - Math.pow(1 - p, 3);
const easeIO = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const back = (p) => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); };
const rgb = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
const mix = (a, b, w) => { const x = rgb(a), y = rgb(b); return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * w).toString(16).padStart(2, "0")).join(""); };
const imgs = new Map();
const load = (src) => imgs.get(src) || imgs.set(src, new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = src; })).get(src);

// ---- film grain, made once
const grain = document.createElement("canvas"); grain.width = grain.height = 256;
{ const g = grain.getContext("2d"), d = g.createImageData(256, 256); let s = 7;
  for (let i = 0; i < d.data.length; i += 4) { s = (s * 16807) % 2147483647; const v = s % 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 22; }
  g.putImageData(d, 0, 0); }
function addGrain(W, H, t) {
  X.save(); X.globalCompositeOperation = "overlay";
  const p = X.createPattern(grain, "repeat"); const o = Math.floor(t * 10) * 37 % 256; // changes every 3rd frame: keeps the video small
  X.translate(-o, -((o * 3) % 256)); X.fillStyle = p; X.fillRect(0, 0, W + 256, H + 256); X.restore();
}

// ---- the aura: soft blobs of colour drifting, drawn small and scaled up (that is the blur)
const small = document.createElement("canvas"), S = small.getContext("2d");
function aura(colors, W, H, t, glow = 1) {
  small.width = Math.ceil(W / 8); small.height = Math.ceil(H / 8);
  const w = small.width, h = small.height;
  S.fillStyle = mix(colors[colors.length - 1], "#ffffff", 0.35); S.fillRect(0, 0, w, h);
  colors.forEach((c, k) => {
    const a = k * 2.399 + 0.6;
    const x = w * (0.5 + 0.42 * Math.sin(a + t * (0.35 + k * 0.04))), y = h * (0.5 + 0.44 * Math.cos(a * 1.3 + t * (0.28 + k * 0.05)));
    const r = Math.max(w, h) * (0.42 + 0.1 * Math.sin(t * 0.9 + k)) * glow;
    const g = S.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, mix(c, "#ffffff", 0.12)); g.addColorStop(1, mix(c, "#ffffff", 0.12) + "00");
    S.fillStyle = g; S.fillRect(0, 0, w, h);
  });
  X.save(); X.imageSmoothingQuality = "high"; X.filter = "blur(18px)"; X.drawImage(small, -40, -40, W + 80, H + 80); X.restore();
}

// ---- the polaroid: the photo with the drape, the aura mist over its edges, a handwritten line
async function polaroid(j, cx, cy, PW, rot, colour, mist, mistAmt, caption, t, dev = 1) {
  const PH = PW * 1.25, pad = PW * 0.04, bottom = PW * 0.19, CW = PW + 2 * pad, CH = PH + pad + bottom;
  X.save(); X.translate(cx, cy); X.rotate(rot);
  X.shadowColor = "rgba(0,0,0,.28)"; X.shadowBlur = 60; X.shadowOffsetY = 26;
  X.fillStyle = PAPER; X.fillRect(-CW / 2, -CH / 2, CW, CH); X.shadowColor = "transparent";
  const ox = -PW / 2, oy = -CH / 2 + pad;
  X.save(); X.beginPath(); X.rect(ox, oy, PW, PH); X.clip(); X.translate(ox, oy);
  const img = await load(j.img);
  X.drawImage(img, j.photo.left * PW, j.photo.top * PH, j.photo.s * PW, (j.photo.s * PW) / j.photo.aspect);
  // glow of the cloth on the face (soft light, like the site)
  X.save(); X.globalCompositeOperation = "soft-light"; X.globalAlpha = 0.45;
  X.translate(PW / 2, ((j.cloth.neckY + 4) / 125) * PH); X.scale(1, 0.43);
  let g = X.createRadialGradient(0, 0, 0, 0, 0, PW * 0.6); g.addColorStop(0, colour); g.addColorStop(0.7, colour + "00");
  X.fillStyle = g; X.fillRect(-PW, -PH * 2, PW * 2, PH * 4); X.restore();
  // the cloth
  X.save(); X.scale(PW / 100, PH / 125);
  const cloth = new Path2D(j.cloth.d);
  X.fillStyle = colour; X.fill(cloth);
  g = X.createLinearGradient(0, 0, 100, 0);
  [[0, "rgba(0,0,0,.28)"], [0.22, "rgba(255,255,255,.10)"], [0.38, "rgba(0,0,0,.06)"], [0.5, "rgba(255,255,255,.08)"], [0.64, "rgba(0,0,0,.05)"], [0.8, "rgba(255,255,255,.09)"], [1, "rgba(0,0,0,.3)"]].forEach(([o, c]) => g.addColorStop(o, c));
  X.fillStyle = g; X.fill(cloth);
  g = X.createLinearGradient(0, 0, 0, 125); g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(0,0,0,.18)");
  X.fillStyle = g; X.fill(cloth);
  X.strokeStyle = "rgba(0,0,0,.22)"; X.lineWidth = 0.7; X.lineCap = "round"; X.stroke(new Path2D(j.cloth.collar));
  X.restore();
  // aura mist over the edges, the face stays clear (aura photography)
  if (mistAmt > 0) {
    X.save(); X.globalAlpha = mistAmt;
    const spots = [[-0.08, 0.02], [1.08, 0.08], [-0.12, 0.55], [1.12, 0.5], [0.5, -0.2], [0.1, 1.08], [0.9, 1.06]];
    spots.forEach(([sx, sy], k) => {
      const c = mist[k % mist.length], x = sx * PW + Math.sin(t * 1.1 + k) * PW * 0.04, y = sy * PH + Math.cos(t * 0.9 + k) * PH * 0.03;
      const r = PW * (0.42 + 0.05 * Math.sin(t * 1.7 + k * 2));
      const gg = X.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, c); gg.addColorStop(1, c + "00");
      X.fillStyle = gg; X.fillRect(0, 0, PW, PH);
    });
    X.restore();
  }
  // a polaroid develops: olive-grey first, then the picture comes through
  if (dev < 1) { X.fillStyle = "rgba(58,60,50," + (1 - dev).toFixed(3) + ")"; X.fillRect(0, 0, PW, PH); }
  X.restore();
  // a faint frame line on the photo, and the caption in pen
  X.strokeStyle = "rgba(0,0,0,.06)"; X.lineWidth = 2; X.strokeRect(ox, oy, PW, PH);
  if (caption) { X.fillStyle = "#2a2622"; X.font = "700 " + Math.round(PW * 0.085) + "px Caveat"; X.textAlign = "center"; X.textBaseline = "middle"; X.fillText(caption, 0, CH / 2 - bottom / 2 - 2); }
  X.restore();
  return { CW, CH };
}

function sticker(text, x, y, rot, p, dark, size = 50) {
  if (p <= 0) return;
  const sc = back(clamp(p));
  X.save(); X.translate(x, y); X.rotate(rot); X.scale(sc, sc);
  X.font = BRIC(800, size); const w = X.measureText(text).width + size * 1.1, h = size * 1.7;
  X.shadowColor = "rgba(0,0,0,.22)"; X.shadowBlur = 24; X.shadowOffsetY = 8;
  X.fillStyle = dark ? INK : PAPER; X.beginPath(); X.roundRect(-w / 2, -h / 2, w, h, h / 2); X.fill();
  X.shadowColor = "transparent"; X.fillStyle = dark ? PAPER : INK; X.textAlign = "center"; X.textBaseline = "middle"; X.fillText(text, 0, size * 0.04);
  X.restore();
}

function dots(colors, cx, y, r, gap, t0, t) {
  const n = colors.length, w = n * 2 * r + (n - 1) * gap;
  colors.forEach((c, k) => {
    const p = easeOut(seg(t, t0 + k * 0.07, t0 + k * 0.07 + 0.35)); if (p <= 0) return;
    X.save(); X.translate(cx - w / 2 + r + k * (2 * r + gap), y + (1 - p) * 40); X.scale(back(p), back(p));
    X.beginPath(); X.arc(0, 0, r, 0, Math.PI * 2); X.fillStyle = c; X.fill(); X.lineWidth = 6; X.strokeStyle = PAPER; X.stroke(); X.restore();
  });
}

function mark(cx, y, size, colour = INK) {
  X.save(); X.fillStyle = colour; X.font = "500 " + size + "px 'Bodoni Moda'"; X.textAlign = "center"; X.textBaseline = "middle";
  X.fillText("KULØRT  |  NYANSE", cx, y); X.restore();
}

const grey = (cs) => cs.map((c) => mix(c, "#8f8a84", 0.62));
const who = (j) => (j.brand === "nyanse" ? "her" : "his");

// ---- the Reel, 8 s. Everything that matters sits in the safe zone of Instagram and TikTok
// (clear of the top 250 px and the bottom 340 px, where the app's own buttons and caption sit),
// and the cover reads in the 3:4 crop of the profile grid.
async function reel(j, t) {
  const W = 1080, H = 1920; C.width = W; C.height = H;
  const SWEEP = [3.0, 3.75], END = 6.35, FLIP = (SWEEP[0] + SWEEP[1]) / 2;
  const good = t >= FLIP;
  const wi = Math.min(j.wrong.length - 1, Math.floor(Math.max(0, t - 0.7) / 0.58));
  const colour = good ? j.good : j.wrong[wi];
  const bloom = easeOut(seg(t, 3.4, 4.6));
  const ink = good && j.dark ? PAPER : INK;
  aura(good ? j.palette : grey(j.wrong.concat(j.palette.slice(0, 3))), W, H, t, good ? 0.9 + 0.25 * bloom : 0.85);

  // top line: "aura check" → season name
  const endP = easeIO(seg(t, END, END + 0.55));
  X.save(); X.textAlign = "center"; X.textBaseline = "alphabetic"; X.fillStyle = ink; X.globalAlpha = 1 - endP;
  if (!good) {
    const p = back(seg(t, 0.05, 0.45)); X.translate(540, 350); X.scale(p, p);
    X.font = BRIC(800, 150); X.fillText("aura check", 0, 0);
    X.font = BRIC(500, 42); X.globalAlpha = (1 - endP) * seg(t, 0.5, 0.8); X.fillText("wait for " + who(j) + " colour", 0, 66);
  } else {
    const p = back(seg(t, 3.5, 3.95)); X.translate(540, 350); X.scale(p, p);
    X.font = "italic 400 136px 'Bodoni Moda'"; X.fillText(j.seasonName.toLowerCase(), 0, 0);
    X.font = BRIC(500, 42); X.fillText("measured, not a vibe", 0, 66);
  }
  X.restore();

  // the polaroid: it develops while it slides in, and punches in on the reveal
  if (t < END + 0.6) {
    const inP = easeOut(seg(t, 0, 0.6));
    const shake = !good && t > 0.7 ? Math.sin((t - 0.7) * 34) * 0.012 * Math.exp(-((t - 0.7) % 0.58) * 9) : 0;
    const rot = good ? -0.035 + 0.055 * easeOut(seg(t, 3.4, 4.2)) : -0.035 + shake;
    const punch = good ? 0.07 * Math.sin(Math.PI * seg(t, FLIP, FLIP + 0.45)) : 0;
    const y = 985 + (1 - inP) * 900 - endP * 1300, sc = (1 + punch) * (1 - endP * 0.25);
    X.save(); X.globalAlpha = 1 - endP; X.translate(540, y); X.scale(sc, sc);
    await polaroid(j, 0, 0, 680, rot, colour, good ? j.palette : grey(j.wrong), good ? 0.62 * bloom : 0.28, good ? j.seasonName.toLowerCase() + " ✦" : "aura: meh", t, easeOut(seg(t, 0.15, 1.2)));
    X.restore();
    // stickers
    if (!good) {
      const words = ["✕ washed out", "✕ tired??", "✕ grey vibes", "✕ nope"];
      const k = Math.max(0, Math.floor((t - 0.7) / 0.58));
      if (t > 0.7) sticker(words[k % 4], k % 2 ? 330 : 750, 1220 - (k % 3) * 70, k % 2 ? -0.12 : 0.1, seg(t, 0.7 + k * 0.58, 0.7 + k * 0.58 + 0.2), true, 46);
    } else if (t < END + 0.3) {
      sticker("✓ " + who(j) + " colour", 760, 600, 0.08, seg(t, 3.9, 4.15) * (1 - endP), false, 48);
      if (j.goodName) sticker(j.goodName.toLowerCase(), 330, 1250, -0.06, seg(t, 4.05, 4.3) * (1 - endP), true, 42);
    }
    if (good) { X.save(); X.globalAlpha = 1 - endP; dots(j.palette, 540, 1560, 44, 14, 4.2, t); X.restore(); }
    if (!good && t > 0.7) { X.save(); X.globalAlpha = seg(t, 0.9, 1.2); X.fillStyle = INK; X.font = BRIC(500, 40); X.textAlign = "center"; X.fillText("wrong colour = grey aura", 540, 1570); X.restore(); }
  }

  // the sweep: a band of the palette flowing across, under it the switch
  const sp = seg(t, SWEEP[0], SWEEP[1]);
  if (sp > 0 && sp < 1) {
    const e = easeIO(sp), x = -1700 + e * 4100;
    X.save(); X.translate(x, H / 2); X.rotate(-0.32);
    const bw = 1500, g = X.createLinearGradient(-bw / 2, 0, bw / 2, 0);
    g.addColorStop(0, j.palette[0] + "00"); j.palette.forEach((c, k) => g.addColorStop(0.08 + (k / (j.palette.length - 1)) * 0.84, c)); g.addColorStop(1, j.palette[j.palette.length - 1] + "00");
    X.fillStyle = g; X.fillRect(-bw / 2, -2400, bw, 4800); X.restore();
  }
  // a soft flash on the switch, like a camera
  if (good && t < FLIP + 0.3) { X.fillStyle = "rgba(255,255,255," + (0.55 * (1 - seg(t, FLIP, FLIP + 0.3))).toFixed(3) + ")"; X.fillRect(0, 0, W, H); }

  // end card
  if (endP > 0) {
    X.save(); X.globalAlpha = endP; X.fillStyle = ink; X.textAlign = "center";
    X.font = BRIC(800, 112); X.fillText("what's your", 540, 640);
    X.font = "italic 400 168px 'Bodoni Moda'"; X.fillText("colour aura?", 540, 810);
    X.restore();
    dots(j.palette, 540, 970, 50, 16, END + 0.3, t);
    X.save(); X.globalAlpha = seg(t, END + 0.5, END + 0.9); X.fillStyle = ink; X.textAlign = "center";
    X.font = BRIC(500, 46); X.fillText("not a vibe. measured from one selfie.", 540, 1140);
    X.restore();
    sticker("free · link in bio", 540, 1290, -0.03, seg(t, END + 0.7, END + 0.95), !j.dark, 56);
    X.save(); X.globalAlpha = seg(t, END + 0.8, END + 1.2); mark(540, 1470, 40, ink); X.restore();
  }
  addGrain(W, H, t);
}

// ---- Instagram carousel, 4 slides of 1080×1350: wrong colour → their colour → the palette → your turn
async function slide(j, n) {
  const W = 1080, H = 1350; C.width = W; C.height = H;
  const w = who(j);
  const text = (font, s, y, colour) => { X.save(); X.fillStyle = colour; X.textAlign = "center"; X.textBaseline = "alphabetic"; X.font = font; X.fillText(s, 540, y); X.restore(); };
  if (n === 1) {
    aura(grey(j.wrong.concat(j.palette.slice(0, 3))), W, H, 1.3, 0.85);
    text(BRIC(800, 112), "aura check", 150, INK);
    text(BRIC(500, 40), "swipe for " + w + " colour →", 212, INK);
    await polaroid(j, 540, 735, 540, -0.035, j.wrong[0], grey(j.wrong), 0.28, "aura: meh", 1.3);
    sticker("✕ grey aura", 300, 960, -0.1, 1, true, 44);
    text(BRIC(500, 38), "wrong colour = the face goes flat", 1265, INK);
  } else if (n === 2) {
    const ink = j.dark ? PAPER : INK;
    aura(j.palette, W, H, 2.2, 1.15);
    text("italic 400 112px 'Bodoni Moda'", j.seasonName.toLowerCase(), 160, ink);
    text(BRIC(500, 40), "measured, not a vibe", 246, ink);
    await polaroid(j, 540, 750, 540, 0.025, j.good, j.palette, 0.62, j.seasonName.toLowerCase() + " ✦", 2.2);
    sticker("✓ " + w + " colour", 790, 420, 0.09, 1, false, 42);
    if (j.goodName) sticker(j.goodName.toLowerCase(), 310, 975, -0.06, 1, true, 38);
    text(BRIC(800, 40), "same face. the aura switched on.", 1265, ink);
  } else if (n === 3) {
    const ink = j.dark ? PAPER : INK;
    aura(j.palette, W, H, 3.1, 1.15);
    text(BRIC(800, 84), w + " aura,", 150, ink);
    text("italic 400 96px 'Bodoni Moda'", "measured", 245, ink);
    j.palette.forEach((c, k) => {
      const y = 330 + k * 118;
      X.save(); X.fillStyle = "rgba(251,248,243,.88)"; X.beginPath(); X.roundRect(170, y, 740, 100, 50); X.fill();
      X.beginPath(); X.arc(222, y + 50, 38, 0, Math.PI * 2); X.fillStyle = c; X.fill();
      X.fillStyle = INK; X.font = BRIC(800, 42); X.textBaseline = "middle"; X.fillText((j.names[k] || "").toLowerCase(), 290, y + 52);
      X.restore();
    });
    text(BRIC(500, 38), "wear these near your face. save this.", 1265, ink);
  } else {
    X.fillStyle = PAPER; X.fillRect(0, 0, W, H);
    // a tall aura window with the question in it
    X.save(); X.beginPath(); X.roundRect(70, 70, 940, 900, 48); X.clip(); X.translate(70, 70); aura(j.palette, 940, 900, 4.4, 1.2); X.restore();
    text(BRIC(800, 104), "what's your", 420, INK);
    text("italic 400 150px 'Bodoni Moda'", "colour aura?", 580, INK);
    sticker("comment AURA", 540, 760, -0.04, 1, true, 58);
    text(BRIC(800, 46), "we DM you the free check", 1075, INK);
    text(BRIC(500, 36), "one selfie · one minute · your photo stays on your phone", 1140, INK);
    mark(540, 1262, 30);
  }
  addGrain(W, H, n);
}

// ---- feed post 1080×1350
async function post(j) {
  const W = 1080, H = 1350; C.width = W; C.height = H;
  aura(j.palette, W, H, 2.2, 1.1);
  const ink = j.dark ? PAPER : INK;
  X.save(); X.fillStyle = ink; X.textAlign = "center";
  X.font = BRIC(500, 40); X.fillText("aura check", 540, 92);
  X.font = "italic 400 112px 'Bodoni Moda'"; X.fillText(j.seasonName.toLowerCase(), 540, 196); X.restore();
  await polaroid(j, 540, 688, 520, 0.025, j.good, j.palette, 0.6, j.seasonName.toLowerCase() + " ✦", 2.2);
  sticker("✓ " + who(j) + " colour", 820, 420, 0.09, 1, false, 40);
  dots(j.palette, 540, 1146, 36, 14, -1, 9);
  X.save(); X.fillStyle = ink; X.textAlign = "center"; X.font = BRIC(800, 40); X.fillText("what's your colour aura? free · link in bio", 540, 1250); X.restore();
  mark(540, 1306, 24, ink);
  addGrain(W, H, 2.2);
}

// ---- "which aura are you?" 12 seasons
function grid(g) {
  const W = 1080, H = 1350; C.width = W; C.height = H;
  X.fillStyle = PAPER; X.fillRect(0, 0, W, H);
  X.save(); X.fillStyle = INK; X.textAlign = "center";
  X.font = BRIC(800, 84); X.fillText("which aura", 540, 120);
  X.font = "italic 400 96px 'Bodoni Moda'"; X.fillText("are you?", 540, 214); X.restore();
  const cols = 3, gap = 18, x0 = 60, y0 = 270, tw = (W - 2 * x0 - (cols - 1) * gap) / cols, th = 218;
  g.seasons.forEach((s, k) => {
    const x = x0 + (k % cols) * (tw + gap), y = y0 + Math.floor(k / cols) * (th + gap);
    X.save(); X.beginPath(); X.roundRect(x, y, tw, th, 28); X.clip(); X.translate(x, y);
    aura(s.palette, tw, th, k * 1.7, 1.2);
    X.restore();
    X.save(); X.textAlign = "left"; X.textBaseline = "alphabetic"; X.fillStyle = "rgba(251,248,243,.86)"; X.font = BRIC(800, 30); const tw2 = X.measureText(s.name.toLowerCase()).width;
    X.beginPath(); X.roundRect(x + 16, y + th - 64, tw2 + 32, 48, 24); X.fill(); X.fillStyle = INK; X.fillText(s.name.toLowerCase(), x + 32, y + th - 30); X.restore();
  });
  X.save(); X.fillStyle = INK; X.textAlign = "center"; X.font = BRIC(500, 34);
  X.fillText("comment yours ↓  not sure? free selfie check · link in bio", 540, 1250); X.restore();
  mark(540, 1306, 24);
  addGrain(W, H, 0);
}
window.R = { reel, post, grid, slide };
</script>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.setContent(PAGE, { waitUntil: "networkidle" });
await page.evaluate(async () => { await document.fonts.ready; });
const shot = async (fn: string, arg: unknown, t?: number) => {
  const url = await page.evaluate(async ([f, a, tt]) => {
    const R = (window as unknown as { R: Record<string, (a: unknown, t?: number) => Promise<void> | void> }).R;
    await R[f as string]!(a, tt as number);
    return (document.getElementById("c") as HTMLCanvasElement).toDataURL("image/jpeg", 0.9);
  }, [fn, arg, t] as const);
  return Buffer.from(url.split(",")[1]!, "base64");
};

const only = process.argv[2]; // optional: one slug, for a quick look
mkdirSync(OUT, { recursive: true });
const made: { slug: string; brand: Brand; season: string; dir: string }[] = [];
for (const j of jobs) {
  const dir = `${OUT}/${j.slug}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/post.jpg`, await shot("post", j));
  writeFileSync(`${dir}/cover.jpg`, await shot("reel", j, 5.2));
  for (const n of [1, 2, 3, 4]) writeFileSync(`${dir}/slide-${n}.jpg`, await shot("slide", j, n));
  made.push({ slug: j.slug, brand: j.brand, season: j.seasonName, dir: dir.replace("public", "") });
  if (only && only !== j.slug) continue;
  const tmp = `${dir}/_frames`;
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp);
  for (let i = 0; i < FPS * SECONDS; i++) writeFileSync(`${tmp}/${String(i).padStart(4, "0")}.jpg`, await shot("reel", j, i / FPS));
  execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", `${tmp}/%04d.jpg`, "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high", "-crf", "23", "-maxrate", "6M", "-bufsize", "12M", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", `${dir}/reel.mp4`]);
  rmSync(tmp, { recursive: true, force: true });
  console.log("wrote", dir);
}
for (const g of grids) writeFileSync(`${OUT}/grid-${g.brand}.jpg`, await shot("grid", g));
await browser.close();
if (!only) writeFileSync("lib/social/aura-posts.json", JSON.stringify(made, null, 1) + "\n");
console.log("done", made.length);
