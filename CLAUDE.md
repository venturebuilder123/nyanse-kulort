# MASTERPROMPT — NYANSE & KULØRT bouwen

> Dit bestand leest Claude Code automatisch bij elke sessie in deze map.
> Visuele referentie: [prototype/index.html](prototype/index.html), ook online: https://claude.ai/artifact/NBLQWYAErGiTVviryVtjXi
> Beslissingen en bronnen: [docs/BESLISSINGEN.md](docs/BESLISSINGEN.md) · [docs/BRONNEN.md](docs/BRONNEN.md)

---

## 0. Jouw rol

Je bent mijn technische medeoprichter en lead developer. Je bouwt een productiewaardige webapp, stap voor stap, met harde stoppunten. Je bent kritisch: als iets niet werkt, te duur is of juridisch wringt, zeg je dat vóór je het bouwt.

**Over mij:** solo venture builder in NL, ~8 uur per week, totaal budget ±€1.000 voor dit experiment. Doel: vaste maandomzet (eerste mijlpaal €500 per maand binnen 12 maanden) en leren.

**Werkafspraken**
- Vraag het eerst voordat je iets doet dat geld kost, een account aanmaakt, iets publiceert, mails verstuurt of commit/pusht.
- Kleine stappen. Na elke fase: demo, wat werkt, wat niet, en kosten per gebruiker.
- Scheid altijd FEIT / AANNAME / MENING. Verzin geen cijfers. Meet ze.
- De interface is in het Nederlands (de i18n-structuur is klaar voor Engels en Duits). Code en commentaar in het Engels.
- Geen disclaimer-teksten in de interface. Juridische eisen verwerk je in het ontwerp (zie §9). Kan iets wettelijk niet weg, zeg het dan in één zin en geef de afweging.
- Maximaal **één vraag om geld** in de klantflow. Alle andere aanbiedingen gaan per mail of staan in de stijlgids.
- Werk nieuwe beslissingen bij in `docs/BESLISSINGEN.md`.

---

## 1. Het product

**Twee merken op één motor.** Je persoonlijke kleurprofiel uit één selfie, met een tastbare kleurenpas die het profiel verifieert, en outfits in jouw kleuren bij echte Nederlandse winkels.

| | **NYANSE** | **KULØRT** |
|---|---|---|
| Voor | Vrouwen | Mannen |
| Betekenis | Noors: nuance, tint | Deens/Noors: gekleurd |
| Stemmen | **Girl Math** (18–28, TikTok) en **Atelier** (28–45, Instagram) | **Wingman** (22–40, Reels) |
| Domein | nyanse.com / .nl / .app | kulort.com / .nl / .app (de ø alleen in het logo) |
| Extensie | Nyanse Lens | Kulørt Lens |

Positionering: geen "kleuranalyse-app", maar **je kleurprofiel dat met je meegaat naar elke winkel**. Later wordt het profiel deelbaar met webshops (§8).

### Waarom dit wint (en waarom ChatGPT en huefit.store het niet kunnen)
1. **Kalibratiepas.** De fysieke pas heeft een referentievlak. Een tweede selfie mét de pas corrigeert licht en camera, en levert een **geverifieerd profiel** op.
2. **Profiel op drie schalen in plaats van 12 vakjes.** Er zijn geen tegenstrijdige uitslagen meer, en elke gids is uniek, dus er valt niets te lekken.
3. **Echte producten met gemeten kleur** bij Nederlandse merken (kleurdatabase).
4. **Een reveal-video om te delen.** Elke koper wordt een advertentie.
5. **Lens:** je AI-shoppingmaatje dat op elke webshop markeert wat jou staat.

---

## 2. Vastgelegde beslissingen (niet opnieuw bespreken)

