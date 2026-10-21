# Beslissingen

Nieuwste bovenaan. Per beslissing: wat, waarom, en wat het kost.

## 21 oktober 2026 — gratis codes alleen voor de digitale gids

- **Vaste regel (oprichter, "dit geldt altijd"):** een code van 100% geldt alleen voor de digitale gids, nooit voor de kleurenpas of het persoonlijke consult.
  - Dat geldt ook voor de bestaande familiecodes.
  - Kortingscodes onder de 100% (bijvoorbeeld 25%) blijven op alles geldig.
  - De kassa controleert dit en meldt "Deze code geldt alleen voor de digitale gids."
- **Giveaway-codes (`GIFT_CODES`):** 10 eenmalige codes van 100%, alleen voor de digitale gids.
  - Een code is verbruikt zodra er één bestelling mee is gedaan.
  - De codes staan in `.env` en moeten ook in Vercel.
- **Giveaway aangepast:** 10 winnaars krijgen elk een digitale gids (€12,99), in plaats van 3 winnaars met een kleurenpas. Meer winnaars geeft meer kans, en dat trekt meestal meer deelnemers (MENING). Meedoen kan nu in de hele EU, omdat er niets verstuurd hoeft te worden.

## 21 oktober 2026 — Instagram-groeisprint

- **Comment SEASON → DM** is live: het officiële privéantwoord van Instagram, één bericht per persoon, binnen 7 dagen, plus een openbaar antwoord.
- **Giveaway** van 2 tot en met 8 november: 3 × stijlgids met kleurenpas. Voorwaarden op /winactie, trekking via /lab/giveaway.
- **€70 Instagram-boost** vanaf 2 november (herinneringsmail).
- **Geen drapings door de vrouw van de oprichter:** de oprichter wil er niet van afhankelijk zijn. We werken creatiever met AI (docs/marketing/GROEI-SPRINT.md).

## 21 oktober 2026 — kleding stuurt de analyse: eigen controle na de selfie

**Probleem (melding van de oprichter):** de uitslag lijkt mee te bewegen met de kleding die mensen dragen.

**Oorzaken die ik in de code vond:**
1. **De haarmeting keek tot onder de kin.** Een donkere kraag, sjaal of capuchon kon als haar meetellen, en dat maakte de uitslag dieper en contrastrijker. *Opgelost:* de haarmeting stopt nu bij de kin.
2. **De witbalans van de camera reageert op het hele beeld.** Een felle trui verschuift de huidkleur op de foto, vooral de ondertoon. Zonder kalibratiekaart corrigeren we dat niet.
3. **Felle kleding kaatst licht terug** op de huid.

**Oplossing:**
- **Eigen controle (voorstel van de oprichter).** Na de selfie zie je drie kleurvlakken: onze meting in het midden ("Klopt"), één tint lichter en één tint donkerder. Dat gebeurt voor de huid ("leg je hand naast het scherm"), de ogen en het haar (alleen bij natuurlijk of grijs haar).
  - Je keuze verschuift de meting met een vaste stap in L\*: huid 6, ogen 8, haar 8 (AANNAME; afstemmen op de data van fase A).
  - Daarna wordt het seizoen berekend. De rekenregels zijn nu versie 4.
- **Goud of zilver telt nu echt mee in de ondertoon** (gewicht 0,2). Bij twijfel beslist het antwoord ook nog steeds tussen twee seizoenen. Het antwoord verandert niet met de witbalans, de foto wel.
- **Tip bij de selfie:** "Draag iets neutraals of leg een witte handdoek om je schouders."
- **De controle gaat mee in de bestelling**, zodat de betaalde gids op elk apparaat dezelfde uitslag geeft.

**Meten:**
- Het nieuwe event `confirm_pick` (onderdeel en keuze) laat zien hoe vaak de meting ernaast zit, per onderdeel. Dat is ons eerste nauwkeurigheidssignaal uit echt gebruik.
- Kiezen veel mensen "Donkerder" bij de huid, dan stellen we de meting bij (FEIT pas na meting).

**Kosten:** €0. Het kost 2 tot 3 extra tikken in de flow.

**Nog niet gedaan (idee):** de witbalans corrigeren met het wit van de ogen, als een soort gratis kalibratiekaart. Eerst testen in /lab met echte selfies, omdat het oogwit per persoon verschilt.

## 20 oktober 2026 — tweede ronde Gemini-beelden: 39 beelden in gebruik

- **8 effectbeelden** (Warm Spring en Bright Winter, telkens alle 4) zitten nu in de reels, Shorts en effect-posts. Daarmee hebben week 11 en 12 hun eigen seizoen.
  - Heeft een week geen eigen beeld, dan leent hij een beeld van een seizoen dat al geweest is, nooit van een seizoen dat nog moet komen.
  - Week 1 tot en met 9 zijn ongewijzigd.
- **23 seizoensportretten** (alles behalve Deep Winter voor hem), in `public/brand/heroes/`:
  - de **omslag van de betaalde stijlgids** toont nu iemand van jouw seizoen en merk (anders blijft het de flat-lay);
  - de pagina's **"For her / For him" in de Etsy-gidsen**;
  - **23 nieuwe Pinterest-pins**, 47 in totaal, twee per dag.
- **8 voordeel-scènes** als Instagram-posts op **maandag 18:30**, week 2 tot en met 9, met nieuwe sleutels (`w2-monday-benefit`). Elk bijschrift heeft de AI-regel. Elke week heeft nu vier posts: maandag een voordeel, dinsdag een reel en Short, woensdag de carrousel en donderdag een beeld (MENING: goed te doen voor een nieuw account, omdat alles automatisch gaat).
- **Bewaard:** de originelen staan in `assets/gemini/_originelen/` en blijven buiten git.
- **Nog open in Gemini:**
  - het portret Deep Winter voor hem;
  - effectbeelden voor:
    - Cool Winter: zij-1 en zij-2;
    - Bright Spring: hij-1, zij-1 en zij-2;
    - Deep Autumn: hij-2, zij-1 en zij-2;
    - Cool Summer: zij-1 en zij-2;
    - Light Summer: hij-2 en zij-1;
    - Soft Summer: hij-2.

## 19 oktober 2026 — Etsy: vier pakketten per seizoen

- **Op voorstel van de oprichter:** per seizoen een klein, middel, groot en compleet pakket, in het Engels en in euro's. Dat zijn 48 listings:
  - **Palette Card** €3,95;
  - **Colour Guide** €7,95;
  - **Style Guide** €12,95;
  - **Complete Collection** €19,95.
  - De prijzen zijn een advies (MENING) en worden bijgesteld met Etsy Stats.
- **Elk pakket is een eigen listing**, omdat Etsy bij varianten dezelfde bestanden levert.
- **De inhoud komt uit de kleurmotor** (lib/guide/build.ts, op het middelpunt van het seizoen), voor haar en voor hem. Daarbij de ingekleurde kledingfoto's van de site.
- **Engelse kleurnamen** staan in lib/color/names-en.ts; die zijn later ook bruikbaar voor de Engelse site.
- **Kwaliteitscontrole in het script:** het aantal pagina's per PDF, een controle of iets in de voettekst loopt, en elk bestand onder de 20 MB. Het eerste ontwerp was 21 MB; de kledingstukken worden nu vooraf als lichte JPEG gemaakt, waardoor het 2 MB is.
- **De gegenereerde bestanden (±130 MB) staan niet in git**, alleen listings.md. Opnieuw maken: `npx tsx scripts/make-etsy.ts`.
- **Start:** 16 listings (4 seizoenen). Kosten ±$3,20 per 4 maanden plus transactie- en betaalkosten per verkoop (AANNAME).

## 19 oktober 2026 — YouTube Shorts

- **Elke reel gaat ook als YouTube Short online**, dinsdag om 19:00, via de officiële YouTube Data API (`videos.insert`). Een verticale video van maximaal 3 minuten wordt vanzelf een Short.
- **Waarom:** Shorts zijn via zoeken nog maanden later te vinden. De video bestaat al, dus het kost niets extra (MENING).
- **Eigen titel en beschrijving** met `#Shorts` en een link met `utm_source=youtube`. Het label voor synthetische content staat aan (`containsSyntheticMedia`).
- **Kosten:** €0. YouTube geeft standaard 10.000 punten per dag; een upload kost 1.600 punten.
- **Beperking:** zolang Google het API-project niet heeft gecontroleerd (audit), worden uploads **privé**. De oprichter zet ze dan zelf op openbaar. De audit is aangevraagd via het formulier (docs/marketing/YOUTUBE.md).
- **Inloggen** gaat één keer via `node scripts/youtube-auth.mjs`; de sleutel komt in `.env`. De app moet "in productie" staan, anders verloopt de sleutel na 7 dagen.
- **Slots** `w{n}-tue-short`: ze wachten tot YouTube gekoppeld is. Instagram-slots draaien gewoon door.

