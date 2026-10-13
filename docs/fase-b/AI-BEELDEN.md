# AI-beelden voor de landing (shotlist en prompts)

*Besluit van 13 oktober 2026: AI-gegenereerde mensen in plaats van illustraties. Prompts uitgewerkt op 13 oktober.*

## Waarom deze prompts zo specifiek zijn
De app legt zelf een kleurdoek onder de kin en meet de huid. Daarvoor moet elk beeld:
- **kleurecht** zijn: neutrale witbalans, geen filter of color grading. Anders meet onze analyse de filter en niet de persoon.
- **gelijk gekadreerd** zijn, zodat de gezichten in de hero op dezelfde plek staan;
- **een effen lichtgrijs T-shirt** hebben, met de schouders volledig in beeld. Daar komt het doek.
- **echt ogen**: zichtbare huidstructuur, geen gladde AI-huid. Een plastic gezicht ondermijnt het vertrouwen in een product dat over huid gaat.

## Spelregels
1. **Eén neutrale foto per persoon.** Nooit een aparte "slechte" versie genereren of bewerken. Het doek komt van de app.
2. **Geen gelijkenis met bekende mensen** (CLAUDE.md §12). Lijkt iemand op een bekend persoon? Dan weggooien.
3. **AI-label** onder het beeld, in de app en in advertenties (EU AI Act art. 50). Dit staat al in de code.
4. **Herkomst:** noteer per beeld het programma en de datum in `public/brand/people/bron.txt`.

## Welke tool?
- **Gemini (Nano Banana / Imagen):** de beste huidstructuur en de beste kleurechtheid bij donkere huid. Kies beeldverhouding **4:5**. Het beste voor dit doel.
- **ChatGPT (beeldgeneratie):** volgt kadrering en kleding precies. Kies **staand** (2:3); wij snijden zelf bij naar 4:5. Voegt C2PA-herkomstgegevens toe; dat is prima, laat ze staan.
- **Visueel watermerk:** heeft het beeld er een, snijd het dan **niet** weg. Genereer opnieuw, of gebruik de andere tool. Wegknippen schuurt met de transparantie die we beloven.

## Werkwijze (±45 minuten voor alle 8)
1. **Open één nieuwe chat per merk** (één voor de mannen, één voor de vrouwen). Binnen een chat houdt het model licht en stijl beter gelijk.
2. **Plak eerst de shootbriefing** (blok A hieronder). Zeg er niets bij.
3. **Plak daarna persoon 1** (blok B). Laat 2 à 3 varianten maken en kies de beste.
4. **Ga verder met** *"Same photoshoot, same light, background, camera and framing. New person:"* gevolgd door de volgende persoonregel.
5. **Corrigeer** met de correctieprompts (blok C) als iets niet klopt. Altijd één correctie per keer.
6. **Download op de hoogste resolutie** en geef de bestanden de juiste naam (zie Aanleveren).

---

## A. Shootbriefing (één keer plakken, aan het begin van de chat)