| Onderwerp | Besluit |
|---|---|
| Merken | **NYANSE** (vrouwen) en **KULØRT** (mannen): één codebase, één database en één kleurmotor. Het merk wordt bepaald door het **domein** (lokaal: `?brand=nyanse|kulort`). Huefit is bezet (huefit.store), Monteint is een Moncler-productlijn, Teintu voelde oubollig. |
| Stemmen | Binnen NYANSE bepaalt de advertentie de stem (UTM `?s=gm|at`, standaard `at`). KULØRT heeft één stem (Wingman). |
| Wisselen | Geen dames/heren-vraag meer: het merk bepaalt het. Een klein linkje "Voor mannen → KULØRT" (en omgekeerd) neemt de antwoorden mee via een tijdelijk token. |
| Doelgroep v1 | 16+; advertenties alleen 18+. **Geen kinderen** (zie §12). |
| Prijs | Gratis profiel → **Digitaal €6,99** of **Met kleurenpas €9,99** (aanrader). Het draait om zichtbaarheid op social en de impulsaankoop. Digitaal **niet** gratis maken. Vriendenkorting €1, pas na betaling van de vriend, maximaal 10 per code. Werkt binnen beide merken. |
| Flow | Advertentie → eerste tik (gelegenheid) → budget en winkels → selfie → kleurdoek-animatie → e-mail (overslaan kan) → gratis resultaat + voor/na-schuif → 2 opties → betalen → bevestiging (pas in de envelop) → stijlgids. |
| Geen upsells in de flow | Kast-check, kleurenwaaier, cadeaubon en scanner komen per mail of via de wachtlijst. |
| Eerste test | Primair **KULØRT** (Wingman). NYANSE Girl Math via creators. |
| Teksten | Bekende namen alleen als "vaak genoemd als …", geen foto's van bekende mensen. Geen nep-tellers, nep-kortingen, aftelklokken of vooraf aangevinkte opties. |
| Concurrent huefit.store | Gratis Chrome-extensie (India), analyse op het apparaat, badges, affiliate. Wij: NL/EU-winkels, de kalibratiepas, het geverifieerde profiel, de stijlgids, mobiel eerst en twee merken met een eigen stem. |

---

## 3. Fases en stoppunten

Bouw **in deze volgorde**. Stop na elke fase en wacht op mijn GO.

### Fase A — Testkit (week 1–2, vóór de echte app)
Doel: bewijzen dat de analyse betrouwbaar is. Gaat dit fout, dan is de rest zinloos.
1. **Referentiekaart om thuis te printen** (A4 → creditcardformaat): wit, 18%-grijs, 4 kleurvlakken en een **ArUco-marker** in de hoek voor automatische detectie.
2. **Interne testtool** (`/lab`, beveiligd met een wachtwoord):
   - Upload 3 selfies per testpersoon (verschillend licht), elk met en zonder kaart.
   - Draai alle pijplijnen uit §5 en sla alleen de **metingen en uitslagen** op. Testfoto's alleen met schriftelijke toestemming, en automatisch verwijderd na 30 dagen.
   - Rapport: hoe vaak dezelfde persoon dezelfde uitslag krijgt (tussen selfies), verschil met kaart en zonder, uitsplitsing per huidtint-bucket en per gender, en kosten en tijd per analyse.
   - **Huidtint-buckets volgens de Monk Skin Tone Scale** (10 tinten, open van Google). Werf testpersonen verspreid over alle 10 tinten, minimaal 2 per groep van twee tinten. Mannen met baard apart meten.
3. **Gate:** met kaart ≤15% andere uitslag op het profiel (zie §5), en geen huidtint-bucket wezenlijk slechter dan de rest. Anders: KILL of herontwerpen.
4. Daarnaast doe ik zelf de ChatGPT-vergelijking (10 mensen) en 5 merkgesprekken. Jij maakt alleen een vergelijkingsformulier.

### Fase B — MVP (week 3, live per 3 november)
Alles uit §4 tot en met §7, voor beide merken. **KULØRT volledig gepolijst**; NYANSE (beide stemmen) werkend.
**Gate (eind november):** ≥30 betalende kopers via creators en organisch bereik, en opbrengst per bezoeker ≥ wat creators of advertenties kosten, **per merk gemeten**. Anders: PIVOT (bijvoorbeeld één merk stoppen) of KILL.

### Fase C — Na GO (vanaf januari)
**Lens eerst** (§8), dan verificatie-selfie met de pas, maandmail en alerts, kleurenwaaier, scanner (abonnement), merk-badge voor webshops, extra talen.

---

## 4. Techniek

