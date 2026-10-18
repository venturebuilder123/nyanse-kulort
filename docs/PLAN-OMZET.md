# Omzetdoelen en investeringen

*18 oktober 2026. Mijn eigen doelen als technisch medeoprichter.*

- **AANNAME** = een schatting die we de komende weken meten in PostHog en /lab/orders.
- **FEIT** = prijzen en afspraken die vastliggen.

Elke maandag vergelijken we de cijfers met dit plan en passen we de aannames aan.

## 1. Wat één bestelling oplevert

| | Bedrag |
|---|---|
| Prijzen (FEIT) | Digitaal €12,99 · Met pas €39,99 · Advies €110 |
| Verdeling (AANNAME) | 55% digitaal · 40% met pas · 5% advies |
| Gemiddelde bestelling incl. btw | **€28,64** |
| Excl. 21% btw | €23,67 |
| Min betaalkosten Mollie (AANNAME ±€0,32 per iDEAL-betaling) | −€0,32 |
| Min pas (druk ±€1,50, envelop €0,30, postzegel €1,40) × 40% | −€1,28 |
| **Bijdrage per bestelling** | **±€22** |

Niet meegeteld: de tijd van je vrouw voor het advies (±45 minuten per video).

**Affiliate** (AANNAME): 1 op de 10 kopers koopt via "Shop je kleuren" één stuk van ±€60 bij gemiddeld 7%, dus ±€0,40 per koper. Dat is klein. Affiliate wordt pas interessant met veel gratis gebruikers en straks Lens (CLAUDE.md §8).

## 2. De funnel (AANNAME, te meten per merk en per stem)

| Stap | Per 1.000 bezoekers |
|---|---|
| Begint de check | 300 (30%) |
| Ziet een resultaat | 210 (70% daarvan) |
| Betaalt | 8–9 (4% van de resultaten) |
| **Omzet per bezoeker** | **±€0,25 incl. btw / ±€0,19 bijdrage** |

**Conclusie:**
- Betaalde advertenties zijn pas winstgevend bij een klik onder ±€0,20, of als de conversie beter is dan 4%.
- Een klik op Instagram in Nederland kost waarschijnlijk €0,35–0,80 (AANNAME).
- Daarom eerst **gratis bereik**: Instagram-content, creators op commissie (vriendencode), de amnestie-campagne en de cadeau-route. Advertenties alleen als test van €70.

## 3. Mijn doelen

| Moment | Betalende kopers | Omzet incl. btw | Bijdrage | Waar het vandaan komt |
|---|---|---|---|---|
| **Eind november 2026** (de gate) | **30** | ±€860 | ±€660 | Lancering, amnestie, creators, je eigen netwerk |
| December 2026 | 60 | ±€1.700 | ±€1.300 | Sinterklaas en Kerst: cadeau-route, "geef hem zijn kleuren" |
| Januari–maart 2027, per maand | 50–80 | €1.400–2.300 | €1.100–1.750 | Goede voornemens, opruiming in je kast; affiliate loopt |
| **Mijlpaal €500 per maand vast** | ±25 per maand | | ±€550 | Haalbaar vanaf januari 2027 als november de gate haalt |
| Oktober 2027, per maand | 120+ | €3.400+ | €2.600+ | Plus affiliate (€100–300), Lens en de merk-badge voor webshops (vaste maandomzet, CLAUDE.md §8) |

**Wat ik zelf moet halen om deze doelen te halen:**
- Een conversie van resultaat naar betaling van **≥ 4%**, per merk gemeten. Die stuur ik bij via de resultaatpagina en de opties.
- **≥ 20%** van de kopers deelt hun seizoen of gebruikt de vriendencode. Daar komt het gratis bereik vandaan.
- **De catalogus:** minstens 3 winkels en 2.000 producten met kleur vóór half november (definition of done van fase B).

**Stopregel** (CLAUDE.md §3): halen we eind november geen 30 kopers, of is de omzet per bezoeker lager dan wat een bezoeker kost, dan beslissen we samen: bijsturen (bijvoorbeeld één merk stoppen) of stoppen.

## 4. Investeringen

### Nodig (de komende 3 maanden)

| Wat | Kosten | Waarom |
|---|---|---|
| **Vercel Pro** | ±$20 per maand (±€19) | **Het gratis Hobby-plan staat geen commercieel gebruik toe**, en een webshop valt daaronder. Zet dit nu om (Vercel → Settings → Billing). |
| Eerste oplage kleurenpassen (24 ontwerpen × ±5) | ±€60–120 (AANNAME) | Zonder pas geen levering van de aanrader |
| Enveloppen en postzegels | zit in de bijdrage per bestelling | |
| Advertentietest (2 × €70) | €140 | Zie LANCERING-MOLLIE.md |
| Awin-borg | ±€5 (AANNAME, je krijgt hem terug) | Account |
| **Totaal** | **±€260 eenmalig + €19 per maand** | |

### Verstandig vóór je opschaalt

| Wat | Kosten (AANNAME, controleer de actuele tarieven) | Waarom |
|---|---|---|
| Merkregistratie NYANSE en KULØRT (BOIP, klassen 9, 35, 45) | ±€250–700 voor beide | Voorkomt dat iemand anders je naam claimt (CLAUDE.md §9) |
| Juridische check van voorwaarden en het herroepingsvinkje | ±€150–400 | Eén keer goed |
| DPIA-notitie (gezichtskenmerken en huidtint) | €0 (ik schrijf een concept) | Verplicht volgens CLAUDE.md §9 |

### Gratis zolang het klein is

Supabase (database), Brevo (300 mails per dag), PostHog (1 miljoen events per maand), GitHub Actions en Daisycon/Awin.

**Kostenbewaking:** ik zet bij Vercel een limiet op het verbruik, zodat er geen verrassingsrekening komt.

## 5. Wat ik in de gaten houd (in /admin, nog te bouwen)

- **Per merk en per stem:** bezoekers, gestarte checks, resultaten, betaald, omzet per bezoeker.
- **Verdeling van de opties:** digitaal, met pas, advies. Daalt het aandeel "met pas" sterk na de prijsverhoging, dan stel ik een aanpassing voor.
- **Affiliate:** kliks per winkel en, na goedkeuring, de commissie uit de netwerkrapporten.
- **Kosten per analyse:** nu ±€0, want de analyse draait op het toestel.
