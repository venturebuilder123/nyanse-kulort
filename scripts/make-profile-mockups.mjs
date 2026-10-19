// How the profiles should look (docs/marketing/GUERRILLA.md §2): Instagram and TikTok, built from
// the real assets so the founder can copy the order one to one.
// Run: node scripts/make-profile-mockups.mjs  →  assets/social/mockup-instagram.png, mockup-tiktok.png
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";

const png = (p) => `data:image/${p.endsWith(".jpg") ? "jpeg" : "png"};base64,` + readFileSync(p).toString("base64");
const S = "assets/social";
const FONTS = "https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=block";
const css = `<link rel="stylesheet" href="${FONTS}"><style>*{box-sizing:border-box;margin:0}body{font-family:Manrope,sans-serif;background:#ddd;padding:30px;display:flex;gap:40px}
.phone{width:430px;background:#fff;border-radius:36px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(0,0,0,.5);color:#111}
.tag{position:absolute;background:#C8285A;color:#fff;font-size:12px;font-weight:800;padding:3px 8px;border-radius:4px}
.note{width:360px;font-size:15px;line-height:1.5;color:#222}.note h2{font-size:22px;margin-bottom:10px}.note li{margin:6px 0}</style>`;

const hl = [["kleuren", "Colours"], ["seizoenen", "Seasons"], ["stijlgids", "Guide"], ["kleurenpas", "Card"], ["looks", "Looks"], ["vragen", "FAQ"]];
const grid = [
  [`${S}/pinned-1-wat.png`, "📌"], [`${S}/pinned-2-seizoenen.png`, "📌"], [`${S}/pinned-3-krijg.png`, "📌"],
  [`${S}/seasons/02-deepWinter/slide-1.jpg`, "▣"], [`${S}/follow/feed-4-amnesty.png`, ""], [`${S}/seasons/01-softAutumn/slide-1.jpg`, "▣"],
  [`${S}/follow/feed-1-one-season-a-week.png`, ""], [`${S}/follow/feed-5-save-deepWinter.png`, ""], [`${S}/follow/feed-7-every-week.png`, ""],
];

const insta = `<div class="phone">
  <div style="padding:18px 18px 0;display:flex;justify-content:space-between;font-weight:800;font-size:18px"><span>kulortnyanse ✓</span><span>☰</span></div>
  <div style="padding:14px 18px;display:flex;align-items:center;gap:22px">
    <img src="${png(`${S}/avatar-monogram.png`)}" style="width:86px;height:86px;border-radius:50%;border:1px solid #ddd">
    <div style="display:flex;gap:22px;text-align:center;font-size:13px"><span><b style="font-size:17px">24</b><br>posts</span><span><b style="font-size:17px">—</b><br>followers</span><span><b style="font-size:17px">—</b><br>following</span></div></div>
  <div style="padding:0 18px;font-size:14px;line-height:1.4"><b>KULØRT · NYANSE</b><br><span style="color:#777">Personal stylist</span><br>Personal colour, made simple ✦ Your colours, your wardrobe, your guide ✦ For him (KULØRT) and her (NYANSE) ✦ Free colour check ↓<br><b style="color:#1a4fa0">kulort-nyanse.com/links</b></div>
  <div style="display:flex;gap:10px;padding:14px 18px"><span style="flex:1;background:#efefef;border-radius:8px;text-align:center;padding:8px;font-weight:700;font-size:13px">Follow</span><span style="flex:1;background:#efefef;border-radius:8px;text-align:center;padding:8px;font-weight:700;font-size:13px">Message</span></div>
  <div style="display:flex;gap:12px;padding:4px 18px 14px;overflow:hidden">${hl.map(([f, l]) => `<div style="text-align:center;font-size:11px;width:62px"><img src="${png(`${S}/highlight-${f}.png`)}" style="width:62px;height:62px;border-radius:50%;object-fit:cover;border:1px solid #ccc"><div>${l}</div></div>`).join("")}</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">${grid.map(([f, t]) => `<div style="position:relative;aspect-ratio:4/5;overflow:hidden"><img src="${png(f)}" style="width:100%;height:100%;object-fit:cover">${t ? `<span style="position:absolute;top:5px;right:6px;color:#fff;font-size:13px;text-shadow:0 0 3px #000">${t}</span>` : ""}</div>`).join("")}</div></div>`;

const covers = ["01-softAutumn", "02-deepWinter", "03-softSummer", "04-lightSpring", "05-warmAutumn", "06-coolWinter"].map((d) => `${S}/seasons/${d}/tiktok-cover.jpg`);
const tiktok = `<div class="phone">
  <div style="padding:18px;text-align:center;font-weight:800;font-size:16px">KULØRT · NYANSE</div>
  <div style="display:grid;justify-items:center;gap:8px;padding:0 18px 14px;text-align:center">
    <img src="${png(`${S}/avatar-monogram.png`)}" style="width:96px;height:96px;border-radius:50%;border:1px solid #ddd">
    <b style="font-size:16px">@kulortnyanse</b>
    <div style="display:flex;gap:26px;font-size:13px;color:#555"><span><b style="color:#111">—</b> Following</span><span><b style="color:#111">—</b> Followers</span><span><b style="color:#111">—</b> Likes</span></div>
    <div style="display:flex;gap:8px;width:100%"><span style="flex:1;background:#fe2c55;color:#fff;border-radius:6px;padding:10px;font-weight:800">Follow</span><span style="background:#efefef;border-radius:6px;padding:10px 14px">✉</span></div>
    <div style="font-size:14px;line-height:1.4">Which season are you? 🎨 One a week.<br>Free colour check ↓ For him &amp; her</div>
    <b style="font-size:14px">🔗 kulort-nyanse.com/links</b></div>
  <div style="display:flex;gap:16px;padding:0 18px 10px;font-size:13px;font-weight:700"><span style="border-bottom:2px solid #111;padding-bottom:6px">Videos</span><span style="color:#888">Playlists: Spring · Summer · Autumn · Winter</span></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">${covers.map((f, i) => `<div style="position:relative;aspect-ratio:9/16;overflow:hidden"><img src="${png(f)}" style="width:100%;height:100%;object-fit:cover">${i < 3 ? `<span style="position:absolute;top:6px;left:6px;background:#fe2c55;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:3px">Pinned</span>` : ""}</div>`).join("")}</div></div>`;

const notes = `<div class="note"><h2>Zo ziet het eruit</h2><ul>
  <li><b>Instagram:</b> 3 vastgezette posts (wat het is, welk seizoen, wat je krijgt), dan elke maandag een seizoenscarrousel en daartussen de volgers-beelden.</li>
  <li><b>Highlights</b>: Colours · Seasons · Guide · Card · Looks · FAQ, altijd met dezelfde omslag.</li>
  <li><b>TikTok:</b> 3 vastgezette video's (de amnestie, "Same face. Different colour.", het eerste seizoen), daarna één video per seizoen met de cover van die week. Afspeellijsten per familie.</li>
  <li><b>Link in bio:</b> kulort-nyanse.com/links (TikTok: /links?src=tiktok).</li></ul></div>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 1300 } });
for (const [name, html] of [["instagram", insta], ["tiktok", tiktok]]) {
  await p.setContent(`<!doctype html><meta charset="utf-8">${css}<body>${html}${notes}</body>`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `${S}/mockup-${name}.png`, fullPage: true });
  console.log("wrote", name);
}
await b.close();