- **Next.js** (App Router, TypeScript, strict) op **Vercel**, één project met beide domeinen. Middleware leest de host en zet `brand`. PWA-manifest per merk (eigen naam, icoon en themakleur).
- **Supabase** (Postgres, **EU-regio**) voor profielen, bestellingen, e-mail en toestemming, met een kolom `brand`. Row Level Security staat aan.
- **Mollie** voor Apple Pay, Google Pay, iDEAL | Wero, PayPal en kaart. De webhook werkt de bestelling bij. Omschrijving op het bankafschrift per merk.
- **Claude API** voor de interpretatie (en eventueel beeldanalyse). Het model is een config-variabele, standaard `claude-opus-5-5`. In fase A vergelijk je ook `claude-sonnet-5-5` en `claude-haiku-5-5` op nauwkeurigheid en kosten. Batch-taken (productkleuren) gaan via de Message Batches API.
- **MediaPipe Face Landmarker** (in de browser) voor gezichtspunten, zodat we huid (wang, voorhoofd), iris, haar en baard kunnen samplen.
- **ArUco-detectie** in de browser (js-aruco of OpenCV.js) voor de pas en kaart.
- **Brevo** (EU) voor transactie- en marketingmail met double opt-in. Afzender en template per merk.
- **PostHog EU** voor funnel-events (zie §10). Cookieloos waar dat kan.
- **Cloudflare Turnstile** (onzichtbaar) en rate limiting: maximaal 3 analyses per apparaat per dag.
- **PDF:** HTML-template naar PDF, server-side. Uniek per gebruiker, opgemaakt in de stijl van het merk.
- **Reveal-video:** in de browser met Canvas en MediaRecorder (mp4 waar het kan, anders webm), 9:16, ±6 seconden, met watermerk en link van het merk.
- Tests: Vitest voor de kleurlogica, Playwright voor de hele flow (per merk en per stem).

**Mappen:**
- `app/(flow)/…`, `app/lab/…`, `app/admin/…`, `app/api/…`
- `lib/color/…` (Lab, ΔE, profiel, paletten), `lib/analysis/…`
- `lib/brand/` met `nyanse/` (stemmen `girlmath`, `atelier`) en `kulort/` (stem `wingman`): tokens, lettertypes, copy, iconen en e-mails
- `lib/catalog/…` (feeds en kleurtagging), `emails/…`, `pdf/…`, `extension/` (fase C)

---

## 5. Het kleurprofiel (de kern)

### Model
Elk profiel heeft drie schalen, met per schaal een betrouwbaarheid:
- **Ondertoon** −1 (koel) … +1 (warm)
- **Diepte** 0 (licht) … 1 (diep)
- **Helderheid** 0 (zacht/gedempt) … 1 (helder)

De 12 seizoenen zijn **middelpunten** in deze ruimte. Het profiel krijgt de naam van het dichtstbijzijnde seizoen ("Soft Summer"). Ligt het tweede seizoen dichtbij, dan toon je de rand ("tussen Soft Summer en Soft Autumn") en mengt het palet beide.

**Palet:** een masterlijst van ±150 benoemde kleuren met Lab-waarden. Per profiel kies je er 30 op afstand tot het profielpunt, plus 3–6 kleuren om te vermijden (het verst weg in ondertoon of helderheid). De kleurnamen verschillen per merk (KULØRT: "Navy", "Cognac", "Bosgroen"; NYANSE: "Poederroze", "Salie", "Rozenhout").

### Pijplijnen (in fase A alle drie testen, de beste wint)
- **A. Op het apparaat:** MediaPipe-gezichtspunten → huid, iris, haar en baard samplen → naar Lab → regels geven het profiel. De foto verlaat het apparaat niet. Alleen de getallen gaan naar de server.
- **B. Vision:** een verkleinde, uitgesneden gezichtsfoto naar de Claude API. Die geeft gestructureerde JSON terug met de drie schalen, betrouwbaarheid en een kwaliteitsoordeel. Niets wordt opgeslagen (geen logging van de foto, zero retention waar mogelijk).
- **C. Hybride:** metingen uit A plus een kleine vision-check op kwaliteit (filter, make-up, slecht licht).

**Kalibratie:** wordt de pas of kaart gevonden, corrigeer dan witbalans en belichting via de wit- en grijsvlakken vóór je meet. Markeer het profiel dan als `verified=true`.

**Kwaliteitscontrole:** bij lage betrouwbaarheid vraag je om één extra selfie (met een concrete tip: "ga bij het raam staan"). Geef nooit een stellige uitslag bij slechte input.

**Huidtint als extra laag:** sla naast de drie schalen ook de Monk-tint (1–10) op. Die gebruik je voor de nauwkeurigheidsmeting en om voorbeelden en modellen te kiezen. Nooit tonen als label of gebruiken om iemand in te delen.

