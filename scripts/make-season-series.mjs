// "12 seasons. One a week." The weekly series for Instagram and TikTok (docs/marketing/GUERRILLA.md).
// Run: node scripts/make-season-series.mjs  →  assets/social/seasons/{nn}-{season}/
//   slide-1..6.jpg   Instagram carousel, 1080×1350 (4:5)
//   story.jpg        "I'm a …" story template, 1080×1920 (people screenshot it and add their selfie)
//   tiktok-cover.jpg cover for the TikTok video of that week, 1080×1920
// JPEG at quality 92: Instagram and TikTok recompress anyway, and the repo stays light.
// Colours come from the colour engine (assets/social/seasons/data.json). English, as decided on 15 Oct.
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT = "assets/social/seasons";
const D = JSON.parse(readFileSync(`${OUT}/data.json`, "utf8"));
const img = (p) => "data:image/jpeg;base64," + readFileSync(resolve("public/brand", p)).toString("base64");

// posting order: broad, much-searched types first, then the rest
const ORDER = ["softAutumn", "deepWinter", "softSummer", "lightSpring", "warmAutumn", "coolWinter", "lightSummer", "brightSpring", "deepAutumn", "coolSummer", "warmSpring", "brightWinter"];
const FAMILY = { Spring: "Spring", Summer: "Summer", Autumn: "Autumn", Winter: "Winter" };
const LINE = {
  lightSpring: "Light as a spring morning.", warmSpring: "Warm, sunny, full of life.", brightSpring: "Clear, warm and unforgettable.",
  lightSummer: "Light, cool and effortless.", coolSummer: "Cool, calm and refined.", softSummer: "Soft, cool and elegant.",
  softAutumn: "Warm and soft, like an autumn afternoon.", warmAutumn: "Rich, warm and spiced.", deepAutumn: "Deep, warm and powerful.",
  deepWinter: "Deep, cool and striking.", coolWinter: "Cool, clear and sharp.", brightWinter: "Clear, cool and full of contrast.",
};
// three recognisable signs, from the season's place on the three scales
function signs({ u, d, c }) {
  return [
    u < -0.15 ? ["Silver over gold", "Cool metals and icy whites make your skin look fresh. Gold can look a little yellow on you."]
      : u > 0.15 ? ["Gold over silver", "Warm metals and creamy whites make your skin glow. Stark white can look harsh on you."]
      : ["Both metals work", "You sit close to neutral. Rose gold and soft whites are your safe bet."],
    d > 0.65 ? ["Deep colours carry you", "Dark, rich shades look natural on you. Pastels fade away next to your face."]
      : d < 0.3 ? ["Light is your strength", "Light and mid tones make you glow. Black and very dark shades feel heavy."]
      : ["Mid tones are your base", "Not too light, not too dark. Keep the extremes for small details."],
    c > 0.6 ? ["Clear beats muted", "Pure, vivid colours match the clarity of your eyes. Dusty shades make you look tired."]
      : c < 0.35 ? ["Muted beats bright", "Soft, slightly greyed shades look polished on you. Neon overpowers your face."]
      : ["Rich, not loud", "Colours with depth work best: not neon, not dusty."],
  ];
}

const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const BASE = `<link rel="stylesheet" href="${FONTS}"><style>
  *{box-sizing:border-box;margin:0}
  body{background:#F6F2EC;color:#141414;font-family:Manrope,sans-serif}
  .bod{font-family:'Bodoni Moda',serif;font-weight:400}
  .o{position:relative;display:inline-block}
  .o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}
  .eyebrow{font-weight:700;letter-spacing:.24em;text-transform:uppercase;font-size:22px;color:#6F6862}
  .mark{font-family:'Bodoni Moda',serif;font-size:28px;letter-spacing:.06em}
  .page{width:1080px;height:1350px;padding:70px;display:grid;position:relative;overflow:hidden}
  .foot{display:flex;justify-content:space-between;align-items:center;font-size:22px;font-weight:700}
  .n{font-family:'Bodoni Moda',serif;font-size:26px;color:#6F6862}
</style>`;
const KUL = `KUL<span class="o">O</span>RT`;
const MARK = `<span class="mark">${KUL} <span style="opacity:.45">|</span> NYANSE</span>`;
const top = (no, label) => `<div style="display:flex;justify-content:space-between;align-items:center">${MARK}<span class="eyebrow">${label}</span></div>`;
const foot = (i) => `<div class="foot"><span>@kulortnyanse</span><span class="n">${i} / 6</span></div>`;
const chips = (cols, h, names = true) => `<div style="display:grid;grid-template-columns:repeat(${cols.length > 6 ? 4 : 3},1fr);gap:14px">${cols.map((c) => `<div><div style="height:${h}px;background:${c.hex};box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)"></div>${names ? "" : ""}</div>`).join("")}</div>`;

