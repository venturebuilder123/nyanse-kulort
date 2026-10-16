# Lanceringscampagne "Wrong Colour Amnesty"

*Versie 1.0, 16 oktober 2026. Start op **dag 0 = de dag dat Mollie live is** (iDEAL | Wero, Apple Pay, kaart). Hoort bij [ADVERTENTIES.md](ADVERTENTIES.md) (Engelse teksten per stem) en [INSTAGRAM.md](INSTAGRAM.md). Alle teksten in beeld en in advertenties zijn Engels; de uitleg is Nederlands.*

---

## 1. Het idee in één zin

**Iedereen heeft dat ene kledingstuk dat nooit gedragen is.** We geven het amnestie: je laat het zien, lacht erom, en ontdekt in 30 seconden waarom het nooit werkte. Het lag niet aan jou, het lag aan de kleur.

> **"Wrong Colour Amnesty. Bring out the one you never wore."**

**Waarom dit werkt**
- **Herkenning zonder onzekerheid.** De grap gaat over de *aankoop*, nooit over iemands uiterlijk. "Bought it. Never wore it." voelt iedereen, man of vrouw, 19 of 55. Dat past bij CLAUDE.md §12.
- **Makkelijk mee te doen.** Iedereen heeft zo'n stuk in de kast. Een foto van 5 seconden is genoeg; je hoeft er zelf niet eens op.
- **Het verschil wordt zichtbaar.** Het "foute" stuk naast je echte kleuren uit de app. Dat is ons bewijs, zonder één ongemeten cijfer.
- **Het zet aan tot actie, met een uitweg.** Het oude stuk gaat naar Vinted of een vriend. De opbrengst gaat naar iets in je eigen palet.
- **Mollie maakt het snel.** Met iDEAL | Wero heb je je gids binnen een paar minuten. Pas als we dat **gemeten** hebben, mag in de advertentie: "Your guide, before your coffee's cold."

---

## 2. Doel en meting (de gate van fase B)

| | Doel eind november | Meten in |
|---|---|---|
| Betalende kopers | **≥ 30** (beide merken samen) | /lab/orders + PostHog `paid` |
| Opbrengst per bezoeker | ≥ wat een bezoeker kost (advertenties of creator), **per merk** | PostHog-dashboard per merk en stem |
| Deelacties | elke koper deelt minstens één keer: amnestie-post, reveal-video of vriendencode | `share_clicked`, `reveal_video_created`, `referral_used` |

Volgers zijn niet het doel. Kijk elke week: wat leverde kleurchecks op, en wat werd betaald?

---

## 3. Vóór dag 0 (checklist, ±2 uur)

- [ ] **Mollie live** en één echte betaling per methode getest (iDEAL | Wero, Apple Pay, kaart). De webhook werkt de bestelling bij.
- [ ] **Mail werkt**: de bestelmail en de stijlgidsmail komen aan via `hi@kulort-nyanse.com`, en de bestelling staat op "gemaild".
- [ ] **PostHog**: `landing_view` en `paid` zijn zichtbaar met de goede `phc_`-key.
- [ ] **Tijd gemeten** van "betalen" tot "gids open". Pas dan de koffie-zin gebruiken.
- [ ] **Bedrijfsgegevens** (KvK, voorwaarden) in de footer. Mollie vraagt er toch om.
- [ ] **Actievoorwaarden** voor de winactie online (zie §6). Die schrijf ik als je GO geeft.
- [ ] **12 Story-templates** "I'm a ___" en **4 carrousels** klaar (zie §7). Die maak ik uit de kleurmotor.
- [ ] Je vrouw doet mee als **gezicht van de amnestie** (zie §5, dag 2). Een echte expert geeft vertrouwen.

---

## 4. Tijdlijn