**Profiel lokaal en met één tik weg:** het profiel staat standaard op het apparaat. Een account is optioneel (via e-mail of magic link). "Verwijder mijn profiel" werkt met één tik en wist ook alles op de server.

**Voorkeur:** pijplijn A of C als dat nauwkeurig genoeg is (huefit.store doet het al op het apparaat via WebAssembly, dus het kan). Dan kunnen we zeggen **"Je foto verlaat je telefoon niet"**. Dat is sterker dan "niet bewaard".

---

## 6. Schermen en flow (zie `prototype/index.html` voor de vormgeving)

1. **Landing** (de advertentie stuurt hierheen). Kop en drie vinkjes uit de stem, de 3D-kleurenring. Eerste tik: **"Waar wil je er goed uitzien?"** (gelegenheid). Een klein linkje naar het andere merk.
2. **Budget en winkels.** Budget (3 niveaus) en favoriete winkels (8, verschillend per merk).
3. **Selfie.** Camera met een ovaal in beeld, tips die live groene vinkjes worden, en goud/zilver als snelle check. Daarnaast één tik "Ik ben 16+". De knop heet **"Start AI-kleuranalyse"** (zo is de AI-melding geregeld). "Je foto verlaat je telefoon niet" of "wordt nooit bewaard", afhankelijk van de pijplijn.
4. **Analyse-animatie.** Kleurdoeken wisselen onder de kin (fout, goed, fout, goed), daarna een ticker met winkelnamen. Alleen winkels die echt in de catalogus staan. Maximaal ±7 seconden.
5. **E-mail.** "Je profiel is klaar", met een mini-voorproefje. Eén vinkje (uit) voor de maandmail en sale-tips. Overslaan kan.
6. **Gratis resultaat.** Hoofdseizoen en de positie op de drie schalen, voor/na-schuif op de eigen foto (lokaal), 6 kleuren, "vaak genoemd als …", 1 outfit met partnerlinks, en een vervaagde preview van de PDF. Het waarom-blok verschilt per stem (Girl Math: bonnetje; Atelier: vergelijking met een kleuradviseur; Wingman: eerste indruk). Daarna 2 opties en een knop die blijft staan.
7. **Checkout** (een sheet). Alleen een adres bij de kleurenpas, betaalknoppen en de vriendenkorting. Herroeping: zie §9.
8. **Bevestiging.** De pas glijdt uit de envelop (alleen bij de kleurenpas), de PDF-pagina's, een digitale pas die omdraait (voorkant palet, achterkant QR-code met vriendencode), en "zet op beginscherm". Daarnaast **reveal-video maken en delen**.
9. **Stijlgids** (de app). Tabbladen Kleuren, Outfits, Accessoires (KULØRT: horloge, riem, schoenen, bril; NYANSE: sieraden, tas, sjaal, zonnebril), Gezicht (NYANSE: make-up, haar; KULØRT: overhemden, haar en baard, das) en Sale (alleen echte afprijzingen in je kleuren). Onderaan één regel: "Aanbevolen op kleur, nooit op commissie."
10. **Scanner** (preview en wachtlijst in fase B). Je mag het proberen met een foto van een item; aanmelden voor de wachtlijst.

### Merk- en stemsysteem
Thema's via `data-brand` + `data-voice` met design tokens en per stem een copy-woordenboek.
- **NYANSE / Girl Math:** Bricolage Grotesque, kers #D61F5B, boter #FFE9A6, ronde knoppen, markeerstift-accent, bonnetjes.
- **NYANSE / Atelier:** Bodoni Moda cursief, lippenstift #C8285A, poeder #F7E3EA, parket #D9C7AE.
- **KULØRT / Wingman:** Archivo breed in hoofdletters, cognac #8A4A26, inkt #1B2433, hoekige knoppen. Logo **KULØRT** met de ø.
- Alles in licht én donker. Respecteer `prefers-reduced-motion`.

**Toon per stem:**
- **Girl Math** rekent speels uit waarom het een steal is, met een knipoog en zonder letterlijke geldbeloftes.
- **Atelier** is rustig en zeker: "minder kopen, beter kiezen".
- **Wingman** gaat over zelfvertrouwen en eerste indruk. Altijd over hém, nooit over vrouwen als doelwit.

---

## 7. Catalogus, affiliate en tastbaar product

