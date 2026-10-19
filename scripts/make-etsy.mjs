// Etsy: 12 digital season guides (decision 19 Oct 2026). Per season:
//   guide.pdf        6 A4 pages: cover, the signs, the palette with hex codes, worn, leave on the rack, how to use it
//   wallpaper.png    phone wallpaper with the palette (1170×2532)
//   listing-1.jpg    main listing image (2000×1500)
// plus assets/etsy/listings.md with title, description and 13 tags per listing.
// No links to our site in the files: Etsy does not want buyers sent elsewhere.
// Run: node scripts/make-etsy.mjs
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const D = JSON.parse(readFileSync("assets/social/seasons/data.json", "utf8"));
const OUT = "assets/etsy";
const img = (p) => "data:image/jpeg;base64," + readFileSync(resolve("public/brand", p)).toString("base64");
const ORDER = ["softAutumn", "deepWinter", "softSummer", "lightSpring", "warmAutumn", "coolWinter", "lightSummer", "brightSpring", "deepAutumn", "coolSummer", "warmSpring", "brightWinter"];
const LINE = {
  lightSpring: "Light as a spring morning.", warmSpring: "Warm, sunny, full of life.", brightSpring: "Clear, warm and unforgettable.",
  lightSummer: "Light, cool and effortless.", coolSummer: "Cool, calm and refined.", softSummer: "Soft, cool and elegant.",
  softAutumn: "Warm and soft, like an autumn afternoon.", warmAutumn: "Rich, warm and spiced.", deepAutumn: "Deep, warm and powerful.",
  deepWinter: "Deep, cool and striking.", coolWinter: "Cool, clear and sharp.", brightWinter: "Clear, cool and full of contrast.",
};
function signs({ u, d, c }) {
  return [
    u < -0.15 ? ["Silver over gold", "Cool metals and icy whites make your skin look fresh. Gold can look a little yellow on you."] : u > 0.15 ? ["Gold over silver", "Warm metals and creamy whites make your skin glow. Stark white can look harsh on you."] : ["Both metals work", "You sit close to neutral. Rose gold and soft whites are your safe bet."],
    d > 0.65 ? ["Deep colours carry you", "Dark, rich shades look natural on you. Pastels fade away next to your face."] : d < 0.3 ? ["Light is your strength", "Light and mid tones make you glow. Black and very dark shades feel heavy."] : ["Mid tones are your base", "Not too light, not too dark. Keep the extremes for small details."],
    c > 0.6 ? ["Clear beats muted", "Pure, vivid colours match the clarity of your eyes. Dusty shades make you look tired."] : c < 0.35 ? ["Muted beats bright", "Soft, slightly greyed shades look polished on you. Neon overpowers your face."] : ["Rich, not loud", "Colours with depth work best: not neon, not dusty."],
  ];
}
const metalEn = (m) => m.replace("Zilver", "Silver").replace("Witgoud", "white gold").replace("Goud", "Gold").replace("Brons", "bronze").replace("Roségoud", "Rose gold").replace(" of ", " or ");
// the core colours first (the pass), then the rest of the 30-colour palette, 20 in total
const palette = (s) => [...s.nyanse, ...s.kulort, ...(s.palette ?? [])].filter((c, i, a) => a.findIndex((x) => x.hex === c.hex) === i).slice(0, 20);

const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const CSS = `<link rel="stylesheet" href="${FONTS}"><style>@page{size:A4;margin:0}*{box-sizing:border-box;margin:0}
body{font-family:Manrope,sans-serif;color:#141414;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:210mm;height:297mm;padding:18mm 16mm 14mm;background:#F6F2EC;display:grid;grid-template-rows:auto 1fr auto;gap:8mm;break-after:page;position:relative;overflow:hidden}
.bod{font-family:'Bodoni Moda',serif;font-weight:400}.eb{font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:8pt;color:#6F6862}
.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}
.head{display:flex;justify-content:space-between;align-items:center;border-bottom:.5pt solid #141414;padding-bottom:4mm}
.foot{display:flex;justify-content:space-between;font-size:7.5pt;color:#6F6862}
h2{font-family:'Bodoni Moda',serif;font-weight:400;font-size:30pt;line-height:1}</style>`;
const MARK = `<span class="bod" style="font-size:11pt;letter-spacing:.06em">KUL<span class="o">O</span>RT <span style="opacity:.45">|</span> NYANSE</span>`;

