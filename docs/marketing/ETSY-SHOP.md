# Etsy-shop: teksten, beelden en video

*20 oktober 2026. Beelden en video maken: `npx tsx scripts/make-etsy.ts`, daarna `npx tsx scripts/make-etsy-shop.ts`. Alles komt in `assets/etsy/_shop/`. Alles in het Engels; de prijzen staan in euro's.*

## Wat de concurrentie doet, en waar wij winnen

**Wat ik zag (FEIT, op 20 oktober 2026, met zoekresultaten van Etsy):**
- De meeste winkels verkopen een losse PDF, een digitale kleurwaaier of een lijst met hex-codes.
- De prijzen lopen van ongeveer $3 tot $25.
- De winkels met de meeste reviews (300 tot 500) verkopen **bundels**: palet, make-up en kleurwaaier.
- Bijna alles is alleen voor vrouwen.

**Waar wij anders zijn:**
- **Voor haar én hem in één gids.** Dat ziet bijna niemand anders.
- **Het effect laten zien:** zelfde gezicht, ander doek. Dat is de belofte in één beeld.
- **Echte pagina's in de foto's én in een video.** Bij een winkel zonder reviews is dat het sterkste bewijs dat je hebt.
- **Vier duidelijke pakketten per seizoen**, met een vergelijking op elke listing.
- **Elk palet is berekend** met de kleurmotor van de site, niet overgenomen van een kaart.

## 1. Shop title (tagline, maximaal 55 tekens)

**Advies:** `Seasonal colour guides for women & men · instant PDF` (52 tekens)

Google gebruikt de shop title als titel van je winkelpagina. Zoekwoorden werken daar dus beter dan een slogan.

Alternatieven:
- `Same face. Different colour. Find your palette.` (46)
- `Your colours, ready to use. For her and for him.` (48). Die staat al op de banner.

## 2. Announcement (bovenaan je winkel)

```
Welcome! We're new on Etsy, so there are no reviews here yet. That's why every listing shows the real pages, in the photos and in the video, so you know exactly what you get.

Every season comes in four packages: the Palette Card, the Colour Guide, the Style Guide (our favourite) and the Complete Collection. Every Style Guide has pages for her and for him.

Not sure which season you are? The three signs are in every listing. Still in doubt? Send us a message, we're happy to help.
```

## 3. About: the story

**Over de vrouwelijke stem:** versie A is geschreven in de stem van je vrouw, omdat zij echt kleursessies geeft. Gebruik hem **alleen als zij het gezicht van de winkel wil zijn en alles klopt**. Vul haar naam in en haal weg wat niet waar is.

Een verzonnen persoon of verzonnen ervaring is misleidend, verboden door Etsy, en het kost je het vertrouwen zodra iemand doorvraagt. Wil zij het niet, gebruik dan versie B.

**Story headline (versie A):** `Same face, different colour: I see it in every session.`

**Story (versie A, in haar stem):**

```
Hi, I'm [Naam].

In my colour sessions in the Netherlands I hold fabric drapes under people's chins, one colour after another. And every time it happens: one colour makes a face look tired, the next one makes it light up. Same face, same light. Only the colour changed.

Not everyone can book a session. So my partner and I turned what I do with drapes into guides you can download. Every season has its palette with names and hex codes, what to leave on the rack, and your white, your dark and your denim. The bigger guides add full looks, a capsule wardrobe, make-up colours and a colour fan to print.

Every palette is calculated by our own colour engine. It's the same one behind our colour analysis for women (NYANSE) and for men (KULØRT), so nothing is guessed or copied from a chart. And because colour isn't only for women, every Style Guide has pages for her and for him.

We're new here, so there are no reviews yet. That's why every listing shows the real pages. Have a question about your season? Send me a message; I read every one myself.

With love from the Netherlands,
[Naam]
```

**Versie B (wij, zonder persoon voorop):**

```
Headline: Your colours, ready to use. For her and for him.

We're a small studio in the Netherlands behind two colour brands: NYANSE for women and KULØRT for men. We started with one observation: the same face looks tired in one colour and lights up in the next.

Our guides put that into practice. Every season has a palette with names and hex codes, what to leave on the rack, and your white, your dark and your denim. The bigger guides add looks, a capsule wardrobe and make-up colours. Every palette is calculated by our own colour engine, not copied from a chart.

We're new on Etsy, so there are no reviews yet. That's why every listing shows the real pages, in the photos and in the video. Questions? Send us a message; we answer within a day.
```

**About-media** (map `assets/etsy/_shop/`):

| Bestand | Wat het laat zien |
|---|---|
| `about-1.jpg` | Het effect: vier mensen, fout en goed doek, verschillende huidtinten, vrouw en man |
| `about-2.jpg` | De pagina's van de Complete Collection |
| `about-3.jpg` | Voor haar én hem (Warm Autumn) |
| `about-4.jpg` | Alle 12 paletten, "calculated, not guessed" |
| `about-5.jpg` | De 4 pakketten naast elkaar |
| `shop-video.mp4` | 12 seconden, zonder geluid. Etsy speelt video zonder geluid af, dus alles staat in beeld. |

