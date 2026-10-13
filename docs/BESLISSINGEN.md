# Beslissingen

Nieuwste bovenaan. Per beslissing: wat, waarom, en wat het kost.

## 13 oktober 2026 — kleurdoek op maat en kleding als tekeningen

- **Het kleurdoek volgt het gezicht:** hals en schouders worden berekend uit de kin en de breedte en hoogte van het gezicht, in plaats van een vaste vorm onderin. Het doek sluit aan bij de hals en bedekt het T-shirt. Voor de selfie meten we nu ook de gezichtshoogte. Controle van alle AI-modellen op `/lab/drapes`.
- **Kleding als tekeningen van een modeontwerper** (17 stuks: van T-shirt tot colbert, schoen, horloge, riem, bril, ketting en tas), ingekleurd met het eigen palet. Ze staan in de flat-lays per look (met horloge en riem of ketting en tas in het eigen metaal en leer), op de accessoirepagina, in de capsule en als één gratis look op de resultaatpagina, voor de gelegenheid die iemand koos. Kosten: €0. Komen er later Gemini-beelden (AI-FLATLAY.md), dan vervangen die de tekeningen op dezelfde plek. Controle op `/lab/flats`.

## 13 oktober 2026 — één hoofddomein met een gesplitste homepage

- **Hoofddomein `kulort-nyanse.com`** (besluit van de oprichter). Op 13 oktober vrij volgens whois, net als `nyanse-kulort.com` en `kulortnyanse.com`. Nog niet geregistreerd; dat doet de oprichter.
- **De homepage is een keuze:** links KULØRT (voor mannen), rechts NYANSE (voor vrouwen), elk in de eigen huisstijl met een AI-model. Op mobiel staan de twee helften boven elkaar. Eén tik, en je zit in de flow van het merk. Dit vervangt "geen dames/heren-vraag" uit CLAUDE.md §2, maar alleen voor wie zonder advertentie binnenkomt.
- **Advertenties slaan de keuze over:** `/kulort` en `/nyanse` (met UTM), of `?s=gm` / `?s=at`, die zelf NYANSE kiezen. Zo blijven beide merken los te adverteren en per merk meetbaar.
- **De keuze wordt onthouden** (functionele cookie, 30 dagen). Wie terugkomt, ziet meteen het eigen merk met "je bent er bijna". De losse merkdomeinen blijven werken en kunnen later doorverwijzen.
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
