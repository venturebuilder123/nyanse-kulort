# Kleurenpas v1: drukken en versturen

*18 oktober 2026. Bestanden: `assets/passes/kleurenpassen-v1.pdf` (26 pagina's). Opnieuw maken: `node scripts/make-passes.mjs`.*

## Wat erin zit

- **24 voorkanten:** 12 seizoenen × KULØRT en NYANSE. Elke voorkant heeft:
  - het merk en de seizoensnaam;
  - de familie en het metaal;
  - de 8 kleuren uit de stijlgids, met naam;
  - een kalibratiestrook (ArUco-marker, 18%-grijs en een onbedrukt wit vlak) voor de verificatie-selfie in fase C.
- **2 achterkanten**, één per merk. Daarop een QR-code naar de stijlgids en een regel voor de vriendencode.
- **Formaat:** creditcard, 85,6 × 53,98 mm, met **3 mm afloop** rondom. Het pdf-formaat is dus 91,6 × 59,98 mm.
- **De plek van de kalibratievlakken** staat in `tools/card/pass-layout-v1.json`. Verander die niet zonder ook de detectie aan te passen.

## Laten drukken (eerste oplage)

1. **Drukkerij:** kies een online drukker voor visitekaartjes of plastic kaarten (PVC). PVC gaat langer mee in een portemonnee; stevig karton (350 g mat) is goedkoper om mee te beginnen.
2. **Oplage:** ±5 per ontwerp voor de seizoenen die je het meest verwacht, of 1–2 per ontwerp als proef. Achterkant: KULØRT-achterkant bij de KULØRT-voorkanten, NYANSE-achterkant bij de NYANSE-voorkanten.
3. **Kleur is het product.** Vraag om een **kleurproef**, of bestel eerst een paar exemplaren. Het pdf is RGB; de drukker zet het om naar CMYK, en daarbij veranderen felle kleuren (felblauw, fuchsia, limoen) het meest. Leg de proef bij daglicht naast de kleuren op je scherm en naast echte stoffen.
4. **Mat, niet glanzend:** glans weerkaatst licht en maakt de kalibratievlakken onbruikbaar.

## Versturen (elke maandag)

1. Ga naar **/lab/orders → Weekbatch kleurenpassen**.
2. Klik **Download CSV** (welk merk en seizoen per bestelling) en **Print adreslabels**.
3. Pak per bestelling de juiste pas (merk + seizoen), doe hem in een envelop met een label en een postzegel. Kijk wat je met de pas meestuurt: met een stevig kartonnetje erbij is de envelop dikker, en dan kan een zwaardere postzegel nodig zijn.
4. Klik **Alles verzonden**: elke klant krijgt de mail "Je kleurenpas is onderweg".

## Open punten

- **Persoonlijke QR-code** (direct naar jouw gids): kan pas met drukken op bestelling, of met een sticker per pas. Voor nu gaat de QR naar `/gids`. Die opent je gids op de telefoon waarmee je bestelde; anders gebruik je de link uit de mail.
- **Kalibratie:** de verificatie-selfie met de pas komt pas in fase C. Tot dan is de strook alleen een voorbereiding.
