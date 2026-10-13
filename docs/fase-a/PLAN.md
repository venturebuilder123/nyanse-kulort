# Fase A: technisch plan voor de testtool en de drie pijplijnen

*12 oktober 2026 · GO op 13 oktober · **week 1 klaar** (login, testpersonen, upload, kaartdetectie, kalibratie, pijplijn A, rapport, toestemmingsformulier). Week 2: Supabase, pijplijn B en C, ChatGPT-vergelijkingsformulier.*

## Wat we bouwen
**`/lab`** wordt de eerste route van de echte Next.js-app (TypeScript strict, App Router). Het is dus geen wegwerpcode: de kleurlogica (`lib/color`), de kaartdetectie en de pijplijnen (`lib/analysis`) gaan straks één-op-één mee naar fase B.

- **Toegang:** één wachtwoord (env-variabele) en een httpOnly-cookie via middleware. Geen accounts.
- **Invoer per testpersoon:** een code (geen naam), de Monk-tint (1–10, gekozen door de onderzoeker), gender, baard ja/nee, een toestemmingsvinkje (verwijst naar het getekende formulier) en daarna 6 foto's (3 lichtsituaties × met/zonder kaart).
- **Kaart:** ArUco-detectie in de browser (`DICT_4X4_50`, id 1), daarna een homografie naar [layout-v1.json](../../tools/card/layout-v1.json). Uit het wit- en grijsvlak volgt een witbalans per kanaal (in lineair sRGB) en een belichtingscorrectie. De 4 kleurvlakken dienen als controle: hoe dicht zit de gecorrigeerde foto bij de andere foto's van dezelfde kaart?
- **Opslag:** Supabase EU, tabel `lab_runs`: persoonscode, foto-index, pijplijn, model, de drie schalen met betrouwbaarheid, seizoen, ruwe Lab-metingen, kosten, tijd en `card_found`.
- **Rapport (`/lab/report`):** consistentie per persoon (hoe vaak een andere seizoensuitslag, en de afstand op de drie schalen), met en zonder kaart, per Monk-groep (1–2, 3–4, 5–6, 7–8, 9–10), per gender en baard apart, en de kosten en tijd per pijplijn en model. Export naar CSV.

## De drie pijplijnen
| | Hoe | Foto verlaat toestel? | Kosten per analyse (schatting) |
|---|---|---|---|
| **A** | MediaPipe Face Landmarker in de browser → wang, voorhoofd, iris, haar en baard samplen (mediaan, glans eruit gefilterd) → Lab → regels naar ondertoon, diepte en helderheid | Nee | **€0** (alleen rekenkracht van de telefoon) |
| **B** | Gezichtsuitsnede van ±512 px naar de Claude API, gestructureerde JSON terug (drie schalen, betrouwbaarheid, kwaliteit) | Ja, niet bewaard | Opus 5.5 ≈ **$0,02–0,03** · Sonnet 5.5 ≈ **$0,01** · Haiku 5.5 ≈ **$0,001** |
| **C** | Metingen uit A, plus een kleine vision-check (filter, make-up, licht) op een uitsnede van ±256 px | Ja (alleen de kwaliteitscheck) | Haiku ≈ **$0,0005** · Sonnet ≈ **$0,005** |

**FEIT:** de API-prijzen per miljoen tokens zijn in/uit: Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 5.5 $0,10/$0,50. **AANNAME:** ±1.400 tokens in (beeld van ±350 tokens plus de prompt) en ±1.000 uit (inclusief denkwerk). De echte kosten logt de tool zelf per aanroep. **Hele testronde:** 30 personen × 6 foto's × (3 modellen voor B + C) ≈ **$10–15**.

## Wat de kaart wel en niet kan (lees dit)
- **FEIT:** een thuisprinter drukt kleuren niet absoluut juist. Het grijsvlak (#777777) is op papier niet precies 18%, en de kleurvlakken wijken per printer af.
- **Dat is voor de gate geen probleem.** De gate meet consistentie *tussen selfies van dezelfde persoon met dezelfde kaart*, en dan werkt een relatieve correctie. Print daarom alle testkaarten op **één printer**.
- **Voor de echte pas (fase B)** is een drukkerij met een vaste kleurinstelling nodig. Daarna meten we elke oplage één keer in tegen een gekalibreerde referentie.

## Kritisch: consistentie ≠ juistheid
Een tool die iedereen "Soft Autumn" geeft, haalt de gate van 15% met gemak. Ik voeg daarom twee controles toe:
1. **Spreiding:** de uitslagen moeten de ruimte vullen (geen seizoen boven 30% van de testpersonen).
2. **Grondwaarheid voor een deel van de groep:** voor ±8 personen een oordeel van een echte kleuradviseur, of in elk geval de meerderheid van 3 onafhankelijke methodes (jouw ChatGPT-test, pijplijn B op Opus en een drape-test). **Jouw keuze, zie vraag 4.**

## Privacy in fase A
- **MENING:** bewaar de testfoto's (met schriftelijke toestemming) in een **privé Supabase-bucket in de EU**, met automatische verwijdering na 30 dagen. Zonder foto's moet je bij elke aanpassing van de regels opnieuw mensen laten fotograferen.
- **Eén zin juridisch:** huidtint kan iets zeggen over etnische afkomst (AVG art. 9). Daarom is **uitdrukkelijke** toestemming nodig, en die neem ik op in het toestemmingsformulier dat ik voor je schrijf.
- Bij pijplijn B en C gaat er alleen een uitsnede naar Anthropic. Eerst checken of zero retention voor ons account mogelijk is; anders geldt het standaardbeleid. Dat zet ik in de DPIA-notitie.

## Wat ik van je nodig heb (en wat het kost)
1. **Anthropic API-key** (console.anthropic.com), met een limiet van $25 erop. Kosten: ±$10–15.
2. **Supabase-account**, project in **Frankfurt (eu-central-1)**. Gratis tier.
3. **Vercel-account** (Hobby, gratis; voor een interne test is dat prima). Voor de commerciële livegang in fase B is Pro nodig: **$20 per maand**.
4. **Keuze grondwaarheid:** een kleuradviseur (kosten onbekend; graag een offerte voor 8 personen) of de 3-methodes-meerderheid (gratis).
5. Een **wachtwoord** voor `/lab`, plus akkoord om de repo te committen (eventueel ook naar een privé GitHub-repo voor Vercel).

## Volgorde na GO (±2 weken)
**Week 1:** Next.js-skelet, `/lab` met login, upload, kaartdetectie en kalibratie, pijplijn A, Supabase-schema, toestemmingsformulier.
**Week 2:** pijplijn B en C, de modelvergelijking, het rapport, het ChatGPT-vergelijkingsformulier, Vitest voor de kleurlogica. Daarna testdag(en) en de gate-meting.