function guide(key) {
  const s = D[key], pal = palette(s), [a, b, c] = signs(s.scales);
  const page = (n, eb, body) => `<section class="pg"><div class="head">${MARK}<span class="eb">${eb}</span></div><div style="display:grid;gap:7mm;align-content:start">${body}</div><div class="foot"><span>${s.name} · Personal colour guide</span><span>${n} / 6</span></div></section>`;
  return [
    `<section class="pg" style="grid-template-rows:auto 1fr auto"><div class="head">${MARK}<span class="eb">Personal colour guide</span></div>
      <div style="position:relative;overflow:hidden"><img src="${img(`seasons/season-${key}.jpg`)}" style="width:100%;height:100%;object-fit:cover">
        <div style="position:absolute;left:0;right:0;bottom:0;padding:10mm;background:linear-gradient(transparent,rgba(0,0,0,.55));color:#fff"><div class="eb" style="color:#fff">${s.name.split(" ").pop()}</div><div class="bod" style="font-size:52pt;line-height:.95">${s.name.replace(" ", "<br><i>")}</i></div><div class="bod" style="font-size:16pt;font-style:italic;margin-top:3mm">${LINE[key]}</div></div></div>
      <div class="foot"><span>For him and for her</span><span>1 / 6</span></div></section>`,
    page(2, "Your season", `<h2>Are you a<br><i>${s.name}?</i></h2><p style="font-size:11pt;line-height:1.6;color:#4a4540">Three signs that point to ${s.name}. Check them in daylight, without make-up, in front of a mirror.</p>
      <ol style="list-style:none;padding:0;display:grid">${[a, b, c].map(([t, d], i) => `<li style="display:grid;grid-template-columns:16mm 1fr;border-top:.5pt solid #141414;padding:6mm 0"><span class="bod" style="font-size:28pt;line-height:1">0${i + 1}</span><span><b style="font-size:13pt">${t}</b><br><span style="font-size:10.5pt;line-height:1.55;color:#4a4540">${d}</span></span></li>`).join("")}</ol>
      <p style="font-size:10.5pt"><b>Your metal:</b> ${metalEn(s.metal)}</p>`),
    page(3, "Your palette", `<h2>Your ${pal.length}<br><i>colours</i></h2><p style="font-size:10.5pt;line-height:1.6;color:#4a4540">Wear these close to your face: shirts, knits, blouses and scarves. Take the hex codes to any shop or app.</p>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3.5mm">${pal.map((c) => `<div><div style="height:24mm;background:${c.hex};box-shadow:inset 0 0 0 .3pt rgba(0,0,0,.1)"></div><div style="font-size:8pt;font-weight:700;letter-spacing:.06em;margin-top:1.5mm">${c.hex.toUpperCase()}</div></div>`).join("")}</div>`),
    page(4, "Worn", `<h2>Head to toe,<br><i>one family</i></h2><img src="${img(`outfits/${key}-both.jpg`)}" style="width:100%;height:150mm;object-fit:cover"><p style="font-size:10.5pt;line-height:1.6;color:#4a4540">Build outfits from one colour family. Your strongest colour goes near your face; calmer shades go on trousers, shoes and coats.</p>`),
    page(5, "Leave on the rack", `<h2>Leave these<br><i>on the rack</i></h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4mm">${s.avoid.map((h) => `<div style="position:relative;height:60mm;background:${h};overflow:hidden"><i style="position:absolute;left:-10%;top:50%;width:120%;height:1.5pt;background:#fff;transform:rotate(-28deg)"></i></div>`).join("")}</div>
      <p style="font-size:11pt;line-height:1.6;color:#4a4540">These shades work against your colouring: they draw attention away from your face. Love one of them? Wear it below the waist, as trousers, a skirt or shoes, where it matters less.</p>`),
    page(6, "Use it", `<h2>Shop with<br><i>confidence</i></h2><ul style="font-size:11pt;line-height:1.7;color:#333;padding-left:5mm;display:grid;gap:3mm">
      <li>Hold a garment under your chin in daylight. Does your skin look even and your eyes brighter? It's your colour.</li>
      <li>Torn between two shades? Pick the one closest to a colour on page 3.</li>
      <li>Online: compare the product photo with your palette on the same screen. Product photos are often warmer or brighter than real life.</li>
      <li>Do a wardrobe check: keep what matches your palette, wear the rest below the waist, sell or give away what you never wear.</li>
      <li>Set the phone wallpaper (included) as your lock screen and you always have your colours with you.</li></ul>
      <p style="font-size:9pt;color:#6F6862;margin-top:6mm">This guide is based on the typical colouring of ${s.name}. Everyone is a little different: if a colour from the palette doesn't feel right on you, trust the mirror.</p>`),
  ].join("");
}

const wallpaper = (key) => { const s = D[key], pal = palette(s).slice(0, 12); return `<div style="width:1170px;height:2532px;background:#F6F2EC;position:relative">
  <div style="position:absolute;top:900px;left:90px;right:90px;display:grid;gap:30px"><div class="eb" style="font-size:30px">My season</div><div class="bod" style="font-size:150px;line-height:.95">${s.name.replace(" ", "<br><i>")}</i></div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:40px">${pal.map((c) => `<i style="display:block;height:180px;background:${c.hex}"></i>`).join("")}</div></div>
  <div style="position:absolute;bottom:220px;left:0;right:0;text-align:center">${MARK.replace("11pt", "34px")}</div></div>`; };
