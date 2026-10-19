# Pinterest: 24 pins, één keer klaarzetten

*19 oktober 2026. Pins: `public/social/pinterest/` (staan ook online op kulort-nyanse.com/social/pinterest/…). CSV: `assets/social/pinterest/pins.csv`. Opnieuw maken: `node scripts/make-pinterest.mjs`.*

**Wat:** per seizoen 2 pins (het palet en de outfit) in **2:3**, het formaat dat Pinterest het best toont. Elke pin linkt naar /kleuranalyse met een UTM-code (`utm_source=pinterest`), zodat je ziet wat Pinterest oplevert. Het CSV plant **één pin per dag om 20:00**, 24 dagen lang.

## Instellen (jij, ±10 minuten)

1. **Zakelijk account:** pinterest.com/business/create (of zet je account om in de instellingen). Naam: KULØRT · NYANSE, website: kulort-nyanse.com. **Claim de website** (Instellingen → Geclaimde accounts): kies de HTML-tag en stuur hem naar mij, dan zet ik hem op de site.
2. **Maak 4 borden, met precies deze namen** (het CSV verwijst ernaar): `Spring colour palettes`, `Summer colour palettes`, `Autumn colour palettes`, `Winter colour palettes`.
3. **Bulk-upload:** Pinterest → **Maken → Pins in bulk maken** (*Create → Bulk create Pins*) → upload `pins.csv`.
   - Klopt een datum niet meer (omdat je later uploadt), dan plaatst Pinterest de pin direct of geeft het een melding. Zeg het, dan maak ik het bestand opnieuw met nieuwe data.
   - Zie je geen bulk-optie (Pinterest past dit aan): maak de eerste 4 pins met de hand (afbeelding, titel, beschrijving en link uit het CSV). Dan bouw ik voor de rest de Pinterest-koppeling, op dezelfde manier als Instagram.

## Daarna

Pinterest is langzaam maar duurzaam: pins brengen maanden verkeer. Kijk na 4 weken in Pinterest Analytics én in PostHog (`utm_source=pinterest`).
