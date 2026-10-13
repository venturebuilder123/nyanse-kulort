# Expertreview klantflow, 13 oktober 2026

Vier onafhankelijke reviews op basis van 33 screenshots (iPhone-formaat, alle drie de stemmen) en de code:

1. Conversie- en funnelspecialist
2. Art director (woordmerk en hero)
3. Mobiele UX, toegankelijkheid en performance
4. Gesimuleerd doelgroeppanel (6 persona's) plus een check op consumentenrecht en privacy

Het panel is gesimuleerd; het is geen echt onderzoek. De juridische check is geen advies van een jurist.

## Waar alle vier het over eens waren

| Bevinding | Wat we deden |
|---|---|
| De hero (pas met "?") leest als **bankpas**; niet in 1 seconde duidelijk wat het is | Hero vervangen door de **kleurdoekentest als illustratie** ("Zelfde gezicht. Andere kleur."): 3 gezichten met lichte, middel en donkere huid; de pas klein als producthint |
| De kop zegt niet wat het product doet | Eyebrow "Kleuranalyse uit één selfie" en een kop als vraag ("Welke kleuren staan jou echt?") |
| Woordmerk te zwaar; beeldmerk (stipjes) voegt niets toe | KULØRT: Archivo 112 %, gewicht 700, ruime spatiëring; alleen de schuine streep van de Ø in cognac. NYANSE: één woordmerk voor beide stemmen, rechte Bodoni in kleine letters |
| Eerste tik onder de vouw | 4 compacte tegels; "Sport" opgegaan in "Weekend"; eerste rij past op een iPhone 13 |
| KULØRT toonde damespalet (fuchsia, citroengeel) | Herenfilter in de masterlijst plus herennamen (Navy, Bordeaux, Kobaltnavy, Olijf, Chino) |
| "30 sec" ongemeten; "gratis" naast betaalde zaken | Geen tijdclaims meer. Op de landing staat apart wat **gratis** is en wat **in de gids vanaf €6,99** zit |
| Selfieknop onder de vouw; 16+ als foutmelding achteraf | Eén tik "Ik ben 16+ · camera aan" (leeftijd + context vóór de camera-vraag); kleinere zoeker, sluiterknop in beeld, **automatisch vastleggen** als alles groen is |
| Vaste knop over de voor/na-schuif | Knop verschijnt pas na de kleuren; schuif is te slepen; doek blijft in beeld |
| Betaalde typenaam stond (wazig) in de pagina | Niet meer gerenderd. Het gratis resultaat toont tekst op familieniveau |

## Nieuw en ernstig: eerlijkheid voor elke huidtint
De live-check "Genoeg licht" keek naar de helderheid van de wang. Bij een donkere huid kon die dus op "te donker" blijven staan bij normaal licht. **Opgelost:** belichting wordt nu gemeten op het **oogwit** (bij iedereen licht) en gelijkmatigheid als **verhouding** tussen de wangen. Hetzelfde geldt in de analyse zelf. Vastgelegd in tests.

## Juridisch verwerkt
- Er staat geen tarief vooraf aangevinkt; de knop zegt "Kies je gids" tot er gekozen is.
- In de checkout: een niet-aangevinkt vinkje voor afstand van het herroepingsrecht (alleen voor het digitale deel), verzending staat als inbegrepen vermeld en de knop zegt "Betalen". **Jurist moet de tekst nog checken.**
- `nk_voice` is nu een sessiecookie (geen advertentie-attributie meer). Er is een conceptprivacyverklaring en een footer.
- Willis & Todorov: alleen het feit (eerste indruk ±0,1 s), zonder causale claim over kleding.
- Girl Math en Atelier zijn afgezwakt: geen besparings- of gelijkwaardigheidsclaim.
- De zonvraag is geschrapt (niet gebruikt, dus dataminimalisatie). Goud/zilver beslist nu alleen bij twijfel tussen warm en koel.

## Nog niet gedaan (bewust)
- **1 outfit met echte producten in het gratis resultaat.** Volgens het panel de sterkste brug naar betalen, maar het vraagt een catalogus met affiliate-feeds (§7).
- **Reveal-video al bij het gratis resultaat** (deelbaar moment vóór betalen). Volgt.
- **"Doe de test nog eens" als consistentiebewijs.** Klein, volgt.
- **Fonts per merk vooraf laden** (performance). Volgt bij de Lighthouse-meting.

## Beslissingen voor de oprichter
1. **Precieze type gratis of betaald?** Het panel zegt gratis (deelbaar; Esther: "Dat is het 4-seizoenensysteem…"). De conversie-expert zegt betaald (reden om te kopen). Nu: familie gratis, precies type betaald.
2. **Budget- en winkelstap naar ná de betaling?** De conversie-expert raadt het aan: minder stappen vóór de waarde. Dat wijzigt de vastgelegde flow in §2.
