# Gemini-handboek: editorials en social posts in de nieuwe stijl

_19 oktober 2026. Gegenereerd met `node scripts/make-gemini-prompts.mjs` uit de kleurmotor: de goede en foute doeken per seizoen zijn de echte kleuren uit de gids._

## Spelregels (lees dit eerst)

1. **Mooi, maar echt.** Aantrekkelijke modellen met echte huid. Plastic perfectie maakt het kleureffect ongeloofwaardig en wakkert onzekerheid aan (CLAUDE.md §12).
2. **Nooit een bekend gezicht of een lookalike** (CLAUDE.md §2). De bekende namen ("vaak genoemd als …") zet ik zelf als tekst op het beeld en in het bijschrift.
3. **Geen tekst laten maken door Gemini.** Koppen, namen en het logo zet ik erop in de huisstijl.
4. **Elk seizoen op meer dan één huidtint.** Per seizoen staan er twee castings. Wissel ze af, zodat iedereen zichzelf ziet.
5. **AI-label:** zet bij het plaatsen op **TikTok** het label "AI-generated content" aan; dat is daar verplicht. **Instagram/Meta** voegt soms zelf "AI info" toe. Bij **advertenties** met deze beelden zet je het label altijd aan. Op **Etsy** staat de vermelding al in de beschrijving.

## Zo lever je ze aan

Zet de beelden in **`assets/gemini/`** met deze namen. Dan weet ik wat het is en waar het heen moet:

| Reeks                            | Bestandsnaam              | Formaat      | Wordt       |
| -------------------------------- | ------------------------- | ------------ | ----------- | --------------------------- | ------------------------------------------- | --- | --------------------------- |
| A. Het effect (doek fout → goed) | `effect-{seizoen}-{nyanse | kulort}-{1   | 2}.png`     | 4:5                         | Carrousel-slide 1, Reels-cover, advertentie |
| B. Seizoensportret               | `hero-{seizoen}-{nyanse   | kulort}.png` | 4:5 en 9:16 | Website, Pinterest, Stories |
| C. De voordelen                  | `benefit-{fitting         | morning      | date        | work}-{seizoen}-{nyanse     | kulort}.png`                                | 4:5 | Volgers-posts, advertenties |

`{seizoen}` = softAutumn, deepWinter, softSummer, lightSpring, warmAutumn, coolWinter, lightSummer, brightSpring, deepAutumn, coolSummer, warmSpring, brightWinter.

**Tip voor Gemini:**

- Plak de prompt in één keer.
- Is het gezicht in de twee helften van het effectbeeld niet hetzelfde, vraag dan: _"Keep exactly the same person and pose in both halves; change only the drape colour."_
- Maak per prompt 2 tot 4 varianten en bewaar de beste.

**Wat ik ermee doe:**

- tekst en het logo erop in de huisstijl: het seizoen, "Same face. Different colour.", de voordelen, "vaak genoemd als …";
- de beelden verdelen over de Instagram-kalender, de Pinterest-pins, de website en de advertenties.

## Basisblokken (zitten al in elke prompt)

**Stijl:** Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance.

**Vermijden:** No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background.

## A. Het effect: zelfde gezicht, fout doek tegenover goed doek (24 prompts)

De belangrijkste reeks: dit laat in één blik zien wat kleur doet.

### Soft Autumn