> You are a professional portrait photographer shooting a consistent series of photorealistic head-and-shoulders portraits for a colour-analysis app. Every portrait in this conversation must follow this exact brief unless I say otherwise:
>
> **Camera and light:** full-frame camera, 85mm lens at f/4, eye level. One large soft window light directly in front of the subject, slightly above eye level, plus a white reflector below the chin. Even light on both cheeks, no hard shadows, no rim light, no dramatic contrast.
>
> **Colour:** true-to-life skin tones, neutral white balance (5500K daylight), no colour grading, no filter, no warm or cool cast, no beauty-filter smoothing. The grey T-shirt must look neutral grey.
>
> **Skin:** realistic skin texture with visible pores, fine lines and small natural imperfections; matte, no oily shine; no make-up look unless stated; no retouching beyond what a magazine would do for an honest portrait.
>
> **Styling:** plain light-grey crew-neck cotton T-shirt, no logo; no jewellery, no glasses, no hat, no accessories.
>
> **Pose and framing:** facing the camera straight on, shoulders square, relaxed natural expression with a slight closed-mouth smile, eyes looking into the lens. Vertical 4:5. Face centred horizontally, eyes at about 38% from the top of the frame, face width about 40% of the image width, both shoulders fully visible at the bottom edge.
>
> **Background:** seamless plain warm light-grey paper backdrop (#D9D3CC), evenly lit, no gradient, no props.
>
> **People:** ordinary attractive, approachable people as in a premium clothing brand's campaign; not models with exaggerated features; not celebrities and not resembling any real or famous person. Respectful, natural, no stereotypes.
>
> **Never:** text, logos, watermarks, borders, extra people, hands in frame, cropped shoulders, heavy bokeh.
>
> Reply only "Ready" and wait for the first person.

## B. Personen (één tegelijk plakken)

**Chat 1: KULØRT (mannen)**

1. `Person: a 27-year-old Dutch man with fair skin and light freckles on the nose, short ash-blond hair with a natural texture, light stubble, light grey-blue eyes. Lean face.`
2. `Person: a 33-year-old Moroccan-Dutch man with medium olive-brown skin, short dark-brown hair cut short on the sides, a neatly trimmed short beard, dark-brown eyes. Warm, confident expression.`
3. `Person: a 30-year-old Black Dutch man with deep brown skin rendered with rich detail and correct exposure (not underexposed, no shine), short black hair in a low fade, clean-shaven, dark-brown eyes. Calm, friendly expression.`
4. `Person: a 38-year-old Indonesian-Dutch man with warm light-medium skin, straight black hair with a few grey strands and a side part, clean-shaven, dark eyes. Relaxed, trustworthy expression.`

**Chat 2: NYANSE (vrouwen)**

1. `Person: a 26-year-old Dutch woman with fair skin and light freckles, natural copper-auburn shoulder-length hair tucked behind the ears so the neck and shoulders are visible, green-hazel eyes, no make-up look.`
2. `Person: a 34-year-old woman with warm light-medium skin, dark-brown hair in a low bun, brown eyes, minimal natural make-up.`
3. `Person: a 29-year-old Black woman with deep brown skin rendered with rich detail and correct exposure (not underexposed, no shine), natural curly hair tied back, dark-brown eyes, minimal natural make-up.`
4. `Person: a 41-year-old South Asian woman with medium brown skin, long black hair worn back off the shoulders, dark-brown eyes, minimal natural make-up. Calm, self-assured expression.`

Voor elke volgende persoon in dezelfde chat zet je ervoor: *"Same photoshoot, same light, background, camera and framing. New person:"*

## C. Correctieprompts (één per keer)
| Probleem | Plak dit |
|---|---|
| Plastic, te gladde huid | `Keep everything identical, but make the skin texture more realistic: visible pores, fine lines, natural unevenness. Remove the smoothing.` |
| Oranje of blauwe zweem | `Keep everything identical, but correct the white balance to neutral daylight: the T-shirt must be neutral grey and skin tones true to life.` |
| Donkere huid te donker of glimmend | `Keep everything identical, but expose the face correctly: lift the shadows so the skin shows rich detail, matte finish, no shine.` |
| Schouders afgesneden of hoofd te groot | `Keep the same person, light and background, but zoom out slightly so both shoulders are fully visible and the face is about 40% of the image width.` |
| Schaduw op één kant | `Keep everything identical, but make the light perfectly even on both cheeks, as if the window is directly in front.` |
| Te "model"-achtig | `Keep the same person, but make them look more like a real everyday person in a premium clothing campaign: less symmetry, more natural features.` |
| Lijkt op een bekend persoon | Begin opnieuw met een andere persoonregel, bijvoorbeeld een andere leeftijd of kapsel. |

## Aanleveren
- **Formaat:** JPG of PNG, minimaal 1200×1500 pixels. Een staand 2:3-beeld uit ChatGPT is ook goed, wij snijden bij.
- **Bestandsnamen:** `kulort-1.jpg` t/m `kulort-4.jpg` en `nyanse-1.jpg` t/m `nyanse-4.jpg`, in de volgorde van de lijst hierboven.
- **Map:** `public/brand/people/`, plus `bron.txt` met per regel `bestandsnaam · programma · datum`.
- **Daarna:** zeg het me, of draai zelf `npm run build`, dan `npm start` en in een tweede terminal `BASE_URL=http://localhost:3000 node scripts/measure-people.mjs`. Het script meet elk gezicht en kiest de doekkleuren met onze eigen analyse. Een beeld met een slechte meting (bijvoorbeeld kleurzweem) wordt overgeslagen en gemeld.

## Controle vóór gebruik
- [ ] De huid oogt echt (geen plastic), tanden en oren kloppen
- [ ] Het T-shirt is neutraal grijs (geen zweem)
- [ ] Beide schouders volledig in beeld
- [ ] Gelijk licht op beide wangen
- [ ] Lijkt niet op een bekend persoon
- [ ] Geen zichtbaar watermerk weggeknipt
- [ ] Programma en datum genoteerd in `bron.txt`