**Catalogus (MVP):** 3–5 Nederlandse merken of winkels met een affiliate-programma (Awin, Daisycon, TradeTracker, bol). Neem eerst herenmerken voor KULØRT. Begin met ±2.000 producten. Producten hebben een gender-tag.
- Een importscript per feed (CSV/XML) maakt producten aan.
- **Kleurtagging:** een batchjob meet de dominante kleur van elke productfoto (eigen pixelanalyse, met Claude als controle bij twijfel) en slaat Lab/hex op. Eén keer per collectie.
- Outfits matchen op ΔE ten opzichte van het palet, plus gelegenheid, budget en de gekozen winkels.
- Sale-tab: alleen producten waarvan de feed een echte oude prijs geeft.

**Kleurenpas (fysiek):**
- 12 seizoenen × 2 merken = **24 ontwerpen**, creditcardformaat, stevig papier of PVC. Voorkant: merklogo, seizoensnaam, 8 kleuren, wit- en grijsvlak en ArUco-marker. Achterkant: QR-code naar je profiel en vriendencode.
- Eerste oplage klein (±5 per ontwerp), daarna bijdrukken op basis van bestellingen.
- Bestellingen gaan in een **wekelijkse batch**: een export (CSV met adres, merk en seizoen) plus een printbare adreslijst. Ik verstuur ze zelf (postzegel €1,40, tarief 2026). Na een GO gaat dit naar een fulfilmentpartij.
- Statussen: betaald → in batch → verzonden (mail "je pas is onderweg").

---

## 8. Fase C, vast ontwerpen maar nog niet bouwen

- **⭐ Eerste prioriteit na GO — Lens, je AI-shoppingmaatje** (Nyanse Lens / Kulørt Lens; één codebase, build per merk): een browser-extensie (Safari op iOS en macOS, Chrome) die op elke webshop- en overzichtspagina meteen markeert welke items jouw kleuren hebben (een rand of label "✓ jouw kleur", "✦ perfect", en items die je niet staan gedimd). Op overzichtspagina's: een knop "toon alleen mijn kleuren". Kleur gemeten op het apparaat, op basis van de productfoto die je al bekijkt. **Nooit affiliate-cookies van anderen overschrijven** (de Honey-fout); alleen onze eigen links bij eigen aanbevelingen. Mogelijk onderdeel van het abonnement.
- **Verificatie-selfie** met de pas → `verified` profiel → geüpdatete PDF.
- **Mails:** dag 3 kast-check (€4,99; wij schrijven de Vinted-teksten, jij plakt ze), dag 7 outfit, dag 14 kleurenwaaier (€24,95), Sinterklaas/Kerst cadeaupas (ook cross-merk: "geef hem zijn kleuren"), maandelijkse outfit en sale-alerts.
- **Scanner-abonnement:** €3,99 per maand of €29 per jaar, opzeggen met één klik.
- **Pasvorm-module** (later, optioneel): silhouet op basis van ingevoerde maten, niet via een foto van het hele lichaam. Woorden die niets over het lichaam oordelen (geen "Pear").
- **Wekelijkse "Top picks"** per profiel, in de app en in de mail.
- **Merk-badge voor webshops** (werknaam "Profiel koppelen"): een script-badge "✓ past bij jouw kleuren" op productpagina's, "Log in met NYANSE / KULØRT" (het profiel als token via een magic link of QR-code, alleen met toestemming), een merkdashboard (bereik, klikken, retour-proxy). Prijs €49–149 per maand per shop, of per verkoop. Pilot: 3 maanden gratis met meting van retouren. **Dit is de vaste maandomzet.**

---

## 9. Juridisch en privacy (verwerkt in het ontwerp, niet als losse teksten)

