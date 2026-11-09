# Modellen v2: midden twintig, iedereen wil die persoon zijn

*9 november 2026. De oprichter: "de persona's en modellen moeten een stuk jonger, eerder midden twintig, en veel knapper. Iedereen moet die persoon willen zijn." Deze set vervangt de huidige portretten op de site (richting C, Paletstudio).*

## Wat je maakt (±1,5 uur, in Gemini)
1. **12 kleurportretten:** 6 vrouwen (NYANSE) en 6 mannen (KULØRT). De app legt daar zelf de kleurdoeken op: de spiegel, de swipe-test en de opening van de site.
2. **8 campagnebeelden:** 4 per merk. Sfeer voor de startpagina en de merkpagina's.

**Waarom de portretten zo streng zijn:** de app meet de huid en kleurt het shirt live om. Dat lukt alleen bij een neutraal licht, een effen grijs shirt en een vaste kadrering. De uitstraling mag nu veel sterker, de techniek blijft gelijk.

## Spelregels (blijven)
- **Echte huid:** zichtbare poriën, geen plastic AI-huid. Ons product gaat over huid; een nep-gezicht ondermijnt het vertrouwen.
- **Geen gelijkenis met bekende mensen.** Lijkt iemand op een beroemdheid? Weggooien.
- **Aantrekkelijk, niet uitdagend:** stijlvol en zelfverzekerd, geen sexy poses of diepe decolletés. Advertenties draaien voor 18+, en de site is 16+.
- **AI-label** blijft onder de beelden, zoals nu in de code.
- **Herkomst** per beeld in `public/brand/people/bron.txt` (programma en datum).

---

## A. Briefing portretten (één keer plakken per chat)

