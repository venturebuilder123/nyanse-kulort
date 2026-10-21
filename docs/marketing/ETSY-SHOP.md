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

`Start here` (de zelftest) · `Spring` · `Summer` · `Autumn` · `Winter`

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

## 11. De zelftest: "Which season am I?" (€2,95, gebouwd)

- **Waar:** in de map `assets/etsy/_self-test/`, met de PDF, 4 foto's, een video en `listing.txt`.
- **Wat erin zit:** 16 pagina's.
  - Drie tests met vinkjes: ondertoon, diepte en helderheid. De onbetrouwbare aderentest laten we bewust weg.
  - Een beslisschema naar een van de 12 seizoenen, met dezelfde regels als de kleurmotor: de sterkste eigenschap geeft het seizoen.
  - De 12 seizoenen met hun kleuren, en wat je doet als je tussen twee seizoenen zit.
  - Zes testkleuren van een hele pagina om onder je kin te houden, geprint of op een tablet.
- **Volgende stap voor de koper:** "zoek je seizoen in onze shop". Er staat geen link naar de site in, omdat Etsy dat niet toestaat.
- **Eerlijk:** in de PDF en de beschrijving staat dat een zelftest een schatting is en geen professionele draping.
- **In de shop:**
  - maak een eigen sectie **"Start here"**;
  - zet de zelftest als **eerste featured listing**, gevolgd door 3 Style Guides.

## 12. Campagnefilm met Veo

De shotlijst en de montage staan in **docs/brand/VEO-FILM.md**. Jij maakt 3 tot 5 clips in Gemini (Veo), ik monteer er een Etsy-versie (4:3, zonder geluid) en een social-versie (9:16) van.

## 13. Listings plaatsen: met de hand of via de API

**Nu, met de hand (±1 uur voor 16 listings).**
- Elke pakketmap heeft een **`listing.txt`** met alles om te plakken: de volgorde van de foto's, de video, de bestanden, de prijs, de titel, 13 tags en de beschrijving.
- Maak de eerste listing helemaal af en gebruik daarna **Copy** in Etsy. Per kopie vervang je de foto's, de video, de bestanden en de tekst.

**Straks automatisch, via de officiële Etsy-API.**
- Hiervoor heb je een eigen app-sleutel nodig. Etsy keurt die eerst goed, en dat kan enkele dagen duren (AANNAME: zo melden andere ontwikkelaars).
- Aanvragen:
  1. Ga naar **etsy.com/developers** → "Create a New App".
  2. Naam: `KULORT NYANSE listings`.
  3. Omschrijving: *"Internal tool to create and update listings in our own shop (KulortNyanse). No other users, no data stored."*
  4. Callback URL: `https://www.kulort-nyanse.com/etsy-callback`.
  5. Zeg "Etsy-sleutel aangevraagd".
- Zodra hij is goedgekeurd:
  - bouw ik het plaatsen;
  - ik zet alles eerst klaar als **concept**, zodat jij het kunt controleren;
  - daarna zet ik ze met één opdracht live.
- Gebruik: de overige 32 listings, prijswijzigingen en nieuwe producten.
- Kosten: de normale $0,20 per gepubliceerde listing. Concepten kosten niets.

## 14. Na de livegang (21 oktober 2026): foto's, titels, advertenties en vindbaarheid

**Foto 1 opnieuw (miniaturen).**
- Probleem: Etsy snijdt automatisch bij, en dan viel de vrouw (of de man) weg.
- Nieuw: zij links, de tekst in het midden, hij rechts. De figuren staan naar het midden geschoven, zodat in elke uitsnede (vierkant of 4:3) beiden en de titel zichtbaar blijven.

**Foto 4 opnieuw.**
- Het effect bij haar én bij hem.
- Ontbreekt een effectbeeld, dan staat daar het portret van de ander, met "For her" of "For him".

**Kortere titels.** Etsy's eigen handboek (augustus 2025) raadt korte, duidelijke titels aan, omdat lange lijsten met zoekwoorden kopers afschrikken. De zoekwoorden staan al in de 13 tags.

**Per live listing aanpassen (±2 min):** vervang foto 1 en foto 4, plak de nieuwe titel uit `listing.txt` en vul de **ATTRIBUTES** in die daar staan. De kleuren zijn per seizoen berekend uit het palet, in de kleurnamen die Etsy gebruikt.

**Voorraad 999.** Bij een hoge voorraad toont Etsy geen "nog maar 1"-melding. Dat is dus juist de eerlijke instelling: geen kunstmatige haast. Meldingen als "in 3 baskets" maakt Etsy zelf en die kloppen.

**Adverteren (MENING):**
- **Etsy Ads nog niet.** Het minimum is $1 per dag (FEIT, Etsy). Een nieuwe winkel zonder reviews zet klikken slecht om in verkopen.
  - Voorstel: na 3 tot 5 reviews, of na 4 weken, een test van 14 dagen à €1 per dag (€14) op de zelftest en de Style Guides.
  - Ik vraag het eerst, omdat het geld kost.
- **Offsite Ads laten aanstaan.** Je betaalt alleen bij een verkoop via een advertentie van Etsy buiten Etsy: 15% zolang je onder $10.000 omzet per jaar zit (FEIT, Etsy).
  - Bij €2,95 houd je dan nog ruim €1,70 over.
  - Uitzetten kan altijd: Shop Manager → Settings → Advertising.

**Wel meteen doen:**
1. **Share & Save:** Marketing → Share & Save → Join.
   - Verkopen via je eigen gedeelde link (Instagram, Pinterest, mail) geven 4% terug op de transactiekosten (FEIT, Etsy-voorwaarden).
   - Deel daarom altijd die link, niet de gewone.
2. **Attributen invullen** in elke listing: kleur, gelegenheid, voor wie. Etsy gebruikt ze als extra tags in de zoekfunctie (Etsy-handboek).
3. **Black Friday (27 november) en Kerst.** Op 18 november komt automatisch een herinneringsmail met de stappen (lib/social/reminders.ts).
   - Een korting moet uitgaan van de laagste prijs van de 30 dagen ervoor. Onze prijzen staan vast sinds 21 oktober, dus vanaf **20 november** mag een echte korting.
   - Voorstel: 20% op alles van 27 november tot en met 1 december, met "gift for her" en "gift for him" in de tags.
4. **Reageer op elk bericht binnen 24 uur** en vraag om een review in het bericht na aankoop. Dat telt mee voor "Star Seller".

**Waar we uniek in zijn, en dat moet op elke foto 1 zichtbaar zijn:**
- voor haar én hem;
- het effect (zelfde gezicht, ander doek);
- echte pagina's;
- vier duidelijke pakketten per seizoen.

Met de nieuwe foto 1 ziet de hele winkel eruit als één rustig, herkenbaar raster.
