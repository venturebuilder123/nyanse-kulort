# AI-flat-lays voor de stijlgids (prompts voor Gemini)

*13 oktober 2026. Voor de sfeerbeelden op pagina 5 (kleuren) en 6 (combinaties) van de stijlgids.*

## Het idee in één zin
Gemini maakt **één keer** per merk losse kledingstukken in **neutraal lichtgrijs**. De app kleurt ze per persoon in de kleuren van diens profiel en legt ze samen tot een flat-lay. Zo krijgt iedereen eigen beelden, zonder 12 seizoenen × 4 combinaties × 2 merken = 96 losse AI-beelden. De kleuren blijven dan ook exact die van het palet: AI-kleuren kloppen nooit precies.

## Waarom grijs en los
- **Lichtgrijs** (ongeveer #BDBDBD) houdt plooien, naden en textuur zichtbaar. De app vervangt de kleur en behoudt de lichtheid. Een donker of gekleurd stuk laat zich niet goed omkleuren.
- **Los op wit** zodat de app elk stuk kan uitknippen en zelf de compositie kiest (top, broek, schoenen, accessoire).
- **Zelfde licht en hoek** voor alle stukken, anders valt de flat-lay uit elkaar.

## Werkwijze (±30 minuten per merk)
1. Open één nieuwe chat per merk in Gemini. Kies beeldverhouding **1:1**.
2. Plak de **briefing** (blok A). Zeg er niets bij.
3. Plak daarna de stukken uit blok B **één voor één**. Kies per stuk de beste van 2 varianten.
4. Download op de hoogste resolutie en noem de bestanden zoals in de lijst (`kulort-overshirt.png` enzovoort).
5. Zet ze in `assets/flatlay-originals/` en zeg het me. Ik knip ze uit, maak de omkleuring en zet ze in de gids.

---

## A. Briefing (één keer, aan het begin)

> You are a product photographer shooting a consistent series of top-down flat-lay garment photos for a fashion app. Every image in this conversation must follow this brief:
>
> **Subject:** exactly one garment or accessory per image, laid flat and neatly styled, shot straight from above (90°), centred, filling about 70% of the frame.
>
> **Colour:** the item is **plain neutral light grey (about #BDBDBD)**, a single solid colour, no pattern, no print, no logo, no contrasting stitching, no colour cast. Metal parts (buckles, zips, watch case) in neutral brushed steel.
>
> **Material:** realistic fabric texture clearly visible: weave, folds, seams, soft natural creases. Premium quality, as in a high-end menswear or womenswear catalogue.
>
> **Light:** soft, even, diffused overhead daylight (5500K), very soft natural shadow directly under the item, no hard shadows, no reflections.
>
> **Background:** pure white seamless background (#FFFFFF), nothing else in the frame.
>
> **Never:** people, hands, hangers, props, text, labels, watermarks, other items, colour.
>
> Square 1:1. Reply only "Ready" and wait for the first item.

## B. Stukken (één tegelijk)

Voor elk volgend stuk zet je ervoor: *"Same shoot, same light, same grey, same angle. Next item:"*

**Chat 1: KULØRT (mannen)**

| Bestand | Prompt |
|---|---|
| `kulort-overshirt.png` | `A men's wool overshirt with chest pockets, buttoned, sleeves folded neatly at the sides.` |
| `kulort-oxford.png` | `A men's oxford button-down shirt, buttoned, collar visible, sleeves folded behind.` |
| `kulort-knit.png` | `A men's fine-knit crew-neck merino sweater, sleeves folded inwards.` |
| `kulort-tee.png` | `A men's heavyweight crew-neck T-shirt, sleeves flat.` |
| `kulort-chino.png` | `Men's slim chino trousers, folded once at the knee so the full length shows.` |
| `kulort-jeans.png` | `Men's straight-leg jeans, folded once at the knee. Same light grey, denim texture visible.` |
| `kulort-blazer.png` | `A men's unstructured single-breasted blazer, buttoned, lapels visible.` |
| `kulort-sneaker.png` | `A pair of minimal leather low-top sneakers, side by side, seen from above.` |
| `kulort-derby.png` | `A pair of suede derby shoes, side by side, seen from above.` |
| `kulort-belt.png` | `A leather belt, loosely coiled, brushed steel buckle.` |

**Chat 2: NYANSE (vrouwen)**

| Bestand | Prompt |
|---|---|
| `nyanse-blouse.png` | `A women's silk blouse with a soft collar, buttoned, sleeves folded neatly at the sides.` |
| `nyanse-knit.png` | `A women's fine-knit crew-neck cashmere sweater, sleeves folded inwards.` |
| `nyanse-top.png` | `A women's fitted ribbed long-sleeve top, sleeves flat.` |
| `nyanse-blazer.png` | `A women's relaxed single-breasted blazer, lapels visible.` |
| `nyanse-trousers.png` | `Women's wide-leg tailored trousers, folded once so the full length shows.` |
| `nyanse-skirt.png` | `A women's midi slip skirt, laid flat with soft folds.` |
| `nyanse-jeans.png` | `Women's straight-leg jeans, folded once at the knee. Same light grey, denim texture visible.` |
| `nyanse-loafer.png` | `A pair of leather loafers, side by side, seen from above.` |
| `nyanse-bag.png` | `A structured leather shoulder bag with a thin strap, laid flat.` |
| `nyanse-scarf.png` | `A silk scarf, loosely folded into a soft rectangle.` |

## C. Correcties (één per keer)
| Probleem | Plak dit |
|---|---|
| Stuk heeft toch een kleur | `Keep everything identical, but make the item plain neutral light grey (#BDBDBD), no colour at all.` |
| Te weinig textuur | `Keep everything identical, but show more realistic fabric texture: weave, seams and soft creases.` |
| Schuin of perspectief | `Keep the item identical, but shoot it perfectly from directly above, flat, no perspective.` |
| Harde schaduw | `Keep everything identical, but make the shadow very soft and only directly under the item.` |
| Logo of print | `Keep everything identical, but remove all logos, labels and prints.` |

## Controle
- [ ] Neutraal grijs, geen zweem (vergelijk met een grijs vlak)
- [ ] Rechtstreeks van boven, puur witte achtergrond
- [ ] Geen logo, label of tekst
- [ ] Programma en datum genoteerd in `assets/flatlay-originals/bron.txt`
