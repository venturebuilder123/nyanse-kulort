# "Breaking the frame": kleur stroomt door de post

*21 oktober 2026. Inspiratie van de oprichter: thebranding.ai (saus die door een Instagram-balk stroomt). Voor ons: **kleur stroomt door de balk en wordt het doek om iemands schouders**. In één beeld zie je: de juiste kleur maakt het verschil.*

## Hoe het werkt

1. Jij maakt het beeld in Gemini met een **lege, effen zwarte balk** in het midden. Gebruik de prompts hieronder.
2. Zet het beeld in **`assets/gemini/framebreak/`**, met de naam `{concept}-{seizoen}-{nyanse|kulort}.png`, bijvoorbeeld `pour-softAutumn-nyanse.png`.
3. Ik draai `node scripts/make-frame-break.mjs`. Het script:
   - vindt de zwarte balk;
   - zet er onze Instagram-balk op: iconen, "kulortnyanse", de vraag *"Same face. Different colour. Which season are you?"* en het monogram;
   - legt de verf of de stof die door de balk loopt er weer **vóór**, zodat hij echt "door" de post stroomt.
4. Het resultaat komt in `public/social/framebreak/` en gaat in de kalender.

**Geen nep-tellers:** onze balk toont geen aantallen likes of reacties (CLAUDE.md §2).

**Tips voor Gemini:**
- De balk moet **echt effen zwart** zijn, zonder tekst. Zet Gemini er toch tekst of iconen in, vraag dan: *"Make the black band completely empty and flat."*
- Maak per prompt 2 tot 4 versies.
- Formaat: **4:5** voor de feed, **9:16** voor Reels en Stories. Het script herkent het formaat vanzelf.

## Vaste zin (staat al in elke prompt)

> A perfectly flat, solid, matte pure black horizontal band (#0B0B0E) crosses the full width of the image from 45% to 63% of the height. The band is completely empty: no text, no icons, no logos, no reflections. The [colour] flows in front of the band, crossing it from top to bottom in one continuous stream. Above and below the band: a light warm-grey seamless studio background.

## De prompts

**1. `pour-softAutumn-nyanse` (de verf wordt haar doek)**
```
Photorealistic vertical editorial image, 4:5. At the top, a clear glass jar tips over and pours thick, glossy liquid paint in soft muted teal (#3F6A6A). The paint flows down in one smooth stream. A perfectly flat, solid, matte pure black horizontal band (#0B0B0E) crosses the full width of the image from 45% to 63% of the height; the band is completely empty: no text, no icons, no logos, no reflections. The teal paint flows in front of the band, crossing it from top to bottom. Below the band, the paint lands on the shoulders of a woman in her late twenties (light-medium warm-neutral skin, soft golden-brown shoulder-length hair, muted green-hazel eyes, real skin texture) and turns into a soft silk drape around her shoulders. Her face looks fresh and even, she looks calmly into the camera. Light warm-grey seamless studio background, soft studio light. No text, no logos, no celebrity, no resemblance to any famous person, no beauty filter.
```

**2. `pour-deepWinter-kulort` (de verf wordt zijn doek)**
```
Photorealistic vertical editorial image, 4:5. At the top, a clear glass jar tips over and pours thick, glossy liquid paint in deep indigo (#3A2A6B). The paint flows down in one smooth stream. A perfectly flat, solid, matte pure black horizontal band (#0B0B0E) crosses the full width of the image from 45% to 63% of the height; the band is completely empty: no text, no icons, no logos, no reflections. The indigo paint flows in front of the band, crossing it from top to bottom. Below the band, the paint lands on the shoulders of a man in his early forties (deep cool-brown skin, short black hair, dark brown eyes with bright whites, real skin texture) and turns into a draped indigo knit around his shoulders. He looks confidently into the camera. Light warm-grey seamless studio background, soft studio light. No text, no logos, no celebrity, no resemblance to any famous person, no beauty filter.
```

**3. `ribbon-softAutumn-product` (zonder mensen: een kleurenwaaier wordt een trui)**
```
Photorealistic vertical product image, 4:5. At the top, a paper colour fan with plain swatches (soft teal, olive, camel, warm terracotta, milk-chocolate brown) is fanned open; the warm terracotta swatch (#B8735A) unrolls into a long, glossy silk ribbon that falls down. A perfectly flat, solid, matte pure black horizontal band (#0B0B0E) crosses the full width of the image from 45% to 63% of the height; the band is completely empty: no text, no icons, no logos, no reflections. The terracotta ribbon passes in front of the band, crossing it from top to bottom. Below the band, the ribbon lands in soft folds on a neatly folded knit sweater in the same warm terracotta, on a linen surface. Light warm-grey seamless studio background, soft studio light. No readable text, no logos.
```

**4. `pour-lightSpring-nyanse` (lichte, warme variant)**
```
Photorealistic vertical editorial image, 4:5. At the top, a clear glass jar tips over and pours thick, glossy liquid paint in warm apricot (#F3A27A). A perfectly flat, solid, matte pure black horizontal band (#0B0B0E) crosses the full width of the image from 45% to 63% of the height; the band is completely empty: no text, no icons, no logos, no reflections. The apricot paint flows in front of the band, crossing it from top to bottom. Below the band, the paint lands on the shoulders of a woman in her twenties (fair golden skin with light freckles, strawberry-blonde hair, light blue-green eyes, real skin texture) and turns into a soft silk drape. Her face looks bright and fresh, she smiles slightly. Light warm-grey seamless studio background, soft studio light. No text, no logos, no celebrity, no resemblance to any famous person, no beauty filter.
```

## Met beweging (Veo, als dat lukt)

Dezelfde prompt, met deze zin vooraan: *"8-second vertical video, 9:16, static camera, slow-motion pour; the black band stays perfectly still and empty the whole time."*

Daarna zet ik dezelfde balk frame voor frame op de video, met de verf ervoor. Dat bouw ik zodra er een clip is.

## AI-label

De beelden met mensen krijgen de AI-regel in het bijschrift, net als de andere posts met modellen.
