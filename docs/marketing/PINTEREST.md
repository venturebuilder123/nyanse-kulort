# Pinterest: 47 pins, één keer klaarzetten

> **Update 21 oktober 2026: gebruik de RSS-feeds, niet de CSV.** De CSV-upload van Pinterest weigerde zelfs één pin ("file wasn't uploaded correctly"), terwijl ons bestand aan de officiële eisen voldoet. Pinterest leest nu vier feeds op onze site, één per bord:
>
> | Feed | Bord |
> |---|---|
> | `https://www.kulort-nyanse.com/pinterest/spring` | Spring colour palettes |
> | `https://www.kulort-nyanse.com/pinterest/summer` | Summer colour palettes |
> | `https://www.kulort-nyanse.com/pinterest/autumn` | Autumn colour palettes |
> | `https://www.kulort-nyanse.com/pinterest/winter` | Winter colour palettes |
>
> **Koppelen:**
> 1. Ga in Pinterest naar Instellingen → Create Pins in bulk → **Connect RSS feed**.
> 2. Plak de URL van een feed en kies het bijbehorende bord. Maak het bord aan als het nog niet bestaat.
> 3. Herhaal dit voor de vier feeds.
>
> **Hoe het loopt:** een pin verschijnt in de feed zodra zijn moment is aangebroken (twee per dag). Pinterest controleert feeds ongeveer één keer per dag en maakt de nieuwe pins vanzelf aan. Nieuwe pins komen erbij als je `node scripts/make-pinterest.mjs` draait en pusht.

*19 oktober 2026. Pins: `public/social/pinterest/` (staan ook online op kulort-nyanse.com/social/pinterest/…). CSV: `assets/social/pinterest/pins.csv`. Opnieuw maken: `node scripts/make-pinterest.mjs`.*

**Wat:** per seizoen 4 pins in **2:3**: het palet, de outfit en een look voor haar en voor hem (de Gemini-portretten; alleen Deep Winter voor hem ontbreekt nog). In de beschrijving van de look-pins staat "Model is AI-generated.", het formaat dat Pinterest het best toont. Elke pin linkt naar /kleuranalyse met een UTM-code (`utm_source=pinterest`), zodat je ziet wat Pinterest oplevert. Het CSV plant **twee pins per dag, om 12:00 en 20:00**, 24 dagen lang. Draai `node scripts/make-pinterest.mjs` vlak voor het uploaden opnieuw, zodat de data vanaf overmorgen lopen.

## Instellen (jij, ±10 minuten)

1. **Zakelijk account:** pinterest.com/business/create (of zet je account om in de instellingen). Naam: KULØRT · NYANSE, website: kulort-nyanse.com. **Claim de website** (Instellingen → Geclaimde accounts): kies de HTML-tag en stuur hem naar mij, dan zet ik hem op de site.
2. **Maak 4 borden, met precies deze namen** (het CSV verwijst ernaar): `Spring colour palettes`, `Summer colour palettes`, `Autumn colour palettes`, `Winter colour palettes`.
3. **Bulk-upload:** Pinterest → **Maken → Pins in bulk maken** (*Create → Bulk create Pins*) → upload `pins.csv`.
   - Klopt een datum niet meer (omdat je later uploadt), dan plaatst Pinterest de pin direct of geeft het een melding. Zeg het, dan maak ik het bestand opnieuw met nieuwe data.
   - Zie je geen bulk-optie (Pinterest past dit aan): maak de eerste 4 pins met de hand (afbeelding, titel, beschrijving en link uit het CSV). Dan bouw ik voor de rest de Pinterest-koppeling, op dezelfde manier als Instagram.

## Daarna

Pinterest is langzaam maar duurzaam: pins brengen maanden verkeer. Kijk na 4 weken in Pinterest Analytics én in PostHog (`utm_source=pinterest`).