| Dag | Wat | Kanaal |
|---|---|---|
| **−3** | Teaser: een kast-deur gaat langzaam open, er valt één fel stuk uit. Tekst: "Everyone has one." | Reel + TikTok |
| **−1** | Story-poll: "Do you own something you never wore?" Yes / Obviously | Stories |
| **0** | **Lancering:** de amnestie-Reel (§5, A), vastgezette post, linkje in de bio met UTM | Alle kanalen |
| **1–2** | Eigen amnestie: de oprichter laat *zijn* stuk zien. Je vrouw volgt met *haar* stuk en de uitleg waarom | Reels |
| **3** | Eerste betaalde test: KULØRT Wingman, €10 per dag (zie §8) | Meta |
| **4–7** | Repost van inzendingen (met toestemming), plus de carrousel "Why it never worked" | Feed + Stories |
| **7** | Winnaar kiezen, en de tweede test aan: NYANSE Boss Lady of Girl Math, €10 per dag | Meta + TikTok |
| **8–14** | Schaal op wat werkt: de beste haak krijgt het budget, de slechtste gaat uit | Meta |
| **14** | "The Amnesty Rack": alle ingezonden stukken in één beeld, met "Who's next?" | Carrousel |
| **21** | Evaluatie: kopers en opbrengst per bezoeker per merk. Stoppen, bijsturen of opschalen | Dashboard |
| **±25 nov** | Overgang naar de cadeau-route voor Sinterklaas en Kerst: "Give someone their colours" (zie inspiratie/README.md) | Mail + Reels |

---

## 5. De vier hoofdvideo's (15 seconden, 9:16)

Opbouw: **haak (0–2 s) → probleem (2–5 s) → het verschil (5–9 s) → wat je krijgt (9–12 s) → eind (12–15 s)**.

### A. "The Amnesty" (beide merken, lanceringsvideo)
- **0–2 s:** Iemand haalt plechtig een kledingstuk met het prijskaartje er nog aan uit de kast, alsof het een bewijsstuk is. Tekst: **"Exhibit A: never worn."**
- **2–5 s:** Hij of zij houdt het onder de kin, kijkt in de spiegel en trekt een gezicht. Tekst: **"It wasn't you. It was the colour."**
- **5–9 s:** Schermopname: selfie, de waaier vouwt open, "Soft Autumn".
- **9–12 s:** Hetzelfde soort stuk in een kleur uit het palet, onder dezelfde kin. Tekst: **"Same face. Different colour."**
- **12–15 s:** Eindbeeld met het huislogo. **"Wrong Colour Amnesty. Free colour check · link in bio"**
- **Voice-over (optioneel, droog):** "Everyone has one. This was mine."

### B. "The Interrogation" (KULØRT · Wingman, ludiek)
- Een tafel, een bureaulamp en een fel limoengroen overhemd op een stoel. Een "rechercheur" (de oprichter met een koffie) vraagt: **"Where were you on the night of the wedding?"** Het overhemd zwijgt.
- Snelle cut naar de app: Deep Winter. Tekst: **"Case closed. Navy, not lime."**
- Eindbeeld: **"First impression: sorted."**

### C. "The Receipt" (NYANSE · Girl Math)
- Een bonnetje rolt in beeld: **"Blouse €39.99 · Times worn: 0 · Cost per wear: ∞"**
- Daaronder: **"Style guide €6.99 ÷ 30 colours = €0.23 per colour."**
- Tekst: **"Girl math says: amnesty granted ✨"**
- Let op: een som met een knipoog mag, een besparingsbelofte niet.

### D. "The Consultant" (NYANSE · Boss Lady en Signature; vertrouwen)
- Je vrouw aan een tafel met kleurdoeken. Een klant legt haar "never worn"-stuk neer. Ze houdt er een doek naast: **"See? It's cooler than you are. Not wrong. Just not yours."**
- Tekst: **"Want it in person? Book a session."** Dat is de sessie van €89, als derde optie.

---

## 6. De amnestie-actie (zo doen mensen mee)

**Meedoen (gratis):**
1. Post een foto of video van je "never worn"-stuk in je Story of Reel.
2. Gebruik de sticker **"Wrong Colour Amnesty"** (het template uit §7) en tag **@kulortnyanse**.
3. Elke inzending maakt kans op **een persoonlijke kleursessie (€89)**. Elke week 1 winnaar, 3 weken lang.