**effect-softAutumn-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (light-medium warm-neutral skin, soft golden-brown hair, muted green-hazel eyes, low contrast, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #1F4FC4 (rgb 31, 79, 196) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #3F6A6A (rgb 63, 106, 106), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-softAutumn-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (medium warm-olive skin (Monk 6), soft brown hair, muted warm brown eyes, low contrast, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #DC143C (rgb 220, 20, 60) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #3F6A6A (rgb 63, 106, 106), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-softAutumn-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (light-medium warm-neutral skin, soft golden-brown hair, muted green-hazel eyes, low contrast, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #1F4FC4 (rgb 31, 79, 196) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #3F6A6A (rgb 63, 106, 106), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-softAutumn-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (medium warm-olive skin (Monk 6), soft brown hair, muted warm brown eyes, low contrast, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #DC143C (rgb 220, 20, 60) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #3F6A6A (rgb 63, 106, 106), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Deep Winter

**effect-deepWinter-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (fair-medium cool skin, near-black hair, dark brown eyes, high contrast, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #3A2A6B (rgb 58, 42, 107), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-deepWinter-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (deep cool-brown skin (Monk 9), black hair, dark brown eyes with bright whites, high contrast, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #E2533A (rgb 226, 83, 58) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #3A2A6B (rgb 58, 42, 107), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-deepWinter-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (fair-medium cool skin, near-black hair, dark brown eyes, high contrast, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #3A2A6B (rgb 58, 42, 107), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-deepWinter-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (deep cool-brown skin (Monk 9), black hair, dark brown eyes with bright whites, high contrast, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #E2533A (rgb 226, 83, 58) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #3A2A6B (rgb 58, 42, 107), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Soft Summer

**effect-softSummer-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (light-medium neutral-cool skin, mousy ash-brown hair, soft grey-green eyes, low contrast, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #F2B632 (rgb 242, 182, 50) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #7D8471 (rgb 125, 132, 113), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-softSummer-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (medium neutral-olive skin (Monk 5), soft brown hair with ash tones, muted hazel eyes, low contrast, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #7D8471 (rgb 125, 132, 113), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-softSummer-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (light-medium neutral-cool skin, mousy ash-brown hair, soft grey-green eyes, low contrast, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #F2B632 (rgb 242, 182, 50) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #7D8471 (rgb 125, 132, 113), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-softSummer-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (medium neutral-olive skin (Monk 5), soft brown hair with ash tones, muted hazel eyes, low contrast, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #7D8471 (rgb 125, 132, 113), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Light Spring

**effect-lightSpring-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (fair golden skin with light freckles, strawberry-blonde hair, light blue-green eyes, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #4F8F8B (rgb 79, 143, 139) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #F3A27A (rgb 243, 162, 122), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-lightSpring-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (light-medium golden skin (Monk 4), light golden-brown hair, warm hazel eyes, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #7B2CBF (rgb 123, 44, 191) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #F3A27A (rgb 243, 162, 122), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-lightSpring-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (fair golden skin with light freckles, strawberry-blonde hair, light blue-green eyes, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #4F8F8B (rgb 79, 143, 139) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #F3A27A (rgb 243, 162, 122), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-lightSpring-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (light-medium golden skin (Monk 4), light golden-brown hair, warm hazel eyes, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #7B2CBF (rgb 123, 44, 191) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #F3A27A (rgb 243, 162, 122), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Warm Autumn

**effect-warmAutumn-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (warm ivory skin with freckles, rich auburn hair, warm brown eyes, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #1F4FC4 (rgb 31, 79, 196) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-warmAutumn-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (medium-deep golden-brown skin (Monk 7), warm dark brown hair with red lights, warm brown eyes, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #DC143C (rgb 220, 20, 60) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-warmAutumn-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (warm ivory skin with freckles, rich auburn hair, warm brown eyes, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #1F4FC4 (rgb 31, 79, 196) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-warmAutumn-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (medium-deep golden-brown skin (Monk 7), warm dark brown hair with red lights, warm brown eyes, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #DC143C (rgb 220, 20, 60) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Cool Winter

**effect-coolWinter-nyanse-1.png**

```
    A diptych photograph, two halves side by side, of the SAME woman (porcelain cool skin, dark brown-black hair, icy blue eyes, high contrast, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #0E4C92 (rgb 14, 76, 146), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-coolWinter-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (deep cool ebony skin (Monk 10), black hair, dark eyes, striking contrast, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #9E2A2B (rgb 158, 42, 43) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #0E4C92 (rgb 14, 76, 146), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-coolWinter-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (porcelain cool skin, dark brown-black hair, icy blue eyes, high contrast, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #0E4C92 (rgb 14, 76, 146), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-coolWinter-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (deep cool ebony skin (Monk 10), black hair, dark eyes, striking contrast, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #9E2A2B (rgb 158, 42, 43) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #0E4C92 (rgb 14, 76, 146), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Light Summer

**effect-lightSummer-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (fair cool-pink skin, ash-blonde hair, soft grey-blue eyes, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #F2B632 (rgb 242, 182, 50) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #F0B7C8 (rgb 240, 183, 200), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-lightSummer-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (light-medium cool skin (Monk 3), light ash-brown hair, soft blue-grey eyes, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #F0B7C8 (rgb 240, 183, 200), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-lightSummer-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (fair cool-pink skin, ash-blonde hair, soft grey-blue eyes, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #F2B632 (rgb 242, 182, 50) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #F0B7C8 (rgb 240, 183, 200), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-lightSummer-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (light-medium cool skin (Monk 3), light ash-brown hair, soft blue-grey eyes, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #F0B7C8 (rgb 240, 183, 200), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Bright Spring

**effect-brightSpring-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (light warm skin, glossy dark-golden-brown hair, bright clear blue eyes, high clarity, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #4F8F8B (rgb 79, 143, 139) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-brightSpring-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (medium warm-brown skin (Monk 6), dark brown hair, bright clear dark eyes with strong whites, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #B0103A (rgb 176, 16, 58) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-brightSpring-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (light warm skin, glossy dark-golden-brown hair, bright clear blue eyes, high clarity, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #4F8F8B (rgb 79, 143, 139) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-brightSpring-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (medium warm-brown skin (Monk 6), dark brown hair, bright clear dark eyes with strong whites, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #B0103A (rgb 176, 16, 58) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Deep Autumn

**effect-deepAutumn-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (medium warm-olive skin, deep chocolate-brown hair, dark brown eyes, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #1F4FC4 (rgb 31, 79, 196) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #6E1F2A (rgb 110, 31, 42), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-deepAutumn-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (deep warm-brown skin (Monk 8), dark brown-black hair, deep brown eyes, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #DC143C (rgb 220, 20, 60) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #6E1F2A (rgb 110, 31, 42), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-deepAutumn-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (medium warm-olive skin, deep chocolate-brown hair, dark brown eyes, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #1F4FC4 (rgb 31, 79, 196) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #6E1F2A (rgb 110, 31, 42), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-deepAutumn-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (deep warm-brown skin (Monk 8), dark brown-black hair, deep brown eyes, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #DC143C (rgb 220, 20, 60) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #6E1F2A (rgb 110, 31, 42), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Cool Summer

**effect-coolSummer-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (fair-medium cool rosy skin, ash-brown hair, cool grey-blue eyes, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #F2B632 (rgb 242, 182, 50) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #5B7DB1 (rgb 91, 125, 177), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-coolSummer-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (medium cool-beige skin (Monk 5), soft dark ash-brown hair, cool brown eyes, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #5B7DB1 (rgb 91, 125, 177), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-coolSummer-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (fair-medium cool rosy skin, ash-brown hair, cool grey-blue eyes, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #F2B632 (rgb 242, 182, 50) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #5B7DB1 (rgb 91, 125, 177), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-coolSummer-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (medium cool-beige skin (Monk 5), soft dark ash-brown hair, cool brown eyes, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2F6FDE (rgb 47, 111, 222) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #5B7DB1 (rgb 91, 125, 177), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Warm Spring

**effect-warmSpring-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (fair-medium skin with a golden glow and freckles, copper-red hair, warm green eyes, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #4F8F8B (rgb 79, 143, 139) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #A6A04C (rgb 166, 160, 76), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-warmSpring-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (medium golden-tan skin (Monk 5), warm chestnut hair with golden lights, amber-brown eyes, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #7B2CBF (rgb 123, 44, 191) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #A6A04C (rgb 166, 160, 76), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-warmSpring-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (fair-medium skin with a golden glow and freckles, copper-red hair, warm green eyes, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #4F8F8B (rgb 79, 143, 139) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #A6A04C (rgb 166, 160, 76), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-warmSpring-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (medium golden-tan skin (Monk 5), warm chestnut hair with golden lights, amber-brown eyes, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #7B2CBF (rgb 123, 44, 191) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #A6A04C (rgb 166, 160, 76), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

### Bright Winter

**effect-brightWinter-nyanse-1.png**

```
A diptych photograph, two halves side by side, of the SAME woman (light cool skin, glossy black hair, vivid blue eyes, very high clarity, age 26), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #FF1493 (rgb 255, 20, 147), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-brightWinter-nyanse-2.png**

```
A diptych photograph, two halves side by side, of the SAME woman (medium-deep cool brown skin (Monk 8), black hair, bright clear dark eyes, very high clarity, age 35), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #9E2A2B (rgb 158, 42, 43) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #FF1493 (rgb 255, 20, 147), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-brightWinter-kulort-1.png**

```
A diptych photograph, two halves side by side, of the SAME man (light cool skin, glossy black hair, vivid blue eyes, very high clarity, age 28), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #2E6B5E (rgb 46, 107, 94) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #DC143C (rgb 220, 20, 60), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**effect-brightWinter-kulort-2.png**

```
A diptych photograph, two halves side by side, of the SAME man (medium-deep cool brown skin (Monk 8), black hair, bright clear dark eyes, very high clarity, age 42), identical pose, identical light, identical framing from the shoulders up, looking straight into the camera. LEFT half: a plain fabric drape in #9E2A2B (rgb 158, 42, 43) wrapped around the shoulders, the colour makes the skin look slightly dull and draws attention away from the face. RIGHT half: a plain fabric drape in #DC143C (rgb 220, 20, 60), the same face now looks fresh, even and bright, eyes clearer. Only the drape colour differs between the halves. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

## B. Seizoensportretten (24 prompts; maak elk in 4:5 en in 9:16)

### Soft Autumn

**hero-softAutumn-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: light-medium warm-neutral skin, soft golden-brown hair, muted green-hazel eyes, low contrast. Outfit only in these colours: #3F6A6A, #6B4B38, #7A7449, #A89A72, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-softAutumn-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: light-medium warm-neutral skin, soft golden-brown hair, muted green-hazel eyes, low contrast. Outfit only in these colours: #3F6A6A, #6B4B38, #7A7449, #A89A72, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Deep Winter

**hero-deepWinter-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: fair-medium cool skin, near-black hair, dark brown eyes, high contrast. Outfit only in these colours: #3A2A6B, #1B2A5C, #3F1A44, #0B6B4F, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-deepWinter-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: fair-medium cool skin, near-black hair, dark brown eyes, high contrast. Outfit only in these colours: #3A2A6B, #1B2A5C, #3F1A44, #0B6B4F, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Soft Summer

**hero-softSummer-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: light-medium neutral-cool skin, mousy ash-brown hair, soft grey-green eyes, low contrast. Outfit only in these colours: #7D8471, #5E6A7A, #9A8F8A, #A6879C, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-softSummer-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: light-medium neutral-cool skin, mousy ash-brown hair, soft grey-green eyes, low contrast. Outfit only in these colours: #7D8471, #5E6A7A, #9A8F8A, #6E5468, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Light Spring

**hero-lightSpring-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: fair golden skin with light freckles, strawberry-blonde hair, light blue-green eyes. Outfit only in these colours: #F3A27A, #F4E3A1, #E8C468, #8FBF6A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-lightSpring-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: fair golden skin with light freckles, strawberry-blonde hair, light blue-green eyes. Outfit only in these colours: #F3A27A, #F4E3A1, #E8C468, #8FBF6A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Warm Autumn

**hero-warmAutumn-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: warm ivory skin with freckles, rich auburn hair, warm brown eyes. Outfit only in these colours: #2E6B5E, #556B2F, #A0522D, #8B4513, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-warmAutumn-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: warm ivory skin with freckles, rich auburn hair, warm brown eyes. Outfit only in these colours: #2E6B5E, #556B2F, #A0522D, #8B4513, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Cool Winter

**hero-coolWinter-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: porcelain cool skin, dark brown-black hair, icy blue eyes, high contrast. Outfit only in these colours: #0E4C92, #0F3D8C, #009B77, #B0103A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-coolWinter-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: porcelain cool skin, dark brown-black hair, icy blue eyes, high contrast. Outfit only in these colours: #0E4C92, #0F3D8C, #009B77, #B0103A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Light Summer

**hero-lightSummer-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: fair cool-pink skin, ash-blonde hair, soft grey-blue eyes. Outfit only in these colours: #F0B7C8, #CFA9D6, #BDB3DD, #A9D8CF, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-lightSummer-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: fair cool-pink skin, ash-blonde hair, soft grey-blue eyes. Outfit only in these colours: #F0B7C8, #A9D8CF, #AFC6E0, #7FA8C9, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Bright Spring

**hero-brightSpring-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: light warm skin, glossy dark-golden-brown hair, bright clear blue eyes, high clarity. Outfit only in these colours: #2F6FDE, #F75D9E, #8E5BD6, #E6194B, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-brightSpring-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: light warm skin, glossy dark-golden-brown hair, bright clear blue eyes, high clarity. Outfit only in these colours: #2F6FDE, #8E5BD6, #E6194B, #FF6F61, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Deep Autumn

**hero-deepAutumn-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: medium warm-olive skin, deep chocolate-brown hair, dark brown eyes. Outfit only in these colours: #6E1F2A, #5A2F3F, #4E3022, #2F4F3A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-deepAutumn-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: medium warm-olive skin, deep chocolate-brown hair, dark brown eyes. Outfit only in these colours: #6E1F2A, #5A2F3F, #4E3022, #2F4F3A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Cool Summer

**hero-coolSummer-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: fair-medium cool rosy skin, ash-brown hair, cool grey-blue eyes. Outfit only in these colours: #5B7DB1, #4F8F8B, #E3A1B9, #7E9DB8, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-coolSummer-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: fair-medium cool rosy skin, ash-brown hair, cool grey-blue eyes. Outfit only in these colours: #5B7DB1, #4F8F8B, #7E9DB8, #3E6E9C, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Warm Spring

**hero-warmSpring-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: fair-medium skin with a golden glow and freckles, copper-red hair, warm green eyes. Outfit only in these colours: #A6A04C, #E58A5B, #C79A5E, #4E86C4, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-warmSpring-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: fair-medium skin with a golden glow and freckles, copper-red hair, warm green eyes. Outfit only in these colours: #A6A04C, #E58A5B, #C79A5E, #4E86C4, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

### Bright Winter

**hero-brightWinter-nyanse.png**

```
A full-length editorial portrait of a woman standing by a tall window in an airy Amsterdam canal-house apartment. The woman: light cool skin, glossy black hair, vivid blue eyes, very high clarity. Outfit only in these colours: #FF1493, #DC143C, #7B2CBF, #0047AB, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

**hero-brightWinter-kulort.png**

```
A full-length editorial portrait of a man standing by a tall window in an airy Amsterdam canal-house apartment. The man: light cool skin, glossy black hair, vivid blue eyes, very high clarity. Outfit only in these colours: #DC143C, #7B2CBF, #0047AB, #9B111E, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5 (and a second version in 9:16).
```

## C. De voordelen: momenten waarop kleur het verschil maakt

Begin met deze 8. Wil je meer, dan vervang je het seizoen in de bestandsnaam en de kleuren met de lijst hieronder.

**benefit-fitting-softAutumn-nyanse.png**

```
A woman in a bright fitting room holding a garment under the chin and smiling, sure of the choice, the rail behind with clothes in matching colours. The woman: light-medium warm-neutral skin, soft golden-brown hair, muted green-hazel eyes, low contrast. Outfit only in these colours: #3F6A6A, #6B4B38, #7A7449, #A89A72, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**benefit-morning-deepWinter-kulort.png**

```
A man at an open wardrobe in the morning light, every garment hanging in one harmonious colour family, picking a piece without hesitation. The man: fair-medium cool skin, near-black hair, dark brown eyes, high contrast. Outfit only in these colours: #3A2A6B, #1B2A5C, #3F1A44, #0B6B4F, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**benefit-date-softSummer-nyanse.png**

```
A woman at a candle-lit café table in the evening, warm and confident, looking at someone off-camera. The woman: light-medium neutral-cool skin, mousy ash-brown hair, soft grey-green eyes, low contrast. Outfit only in these colours: #7D8471, #5E6A7A, #9A8F8A, #A6879C, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**benefit-work-coolWinter-kulort.png**

```
A man walking into a light, modern office meeting, poised and at ease, first impression moment. The man: porcelain cool skin, dark brown-black hair, icy blue eyes, high contrast. Outfit only in these colours: #0E4C92, #0F3D8C, #009B77, #B0103A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**benefit-fitting-lightSpring-kulort.png**

```
A man in a bright fitting room holding a garment under the chin and smiling, sure of the choice, the rail behind with clothes in matching colours. The man: fair golden skin with light freckles, strawberry-blonde hair, light blue-green eyes. Outfit only in these colours: #F3A27A, #F4E3A1, #E8C468, #8FBF6A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**benefit-morning-warmAutumn-nyanse.png**

```
A woman at an open wardrobe in the morning light, every garment hanging in one harmonious colour family, picking a piece without hesitation. The woman: warm ivory skin with freckles, rich auburn hair, warm brown eyes. Outfit only in these colours: #2E6B5E, #556B2F, #A0522D, #8B4513, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**benefit-date-deepAutumn-kulort.png**

```
A man at a candle-lit café table in the evening, warm and confident, looking at someone off-camera. The man: medium warm-olive skin, deep chocolate-brown hair, dark brown eyes. Outfit only in these colours: #6E1F2A, #5A2F3F, #4E3022, #2F4F3A, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

**benefit-work-brightSpring-nyanse.png**

```
A woman walking into a light, modern office meeting, poised and at ease, first impression moment. The woman: light warm skin, glossy dark-golden-brown hair, bright clear blue eyes, high clarity. Outfit only in these colours: #2F6FDE, #F75D9E, #8E5BD6, #E6194B, in natural fabrics (wool, cotton, linen, silk), one strong colour near the face, calmer shades below. Editorial fashion photograph, shot on a 50mm lens at f/2.8, soft natural daylight from a large window on the left, warm ivory paper backdrop (#F6F2EC), calm quiet-luxury mood like a Scandinavian fashion house campaign. Attractive model with real skin texture: visible pores, natural freckles where fitting, no airbrushing, no heavy make-up, natural hairline, relaxed confident expression. Colours rendered true to life, neutral white balance. No text, no letters, no logos, no watermark, no celebrity, no resemblance to any famous person, no plastic skin, no beauty filter, no extra fingers, no jewellery unless asked, plain background. Aspect ratio 4:5.
```

## Kleuren per seizoen (om zelf te variëren)

| Seizoen       | Goede kleuren (dames)           | Goede kleuren (heren)           | Laat hangen             |
| ------------- | ------------------------------- | ------------------------------- | ----------------------- |
| Soft Autumn   | #3F6A6A #6B4B38 #7A7449 #A89A72 | #3F6A6A #6B4B38 #7A7449 #A89A72 | #1F4FC4 #DC143C #009B77 |
| Deep Winter   | #3A2A6B #1B2A5C #3F1A44 #0B6B4F | #3A2A6B #1B2A5C #3F1A44 #0B6B4F | #2E6B5E #E2533A #F2B632 |
| Soft Summer   | #7D8471 #5E6A7A #9A8F8A #A6879C | #7D8471 #5E6A7A #9A8F8A #6E5468 | #F2B632 #2F6FDE #E6194B |
| Light Spring  | #F3A27A #F4E3A1 #E8C468 #8FBF6A | #F3A27A #F4E3A1 #E8C468 #8FBF6A | #4F8F8B #7B2CBF #DC143C |
| Warm Autumn   | #2E6B5E #556B2F #A0522D #8B4513 | #2E6B5E #556B2F #A0522D #8B4513 | #1F4FC4 #DC143C #009B77 |
| Cool Winter   | #0E4C92 #0F3D8C #009B77 #B0103A | #0E4C92 #0F3D8C #009B77 #B0103A | #2E6B5E #9E2A2B #B8860B |
| Light Summer  | #F0B7C8 #CFA9D6 #BDB3DD #A9D8CF | #F0B7C8 #A9D8CF #AFC6E0 #7FA8C9 | #F2B632 #2F6FDE #E6194B |
| Bright Spring | #2F6FDE #F75D9E #8E5BD6 #E6194B | #2F6FDE #8E5BD6 #E6194B #FF6F61 | #4F8F8B #B0103A #1F4FC4 |
| Deep Autumn   | #6E1F2A #5A2F3F #4E3022 #2F4F3A | #6E1F2A #5A2F3F #4E3022 #2F4F3A | #1F4FC4 #DC143C #009B77 |
| Cool Summer   | #5B7DB1 #4F8F8B #E3A1B9 #7E9DB8 | #5B7DB1 #4F8F8B #7E9DB8 #3E6E9C | #F2B632 #2F6FDE #E6194B |
| Warm Spring   | #A6A04C #E58A5B #C79A5E #4E86C4 | #A6A04C #E58A5B #C79A5E #4E86C4 | #4F8F8B #7B2CBF #DC143C |
| Bright Winter | #FF1493 #DC143C #7B2CBF #0047AB | #DC143C #7B2CBF #0047AB #9B111E | #2E6B5E #9E2A2B #B8860B |
