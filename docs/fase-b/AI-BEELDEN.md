# AI-beelden voor de landing (shotlist)

*Besluit van 13 oktober 2026: AI-gegenereerde mensen in plaats van illustraties.*

## Spelregels
1. **Één neutrale foto per persoon.** Iedereen draagt een effen lichtgrijs T-shirt. De app legt de kleurdoeken er zelf onder, net als bij een echte selfie. **Nooit een aparte "slechte" versie genereren of bewerken.** Dat zou misleidende reclame zijn.
2. **Geen gelijkenis met bekende mensen** (CLAUDE.md §12). Lijkt een beeld op iemand bekends? Dan weggooien.
3. **AI-label:** onder elk beeld in de app staat "Beeld gemaakt met AI" (EU AI Act art. 50). In advertenties geldt hetzelfde.
4. **Divers en natuurlijk:** echte huidstructuur, geen gladde retouche. Aantrekkelijk, maar herkenbaar en benaderbaar.
5. **Herkomst bewaren:** noteer per beeld het programma en de datum in `public/brand/people/bron.txt`.

## Aanleveren
- **Formaat:** JPG of PNG, staand 4:5, minimaal 1200×1500 pixels.
- **Bestandsnamen:** `kulort-1.jpg` t/m `kulort-4.jpg` en `nyanse-1.jpg` t/m `nyanse-4.jpg`.
- **Map:** `public/brand/people/` in de projectmap. Ik meet daarna automatisch per beeld de gezichtspositie en de kleuren, en kies de doeken.

## Basisprompt (plak dit, en vervang alleen de regel tussen [ ])

> Photorealistic studio portrait for a fashion colour-analysis app. [PERSON]. Head and shoulders, facing the camera straight on, relaxed natural expression with a slight smile, eyes looking into the lens. Wearing a plain light-grey crew-neck T-shirt. Soft, even daylight from the front (large window), no harsh shadows, no colour cast, neutral white balance. Plain warm light-grey background. Natural skin texture with pores, no heavy retouching, no visible make-up look, no jewellery, no glasses, no hat. Framing: vertical 4:5, face centred horizontally, eyes at about 38% from the top, face about 40% of the image width, shoulders fully visible at the bottom. 85mm lens, f/4. Attractive, approachable, natural. Not a celebrity and not resembling any real person. No text, no logo, no watermark.

## Personen

**KULØRT (mannen)**
1. `A 27-year-old Dutch man with fair skin and light freckles, short ash-blond hair, light stubble`
2. `A 33-year-old Moroccan-Dutch man with medium olive-brown skin, short dark-brown hair, a neatly trimmed short beard`
3. `A 30-year-old Black Dutch man with deep brown skin, short black hair in a low fade, clean-shaven`
4. `A 38-year-old Indonesian-Dutch man with warm light-medium skin, straight black hair with a side part, clean-shaven`

**NYANSE (vrouwen)**
1. `A 26-year-old Dutch woman with fair skin and natural copper-auburn shoulder-length hair`
2. `A 34-year-old woman with warm light-medium skin and dark-brown hair in a low bun`
3. `A 29-year-old Black woman with deep brown skin and natural curly hair tied back`
4. `A 41-year-old South Asian woman with medium brown skin and long black hair worn back`

## Controle vóór gebruik
- [ ] Huid ziet er natuurlijk uit (geen plastic-effect) en de handen of tanden zijn niet vreemd
- [ ] Neutraal licht: geen blauwe of oranje zweem (kijk naar het grijze T-shirt)
- [ ] Schouders volledig in beeld (daar komt het kleurdoek)
- [ ] Lijkt niet op een bekend persoon
- [ ] Programma en datum genoteerd in `bron.txt`
