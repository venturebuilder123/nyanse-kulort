// Measures the AI-generated landing images with our own engine and writes lib/brand/people.json.
// Usage: put images in public/brand/people/ (see docs/fase-b/AI-BEELDEN.md), then:
//   npm run build && npm start   (in another terminal)
//   node scripts/measure-people.mjs
import { chromium } from "@playwright/test";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3000";
// kulort-1.jpg (core set) or kulort-jong-1.jpg / nyanse-40-2.jpg (age segment, docs/fase-b/DOELGROEPEN.md)
const NAME = /^(kulort|nyanse)-(?:(jong|40)-)?\d+\.(jpe?g|png|webp)$/i;
const files = readdirSync("public/brand/people").filter((f) => NAME.test(f)).sort();
if (!files.length) throw new Error("no images in public/brand/people (expected kulort-1.jpg, nyanse-1.jpg, …)");
const pw = readFileSync(".env", "utf8").match(/^LAB_PASSWORD=(.*)$/m)?.[1]?.trim();
if (!pw) throw new Error("LAB_PASSWORD missing in .env");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`${base}/lab/login`);
await page.fill("input[name=password]", pw);
await page.click("button[type=submit]");
await page.waitForSelector("text=Nieuwe testpersoon");
await page.goto(`${base}/lab/people?files=${files.join(",")}`);
await page.waitForFunction(() => document.querySelector("#out")?.textContent?.trim().startsWith("{"), null, { timeout: 120000 });
const { result, errors } = JSON.parse(await page.textContent("#out"));
await browser.close();

// Only images our engine is confident about become examples: a demo must show a real result.
const MIN_CONFIDENCE = 0.5;
const clean = Object.fromEntries(
  Object.entries(result).map(([k, list]) => [
    k,
    list
      .filter((p) => {
        const keep = p.confidence >= MIN_CONFIDENCE;
        console.log(keep ? "use " : "SKIP", k, p.src, p.season, p.note);
        return keep;
      })
      .map(({ note, confidence, ...p }) => {
        const seg = NAME.exec(p.src.split("/").pop())?.[2];
        return seg ? { ...p, segment: seg.toLowerCase() } : p;
      }),
  ]),
);
writeFileSync("lib/brand/people.json", JSON.stringify(clean, null, 2) + "\n");
if (errors.length) console.warn("skipped:", errors);
console.log("wrote lib/brand/people.json");
