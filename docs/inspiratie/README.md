# Inspiratiedatabase

Ideeën en beelden van buiten, om later uit te werken. Beelden van derden staan **alleen lokaal** in `assets/inspiratie/` (staat in `.gitignore`), omdat het auteursrecht onbekend is. Ze worden nooit gepubliceerd of in de app gebruikt.

## 2026-10-13 — Stijlarchetypen (vrouwen)

- **Bron:** een social-media-afbeelding, aangeleverd door de oprichter. Waarschijnlijk met AI gemaakt; de maker is onbekend.
- **Lokaal bestand:** `assets/inspiratie/stijl-archetypen-vrouwen.jpg`

| Archetype | Kernwoorden | Herkenbaar aan |
|---|---|---|
| The Queen | gepolijst, gezaghebbend, verfijnd | camel jas, coltrui, pantalon, gestructureerde tas |
| The Lover | vrouwelijk, magnetisch, zacht | jurk met print, leren jack, sieraden |
| The Mother | warm, zorgzaam, praktisch | kabeltrui, jeans, grote sjaal, laarzen |
| The Sage | bedachtzaam, analytisch, verfijnd | grijze blazer, coltrui, pantalon, bril |
| The Maiden | licht, zacht, open | crème, ivoor, zachte kleuren, fijne sieraden |
| The Huntress | stoer, onafhankelijk, gedreven | zwart leer, print-sjaal, zonnebril, laarzen |
| The Mystic | intuïtief, creatief, raadselachtig | lagen, omslagdoek, aardetinten, veel sieraden |

**Waarom interessant:** kleur zegt welke tinten je staan, stijl zegt welke stukken bij je passen. Een **stijltype naast het kleurtype** maakt outfits persoonlijker ("Soft Autumn × The Sage": een grijze blazer wordt een olijfgroene blazer met een taupe coltrui).

**Hoe het zou kunnen werken (MENING, niet gebouwd):**
- **5 beeldvragen** ("welke look trekt je?") na de kleuranalyse, of in de gids. Geen foto van het lichaam nodig.
- **Archetypen met eigen namen** per merk, zonder het "Queen/Mother"-taalgebruik dat kan schuren. Bijvoorbeeld voor NYANSE "Klassiek", "Romantisch", "Puur", "Stoer", "Bohémien", "Intellectueel", "Warm".
- **Een eigen set voor mannen** (KULØRT), bijvoorbeeld "Klassiek", "Smart casual", "Minimalist", "Robuust", "Creatief", "Sportief".
- **Woorden die niet over het lichaam oordelen** (CLAUDE.md §8, pasvorm-module).

**Juridisch:**
- Eigen beelden laten maken, zoals bij de AI-modellen; dit beeld niet hergebruiken.
- Geen gelijkenis met bekende mensen.
- Het stijltype is een voorkeur en wordt niet afgeleid uit de foto, dus het is geen gevoelig kenmerk.

**Status:** idee voor fase C, na de Lens. Niet in de flow van fase B, want daar geldt "één vraag om geld" en de flow moet kort blijven.

## 2026-10-13 — Persoonlijke sessies en workshops (idee van de oprichter)

- **Wat:** de vrouw van de oprichter geeft kleur- en stijlsessies. Later aanbieden:
  - **1-op-1-sessies**, online via Teams of in het echt;
  - **groepsworkshops voor vrouwen in Nederland**, bijvoorbeeld een avond met 6–10 vriendinnen of collega's.
- **Waarom sterk:**
  - de app wordt de ingang en de sessie het verdiepende vervolg, met een hogere prijs;
  - de app doet het voorwerk (profiel, palet, gids), zodat een sessie korter en scherper wordt;
  - het past bij "de kleurenpas verifieert je profiel": de expert met doeken bevestigt het.
- **Ook bruikbaar voor de meting (BETROUWBAARHEID.md):** zij kan één van de twee consultants zijn die blind een expertoordeel geven. De tweede moet een onafhankelijke consultant zijn, zodat de toets eerlijk blijft.
- **Hoe aanbieden (MENING):**
  - niet in de flow, want daar geldt "één vraag om geld";
  - wel in de stijlgids ("Wil je het met doeken laten checken? Boek een sessie"), per mail en als aparte pagina;
  - afspraken plannen via een eenvoudige boekingstool (later kiezen);
  - workshops eerst voor NYANSE, daarna eventueel ook voor mannen (KULØRT).
- **Status:** later, na de eerste meting en de livegang.

## 2026-10-14 — Cadeau-route (idee van de oprichter)

- **Wat:** een kleurprofiel en stijlgids cadeau geven aan iemand anders, eventueel met korting. Past bij CLAUDE.md §8 (cadeaupas voor Sinterklaas en Kerst, ook tussen de merken: "geef hem zijn kleuren").
- **Hoe (MENING):**
  - een eigen pagina **/cadeau**, buiten de flow, want in de flow geldt één vraag om geld;
  - de koper kiest stijlgids, stijlgids + pas of de sessie en krijgt een **cadeaucode** plus een mooie digitale kaart (PDF of link) om te geven of te mailen;
  - de ontvanger doet de selfie zelf en verzilvert de code bij het afrekenen. Een pas gaat naar het adres van de ontvanger.
