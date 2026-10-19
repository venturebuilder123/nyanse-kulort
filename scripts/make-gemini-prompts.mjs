// Gemini prompt handbook for new editorials and social posts (founder, 19 Oct 2026).
// Run: node scripts/make-gemini-prompts.mjs  →  docs/brand/GEMINI-SOCIAL.md
// Colours come from the colour engine (assets/social/seasons/data.json): the right drape is the
// season's own colour, the wrong drape one of its "leave on the rack" colours.
import { readFileSync, writeFileSync } from "node:fs";

const D = JSON.parse(readFileSync("assets/social/seasons/data.json", "utf8"));
const ORDER = ["softAutumn", "deepWinter", "softSummer", "lightSpring", "warmAutumn", "coolWinter", "lightSummer", "brightSpring", "deepAutumn", "coolSummer", "warmSpring", "brightWinter"];

// Typical colouring per season, two castings each, spread over skin tones (Monk scale), so every
// family is shown on more than one skin tone. Never a celebrity, never a lookalike.
const CAST = {
  lightSpring: ["fair golden skin with light freckles, strawberry-blonde hair, light blue-green eyes", "light-medium golden skin (Monk 4), light golden-brown hair, warm hazel eyes"],
  warmSpring: ["fair-medium skin with a golden glow and freckles, copper-red hair, warm green eyes", "medium golden-tan skin (Monk 5), warm chestnut hair with golden lights, amber-brown eyes"],
  brightSpring: ["light warm skin, glossy dark-golden-brown hair, bright clear blue eyes, high clarity", "medium warm-brown skin (Monk 6), dark brown hair, bright clear dark eyes with strong whites"],
  lightSummer: ["fair cool-pink skin, ash-blonde hair, soft grey-blue eyes", "light-medium cool skin (Monk 3), light ash-brown hair, soft blue-grey eyes"],
  coolSummer: ["fair-medium cool rosy skin, ash-brown hair, cool grey-blue eyes", "medium cool-beige skin (Monk 5), soft dark ash-brown hair, cool brown eyes"],
  softSummer: ["light-medium neutral-cool skin, mousy ash-brown hair, soft grey-green eyes, low contrast", "medium neutral-olive skin (Monk 5), soft brown hair with ash tones, muted hazel eyes, low contrast"],
  softAutumn: ["light-medium warm-neutral skin, soft golden-brown hair, muted green-hazel eyes, low contrast", "medium warm-olive skin (Monk 6), soft brown hair, muted warm brown eyes, low contrast"],
  warmAutumn: ["warm ivory skin with freckles, rich auburn hair, warm brown eyes", "medium-deep golden-brown skin (Monk 7), warm dark brown hair with red lights, warm brown eyes"],
  deepAutumn: ["medium warm-olive skin, deep chocolate-brown hair, dark brown eyes", "deep warm-brown skin (Monk 8), dark brown-black hair, deep brown eyes"],
  deepWinter: ["fair-medium cool skin, near-black hair, dark brown eyes, high contrast", "deep cool-brown skin (Monk 9), black hair, dark brown eyes with bright whites, high contrast"],
  coolWinter: ["porcelain cool skin, dark brown-black hair, icy blue eyes, high contrast", "deep cool ebony skin (Monk 10), black hair, dark eyes, striking contrast"],
  brightWinter: ["light cool skin, glossy black hair, vivid blue eyes, very high clarity", "medium-deep cool brown skin (Monk 8), black hair, bright clear dark eyes, very high clarity"],
};
const colorWords = (hex) => {
  const n = parseInt(hex.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `${hex.toUpperCase()} (rgb ${r}, ${g}, ${b})`;
};

const STYLE = `Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance.`;
const AVOID = `No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background.`;

const effect = (key, brand, i) => {
  const s = D[key], good = (brand === "nyanse" ? s.nyanse : s.kulort)[0], bad = s.avoid[i % s.avoid.length];
  const who = brand === "nyanse" ? "woman" : "man";
  return `A diptych photograph, two halves side by side, of the SAME ${who} (${CAST[key][i % 2]}, age ${brand === "nyanse" ? (i % 2 ? "35" : "26") : (i % 2 ? "42" : "28")}), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in ${colorWords(bad)} wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in ${colorWords(good.hex)}, the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. ${STYLE} ${AVOID} Aspect ratio 4:5.`;
};
const portrait = (key, brand, ratio, scene) => {
  const s = D[key], pal = (brand === "nyanse" ? s.nyanse : s.kulort).slice(0, 4).map((c) => c.hex.toUpperCase()).join(", ");
  const who = brand === "nyanse" ? "woman" : "man";
  return `${scene.replace("{who}", who)} The ${who}: ${CAST[key][0]}. Outfit only in these colours: ${pal}, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. ${STYLE} ${AVOID} Aspect ratio ${ratio}.`;
};

const SCENES = {
  hero: "A full-length editorial portrait of a {who} standing by a tall window in an airy Amsterdam canal-house apartment.",
  fitting: "A {who} in a bright fitting room holding a garment under the chin and smiling, sure of the choice, the rail behind with clothes in matching colours.",
  morning: "A {who} at an open wardrobe in the morning light, every garment hanging in one harmonious colour family, picking a piece without hesitation.",
  date: "A {who} at a candle-lit café table in the evening, warm and confident, looking at someone off-camera.",
  work: "A {who} walking into a light, modern office meeting, poised and at ease, first impression moment.",
};

let md = `# Gemini-handboek: editorials en social posts in de nieuwe stijl

*19 oktober 2026. Gegenereerd met \`node scripts/make-gemini-prompts.mjs\` uit de kleurmotor: de goede en foute doeken per seizoen zijn de echte kleuren uit de gids.*

## Spelregels (lees dit eerst)

1. **Mooi, maar echt.** Aantrekkelijke modellen met echte huid. Plastic perfectie maakt het kleureffect ongeloofwaardig en wakkert onzekerheid aan (CLAUDE.md §12).
2. **Nooit een bekend gezicht of een lookalike** (CLAUDE.md §2). De bekende namen ("vaak genoemd als …") zet ik zelf als tekst op het beeld en in het bijschrift.
3. **Geen tekst laten maken door Gemini.** Koppen, namen en het logo zet ik erop in de huisstijl.
4. **Elk seizoen op meer dan één huidtint.** Per seizoen staan er twee castings. Wissel ze af, zodat iedereen zichzelf ziet.
5. **AI-label:** zet bij het plaatsen op **TikTok** het label "AI-generated content" aan; dat is daar verplicht. **Instagram/Meta** voegt soms zelf "AI info" toe. Bij **advertenties** met deze beelden zet je het label altijd aan. Op **Etsy** staat de vermelding al in de beschrijving.

## Zo lever je ze aan

Zet de beelden in **\`assets/gemini/\`** met deze namen. Dan weet ik wat het is en waar het heen moet:

| Reeks | Bestandsnaam | Formaat | Wordt |
|---|---|---|---|
| A. Het effect (doek fout → goed) | \`effect-{seizoen}-{nyanse|kulort}-{1|2}.png\` | 4:5 | Carrousel-slide 1, Reels-cover, advertentie |
| B. Seizoensportret | \`hero-{seizoen}-{nyanse|kulort}.png\` | 4:5 en 9:16 | Website, Pinterest, Stories |
| C. De voordelen | \`benefit-{fitting|morning|date|work}-{seizoen}-{nyanse|kulort}.png\` | 4:5 | Volgers-posts, advertenties |

\`{seizoen}\` = softAutumn, deepWinter, softSummer, lightSpring, warmAutumn, coolWinter, lightSummer, brightSpring, deepAutumn, coolSummer, warmSpring, brightWinter.

**Tip voor Gemini:**
- Plak de prompt in één keer.
- Is het gezicht in de twee helften van het effectbeeld niet hetzelfde, vraag dan: *"Keep exactly the same person and pose in both halves; change only the drape colour."*
- Maak per prompt 2 tot 4 varianten en bewaar de beste.

**Wat ik ermee doe:**
- tekst en het logo erop in de huisstijl: het seizoen, "Same face. Different colour.", de voordelen, "vaak genoemd als …";
- de beelden verdelen over de Instagram-kalender, de Pinterest-pins, de website en de advertenties.

## Basisblokken (zitten al in elke prompt)

**Stijl:** ${STYLE}

**Vermijden:** ${AVOID}

`;

md += `## A. Het effect: zelfde gezicht, fout doek tegenover goed doek (24 prompts)\n\nDe belangrijkste reeks: dit laat in één blik zien wat kleur doet.\n\n`;
for (const key of ORDER) {
  md += `### ${D[key].name}\n\n`;
  for (const [i, brand] of [[0, "nyanse"], [1, "nyanse"], [0, "kulort"], [1, "kulort"]]) {
    md += `**effect-${key}-${brand}-${i + 1}.png**\n\n\`\`\`\n${effect(key, brand, i)}\n\`\`\`\n\n`;
  }
}
md += `## B. Seizoensportretten (24 prompts; maak elk in 4:5 en in 9:16)\n\n`;
for (const key of ORDER) {
  md += `### ${D[key].name}\n\n`;
  for (const brand of ["nyanse", "kulort"]) md += `**hero-${key}-${brand}.png**\n\n\`\`\`\n${portrait(key, brand, "4:5 (and a second version in 9:16)", SCENES.hero)}\n\`\`\`\n\n`;
}
md += `## C. De voordelen: momenten waarop kleur het verschil maakt\n\nBegin met deze 8. Wil je meer, dan vervang je het seizoen in de bestandsnaam en de kleuren met de lijst hieronder.\n\n`;
const BEN = [["fitting", "softAutumn", "nyanse"], ["morning", "deepWinter", "kulort"], ["date", "softSummer", "nyanse"], ["work", "coolWinter", "kulort"], ["fitting", "lightSpring", "kulort"], ["morning", "warmAutumn", "nyanse"], ["date", "deepAutumn", "kulort"], ["work", "brightSpring", "nyanse"]];
for (const [scene, key, brand] of BEN) md += `**benefit-${scene}-${key}-${brand}.png**\n\n\`\`\`\n${portrait(key, brand, "4:5", SCENES[scene])}\n\`\`\`\n\n`;
md += `## Kleuren per seizoen (om zelf te variëren)\n\n| Seizoen | Goede kleuren (dames) | Goede kleuren (heren) | Laat hangen |\n|---|---|---|---|\n`;
for (const key of ORDER) { const s = D[key]; md += `| ${s.name} | ${s.nyanse.slice(0, 4).map((c) => c.hex).join(" ")} | ${s.kulort.slice(0, 4).map((c) => c.hex).join(" ")} | ${s.avoid.join(" ")} |\n`; }
writeFileSync("docs/brand/GEMINI-SOCIAL.md", md);
console.log("wrote docs/brand/GEMINI-SOCIAL.md", md.length, "chars");