**Regels voor de winactie (Nederland, Kansspelautoriteit):**
- Prijzen samen onder **€4.500** (klein promotioneel kansspel): dat zit goed.
- **Deelname is gratis.** Je hoeft niets te kopen om kans te maken.
- **Actievoorwaarden online**, met naam en adres van de organisator, looptijd, prijs, hoe de winnaar gekozen wordt en dat Meta en TikTok er niets mee te maken hebben.
- **Niet** als voorwaarde stellen dat mensen anderen taggen of de post delen.
- De winnaar kies je **willekeurig** en je legt vast hoe (bijvoorbeeld een schermopname van de loting).
- **Geen minderjarigen:** 18+ in de voorwaarden.

**Repost alleen met toestemming:** stuur een DM met "Can we share your amnesty?" en bewaar het antwoord als schermafbeelding.

**Wat er met het stuk gebeurt (de uitweg):** "Sell it, swap it or gift it, and put the money toward one piece in *your* colours." Later kan dit in de kast-check-mail (dag 3 na aankoop, CLAUDE.md §8).

---

## 7. Wat ik klaarzet (na je GO)

- [ ] **Sticker en Story-template** "Wrong Colour Amnesty · kulort-nyanse.com" (1080×1920, licht, met ruimte voor de foto)
- [ ] **12 Story-templates** "I'm a ___", één per seizoen, uit de kleurmotor
- [ ] **4 carrousels**: "Why it never worked" · "3 signs you're a Winter" · "Your basics per season" · "The Amnesty Rack"
- [ ] **Actievoorwaarden** (NL, als pagina op de site)
- [ ] **UTM-links** per video en per kanaal (zie §9)
- [ ] **Een overzicht in /admin** per merk en per stem: bezoekers → check → betaald

---

## 8. Budget (deel van de €1.000 voor het experiment)

| Post | Bedrag | Opmerking |
|---|---|---|
| Meta-test KULØRT Wingman | €70 (7 dagen × €10) | 3 haken × 2 beelden, na 3–4 dagen de winnaar |
| Meta/TikTok-test NYANSE | €70 | Girl Math op TikTok of Boss Lady op Reels, wat de eerste week laat zien |
| Prijzen winactie | 3 sessies (tijd van je vrouw, €0 cash) | Waarde €267 |
| Rekwisieten (bureaulamp, doeken, bonnetjesprinter) | ±€25 | Eenmalig |
| **Totaal cash** | **±€165** | Opschalen alleen als de opbrengst per bezoeker het kost dekt |

**Richten:** 18+, Nederland en België (de advertenties zijn Engels, de site is nog Nederlands, zie BESLISSINGEN 15 oktober). Breder pas na een Engelse landingspagina.

---

## 9. Links en meten

- Basislink: `https://www.kulort-nyanse.com/?utm_source={instagram|tiktok|meta}&utm_medium={organic|paid}&utm_campaign=amnesty&utm_content={a-amnesty|b-interrogation|c-receipt|d-consultant}`
- Per merk en stem:
  - KULØRT Wingman: `&brand=kulort&g=jong`
  - KULØRT Director: `&brand=kulort&s=dr`
  - NYANSE Girl Math: `&brand=nyanse&s=gm`
  - NYANSE Boss Lady: `&brand=nyanse&s=bl`
  - NYANSE Signature: `&brand=nyanse&s=sg`
- **Elke maandag 10 minuten:** in PostHog de funnel per `utm_content` bekijken, en dan de winnaar meer budget geven en de verliezer uitzetten.

---

## 10. Spelregels (niet onderhandelbaar)

- **Nooit grappen over iemands uiterlijk.** De grap gaat over de aankoop en de kleur. Mag: "That colour never stood a chance." Mag niet: "You look tired in that."
- **Geen nep-schaarste, geen aftelklokken, geen nepkortingen.** De winactie heeft een echte einddatum. Dat mag wel.
- **Geen bekende mensen** in beeld of als lookalike.
- **Echte mensen alleen met toestemming**, 18+, schriftelijk vastgelegd.
- **Gegenereerde mensen in advertenties:** TikTok en Meta vragen een AI-label bij realistische gegenereerde mensen. Jij koos ervoor de AI nergens te noemen. Gebruik voor deze campagne daarom **echte mensen** (jij, je vrouw, vrienden met toestemming) of alleen producten en handen. Dan speelt het label niet.
- **Eén vraag om geld in de flow.** De campagne stuurt naar de gratis check; de rest doet het product.