- **Korting, alleen als die echt is:**
  - een duo-prijs als je er zelf ook een neemt ("jij en een ander");
  - een vaste cadeau-actie in een afgebakende periode (Sinterklaas en Kerst) met een echte einddatum;
  - geen nep-van-voor-prijzen of aftelklokken (CLAUDE.md §12).
- **Techniek:** een tabel `gift_codes` in Supabase (code, optie, status, betaald via overschrijving zoals de checkout). Het verzilveren vervangt het betalen.
- **Status:** later. Een logisch moment is de aanloop naar Sinterklaas en Kerst; begin de bouw dan uiterlijk half november.

## 2026-10-15 — Contentsite met aanbevelingen en SEO (idee van de oprichter)

- **Wat:** veel artikelen die gevonden worden in Google, vol concrete aanbevelingen, die lezers naar de gratis kleurcheck sturen. Bijvoorbeeld: "Welke kleuren staan een Soft Autumn?", "Beste witte overhemden voor een Winter", "Navy of zwart?" en "Kleuranalyse: zo werkt het".
- **Waar (MENING):** liever op het eigen domein (`kulort-nyanse.com/journal`) dan op een aparte site. Google bouwt vertrouwen op per domein, en elk artikel versterkt dan de site waar je verkoopt. Een aparte site begint bij nul en moet je los bijhouden.
- **Hoe:**
  - Per seizoen en per merk een vaste pagina. Die maken we deels automatisch uit de kleurmotor: palet, basis, combinaties en "niet dit, maar dit". Dat geeft 24 pagina's die echt van ons zijn.
  - Aanbevelingen alleen met producten uit officiële feeds (geen scraping, CLAUDE.md §12).
  - Een affiliate-link maak je zichtbaar bij de link zelf. "Aanbevolen op kleur, nooit op commissie" moet ook hier waar zijn.
  - Geen bekende mensen met foto's; namen alleen als "vaak genoemd als".
- **Taal:** besluit nog nemen.
  - Nederlands voor zoekverkeer uit Nederland, Engels voor de bredere markt (passend bij de advertenties).
  - De i18n-structuur kan beide.
  - AANNAME: Engels heeft meer zoekvolume, maar ook veel meer concurrentie.
- **Afhankelijk van:** affiliate-programma's (KvK) en een catalogus met kleurtags (CLAUDE.md §7).
- **Status:** later. SEO kost maanden voordat het iets oplevert, dus vroeg beginnen loont. Een logisch moment is na de eerste meting van de advertenties.

## 2026-10-16 — Alles automatiseren vanaf een Raspberry Pi 5 (idee van de oprichter)

- **Wat:** de dagelijkse bedrijfsvoering draait automatisch. Claude Code draait op een Pi 5 thuis en doet het werk; de oprichter hoeft (bijna) niets meer.
- **Kan goed automatisch (MENING):**
  - **Betalingen:** de Mollie-webhook zet een bestelling op betaald en mailt de gids. Het handwerk in /lab/orders verdwijnt dan helemaal.
  - **Kleurenpassen:** elke week de batch-export plus de adreslijst klaarzetten en "je pas is onderweg" mailen zodra je ze als verzonden markeert.
  - **Rapport:** elke maandag funnel, opbrengst per bezoeker per merk en stem, en de winnende advertentie. Als mail of als pagina.
  - **Content:** posts, carrousels en Story-templates klaarzetten uit de kleurmotor, plus een conceptplanning.
  - **Mails:** de vervolgmails (dag 3 kast-check, dag 7 outfit, sale-alerts) en de catalogus bijwerken uit de feeds.
  - **Bewaking:** checken of de site, de mail en de betalingen werken, met een pushmelding als iets stuk is.
- **Blijft bij de oprichter (bewust):**
  - **Goedkeuren** van alles wat geld kost of publiek wordt: advertentiebudget, posts, mails aan klanten (CLAUDE.md §0). Wel zo licht mogelijk: één tik op "Akkoord" op je telefoon.
  - **Passen op de post doen** (tot een fulfilmentpartij het overneemt).
  - **Juridisch:** KvK, voorwaarden, toestemmingen van mensen in beeld.
- **Techniek (AANNAME, uitzoeken):**
  - Pi 5 met Linux, Claude Code en geplande taken (cron of systemd-timers).
  - Geheimen in een afgeschermd `.env`, nooit in git.
  - Een back-up van de Pi-instellingen.
  - Instagram en TikTok publiceren via hun officiële API's. Dat vraagt een zakelijk account en goedkeuring van de app; TikTok is daarin strenger.
  - Kosten: Claude API per taak (meten), stroom ±€1 per maand.
- **Risico's:** een Pi thuis valt uit bij stroom- of internetstoring. Zet daarom het werk dat de klant raakt (webhook, mail, gids) op Vercel en Supabase, niet op de Pi. De Pi doet alleen het werk dat mag wachten: rapporten, content en batches.
- **Status:** later. Eerst Mollie live, dan stap voor stap: rapport → batch-export → contentvoorstellen → bewaking.
