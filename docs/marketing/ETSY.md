# Etsy: 4 pakketten per seizoen, 48 digitale producten

*19 oktober 2026. Alles staat klaar in `assets/etsy/{seizoen}/{pakket}/`, de teksten in `assets/etsy/listings.md`. Opnieuw maken: `npx tsx scripts/make-etsy.ts` (of één seizoen: `npx tsx scripts/make-etsy.ts softAutumn`).*

## Wat het is

Per seizoen vier pakketten, in het Engels, met prijzen in euro's. Alles komt uit dezelfde kleurmotor als de site, voor haar en voor hem:

| Pakket | Advies | Wat erin zit | Bestanden (Digital files) |
|---|---|---|---|
| **1. Palette Card** | €3,95 | paletblad met 24 kleuren (naam + hex), portemonneekaartjes om uit te knippen, telefoonachtergrond | `palette-card.pdf`, `wallpaper.png` |
| **2. Colour Guide** | €7,95 | gids van 8 pagina's: kenmerken, palet, drie kleurgroepen, jouw wit/donker/denim, "not this, but this", metaal/leer/contrast, winkeltips + pakket 1 | `colour-guide.pdf`, `palette-card.pdf`, `wallpaper.png` |
| **3. Style Guide** | €12,95 | gids van 21 pagina's: alles uit 2 + per persoon 4 looks met ingekleurde kleding, een capsule van 12 stuks, de eerste 5 aankopen en accessoires, voor haar én hem | `style-guide.pdf`, `palette-card.pdf`, `wallpaper.png` |
| **4. Complete Collection** | €19,95 | gids van 22 pagina's met make-up, een kleurwaaier om uit te knippen, een werkboek (kastcheck, capsule-checklists, boodschappenlijst, 30-dagen-tracker) en 3 telefoonachtergronden | `complete-guide.pdf`, `palette-card.pdf`, `colour-fan.pdf`, `workbook.pdf`, `wallpapers.zip` |

**Waarom vier aparte listings en geen varianten:** Etsy levert bij varianten van één listing altijd dezelfde bestanden. Vier listings per seizoen geeft bovendien meer vindbaarheid in de zoekresultaten (AANNAME).

**Prijzen (MENING):** de trap is ongeveer ×2 per stap. Pakket 1 is de impulsaankoop, pakket 3 de aanrader (gemarkeerd in de vergelijkingsfoto). Op Etsy kosten seizoensgidsen meestal tussen €3 en €15 (AANNAME, niet gemeten). Pakket 4 ligt daarboven en moet het hebben van de extra's. Pas de prijzen aan in Etsy als de cijfers daar om vragen.

**Foto's per listing (in deze volgorde):**
1. Het pakket.
2. "What's inside", met echte pagina's.
3. De vergelijking van de 4 pakketten.
4. Het effectbeeld (zelfde gezicht, ander doek), als er een Gemini-beeld van dat seizoen is.

**Geen links naar de site in de bestanden of teksten.** Etsy wil niet dat je kopers naar buiten stuurt.

## Kosten (AANNAME: controleer de actuele tarieven op etsy.com/legal/fees)

- ±$0,20 per listing per 4 maanden: alle 48 ≈ $9,60, of $3,20 als je met 16 begint;
- ±6,5% transactiekosten;
- betaalkosten (±4% + een vast bedrag);
- **btw:** Etsy draagt de btw op digitale producten voor EU-kopers zelf af (AANNAME, controleer bij het openen van de shop).
- Advertenties (Etsy Ads, Offsite Ads) zet je voorlopig **uit**.

## Shop openen (jij, ±20 minuten)

1. Ga naar **etsy.com/sell** en log in of maak een account met nyansekulort@gmail.com.
2. Shopnaam: **KulortNyanse** (Etsy staat geen spaties of Ø toe).
3. Shopvoorkeuren: taal Engels, land Nederland, valuta **EUR**.
4. Kies **Bedrijf** (business) bij de betaalinstellingen: GUMALE, KvK, je IBAN (zie AANMELDEN.md), plus de identiteitscheck.
5. **Shopbanner en logo:** gebruik `assets/social/avatar-monogram.png` en `assets/social/pinned-1-wat.png`.

## Eén listing aanmaken (±4 minuten per listing; teksten in `assets/etsy/listings.md`)

1. **Add a listing** → bij type kies **Digital files**.
2. **Photos:** `listing-1.jpg` tot en met `listing-4.jpg` uit de map van dat pakket, in die volgorde.
3. **Title, Description, Tags (13), Price:** kopieer uit `listings.md` (per seizoen staan de 4 pakketten onder elkaar).
4. **Digital files:** upload de bestanden die bij dat pakket staan (maximaal 5, allemaal ruim onder de 20 MB).
5. **Category:** *Paper & Party Supplies → Paper → Digital Prints*, of zoek naar "colour palette guide".
6. **Who made it:** *I did* · **What is it:** *A finished product* · **When was it made:** *2020–2026*.
   - **AI:** in de beschrijving staat al: *"Product photos were created with the help of AI tools."* Etsy vraagt die vermelding (Creativity Standards). Haal hem niet weg. Een uitzondering op je keuze om AI op de site niet te noemen, omdat Etsy dit verplicht.
7. **Publish.** Begin met **4 seizoenen × 4 pakketten = 16 listings**: Soft Autumn, Deep Winter, Soft Summer en Light Spring. Doe de rest als die lopen.

**Tip:** maak de eerste listing helemaal af en kies daarna bij de volgende **"Copy"** (kopiëren). Dan vervang je alleen de foto's, de bestanden en de teksten.

## Daarna

- Elke maandag kijk ik met je naar **Etsy Stats**: weergaven, favorieten, verkopen per seizoen. Wat loopt, krijgt eventueel later een kleine Etsy Ads-test (vraag ik eerst, want dat kost geld).
- **Automatiseren:** de Etsy-API vraagt een eigen app met goedkeuring. Bij 16 tot 48 listings is kopiëren in Etsy sneller dan een API-koppeling. Komen er meer producten bij, dan bekijken we het opnieuw.