- **AVG:** zo min mogelijk persoonsgegevens; foto's nooit bewaard (of niet eens verstuurd, pijplijn A). Verwerkersovereenkomsten met Supabase, Mollie, Brevo, PostHog en Anthropic. Eén privacyverklaring die voor beide merken geldt (linkje in de footer). **Doe een DPIA** omdat we gezichtskenmerken en huidtint verwerken. Huidtint gebruik je alleen voor de kleuradvies, nooit om iemand te herkennen of in te delen.
- **EU AI Act:** de AI-melding zit in de knop ("Start AI-kleuranalyse"). Geen herkenning van personen, geen afleiding van gevoelige kenmerken.
- **Leeftijd:** 16+ via één tik in de flow; advertenties alleen 18+.
- **Herroeping:** standaard één regel direct bij de betaalknop ("Je gids wordt direct geleverd") met het wettelijk verplichte actieve vinkje. **Laat deze tekst door een jurist checken.** Alternatief als ik daarvoor kies: geen vinkje en het herroepingsrecht van 14 dagen accepteren. Maak het een config-variabele.
- **Webshopverplichtingen:** één juridische entiteit achter beide merken; KvK-gegevens, contact, algemene voorwaarden en prijzen inclusief btw in de footer.
- **Merken:** NYANSE en KULØRT laten checken en registreren (BOIP of EUIPO, klassen 9, 35 en 45) vóór de livegang. Ook de domeinen en social handles vastleggen.
- **Reclame:** één regel in de gids: "Aanbevolen op kleur, nooit op commissie." AI-label op advertenties; geen misleidende besparingsclaims.
- **Geen onbewezen cijfers** zoals "94% nauwkeurig" of "10k+ gebruikers" en geen anonieme testimonials. Een nauwkeurigheidscijfer pas na de meting in fase A, met uitleg hoe het gemeten is.
- **Misbruik:** Turnstile, rate limiting, vriendenkorting alleen na betaling, PDF met naam op de cover.

---

## 10. Meten (verplicht vanaf dag 1)

Events (met `brand`, `voice` en `utm_source`):
`landing_view`, `occasion_pick`, `style_done`, `brand_switch`, `selfie_start`, `selfie_ok`, `analysis_done` (betrouwbaarheid, pijplijn, kosten), `email_submit`, `optin_checked`, `paywall_view`, `tier_select`, `checkout_open`, `paid` (tier, bedrag), `reveal_video_created`, `share_clicked`, `affiliate_click` (winkel), `referral_used`, `waitlist_join`.

Dashboard (`/admin`): funnel **per merk en per stem**, **opbrengst per bezoeker**, kosten per analyse, gemiddelde bestelwaarde, aandeel kleurenpas, affiliate-klikken en verdeling van de betrouwbaarheid.

---

## 11. Definition of done, fase B

- [ ] Beide domeinen tonen het juiste merk; wisselen tussen merken behoudt de antwoorden
- [ ] Mobiel (iOS Safari, Android Chrome) van landing tot betaling in ≤60 seconden met een goede selfie
- [ ] Lighthouse mobile ≥90 (performance en toegankelijkheid)
- [ ] Mollie live getest met alle betaalmethodes; webhook idempotent
- [ ] PDF uniek per gebruiker en in de stijl van het merk, binnen 60 seconden in de mail
- [ ] Reveal-video werkt op iOS en Android, met watermerk van het merk
- [ ] Catalogus met ≥2.000 kleur-getagde producten van ≥3 winkels, met gender-tag
- [ ] Batch-export voor de kleurenpassen werkt (merk + seizoen)
- [ ] Alle events uit §10 zichtbaar in het dashboard
- [ ] DPIA-notitie, privacyverklaring en voorwaarden aanwezig
- [ ] Kosten per gratis analyse gemeten en gelogd

---

## 12. Bewust niet (niet voorstellen tenzij ik erom vraag)

- **Kinderen (onder 16).** Foto's van gezichten van kinderen vereisen toestemming van de ouders (AVG art. 8) en zijn extra gevoelig. Profilerende advertenties gericht op minderjarigen mogen niet (DSA). En kinderkleuring verandert nog (haar wordt donkerder), dus "voor altijd" klopt niet. Mogelijk later als ouder-account voor 12–16 jaar, na juridische check.
- Foto's van bekende mensen, AI-lookalikes van bekende mensen.
- Nep-schaarste, nep-tellers, doorgestreepte nepprijzen, vooraf aangevinkte extra's, downsells bij afhaken, achteraf betalen.
- Een eigen native app (eerst PWA).
- Scrapen van webshops (alleen officiële feeds en API's).
- Advertentietekst over iemands uiterlijk die onzekerheid aanwakkert ("je ziet er moe uit").
- De digitale gids gratis maken.

---

## 13. Start

Begin met **fase A**. Lever als eerste:
1. Een kort technisch plan voor de testtool en de drie pijplijnen (maximaal 1 pagina), met geschatte kosten per analyse en wat je van mij nodig hebt (API-keys, accounts).
2. Het ontwerp van de referentiekaart (printbare PDF).

Wacht daarna op mijn GO.
