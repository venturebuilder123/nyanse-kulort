# Gemini-handboek: alle beelden voor KULØRT · NYANSE

*Versie 1.0, 14 oktober 2026. Hoort bij [BRANDBOOK.md](BRANDBOOK.md). Instructies in het Nederlands, prompts in het Engels (Gemini volgt Engels nauwkeuriger).*

## 0. Werkwijze (eerst lezen)

**Volgorde voor vandaag (prioriteit):**
1. **Logo-ontwerpronde** (deel 2): jij kiest een richting, ik maak er vector van.
2. **Maison-homepage-beeld** (deel 4A) en **cadeau-still-lifes** (deel 6): die maken de site meteen duidelijk.
3. **Kleurportretten** voor de nieuwe leeftijden (deel 3).
4. **Seizoensbeelden** (deel 5).
5. **Campagnebeelden per leeftijd** (deel 4B) en **advertenties** (deel 7).
6. **Kleding en stijlgids** (deel 8): het kan ook later.

**Zo werk je in Gemini:**
- **Eén chat per onderwerp** (logo, portretten KULØRT, portretten NYANSE, campagne, seizoenen, product, advertenties). Binnen één chat blijft de stijl gelijk.
- **Begin elke chat met de Masterbriefing** (deel 1) en daarna de briefing van dat deel. Gemini antwoordt "Ready"; dan één prompt per keer.
- **Laat per prompt 2–3 varianten maken** en kies de beste. Corrigeer met één correctie per keer (deel 9).
- **Download op de hoogste resolutie.** Bewaar de originelen in `assets/brand-originals/<deel>/`. Dat staat niet in git en wordt niet gepubliceerd.
- **Bestandsnamen** precies zoals bij elke prompt staat. Daarmee plaatst de app ze automatisch.
- **Herkomst:** noteer per bestand `bestandsnaam · Gemini · datum` in `assets/brand-originals/bron.txt`.
- **Tekst in beeld:** laat Gemini **geen** tekst, logo's of prijzen in foto's zetten; die komen er in de app of in Canva/Figma overheen. Uitzondering: de logo-ontwerpronde.
- **AI-label:** elk beeld met een mens krijgt in de app en in advertenties het label "Beeld gemaakt met AI" (EU AI Act).

---

## 1. Masterbriefing (plak dit als eerste bericht in elke chat)

