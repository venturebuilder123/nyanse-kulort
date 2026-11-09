// Pinterest, round two (founder, 9 Nov 2026: "Pinterest verder uitbouwen"). Pinterest rewards volume
// and search words, so these are the searches people actually type, per season:
//   colours to avoid (and what to wear instead) · capsule wardrobe · makeup and jewellery (her) ·
//   best colours for men (him) · 3 signs you are one · and six "X vs Y" pins for the classic doubts.
// Content straight from the colour engine (English), 1000×1500. Appended to lib/social/pins.json with
// planned times, three a day, so the RSS feeds (/pinterest/{board}) pick them up by themselves.
// Run: npx tsx scripts/make-pinterest-more.ts
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { profileForSeason } from "@/lib/color/declared";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide, type Guide } from "@/lib/guide/build";
import { guideEn } from "@/lib/guide/en";
import { garmentName } from "@/lib/i18n/words";

const OUT = "public/social/pinterest/more";
mkdirSync(OUT, { recursive: true });
const SITE = "https://www.kulort-nyanse.com";
const ORDER: SeasonKey[] = ["softAutumn", "deepWinter", "softSummer", "lightSpring", "warmAutumn", "coolWinter", "lightSummer", "brightSpring", "deepAutumn", "coolSummer", "warmSpring", "brightWinter"];
const BOARD: Record<string, string> = { Spring: "Spring colour palettes", Summer: "Summer colour palettes", Autumn: "Autumn colour palettes", Winter: "Winter colour palettes" };
const VS: [SeasonKey, SeasonKey][] = [["softAutumn", "softSummer"], ["deepAutumn", "deepWinter"], ["lightSpring", "lightSummer"], ["brightSpring", "brightWinter"], ["warmSpring", "warmAutumn"], ["coolSummer", "coolWinter"]];

const name = (k: SeasonKey) => SEASONS[k].name;
const family = (k: SeasonKey) => name(k).split(" ").pop()!;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const g = (k: SeasonKey, brand: "kulort" | "nyanse"): Guide => guideEn(buildGuide(profileForSeason(k), brand));

/** Three plain signs from the season's scales (same wording as the Instagram carousels). */
function signs(k: SeasonKey): string[] {
  const p = profileForSeason(k);
  return [
    p.undertone < -0.15 ? "Silver flatters you more than gold." : p.undertone > 0.15 ? "Gold flatters you more than silver." : "Both metals work; rose gold is your safe bet.",
    p.depth > 0.65 ? "Deep, rich colours carry you; pastels fade." : p.depth < 0.3 ? "Light and mid tones make you glow; black feels heavy." : "Mid tones are your base.",
    p.clarity > 0.6 ? "Clear, vivid colours match your eyes." : p.clarity < 0.35 ? "Soft, muted shades look polished on you." : "Rich, not loud: colours with depth.",
  ];
}

const FONTS = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..100,600..900&family=Bodoni+Moda:opsz,wght@6..96,400&family=Hanken+Grotesk:wght@500;700;800&display=block";
const shell = (tint: string, ink: string, body: string) => `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>
*{box-sizing:border-box;margin:0}body{width:1000px;height:1500px;background:${tint};color:${ink};font-family:'Hanken Grotesk',sans-serif;overflow:hidden}
.pin{width:1000px;height:1500px;padding:64px;display:grid;gap:34px}
.mark{font-family:'Bodoni Moda',serif;font-size:26px;letter-spacing:.08em}
.k{font:800 22px/1 'Hanken Grotesk';letter-spacing:.2em;text-transform:uppercase;opacity:.7}
h1{font:900 112px/.88 'Archivo';font-stretch:68%;text-transform:uppercase;letter-spacing:-.005em}
h1 small{display:block;font-size:.5em;line-height:1.05;font-stretch:80%;opacity:.8;margin-top:12px}
.sw{display:block;border-radius:18px;box-shadow:inset 0 0 0 2px rgba(0,0,0,.07)}
.lab{font:700 24px/1.15 'Hanken Grotesk'}
.foot{display:flex;justify-content:space-between;align-items:center;font:800 26px/1 'Hanken Grotesk'}
.cta{background:${ink};color:${tint};padding:20px 26px;border-radius:999px}
</style><div class="pin">${body}</div>`;
const top = (k: SeasonKey, label: string) => `<div style="display:flex;justify-content:space-between;align-items:center"><span class="mark">KULØRT | NYANSE</span><span class="k">${label}</span></div>`;
const foot = `<div class="foot"><span class="cta">Free colour check · 1 selfie</span><span>kulort-nyanse.com</span></div>`;
/** the lightest calm colour of the palette as the page, dark text on it */
const tintOf = (gd: Guide) => [...gd.summary.core].sort((a, b) => lum(b.hex) - lum(a.hex))[0]!.hex;
function lum(hex: string) { const n = parseInt(hex.slice(1), 16); return 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255); }
const mix = (hex: string, w: number) => { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * w)); return `rgb(${c.join(",")})`; };