## 19 oktober 2026 — de Gemini-beelden in gebruik: reels, effect-posts en de homepage

- **27 effectbeelden** (zelfde gezicht, fout doek tegenover goed doek) staan in `assets/gemini/effect/`. Er zijn 13 dubbele beelden en collages; die staan apart in `_varianten/`. Beide mappen blijven buiten git, net als de andere originelen.
- **Per beeld drie bestanden:** een feedpost (4:5), een reel van 7 seconden (9:16) en een cover. Fout en goed hebben een label met de kleurnaam. Daarna komt een eindkaart: "Are you a {season}?". Maken: `node scripts/make-effect-posts.mjs` (ffmpeg-static staat alleen lokaal en zit niet in package.json).
- **Kalender:** elke **dinsdag 19:00 een reel** als teaser voor de seizoenscarrousel van woensdag. Vanaf week 5 komt er op **donderdag 12:00 een effect-post**, op de plek waar de volgers-beelden stonden. Nieuwe sleutels zonder bestandsnaam (`w3-tue-reel`), dus nieuwe beelden leiden nooit tot een dubbele post. Bestaande sleutels zijn ongewijzigd.
- **AI-regel in het bijschrift** van reels en effect-posts ("Models are AI-generated; the colours are the real ones from your guide."). Meta vraagt dit bij fotorealistische AI-beelden. Carrousels en volgers-beelden blijven zonder deze regel (daar staan geen mensen op).
- **Homepage, merklanding en /kleuranalyse:** de bewijsfoto's zijn vervangen door twee effectbeelden: Soft Autumn (vrouw) en Deep Winter (man, Monk 9). Ze hebben ✕/✓-labels met de echte kleuren uit de motor. Op de site staat geen AI-vermelding (bestaand besluit).
- **Reels kunnen even duren:** zolang Instagram de video verwerkt, staat de post op "processing". Het volgende uur gaat hij online. Hiervoor is migratie 0009 nodig.
- **Nog te maken in Gemini** (prioriteit bovenaan):
  - Warm Spring en Bright Winter: alle vier, voor weken 11 en 12. Tot die tijd leent de reel een beeld van een ander seizoen.
  - De vrouwenversies van Cool Winter, Bright Spring, Deep Autumn en Cool Summer.
  - Daarna de portretten (B) en de voordelen (C).

## 19 oktober 2026 — nieuwe beelden via Gemini, met mensen

- **De oprichter kiest voor gegenereerde modellen in editorials en social**, omdat die beter werken. Voorwaarden:
  - **mooi maar echt**: echte huid, geen plastic;
  - **elk seizoen op meer dan één huidtint** (Monk-schaal);
  - **nooit een bekend gezicht of een lookalike**: namen alleen als tekst ("vaak genoemd als …");
  - **geen tekst in de beelden**: die zetten wij erop.
- **AI-label:** verplicht op TikTok en bij advertenties; Instagram labelt soms zelf; op Etsy staat het al in de beschrijving. Op de eigen site blijft het besluit "geen AI-vermeldingen" staan. Op platforms die het verplichten, volgen we hun regels.
- **De prompts** (docs/brand/GEMINI-SOCIAL.md) komen uit de kleurmotor: per seizoen het juiste en het foute doek met exacte hex-codes. Drie reeksen: het effect (24), seizoensportretten (24) en de voordelen (8+).
- **Aanleveren** in `assets/gemini/`, met vaste bestandsnamen. Daarna zetten wij er tekst op en verdelen we ze over Instagram, Pinterest, de site en de advertenties.

## 19 oktober 2026 — posttijden, ochtendmail met reacties, Pinterest en Etsy

- **Posttijden:** carrousel op **woensdag 18:30**, volgers-beeld op **donderdag 12:00** (Buffer 2026, 9,6 miljoen posts; Metricool voor carrousels). De sleutels van de posts bleven gelijk, dus er gaat niets dubbel. `SOCIAL_START` is `2026-10-19`.
- **Ochtendmail met reacties:** elke ochtend na 08:00 een mail met nieuwe Instagram-reacties en per reactie een concept-antwoord (Claude Haiku, instelbaar via `COMMENT_MODEL`). **Nooit automatisch geplaatst.** Op dit moment heeft de Anthropic-sleutel geen tegoed: de mail werkt, maar zonder concepten. Tegoed opwaarderen is een keuze van de oprichter (kosten: centen per maand, AANNAME).
- **Facebook:** de Instagram-koppeling post niet op Facebook. We testen of "delen naar Facebook" ook werkt voor posts via de API. Zo niet, dan voegen we een paginasleutel toe.
- **Pinterest:** 24 pins (2:3) plus een CSV voor de bulk-upload, met UTM. Instellen: docs/marketing/PINTEREST.md.
- **Etsy:** 12 digitale seizoensgidsen à €6,95: PDF, telefoonachtergrond, listingbeeld en teksten. Geen links naar de site. **AI-vermelding in de Etsy-beschrijving**, omdat Etsy dat vraagt; dit is een bewuste uitzondering op "geen AI-vermeldingen" (alleen op Etsy). Instellen: docs/marketing/ETSY.md.

## 19 oktober 2026 — Instagram plaatst zichzelf

- **De oprichter wil social niet zelf doen. Geen wachtwoorden** (verboden door Instagram/TikTok, en riskant), maar de officiële Graph API met een eigen Meta-app en een paginasleutel die niet verloopt.
- **De kalender** (`lib/social/calendar.ts`): elke maandag om 19:00 de seizoenscarrousel (12 weken), de eerste 4 donderdagen een volgers-beeld. Alleen productbeelden zonder mensen, dus geen AI-label nodig.
- **Elk uur** controleert GitHub Actions of er een post klaarstaat. Er gaat nooit iets dubbel online (tabel `social_posts`). Een dag van tevoren krijgt de oprichter een mail; overslaan kan in /lab/social.
- **De beelden** staan openbaar onder `/social/…` (JPG, 15 MB), want Meta haalt ze op via een URL.
- **TikTok en Pinterest:** later via een planner. Reageren en DM's blijven handwerk, of vallen weg.

## 18 oktober 2026 — Engels voorbereid, achter een schakelaar

- **Geen vlaggen** (een vlag is een land, geen taal). In plaats daarvan: een rustige tekstknop "NL · EN" in de header (op telefoon in de footer), een eenmalige suggestie "This page in English?" als de browser niet op Nederlands staat (nooit automatisch doorsturen), en echte adressen `/en` met hreflang voor Google. De keuze wordt een jaar onthouden.
- **Aanzetten:** zet in Vercel `NEXT_PUBLIC_LOCALES=nl,en` en redeploy. Tot dan ziet niemand iets van het Engels, en `/en` bestaat dan niet.
- **Klaar in het Engels:**
  - de homepage;
  - alle vijf stemmen (landing, verhaal, stappen, selfie, analyse, e-mail, resultaatteksten, opties, checkoutteksten);
  - menu, stappen en footer;
  - prijzen als €12.99.
- **Nog Nederlands (fase 2, vóór het aanzetten):**
  - teksten die direct in de pagina's staan: resultaat, checkout-details, bevestiging, kleurtype kiezen, de stijlgids;
  - de kleurnamen (±150);
  - de teksten van de gidsmotor;
  - /kleuranalyse als Engels artikel;
  - voorwaarden en privacy in het Engels;
  - de mails.
- **Plan:** fase 2 bouwen in november. Engels aanzetten in december als de gate van november gehaald is, eerst voor de digitale gids in de EU (NL-btw tot €10.000 per jaar, daarboven OSS).

## 18 oktober 2026 — de catalogus vult zichzelf

- **Feeds beheer je in /lab/catalog**, niet in de code: winkel plus feed-URL, voor KULØRT, NYANSE of beide. Alle formaten werken: CSV, XML, JSON, en ook gzip zoals bij Awin.
- **Automatisch:**
  - Vercel-cron elke nacht om 03:00 voor import en daarna kleur meten.
  - GitHub Actions elk uur (gratis) om de kleur van nieuwe foto's te meten, omdat Vercel Hobby maar één cron per dag toestaat.
  - De Raspberry Pi is hiervoor niet nodig.
- **Kleur meten:** de achtergrond wordt geschat uit de rand van de foto, daarna k-means in Lab, en de grootste cluster wint. Een wit kledingstuk op een witte achtergrond valt terug op het midden van de foto. De controle met Claude bij twijfel (CLAUDE.md §7) volgt pas als de vlakjes in /lab/catalog niet blijken te kloppen.
- **Matchen:** ΔE2000 ≤ 11 tot de dichtstbijzijnde paletkleur, en nooit dichter bij een kleur om te vermijden. Maximaal 4 per categorie en maximaal 2 per winkel per categorie, zodat niet één winkel de pagina vult.
- **Netwerken:** voor de grote winkels zijn Awin (Uniqlo, Suitsupply), Rakuten (Mango) en Partnerize (Wehkamp) de volgende stappen. Zara, H&M, COS, Arket en het gewone Zalando hebben geen open programma in Nederland (zie fase-b/AFFILIATE.md).

