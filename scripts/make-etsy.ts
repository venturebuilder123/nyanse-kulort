// Etsy: four packages per season (founder, 19 Oct 2026: "small, medium, large, full"), in English,
// priced in euros. All content comes from the colour engine (lib/guide/build.ts) at the season's
// centre, for her (NYANSE) and for him (KULØRT), with recoloured garment photos.
//   1-palette-card   palette sheet + wallet cards, phone wallpaper
//   2-colour-guide   8-page colour guide + the palette card and wallpaper
//   3-style-guide    colour guide + looks, capsule, first buys and accessories for her and him
//   4-complete       style guide + make-up, printable colour fan, workbook, 3 wallpapers
// Etsy delivers the same files for every variation of a listing, so each package is its own
// listing. No links to our site in the files (Etsy does not want buyers sent elsewhere).
// Run: npx tsx scripts/make-etsy.ts [seasonKey]  →  assets/etsy/{season}/{package}/… + assets/etsy/listings.md
import { chromium, type Page } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import GARMENTS from "@/lib/brand/garments.json";
import HEROES from "@/lib/brand/heroes.json";
import { createRequire } from "node:module";
import { colorName, nameForHex, paletteFor } from "@/lib/color/palette";
import { colorNameEn } from "@/lib/color/names-en";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import type { Guide, Swatch } from "@/lib/guide/build";
import { accessoriesEn, item, sw, t } from "./etsy/en";
import { seasonGuide } from "./etsy/guides";
import EFFECTS from "@/lib/social/effect-posts.json";

// local ffmpeg for the listing videos (npm install --no-save ffmpeg-static; not in package.json on purpose)
const FFMPEG: string = createRequire(import.meta.url)("ffmpeg-static");

const OUT = "assets/etsy";
const ORDER: SeasonKey[] = ["softAutumn", "deepWinter", "softSummer", "lightSpring", "warmAutumn", "coolWinter", "lightSummer", "brightSpring", "deepAutumn", "coolSummer", "warmSpring", "brightWinter"];
const ONLY = process.argv[2] as SeasonKey | undefined;
const A = "https://etsy.local"; // every asset is served from public/ under this origin (see route below)

type Brand = "nyanse" | "kulort";
type Tier = { id: string; no: number; name: string; price: string; short: string };
const TIERS: Tier[] = [
  { id: "1-palette-card", no: 1, name: "Palette Card", price: "3,95", short: "palette sheet, wallet cards, wallpaper" },
  { id: "2-colour-guide", no: 2, name: "Colour Guide", price: "7,95", short: "the colour guide + palette card" },
  { id: "3-style-guide", no: 3, name: "Style Guide", price: "12,95", short: "colour guide + outfits, capsule and accessories for her and him" },
  { id: "4-complete", no: 4, name: "Complete Collection", price: "19,95", short: "everything + make-up, colour fan, workbook, 3 wallpapers" },
];

const LINE: Record<SeasonKey, string> = {
  lightSpring: "Light as a spring morning.", warmSpring: "Warm, sunny, full of life.", brightSpring: "Clear, warm and unforgettable.",
  lightSummer: "Light, cool and effortless.", coolSummer: "Cool, calm and refined.", softSummer: "Soft, cool and elegant.",
  softAutumn: "Warm and soft, like an autumn afternoon.", warmAutumn: "Rich, warm and spiced.", deepAutumn: "Deep, warm and powerful.",
  deepWinter: "Deep, cool and striking.", coolWinter: "Cool, clear and sharp.", brightWinter: "Clear, cool and full of contrast.",
};
function signs(key: SeasonKey): [string, string][] {
  const { undertone: u, depth: d, clarity: c } = SEASONS[key].centre;
  return [
    u < -0.15 ? ["Silver over gold", "Cool metals and icy whites make your skin look fresh. Gold can look a little yellow on you."] : u > 0.15 ? ["Gold over silver", "Warm metals and creamy whites make your skin glow. Stark white can look harsh on you."] : ["Both metals work", "You sit close to neutral. Rose gold and soft whites are your safe bet."],
    d > 0.65 ? ["Deep colours carry you", "Dark, rich shades look natural on you. Pastels fade away next to your face."] : d < 0.3 ? ["Light is your strength", "Light and mid tones make you glow. Black and very dark shades feel heavy."] : ["Mid tones are your base", "Not too light, not too dark. Keep the extremes for small details."],
    c > 0.6 ? ["Clear beats muted", "Pure, vivid colours match the clarity of your eyes. Dusty shades make you look tired."] : c < 0.35 ? ["Muted beats bright", "Soft, slightly greyed shades look polished on you. Neon overpowers your face."] : ["Rich, not loud", "Colours with depth work best: not neon, not dusty."],
  ];
}

// ---------- per-season data in English ----------
type Look = { title: string; tip: string; pieces: { item: string; nl: string; color: Swatch }[] };
type Side = { brand: Brand; looks: Look[]; capsule: { item: string; nl: string; color: Swatch }[]; firstBuys: { item: string; nl: string; color: Swatch; why: string }[]; accessories: ReturnType<typeof accessoriesEn>; makeup?: { title: string; text: string; swatches: Swatch[] }[] };
type Season = {
  key: SeasonKey; name: string; family: string; palette: Swatch[]; avoid: Swatch[];
  groups: { title: string; text: string; colors: Swatch[] }[]; basics: { title: string; text: string; color: Swatch }[];
  swaps: { avoid: Swatch; instead: Swatch; reason: string }[]; contrast: { title: string; text: string }; rules: string[];
  metals: Swatch[]; leather: Swatch[]; metal: string; leatherText: string; shopping: string[]; audit: string[]; her: Side; him: Side;
};
function side(g: Guide, brand: Brand): Side {
  const men = brand === "kulort";
  return {
    brand,
    looks: g.combos.map((c) => ({ title: t(c.title), tip: t(c.tip), pieces: [...c.pieces, ...c.extras].map((p) => ({ item: item(p.item), nl: p.item, color: sw(p.color) })) })),
    capsule: g.capsule.map((c) => ({ item: item(c.item), nl: c.item, color: sw(c.color) })),
    firstBuys: g.firstBuys.map((f) => ({ item: item(f.item), nl: f.item, color: sw(f.color), why: t(f.why) })),
    accessories: accessoriesEn(g, men),
    makeup: g.makeup?.map((m) => ({ title: t(m.title), text: t(m.text), swatches: m.swatches.map(sw) })),
  };
}
function season(key: SeasonKey): Season {
  const her = seasonGuide(key, "nyanse"), him = seasonGuide(key, "kulort");
  const pal = paletteFor(SEASONS[key].centre, "nyanse", 30);
  const acc = accessoriesEn(her, false);
  return {
    key, name: SEASONS[key].name, family: SEASONS[key].name.split(" ").pop()!,
    palette: pal.colors.slice(0, 24).map((c) => ({ name: colorNameEn(colorName(c, "nyanse")), hex: c.hex })),
    avoid: her.avoid.map((a) => sw(a.color)),
    groups: her.groups.map((g) => ({ title: t(g.title), text: t(g.text), colors: g.colors.map(sw) })),
    basics: her.basics.map((b) => ({ title: t(b.title), text: t(b.text), color: sw(b.color) })),
    swaps: her.swaps.map((s) => ({ avoid: sw(s.avoid), instead: sw(s.instead), reason: t(s.reason) })),
    contrast: { title: t(her.contrast.title), text: t(her.contrast.text) },
    rules: her.summary.rules.map(t),
    metals: acc[0]!.swatches, leather: acc[1]!.swatches,
    metal: colorNameEn(her.summary.metal), leatherText: colorNameEn(her.summary.leather),
    shopping: her.shopping.map(t), audit: her.audit.map(t),
    her: side(her, "nyanse"), him: side(him, "kulort"),
  };
}