const hero = (key) => { const s = D[key], pal = palette(s).slice(0, 8); return `<div style="width:2000px;height:1500px;background:#E9E3DA;position:relative;overflow:hidden">
  <img src="${img(`seasons/season-${key}.jpg`)}" style="position:absolute;right:0;top:0;width:1000px;height:1500px;object-fit:cover">
  <div style="position:absolute;left:110px;top:150px;width:780px;display:grid;gap:40px"><span class="eb" style="font-size:28px">Personal colour guide · digital download</span>
    <div class="bod" style="font-size:150px;line-height:.95">${s.name.replace(" ", "<br><i>")}</i></div>
    <div style="display:flex;gap:10px">${pal.map((c) => `<i style="width:80px;height:80px;border-radius:50%;background:${c.hex};display:block"></i>`).join("")}</div>
    <div style="font-size:36px;line-height:1.5">6-page PDF guide · ${palette(s).length} colours with hex codes · phone wallpaper · for him and her</div></div></div>`; };

const listing = (key) => {
  const s = D[key], n = s.name;
  const title = `${n} Colour Palette Guide, Seasonal Colour Analysis PDF, ${n} Wardrobe & Outfit Guide, Digital Download, Phone Wallpaper`.slice(0, 140);
  const tags = [`${n.toLowerCase()}`, `${n.toLowerCase()} palette`, "colour analysis", "color analysis", "seasonal color", "colour palette", "personal colours", "capsule wardrobe", "style guide pdf", "color palette card", "wardrobe guide", "digital download", `${s.name.split(" ").pop().toLowerCase()} colours`].map((t) => t.slice(0, 20));
  const desc = [
    `Your ${n} colour palette in one beautiful guide. ${LINE[key]}`,
    ``,
    `WHAT YOU GET (instant digital download)`,
    `• 6-page PDF guide (A4, prints well on Letter too)`,
    `• ${palette(s).length} colours that suit a ${n}, with hex codes`,
    `• The 3 signs of a ${n}, your metal and what to leave on the rack`,
    `• A head-to-toe outfit in your colour family, for him and for her`,
    `• A phone wallpaper with your palette, so your colours are always with you`,
    ``,
    `HOW TO USE IT`,
    `Hold a garment under your chin in daylight and compare it with your palette. Shop online with the hex codes. Do a quick wardrobe check: keep, wear below the waist, or let go.`,
    ``,
    `GOOD TO KNOW`,
    `• This is a digital file: nothing is shipped.`,
    `• Not sure of your season? Look at our other season guides in the shop.`,
    `• Colours may look slightly different on screen and in print.`,
    ``,
    `KULØRT · NYANSE: personal colour, made simple.`,
    ``,
    // Etsy's creativity standards ask sellers to disclose AI help; this line covers the product photos
    `Designed by KULØRT · NYANSE. Product photos were created with the help of AI tools.`,
  ].join("\n");
  return `## ${n}\n\n**Titel:** ${title}\n\n**Prijs (advies):** €6,95\n\n**Tags (13):** ${tags.join(", ")}\n\n**Bestanden:** \`assets/etsy/${key}/guide.pdf\`, \`assets/etsy/${key}/wallpaper.png\`\n\n**Hoofdbeeld:** \`assets/etsy/${key}/listing-1.jpg\`\n\n**Beschrijving:**\n\n\`\`\`\n${desc}\n\`\`\`\n`;
};

const b = await chromium.launch();
const p = await b.newPage();
let md = `# Etsy-listings: 12 seizoensgidsen\n\n*Gemaakt met \`node scripts/make-etsy.mjs\`. Instructies: docs/marketing/ETSY.md.*\n\n`;
for (const key of ORDER) {
  const dir = `${OUT}/${key}`;
  mkdirSync(dir, { recursive: true });
  await p.setContent(`<!doctype html><meta charset="utf-8">${CSS}<body>${guide(key)}</body>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: `${dir}/guide.pdf`, format: "A4", printBackground: true });
  await p.setViewportSize({ width: 1170, height: 2532 });
  await p.setContent(`<!doctype html><meta charset="utf-8">${CSS}<body>${wallpaper(key)}</body>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${dir}/wallpaper.png` });
  await p.setViewportSize({ width: 2000, height: 1500 });
  await p.setContent(`<!doctype html><meta charset="utf-8">${CSS}<body>${hero(key)}</body>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${dir}/listing-1.jpg`, type: "jpeg", quality: 90 });
  md += listing(key) + "\n";
  console.log("wrote", dir);
}
await b.close();
writeFileSync(`${OUT}/listings.md`, md);
console.log("wrote", `${OUT}/listings.md`);