## 18 oktober 2026 — persoonlijk kleuradvies zonder afspraak, echte PDF, Daisycon

- **De sessie via Teams vervalt.** In de plaats komt **Persoonlijk kleuradvies (€110)**: stijlgids en kleurenpas, plus een persoonlijke video van de kleurconsulent.
  - De klant beantwoordt de bevestigingsmail met 3 foto's bij daglicht: het gezicht zonder make-up, en 2 twijfelstukken onder de kin.
  - Binnen 3 werkdagen na de foto's volgt de video.
  - Geen agenda en geen afspraak: dit past bij online verkopen.
  - Privacy: alleen de consulent bekijkt de foto's, en ze worden binnen 30 dagen na de video verwijderd (staat in de privacyverklaring).
  - Herroeping: de bedenktijd vervalt zodra de video is geleverd.
- **"Download PDF" vervangt het printmenu.** Elke pagina wordt in de browser op A4 gezet (html-to-image + jsPDF) en als bestand opgeslagen: Downloads op een computer, "Bewaar in Bestanden" op een iPhone. Ongeveer 3 MB, 13 pagina's, ±5 seconden. Event `guide_pdf`.
- **Daisycon:** het verificatiebestand `public/002f74fc82d04da.html` voor het affiliate-account.

## 18 oktober 2026 — voorwaarden, bedrijfsgegevens en de bedenktijd

- **Bedrijfsgegevens** (GUMALE, KvK, btw, postadres in Zaltbommel) staan **niet in de footer**; dat is de keuze van de oprichter. Ze staan op de voorwaardenpagina en onderaan de contactpagina, en de privacyverklaring noemt naam en KvK. De wet (BW 3:15d) vraagt dat ze "gemakkelijk, rechtstreeks en permanent" te vinden zijn. De link "Voorwaarden" in elke footer dekt dat (MENING; laat het meenemen in de juridische check).
- **Eén vinkje bij het afrekenen:** "Ik ga akkoord met de voorwaarden en wil mijn gids meteen ontvangen. Daarna geldt er geen bedenktijd voor de gids." Rustiger dan de oude tekst, maar nog steeds de uitdrukkelijke toestemming die de wet voor digitale inhoud vraagt (BW 6:230p). Zonder die zin blijft de klant 14 dagen bedenktijd houden, ook na het openen van de gids. **Laat de tekst door een jurist checken.**
- **Een "foute" uitslag:** de voorwaarden beperken de aansprakelijkheid tot het betaalde bedrag. Ze beloven nu ook dat we kosteloos meekijken en de gids zo nodig omzetten als iemand binnen 14 dagen mailt. In de praktijk stuurt de oprichter dan een gratis code, waarmee de klant de gids met het juiste kleurtype opnieuw bestelt. De wettelijke rechten van een consument (een product dat niet doet wat beloofd is) kun je niet uitsluiten. Met deze toezegging is de kans op een geschil klein.
- **Rekening voor overschrijvingen:** op naam van GUMALE (dezelfde IBAN).
- **Kortingscodes zijn vergevingsgezind:** "FAMILIE-XXXXX:100" of spaties ervoor of erachter werken ook.

## 18 oktober 2026 — nieuwe prijzen en kortingscodes

- **Prijzen (keuze van de oprichter):** Digitaal **€12,99**, Met kleurenpas **€39,99**, Persoonlijk consult **€110**. De Girl Math-teksten rekenen mee: €0,43 per kleur, €0,04 per dag, en de pas als €2,70 per keer shoppen.
- **MENING:**
  - €12,99 is nog steeds een impulsaankoop.
  - De stap van €12,99 naar €39,99 (+€27) is groot. Het aandeel kleurenpas daalt waarschijnlijk, maar elke pas levert veel meer op.
  - Meet in de eerste weken het aandeel per optie (`tier_select`, `paid`) en vergelijk dat met de oude prijzen.