function series(key, no) {
  const s = D[key];
  const fam = FAMILY[s.name.split(" ").pop()];
  const [a, b, c] = signs(s.scales);
  const her = s.nyanse.slice(0, 6), him = s.kulort.slice(0, 6);
  const tag = `Season ${String(no).padStart(2, "0")} / 12`;
  const slides = [
    // 1. the hook
    `<div class="page" style="grid-template-rows:auto 1fr auto;gap:30px">${top(no, tag)}
      <div style="position:relative;overflow:hidden"><img src="${img(`seasons/season-${key}.jpg`)}" style="width:100%;height:100%;object-fit:cover">
        <div style="position:absolute;left:0;right:0;bottom:0;padding:40px;background:linear-gradient(transparent,rgba(0,0,0,.55));color:#fff">
          <div class="eyebrow" style="color:#fff;opacity:.9">${fam}</div>
          <div class="bod" style="font-size:104px;line-height:.95">Are you a<br><i>${s.name}?</i></div></div></div>
      <div class="foot"><span>Swipe for the signs →</span><span class="n">1 / 6</span></div></div>`,
    // 2. three signs
    `<div class="page" style="grid-template-rows:auto auto 1fr auto;gap:36px">${top(no, tag)}
      <div class="bod" style="font-size:84px;line-height:1">3 signs you're<br><i>a ${s.name}</i></div>
      <ol style="list-style:none;padding:0;display:grid;gap:0;align-content:start">${[a, b, c].map(([t, d], i) => `<li style="display:grid;grid-template-columns:110px 1fr;gap:12px;border-top:1px solid #141414;padding:42px 0"><span class="bod" style="font-size:80px;line-height:1">0${i + 1}</span><span><b style="font-size:42px">${t}</b><br><span style="font-size:33px;line-height:1.45;color:#4a4540">${d}</span></span></li>`).join("")}</ol>
      ${foot(2)}</div>`,
    // 3. her colours / his colours
    `<div class="page" style="grid-template-rows:auto auto 1fr auto;gap:30px">${top(no, tag)}
      <div class="bod" style="font-size:80px;line-height:1">Your colours as<br><i>a ${s.name}</i></div>
      <div style="display:grid;gap:34px;align-content:start">
        <div style="display:grid;gap:12px"><span class="eyebrow">For her · NYANSE</span>${chips(her, 150)}</div>
        <div style="display:grid;gap:12px"><span class="eyebrow">For him · KULØRT</span>${chips(him, 150)}</div></div>
      ${foot(3)}</div>`,
    // 4. worn
    `<div class="page" style="grid-template-rows:auto auto 1fr auto;gap:26px">${top(no, tag)}
      <div class="bod" style="font-size:76px;line-height:1">${LINE[key].replace(/\.$/, "")}<i>.</i></div>
      <img src="${img(`outfits/${key}-both.jpg`)}" style="width:100%;height:100%;object-fit:cover;min-height:0">
      <div class="foot"><span>Head to toe in one colour family.</span><span class="n">4 / 6</span></div></div>`,
    // 5. leave on the rack
    `<div class="page" style="grid-template-rows:auto auto auto 1fr auto;gap:34px">${top(no, tag)}
      <div class="bod" style="font-size:84px;line-height:1">Leave these<br><i>on the rack</i></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-content:start">${s.avoid.map((h) => `<div style="position:relative;height:440px;background:${h};overflow:hidden"><i style="position:absolute;left:-10%;top:50%;width:120%;height:5px;background:#fff;transform:rotate(-28deg)"></i></div>`).join("")}</div>
      <div style="display:grid;gap:18px;font-size:35px;line-height:1.45;color:#4a4540;align-content:start"><p>They draw attention away from your face. Love one of them? Wear it below the waist: trousers, skirt or shoes.</p><p><b style="color:#141414">Metal:</b> ${s.metal.replace("Zilver", "Silver").replace("Witgoud", "White gold").replace("Goud", "Gold").replace("Brons", "Bronze").replace("Roségoud", "Rose gold").replace(" of ", " or ")}</p></div>
      ${foot(5)}</div>`,
    // 6. the call to action
    `<div class="page" style="grid-template-rows:auto 1fr auto;gap:30px;background:#141414;color:#F6F2EC">
      <div style="display:flex;justify-content:space-between;align-items:center"><span class="mark" style="color:#F6F2EC">${KUL} <span style="opacity:.45">|</span> NYANSE</span><span class="eyebrow" style="color:#cfc8bf">${tag}</span></div>
      <div style="display:grid;gap:40px;align-content:center">
        <div class="bod" style="font-size:96px;line-height:1">Not a ${s.name}?<br><i>Find yours. Free.</i></div>
        <div style="font-size:32px;line-height:1.5;color:#cfc8bf">One selfie, a few minutes. Your exact type, your best colours and what to leave on the rack.</div>
        <div style="display:flex;gap:16px"><span style="background:#F6F2EC;color:#141414;padding:24px 34px;font-weight:800;font-size:30px">Link in bio</span><span style="border:2px solid #F6F2EC;padding:22px 32px;font-weight:800;font-size:30px">Follow for next Monday</span></div></div>
      <div class="foot"><span>Save this · Send it to a ${s.name}</span><span class="n" style="color:#cfc8bf">6 / 6</span></div></div>`,
  ];
  // story: "I'm a …" with room for a selfie (people screenshot it, add their photo and share)
  const story = `<div style="width:1080px;height:1920px;position:relative;overflow:hidden;background:#F6F2EC">
    <div style="position:absolute;top:250px;left:70px;right:70px;display:grid;gap:18px"><span class="eyebrow">My season</span><div class="bod" style="font-size:118px;line-height:.95">I'm a<br><i>${s.name}</i></div></div>
    <div style="position:absolute;left:70px;right:70px;top:640px;height:640px;border:3px dashed #b9b0a6;display:grid;place-items:center;color:#8a8279;font-size:30px;font-weight:700">your selfie here</div>
    <div style="position:absolute;left:70px;right:70px;top:1320px;display:grid;grid-template-columns:repeat(8,1fr);gap:8px">${s.nyanse.slice(0, 4).concat(s.kulort.slice(0, 4)).map((c) => `<i style="height:120px;background:${c.hex};display:block"></i>`).join("")}</div>
    <div style="position:absolute;left:70px;right:70px;bottom:360px;display:flex;justify-content:space-between;font-size:30px;font-weight:800"><span>kulort-nyanse.com</span><span>@kulortnyanse</span></div></div>`;
  // TikTok cover (the safe area keeps text away from the right-hand buttons and the caption)
  const cover = `<div style="width:1080px;height:1920px;position:relative;overflow:hidden">
    <img src="${img(`seasons/season-${key}.jpg`)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
    <div style="position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.05) 30%,rgba(0,0,0,.55))"></div>
    <div style="position:absolute;left:70px;right:200px;top:520px;color:#fff;display:grid;gap:22px"><span class="eyebrow" style="color:#fff">${tag}</span><div class="bod" style="font-size:132px;line-height:.92">${s.name.replace(" ", "<br><i>")}</i></div>
      <div style="display:flex;gap:8px">${s.nyanse.slice(0, 6).map((c) => `<i style="width:70px;height:70px;border-radius:50%;background:${c.hex};display:block;box-shadow:0 0 0 3px rgba(255,255,255,.8)"></i>`).join("")}</div></div></div>`;
  return { slides, story, cover };
}

const browser = await chromium.launch();
const page = await browser.newPage();
const shot = async (html, w, h, path) => {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><meta charset="utf-8">${BASE}<body>${html}</body>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path, type: "jpeg", quality: 92 });
};
for (const [i, key] of ORDER.entries()) {
  const dir = `${OUT}/${String(i + 1).padStart(2, "0")}-${key}`;
  mkdirSync(dir, { recursive: true });
  const { slides, story, cover } = series(key, i + 1);
  for (const [n, html] of slides.entries()) await shot(html, 1080, 1350, `${dir}/slide-${n + 1}.jpg`);
  await shot(story, 1080, 1920, `${dir}/story.jpg`);
  await shot(cover, 1080, 1920, `${dir}/tiktok-cover.jpg`);
  console.log("wrote", dir);
}
await browser.close();
