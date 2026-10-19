# Etsy: 12 seizoensgidsen als digitaal product

*19 oktober 2026. Alles staat klaar in `assets/etsy/` (opnieuw maken: `node scripts/make-etsy.mjs`).*

## Wat het is

Per seizoen een **digitale gids**:
- een PDF van 6 A4-pagina's: kenmerken, 20 kleuren met hex-codes, metaal, een outfit voor hem en haar, wat je laat hangen en hoe je hem gebruikt;
- een **telefoonachtergrond** met het palet;
- een **hoofdbeeld** voor de listing.

Dat zijn **12 listings** van €6,95 (advies). Het is een ander product dan de persoonlijke gids op de site: een algemene seizoensgids, voor mensen die hun seizoen al kennen of willen ontdekken.

**Waarom:** op Etsy wordt veel gezocht op "color analysis" en op seizoenen (AANNAME, meet het na 4 weken in Etsy Stats). Het is een extra inkomstenstroom zonder werk per verkoop, en elke koper leert het merk kennen.

**Geen links naar de site in de bestanden of teksten.** Etsy wil niet dat je kopers naar buiten stuurt.

## Kosten (AANNAME: controleer de actuele tarieven op etsy.com/legal/fees)

- ±$0,20 per listing per 4 maanden (12 listings ≈ $2,40);
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

## Eén listing aanmaken (±3 minuten per listing; teksten in `assets/etsy/listings.md`)

1. **Add a listing** → bij type kies **Digital files**.
2. **Photos:** `listing-1.jpg` als eerste foto. Voeg eventueel de telefoonachtergrond toe als tweede.
3. **Title, Description, Tags (13), Price:** kopieer uit `listings.md`.
4. **Digital files:** upload `guide.pdf` en `wallpaper.png`.
5. **Category:** *Paper & Party Supplies → Paper → Digital Prints*, of zoek naar "colour palette guide".
6. **Who made it:** *I did* · **What is it:** *A finished product* · **When was it made:** *2020–2026*.
   - **AI:** in de beschrijving staat al: *"Product photos were created with the help of AI tools."* Etsy vraagt die vermelding (Creativity Standards). Haal hem niet weg. Een uitzondering op je keuze om AI op de site niet te noemen, omdat Etsy dit verplicht.
7. **Publish.** Begin met de 4 seizoenen die het meest gezocht worden: Soft Autumn, Deep Winter, Soft Summer, Light Spring. Doe de rest als die lopen.

## Daarna

- Elke maandag kijk ik met je naar **Etsy Stats**: weergaven, favorieten, verkopen per seizoen. Wat loopt, krijgt eventueel later een kleine Etsy Ads-test (vraag ik eerst, want dat kost geld).
- **Automatiseren:** de Etsy-API vraagt een eigen app met goedkeuring. Bij 12 listings is handwerk sneller. Komen er meer producten bij, dan bekijken we het opnieuw.