- **Kortingscodes voor de inner circle:**
  - Onbeperkt herbruikbaar, met een vast percentage (25% of 100% = gratis).
  - De codes staan in de env-variabele `DISCOUNT_CODES` (`CODE:PERCENTAGE`, met komma's), niet in de code. Zo pas je ze aan zonder deploy van code, alleen een redeploy.
  - Een code vervangt de vriendenkorting; ze stapelen niet.
  - Bij 100% is er niets te betalen: de bestelling gaat direct op betaald (mail en event, methode `code`). Bij de kleurenpas blijft het adres nodig.
  - De gebruikte code staat in de kolom `friend_code` van de bestelling.
  - **Risico:** een herbruikbare gratis-code die gedeeld wordt, kost je gidsen en, bij de pas, echte passen en postzegels. Maak de codes lang en niet te raden (bijv. `FAMILIE-K7Q2`) en vervang ze als ze rondgaan.

## 18 oktober 2026 — Mollie ingebouwd

- **Met `MOLLIE_API_KEY` betaalt de klant via Mollie:** iDEAL | Wero, Apple Pay, kaart, PayPal; wat in het Mollie-dashboard aan staat. Zonder key blijft de bankoverschrijving werken, ook als Mollie even niet bereikbaar is.
- **Eén pad naar "betaald"** (`lib/flow/fulfil.ts`), voor de webhook en de knop in /lab/orders. Het zet de bestelling op betaald, mailt de gids en stuurt het "paid"-event, met de methode erbij (`mollie:ideal` of `transfer`). Het is idempotent: Mollie mag de webhook vaker aanroepen zonder dubbele mails of dubbele tellingen.
- **De webhook vertrouwt het verzoek niet.** Hij haalt de betaling met onze key op bij Mollie en controleert of het bedrag gelijk is aan dat van de opgeslagen bestelling.
- **Na de betaling** komt de klant terug op /klaar. Die pagina kijkt de eerste 2 minuten elke 3 seconden of de betaling binnen is. Is het niet gelukt, dan staat er een knop "Opnieuw betalen", die een nieuwe Mollie-betaling maakt voor dezelfde bestelling.
- **Omschrijving op het afschrift**, per merk: "KULØRT stijlgids KN-…", "NYANSE stijlgids + kleurenpas KN-…".
- Het vinkje voor het herroepingsrecht blijft staan, zoals afgesproken in CLAUDE.md §9.

## 15 oktober 2026 — advertenties en campagnes in het Engels

- **Alle advertenties, campagnes en de Instagram-bio zijn Engels**, voor een bredere markt (keuze van de oprichter). De teksten staan per stem in [marketing/ADVERTENTIES.md §5](marketing/ADVERTENTIES.md). Prikkelen mag via nieuwsgierigheid, herkenning en zelfvertrouwen, maar nooit via onzekerheid over iemands uiterlijk (CLAUDE.md §12).
- **Risico (MENING):** een Engelse advertentie die op een Nederlandse site landt, kost conversie. Meta beoordeelt ook de ervaring op de landingspagina. Buiten Nederland passen ook de verzending, de bankoverschrijving en de Nederlandse winkels nog niet. Advies: zolang de site Nederlands is, Engelse advertenties alleen op NL/BE richten, en een Engelse landing (`/en`, de i18n-structuur is er al) bouwen vóór je breder adverteert.
- **Afzender van de mail:** `hi@kulort-nyanse.com`; het domein is geauthenticeerd in Brevo (DKIM brevo1/brevo2 en DMARC).

## 15 oktober 2026 — stijlgids v4: kritische review van alle gidsen

Vier betaalde gidsen pagina voor pagina nagelopen (KULØRT Deep Winter en Soft Autumn, NYANSE Soft Summer en Light Spring), daarna alle 24 combinaties (12 seizoenen × 2 merken) in tekst. Gevonden en opgelost:

- **Warme kleuren in een koel palet** (Deep Winter kreeg kaneel, roest en diep mosterd, omdat de diepte ze dichtbij trok). Nu wordt de temperatuur nooit gekruist: een duidelijk koel profiel krijgt geen duidelijk warme kleur en omgekeerd. Bijna-neutrale tinten blijven voor iedereen.
- **Optisch wit en echt zwart alleen waar ze horen.** Wit vraagt helderheid (Soft Summer kreeg "Wit"), zwart vraagt diepte en helderheid (Winter, Deep Autumn). De rest krijgt gebroken wit en navy, antraciet of espresso.
- **Contrast:** Deep Winter las "Jij zit in het midden". Nu telt diep plus helder ook als contrastrijk.
- **Dubbele namen** na de KULØRT-hernoeming ("Navy" ×2) en "Chino · Chino" zijn weg.
- **Kleding in echte kleuren.** Colberts en overshirts komen uit rustige, donkere kleuren (navy, antraciet, espresso, olijf). Broeken zijn rustige middentinten in klassieke tinten; anders steen of grijs. Jeans zijn altijd denim. Schoenen en riem komen uit de leerkleur, sneakers uit je wit. Kleur zit op shirts, truien en sjaals. Zachte typen krijgen hun dichtstbijzijnde accent, niet het felste. Voorheen waren er onder meer een turquoise chino, paarse schoenen en een mosterdgeel overshirt.
- **Teksten volgen wat je ziet:**
  - "Jouw wit", "Jouw zwart" en "Jouw denim" passen bij het getoonde vlakje.
  - Bij "Niet dit, maar dit" klopt de reden: een kobaltblauw is "te fel", geen "te warm".
  - De vervanging ligt in tint én lichtheid dichtbij en komt niet twee keer voor.
  - Mannen lezen nergens meer "rok".
- **Pagina 4** legt nu per schaal uit wat die meet en wat dat voor jou betekent. **Pagina 7** toont de outfitfoto groot. Bij de kast-check staan de kleurnamen nu in de stapels Houden en Onder je middel. De stapel Weg geeft een concreet criterium.
- **Vaak genoemd als** staat terug, op **familieniveau** (Lente, Zomer, Herfst, Winter) en per merk, op de resultaatpagina en in de gids. Alleen namen, geen foto's.
  - Waarom familieniveau: op subtypeniveau spreken de bronnen elkaar tegen (Julia Roberts is in de ene bron "Deep Autumn", in de andere "Soft Autumn"; Anne Hathaway wisselt tussen Winter en Cool Summer). Op familieniveau zijn ze het meestal eens.
  - Vrouwen: genoemd in minstens twee bronnen.
  - Mannen: er zijn minder bronnen (vooral één mannenstijlgids). AANNAME: acceptabel als "vaak genoemd"; laat je vrouw de lijst nalopen.
  - Bronnen (gecontroleerd 15 oktober 2026):
    - [FRANKIE4 Summer](https://frankie4.com/blogs/news/colour-analysis-summer)
    - [FRANKIE4 Spring](https://frankie4.com/blogs/news/colour-analysing-your-spring-palette)
    - [Roberta Style Lee Cool Summer](https://robertastylelee.co.uk/cool-summer-colour-analysis-guide)
    - [Roberta Style Lee Warm Spring](https://robertastylelee.co.uk/warm-spring-colour-analysis-guide/)
    - [DesignDash Summer](https://designdash.com/design/soft-light-true-what-does-your-summer-color-analysis-mean/)
    - [Tatler Asia Spring](https://www.tatlerasia.com/style/fashion/colour-analysis-spring)
    - [The VOU, mannen per seizoen](https://thevou.com/blog/winter-colour-season-complete-mens-guide)
    - [The VOU, Light Summer mannen](https://thevou.com/blog/light-summer-male-celebrities)
    - [The VOU, Soft Summer mannen](https://thevou.com/blog/soft-summer-colour-palette-mens-guide)
    - [The VOU, Spring mannen](https://thevou.com/blog/spring-colour-season-complete-mens-guide/)
- **Regressietests** in `lib/guide/build.test.ts` voor alle 24 gidsen: geen gekruiste temperatuur, geen dubbele namen, rustige kleuren voor jassen, broeken en schoenen, en contrast voor Deep Winter.

## 15 oktober 2026 — betaalde gids alleen na bevestigde betaling; PostHog live

- **Lek gedicht:** wie `/klaar?status=paid` typte of na "Ik heb betaald" klikte, kreeg de gids gratis. Nu opent de gids alleen als de server de bestelling als betaald ziet.
- **Hoe het nu werkt:**
  1. De bestelling bewaart een geheime code en het kleurprofiel (alleen getallen).
  2. "Ik heb betaald" toont "We controleren je betaling".
  3. De oprichter klikt op **Betaald** in `/lab/orders` (achter het lab-wachtwoord).
  4. De klant krijgt een mail (Brevo) met de link `…/gids?o=KN-…&k=…`, die op elk apparaat werkt. De open bevestigingspagina kijkt elke 20 seconden zelf.
  5. De oprichter krijgt een mail bij elke nieuwe bestelling.
  6. Het event `paid` gaat pas bij bevestiging naar PostHog, vanaf de server.
- **Nodig:** migratie `0005_order_access.sql`; de SMTP-gegevens van Brevo en een geverifieerd afzenderdomein; `NEXT_PUBLIC_POSTHOG_KEY` in Vercel.
- **PostHog EU gekoppeld:** zonder cookies (sessionStorage), zonder IP-adres, zonder autocapture of opnames; pagina's zonder query (order-kenmerken kunnen in de URL staan).
- **De sleutel `phs_…` stond in de chat:** opnieuw aanmaken (Feature flags › Secure API key › Rotate). Die is niet nodig.
- **KvK (FEIT, volgens de criteria van de KvK):** wie zelfstandig, tegen een commerciële prijs en regelmatig aan anderen verkoopt, moet zich inschrijven (€85,15 eenmalig in 2026).
  - Een webshop moet naam, adres en contact tonen (ACM, art. 6:230m BW). Daar bestaat geen nette omweg voor.
  - **Advies:** inschrijven, eventueel met een zakelijk postadres zodat het woonadres niet op de site staat.
  - Daarna kan Mollie: een echte iDEAL/Wero-betaling met directe bevestiging (op desktop een QR-code, op mobiel direct de bank-app). Dan is de handmatige controle niet meer nodig.
- **To-do:** affiliate-programma's voor kledingwinkels (Awin, Daisycon, TradeTracker, bol-partnerprogramma). Per programma controleren of een KvK nodig is.

## 14 oktober 2026 — stijlgids v3 en outfitfoto's

- **Waardecheck van de gids:** degelijk, maar het voelde als een rapport. Dit ontbrak: je basis, wat je eerst koopt, hoe je je kast nakijkt en een echt beeld van je type.
- **Toegevoegd:**
  - een omslag met het huislogo en een outfitfoto van het eigen type en merk;
  - "{type}, gedragen" (outfitfoto plus je 3 regels);
  - "Jouw basis en je eerste 5 aankopen": jouw wit, jouw zwart of donker en jouw denim, plus 5 stukken in volgorde van effect, met echte kleding;
  - "Kijk je kast na": 5 stappen en drie stapels (houden, onder je middel, weg).
- **De 30 kleuren beter verdeeld:** neutraal is echt rustig (chroma < 32, maximaal 6), basis zijn de 8 donkerste, de rest is accent. Eerder was het 3/2/25.
- **Outfitfoto's** (13, man en vrouw per type) verwerkt in `public/brand/outfits/`, op de omslag, in de gids en op het resultaat.

## 14 oktober 2026 — betalen per bankoverschrijving (pilot, NL)

- **Betaling** naar de zakelijke rekening van de oprichter: **Basic Element, NL24 RABO 3152 4583 98**. De oprichter geeft dit op als inkomen uit overig werk.
- **Flow:**
  1. Je kiest een optie.
  2. Je vult je e-mail in (plus adres bij pas of sessie) en vinkt het herroepingsrecht aan.
  3. De bestelling wordt opgeslagen (Supabase `orders`, met een uniek kenmerk `KN-XXXXXX`).
  4. Je ziet een betaal-QR (EPC/GiroCode, voor bank-apps die die ondersteunen) plus IBAN, bedrag en kenmerk met kopieerknoppen.
  5. Na "Ik heb betaald" opent de stijlgids meteen. De pas verstuurt de oprichter pas na controle van de betaling; voor de sessie mailt hij binnen twee werkdagen.
- **Het bedrag rekent de server zelf uit** (inclusief €1 vriendenkorting bij een geldige code).
- **Grenzen:**
  - Een site zonder betaaldienst kan in NL de bank-app niet direct openen met het bedrag erin.
  - De betaling wordt niet automatisch gecontroleerd: de oprichter koppelt overschrijvingen op kenmerk en zet de status in Supabase op `paid` of `shipped`.
  - Een digitale gids kan zonder betaling worden geopend (op vertrouwen). Dat risico is acceptabel voor de pilot.
- **Nodig:** migratie `0004_orders.sql` in Supabase.
- **Nog open:** KvK- of bedrijfsgegevens in de footer en de algemene voorwaarden (webshopverplichting). Later Mollie of Tikkie Zakelijk voor automatische bevestiging.

## 14 oktober 2026 — feedbackronde: flow, resultaat, drie opties, geen AI-vermelding

- **Flow:**
  - meerdere gelegenheden kiezen en dan "Verder";
  - "Ken je je kleurtype al? Kies het en ga direct naar je stijlgids";
  - bij Stijl is "Sla over" vervangen door "Ik ken mijn kleurprofiel al";
  - bij de selfie staat een privacytekst met link;
  - **e-mail pas na het resultaat:** op de resultaatpagina (rustig, met een opt-in die niet vooraf is aangevinkt) en na betaling ("Waar sturen we je stijlgids heen?").
- **Resultaat:**
  - seizoen en precies kleurtype elk met een eigen label, een pakkende zin, een langere uitleg en de schalen bovenaan;
  - "Je eerste 6 kleuren, van ons cadeau"; de tekst met Google is weg;
  - het tweede voor/na-blok is weg.
- **Bekende namen ("vaak genoemd als"):** het blok staat klaar in `lib/brand/seasons-copy.ts`, maar is **leeg**. Lijsten per subtype zijn online niet betrouwbaar (er bestaan alleen lijsten per hoofdseizoen, en analisten spreken elkaar tegen). Invullen alleen met namen die een kleurconsultant bevestigt.
- **Drie opties:**
  - Stijlgids €6,99;
  - Stijlgids + kleurenpas €9,99 (aanrader);
  - **Persoonlijke sessie €89:** gids + pas + 45 minuten online via Teams met een kleurconsultant. Dit is een echt product; de capaciteit bepaalt de oprichter.
  - "Meest gekozen" is niet gebruikt, want er zijn nog geen kopers.
- **Girl Math in de NYANSE-checkout:** echte sommen met een knipoog (€0,23 per kleur), geen geldbelofte.
- **AI-vermelding: nergens meer** (besluit van de oprichter, met het risico bij de oprichter).
  - De knop heet nu "Start mijn kleuranalyse".
  - Risico: de EU AI Act (art. 50, transparantie bij realistische gegenereerde beelden) en de ACM (een gegenereerd voor/na-beeld als bewijs).
  - Beperking: het voor/na-beeld heeft een neutraal onderschrift en claimt niet "zelfde persoon, zelfde licht".
  - Opnieuw bekijken vóór de livegang en vóór advertenties (Meta/TikTok kunnen een label eisen).
- **Kleding:**
  - strakker uitgesneden;
  - geen accessoire in de KULØRT-looks;
  - NYANSE-voorbeeld: top, rok, loafers en sjaal.
- **Maison:**
  - het huislogo op de muur van de atelierfoto en op de pas;
  - drie subseizoenen onder elk hoofdseizoen;
  - de AI-regel in de footer is weg.
- **Contactpagina** (`/contact`, mail nyansekulort@gmail.com) en een link in elke footer. KvK-gegevens volgen na de inschrijving.

## 14 oktober 2026 — overhaul: stemmen per leeftijd, echte mensen, echte kleding

- **Stemmen:**
  - KULØRT: **Wingman** (18–29) en **Director** (30+, `?s=dr`).
  - NYANSE: **Girl Math** (18–27), **Boss Lady** (28–44, `?s=bl`; was Atelier) en **Signature** (45+).
  - `?g=jong` of `?g=40` in een advertentie kiest zelf de passende stem.
  - Supabase-migratie `0003_voices_v2.sql`.
- **Merk-landing opnieuw:**
  1. Campagnefoto van de eigen stem of leeftijd, kop, eerste tik.
  2. "Herken je dit?": drie pijnpunten in de eigen toon, over kast en kopen, nooit over uiterlijk.
  3. Het bewijs (voor/na met stof) plus de drapeerspiegel om zelf te proberen.
  4. Wat je krijgt (profiel gratis, gids €6,99, pas €9,99) met productbeelden.
  5. Een look met echte kleding.
  6. Drie stappen.
  7. Afsluiter met prijs.
- **Echte kleding:** de 21 grijze kledingfoto's worden per klant omgekleurd (`scripts/prepare-garments.py`; stof, plooien en naden blijven). Ze staan in looks, de kast, de capsule en de gids.
- **Weg:** "Je foto verlaat je telefoon niet" van de homepage en de merk-landing (staat nog bij de selfie). Ook de oude hero met het label dat een zwarte balk werd.
- **Niet gebruikt:** "100% veilig, we delen niets met derden". Een absolute claim mag niet (ACM), en je e-mail gaat naar Brevo.

## 14 oktober 2026 — één merk, altijd ivoor, de drapeerspiegel

- **Eén merk:** KULØRT · NYANSE is één huis. Bovenaan elke pagina staat "KULØRT | NYANSE", met het actieve merk in inkt; een tik gaat terug naar de keuze.
- **Altijd ivoor met donkere tekst**, ook als het toestel in donkere modus staat; ook de onthulling.
- **De boodschap:** het gaat om wat het brengt, niet om "een kleur". De maison kreeg "Een kast waarin alles samengaat. Geen miskopen meer. Elke ochtend zeker. Een eerste indruk die klopt."
- **De galerij met vier gesneden gezichten is vervangen door de drapeerspiegel:** één model; zes kleuren uit het palet en twee om te laten hangen, waarbij een tik het doek verandert; modellen van het eigen leeftijdssegment.
- **Geen "op naam" meer in de teksten,** wel "je persoonlijke stijlgids". De fysieke pas wordt per seizoen gedrukt (24 ontwerpen), niet per persoon.

## 14 oktober 2026 — Nordic-prototype samengevoegd: ontwerpsysteem en homepage

- **Bron:** het Nordic-prototype van de oprichter (nu in `assets/inspiratie/nordic/`, niet in git), beoordeeld door een art director en een UX-designer. Zij concludeerden: Nordic heeft het betere ontwerpsysteem, wij de betere funnel en motor.
- **Besloten:**
  - één lettersysteem (Bodoni en Manrope) voor beide merken, op advies van de art director;
  - de pas blijft €9,99 (Nordic had €14,99, verzonnen);
  - knoppen in inkt; het accent alleen op eyebrows, de Ø en het cursieve woord;
  - een rustige onthulling, zonder gloed of raster;
  - op desktop een kolom op papier in plaats van een telefoonkaart op een gekleurd vlak;
  - op de homepage een 3D-waaier in de hero, de atelierfoto als band, en de deurteksten onder de foto (nooit over gezichten);
  - labels op het doek in plaats van op het gezicht.
- **Volgende stap** (uit de reviews):
  - de flow-omlijsting van Nordic (stap n van 5, voortgangslijn, Terug en de knop onderaan; op desktop twee kolommen);
  - de lichtcheck bij de selfie;
  - de drapeerspiegel op het profiel;
  - de envelop met de 3D-pas op de bevestiging;
  - de winkelmodus op onze 12 typen (demo op de homepage, eerste tab in de gids);
  - de logo's als echte vector;
  - three.js actueel en pas laden als het nodig is.

## 14 oktober 2026 — huisstijl doorgevoerd en eerste beeldenset

- **Logo (keuze van de oprichter):** KULØRT en NYANSE allebei in een Didone-schreef. De Ø van KULØRT heeft een lange, fijne streep. Maison-lock-up: "KULØRT | NYANSE" met "Atelier voor persoonlijke kleur".
  - **Niet overgenomen:** "Paris Amsterdam est. 2024" uit het Gemini-concept. Dat is niet waar.
  - Voorlopig gezet in Bodoni Moda; de vectorversie volgt.
- **Stijl per merk, niet per stem:** papier `#F6F2EC`, inkt `#141414`, cognac (KULØRT) of lippenstift (NYANSE), hoeken van 2 of 4px, lichtere koppen. Girl Math en Signature zijn nu alleen nog een toon, zonder eigen kleuren of letters.
- **Maison-homepage gebouwd:** lock-up, wat het is ("Je kleuren. Je kast. Je gids."), beeld van twee klanten in het atelier, twee deuren, hoe het werkt, vier seizoenen, het cadeau, AI-label in de footer. Werkt in licht en donker.
- **Beelden:** `scripts/prepare-brand-images.py` zet de originelen om naar `public/brand/` (witbalans op het T-shirt, de lege band onderaan weggesneden, verkleind) en schrijft `bron.txt`. In totaal 43 beelden.
  - Portretten: 20 bruikbaar.
  - Afgevallen door ongelijk licht: `kulort-4`, het eerste alternatief voor `kulort-jong-2` (vervangen door een ander portret) en `nyanse-40-2` (opnieuw maken).
- **Observatie (FEIT):** 12 van de 20 bruikbare portretten krijgen een Lente-type, ook de vrouw met zilvergrijs haar. Meenemen in de betrouwbaarheidsmeting.

## 14 oktober 2026 — huisstijl: één maison, twee merken

- **Aanleiding:** de gesplitste homepage op desktop miste het atelier-gevoel en de duidelijkheid. In donkere modus was de NYANSE-tekst zelfs onzichtbaar (gerepareerd).
- **Besluiten van de oprichter:**
  - **Eén maison, twee merken.** kulort-nyanse.com is het atelier voor persoonlijke kleur. KULØRT (mannen) en NYANSE (vrouwen) zijn er voor alle leeftijden van 18 tot 65.
  - **Eén look per merk, toon per leeftijd.** De leeftijd (jong, jongvolwassen, volwassen, 45+) verandert woorden, modellen en voorbeelden, niet kleur en letter. Girl Math wordt de jonge toon van NYANSE (zonder markeerstift en Bricolage), Signature de toon voor 45+.
  - **Maison-homepage:** eerst wat het is (met een cadeaubeeld), dan twee deuren.
  - **Nieuw logo** via een ontwerpronde.
- **Vastgelegd in:**
  - [brand/BRANDBOOK.md](brand/BRANDBOOK.md): maison, gevoel ↔ aanpak, verleiden zonder trucs, toon per merk en leeftijd, kleur, typografie, raster, fotografie, beweging, toepassingen en een on-brand-checklist;
  - [brand/GEMINI-HANDBOEK.md](brand/GEMINI-HANDBOEK.md): alle prompts (logo, 12 nieuwe kleurportretten, campagne per merk en leeftijd, 4 hoofdseizoenen en 12 kleurtypen met de hexwaarden uit onze motor, waaier, pas en verpakking, advertenties, kleding, stijlgids).
- **Daarna te bouwen** (na de keuze van logo en beelden):
  - het logosysteem in vector;
  - de maison-homepage;
  - de merken in de nieuwe huisstijl;
  - de leeftijdssegmenten uitbreiden naar 4 (`jong`, `jv`, `vol`, `40`).

## 14 oktober 2026 — leeftijdssegmenten en de stem Signature

- **Segmenten:** jong (±18–22) en 40+ (45–55), naast de kern (23–44). Het segment volgt de advertentie: `?g=jong` of `?g=40`, onthouden voor het bezoek. De app vraagt het nooit en leidt het nooit af uit de foto.
  - De hero, "Ook een …" en de gids kiezen de AI-modellen van dat segment. Zijn er nog geen beelden, dan valt het terug op de kern.
- **Stem Signature (NYANSE 40+, `?s=sg`):**
  - toon: rustig en zeker;
  - kop: "Kleuren die passen bij wie je nu bent";
  - grijs haar als kracht; nooit "jonger lijken" of anti-age;
  - Bodoni rechtop, aubergine, parelkleurige achtergrond, ook in donkere modus;
  - zet zelf het segment 40+ aan.
- **8 nieuwe AI-modellen:** prompts in [fase-b/AI-BEELDEN.md](fase-b/AI-BEELDEN.md). Het segment staat in de bestandsnaam (`nyanse-40-1.jpg`) en komt via het meetscript in `people.json`.
- **Supabase:** migratie `0002_signature_voice.sql` staat klaar. Draai die vóór pushmeldingen voor Signature werken.

## 14 oktober 2026 — "Ik weet mijn kleurtype al", doelgroepen, extensies

- **Tweede route:** "Ik weet mijn kleurtype al →" op de landing gaat naar `/type`: de 12 seizoenen in 4 families, elk met een strookje kleuren. Na een keuze volgt meteen het resultaat met "eigen opgave" en de gratis check met een selfie. De gids vermeldt "op basis van je eigen opgave".
  - **Geen korting.** Het is dezelfde gids, en goedkoper zou de digitale gids in feite verlagen. Een opgegeven type kan ook fout zijn (in de literatuur is 40% overeenstemming tussen mensen gemeten), dus de selfie-check blijft één tik weg.
  - Event: `type_declared`.
- **Doelgroepen per leeftijd:** voorstel in [fase-b/DOELGROEPEN.md](fase-b/DOELGROEPEN.md). Er is nog geen publieksdata.
  - Het segment volgt de advertentie, niet een leeftijdsvraag of de foto.
  - Kans: 40–55. Daarvoor 4 nieuwe AI-modellen van 45–55 en mogelijk een stem "Signature". Wacht op GO.
- **Extensies:** zie [SETUP-EXTENSIES.md](SETUP-EXTENSIES.md).
  - Wel: superpowers, `/security-review`, later Higgsfield.
  - Niet: caveman en OmniRoute.
  - Onbekend: AI influencer, Ootto, "Harvey", de cursor tracker en claudecodesetup (eerst de links).

## 13 oktober 2026 — betrouwbaarheid: "80% goed" meetbaar maken

- **FEIT (onderzoek):** het beste gepubliceerde model haalt 55% op 4 seizoenen en 32% op 12. Ook mensen zijn het vaak oneens (40% in een Thaise studie). Art of Image publiceert geen model en geen nauwkeurigheid. Zie [fase-a/BETROUWBAARHEID.md](fase-a/BETROUWBAARHEID.md).
- **Besluit:**
  - "Goed" = zelfde uitkomst als een consultant met doeken.
  - We zijn alleen stellig boven de zekerheid waarbij de 95%-ondergrens ≥ 80% is (per niveau: familie, buurseizoen, exact). Daaronder: een selfie met de kaart, of "tussen X en Y".
  - Een percentage komt pas in de app na de meting.
- **Gebouwd:**
  - expertoordeel (2 consultants, blind) per testpersoon in `/lab`;
  - rapport "Klopt het?" (exact, buurseizoen, familie, kappa tussen de experts, per Monk-groep, drempel voor een stellige uitslag);
  - `lib/eval/agreement.ts` met tests.
- **Nodig:** 60 testpersonen met 2 consultants (bij ±90% gemeten is de 80% aantoonbaar). De samenwerking met consultants (bijvoorbeeld Art of Image) is een besluit van de oprichter.
- **Inspiratie:** stijlarchetypen in [inspiratie/README.md](inspiratie/README.md), als idee voor fase C.

## 13 oktober 2026 — resultaatpagina als onthulling

- **Opbouw:**
  1. Een donkere onthulling: je kleurenwaaier vouwt in 3D open, je seizoensnaam verschijnt letter voor letter en je meest heldere kleur gloeit erachter.
  2. De voor/na-schuif, die één keer vanzelf veegt.
  3. Een AI-model uit dezelfde kleurfamilie.
  4. 6 open kleurkaarten, plus "+24 kleuren met naam in je gids" (de echte kleuren, vervaagd en zonder naam).
  5. Je kast: één gratis look en "+3 looks plus je capsule-garderobe in je gids".
  6. Wat je beter laat hangen, het waarom-blok en de prijzen. Daarna de e-mail, de schalen (uitklapbaar) en "Verwijder mijn profiel".
- **Prijzen:** elke kaart heeft een eigen koopknop, zonder vooraf gekozen optie. De €9,99-kaart toont je eigen kleurenpas en begint met het voordeel. De vaste knop zegt "Bekijk je gids · vanaf €6,99" en verdwijnt zodra de prijskaarten in beeld zijn.
- **Bron:** een review door een art director en een conversie- en UX-ontwerper (13 oktober).
- **Niet overgenomen:** de seizoensnamen in het Nederlands ("Warme Lente"). "Warm Spring" is de term die mensen googelen.
- **NYANSE-logo leesbaarder:** de tekstvariant van Bodoni (opsz 11), gewicht 500 en minder letterafstand.

## 13 oktober 2026 — kleurdoek op maat en kleding als tekeningen

- **Het kleurdoek volgt het gezicht:** hals en schouders worden berekend uit de kin en de breedte en hoogte van het gezicht, in plaats van een vaste vorm onderin. Het doek sluit aan bij de hals en bedekt het T-shirt. Voor de selfie meten we nu ook de gezichtshoogte. Controle van alle AI-modellen op `/lab/drapes`.
- **Kleding als tekeningen van een modeontwerper** (17 stuks: van T-shirt tot colbert, schoen, horloge, riem, bril, ketting en tas), ingekleurd met het eigen palet. Ze staan in de flat-lays per look (met horloge en riem of ketting en tas in het eigen metaal en leer), op de accessoirepagina, in de capsule en als één gratis look op de resultaatpagina, voor de gelegenheid die iemand koos. Kosten: €0. Komen er later Gemini-beelden (AI-FLATLAY.md), dan vervangen die de tekeningen op dezelfde plek. Controle op `/lab/flats`.

## 13 oktober 2026 — één hoofddomein met een gesplitste homepage

- **Hoofddomein `kulort-nyanse.com`** (besluit van de oprichter). Op 13 oktober vrij volgens whois, net als `nyanse-kulort.com` en `kulortnyanse.com`. Nog niet geregistreerd; dat doet de oprichter.
- **De homepage is een keuze:** links KULØRT (voor mannen), rechts NYANSE (voor vrouwen), elk in de eigen huisstijl met een AI-model. Op mobiel staan de twee helften boven elkaar. Eén tik, en je zit in de flow van het merk. Dit vervangt "geen dames/heren-vraag" uit CLAUDE.md §2, maar alleen voor wie zonder advertentie binnenkomt.
- **Advertenties slaan de keuze over:** `/kulort` en `/nyanse` (met UTM), of `?s=gm` / `?s=at`, die zelf NYANSE kiezen. Zo blijven beide merken los te adverteren en per merk meetbaar.
- **De keuze wordt onthouden voor het bezoek** (sessiecookie; aangepast op 14 oktober, eerst 30 dagen). Een nieuw bezoek begint bij de keuze. `/kies` gaat altijd terug naar de keuze. De losse merkdomeinen blijven werken en kunnen later doorverwijzen.
- **"Maak het af"-advertenties (retargeting via Meta- of TikTok-pixel): nog niet.** Dat vraagt een cookiebanner met toestemming en een trackingpixel. Dat botst met "cookieloos" (CLAUDE.md §4) en kost conversie op de landing. Het terughalen loopt nu via "je bent er bijna", de opt-in mail en de kleur van de week. Opnieuw bekijken als de eerste test laat zien hoeveel mensen halverwege afhaken.

## 13 oktober 2026 — terugkomen en engagement (churn)

- **"Je bent er bijna"** op de landing voor wie halverwege afhaakte, met het echte aantal stappen en seconden. Voortgang en antwoorden staan op het apparaat (geen persoonsgegevens). Na de selfie begint het weer bij de selfie, want de foto bewaren we nooit. Na 30 dagen stopt de melding.
- **Aanspreken als kleurtype** ("Hey Deep Autumn ✨", "Welkom terug, Soft Summer.") voor wie terugkomt, per stem.
- **Uitnodiging van een vriend alleen als het waar is:** een geldige code in de link (`?ref=DANIEL-7K3Q`) toont "Daniel stuurde je dit" en €1 korting in de checkout. De korting wordt bij de betaling opnieuw op de server gecontroleerd (max. 10 per code, CLAUDE.md §2).
- **Kleur van de week via web push (opt-in, gratis):** één melding per week, alleen tussen 10:00 en 20:00 lokale tijd, met een kleur uit het eigen palet. De toestemming wordt pas gevraagd na een tik op onze knop in de gids, en uitzetten kan met één tik. Op de iPhone werkt push alleen vanaf het beginscherm. Daarom is er nu een echte app per merk (manifest en icoon). Opslag in Supabase (EU), en "Verwijder mijn profiel" wist het ook daar. Kosten: €0 (Vercel Cron en web push zijn gratis).
- **Gebruik meten:** `app_open` (bezoek, dagen sinds eerste bezoek, vanaf beginscherm ja/nee, fase), `resume_shown/click`, `invite_view`, `push_optin/optout`.
- **Bewust niet gebouwd** (CLAUDE.md §2 en §12, plus de DSA en de Wet oneerlijke handelspraktijken):
  - korting of downsell als iemand wil weggaan;
  - meldingen getimed op doomscrollen of op hoe lang iemand online is;
  - "je vrienden raden dit aan" zonder echte uitnodiging;
  - "deze outfits kun je mislopen" zonder echte einddatum;
  - bekende namen per regio. "Vaak genoemd als" kunnen we voor Nederlandse bekendheden niet onderbouwen; dat wordt een verzonnen claim over een echt persoon.
  - "Doorpakken op wie live is": het enige verkoopmoment blijft de knop die op de resultaatpagina blijft staan.

## 13 oktober 2026 — gratis precies type, printpartner, grote schermen

- **Het precieze type (bijv. Bright Winter) is gratis.** Het is via Google toch te vinden en het is het deelbare moment. De gids verkoopt wat Google niet kan: *"Welke 30 kleuren precies bij jóu passen, en hoe je ze combineert, niet."* Het gratis resultaat toont familie plus precies type.
- **Kleurenpas via een printpartner** (print-on-demand, automatisch, nul werk voor de oprichter). De wekelijkse batch per post uit §7 vervalt. Levering: "binnen ±1 week".
- **Verzending naar NL, BE en DE.** Talen (EN, DE, ES) staan op de verbeterlijst; Duits eerst.
- **Geen juristcheck en geen conceptlabels in de interface** (besluit oprichter: kleine bedragen, zelf oplossen). Het wettelijk verplichte vinkje voor afstand van het herroepingsrecht blijft.
- **Betalen: keuze later.** Zonder KvK geen Mollie; de checkout is neutraal gebouwd. KvK-inschrijving staat bovenaan de verbeterlijst.
- **De landing is een volledige productpagina:** op desktop links de tekst en de eerste keuze, rechts een grote foto. Daaronder een galerij met het verschil, de drie stappen, een vergelijking tussen gratis en gids, en vertrouwen.
- Verbeterlijst: [fase-b/VERBETERLIJST.md](fase-b/VERBETERLIJST.md).

## 13 oktober 2026 — Customer Experience-review en AI-beelden

- **AI-gegenereerde mensen in de hero** (besluit van de oprichter). Voorwaarden: AI-label onder het beeld, één neutrale foto per persoon, en het kleurdoek legt de app er zelf onder op basis van onze eigen analyse (geen apart bewerkte "slechte" versie). Shotlist en prompts: [fase-b/AI-BEELDEN.md](fase-b/AI-BEELDEN.md). Meetscript: `scripts/measure-people.mjs`.
- **De CX Director raadt AI-gezichten af** ("een gegenereerde voor/na is verzonnen bewijs") en adviseert een kleine echte fotoshoot (AANNAME €150–300). Afweging: AI-beeld met label toont *hoe het werkt*, geen bewijs. Een echte shoot blijft de betere optie voor advertenties en het selfievoorbeeld.
- **De illustratie maakte de "foute" kant grijzer.** Dat is manipulatie en is verwijderd. Alleen het doek en de weerspiegeling ervan veranderen.
- **Regels v3:** geen zichtbaar haar (kaal, hoofddoek, pet) geeft nog maar een kleine straf. In v2 kreeg iedereen zonder haar altijd "Voorlopig". Antwoordoptie "Bedekt (hoofddoek, pet)" toegevoegd; "heel kort" telt als naturel haar.
- **Profiel lokaal bewaard** (alleen getallen, nooit de foto), met "Welkom terug" en één tik op "Verwijder mijn profiel" (§5). Werkt ook als opslag geblokkeerd is: dan valt het terug op het geheugen.
- **Bij lage betrouwbaarheid eerst een nieuwe selfie**, niet de betaalknop.
- **Beloftes alleen voor wat er op 3 november is:** geen outfits of producten in de gids-tekst tot de catalogus er is.
- **Nieuw:** foutpagina, 404, bevestigingspagina `/klaar` (betaald / wacht / mislukt, zonder downsell), adresformulier voor de pas (NL en BE), tip per mislukte check, pauze na een nieuwe poging, laad-timeout, QR-code op desktop, typfoutsuggestie voor e-mail, "Mail mij mijn profiel" op het resultaat.
- **Open voor de oprichter:** de pas alleen naar NL of ook naar BE (BE-porto nog checken), en de afstand van het herroepingsrecht (jurist).

## 13 oktober 2026 — overhaul na expertreview

Zie [fase-b/EXPERT-REVIEW-2026-10-13.md](fase-b/EXPERT-REVIEW-2026-10-13.md) voor alle bevindingen. Kort:
- **Hero:** de kleurdoekentest als illustratie in plaats van de pas (die las als bankpas). Woordmerken zonder beeldmerk.
- **Kop zegt wat het is:** "Kleuranalyse uit één selfie". Geen ongemeten tijdclaims. Gratis en betaald staan apart op de landing.
- **Eerlijkheid voor elke huidtint:** de lichtcheck gebeurt op het oogwit, niet op de huid.
- **Selfie:** één tik "Ik ben 16+ · camera aan" en automatisch vastleggen. **Resultaat:** geen vooraf gekozen tarief, en een geldige herroepingsvraag in de checkout.
- **Herenpalet voor KULØRT.** De zonvraag is geschrapt; goud/zilver beslist alleen bij twijfel tussen warm en koel.
- **Social-koppeling om foto's op te halen: nee.** De Instagram-API voor persoonlijke accounts is per december 2024 gestopt, scrapen kan niet (§12), het gaat in tegen de AVG (gezichten van anderen) en gefilterde foto's zijn slechte input. Wel beschikbaar: een foto uit de eigen camerarol.

## 13 oktober 2026 — analyse, e-mail en gratis resultaat

- **Laadschermen werken twee kanten op** (verzoek oprichter). De bezoeker ziet zijn eigen schalen één voor één verschijnen. Wij stellen twee vragen: natuurlijke haarkleur (gebruikt: geverfd of kaal haar telt niet mee voor de ondertoon, grijs haar wel voor contrast) en zonreactie (alleen bewaard; pas gebruiken als fase A laat zien dat het helpt).
- **Regels v2.** Haarwarmte komt nu uit de kleurkracht (koper en goud tegenover as), niet uit de tint-hoek; koper telde in v1 als koel. Betrouwbaarheid: tot ΔE 2 verschil tussen de wangen is normaal, zonder kaart maximaal 0,8. Waarom: in v1 moest vrijwel iedereen zonder kaart een tweede selfie maken, terwijl de live check groen gaf.
- **Masterlijst van 156 kleuren** (13 per seizoen) met merkeigen namen (KULØRT: Navy, Cognac, Antraciet, Bordeaux; NYANSE: Poederroze, Nachtblauw). Per profiel de 30 dichtstbijzijnde kleuren; te vermijden: het verst weg in ondertoon en helderheid, gespreid.
- **Gratis resultaat toont de familie** (Lente, Zomer, Herfst of Winter), de drie schalen, 6 kleuren en wat je beter vermijdt. **Het precieze type** (bijv. Bright Winter) en alle 30 kleuren zitten achter de betaling. Daar draait het verdienmodel om.
- **Geen verzonnen prijzen in de waarom-blokken.** Atelier vergelijkt met de tijd van een kleuradviseur, niet met een prijs (nog geen bron). Wingman noemt de eerste indruk in 0,1 seconde, met bron. Girl Math rekent €6,99 ÷ 365, zonder geldbelofte.
- **Levertijd van de pas: "binnen 10 dagen" in plaats van "3 werkdagen"**, omdat de passen in een wekelijkse batch gaan.
- **E-mail en betalen zijn nog niet aangesloten** (Brevo en Mollie): het e-mailadres blijft in de sessie, de checkout-sheet zegt "testversie".

## 13 oktober 2026 — selfie-stap

- **Haarmodel van 0,8 MB in plaats van het multiclass-model van 16 MB.** Download voor bezoekers: ±22 MB → ±8 MB. Meting op de testfoto: zelfde huid- en haarwaarden (haar L\* 14,5 vs 14,4), analyse 3× sneller (±0,4 s). Huidgebieden komen nu uit de gezichtspunten, zonder haarpixels. Geldt ook voor `/lab`, zodat lab en app hetzelfde meten.
- **Modellen laden tijdens het stijlscherm**, niet op de landing: wie op de landing afhaakt, betaalt geen 8 MB aan data.
- **Live camera alleen via https** (regel van iOS en Android). Zonder https valt de stap terug op de camera-app van de telefoon (`capture="user"`). Beide routes gebruiken dezelfde analyse.
- **Kwaliteitspoort:** bij betrouwbaarheid < 0,5 één extra selfie met een concrete tip. Ook de tweede laag? Dan door met de vlag `lowConfidence`, zodat het resultaat niet stellig wordt gebracht (§5).
- **AANNAME om te meten:** zonder kaart is de betrouwbaarheid maximaal 0,7, dus vooral licht en resolutie bepalen of iemand een tweede selfie moet maken. Als dat in de praktijk bij veel mensen gebeurt, passen we de drempel aan op basis van de fase A-data.

## 13 oktober 2026 — fase B parallel aan de fase A-tests

- **Fase B start parallel** (besluit oprichter): terwijl de testpersonen meedoen, bouw ik de klantflow in de echte huisstijl. De echte analyse koppel ik pas na de gate. Waarom: 3 november is anders te krap. Risico: klein, want de schermen staan los van de kleurlogica.
- **Merk via domein, stem via advertentie:** `proxy.ts` zet merk en stem per request (lokaal `?brand=`, `?s=gm|at`). Op een merkdomein wint altijd het domein. Functionele cookies onthouden de keuze tijdens het bezoek.
- **Lettertypes via next/font** (self-hosted, geen verzoek naar Google). Alleen Archivo en Manrope worden vooraf geladen (KULØRT is de eerste test).
- **Merkwissel met antwoorden** via een token in de link (1 uur geldig, alleen gelegenheid, budget en winkels; gefilterd op bekende waarden).
- **Girl Math-vinkje aangepast** van "Elke miskoop minder = geld in je zak" naar "Minder miskopen, meer outfits die werken": geen letterlijke geldbelofte (§6).

## 13 oktober 2026 — fase A, week 1 gebouwd

- **Supabase in West EU (Ierland)** in plaats van Frankfurt: ook EU, voldoet. Niet opnieuw aanmaken.
- **`/lab` is de eerste route van de echte app** (Next.js 16, TypeScript strict). De kleurlogica en kaartdetectie gaan zo mee naar fase B.
- **ArUco via js-aruco2 (54 kB) in plaats van OpenCV.js (±8 MB).** Herkent onze marker (getest tegen OpenCV). Omgezet naar één ES-module (`scripts/vendor-aruco.mjs`), omdat de moderne bundler het oude script niet slikt.
- **MediaPipe-modellen en WASM op ons eigen domein** (`scripts/setup-models.mjs`), niet via Google of een CDN. Er gaat bij een analyse dus niets naar derden.
- **Haar en baard via segmentatie** (selfie_multiclass), niet via een vaste strook boven het voorhoofd. Dat werkt ook bij een pony, kaal hoofd of lang haar, en scheidt een baard van de wanghuid.
- **Meten en regels zijn gescheiden.** We bewaren de meetwaarden (Lab per gebied); het profiel wordt steeds opnieuw berekend. Een regelaanpassing werkt dus direct op oude tests, zonder nieuwe foto's. Daardoor is het bewaren van testfoto's minder nodig (toestemming 2 is optioneel).
- **Elke kaartfoto wordt ook zonder correctie gemeten:** zuiver effect van de kaart op precies dezelfde foto.
- **Ondertoon = afstand tot de neutrale lijn, niet de tint-hoek.** Gevonden in de eerste end-to-end-test: bij bleke of overbelichte huid sprong de hoek alle kanten op (spreiding 0,39 → 0,13 op dezelfde foto in 3 lichtsoorten).
- **Week 1 slaat op in de browser (IndexedDB)** met back-up en CSV-export; Supabase volgt in week 2.
- **Testpersonen 18+** (het toestemmingsformulier), strenger dan 16+ in het product: een test met huidtint verdient extra zorg.
- **Open vraag aan de oprichter:** telt een uitslag "op de rand" (bijv. Bright Spring ↔ Bright Winter) mee als andere uitslag in de gate? Zie de samenvatting van 13 oktober.

## 12 oktober 2026 — fase A gestart

- **Referentiekaart v1** ([PDF](fase-a/referentiekaart-v1.pdf), bron: `tools/card/`). ArUco `DICT_4X4_50` id 1 (grote cellen, dus ook klein in beeld te herkennen; ondersteund door OpenCV.js en js-aruco2), 18%-grijs (#777777), wit = onbedrukt papier, en 4 controlevlakken: lichte en donkere huid plus rood (warm) en blauw (koel), want ondertoon is precies de as die we meten. Kosten: €0 (zelf printen).
- **De layout staat in één bestand** (`tools/card/layout-v1.json`), zodat de print en de detectie in `/lab` niet uit elkaar kunnen lopen.
- **Thuisgeprinte kaart = alleen relatieve correctie.** Genoeg voor de consistentie-gate; voor de echte pas is een drukkerij nodig.
- **Voorstel (wacht op GO):** naast consistentie ook spreiding en een grondwaarheid meten. Zie [fase-a/PLAN.md](fase-a/PLAN.md).

## 12 oktober 2026

- **Twee merken: NYANSE (vrouwen) en KULØRT (mannen).** Eén motor, twee stemmen-sets. Waarom: een hip, Noords modemerk geeft vertrouwen, en de ø ziet er sterk uit. Beide .com-domeinen gaven "No match" in whois.
- **Huefit afgevallen:** huefit.store (gratis Chrome-extensie, India, sinds 2025). **Monteint afgevallen:** een Moncler-productlijn. **Teintu afgevallen:** voelde oubollig. Ook bezet: Drape, Undertone, ToneFit, Tint, Glød.
- **Prijs blijft €6,99 / €9,99.** Digitaal niet gratis maken: het draait om zichtbaarheid op social en de impulsaankoop.
- **Lens (browser-extensie) is de eerste prioriteit na een GO.** Je AI-shoppingmaatje dat op elke webshop je kleuren markeert.
- **Overgenomen van huefit.store:** Monk Skin Tone Scale voor het testen, analyse op het apparaat, profiel lokaal met één tik verwijderen, en een "nooit op commissie"-belofte. **Niet overgenomen:** onbewezen cijfers en anonieme testimonials.
- **Geen kinderen** (AVG art. 8, DSA, kleuring verandert nog).
- **Reddingsplan na de red team:** kalibratiepas, profiel op drie schalen in plaats van 12 vakjes, merk-badge voor webshops als vaste maandomzet, reveal-video en creators op commissie in plaats van advertenties in Q4, en eerst twee gratis tests als stoppunt.
- **Eén vraag om geld in de flow.** Upsells naar de mail. Geen disclaimer-teksten in de interface.
- **Tastbaar product:** een kleurenpas in de brievenbus (€9,99-pakket).