> You are a top fashion photographer shooting a consistent series of photorealistic head-and-shoulders beauty portraits for a premium colour-analysis brand. Every portrait in this conversation follows this exact brief unless I say otherwise:
>
> **People:** strikingly attractive people in their mid-twenties (23 to 27), the kind a top model agency would sign: magnetic, confident, effortlessly cool, someone everyone would love to look like. Real people, not plastic: natural proportions, no exaggerated features, not celebrities and not resembling any real or famous person. Respectful, no stereotypes.
>
> **Grooming:** fashionable, current hair styling. Women: fresh skin-like make-up only (no visible lipstick colour, no eyeshadow colour, no contour), groomed brows. Men: well-groomed, styled hair, stubble or clean-shaven as stated.
>
> **Camera and light:** full-frame camera, 85mm lens at f/4, eye level. One large soft window light directly in front, slightly above eye level, white reflector below the chin. Even light on both cheeks, no hard shadows, no rim light.
>
> **Colour:** true-to-life skin tones, neutral white balance (5500K daylight), no colour grading, no filter, no warm or cool cast, no beauty-filter smoothing. The grey T-shirt must look neutral grey.
>
> **Skin:** realistic texture with visible pores and small natural imperfections, healthy glow but matte, no oily shine, no airbrushing.
>
> **Styling:** plain light-grey crew-neck cotton T-shirt, no logo; no jewellery, no glasses, no hat.
>
> **Pose and framing:** facing the camera straight on, shoulders square, a relaxed, confident expression with a slight closed-mouth smile, eyes into the lens. Vertical 4:5. Face centred horizontally, eyes at about 38% from the top, face width about 40% of the image width, both shoulders fully visible at the bottom edge.
>
> **Background:** seamless plain warm light-grey paper backdrop (#D9D3CC), evenly lit, no gradient, no props.
>
> **Never:** text, logos, watermarks, borders, extra people, hands in frame, cropped shoulders, heavy bokeh.
>
> Reply only "Ready" and wait for the first person.

Daarna steeds: *"Same photoshoot, same light, background, camera and framing. New person:"* plus de volgende regel. Laat er 2 à 3 maken en kies de beste.

## B. Personen

**Chat 1: NYANSE (vrouwen)**, bestanden `nyanse-jong-1.jpg` t/m `nyanse-jong-6.jpg`
1. `Person: a 24-year-old Dutch woman, fair cool-pink skin, long ash-blonde hair in loose effortless waves, soft grey-blue eyes, high cheekbones.` *(Light Summer)*
2. `Person: a 25-year-old Surinamese-Dutch woman, deep warm brown skin (Monk 9), voluminous natural curls in a high puff, dark-brown eyes, radiant.` *(Deep Autumn)*
3. `Person: a 23-year-old Indonesian-Dutch woman, light-medium warm golden skin (Monk 4), sleek long black hair with a middle part, dark-brown eyes.` *(Warm Spring / Bright)*
4. `Person: a 26-year-old Irish woman, very fair warm skin with light freckles, long copper-red hair, green-hazel eyes.` *(Warm Autumn)*
5. `Person: a 25-year-old Moroccan-Dutch woman, medium olive skin (Monk 6), long glossy dark-brown hair, striking dark eyes, defined brows.` *(Deep Winter)*
6. `Person: a 24-year-old Scandinavian woman, light neutral skin, chin-length bob in soft mousy-blonde, muted grey-green eyes, low contrast.` *(Soft Summer)*

**Chat 2: KULØRT (mannen)**, bestanden `kulort-jong-1.jpg` t/m `kulort-jong-6.jpg`
1. `Person: a 25-year-old Dutch man, fair skin, textured ash-blond hair, light stubble, light blue eyes, strong jawline.` *(Light/Cool Summer)*
2. `Person: a 26-year-old Ghanaian-Dutch man, deep cool brown skin (Monk 10), short twists, clean-shaven, dark eyes, broad smile held back.` *(Deep/Cool Winter)*
3. `Person: a 24-year-old Turkish-Dutch man, medium warm olive skin (Monk 6), dark wavy hair styled back, short groomed beard, warm brown eyes.` *(Deep Autumn)*
4. `Person: a 27-year-old Italian man, light-medium warm skin, dark-blond hair with sun streaks, light stubble, hazel eyes.` *(Warm Spring)*
5. `Person: a 25-year-old Chinese-Dutch man, light-medium neutral skin (Monk 4), black hair in a modern textured crop, clean-shaven, dark-brown eyes.` *(Bright Winter)*
6. `Person: a 26-year-old Brazilian man, medium golden-brown skin (Monk 7), dark curly hair, short beard, warm dark eyes.` *(Warm Autumn)*

## C. Campagnebeelden (nieuwe chat "Campagne v2")

Zelfde mensen als hierboven: upload het portret en zeg *"Same person as in this photo."* Vertical 4:5, plus elk beeld ook in 9:16 voor TikTok en stories.

> Editorial fashion campaign photo, photorealistic, natural daylight, true-to-life colours (no colour grading). [PERSON] in their mid-twenties, effortlessly stylish, wearing a head-to-toe outfit in [SEASON] colours: [COLOURS]. Setting: [SETTING]. Candid, confident moment, the colours of the outfit clearly visible near the face. Shot on 50mm, shallow but not extreme depth of field. No text, no logos, no other recognisable people.

| Bestand | Persoon | Seizoen en kleuren | Setting |
|---|---|---|---|
| `nyanse-v2-1.jpg` | nyanse-jong-4 | Warm Autumn: rust, olive, camel | Amsterdam canal bridge at golden hour, bike next to her |
| `nyanse-v2-2.jpg` | nyanse-jong-2 | Deep Autumn: burgundy, chocolate, teal | bright apartment with a mirror, getting ready to go out |
| `nyanse-v2-3.jpg` | nyanse-jong-1 | Light Summer: powder blue, soft pink, sage | café terrace in the morning, coffee in hand |
| `nyanse-v2-4.jpg` | nyanse-jong-5 | Deep Winter: emerald, ink blue, pure white | rooftop at dusk, city lights behind |
| `kulort-v2-1.jpg` | kulort-jong-3 | Deep Autumn: espresso, olive, cognac leather | walking out of a modern office, jacket over the shoulder |
| `kulort-v2-2.jpg` | kulort-jong-2 | Cool Winter: navy, icy white, charcoal | city street, night, neon reflections on wet pavement |
| `kulort-v2-3.jpg` | kulort-jong-4 | Warm Spring: camel, warm white, light denim | weekend market, sunlight, laughing with off-camera friends |
| `kulort-v2-4.jpg` | kulort-jong-5 | Bright Winter: cobalt, black, white | minimal gallery space, bold and clean |

## C2. Voorkant van de stijlgids
De voorkant van elke gids gebruikt nu een ouder seizoensportret (`public/brand/heroes/`). Zodra de campagnebeelden uit C er zijn, laat ik de voorkant per seizoensfamilie het passende jonge campagnebeeld van het eigen merk kiezen. Daarvoor hoef je niets extra te maken.

## D. Aanleveren
1. Portretten in `public/brand/people/` met precies de namen hierboven. Ze vervangen de huidige `-jong-` beelden.
2. Campagnebeelden in `public/brand/editorial/` (4:5) en `public/brand/editorial/story/` (9:16).
3. Zeg het tegen mij. Ik meet de portretten met onze eigen kleurmotor (`scripts/measure-people.mjs`), zodat elk gezicht de juiste doeken krijgt, en zet alles op de site.
