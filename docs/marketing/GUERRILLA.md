# Guerrilla op Instagram en TikTok: volgers opbouwen

*19 oktober 2026. Doel: een following opbouwen terwijl de affiliate-programma's worden goedgekeurd. Alles in het Engels (besluit 15 oktober); de uitleg is Nederlands. Hoort bij [INSTAGRAM.md](INSTAGRAM.md), [VOLGERS.md](VOLGERS.md) en [LANCERING-MOLLIE.md](LANCERING-MOLLIE.md).*

## 0. In één zin

**"12 seasons. One a week."** Elke maandag één seizoen, op Instagram als carrousel en op TikTok als video. Daartussen korte, herkenbare video's die mensen naar elkaar doorsturen ("dit ben jij!"). Doorsturen en bewaren laten een account groeien, niet likes.

## 1. Doelen voor de eerste 4 weken (AANNAME, wekelijks meten)

| | Week 4 | Hoe je het ziet |
|---|---|---|
| Instagram-volgers | 300–500 | Insights |
| TikTok-volgers | 500–1.000 | TikTok Studio |
| Bewaard + doorgestuurd per carrousel | ≥ 5% van het bereik | Insights per post |
| Klikken op de link in de bio | ≥ 100 | PostHog: `utm_medium=bio` |
| Kleurchecks vanuit social | ≥ 60 | PostHog-funnel per `utm_source` |

**Volgers zijn een middel.** Het doel blijft de gate van november: 30 kopers. Kijk daarom elke maandag ook naar de checks en kopers per kanaal.

## 2. Zo moeten de profielen eruitzien (UX)

Zie de mockups: `assets/social/mockup-instagram.png` en `assets/social/mockup-tiktok.png`.

**Instagram**
- **Naam:** KULØRT · NYANSE. **Categorie:** Personal stylist (zakelijk account).
- **Bio:** "Personal colour, made simple ✦ Your colours, your wardrobe, your guide ✦ For him (KULØRT) and her (NYANSE) ✦ Free colour check ↓"
- **Link:** `kulort-nyanse.com/links`. Die pagina is nieuw: twee knoppen (voor hem, voor haar), plus "ik ken mijn type" en "welk seizoen ben jij?". Elke klik krijgt automatisch een UTM-code, zodat je ziet welk kanaal kopers oplevert.
- **Profielfoto:** `avatar-monogram.png` (Ø | N).
- **Highlights** (nu Engels): Colours · Seasons · Guide · Card · Looks · FAQ. Bestanden: `assets/social/highlight-*.png`.
- **Drie vastgezette posts** (nu Engels): `pinned-1-wat.png`, `pinned-2-seizoenen.png`, `pinned-3-krijg.png`.
- **Rastervolgorde:** elke maandag een seizoenscarrousel; daartussen een volgers-beeld (`assets/social/follow/`) of een Reel.

**TikTok**
- Maak een **zakelijk account** (gratis). Daarmee mag je een link in je bio zetten zonder eerst 1.000 volgers te hebben (AANNAME: TikTok wijzigt deze regels nogal eens; controleer het bij het aanmaken). Daarnaast krijg je statistieken.
- **Gebruikersnaam:** @kulortnyanse (zelfde naam als op Instagram). **Profielfoto:** dezelfde.
- **Bio:** "Which season are you? 🎨 One a week. Free colour check ↓ For him & her"
- **Link:** `kulort-nyanse.com/links?src=tiktok`
- **Drie vastgezette video's:** de amnestie, "Same face. Different colour." en het eerste seizoen.
- **Afspeellijsten:** Spring · Summer · Autumn · Winter. Elke seizoensvideo komt in de lijst van zijn familie.

## 3. Wat ik heb klaargezet

| Wat | Waar |
|---|---|
| 12 weken seizoenscarrousels, elk 6 slides: haak, 3 kenmerken, kleuren voor hem en haar, gedragen, "leave on the rack", afsluiter | `assets/social/seasons/01-softAutumn/` … `12-brightWinter/` (`slide-1..6.jpg`) |
| 12 story-templates "I'm a …", met ruimte voor een selfie | `…/story.jpg` |
| 12 TikTok-covers ("Season 01 / 12") | `…/tiktok-cover.jpg` |
| 7 volgers-beelden + 3 Stories | `assets/social/follow/` (bijschriften in VOLGERS.md) |
| Highlights, vastgezette posts en profielfoto, nu Engels | `assets/social/` |
| Link-in-bio-pagina | kulort-nyanse.com/links |
| Mockups van beide profielen | `assets/social/mockup-*.png` |