type Pin = { title: string; image: string; board: string; description: string; link: string; at: string };
const pins: { file: string; html: string; pin: Omit<Pin, "image" | "at"> }[] = [];
const link = (content: string) => `${SITE}/kleuranalyse?utm_source=pinterest&utm_medium=pin&utm_content=${content}`;
const desc = (s: string) => `${s} Not sure which season you are? Take the free colour check with one selfie at kulort-nyanse.com: your photo never leaves your phone.`;

for (const k of ORDER) {
  const her = g(k, "nyanse"), him = g(k, "kulort"), n = name(k), tint = mix(tintOf(her), 0.55), ink = "#17151A";
  // 1. colours to avoid, with what to wear instead
  const swaps = her.swaps.slice(0, 5);
  pins.push({ file: `${slug(n)}-avoid`, pin: { title: `${n}: colours to avoid (and what to wear instead)`, board: BOARD[family(k)]!, description: desc(`The colours a ${n} should skip, each with the nearest shade that does work: ${swaps.map((s) => `${s.avoid.name} → ${s.instead.name}`).join(", ")}.`), link: link(`${slug(n)}-avoid`) },
    html: shell(tint, ink, `${top(k, "Not this, but this")}<h1>${n}<small>colours to avoid</small></h1>
      <div style="display:grid;gap:18px">${swaps.map((s) => `<div style="display:grid;grid-template-columns:1fr 70px 1fr;align-items:center;gap:14px">
        <div style="display:grid;gap:8px"><span class="sw" style="height:118px;background:${s.avoid.hex};position:relative"></span><span class="lab">✕ ${s.avoid.name}</span></div>
        <span style="font:900 54px/1 'Archivo';text-align:center">→</span>
        <div style="display:grid;gap:8px"><span class="sw" style="height:118px;background:${s.instead.hex}"></span><span class="lab">✓ ${s.instead.name}</span></div></div>`).join("")}</div>${foot}`) });
  // 2. capsule wardrobe (her)
  const cap = her.capsule.slice(0, 12);
  pins.push({ file: `${slug(n)}-capsule`, pin: { title: `${n} capsule wardrobe: 12 pieces that all go together`, board: BOARD[family(k)]!, description: desc(`A ${n} capsule wardrobe in twelve pieces, every colour from the ${n} palette, so everything combines with everything.`), link: link(`${slug(n)}-capsule`) },
    html: shell(tint, ink, `${top(k, "Capsule wardrobe")}<h1>${n}<small>12 pieces, all go together</small></h1>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${cap.map((c) => `<div style="display:grid;gap:8px"><span class="sw" style="height:150px;background:${c.color.hex}"></span><span class="lab">${garmentName(c.item, "en")}<br><span style="opacity:.65;font-weight:500">${c.color.name}</span></span></div>`).join("")}</div>${foot}`) });
  // 3. makeup and jewellery (her)
  const mk = (her.makeup ?? []).flatMap((a) => a.swatches.slice(0, 3).map((s) => ({ t: a.title, s }))).slice(0, 9);
  pins.push({ file: `${slug(n)}-makeup`, pin: { title: `${n} makeup and jewellery: your lips, blush and metal`, board: BOARD[family(k)]!, description: desc(`Makeup for a ${n}: lip, blush and eye shades that match a ${n} undertone, and the best metal (${her.summary.metal}).`), link: link(`${slug(n)}-makeup`) },
    html: shell(tint, ink, `${top(k, "Makeup & jewellery")}<h1>${n}<small>makeup and metal</small></h1>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${mk.map((m) => `<div style="display:grid;gap:8px"><span class="sw" style="height:150px;border-radius:999px;background:${m.s.hex}"></span><span class="lab">${m.s.name}<br><span style="opacity:.65;font-weight:500">${m.t}</span></span></div>`).join("")}</div>
      <div style="font:900 56px/1 'Archivo';font-stretch:72%;text-transform:uppercase">Metal: ${her.summary.metal}</div>${foot}`) });
  // 4. men: the basics and first buys (him)
  const buys = him.firstBuys.slice(0, 5);
  pins.push({ file: `${slug(n)}-men`, pin: { title: `${n} men: the best colours for shirts, knits and jackets`, board: BOARD[family(k)]!, description: desc(`Colour advice for men who are a ${n}: the first five pieces to buy (${buys.map((b) => `${garmentName(b.item, "en")} in ${b.color.name}`).join(", ")}), plus watch and leather: ${him.summary.metal}, ${him.summary.leather}.`), link: link(`${slug(n)}-men`) },
    html: shell("#1E2026", "#F4F1EA", `${top(k, "For him")}<h1>${n}<small>men: buy these first</small></h1>
      <div style="display:grid;gap:14px">${buys.map((b, i) => `<div style="display:grid;grid-template-columns:150px 1fr;gap:20px;align-items:center"><span class="sw" style="height:112px;background:${b.color.hex};box-shadow:inset 0 0 0 2px rgba(255,255,255,.12)"></span><span class="lab" style="font-size:30px">${i + 1}. ${garmentName(b.item, "en")}<br><span style="opacity:.7;font-weight:500;font-size:24px">${b.color.name}</span></span></div>`).join("")}</div>
      <div class="lab" style="font-size:28px">Watch: ${him.summary.metal} · Leather: ${him.summary.leather}</div>${foot.replace("class=\"cta\"", "class=\"cta\" style=\"background:#F4F1EA;color:#1E2026\"")}`) });
  // 5. three signs
  const sg = signs(k);
  pins.push({ file: `${slug(n)}-signs`, pin: { title: `Are you a ${n}? 3 signs`, board: BOARD[family(k)]!, description: desc(`Three signs you are a ${n}: ${sg.join(" ")}`), link: link(`${slug(n)}-signs`) },
    html: shell(tint, ink, `${top(k, "Seasonal colour analysis")}<h1>Are you a<br>${n}?<small>3 signs</small></h1>
      <div style="display:grid;gap:22px">${sg.map((s, i) => `<div style="display:grid;grid-template-columns:90px 1fr;gap:18px;align-items:start"><span style="font:900 84px/.9 'Archivo';font-stretch:62%">${i + 1}</span><span style="font:700 40px/1.2 'Hanken Grotesk'">${s}</span></div>`).join("")}</div>
      <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:8px">${her.summary.core.slice(0, 8).map((c) => `<span class="sw" style="height:90px;background:${c.hex}"></span>`).join("")}</div>${foot}`) });
}
// 6. the classic doubts
for (const [a, b] of VS) {
  const ga = g(a, "nyanse"), gb = g(b, "nyanse"), na = name(a), nb = name(b);
  const pa = profileForSeason(a), pb = profileForSeason(b);
  const diff = Math.abs(pa.undertone - pb.undertone) > 0.3 ? (pa.undertone > pb.undertone ? `${na} is warmer (gold), ${nb} is cooler (silver).` : `${na} is cooler (silver), ${nb} is warmer (gold).`)
    : Math.abs(pa.depth - pb.depth) > 0.25 ? (pa.depth > pb.depth ? `${na} is deeper, ${nb} is lighter.` : `${na} is lighter, ${nb} is deeper.`)
    : (pa.clarity > pb.clarity ? `${na} is clearer, ${nb} is softer.` : `${na} is softer, ${nb} is clearer.`);
  const col = (gd: Guide, n: string) => `<div style="display:grid;gap:12px;align-content:start"><span style="font:900 52px/.95 'Archivo';font-stretch:68%;text-transform:uppercase">${n}</span>${gd.summary.core.slice(0, 6).map((c) => `<div style="display:grid;grid-template-columns:96px 1fr;gap:12px;align-items:center"><span class="sw" style="height:72px;background:${c.hex}"></span><span class="lab">${c.name}</span></div>`).join("")}</div>`;
  pins.push({ file: `${slug(na)}-vs-${slug(nb)}`, pin: { title: `${na} vs ${nb}: what is the difference?`, board: BOARD[family(a)]!, description: desc(`${na} or ${nb}? ${diff} Compare both palettes side by side.`), link: link(`${slug(na)}-vs-${slug(nb)}`) },
    html: shell("#F3F1EE", "#17151A", `${top(a, "Which one are you?")}<h1>${na}<small>vs ${nb}</small></h1>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px">${col(ga, na)}${col(gb, nb)}</div>
      <div style="font:700 34px/1.25 'Hanken Grotesk'">${diff}</div>${foot}`) });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 1500 } });
for (const p of pins) {
  await page.setContent(p.html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const over = await page.evaluate(() => document.querySelector(".pin")!.scrollHeight > 1500);
  if (over) console.warn("overflow:", p.file);
  await page.screenshot({ path: `${OUT}/${p.file}.jpg`, type: "jpeg", quality: 88 });
}
await browser.close();

// schedule: three a day from tomorrow 09:00 UTC, mixing the boards; never twice the same file
const all = JSON.parse(readFileSync("lib/social/pins.json", "utf8")) as Pin[];
const have = new Set(all.map((p) => p.image));
const start = new Date(); start.setUTCDate(start.getUTCDate() + 1); start.setUTCHours(9, 0, 0, 0);
let n = 0;
for (const p of pins) {
  const image = `${SITE}/social/pinterest/more/${p.file}.jpg`;
  if (have.has(image)) continue;
  const at = new Date(start.getTime() + Math.floor(n / 3) * 864e5 + (n % 3) * 4 * 3600e3);
  all.push({ ...p.pin, image, at: at.toISOString() });
  n++;
}
writeFileSync("lib/social/pins.json", JSON.stringify(all, null, 2) + "\n");
console.log(`made ${pins.length} pins, scheduled ${n} new (pins.json now ${all.length})`);