// ---------- garments (recoloured photo sprites, as on the site: app/(flow)/Flats.tsx) ----------
type Sprite = { src: string; w: number; h: number };
const SPRITES = GARMENTS as Record<Brand, Record<string, Sprite>>;
function spriteFor(nl: string, brand: Brand): Sprite | undefined {
  const k = nl.toLowerCase();
  const key = k.includes("colbert") || k.includes("blazer") ? "blazer" : k.includes("overshirt") ? "overshirt" : k.includes("chino") ? "pants"
    : k.includes("pantalon") ? "wide" : k.includes("jeans") ? "jeans" : k.includes("overhemd") ? "shirt" : k.includes("blouse") ? "blouse"
    : k.includes("trui") ? "knit" : k.includes("sneaker") ? "sneaker" : k.includes("schoen") ? "shoe" : k.includes("riem") ? "belt"
    : k.includes("tas") ? "bag" : k.includes("sjaal") ? "scarf" : k.includes("rok") ? "skirt" : k.includes("longsleeve") ? "top" : k === "top" ? "tee" : "";
  return SPRITES[brand]?.[key];
}
// The live recolouring (mask + blend modes) prints as huge rasters in a PDF (21 MB, over Etsy's
// 20 MB), so every garment is rendered once to a small JPEG on the page colour and reused.
const garmentLive = (s: Sprite, hex: string, hPx: number) => { const u = `${A}${s.src}`; return `<span class="garment" style="height:${hPx}px;aspect-ratio:${s.w}/${s.h}"><span class="garment-fill" style="background:${hex};-webkit-mask-image:url(${u});mask-image:url(${u})"></span><img class="garment-shade" src="${u}"><img class="garment-fold" src="${u}"></span>`; };
const RASTER = new Map<string, string>();
const rkey = (s: Sprite, hex: string) => `${s.src}|${hex}`;
const garment = (nl: string, brand: Brand, hex: string, h: number) => {
  const s = spriteFor(nl, brand);
  const src = s && RASTER.get(rkey(s, hex));
  if (!src) return `<span style="display:block;height:${h * 0.8}mm;width:${h * 0.6}mm;margin:0 auto;background:${hex};border-radius:2mm"></span>`;
  return `<img src="${src}" style="display:block;height:${h}mm;max-width:100%;object-fit:contain;margin:0 auto">`;
};

// ---------- page kit ----------
const FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..500;1,6..96,400&family=Manrope:wght@500;700;800&display=block";
const CSS = `<link rel="stylesheet" href="${FONTS}"><style>@page{size:A4;margin:0}*{box-sizing:border-box;margin:0}
body{font-family:Manrope,sans-serif;color:#141414;background:#F6F2EC;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:210mm;height:297mm;padding:16mm 16mm 12mm;background:#F6F2EC;display:grid;grid-template-rows:auto 1fr auto;gap:7mm;break-after:page;position:relative;overflow:hidden}
.bod{font-family:'Bodoni Moda',serif;font-weight:400}.eb{font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:7.5pt;color:#6F6862}
.o{position:relative;display:inline-block}.o::after{content:"";position:absolute;left:-18%;right:-18%;top:50%;height:.055em;margin-top:-.03em;background:currentColor;transform:rotate(-62deg)}
.head{display:flex;justify-content:space-between;align-items:center;border-bottom:.5pt solid #141414;padding-bottom:3.5mm}
.foot{display:flex;justify-content:space-between;font-size:7pt;color:#6F6862}
h2{font-family:'Bodoni Moda',serif;font-weight:400;font-size:28pt;line-height:1}
p.lead{font-size:10pt;line-height:1.6;color:#4a4540}
.sw{box-shadow:inset 0 0 0 .3pt rgba(0,0,0,.12)}
.lbl{font-size:7.5pt;font-weight:700;letter-spacing:.04em;margin-top:1.2mm}.hex{font-size:6.5pt;color:#6F6862;letter-spacing:.06em}
.garment{position:relative;display:block;isolation:isolate;margin:0 auto}
.garment-fill{position:absolute;inset:0;-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
.garment-shade,.garment-fold{position:absolute;inset:0;width:100%;height:100%}
.garment-shade{mix-blend-mode:soft-light}.garment-fold{mix-blend-mode:multiply;filter:brightness(1.9) contrast(1.15);opacity:.6}
.dot{display:inline-block;width:3mm;height:3mm;border-radius:50%;vertical-align:-.4mm;margin-right:1.5mm;box-shadow:inset 0 0 0 .3pt rgba(0,0,0,.15)}
.box{display:inline-block;width:3.6mm;height:3.6mm;border:.6pt solid #141414;border-radius:.6mm;vertical-align:-.6mm}
.cut{border:.5pt dashed #9a938c}</style>`;
const MARK = (size = "10.5pt", color = "#141414") => `<span class="bod" style="font-size:${size};letter-spacing:.06em;color:${color}">KUL<span class="o">O</span>RT <span style="opacity:.45">|</span> NYANSE</span>`;
const img = (p: string) => `${A}/brand/${p}`;
const chip = (s: Swatch, h = 22) => `<div><div class="sw" style="height:${h}mm;background:${s.hex}"></div><div class="lbl">${s.name}</div><div class="hex">${s.hex.toUpperCase()}</div></div>`;
const crossed = (hex: string, h: number) => `<div class="sw" style="position:relative;height:${h}mm;background:${hex};overflow:hidden"><i style="position:absolute;left:-10%;top:50%;width:120%;height:1.4pt;background:#fff;transform:rotate(-24deg)"></i></div>`;

type P = { eb: string; body: string } | { raw: (n: number, total: number) => string };
function render(pages: P[], label: string): string {
  return pages.map((pg, i) => ("raw" in pg ? pg.raw(i + 1, pages.length)
    : `<section class="pg"><div class="head">${MARK()}<span class="eb">${pg.eb}</span></div><div style="display:grid;gap:6mm;align-content:start;min-height:0">${pg.body}</div><div class="foot"><span>${label}</span><span>${i + 1} / ${pages.length}</span></div></section>`)).join("");
}

// ---------- pages ----------
const cover = (s: Season, tier: Tier, photo: string): P => ({ raw: (n, total) => `<section class="pg" style="grid-template-rows:auto 1fr auto"><div class="head">${MARK()}<span class="eb">${tier.name}</span></div>
  <div style="position:relative;overflow:hidden"><img src="${photo}" style="width:100%;height:100%;object-fit:cover">
    <div style="position:absolute;left:0;right:0;bottom:0;padding:10mm;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff"><div class="eb" style="color:#fff">${tier.name} · for her and for him</div><div class="bod" style="font-size:54pt;line-height:.95;margin-top:2mm">${s.name.replace(" ", "<br><i>")}</i></div><div class="bod" style="font-size:15pt;font-style:italic;margin-top:3mm">${LINE[s.key]}</div></div></div>
  <div class="foot"><span>${s.name} · ${tier.name}</span><span>${n} / ${total}</span></div></section>` });

const signsPage = (s: Season): P => ({ eb: "Your season", body: `<h2>Are you a<br><i>${s.name}?</i></h2><p class="lead">Three signs that point to ${s.name}. Check them in daylight, without make-up, in front of a mirror.</p>
  <ol style="list-style:none;padding:0;display:grid">${signs(s.key).map(([a, d], i) => `<li style="display:grid;grid-template-columns:16mm 1fr;border-top:.5pt solid #141414;padding:6mm 0"><span class="bod" style="font-size:28pt;line-height:1">0${i + 1}</span><span><b style="font-size:12.5pt">${a}</b><br><span style="font-size:10pt;line-height:1.55;color:#4a4540">${d}</span></span></li>`).join("")}</ol>
  <p style="font-size:10pt"><b>Your metal:</b> ${s.metal} &nbsp;·&nbsp; <b>Your leather:</b> ${s.leatherText}</p>` });

const palettePage = (s: Season): P => ({ eb: "Your palette", body: `<h2>Your ${s.palette.length}<br><i>colours</i></h2><p class="lead">Wear these close to your face: shirts, knits, blouses and scarves. The hex codes work in any shop filter or app.</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm 3.5mm">${s.palette.map((c) => chip(c, 20)).join("")}</div>` });