**Volgorde van de seizoenen:** Soft Autumn, Deep Winter, Soft Summer, Light Spring, Warm Autumn, Cool Winter, Light Summer, Bright Spring, Deep Autumn, Cool Summer, Warm Spring, Bright Winter. De types waar het meest naar gezocht wordt (AANNAME) komen eerst.

**Opnieuw maken** (bijvoorbeeld na een wijziging in de kleurmotor): `node scripts/make-season-series.mjs` en `node scripts/make-profile-mockups.mjs`.

## 4. Je weekritme (±30 minuten per dag)

| Dag | Instagram | TikTok | 15 minuten guerrilla |
|---|---|---|---|
| **Ma** | Seizoenscarrousel (6 slides) + Story met de poll "Are you a ___?" | Seizoensvideo (zie format A) | Reageer op 10 posts over kleuranalyse |
| **Di** | Story: "I'm a ___"-template met de "Add Yours"-sticker | Format B of C | Stitch of duet op 1 trending video over colour analysis |
| **Wo** | Reel (format A of D) | Zelfde video, eigen bijschrift | DM 2 micro-creators (zie §6) |
| **Do** | Volgers-beeld uit `follow/` | Format E (vragen beantwoorden) | Reageer op 10 posts |
| **Vr** | Reel | Format B | Beantwoord alle reacties en DM's |
| **Za** | Story: kast-tip of achter de schermen | Hergebruik de beste video van de week | |
| **Zo** | Rust. Kijk in Insights wat werd bewaard en doorgestuurd | | Plan de week in Meta Business Suite en TikTok Studio |

**Beste tijden** (AANNAME, daarna je eigen data): 18:00–21:00 uur, met een piek rond 20:00. Stories verspreid over de dag.

## 5. Vijf video-formats (TikTok en Reels, 7–20 seconden)

Film bij daglicht aan een raam, met de telefoon verticaal, en praat in de camera of laat tekst in beeld. Echte mensen: jij, je vrouw, vrienden met toestemming.

**A. "Is this your season?"** (maandag)
- 0–2 s: in beeld "Are you a Soft Autumn? 3 signs".
- 2–12 s: de 3 kenmerken uit slide 2, elk 3 seconden, met het kleurdoek of de waaier in beeld.
- 12–15 s: "Not sure? Free check, link in bio."
- Cover: `tiktok-cover.jpg` van die week.

**B. "Same face. Different colour."** (de motor van doorsturen)
- Iemand houdt eerst een grijsblauwe doek, dan een warme doek onder de kin. Tekst in beeld: "Wrong colour → right colour".
- Bijschrift: "Send this to someone who needs to see it."

**C. "POV: you finally know your colours"**
- Kast open, drie stukken in de verkeerde kleur gaan opzij, één stuk uit het palet blijft hangen. Tekst: "Wrong Colour Amnesty."

**D. "Your colours vs. what you own"**
- Het palet uit slide 3 naast je eigen kast. "3 out of 10. That explains a lot."

**E. "Ask a colour consultant"** (vertrouwen, met je vrouw)
- Beantwoord één vraag uit de reacties ("Can a Winter wear brown?") in 15 seconden. Het antwoord eindigt met: "Find your season, link in bio."

**Hashtags** (3 tot 5, onderaan): `#coloranalysis #seasonalcoloranalysis #[season]` (bijvoorbeeld `#softautumn`), plus `#mensstyle` of `#capsulewardrobe`.

## 6. Guerrilla-tactieken (gratis en eerlijk)

1. **Reacties die waarde toevoegen (15 minuten per dag).** Reageer onder grote accounts over kleuranalyse en stijl met een echte tip: "Soft Autumns: try olive instead of black near your face." Nooit een link en geen "check our page": dat geldt als spam. Je profiel doet het werk.
2. **Stitches en duets op trending kleuranalyse-video's.** "Here's what your season actually means" of "Why black isn't always your friend". Je gebruikt hun bereik, met jouw kennis.
3. **"Send this to your Soft Autumn".** Elke afsluiter vraagt om **doorsturen**, want dat weegt het zwaarst. De story-templates en de "Add Yours"-sticker ("Share your season") laten volgers jouw merk delen.
4. **Micro-creators (1.000–10.000 volgers) in mode, stijl en studentenleven.**
   - Bied een gratis persoonlijke kleuranalyse aan, met een eigen kortingscode voor hun volgers.
   - Ik maak per creator twee codes: één gratis code voor henzelf en één code met 25% voor hun volgers (bijvoorbeeld `SANNE25`). Zo zie je in /lab/orders wie verkoopt.
   - Later kan dat een commissie per verkoop worden.
   - **Verplicht:** de creator meldt de samenwerking ("#ad" of "samenwerking met @kulortnyanse"), volgens de Reclamecode Social Media.
   - DM-tekst (Engels):
     > "Hi [naam]! Love your [specifiek bericht]. We do personal colour analysis from one selfie (KULØRT for men, NYANSE for women). Can we give you a free colour guide, and your followers a 25% code? No strings, no script. Only if you like it."