## 4. Banner en icoon

- **Banner:** `banner-3360x840.jpg`. Kies in Etsy "Big banner". De tekst staat in het midden, omdat Etsy de zijkanten op een telefoon wegsnijdt.
- **Shopicoon:** `icon-500.png`, het monogram.
- **Profielfoto (Shop owner):** een echte foto van jou of van haar. Op Etsy is een echt gezicht het sterkste vertrouwenssignaal voor een nieuwe winkel. Gebruik **geen** AI-gezicht als eigenaar.

## 5. Featured listings (de 4 bovenaan)

Zet de **Style Guides van de 4 startseizoenen** bovenaan: Soft Autumn, Deep Winter, Soft Summer en Light Spring.
- Dat is het pakket dat we aanraden.
- De hoofdfoto's vormen samen een rustige rij.
- Elke Style Guide laat haar én hem zien.

## 6. Shop sections

`Spring` · `Summer` · `Autumn` · `Winter`

Wie zijn seizoen kent, zoekt op seizoen, niet op pakket. Een listing kan maar in één sectie staan; de 4 pakketten van een seizoen staan dus samen.

## 7. Listingvideo's

- Elke listing heeft een `video.mp4` in de map van dat pakket: 9 tot 11 seconden, 1600×1200, zonder geluid.
- Volgorde: het effect, de naam van het pakket, de echte pagina's van **dat** pakket met één regel per pagina, de vergelijking en de eindkaart.
- Uploaden: bij een listing → Photos and video → **Video**.

**AI-vermelding:** in de beschrijving staat nu *"Product photos and videos were created with the help of AI tools."* Laat die regel staan.

## 8. Bericht na aankoop (Settings → Shop → Messages → "Message to buyers")

```
Thank you for your order! Your files are ready under Purchases and reviews.

Tips: print the PDFs at 100% (actual size) on matte paper, and check colours in daylight. Screens and printers always differ a little.

Not sure about something, or think you're between two seasons? Just reply to this message.

And if your guide helps you, a short review would mean a lot to a small new shop like ours.
```

Vragen om een review mag, maar **zonder** iets ervoor terug te bieden (Etsy-regel).

## 9. Eerste verkopen, eerlijk

- **Geen nepreviews en geen "koop het even"-bestellingen** van vrienden. Dat is tegen de regels van Etsy en tegen ons eigen principe (CLAUDE.md §9).
- **Geen "sale" in de eerste 30 dagen.** Een korting moet volgens EU-regels uitgaan van de laagste prijs van de 30 dagen ervoor, en die is er bij een nieuwe listing nog niet.
- **Wel doen:**
  - zet een **Thank-you coupon** aan (Marketing → Sales and discounts), bijvoorbeeld 20% op de volgende bestelling. Dat is een echte korting en levert herhaalaankopen op;
  - deel de winkel op Instagram en Pinterest zodra de eerste 16 listings online staan;
  - beantwoord elk bericht binnen een dag. Dat telt mee voor "Star Seller".

## 10. Volgorde om live te gaan

1. Vul de banner, het icoon, de shop title, de announcement en het About-verhaal in.
2. Zet de eerste **16 listings** online: Soft Autumn, Deep Winter, Soft Summer en Light Spring, elk met 4 pakketten.
3. Kies de featured listings en maak de sections aan.
4. Stel het bericht na aankoop en de Thank-you coupon in.
5. Na 2 weken: de overige 32 listings, verspreid over een paar dagen.

## 11. Volgende product (idee, nog niet gebouwd)

**"Which season am I? A self-test workbook"** (€2,95). Op Etsy zoeken veel mensen die hun seizoen nog niet kennen. Een printbare zelftest leidt ze naar een van de 12 seizoenen, en dus naar een pakket.

Dit is de ingang die nu ontbreekt (MENING). Bouwen kan ik in een uur, zeg het maar.

## 12. Optioneel: een campagnefilm met Veo of Gemini

Wil je ooit een echte film met beweging, dan is dit de prompt. Gebruik hem alleen met het AI-label waar het platform dat vraagt.

```
8-second vertical video, calm Scandinavian editorial style, soft window light, warm ivory backdrop. A woman in her thirties with light-medium warm skin and soft golden-brown hair, real skin texture, looks into the camera. A dusty royal-blue fabric drape lies around her shoulders; her face looks slightly grey. A hand slowly slides the drape away and a soft teal drape takes its place; her face looks fresh and even, eyes brighter, she smiles slightly. Only the drape colour changes. No text, no logos, no celebrity, no resemblance to any famous person, no beauty filter.
```
