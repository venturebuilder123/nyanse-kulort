# Kleurenpas v1: drukken en versturen

*18 oktober 2026, bijgewerkt 22 oktober 2026 (Nederlands en Engels).*

**Bestanden voor de drukker:** `assets/passes/print/nl/` en `assets/passes/print/en/`. Daarin staat **per ontwerp één pdf** (`kulort-softAutumn.pdf` enzovoort), met pagina 1 de voorkant en pagina 2 de achterkant van dat merk. Zo vragen online drukkers het bij "meerdere ontwerpen".
**Controle:** `assets/passes/kleurenpassen-nl.pdf` en `-en.pdf` (alle passen in één bestand), plus `preview-*.png`.
**Opnieuw maken:** `npx tsx scripts/make-pass-palettes.ts && node scripts/make-passes.mjs`. De kleuren komen rechtstreeks uit de kleurmotor, dus de pas klopt altijd met de gids.

## Wat erin zit

- **24 voorkanten:** 12 seizoenen × KULØRT en NYANSE. Elke voorkant heeft:
  - het merk en de seizoensnaam;
  - de familie en het metaal;
  - de 8 kleuren uit de stijlgids, met naam;
  - een kalibratiestrook (ArUco-marker, 18%-grijs en een onbedrukt wit vlak) voor de verificatie-selfie in fase C.
- **2 achterkanten**, één per merk. Daarop een QR-code naar de stijlgids en de regel "Je vriendencode staat in je stijlgids". Een leeg vakje voor de code past niet: de code wordt niet bij de bestelling opgeslagen.
- **Formaat:** creditcard, 85,6 × 53,98 mm, met **3 mm afloop** rondom. Het pdf-formaat is dus 91,6 × 59,98 mm.
- **De plek van de kalibratievlakken** staat in `tools/card/pass-layout-v1.json`. Verander die niet zonder ook de detectie aan te passen.

## Laten drukken (advies 22 oktober 2026)

**Wat je nodig hebt:** een **digitale** drukker die **meerdere ontwerpen in één bestelling** drukt, zonder opstartkosten per ontwerp. Bij offset kan dat niet: daar is het minimum 500 stuks per ontwerp.

**Leveranciers om te vergelijken** (alle drie Nederlands, digitaal, meerdere ontwerpen). Prijzen veranderen; kijk op de bestelpagina.
1. **PeterPrint** (peterprint.nl): drukt digitaal op grote vellen. Je kiest in het bestelproces het aantal ontwerpen, zonder opstartkosten per ontwerp. **Mijn eerste keus** voor 24 ontwerpen in kleine aantallen.
2. **Drukwerkdeal** (drukwerkdeal.nl): de grootste in NL. Digitaal vanaf 25 stuks, met veel papiersoorten. Goed alternatief als PeterPrint te duur uitvalt.
3. **Groenprint / WeLoveRecycled:** tot 50 ontwerpen per bestelling, vanaf 50 stuks in totaal, op gerecycled papier. Mooi verhaal, maar gerecycled papier is minder wit. Dat geeft een andere kleurweergave en een minder neutraal wit kalibratievlak. **Niet voor de pas.**

**Specificaties om te kiezen:**
- **Formaat:** creditcard, 85 × 55 mm. De meeste drukkers noemen dit "visitekaartje", dat is 85 × 55 mm. Ons bestand is 85,6 × 54 mm plus 3 mm afloop. Dat verschil van 0,6 mm valt in de afloop. Kun je 85,6 × 54 kiezen ("creditcardformaat"), doe dat dan.
- **Papier:** **350–450 g mat (MC), onbehandeld of met matte laminaat.** Geen glans: glans weerkaatst licht en maakt de kalibratievlakken onbruikbaar. Matte laminaat maakt de pas sterker in een portemonnee.
- **Dubbelzijdig**, 4/4 (kleur op beide kanten).
- **Afgeronde hoeken** (als optie, ±3 mm): voelt als een echte pas.

**Eerste bestelling:**
- **Proef:** alle 24 NL-ontwerpen, 1–2 per ontwerp, of het kleinste aantal dat de drukker toestaat.
- **Leg de proef bij daglicht naast je scherm en naast echte stoffen.** Kleur is het product. Het pdf is RGB; de drukker zet het om naar CMYK, en felle kleuren (felblauw, fuchsia, limoen) veranderen het meest. Wijkt iets veel af, zeg het, dan pas ik die kleur in het bestand aan.
- **Daarna:** ±5 per ontwerp voor de seizoenen die het meest besteld worden (zie /lab/orders), de rest 2. Engelse passen pas zodra er Engelse pasbestellingen binnenkomen. In de weekbatch staat per bestelling welke taal de pas moet hebben.

**Let op:** de kleine tekst op de pas (de kleurnamen) is ±4,5 pt. Dat is leesbaar, maar het kleinste wat je wilt. Kijk het na op de proef.

## Versturen (elke maandag)

1. Ga naar **/lab/orders → Weekbatch kleurenpassen**.
2. Klik **Download CSV** (welk merk en seizoen per bestelling) en **Print adreslabels**.
3. Pak per bestelling de juiste pas (merk + seizoen), doe hem in een envelop met een label en een postzegel. Kijk wat je met de pas meestuurt: met een stevig kartonnetje erbij is de envelop dikker, en dan kan een zwaardere postzegel nodig zijn.
4. Klik **Alles verzonden**: elke klant krijgt de mail "Je kleurenpas is onderweg".

## Open punten

- **Persoonlijke QR-code** (direct naar jouw gids): kan pas met drukken op bestelling, of met een sticker per pas. Voor nu gaat de QR naar `/gids`. Die opent je gids op de telefoon waarmee je bestelde; anders gebruik je de link uit de mail.
- **Kalibratie:** de verificatie-selfie met de pas komt pas in fase C. Tot dan is de strook alleen een voorbereiding.
