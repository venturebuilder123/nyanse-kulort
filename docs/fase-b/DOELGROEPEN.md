# Doelgroepen per leeftijd: beeld en stem

*14 oktober 2026. Vraag van de oprichter: is ons publiek in te delen in leeftijdsgroepen, en moeten beeld en toon daarop aangepast worden?*

## Wat we weten (FEIT)
- **Er is nog geen publieksdata.** Er hebben nog geen advertenties gedraaid, PostHog is nog niet gekoppeld en er zijn geen kopers. Elke uitspraak over "ons publiek" is nu een AANNAME.
- **De stemmen zijn al op leeftijd gericht** (CLAUDE.md §1):
  - NYANSE **Girl Math**: 18–28;
  - NYANSE **Atelier**: 28–45;
  - KULØRT **Wingman**: 22–40.
- **De AI-modellen** op de landing zijn 26–41 jaar. **Niemand boven de 45.** Op het archetypenbeeld van de oprichter staan juist vrouwen van 45+.

## De segmenten (AANNAME, te toetsen)

| Segment | Leeftijd | Wat speelt er | Stem (bestaand of nieuw) | Beeld |
|---|---|---|---|---|
| Starter | 18–22 | eigen stijl vinden, klein budget, TikTok | Girl Math | vriendinnen, telefoon, tweedehands (Vinted) |
| Eerste baan | 23–29 | werkgarderobe opbouwen, eerste indruk | Girl Math / Wingman | kantoor, sollicitatie, date |
| Gevestigd | 30–39 | minder maar beter kopen, tijd is schaars | Atelier / Wingman | kwaliteit, capsule, weekend |
| Volwassen stijl | 40–55 | lichaam en haar veranderen (grijs), opnieuw kiezen | **nieuw: "Signature"** (NYANSE), Wingman 40+ (KULØRT) | rustig, verfijnd, grijs haar als kracht |
| 55+ | 55+ | later | later | later |

**Waarom 40–55 een kans is (MENING):**
- Kleuradvies is van oudsher populair in deze groep (de klanten van Art of Image en van de sessies van je vrouw).
- Ze hebben meer te besteden.
- Ze worden weinig aangesproken door apps.
- Bij grijs haar verandert iemands kleurtype echt. Ons model heeft daar al een antwoord voor ("grijs" bij de haarvraag).

## Wat wel en niet mag
- **Niet:** onzekerheid als haakje ("onzeker over je stijl?", "je ziet er moe uit"). Dat staat in CLAUDE.md §12, juist bij 18–22.
  - **Wel:** "ontdek je eigen kleuren", "jij bepaalt".
- **Niet:** de leeftijd afleiden uit de selfie. Dat is een gevoelig kenmerk, past niet bij de AI Act-afspraken (§9) en is ook niet nodig.
- **Wel:** het segment volgt de **advertentie**, net als de stem nu (`?s=`). De advertentieset bepaalt de leeftijdsgroep in Meta of TikTok; de link draagt het segment mee. De app vraagt nooit naar je leeftijd (alleen 16+).

## Wat er per segment verandert
1. **Hero-beeld:** AI-modellen van die leeftijd. Er zijn 4 nieuwe nodig: 2 vrouwen van 45–55 (één met grijs haar) en 2 mannen van 45–55 (één met grijs haar en baard). Dat gaat met dezelfde shootbriefing als in AI-BEELDEN.md.
2. **Kop en drie vinkjes** per stem (copy-woordenboek).
3. **Gelegenheden:** volgorde en woorden. Bijvoorbeeld 40+: "werk, diner, feest, reizen" in plaats van "date".
4. **Het waarom-blok:**
   - Signature: "kleuren die meegaan met je grijze haar";
   - Starter: "minder miskopen" (bonnetje).

## Meten
- Elke advertentieset krijgt een eigen `utm_campaign` en stem.
- Het dashboard toont de opbrengst per bezoeker **per stem**. Dat staat al in de events (`brand`, `voice`, `utm_source`).
- Na ±300 bezoekers per segment weten we welke groep het beste converteert.

## Voorstel (wacht op GO)
1. **Nu:** 4 AI-modellen van 45–55 laten maken (de prompts staan hieronder) en meten met `/lab/people`.
2. **Daarna:** de stem **Signature** voor NYANSE 40+ (`?s=sg`), net zo ingericht als Atelier, maar met eigen copy en eigen beeld.
3. **KULØRT** houdt één stem, maar krijgt een 40+-beeld en andere gelegenheden via `?s=wm40`, of als variant van Wingman.

### Prompts voor de nieuwe AI-modellen (aanvulling op AI-BEELDEN.md, blok B)
- `Person: a 49-year-old Dutch woman with fair skin and natural silver-grey shoulder-length hair, light blue-grey eyes, fine natural lines around the eyes, minimal natural make-up. Calm, confident expression.`
- `Person: a 52-year-old Black Dutch woman with deep brown skin rendered with rich detail and correct exposure, short natural grey-black curly hair, dark-brown eyes, minimal natural make-up. Warm, self-assured expression.`
- `Person: a 50-year-old Dutch man with fair-medium skin, short salt-and-pepper hair, a trimmed grey beard, grey-green eyes. Relaxed, trustworthy expression.`
- `Person: a 47-year-old Turkish-Dutch man with medium olive skin, short dark hair greying at the temples, clean-shaven, dark-brown eyes. Friendly, composed expression.`
