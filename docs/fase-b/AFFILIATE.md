# Affiliate via Daisycon: selectie en aanmelding

*18 oktober 2026. Bron: de Daisycon-export "campaigns" (21 modeprogramma's). In de code: `lib/catalog/programs.ts`.*

## Hoe ik heb gekozen

1. **Levert in Nederland** (en liefst België).
2. **Heeft een productfeed.** Zonder feed kunnen we de kleur niet meten, dus kunnen we niets aanbevelen.
3. **Past bij wat de gids aanraadt:** kleding bij het gezicht (overhemd, trui, blouse), de basis (broek, jas), en de accessoires uit de gids (KULØRT: schoenen, riem, horloge; NYANSE: sieraden).
4. **Past bij de budgetten uit /stijl** (tot €30, €30–80, €80+) en bij het merk: geen ultragoedkope marktplaats.
5. Pas daarna: commissie. We bevelen aan op kleur, nooit op commissie.

## Aanmelden (eerste ronde)

| Programma | Waarom | Budget | Voor | Commissie |
|---|---|---|---|---|
| **Mexx** (15549) | Nederlands merk, middenprijs, heren en dames, NL/BE | €30–80 | beide | 7% |
| **AllSaints** (20868) | Knitwear, leer en denim. Sterk voor KULØRT | €80+ | beide | 3,5% |
| **Zadig&Voltaire** (15679) | Kasjmier en jassen in duidelijke kleuren | €80+ | beide | 9,6% |
| **Giglio** (19810) | 500+ designermerken: veel kleur in één feed | €80+ | beide | 7,2% |
| **Lureaux** (18357) | Kleurrijke herenschoenen: precies "schoenen in jouw leerkleur" | €30–80+ | KULØRT | 8,4% |
| **Theo Grace / Myka** (18346) | Sieraden in goud, zilver of roségoud, zoals de gids adviseert | €30–80 | NYANSE | 5,6% |

**Tweede ronde** (na de eerste cijfers): **Isabel Marant** (12%, de hoogste score in de lijst) en **Stella McCartney** (8%), allebei premium.

## Bewust niet

- **Giuseppe Zanotti**: luxe statement-schoenen, te ver van een basisgarderobe.
- **PUMA**: sportkleding en afrekening in USD.
- **Voghion**: goedkope marktplaats zonder feed; past niet bij het merk.
- **Sukkamestarit**: alleen sokken.
- **NordicBuddies, Urban Brands, Loragal**: leveren niet in Nederland.
- **IVALO**: de internationale variant heeft geen feed. Er bestaat een apart NL-programma; dat kun je later bekijken.
- **Optica Bassol**: alleen brillen op sterkte tellen mee.
- **Réjeanne**: geen kleding voor kleuradvies.
- **D'Arienzo** (leren jassen): misschien later, alleen voor KULØRT €80+.
- **Invicta** (horloges, 3,5%): de stijl is opvallend en past niet bij ons rustige advies. Misschien later voor "horloge in jouw metaal".

## Aanmeldtekst (plakken bij "hoe ga je promoten")

> KULØRT · NYANSE (kulort-nyanse.com) is a Dutch personal colour analysis service for men (KULØRT) and women (NYANSE). Users get their colour profile from one selfie and a personal style guide with their 30 best colours. We recommend real products whose measured colour matches the user's palette, in outfits per occasion and per budget, with a clear affiliate disclosure. We never use coupon or cashback tactics and never overwrite other affiliates' cookies. Traffic: organic Instagram (@kulortnyanse), creators and paid social in NL/BE. We will use your product feed and deeplinks only.

In het Nederlands, als de adverteerder dat vraagt:

> KULØRT · NYANSE is een Nederlandse dienst voor persoonlijk kleuradvies voor mannen en vrouwen. Gebruikers krijgen hun kleurprofiel uit één selfie, en een stijlgids met hun 30 beste kleuren. Wij raden echte producten aan waarvan de gemeten kleur bij hun palet past, per gelegenheid en per budget, met een duidelijke vermelding van de affiliate-link. Geen kortings- of cashbacktrucs en we overschrijven nooit de cookies van anderen. Verkeer: Instagram, creators en social-advertenties in NL en BE.

**Bij "media" in Daisycon:** voeg de website toe (kulort-nyanse.com) en Instagram (@kulortnyanse).

## Na goedkeuring

1. Zet bij het programma in `lib/catalog/programs.ts` de status op `approved` (of geef het mij door).
2. Kopieer per programma de **productfeed-URL** uit Daisycon naar `.env` en Vercel (bijvoorbeeld `DAISYCON_FEED_15549=…`). Dat is een sleutel, dus nooit in de code.
3. Ik bouw dan het importscript: feed → producten → kleur meten van de productfoto → Lab/hex opslaan → outfits matchen op ΔE, gelegenheid, budget en winkel (CLAUDE.md §7).
4. **Winkelknoppen in /stijl en de ticker bij de analyse:** daar staan nu Zalando, OFM, COS en andere winkels die nog niet in de catalogus zitten. Volgens CLAUDE.md §6 mogen daar alleen winkels staan die echt in de catalogus zitten. Zodra de eerste programma's zijn goedgekeurd, vervang ik die lijst door de goedgekeurde winkels.
5. Bij elke productlink de vermelding "Affiliate-link: wij krijgen een kleine vergoeding, jij betaalt niets extra", en in de gids blijft "Aanbevolen op kleur, nooit op commissie" staan.

## Ontbreekt nog

De grote middenprijswinkels die nu in /stijl staan (Zalando, Uniqlo, COS, Arket, H&M, Zara, Mango, ASOS) zitten niet in deze Daisycon-lijst. Die lopen via andere netwerken: Awin, TradeTracker, Partnerize of een eigen programma, en sommige hebben er geen. Dat is de volgende zoektocht, want daar zit het grootste deel van je kopers.
