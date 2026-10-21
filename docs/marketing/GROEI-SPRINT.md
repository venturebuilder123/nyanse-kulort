# Instagram-groeisprint: 4 weken, vanaf maandag 26 oktober 2026

*Aanleiding (21 oktober): "Met posten en wachten komen we er niet." Klopt. Dit plan vervangt het weekritme in GUERRILLA.md §4. Dat ritme vroeg 30 minuten per dag van de oprichter, en dat gebeurt niet.*

## Besluiten van de oprichter (21 oktober 2026)

1. **"Comment SEASON → DM": GO, gebouwd en live.**
   - Elk uur krijgt elke reactie met "season" of "seizoen" automatisch een DM met de link (één keer per persoon, binnen 7 dagen) en een openbaar "Sent you a DM 💌".
   - De bijschriften van nieuwe posts vragen erom.
   - **Instellen (eenmalig):** Instagram-app → Instellingen → Berichten en antwoorden op verhalen → Berichtinstellingen → **Verbonden hulpmiddelen: "Toegang tot berichten toestaan" aan**.
2. **Geen drapings door de vrouw van de oprichter.** We werken met AI-beelden en worden creatiever (zie hieronder). De giveaway-prijs wordt daarom ons eigen product.
3. **Giveaway: GO.**
   - Maandag 2 november tot en met zondag 8 november.
   - 3 × de stijlgids met kleurenpas (€39,99).
   - Voorwaarden staan op /winactie.
   - Trekking op 9 november via /lab/giveaway, met een herinneringsmail.
4. **€70 advertentiebudget: GO, vanaf week 2.**
   - Kanaal: **Instagram** (Reels en Stories), doel "Meer profielbezoeken", Nederland en België, 18–44 jaar.
   - Op maandag 2 november komt een herinneringsmail met de stappen.
   - Niet op Facebook: daar zitten onze volgers niet.

## Creatiever met AI (in plaats van echte drapings)

Ideeën om deze sprint te bouwen, op volgorde van verwachte impact (MENING):
1. **"Which season is she/he?"-quiz (gebouwd, 21 oktober).** Elke vrijdag om 18:00, week 2 t/m 12. Slide 1 toont een AI-model in de kleuren van zijn seizoen en drie opties A, B en C; de foute opties lijken op het goede antwoord. Slide 2 toont het antwoord, het palet en "Comment SEASON". Opnieuw maken: `node scripts/make-quiz-posts.mjs`. Oorspronkelijk idee: Een AI-gezicht met drie doeken A, B en C: *"Which one is right? Comment A, B or C."* Het antwoord staat in de eerste reactie. Dat levert veel reacties op.
2. **"Same outfit, 12 seasons".** Eén outfit, met onze eigen inkleurtechniek in de kleuren van alle 12 seizoenen. *"Find yours, send this to your Soft Autumn."* Mensen sturen zo'n post graag door.
3. **"Send this to…"-persona's.** "Send this to the friend who always wears black (but shouldn't)". Herkenbaar en doorstuurbaar.
4. **Veo-clips** (docs/brand/VEO-FILM.md), zodra het genereren lukt.

## Waarom posten en wachten niet werkt

- **Een nieuw account krijgt zijn bereik van mensen die je nog niet volgen.** Instagram toont een Reel eerst aan een kleine groep, en verspreidt hem verder als die groep lang kijkt, liket en vooral **doorstuurt**. Volgens Mosseri (januari 2025) zijn kijktijd, likes per bereik en doorsturen per bereik de belangrijkste signalen (FEIT, via Social Samosa).
- **Onze posts zijn mooi, maar niemand reageert en niemand stuurt ze door.** Er staat geen echt mens in beeld, het account reageert niet terug, en we zitten niet bij andere accounts.
- **Groei komt van drie dingen:** inhoud die mensen doorsturen, een reden om te reageren of te volgen, en het publiek van anderen. Daar draait deze sprint om.

## De vier hefbomen

### 1. Echte gezichten, echte doeken (sterkste inhoud)
- **Je vrouw filmt per week 2 drapings** met haar telefoon, bij daglicht: eerst het foute doek, dan het goede, en dan de reactie van de persoon. 20 tot 40 seconden. Alleen met **schriftelijke toestemming** van de persoon; een formulier zet ik klaar.
- Zij zet de ruwe clips in een map. **Ik knip ze** in onze stijl: labels ✕/✓, de titel, de eindkaart, 9:16. Daarna gaan ze automatisch online als Reel en als YouTube Short.
- Waarom dit werkt:
  - echte mensen zijn geloofwaardiger dan AI;
  - deze beelden hebben geen AI-label nodig;
  - het is precies het format waarmee kleuranalyse groot werd.
