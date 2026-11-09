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
| 12 feedposts (4:5) | `…/post.jpg` | Instagram, Facebook, Pinterest |
| 2 rasters "which aura are you?" | `public/social/aura/grid-nyanse.jpg`, `grid-kulort.jpg` | Instagram (reacties uitlokken), Pinterest |
| Aura-deelkaart | resultaatpagina, knop "Deel je kleur-aura" | elke bezoeker deelt zijn eigen aura als story |

**Opbouw van een reel:**
1. "aura check": de polaroid schuift in beeld.
2. De verkeerde kleuren flitsen voorbij. De aura is grijs en er komen stickers als "✕ washed out" en "✕ tired??".
3. Een verloop in de paletkleuren veegt over het scherm.
4. Daarna: de eigen kleur, de aura bloeit op, en de stickers "✓ her colour" en "soft raspberry" verschijnen.
5. Eindbeeld: "what's your colour aura?" en "free · link in bio".

Opnieuw maken (bijvoorbeeld na nieuwe modellen): `npx tsx scripts/make-aura.ts`. Dat duurt ongeveer 10 minuten. Eén model snel bekijken: `npx tsx scripts/make-aura.ts nyanse-jong-1`.

## Posten (jij, ±3 minuten per dag)
- **TikTok:** de 12 aura-video's staan bovenaan in **/lab/tiktok**, één per dag vanaf 10 november, afwisselend voor haar en voor hem. De oude "same face"-reels schuiven 12 dagen op. Werkwijze: zie `TIKTOK.md`. Zet het **AI-label** aan, want de modellen zijn met AI gemaakt.
- **Instagram:** dezelfde reel als Reel. Zet op dag 1 en dag 7 het raster als feedpost met de tekst: *which aura are you? comment yours 👇 not sure? one selfie tells you, free: link in bio.* Reageer op elke reactie met de aura van die persoon, als vraag: "sounds like a soft summer, check it free in bio?"
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