5. **Offline, met toestemming.** Een stapeltje kaartjes met QR-code ("What's your season? Free check") bij een vintagewinkel, een kapper of een barbier die je kent. Geen stickers op straat: wildplakken is verboden.
6. **Hergebruik overal.** Dezelfde video's gaan ook naar YouTube Shorts. Het palet van elk seizoen past perfect op Pinterest (zie §7).

## 7. Extra kanalen en hulpmiddelen

| Hulpmiddel | Waarom | Kosten |
|---|---|---|
| **Pinterest** (zakelijk account) | Mensen zoeken daar letterlijk naar "soft autumn palette". Een pin blijft maanden verkeer brengen, anders dan een Reel. Slides 3 en 4 van elk seizoen zijn ideaal. **Aanrader nummer 1.** | Gratis |
| **Meta Business Suite** | Instagram-posts en Stories vooruit inplannen, en Insights | Gratis |
| **TikTok Studio** (desktop) | TikTok-video's inplannen en statistieken | Gratis |
| **CapCut** | Video's knippen, automatische ondertitels (verplicht: 80% kijkt zonder geluid), templates | Gratis (Pro niet nodig) |
| **Edits** (app van Instagram) | Reels maken zonder watermerk | Gratis |
| **YouTube Shorts** | Dezelfde video's, extra bereik | Gratis |
| **Claude met Gmail** (staat al gekoppeld) | Ik kan creator-mails en antwoorden als concept klaarzetten in nyansekulort@gmail.com. Jij verstuurt ze. | Al aanwezig |

## 8. Spelregels

- **Geen volgers kopen, geen follow/unfollow, geen bots, geen nepreacties.** Instagram en TikTok verlagen dan je bereik of blokkeren het account.
- **Gegenereerde mensen in beeld:** TikTok verplicht een label bij realistische gegenereerde beelden ("AI-generated content" aanzetten bij het plaatsen). Meta voegt soms zelf "AI info" toe. Jij koos ervoor de AI nergens zelf te noemen, dus:
  - gebruik **in video's echte mensen**: jij, je vrouw, vrienden met toestemming;
  - de seizoensbeelden (stoffen en waaiers) en de outfit-flatlays zijn productbeelden zonder mensen. Die kunnen zonder label.
- **Nooit over iemands uiterlijk** ("you look tired"), altijd over de kleur. Geen nep-schaarste.
- **Winacties:** volgens de regels in LANCERING-MOLLIE.md §6 (Kansspelautoriteit).

## 9. Jouw actielijst (vandaag en morgen)

1. **Instagram:**
   - zet de nieuwe profielfoto, de highlights (`highlight-*.png`) en de 3 vastgezette posts (`pinned-*.png`) erop;
   - zet de bio-link op `kulort-nyanse.com/links`.
2. **TikTok:** maak een zakelijk account @kulortnyanse aan met dezelfde profielfoto en de bio en link uit §2.
3. **Pinterest:** maak een zakelijk account aan, met 4 borden: Spring, Summer, Autumn, Winter. Pin per seizoen slide 3 en 4.
4. **Maandag:** de eerste carrousel (`01-softAutumn`) plus de eerste seizoensvideo, met format A en de cover van die week.
5. **Twee video's opnemen met je vrouw:** format B (het doek) en format E (een vraag). Die worden de vastgezette video's.
6. **Stuur me 5 namen van micro-creators.** Dan maak ik hun codes aan en zet ik de berichten als concept klaar.

## 10. Wat ik elke maandag doe (als je het me vraagt)

- De cijfers van vorige week vergelijken: welke post werd bewaard en doorgestuurd, en welke kanalen leverden checks en kopers op.
- De volgende carrousel en het bijschrift klaarzetten, en een nieuw format voorstellen als iets duidelijk werkt.
- Creator-codes en concept-DM's maken voor nieuwe namen.