- De AI-beelden blijven voor de carrousels, Pinterest en Etsy.
- **Tijd: ±30 minuten per week, voor je vrouw.**

### 2. "Reageer met SEASON" en krijg automatisch een DM
- Elke Reel en carrousel eindigt met: *"Comment SEASON and we'll DM you the free colour check."*
- **Ik bouw een controle die elk uur draait** en reageert op elke reactie met dat woord:
  - een privébericht met de link, via het officiële privéantwoord van Instagram: één bericht per persoon, binnen 7 dagen (FEIT, Meta-documentatie);
  - een korte openbare reactie: "Sent you a DM 💌".
- Waarom dit werkt: veel meer reacties (een sterk signaal voor Instagram), en elke reageerder krijgt de link waar hij om vroeg. Dat is geen spam: je reageert alleen op mensen die er zelf om vragen.
- **Nodig:** een nieuw token met de rechten voor reacties en berichten (5 minuten, stappenplan zoals in AUTOPOST.md).

### 3. Het publiek van anderen
**a. Collab-posts met micro-creators (2.000–50.000 volgers, mode, menswear, beauty).**
- Per week 3 tot 5 DM's.
- Wat zij krijgen: een eigen persoonlijke gids (gratis code), en hun volgers 25% korting met een eigen code (bijvoorbeeld `SANNE25`).
- Wat wij vragen: een **Collab-post**, dan staat hij op beide profielen.
- Wat ik maak: de DM-teksten en de codes. Jij kiest de creators en verstuurt de DM's (±10 minuten per week).
- Altijd met "#ad" of "samenwerking", volgens de Reclamecode Social Media.

**b. Giveaway in week 2: "Win a 1:1 colour session with [naam]".**
- Online sessie met je vrouw, plus de Complete Collection.
- Meedoen:
  - volg @kulortnyanse;
  - reageer met het seizoen dat je denkt te zijn;
  - tag één vriend(in).
- Duur: 7 dagen. Winnaar: willekeurig getrokken.
- Wat ik maak: de post, de Story en de **actievoorwaarden op de site**. Gratis meedoen zonder aankoop mag, met openbare voorwaarden (Gedragscode Promotionele Kansspelen; laat het even nakijken).
- Een giveaway levert snel volgers op. Een deel vertrekt na de trekking; dat is normaal.

### 4. Een kleine betaalde duw (alleen na je GO)
- **€5 per dag, 14 dagen = €70**, op de Reel die in week 1 en 2 organisch het beste loopt.
- Doel "profielbezoeken". Doelgroep: 18+, Nederland en België.
- We meten de kosten per nieuwe volger. Zijn die te hoog, dan stoppen we.

## Wat jij per week doet (±45 minuten in totaal)
- **Elke dag 5 minuten:** reacties beantwoorden binnen een uur na een post. Je krijgt al elke ochtend concept-antwoorden per mail.
- **5 DM's aan creators** (10 minuten).
- **De rest gaat automatisch:** posten, de DM's na "SEASON", de mails en de knipklus.

## Optioneel, grote kans: TikTok
Kleuranalyse is het grootst op TikTok, en TikTok laat nieuwe accounts vanaf dag één zien aan mensen die je niet volgen. Dezelfde 2 Reels per week **met de hand uploaden kost 5 minuten**. Een koppeling via de API vraagt een audit van TikTok; dat doen we later.

## Niet doen
Volgers kopen, volgen en ontvolgen, bots en "engagement pods". Dat is nep, het kost je bereik (shadowban), en het maakt onze cijfers waardeloos.

## Meten (elke maandag)
- Volgers.
- Het aandeel bereik bij niet-volgers.
- Doorsturen per Reel.
- Reacties "SEASON".
- Bezoeken vanaf Instagram (`utm_source=instagram`).
- Kosten per volger (advertentie).

Week 1 is de nulmeting. Na 4 weken beslissen we wat we houden.

## GO
Zie "Besluiten" bovenaan: 1, 3 en 4 gaan door; 2 (drapings) niet.