> You are the art director and photographer for **KULØRT · NYANSE**, a Dutch atelier for personal colour (website kulort-nyanse.com). Two sister brands under one maison: **KULØRT** for men and **NYANSE** for women, for ages 18 to 65. The product: your personal colour profile from one selfie, a style guide with your 30 colours and outfits, and a physical colour card.
>
> **Brand feeling:** light, clean, sharp, modern atelier, haute couture but accessible and inviting. Think of a quiet tailoring atelier in Amsterdam with tall windows and daylight; the restraint of COS, The Row and Aesop, the warmth of a Scandinavian home. Never loud, never cheap, never cliché stock photography.
>
> **Visual rules for every image in this conversation:**
> - Light and airy: warm ivory paper (#F6F2EC), soft natural daylight, gentle shadows, lots of negative space.
> - The **person's own colours are the hero**; everything around them is neutral (ivory, stone, warm grey, natural linen, light oak).
> - Photorealistic, true-to-life colour, neutral white balance (5500K), no filters, no heavy grading, no HDR look.
> - Real people: visible skin texture, natural features, diverse skin tones, ages and body types; respectful, no stereotypes; never resembling a celebrity or real person.
> - Editorial composition with intentional negative space for text (I will add text later).
> - **Never:** text, letters, logos, watermarks, price tags, brand names, extra hands, distorted fingers, plastic skin, oversaturated colour, busy backgrounds, glossy commercial look.
>
> Reply only "Ready" and wait for my brief.

---

## 2. Logo-ontwerpronde (chat: "Logo")

**Doel:** concepten om uit te kiezen. Gemini is slecht in precieze letters, dus gebruik dit voor de **richting**. Het definitieve logo zet ik om naar vector (SVG).

**Briefing (na de Masterbriefing):**
> Now you are a brand identity designer. Create logo concepts as clean vector-style artwork, black (#141414) on warm ivory (#F6F2EC), centred, generous margins, square 1:1, no mockups, no 3D, no gradients. Each concept must stay legible at 16 px and work in one colour. The two brands must look like siblings from one fashion house. Reply "Ready".

**Prompts (per concept 3 varianten):**

*KULØRT*
- `KUL-A`: `Wordmark "KULØRT" in a wide, light, geometric sans-serif in uppercase with generous letter-spacing. The Ø is the signature: its slash is a single thin cognac-brown (#8A4A26) stroke, slightly longer than the letter, like a tailor's chalk line. Everything else black.`
- `KUL-B`: `Wordmark "KULØRT" in a refined high-contrast serif in uppercase, tight but elegant spacing, like a Savile Row tailor's label. The Ø slash is a fine stroke.`
- `KUL-C`: `A monogram "Ø" inside a thin circular stitch line (like a tailor's button), next to the wordmark "KULØRT" in a clean wide sans-serif. Monogram and wordmark must also work separately.`

*NYANSE*
- `NYA-A`: `Wordmark "NYANSE" in a high-contrast Didone serif (Bodoni-like) in uppercase, with sturdy hairlines so it stays readable at small sizes, letter-spacing about 0.2em. Elegant like a couture house.`
- `NYA-B`: `Wordmark "nyanse" in an elegant lowercase serif with one subtle detail: the descender of the "y" extends into a fine thread-like line. Lipstick red (#B8234F) only on that thread, the rest black.`
- `NYA-C`: `A monogram "N" made of two fine vertical strokes and one diagonal like a fabric fold, next to the wordmark "NYANSE" in a refined Didone serif. Monogram and wordmark must also work separately.`

*Maison (beide samen)*
- `MAI-A`: `Lock-up of the two brands as a pair: "KULØRT" and "NYANSE" side by side, separated by a thin vertical line, both in matching visual weight, with a small line underneath in a quiet sans-serif placeholder (no real text needed). Like the label of a fashion house with a men's and a women's line.`

**Kies:** één KULØRT, één NYANSE en een maison-variant. Zet de beste beelden in `assets/brand-originals/logo/` en vertel me je keuze, dan maak ik het logosysteem.

---

## 3. Kleurportretten per leeftijd (chats: "Portret KULØRT" en "Portret NYANSE")

**Technische beelden** voor het kleurdoek in de app. Plak na de Masterbriefing de **shootbriefing (blok A) uit [AI-BEELDEN.md](../fase-b/AI-BEELDEN.md)**; die gaat voor op de sfeerregels. Begin elke volgende persoon met: *"Same photoshoot, same light, background, camera and framing. New person:"*

Per merk en leeftijd drie huidtinten (licht, midden, diep), zodat iedereen zich herkent. Bestaande beelden blijven de kern (23–44).

**KULØRT**

| Bestand | Prompt |
|---|---|
| `kulort-jong-1.jpg` | `Person: a 19-year-old Dutch man with fair skin, short light-brown hair with natural texture, clean-shaven, green-grey eyes. Easy-going, confident expression.` |
| `kulort-jong-2.jpg` | `Person: a 20-year-old Moroccan-Dutch man with light-medium olive skin, short black hair with a low fade, very light stubble, dark-brown eyes. Friendly, self-assured expression.` |
| `kulort-jong-3.jpg` | `Person: a 19-year-old Ghanaian-Dutch man with deep brown skin rendered with rich detail and correct exposure, short black twists, clean-shaven, dark-brown eyes. Relaxed, open expression.` |
| `kulort-40-1.jpg` | `Person: a 50-year-old Dutch man with fair-medium skin, short salt-and-pepper hair, a trimmed grey beard, grey-green eyes. Relaxed, trustworthy expression.` |
| `kulort-40-2.jpg` | `Person: a 47-year-old Turkish-Dutch man with medium olive skin, short dark hair greying at the temples, clean-shaven, dark-brown eyes. Friendly, composed expression.` |
| `kulort-40-3.jpg` | `Person: a 56-year-old Surinamese-Dutch man with deep brown skin rendered with rich detail and correct exposure, close-cropped grey hair, short grey beard, dark-brown eyes. Calm, distinguished expression.` |

**NYANSE**

| Bestand | Prompt |
|---|---|
| `nyanse-jong-1.jpg` | `Person: a 19-year-old Dutch woman with fair skin, light freckles, straight dark-blonde hair tucked behind the ears, blue-grey eyes, no make-up look. Open, friendly expression.` |
| `nyanse-jong-2.jpg` | `Person: a 20-year-old Surinamese-Dutch woman with medium-deep brown skin rendered with rich detail and correct exposure, natural black curly hair tied back, dark-brown eyes, minimal natural make-up. Bright, relaxed expression.` |
| `nyanse-jong-3.jpg` | `Person: a 21-year-old Indonesian-Dutch woman with warm light-medium skin, straight black hair in a low ponytail, dark-brown eyes, minimal natural make-up. Cheerful, calm expression.` |
| `nyanse-40-1.jpg` | `Person: a 49-year-old Dutch woman with fair skin and natural silver-grey shoulder-length hair tucked behind the ears, light blue-grey eyes, fine natural lines around the eyes, minimal natural make-up. Calm, confident expression.` |
| `nyanse-40-2.jpg` | `Person: a 52-year-old Black Dutch woman with deep brown skin rendered with rich detail and correct exposure, short natural grey-black curly hair, dark-brown eyes, minimal natural make-up. Warm, self-assured expression.` |
| `nyanse-40-3.jpg` | `Person: a 58-year-old Moroccan-Dutch woman with medium olive skin, dark hair with natural grey streaks in a low bun, dark-brown eyes, minimal natural make-up. Serene, kind expression.` |

**Extra controle:**
- 45+: echte lijnen, geen verjongde huid, grijs haar neutraal grijs (zonder gele of blauwe zweem).
- 18–22: echt 19–21 jaar, geen tieners.

**Plaatsen:**
1. Zet de beelden in `public/brand/people/` en vul `bron.txt` aan.
2. Draai `npm run build`, dan `npm start`, dan `BASE_URL=http://localhost:3000 node scripts/measure-people.mjs`.
3. Ons model meet ze en kiest de doeken.

---

## 4. Campagne en sfeer (chat: "Campagne")

**Briefing (na de Masterbriefing):**
> Editorial campaign photography for the maison. Location: a light Amsterdam atelier with tall windows, white plaster walls, light oak floor, linen curtains, a clothing rail with garments in coordinated colours, a large table with fabric swatches and a colour fan deck. Natural daylight from the side. Models are real, diverse people. Composition: 3:2 or 4:5, subject off-centre with clean negative space on one side for text. Reply "Ready".

### 4A. Maison-homepage (de eerste indruk van kulort-nyanse.com)

| Bestand | Formaat | Prompt |
|---|---|---|
| `maison-hero-1.jpg` | 16:9 en 4:5 | `A man (mid-30s) and a woman (early 40s), not a couple, simply two clients in the atelier, each holding a fabric swatch in a flattering colour under the chin and looking into a tall standing mirror. He holds deep teal, she holds soft rose. Between them on the table: an open colour fan deck and a small dark colour card. Calm, joyful recognition, the moment of "this is my colour". Warm ivory tones, lots of air on the left for text.` |
| `maison-hero-2.jpg` | 16:9 en 4:5 | `Still life on warm ivory paper: an open colour fan deck in muted autumn and cool winter colours, a small matte dark colour card (credit-card size, no text), a folded cream linen shirt and a soft knit in deep green, a tailor's measuring tape, morning daylight from the top left. Space at the top for text.` |
| `maison-door-kulort.jpg` | 4:5 | `A man (around 30) in the atelier choosing between two shirts on the rail, holding a navy shirt against himself, relaxed and confident, side light. Space at the bottom for text.` |
| `maison-door-nyanse.jpg` | 4:5 | `A woman (around 35) in the atelier holding a soft blouse in her colour against herself in front of a mirror, a colour fan deck in her other hand, calm and pleased. Space at the bottom for text.` |

### 4B. Per merk en leeftijd (landing, advertenties, mail)

Eén beeld per combinatie, plus een variant met een diepere huidtint. Bestandsnaam: `{merk}-{leeftijd}-campagne-{n}.jpg` (leeftijd: `jong`, `jv`, `vol`, `40`).

| Merk · leeftijd | Scène (vul in na: `Campaign photo:`) |
|---|---|
| KULØRT · jong | `a 20-year-old man at home in front of the mirror before a night out, trying a deep green overshirt, his phone on the dresser showing nothing readable. Natural, a bit playful.` |
| KULØRT · jongvolwassen | `a 26-year-old man on his first day at a new job, adjusting a light blue oxford shirt under a navy blazer in a bright hallway, confident.` |
| KULØRT · volwassen | `a 38-year-old man choosing a knit in a warm camel from a neatly folded stack in a light store-like atelier, calm and decisive.` |
| KULØRT · 45+ | `a 52-year-old man with a grey beard in a charcoal coat over a burgundy knit, walking along an Amsterdam canal in morning light, relaxed and distinguished.` |
| NYANSE · jong | `a 19-year-old woman with two friends in a bright student room, holding up a soft lilac top, laughing, colour fan deck on the bed.` |
| NYANSE · jongvolwassen | `a 25-year-old woman getting ready for work, choosing between two blouses (one in her colour, warm coral; one in a dull grey) in front of a mirror, morning light.` |
| NYANSE · volwassen | `a 37-year-old woman in a calm wardrobe with a capsule collection in her colours (teal, rust, cream, olive) on the rail, touching a silk scarf, serene.` |
| NYANSE · 45+ | `a 54-year-old woman with silver hair in a cobalt blouse and pearl earrings at a café table by a window, glowing, self-assured.` |

---

## 5. De seizoenen: 4 hoofdseizoenen en 12 kleurtypen (chat: "Seizoenen")

**Ons systeem:** 4 hoofdseizoenen (Lente, Zomer, Herfst, Winter), met elk 3 kleurtypen, samen **12**. ("4 + 8" telt dus als 12 typen.) De kleuren hieronder komen **uit onze eigen kleurmotor**, zodat de beelden kloppen met wat de app en de gids tonen.

**Briefing (na de Masterbriefing):**
> Still-life photography of colour stories for a fashion house. On warm ivory paper (#F6F2EC): folded fabric swatches (silk, wool, linen, knit) and a fanned colour deck showing exactly the colours I give you, plus 1–2 seasonal natural objects. Top-down or 45 degrees, soft daylight from the top left, gentle shadows, lots of air. Colours must be true to the hex values. No text, no people. Square 1:1 and a 4:5 version. Reply "Ready".

**Hoofdseizoenen** (`family-{naam}.jpg`):
- `family-lente.jpg`: `Colour story SPRING: warm, clear and light. Colours: #F3A27A, #E8C468, #8FBF6A, #2BB3A8, #FF6F61, #F4E3A1. Natural objects: a sprig of blossom, a fresh lemon leaf.`
- `family-zomer.jpg`: `Colour story SUMMER: cool, soft and airy. Colours: #F0B7C8, #AFC6E0, #A6879C, #7FA39B, #5B7DB1, #BDB3DD. Natural objects: a sprig of lavender, a pale sea shell.`
- `family-herfst.jpg`: `Colour story AUTUMN: warm, deep and earthy. Colours: #A0522D, #556B2F, #B9926B, #2E6B5E, #6E1F2A, #E0A96D. Natural objects: an oak leaf, a chestnut.`
- `family-winter.jpg`: `Colour story WINTER: cool, clear and high-contrast. Colours: #1B2A5C, #B0103A, #009B77, #6A2C91, #FFFFFF, #3A3D45. Natural objects: a sprig of pine, a smooth dark stone.`

**12 kleurtypen** (`season-{sleutel}.jpg`). Prompt: `Colour story {TYPE}: {karakter}. Colours: {hex}. {object}.`

| Bestand | Type | Karakter | Kleuren (uit de motor) | Object |
|---|---|---|---|---|
| `season-lightSpring.jpg` | LIGHT SPRING | light, warm, delicate | #F3A27A #F4E3A1 #E8C468 #8FBF6A #F4A3A0 #F6CBA8 #C3B1E1 #A8DDBE | a pale blossom |
| `season-warmSpring.jpg` | WARM SPRING | golden, warm, fresh | #A6A04C #E58A5B #C79A5E #4E86C4 #2BB3A8 #9A6230 #F7A168 #79B94B | a marigold |
| `season-brightSpring.jpg` | BRIGHT SPRING | clear, warm, vivid | #2F6FDE #F75D9E #8E5BD6 #E6194B #FF6F61 #FF8C1A #00A86B #8FD14F | a tulip |
| `season-lightSummer.jpg` | LIGHT SUMMER | light, cool, soft | #F0B7C8 #CFA9D6 #BDB3DD #A9D8CF #AFC6E0 #CF9DA4 #7FA8C9 #9AA9C9 | a sweet pea |
| `season-coolSummer.jpg` | COOL SUMMER | cool, gentle, blue-based | #5B7DB1 #4F8F8B #E3A1B9 #7E9DB8 #3E6E9C #6D6E8C #8C6BAE #C25B86 | a hydrangea head |
| `season-softSummer.jpg` | SOFT SUMMER | muted, cool, smoky | #7D8471 #5E6A7A #9A8F8A #A6879C #6E5468 #7FA39B #4F6886 #8FA3B8 | dried eucalyptus |
| `season-softAutumn.jpg` | SOFT AUTUMN | muted, warm, earthy | #3F6A6A #6B4B38 #7A7449 #A89A72 #B67C73 #6D7A4C #B9926B #D49A82 | dried grasses |
| `season-warmAutumn.jpg` | WARM AUTUMN | rich, warm, spicy | #2E6B5E #556B2F #A0522D #8B4513 #7B3F00 #E0A96D #9E2A2B #6B8E23 | a cinnamon stick |
| `season-deepAutumn.jpg` | DEEP AUTUMN | deep, warm, intense | #6E1F2A #5A2F3F #4E3022 #2F4F3A #5B5A2E #1F5C63 #8E5432 #3B2F2F | a dark fig |
| `season-deepWinter.jpg` | DEEP WINTER | deep, cool, dramatic | #3A2A6B #1B2A5C #3F1A44 #0B6B4F #9E0F35 #1E50B4 #00848C #C2177A | a blackberry sprig |
| `season-coolWinter.jpg` | COOL WINTER | cool, clear, icy | #0E4C92 #0F3D8C #009B77 #B0103A #6A2C91 #1F4FC4 #D61A7F #3A3D45 | a frosted leaf |
| `season-brightWinter.jpg` | BRIGHT WINTER | vivid, cool, high-contrast | #FF1493 #DC143C #7B2CBF #0047AB #9B111E #F9E000 #2E3A87 #00A693 | a single anemone |

**Controle:** houd het beeld naast de hexwaarden. Wijkt een kleur zichtbaar af, gebruik dan correctie 9.2.

---

## 6. Het cadeau: waaier, pas en verpakking (chat: "Product")

**Briefing (na de Masterbriefing):**
> Premium product still life for the maison's colour card and packaging. Matte materials, true colours, soft daylight, warm ivory background, the feeling of unwrapping a gift from a fashion house. No text or logos on any object (I add them later). Reply "Ready".

| Bestand | Prompt |
|---|---|
| `product-pass-front.jpg` | `A matte credit-card-sized colour card in deep charcoal (#121316) lying on ivory paper at a slight angle; on the card a single row of 8 colour chips (#3F6A6A #6B4B38 #7A7449 #A89A72 #B67C73 #6D7A4C #B9926B #D49A82), plus one white and one mid-grey chip. Clean empty area at the top left for a logo.` |
| `product-envelope.jpg` | `An ivory envelope with a deep charcoal card sliding out halfway, a fold of tissue paper, a thin cognac ribbon, top-down, gift-like.` |
| `product-wallet.jpg` | `A hand (natural, correct fingers) taking a dark colour card from a leather wallet in a fitting room; soft light, a garment rail blurred behind.` |
| `product-fan.jpg` | `A colour fan deck opened in a half circle on ivory paper, blades in a soft summer palette, a silver pin at the pivot, top-down.` |
| `product-fitting.jpg` | `A colour card held next to a sweater sleeve on a store rail to compare colours, close-up, natural light.` |
| `product-guide.jpg` | `An A4 style guide booklet with an ivory cover and a single vertical colour stripe on the right, lying on an oak table with a fabric swatch and reading glasses; cover left blank for typography.` |

---

## 7. Advertenties (chat: "Ads")

**Regels (uit het brandbook):**
- Formaten 9:16 (Reels/Stories/TikTok), 4:5 (feed), 1:1.
- Veilige zone: bovenste 14% en onderste 20% vrij van belangrijke beelddelen.
- Maximaal 7 woorden in beeld (zet je zelf in de editor), logo boven of onder.
- AI-label in de advertentietekst.
- **Nooit** onzekerheid als haakje, nooit ongemeten cijfers, geen bekende mensen.

**Briefing (na de Masterbriefing):**
> Social ad visuals for the maison, vertical-first. Clean, light, editorial, scroll-stopping through colour and emotion, not through loudness. Keep the top 14 percent and bottom 20 percent free of key elements for platform UI and text. No text in the image. Reply "Ready".

**Vier advertentieconcepten** (maak elk per merk en per leeftijd door de persoon te wisselen):

| Concept | Bestand | Prompt |
|---|---|---|
| **Het verschil** (voor/na met een doek) | `ad-{merk}-{leeftijd}-verschil.jpg` | `A split portrait of one person (same photo both halves), left half with a dull, washed-out colour cloth under the chin, right half with a vivid flattering colour cloth; a thin white vertical line in the middle; neutral background #D9D3CC. The difference must come only from the cloth colour, the face is identical.` |
| **Het cadeau** | `ad-{merk}-cadeau.jpg` | `Close-up of hands opening an ivory envelope, a dark colour card sliding out with a row of colour chips, tissue paper, warm daylight, anticipation.` |
| **De kast** | `ad-{merk}-{leeftijd}-kast.jpg` | `A tidy wardrobe rail where every garment is in one harmonious personal palette (give 6 hex colours from the person's season), one person reaching for a piece with a relieved smile, light and calm.` |
| **De paskamer** | `ad-{merk}-{leeftijd}-paskamer.jpg` | `In a fitting room, a person compares a garment with a small dark colour card in their hand, confident decision, soft store light.` |

**Teksten voor in de editor (voorbeelden, maximaal 7 woorden):**
- KULØRT: "Welke kleuren staan jou écht?" · "Je eerste indruk, geregeld." · "Eén selfie. Je kleuren. Je kast."
- NYANSE: "Welke kleuren laten jou stralen?" · "Minder kopen, beter kiezen." · "Kleuren die passen bij wie je nu bent." (45+)

---

## 8. Kleding en stijlgids (chat: "Kleding")

- **Kleding om om te kleuren:** volg [AI-FLATLAY.md](../fase-b/AI-FLATLAY.md) (grijze stukken op wit). Voeg voor NYANSE toe: `nyanse-wide.png` (`Women's high-waisted wide-leg trousers, folded once so the full length shows.`) en `nyanse-blouse-soft.png` (`A women's fluid blouse with a soft round collar, no pocket, buttoned.`).
- **Stijlgids-sfeer** (`guide-texture-{n}.jpg`, 4:5):
  - `Close-up of ivory linen fabric with soft folds, daylight` (cover-achtergrond)
  - `Close-up of a stack of folded knits in neutral stone tones` (hoofdstukscheiding)
  - `Close-up of a tailor's chalk, measuring tape and a fabric swatch on ivory paper` (pagina "Zo draag je het")
- **Accessoires** (alleen als sfeer, 1:1): `Flat lay of a minimalist watch with a cognac strap, a leather belt and gold cufflinks on ivory paper` (KULØRT) · `Flat lay of fine gold jewellery, a structured cognac bag and a silk scarf on ivory paper` (NYANSE).

---

## 9. Correcties (één per keer)

| # | Probleem | Prompt |
|---|---|---|
| 9.1 | Plastic huid | `Keep everything identical, but make the skin realistic: visible pores, fine lines, natural unevenness.` |
| 9.2 | Kleuren wijken af | `Keep everything identical, but match these exact colours: {hex list}. Neutral white balance.` |
| 9.3 | Te druk of commercieel | `Keep the subject, but simplify: fewer objects, more empty space, softer daylight, calmer and more editorial.` |
| 9.4 | Tekst of logo verschenen | `Remove all text, letters and logos. Keep everything else identical.` |
| 9.5 | Handen of vingers vreemd | `Keep everything identical, but fix the hands: natural anatomy, five fingers, relaxed pose.` |
| 9.6 | Te weinig ruimte voor tekst | `Keep the subject, but reframe with more empty space on the {left/top} for text.` |
| 9.7 | Lijkt op een bekend persoon | Opnieuw beginnen met een andere persoonsbeschrijving. |
| 9.8 | Kleurzweem (geel of blauw) | `Keep everything identical, but correct to neutral daylight white balance.` |

## 10. Aanleveren en controle

**Mappen:**
- `assets/brand-originals/{logo,portret,campagne,seizoenen,product,ads,kleding,gids}/`: originelen (niet in git);
- `public/brand/people/`: alleen de kleurportretten (deel 3).

De rest plaats ik zelf, in het juiste formaat en gecomprimeerd.

**Controle per beeld:**
- [ ] Licht, rustig, veel lucht; past naast de rest (zelfde papier, licht en sfeer).
- [ ] De kleuren kloppen met de hexwaarden; de huidskleur is echt.
- [ ] Geen tekst, logo's of watermerken; handen zijn goed.
- [ ] Divers en passend bij de leeftijd; geen gelijkenis met bekende mensen.
- [ ] Herkomst genoteerd in `bron.txt`.

**Laat me weten** welke delen klaar zijn. Daarna:
1. het logosysteem in vector;
2. de nieuwe maison-homepage;
3. de merkpagina's in de nieuwe huisstijl;
4. de beelden geplaatst.

---

## 11. Outfit-sfeerfoto's per kleurtype (to-do, 14 oktober)

**Doel:** per kleurtype twee complete, hippe outfits, één voor hem (KULØRT) en één voor haar (NYANSE), inclusief accessoires. Voor op het resultaat, in de stijlgids en in advertenties. 12 kleurtypen × 2 = **24 beelden**. Je noemde 9; dat zijn er minder dan we kleurtypen hebben. Wil je beginnen met één familie, neem dan eerst de 6 van Herfst en Winter: die komen in onze tests het meest voor.

**Werkwijze:** een nieuwe chat "Outfits". Plak eerst de Masterbriefing (deel 1), daarna deze briefing, dan één prompt per keer.

> Editorial flat-lay styling photography for a fashion house. One complete, current, stylish outfit laid out from above on warm ivory paper (#F6F2EC) or light oak, styled by a top stylist: garments neatly arranged as if worn (top above bottom, shoes at the foot), with 2–3 accessories. Real fabrics and textures, soft daylight from the top left, gentle shadows, generous negative space. The colours must match the hex values I give as closely as possible; the whole outfit stays within that palette, with neutrals allowed for shoes, belt and bag. No people, no hands, no text, no logos, no brand labels. Square 1:1. Reply "Ready".

**Bestandsnaam:** `outfit-{merk}-{kleurtype}.jpg`, bijvoorbeeld `outfit-kulort-deepAutumn.jpg`. Zet ze in `assets/brand-originals/outfits/`.

| Kleurtype | KULØRT (hem): `Outfit for a man, colours {hex}:` | NYANSE (haar): `Outfit for a woman, colours {hex}:` |
|---|---|---|
| **Light Spring** · #F3A27A #F4E3A1 #E8C468 #8FBF6A #A8DDBE | apricot linen shirt, sand chinos, white leather sneakers, light tan woven belt, round tortoiseshell sunglasses | butter-yellow knit top, mint wide linen trousers, peach mules, small gold hoops, raffia bag |
| **Warm Spring** · #A6A04C #E58A5B #C79A5E #4E86C4 #2BB3A8 | cornflower-blue overshirt, camel trousers, salmon tee underneath, cognac suede loafers, gold watch | turquoise silk blouse, camel tailored trousers, salmon cardigan over the shoulders, tan sandals, gold chain necklace |
| **Bright Spring** · #2F6FDE #E6194B #FF6F61 #00A86B #FF8C1A | bright blue knit polo, white trousers, jade-green bomber, white sneakers, tortoiseshell sunglasses | coral midi dress, bright blue blazer, white sneakers, poppy-red lipstick-tone clutch, gold earrings |
| **Light Summer** · #F0B7C8 #AFC6E0 #A9D8CF #7FA8C9 #CFE5DD | powder-blue oxford shirt, light grey chinos, soft rose crewneck knit, white canvas sneakers, silver watch | powder-pink knit, sea-blue slip skirt, mint scarf, silver ballet flats, pearl studs |
| **Cool Summer** · #5B7DB1 #4F8F8B #3E6E9C #6D6E8C #C25B86 | denim-blue shirt, grey-blue tailored trousers, teal knit tie, navy suede derbies, silver watch | raspberry silk blouse, denim-blue wide trousers, grey-blue trench, silver loafers, silver hoops |
| **Soft Summer** · #7D8471 #5E6A7A #9A8F8A #A6879C #4F6886 | slate-grey overshirt, sage knit, cool taupe trousers, grey suede chelsea boots, brushed silver watch | mauve cashmere sweater, slate pleated midi skirt, soft taupe coat, grey suede loafers, pewter pendant |
| **Soft Autumn** · #3F6A6A #6B4B38 #7A7449 #A89A72 #B9926B | soft teal knit, khaki chinos, camel suede jacket, tobacco suede desert boots, brown leather belt | olive wrap blouse, khaki wide trousers, camel coat, warm salmon silk scarf, cognac loafers, gold bangle |
| **Warm Autumn** · #2E6B5E #556B2F #A0522D #8B4513 #E0A96D | olive field jacket, petrol-green knit, light camel chinos, cognac leather boots, cognac belt | rust-brown knit dress, olive trench, cognac knee boots, light camel bag, gold chain |
| **Deep Autumn** · #6E1F2A #2F4F3A #4E3022 #1F5C63 #5B5A2E | burgundy knit, forest-green corduroy trousers, chocolate suede jacket, dark brown leather boots, gold watch | burgundy silk blouse, chocolate leather midi skirt, forest-green coat, dark brown boots, gold earrings |
| **Deep Winter** · #3A2A6B #1B2A5C #0B6B4F #9E0F35 #1E50B4 | navy suit jacket, deep emerald roll-neck, black-navy trousers, black leather derbies, silver watch | deep emerald silk blouse, ink-blue tailored trousers, ruby clutch, black pointed pumps, silver drop earrings |
| **Cool Winter** · #0E4C92 #009B77 #B0103A #6A2C91 #3A3D45 | royal navy blazer, crisp white shirt, wine-red knit tie, charcoal trousers, black chelsea boots | emerald knit, charcoal pencil skirt, royal navy coat, wine-red bag, silver jewellery |
| **Bright Winter** · #DC143C #7B2CBF #0047AB #00A693 #2E3A87 | cobalt-blue knit, black slim trousers, white sneakers, crimson scarf, silver watch | crimson blazer, black wide trousers, bright white tee, cobalt bag, silver statement earrings |

**Controle:** houd elk beeld naast de hexwaarden. Een kleur die zichtbaar afwijkt corrigeer je met correctie 9.2. Daarna verwerk ik de beelden met het script en koppel ik ze per kleurtype.