const groupsPage = (s: Season): P => ({ eb: "Build with it", body: `<h2>Three groups,<br><i>one wardrobe</i></h2><p class="lead">Every outfit uses the three groups: a dark base, a quiet neutral and one accent near your face.</p>
  ${s.groups.map((g) => `<div style="display:grid;gap:3mm;border-top:.5pt solid #141414;padding-top:4mm"><div><b style="font-size:12pt">${g.title}</b> <span style="font-size:9.5pt;color:#4a4540">· ${g.text}</span></div>
    <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:2.5mm">${g.colors.slice(0, 16).map((c) => `<div><div class="sw" style="height:13mm;background:${c.hex}"></div><div style="font-size:6.5pt;font-weight:700;margin-top:1mm;line-height:1.2">${c.name}</div></div>`).join("")}</div></div>`).join("")}` });

const basicsPage = (s: Season): P => ({ eb: "The basics", body: `<h2>Your white, your dark,<br><i>your denim</i></h2><p class="lead">The pieces everyone buys most. Get these three right and half your wardrobe works.</p>
  ${s.basics.map((b) => `<div style="display:grid;grid-template-columns:62mm 1fr;gap:8mm;align-items:center;border-top:.5pt solid #141414;padding-top:6mm"><div class="sw" style="height:58mm;background:${b.color.hex}"></div><div><div class="eb">${b.title}</div><div class="bod" style="font-size:20pt;margin:1.5mm 0 2.5mm">${b.color.name}</div><p style="font-size:10pt;line-height:1.55;color:#4a4540">${b.text}</p></div></div>`).join("")}` });

const swapsPage = (s: Season): P => ({ eb: "Leave on the rack", body: `<h2>Not this,<br><i>but this</i></h2><p class="lead">These shades work against your colouring. Each one has a colour from your palette that gives the same effect, and does flatter you.</p>
  ${s.swaps.map((w) => `<div style="display:grid;grid-template-columns:44mm 10mm 44mm 1fr;gap:4mm;align-items:center;border-top:.5pt solid #141414;padding-top:4mm">
    <div>${crossed(w.avoid.hex, 29)}<div class="lbl">${w.avoid.name}</div></div><div class="bod" style="font-size:22pt;text-align:center">→</div>
    <div><div class="sw" style="height:29mm;background:${w.instead.hex}"></div><div class="lbl">${w.instead.name}</div></div>
    <p style="font-size:9.5pt;line-height:1.5;color:#4a4540">${w.avoid.name}: ${w.reason}. Choose ${w.instead.name.toLowerCase()} instead.</p></div>`).join("")}
  <p style="font-size:9.5pt;color:#4a4540">Love one of them anyway? Wear it below the waist, where it matters less.</p>` });

const metalPage = (s: Season): P => ({ eb: "Finishing touches", body: `<h2>Metal, leather<br><i>and contrast</i></h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm"><div><div class="eb">Your metals</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin-top:3mm">${s.metals.map((c) => chip(c, 30)).join("")}</div></div>
  <div><div class="eb">Your leather</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:3mm;margin-top:3mm">${s.leather.map((c) => chip(c, 30)).join("")}</div></div></div>
  <div style="border-top:.5pt solid #141414;padding-top:5mm"><div class="bod" style="font-size:20pt">${s.contrast.title}</div><p class="lead" style="margin-top:2mm">${s.contrast.text}</p></div>
  <div style="border-top:.5pt solid #141414;padding-top:5mm"><div class="eb">Your three rules</div><ol style="list-style:none;padding:0;display:grid;gap:3mm;margin-top:3mm">${s.rules.map((r, i) => `<li style="display:grid;grid-template-columns:12mm 1fr;align-items:baseline"><span class="bod" style="font-size:20pt">0${i + 1}</span><span style="font-size:11pt">${r}</span></li>`).join("")}</ol></div>` });

const usePage = (s: Season): P => ({ eb: "Use it", body: `<h2>Shop with<br><i>confidence</i></h2>
  <ul style="font-size:11pt;line-height:1.65;color:#333;padding-left:5mm;display:grid;gap:3.5mm">${s.shopping.map((x) => `<li>${x}</li>`).join("")}</ul>
  <div style="border-top:.5pt solid #141414;padding-top:5mm"><div class="eb">The 10-minute wardrobe check</div><ol style="font-size:11pt;line-height:1.65;color:#333;padding-left:5mm;display:grid;gap:3mm;margin-top:3mm">${s.audit.map((x) => `<li>${x}</li>`).join("")}</ol></div>
  <p style="font-size:8.5pt;color:#6F6862">This guide follows the typical colouring of a ${s.name}. Everyone is a little different: if a colour doesn't feel right on you, trust the mirror.</p>` });

const glancePage = (s: Season): P => ({ eb: "At a glance", body: `<h2>${s.name}<br><i>on one page</i></h2><p class="lead">Print this page and pin it inside your wardrobe door.</p>
  <div><div class="eb">Your core colours</div><div style="display:grid;grid-template-columns:repeat(8,1fr);gap:2.5mm;margin-top:3mm">${s.palette.slice(0, 8).map((c) => `<div><div class="sw" style="height:20mm;background:${c.hex}"></div><div style="font-size:6.5pt;font-weight:700;margin-top:1mm">${c.name}</div></div>`).join("")}</div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm">
    <div><div class="eb">Your basics</div><div style="display:grid;gap:2.5mm;margin-top:3mm">${s.basics.map((b) => `<div style="font-size:10pt"><i class="dot" style="background:${b.color.hex};width:5mm;height:5mm"></i><b>${b.title}:</b> ${b.color.name}</div>`).join("")}</div></div>
    <div><div class="eb">Leave on the rack</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:2.5mm;margin-top:3mm">${s.avoid.map((c) => `<div>${crossed(c.hex, 12)}<div style="font-size:6.5pt;font-weight:700;margin-top:1mm">${c.name}</div></div>`).join("")}</div></div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm;font-size:10pt"><div><b>Metal:</b> ${s.metal}</div><div><b>Leather:</b> ${s.leatherText}</div></div>
  <div style="border-top:.5pt solid #141414;padding-top:4mm"><div class="eb">Your rules</div><ol style="font-size:10.5pt;line-height:1.7;padding-left:5mm;margin-top:2mm">${s.rules.map((r) => `<li>${r}</li>`).join("")}<li>${s.contrast.title}.</li></ol></div>` });

// style pages per side (her / him)
const who = (b: Brand) => (b === "nyanse" ? "her" : "him");
// with a Gemini portrait of this season: the model on the left, the colours of the looks on the right
const divider = (s: Season, b: Brand): P => (HEROES as string[]).includes(`${s.key}-${b}`) ? heroDivider(s, b) : flatDivider(s, b);
const heroDivider = (s: Season, b: Brand): P => {
  const side = b === "nyanse" ? s.her : s.him;
  const colours = side.looks.flatMap((l) => l.pieces.map((p) => p.color)).filter((c, i, a) => a.findIndex((x) => x.hex === c.hex) === i).slice(0, 8);
  return { raw: (n, total) => `<section class="pg" style="grid-template-rows:auto 1fr auto"><div class="head">${MARK()}<span class="eb">${s.name} · style</span></div>
  <div style="display:grid;grid-template-columns:96mm 1fr;gap:9mm;min-height:0"><img src="${A}/brand/heroes/${s.key}-${b}.jpg" style="width:100%;height:100%;object-fit:cover;object-position:50% 45%;min-height:0">
    <div style="display:grid;align-content:end;gap:6mm;padding-bottom:4mm"><div class="eb">${s.name}</div><div class="bod" style="font-size:58pt;line-height:.92">For <i>${who(b)}</i></div>
      <p class="lead">One colour family from head to toe, with the strongest shade close to the face. On the next pages: four looks, a capsule of twelve pieces, your first five buys and the details that finish it.</p>
      <div><div class="eb">The colours of these looks</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3mm;margin-top:3mm">${colours.map((c) => `<div><div class="sw" style="height:14mm;background:${c.hex}"></div><div style="font-size:7pt;font-weight:700;margin-top:1mm">${c.name}</div></div>`).join("")}</div></div></div></div>
  <div class="foot"><span>${s.name} · for ${who(b)}</span><span>${n} / ${total}</span></div></section>` };
};
const flatDivider = (s: Season, b: Brand): P => ({ raw: (n, total) => `<section class="pg" style="grid-template-rows:1fr auto;padding:0"><div style="position:relative;overflow:hidden"><img src="${img(`outfits/${s.key}-${b}.jpg`)}" style="width:100%;height:100%;object-fit:cover">
  <div style="position:absolute;left:0;right:0;bottom:0;padding:14mm 16mm;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff"><div class="eb" style="color:#fff">${s.name} · style</div><div class="bod" style="font-size:60pt;line-height:.95">For <i>${who(b)}</i></div></div></div>
  <div class="foot" style="padding:4mm 16mm 9mm"><span>${s.name} · for ${who(b)}</span><span>${n} / ${total}</span></div></section>` });
const lookBlock = (l: Look, b: Brand) => `<div style="border-top:.5pt solid #141414;padding-top:4mm;display:grid;gap:4mm"><div style="display:grid;grid-template-columns:auto 1fr;gap:8mm;align-items:baseline"><span class="bod" style="font-size:22pt">${l.title}</span><span style="font-size:9pt;color:#4a4540;text-align:right">${l.tip}</span></div>
  <div style="display:grid;grid-template-columns:repeat(${l.pieces.length},minmax(0,1fr));gap:5mm;align-items:end">${l.pieces.map((p) => `<div style="display:grid;gap:2mm;justify-items:center">${garment(p.nl, b, p.color.hex, 56)}<div style="font-size:8.5pt;text-align:center"><b>${p.item}</b><br><i class="dot" style="background:${p.color.hex}"></i>${p.color.name}</div></div>`).join("")}</div></div>`;
const looksPages = (s: Season, side: Side): P[] => [0, 2].map((i) => ({ eb: `Looks for ${who(side.brand)}`, body: `<h2>${i === 0 ? "Four looks," : "Dressed up,"}<br><i>${i === 0 ? "one colour family" : "still you"}</i></h2>${side.looks.slice(i, i + 2).map((l) => lookBlock(l, side.brand)).join("")}` }));
/** every garment a side shows, so they can be rendered before the pages */
const garmentsOf = (side: Side) => [...side.looks.flatMap((l) => l.pieces), ...side.capsule, ...side.firstBuys].map((x) => ({ nl: x.nl, hex: x.color.hex, brand: side.brand }));
const capsulePage = (s: Season, side: Side): P => ({ eb: `Capsule for ${who(side.brand)}`, body: `<h2>Twelve pieces,<br><i>endless outfits</i></h2><p class="lead">Every piece combines with every other piece. Build it slowly: one piece at a time, in this order of colours.</p>
  <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5mm 4mm;align-items:end">${side.capsule.map((c) => `<div style="display:grid;gap:1.5mm;justify-items:center">${garment(c.nl, side.brand, c.color.hex, 36)}<div style="font-size:8pt;text-align:center"><b>${c.item}</b><br><i class="dot" style="background:${c.color.hex}"></i>${c.color.name}</div></div>`).join("")}</div>` });
const buysPage = (s: Season, side: Side): P => ({ eb: `First buys for ${who(side.brand)}`, body: `<h2>Your first<br><i>five buys</i></h2><p class="lead">In order of impact: the pieces near your face first, then the anchors.</p>
  ${side.firstBuys.map((f, i) => `<div style="display:grid;grid-template-columns:14mm 42mm 1fr;gap:5mm;align-items:center;border-top:.5pt solid #141414;padding-top:3.5mm"><span class="bod" style="font-size:26pt">0${i + 1}</span>${garment(f.nl, side.brand, f.color.hex, 32)}<div><b style="font-size:12pt">${f.item}</b> <span style="font-size:10pt">· <i class="dot" style="background:${f.color.hex}"></i>${f.color.name}</span><p style="font-size:9.5pt;color:#4a4540;margin-top:1mm">${f.why}</p></div></div>`).join("")}` });
const accPage = (s: Season, side: Side): P => ({ eb: `Accessories for ${who(side.brand)}`, body: `<h2>The details<br><i>that finish it</i></h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6mm">${side.accessories.map((a) => `<div style="border-top:.5pt solid #141414;padding-top:4mm;display:grid;gap:3mm"><b style="font-size:12pt">${a.title}</b><div style="display:flex;gap:2.5mm">${a.swatches.map((c) => `<div style="flex:1"><div class="sw" style="height:42mm;background:${c.hex}"></div><div style="font-size:7pt;font-weight:700;margin-top:1mm">${c.name}</div></div>`).join("")}</div><p style="font-size:9.5pt;line-height:1.5;color:#4a4540">${a.text}</p></div>`).join("")}</div>` });
const makeupPage = (s: Season): P => ({ eb: "Make-up", body: `<h2>Make-up<br><i>in your colours</i></h2><p class="lead">The same logic as your clothes: harmony with your undertone and your contrast. Hold the product next to your palette card in daylight.</p>
  ${s.her.makeup!.map((m) => `<div style="display:grid;grid-template-columns:70mm 1fr;gap:7mm;align-items:center;border-top:.5pt solid #141414;padding-top:5mm"><div style="display:flex;gap:2.5mm">${m.swatches.map((c) => `<div style="flex:1"><div class="sw" style="height:34mm;background:${c.hex};border-radius:${m.title === "Lips" ? "17mm 17mm 3mm 3mm" : "2mm"}"></div><div class="lbl">${c.name}</div></div>`).join("")}</div><div><div class="bod" style="font-size:22pt">${m.title}</div><p style="font-size:10pt;line-height:1.55;color:#4a4540;margin-top:2mm">${m.text}</p></div></div>`).join("")}` });
const styleSide = (s: Season, side: Side, complete: boolean): P[] => [divider(s, side.brand), ...looksPages(s, side), capsulePage(s, side), buysPage(s, side), accPage(s, side), ...(complete && side.makeup ? [makeupPage(s)] : [])];

// palette card + wallet cards
const sheetPage = (s: Season): P => ({ eb: "Palette card", body: `<h2>${s.name}<br><i>palette</i></h2><p class="lead">Your ${s.palette.length} colours with their names and hex codes. Keep it on your phone, or print it and take it shopping.</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm 3.5mm">${s.palette.map((c) => chip(c, 20)).join("")}</div>` });
const walletFront = (s: Season) => `<div class="cut" style="width:85.6mm;height:54mm;background:#F6F2EC;padding:4mm;display:grid;grid-template-rows:auto 1fr auto;gap:2mm"><div style="display:flex;justify-content:space-between;align-items:center">${MARK("6.5pt")}<span class="eb" style="font-size:5pt">My season</span></div><div class="bod" style="font-size:15pt;line-height:1">${s.name}</div><div style="display:grid;grid-template-columns:repeat(8,1fr);height:15mm">${s.palette.slice(0, 8).map((c) => `<i style="background:${c.hex}"></i>`).join("")}</div></div>`;
const walletBack = (s: Season) => `<div class="cut" style="width:85.6mm;height:54mm;background:#fff;padding:4mm;display:grid;gap:1.6mm;font-size:6.5pt;align-content:start"><b style="font-size:7pt;letter-spacing:.14em;text-transform:uppercase">Quick check</b><div><b>Metal:</b> ${s.metal}</div><div><b>Leather:</b> ${s.leatherText}</div>${s.basics.map((b) => `<div><i class="dot" style="background:${b.color.hex};width:2.4mm;height:2.4mm"></i><b>${b.title}:</b> ${b.color.name}</div>`).join("")}<div style="display:flex;gap:1.2mm;align-items:center"><b>Skip:</b>${s.avoid.slice(0, 4).map((c) => `<i style="display:block;width:6mm;height:4mm;background:${c.hex};position:relative;overflow:hidden"><i style="position:absolute;left:-10%;top:50%;width:120%;height:.6pt;background:#fff;transform:rotate(-24deg)"></i></i>`).join("")}</div></div>`;
const walletPage = (s: Season): P => ({ eb: "Wallet cards", body: `<h2>Cut out,<br><i>keep in your wallet</i></h2><p class="lead">Print at 100% (actual size) on thick paper. Cut along the dashed lines, glue front to back, or laminate them. Two sets, one to share.</p>
  <div style="display:grid;grid-template-columns:auto auto;gap:6mm 8mm;justify-content:center">${[0, 1].map(() => walletFront(s) + walletBack(s)).join("")}</div>
  <p style="font-size:8.5pt;color:#6F6862">Printed colours vary with every printer and paper. Use the card as a guide and trust daylight and the mirror.</p>` });

// colour fan (complete): 6 strips of 4 colours, plus an avoid strip and a metal/leather strip
const strip = (title: string, colors: Swatch[], avoid = false) => `<div class="cut" style="width:28mm;height:212mm;background:#fff;display:grid;grid-template-rows:18mm repeat(${colors.length},1fr);overflow:hidden">
  <div style="display:grid;justify-items:center;align-content:center;gap:1.5mm"><i style="width:5mm;height:5mm;border-radius:50%;border:.6pt solid #9a938c;display:block"></i><span style="font-size:5.5pt;font-weight:800;letter-spacing:.12em;text-transform:uppercase;text-align:center;line-height:1.25">${title}</span></div>
  ${colors.map((c) => `<div style="position:relative;background:${c.hex}">${avoid ? `<i style="position:absolute;left:-10%;top:45%;width:120%;height:1pt;background:#fff;transform:rotate(-50deg)"></i>` : ""}<div style="position:absolute;left:0;right:0;bottom:0;background:#fff;padding:1.2mm 1.5mm;font-size:6pt;line-height:1.25"><b>${c.name}</b><br><span style="color:#6F6862">${c.hex.toUpperCase()}</span></div></div>`).join("")}</div>`;
function fanPages(s: Season): P[] {
  const strips = [0, 1, 2, 3, 4, 5].map((i) => strip(s.name, s.palette.slice(i * 4, i * 4 + 4)));
  return [
    { eb: "Colour fan · sheet 1", body: `<div style="display:flex;gap:2mm;justify-content:center">${strips.join("")}</div>` },
    { eb: "Colour fan · sheet 2", body: `<div style="display:grid;grid-template-columns:auto 1fr;gap:10mm"><div style="display:flex;gap:2mm">${strip("Leave on the rack", s.avoid, true)}${strip("Metal & leather", [...s.metals.slice(0, 2), ...s.leather.slice(0, 2)])}</div>
      <div style="display:grid;gap:4mm;align-content:start"><h2>Your colour<br><i>fan</i></h2><ol style="font-size:10pt;line-height:1.6;color:#333;padding-left:5mm;display:grid;gap:2mm"><li>Print both sheets at 100% (actual size) on thick matte paper or card.</li><li>Cut along the dashed lines.</li><li>Punch the circle at the top of each strip.</li><li>Stack the strips and join them with a binder ring or a split pin.</li><li>Take it shopping: fan it open next to a garment, in daylight.</li></ol><p style="font-size:8.5pt;color:#6F6862">Every printer shows colours a little differently. Your fan is a guide: daylight and the mirror have the final say.</p></div></div>` },
  ];
}

// workbook (complete)
function workbookPages(s: Season): P[] {
  const line = `<div style="border-bottom:.5pt solid #c9c2ba;height:8.5mm"></div>`;
  const check = (side: Side) => ({ eb: `Capsule checklist · for ${who(side.brand)}`, body: `<h2>Capsule for ${who(side.brand)}:<br><i>have it, need it</i></h2>
    <div style="display:grid;grid-template-columns:1fr 18mm 18mm;font-size:8pt;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6F6862"><span>Piece</span><span>Have</span><span>Buy</span></div>
    ${side.capsule.map((c) => `<div style="display:grid;grid-template-columns:1fr 18mm 18mm;align-items:center;border-top:.5pt solid #c9c2ba;padding:2.6mm 0;font-size:10.5pt"><span><i class="dot" style="background:${c.color.hex};width:5mm;height:5mm"></i><b>${c.item}</b> · ${c.color.name}</span><span><i class="box"></i></span><span><i class="box"></i></span></div>`).join("")}` });
  return [
    { eb: "Workbook · wardrobe check", body: `<h2>Wardrobe<br><i>check</i></h2><p class="lead">${s.audit.join(" ")}</p>
      <div style="display:grid;grid-template-columns:1fr 34mm 16mm 16mm 16mm;font-size:7pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6F6862"><span>Piece</span><span>Colour</span><span>Keep</span><span>Below waist</span><span>Let go</span></div>
      ${Array.from({ length: 11 }, () => `<div style="display:grid;grid-template-columns:1fr 34mm 16mm 16mm 16mm;align-items:end;border-bottom:.5pt solid #c9c2ba;height:9mm"><span></span><span></span><span><i class="box"></i></span><span><i class="box"></i></span><span><i class="box"></i></span></div>`).join("")}` },
    check(s.her), check(s.him),
    { eb: "Workbook · shopping list", body: `<h2>Shopping<br><i>list</i></h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8mm">${[s.her, s.him].map((side) => `<div><div class="eb">First buys for ${who(side.brand)}</div>${side.firstBuys.map((f) => `<div style="border-bottom:.5pt solid #c9c2ba;padding:2.5mm 0;font-size:10pt"><i class="box"></i> &nbsp;<i class="dot" style="background:${f.color.hex}"></i><b>${f.item}</b> · ${f.color.name}</div>`).join("")}</div>`).join("")}</div>
      <div><div class="eb">My own list</div>${line.repeat(10)}</div>` },
    { eb: "Workbook · 30-day tracker", body: `<h2>30 days<br><i>in your colours</i></h2><p class="lead">Write down what you wore and tick the star when you got a compliment or simply felt great. After 30 days you know your favourites.</p>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:2.5mm">${Array.from({ length: 30 }, (_, i) => `<div style="border:.5pt solid #c9c2ba;height:27mm;padding:1.8mm;display:grid;grid-template-rows:auto 1fr auto;font-size:6.5pt;background:#fff"><b>Day ${i + 1}</b><span></span><span style="color:#9a938c">☆</span></div>`).join("")}</div>` },
  ];
}

// wallpapers 1170×2532 (phone)
const wallPalette = (s: Season) => `<div style="width:1170px;height:2532px;background:#F6F2EC;position:relative"><div style="position:absolute;top:900px;left:90px;right:90px;display:grid;gap:30px"><div class="eb" style="font-size:30px">My season</div><div class="bod" style="font-size:150px;line-height:.95">${s.name.replace(" ", "<br><i>")}</i></div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:40px">${s.palette.slice(0, 12).map((c) => `<i style="display:block;height:180px;background:${c.hex}"></i>`).join("")}</div></div><div style="position:absolute;bottom:220px;left:0;right:0;text-align:center">${MARK("34px")}</div></div>`;
const wallStripes = (s: Season) => `<div style="width:1170px;height:2532px;display:flex;position:relative">${s.palette.slice(0, 8).map((c) => `<i style="flex:1;background:${c.hex}"></i>`).join("")}<div style="position:absolute;left:0;right:0;bottom:180px;text-align:center;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.35)"><div class="bod" style="font-size:96px"><i>${s.name}</i></div></div></div>`;
const wallRules = (s: Season) => `<div style="width:1170px;height:2532px;background:#141414;color:#F6F2EC;position:relative"><div style="position:absolute;top:880px;left:100px;right:100px;display:grid;gap:44px"><div class="bod" style="font-size:120px;line-height:.95">${s.name.replace(" ", "<br><i>")}</i></div>
  <div style="display:flex;gap:16px">${s.palette.slice(0, 8).map((c) => `<i style="width:100px;height:100px;border-radius:50%;background:${c.hex};display:block"></i>`).join("")}</div>
  <ol style="font-size:44px;line-height:1.45;padding-left:50px;font-weight:500">${s.rules.map((r) => `<li>${r}</li>`).join("")}</ol></div></div>`;

// ---------- listing images (2000×1500) ----------
const INSIDE: Record<string, (s: Season, pages: number) => string[]> = {
  "1-palette-card": (s) => [`Palette sheet: ${s.palette.length} colours with names and hex codes`, "Wallet-size cards to cut out (front and back)", "Phone wallpaper with your palette"],
  "2-colour-guide": (s, n) => [`${n}-page ${s.name} colour guide`, `${s.palette.length} colours with names and hex codes`, "Your white, your dark, your denim", "Not this, but this: what to swap", "Metal, leather and contrast", "+ Palette Card and phone wallpaper"],
  "3-style-guide": (s, n) => [`${n}-page style guide for her and for him`, "8 outfits: work, weekend, date night, evening", "2 capsule wardrobes of 12 pieces", "First 5 buys and accessories", "+ the full colour guide, Palette Card, wallpaper"],
  "4-complete": (s, n) => [`${n}-page style guide with make-up`, "Printable colour fan to cut out", "Workbook: wardrobe check, capsule checklists, shopping list, 30-day tracker", "Wallet cards and 3 phone wallpapers", "Everything in the Style Guide"],
};
const heroImg = (s: Season, tier: Tier, pages: number) => { const photo = tier.no >= 3 ? img(`outfits/${s.key}-both.jpg`) : img(`seasons/season-${s.key}.jpg`); return `<div style="width:2000px;height:1500px;background:#E9E3DA;position:relative;overflow:hidden">
  <img src="${photo}" style="position:absolute;right:0;top:0;width:960px;height:1500px;object-fit:cover">
  <div style="position:absolute;left:100px;top:120px;width:860px;display:grid;gap:34px"><div style="display:flex;gap:16px;align-items:center"><span class="eb" style="font-size:26px">Digital download</span><span style="font-size:24px;font-weight:800;background:#141414;color:#F6F2EC;padding:8px 18px;border-radius:40px">${tier.no} of 4 · ${tier.name}</span></div>
    <div class="bod" style="font-size:132px;line-height:.92">${s.name}<br><i>${tier.name}</i></div>
    <div style="display:flex;gap:10px">${s.palette.slice(0, 9).map((c) => `<i style="width:72px;height:72px;border-radius:50%;background:${c.hex};display:block"></i>`).join("")}</div>
    <ul style="font-size:32px;line-height:1.45;padding-left:36px;display:grid;gap:6px">${INSIDE[tier.id]!(s, pages).map((x) => `<li>${x}</li>`).join("")}</ul></div>
  <div style="position:absolute;left:100px;bottom:70px">${MARK("34px")}</div></div>`; };
// the pages fanned out and overlapping, large enough to read the headings
const insideImg = (s: Season, tier: Tier, thumbs: string[]) => { const w = thumbs.length <= 2 ? 760 : 600, step = thumbs.length <= 1 ? 0 : (1800 - w) / (thumbs.length - 1); return `<div style="width:2000px;height:1500px;background:#E9E3DA;position:relative;overflow:hidden">
  <div style="position:absolute;left:100px;top:80px;display:flex;justify-content:space-between;right:100px;align-items:baseline"><div class="bod" style="font-size:96px">What's <i>inside</i></div><span class="eb" style="font-size:26px">${s.name} · ${tier.name}</span></div>
  ${thumbs.map((src, i) => `<img src="${src}" style="position:absolute;left:${100 + i * step}px;top:${300 + [0, 60, 20, 80, 40][i % 5]!}px;width:${w}px;box-shadow:0 30px 70px rgba(40,30,20,.28);transform:rotate(${[-3, 2, -1.5, 2.5, -2][i % 5]}deg);z-index:${i}">`).join("")}</div>`; };
const compareImg = (s: Season) => { const rows: [string, number][] = [["Palette sheet + wallet cards", 1], ["Phone wallpaper", 1], ["Colour guide: palette, basics, swaps, metals", 2], ["Outfits for her and for him", 3], ["2 capsule wardrobes + first buys", 3], ["Accessories for her and for him", 3], ["Make-up colours", 4], ["Printable colour fan", 4], ["Workbook + 30-day tracker", 4], ["3 phone wallpapers", 4]];
  return `<div style="width:2000px;height:1500px;background:#F6F2EC;padding:90px 100px;display:grid;grid-template-rows:auto 1fr auto;gap:40px">
  <div style="display:flex;justify-content:space-between;align-items:baseline"><div class="bod" style="font-size:92px">Choose your <i>${s.name}</i> package</div></div>
  <div style="display:grid;grid-template-columns:1fr repeat(4,230px);font-size:30px;align-content:start">
    <span></span>${TIERS.map((t) => `<span style="text-align:center;font-weight:800;padding:0 0 20px;font-size:28px;line-height:1.2">${t.name}</span>`).join("")}
    ${rows.map(([label, from]) => `<span style="border-top:1.5px solid #141414;padding:18px 0">${label}</span>${TIERS.map((t) => `<span style="border-top:1.5px solid #141414;padding:18px 0;text-align:center;font-size:34px;${t.no === 3 ? "background:rgba(0,0,0,.04)" : ""}">${t.no >= from ? "✓" : "<span style='color:#c9c2ba'>–</span>"}</span>`).join("")}`).join("")}</div>
  <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:28px;font-weight:700">Instant digital download · for him and for her · in English</span>${MARK("34px")}</div></div>`; };

// ---------- listing video (Etsy: 5–15 s, silent, MP4) ----------
// The effect, the package, its real pages with one line each, the comparison and the end card.
// Scenes are stills (1600×1200, like the photos), joined with ffmpeg crossfades and slides.
type Effect = { key: string; brand: string; n: number; bad: string; good: string };
const effectFor = (key: SeasonKey) => (EFFECTS as Effect[]).filter((e) => e.key === key).sort((a, b) => Number(a.brand !== "nyanse") - Number(b.brand !== "nyanse") || a.n - b.n)[0];
const enName = (hex: string) => { const nl = nameForHex(hex, "nyanse"); try { return nl ? colorNameEn(nl) : hex; } catch { return hex; } };
const vChip = (ok: boolean, hex: string) => `<span style="display:inline-flex;align-items:center;gap:12px;padding:12px 20px;border-radius:999px;font-weight:800;font-size:26px;background:${ok ? "#F6F2EC" : "rgba(20,20,20,.8)"};color:${ok ? "#141414" : "#F6F2EC"}"><b>${ok ? "✓" : "✕"}</b><i style="width:26px;height:26px;border-radius:50%;background:${hex};display:block;box-shadow:0 0 0 3px rgba(255,255,255,.9)"></i>${enName(hex)}</span>`;
const sceneEffect = (s: Season, e: Effect) => `<div style="width:1600px;height:1200px;background:#F6F2EC;display:grid;grid-template-columns:967px 1fr">
  <div style="position:relative"><img src="${A}/gemini/effect/effect-${e.key}-${e.brand}-${e.n}.jpg" style="width:967px;height:1200px;object-fit:cover;object-position:top">
    <div style="position:absolute;left:22px;top:22px">${vChip(false, e.bad)}</div><div style="position:absolute;left:505px;top:22px">${vChip(true, e.good)}</div></div>
  <div style="padding:0 60px;display:grid;align-content:center;gap:30px"><div class="bod" style="font-size:86px;line-height:.95">Same face.<br><i>Different colour.</i></div><div style="font-size:30px;line-height:1.4;color:#4a4540">The right colours make your face light up. These are the ${s.name} ones.</div></div></div>`;
const sceneTitle = (s: Season, tier: Tier) => `<div style="width:1600px;height:1200px;background:#E9E3DA;display:grid;align-content:center;padding:0 140px;gap:40px">
  <span style="font-size:28px;font-weight:800;background:#141414;color:#F6F2EC;padding:10px 22px;border-radius:40px;justify-self:start">${tier.no} of 4 · ${tier.name}</span>
  <div class="bod" style="font-size:150px;line-height:.92">${s.name}<br><i>${tier.name}</i></div>
  <div style="display:flex;gap:14px">${s.palette.slice(0, 10).map((c) => `<i style="width:84px;height:84px;border-radius:50%;background:${c.hex};display:block"></i>`).join("")}</div>
  <div style="font-size:32px;font-weight:700">Instant download · for her and for him</div></div>`;
const scenePage = (src: string, cap: string, n: number) => `<div style="width:1600px;height:1200px;background:#E9E3DA;display:grid;grid-template-columns:860px 1fr;align-items:center">
  <img src="${src}" style="height:1060px;justify-self:center;box-shadow:0 30px 70px rgba(40,30,20,.28);transform:rotate(${n % 2 ? 1.2 : -1.2}deg)">
  <div style="padding-right:110px;display:grid;gap:24px"><span class="bod" style="font-size:60px;color:#6F6862">0${n + 1}</span><div class="bod" style="font-size:84px;line-height:1">${cap}</div></div></div>`;
const sceneEnd = (s: Season, tier: Tier) => `<div style="width:1600px;height:1200px;background:#F6F2EC;display:grid;align-content:center;justify-items:center;gap:44px;text-align:center">
  ${MARK("40px")}<div class="bod" style="font-size:110px;line-height:.95">Your colours,<br><i>ready to use.</i></div>
  <div style="font-size:34px;font-weight:700">${s.name} · ${tier.name} · instant download</div>
  <div style="display:flex;gap:12px">${s.palette.slice(0, 8).map((c) => `<i style="width:64px;height:64px;border-radius:50%;background:${c.hex};display:block"></i>`).join("")}</div></div>`;
async function listingVideo(d: string, s: Season, tier: Tier, pages: { src: string; cap: string }[]) {
  const tmp = `${d}/_video`; mkdirSync(tmp, { recursive: true });
  const scenes: { file: string; dur: number; tr: string }[] = [];
  const e = effectFor(s.key);
  if (e && existsSync(`assets/gemini/effect/effect-${e.key}-${e.brand}-${e.n}.jpg`)) { await shot(`${tmp}/0.jpg`, sceneEffect(s, e), 1600, 1200); scenes.push({ file: `${tmp}/0.jpg`, dur: 2.4, tr: "fade" }); }
  await shot(`${tmp}/1.jpg`, sceneTitle(s, tier), 1600, 1200); scenes.push({ file: `${tmp}/1.jpg`, dur: 1.8, tr: "slideleft" });
  for (const [i, pg] of pages.entries()) { await shot(`${tmp}/p${i}.jpg`, scenePage(pg.src, pg.cap, i), 1600, 1200); scenes.push({ file: `${tmp}/p${i}.jpg`, dur: 1.6, tr: "slideleft" }); }
  scenes.push({ file: `${d}/listing-3.jpg`, dur: 2.0, tr: "fade" });
  await shot(`${tmp}/end.jpg`, sceneEnd(s, tier), 1600, 1200); scenes.push({ file: `${tmp}/end.jpg`, dur: 1.8, tr: "fade" });
  const X = 0.45; // transition length
  const args = ["-y", "-loglevel", "error"];
  for (const sc of scenes) args.push("-loop", "1", "-t", String(sc.dur), "-framerate", "30", "-i", sc.file);
  let f = scenes.map((_, i) => `[${i}:v]scale=1600:1200,setsar=1,fps=30,format=yuv420p[s${i}]`).join(";");
  let prev = "s0", t = scenes[0]!.dur;
  for (let i = 1; i < scenes.length; i++) { const out = `x${i}`; f += `;[${prev}][s${i}]xfade=transition=${scenes[i - 1]!.tr}:duration=${X}:offset=${(t - X).toFixed(2)}[${out}]`; t += scenes[i]!.dur - X; prev = out; }
  execFileSync(FFMPEG, [...args, "-filter_complex", f, "-map", `[${prev}]`, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high", "-crf", "21", "-movflags", "+faststart", `${d}/video.mp4`]);
  rmSync(tmp, { recursive: true });
  return Math.round(t * 10) / 10;
}

// ---------- listing text ----------
function listing(s: Season, tier: Tier, pages: number, files: string[], photos: string[]): string {
  const n = s.name;
  const titles: Record<string, string> = {
    "1-palette-card": `${n} Colour Palette Card, Printable Wallet Swatch Card, ${n} Palette with Hex Codes, Phone Wallpaper, Digital Download`,
    "2-colour-guide": `${n} Colour Guide PDF, Seasonal Colour Analysis, ${n} Palette with Colour Names, What to Avoid, Digital Download`,
    "3-style-guide": `${n} Style Guide PDF for Women and Men, Capsule Wardrobe, Outfit Ideas, ${n} Colour Palette, Digital Download`,
    "4-complete": `${n} Complete Colour Bundle, Style Guide, Make-up Colours, Printable Colour Fan, Wardrobe Workbook, Digital Download`,
  };
  const base = [n.toLowerCase(), `${n.toLowerCase()} palette`, "colour analysis", "color analysis", "seasonal color", `${s.family.toLowerCase()} colours`];
  const extra: Record<string, string[]> = {
    "1-palette-card": ["color palette card", "swatch card", "wallet card", "phone wallpaper", "hex codes", "personal colours", "digital download"],
    "2-colour-guide": ["colour guide pdf", "color guide", "what colours suit", "personal colours", "colors to avoid", "style guide pdf", "digital download"],
    "3-style-guide": ["capsule wardrobe", "outfit ideas", "style guide pdf", "mens style guide", "womens style guide", "wardrobe guide", "personal stylist"],
    "4-complete": ["colour fan", "makeup colours", "capsule wardrobe", "wardrobe planner", "style guide pdf", "color analysis kit", "gift for her"],
  };
  const tags = [...base, ...extra[tier.id]!].map((x) => x.slice(0, 20)).slice(0, 13);
  const desc = [
    `Your ${n} colours, ready to use. ${LINE[s.key]}`,
    ``,
    `WHAT YOU GET (instant digital download)`,
    ...INSIDE[tier.id]!(s, pages).map((x) => `• ${x}`),
    ``,
    `FILES: ${files.join(", ")}`,
    ``,
    `CHOOSE YOUR PACKAGE`,
    ...TIERS.map((x) => `${x.no === tier.no ? "▸" : "•"} ${x.name}: ${x.short}`),
    `You'll find all four for ${n} in our shop.`,
    ``,
    `HOW TO USE IT`,
    `Hold a garment under your chin in daylight and compare it with your palette. Shop online with the hex codes. Do the wardrobe check: keep, wear below the waist, or let go.`,
    ``,
    `GOOD TO KNOW`,
    `• This is a digital file: nothing is shipped.`,
    `• Not sure of your season? Our other season guides are in the shop.`,
    `• Colours may look slightly different on screen and in print.`,
    ``,
    `KULØRT · NYANSE: personal colour, made simple.`,
    ``,
    // Etsy's creativity standards ask sellers to disclose AI help; this covers the photos
    `Designed by KULØRT · NYANSE. Product photos and videos were created with the help of AI tools.`,
  ].join("\n");
  return `### ${tier.no}. ${tier.name} · €${tier.price}\n\n**Titel:** ${titles[tier.id]!.slice(0, 140)}\n\n**Prijs (advies):** €${tier.price}\n\n**Tags (13):** ${tags.join(", ")}\n\n**Bestanden (Digital files):** ${files.map((f) => `\`${f}\``).join(", ")}\n\n**Foto's (in deze volgorde):** ${photos.map((f) => `\`${f}\``).join(", ")}\n\n**Video:** \`video.mp4\` (onder de foto's, bij "Video")\n\n**Beschrijving:**\n\n\`\`\`\n${desc}\n\`\`\`\n`;
}

// ---------- render ----------
const b = await chromium.launch();
const ctx = await b.newContext();
await ctx.route(`${A}/**`, async (route) => {
  const path = new URL(route.request().url()).pathname;
  if (path === "/") return route.fulfill({ contentType: "text/html", body: "<!doctype html><title>etsy</title>" });
  const f = path.startsWith("/gemini/") ? resolve("assets", "." + decodeURIComponent(path)) : resolve("public", "." + decodeURIComponent(path));
  const type = { ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" }[extname(f)] ?? "application/octet-stream";
  return existsSync(f) ? route.fulfill({ body: readFileSync(f), contentType: type, headers: { "Access-Control-Allow-Origin": "*" } }) : route.fulfill({ status: 404 });
});
const p = await ctx.newPage();
await p.goto(`${A}/`);
const load = async (page: Page, html: string, w: number, h: number) => {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><meta charset="utf-8">${CSS}<body>${html}</body>`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
};
const pdf = async (file: string, pages: P[], label: string) => {
  await load(p, render(pages, label), 794, 1123);
  // nothing may run into the footer: the content block must end above it on every page
  // (scrollHeight ignores what a clipped child hides, such as the fan labels and the cover photo)
  const over = await p.$$eval("section.pg", (els) => els.map((el, i) => { const body = el.children[1] as HTMLElement | undefined; if (!body || el.children.length < 3 || body.style.minHeight !== "0px") return -1; /* covers and dividers crop their photo on purpose */ body.style.overflow = "hidden"; const o = body.scrollHeight > body.clientHeight + 1; body.style.overflow = ""; return o ? i + 1 : -1; }).filter((x) => x > 0));
  if (over.length) console.warn(`OVERFLOW ${file}: page ${over.join(", ")}`);
  await p.pdf({ path: file, format: "A4", printBackground: true });
  // ETSY_PREVIEW=dir: every page as an image, to check the layout without a PDF viewer
  const prev = process.env.ETSY_PREVIEW;
  if (prev) { mkdirSync(prev, { recursive: true }); const els = await p.$$("section.pg"); for (const [i, el] of els.entries()) await el.screenshot({ path: `${prev}/${file.split("/").slice(-2).join("_").replace(".pdf", "")}-${String(i + 1).padStart(2, "0")}.jpg`, type: "jpeg", quality: 70 }); }
  return pages.length;
};
// page thumbnails for the "what's inside" image: screenshot chosen pages of the current document
const thumbs = async (idx: number[]) => { const els = await p.$$("section.pg"); const out: string[] = []; for (const i of idx) { const el = els[Math.min(i, els.length - 1)]!; out.push("data:image/jpeg;base64," + (await el.screenshot({ type: "jpeg", quality: 80 })).toString("base64")); } return out; };
const shot = async (file: string, html: string, w: number, h: number) => { await load(p, html, w, h); await p.screenshot({ path: file, type: file.endsWith(".png") ? "png" : "jpeg", ...(file.endsWith(".png") ? {} : { quality: 90 }) }); };

let md = `# Etsy-listings: 12 seizoenen × 4 pakketten\n\n*Gemaakt met \`npx tsx scripts/make-etsy.ts\`. Instructies: docs/marketing/ETSY.md. Elk pakket is een eigen listing: Etsy levert bij varianten dezelfde bestanden.*\n\n`;
for (const key of ONLY ? [ONLY] : ORDER) {
  const s = season(key);
  const dir = `${OUT}/${key}`;
  rmSync(dir, { recursive: true, force: true });
  md += `## ${s.name}\n\n`;
  for (const g of [...garmentsOf(s.her), ...garmentsOf(s.him)]) {
    const sp = spriteFor(g.nl, g.brand);
    if (!sp || RASTER.has(rkey(sp, g.hex))) continue;
    await load(p, `<div style="display:inline-block;padding:24px;background:#F6F2EC">${garmentLive(sp, g.hex, 520)}</div>`, 900, 700);
    await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => null))));
    const el = await p.$("body > div");
    RASTER.set(rkey(sp, g.hex), "data:image/jpeg;base64," + (await el!.screenshot({ type: "jpeg", quality: 84 })).toString("base64"));
  }
  const colourGuide = [signsPage(s), palettePage(s), groupsPage(s), basicsPage(s), swapsPage(s), metalPage(s), usePage(s)];
  for (const tier of TIERS) {
    const d = `${dir}/${tier.id}`;
    mkdirSync(d, { recursive: true });
    const files: string[] = [];
    let pages = 0, inside: string[] = [], vid: { src: string; cap: string }[] = [];
    // the palette card and wallpaper come with every package
    const cardPages = await pdf(`${d}/palette-card.pdf`, [sheetPage(s), walletPage(s)], `${s.name} · Palette Card`);
    if (tier.no === 1) { pages = cardPages; inside = await thumbs([0, 1]); vid = [{ src: inside[0]!, cap: `${s.palette.length} colours, <i>names and hex codes</i>` }, { src: inside[1]!, cap: "Wallet cards <i>to cut out</i>" }]; }
    files.push("palette-card.pdf");
    if (tier.no === 2) {
      pages = await pdf(`${d}/colour-guide.pdf`, [cover(s, tier, img(`seasons/season-${key}.jpg`)), ...colourGuide], `${s.name} · Colour Guide`);
      inside = await thumbs([0, 2, 4, 5]);
      vid = [{ src: inside[1]!, cap: `Your ${s.palette.length} <i>colours</i>` }, { src: inside[2]!, cap: "Your white, your dark, <i>your denim</i>" }, { src: inside[3]!, cap: "Not this, <i>but this</i>" }];
      files.unshift("colour-guide.pdf");
    }
    if (tier.no >= 3) {
      const complete = tier.no === 4;
      const doc = [cover(s, tier, img(`seasons/season-${key}.jpg`)), glancePage(s), ...colourGuide, ...styleSide(s, s.her, complete), ...styleSide(s, s.him, complete)];
      const name = complete ? "complete-guide.pdf" : "style-guide.pdf";
      pages = await pdf(`${d}/${name}`, doc, `${s.name} · ${tier.name}`);
      const firstLook = doc.findIndex((x, i) => i > 8 && "eb" in x && x.eb.startsWith("Looks"));
      inside = await thumbs([0, 3, firstLook, firstLook + 2, complete ? doc.length - 1 : firstLook + 4]);
      const [herDivider, himLook] = await thumbs([firstLook - 1, doc.findIndex((x, i) => i > firstLook + 4 && "eb" in x && x.eb === "Looks for him")]);
      vid = [{ src: herDivider!, cap: "For her <i>and for him</i>" }, { src: inside[2]!, cap: "Four looks, <i>one colour family</i>" }, { src: inside[3]!, cap: "A capsule <i>of twelve</i>" }, { src: himLook!, cap: "His looks, <i>his colours</i>" }];
      files.unshift(name);
      if (complete) {
        await pdf(`${d}/colour-fan.pdf`, fanPages(s), `${s.name} · Colour fan`);
        const fanThumb = await thumbs([0]);
        await pdf(`${d}/workbook.pdf`, workbookPages(s), `${s.name} · Workbook`);
        const wbThumb = await thumbs([1]);
        inside = [inside[0]!, inside[2]!, inside[4]!, fanThumb[0]!, wbThumb[0]!];
        vid = [vid[0]!, vid[1]!, { src: fanThumb[0]!, cap: "A colour fan <i>to print</i>" }, { src: wbThumb[0]!, cap: "A workbook <i>to use it</i>" }];
        files.push("colour-fan.pdf", "workbook.pdf");
      }
    }
    // wallpapers: one for packages 1–3, three (zipped) for the complete collection
    if (tier.no < 4) { await shot(`${d}/wallpaper.png`, wallPalette(s), 1170, 2532); files.push("wallpaper.png"); }
    else {
      const w = `${d}/_wallpapers`; mkdirSync(w, { recursive: true });
      await shot(`${w}/${key}-wallpaper-palette.png`, wallPalette(s), 1170, 2532);
      await shot(`${w}/${key}-wallpaper-stripes.png`, wallStripes(s), 1170, 2532);
      await shot(`${w}/${key}-wallpaper-rules.png`, wallRules(s), 1170, 2532);
      execFileSync("zip", ["-jq", `${d}/wallpapers.zip`, ...["palette", "stripes", "rules"].map((x) => `${w}/${key}-wallpaper-${x}.png`)]);
      rmSync(w, { recursive: true });
      files.push("wallpapers.zip");
    }
    // listing photos: the package, what's inside, the comparison, and the effect photo when there is one
    await shot(`${d}/listing-1.jpg`, heroImg(s, tier, pages), 2000, 1500);
    await shot(`${d}/listing-2.jpg`, insideImg(s, tier, inside), 2000, 1500);
    await shot(`${d}/listing-3.jpg`, compareImg(s), 2000, 1500);
    const photos = ["listing-1.jpg", "listing-2.jpg", "listing-3.jpg"];
    const effect = ["nyanse-1", "kulort-1", "nyanse-2", "kulort-2"].map((x) => `assets/gemini/effect/effect-${key}-${x}.jpg`).find(existsSync);
    if (effect) { execFileSync("sips", ["-Z", "2000", "-s", "formatOptions", "85", effect, "--out", `${d}/listing-4.jpg`], { stdio: "ignore" }); photos.push("listing-4.jpg"); }
    const secs = await listingVideo(d, s, tier, vid);
    md += listing(s, tier, pages, files, photos) + "\n";
    console.log("wrote", d, `(${pages} pages, video ${secs} s)`);
  }
}
await b.close();
if (!ONLY) writeFileSync(`${OUT}/listings.md`, md);
console.log(ONLY ? "(single season: listings.md not rewritten)" : `wrote ${OUT}/listings.md`);
