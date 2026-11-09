# Colour Aura: de campagne voor 18–25

*Gemaakt op 9 november 2026. Alle social-teksten zijn in het Engels, de site blijft meertalig.*

## Het idee in één zin
Op TikTok en Instagram zijn aura's populair: een polaroid met een waas van kleur om je heen. Wij laten zien dat jouw aura geen vibe is maar een **meting**. Met de verkeerde kleur wordt je aura grijs. Met jouw kleur bloeit hij op.

**Kernzin:** *what's your colour aura? not a vibe. measured from one selfie.*

## Wat er klaarstaat

| Wat | Bestand | Voor |
|---|---|---|
| 12 reels (8 s, 9:16) | `public/social/aura/{merk}-jong-{1..6}/reel.mp4` | TikTok, Instagram Reels, YouTube Shorts |
| 12 covers | `…/cover.jpg` | omslag van de reel |
| 12 Instagram-carrousels (4 slides, 4:5) | `…/slide-1..4.jpg` | Instagram, Facebook |
| 12 feedposts (4:5) | `…/post.jpg` | Pinterest, Facebook |
| 2 rasters "which aura are you?" | `public/social/aura/grid-nyanse.jpg`, `grid-kulort.jpg` | Instagram (reacties uitlokken), Pinterest |
| Aura-deelkaart | resultaatpagina, knop "Deel je kleur-aura" | elke bezoeker deelt zijn eigen aura als story |

**Opbouw van een reel** (alles staat binnen de veilige zone van Instagram en TikTok, dus niet onder de knoppen of de tekst van de app; de cover blijft leesbaar in het profielraster):
1. "aura check": de polaroid schuift in beeld en ontwikkelt zich, zoals een echte polaroid.
2. De verkeerde kleuren flitsen voorbij. De aura is grijs en er komen stickers als "✕ washed out" en "✕ tired??".
3. Een verloop in de paletkleuren veegt over het scherm, met een flits en een zoom op het moment van de wissel.
4. Daarna: de eigen kleur, de aura bloeit op, en de stickers "✓ her colour" en "soft raspberry" verschijnen.
5. Eindbeeld: "what's your colour aura?" en "free · link in bio".

Opnieuw maken (bijvoorbeeld na nieuwe modellen): `npx tsx scripts/make-aura.ts`. Dat duurt ongeveer 10 minuten. Eén model snel bekijken: `npx tsx scripts/make-aura.ts nyanse-jong-1`.

## Posten (jij, ±3 minuten per dag)
- **TikTok:** de 12 aura-video's staan bovenaan in **/lab/tiktok**, één per dag vanaf 10 november, afwisselend voor haar en voor hem. De oude "same face"-reels schuiven 12 dagen op. Werkwijze: zie `TIKTOK.md`. Zet het **AI-label** aan, want de modellen zijn met AI gemaakt.
- **Instagram gaat automatisch** (de agenda in `lib/social/calendar.ts`, te zien in /lab/social):
  - **Woensdag 11 november, 12:00:** de twee rasters "which aura are you?" als carrousel.
  - **Elke donderdag om 19:00**, vanaf 12 november, 12 weken lang: een aura-reel.
  - **Elke zaterdag om 12:00**, vanaf 14 november: een aura-carrousel van een ander model. De slides: "aura check" (verkeerde kleur, grijze aura) → de eigen kleur → het hele palet met namen ("save this") → "comment AURA".
  - **"Comment AURA"** stuurt automatisch de gratis check per DM, net als SEASON. Zolang de DM's bij Instagram nog uit staan, krijgt de reageerder een openbaar antwoord met "link in bio".
  - Werkt de koppeling met Instagram niet, dan plaats je de posts met de hand vanuit /lab/social; de knoppen staan daar al.
- **Instagram Stories (jij, met de hand):** zet de `cover.jpg` van die dag als story met een **linksticker** onder de kleurbolletjes. Doe er een **poll** bij: "grey aura or glow?".
- **Reageren:** antwoord met de aura die je bij die persoon vermoedt, in de vorm van een vraag: "sounds like a soft summer, check it free in bio?"
- **Pinterest:** de 12 posts en 2 rasters als pins, met de link `https://www.kulort-nyanse.com/?utm_source=pinterest&utm_campaign=aura`.
- **Geluid:** kies in de Commercial Music Library iets met een duidelijke drop. De kleurveeg valt op ongeveer 3,3 seconden; leg de drop daar.

## Creators (de grootste hefboom)
Vraag creators om dit format na te doen met hun **eigen selfie**:
1. Ze filmen hun scherm terwijl ze de gratis check doen.
2. Daarna delen ze de aura-kaart van hun resultaat.

Haakzin: "doing an aura check that's actually measured". Ze hoeven alleen hun scherm op te nemen. Pas `CREATORS.md` niet aan; dit is gewoon een extra format.

## Advertenties (alleen als je wilt betalen, eerst vragen)
- Doelgroep 18–25, NL/BE, interesses mode en beauty. Altijd 18+ (CLAUDE.md §12).
- Begin met de 2 reels die het best scoren op TikTok. Testbudget €5 per dag, maximaal 7 dagen.

## Grenzen
- We beweren niets over energie, geluk of persoonlijkheid. Het is een woordspeling op een trend; de kleuren komen uit onze meting.
- We zeggen niets negatiefs over uiterlijk. Wat we afkeuren is de kleur, nooit de persoon: "washed out" gaat over de kleur van het doek.
- Geen nep-tellers en geen bekende gezichten.

## Meten
- **UTM:** `utm_campaign=aura`, met `utm_source` per kanaal.
- **PostHog:** `share_clicked` laat zien hoe vaak bezoekers hun aura-kaart delen.
- **Evaluatie na 12 posts:** welke 3 hadden het meeste bereik? Daarvan maak ik meer.
