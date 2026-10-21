// What the result says about each season: a catchy line and a fuller explanation.
// Written for the result page's reveal; Dutch, no promises, no body judgements.

import type { SeasonKey } from "@/lib/color/seasons";
import type { BrandKey } from "@/lib/brand/types";
import { familyOf } from "@/lib/color/describe";
import type { Locale } from "@/lib/i18n/locale";

export const SEASON_STORY: Record<SeasonKey, { line: string; text: string }> = {
  lightSpring: {
    line: "Licht als een voorjaarsochtend.",
    text: "Je huid, haar en ogen liggen dicht bij elkaar en hebben een warme, gouden ondertoon. Lichte, heldere kleuren met wat warmte laten je stralen: perzik, lichtgoud, munt. Zware, donkere kleuren nemen het snel van je over.",
  },
  warmSpring: {
    line: "Warm, zonnig, vol leven.",
    text: "Je hebt een duidelijk warme ondertoon en een frisse uitstraling. Goudtinten, koraal, warm groen en turkoois sluiten aan bij je natuurlijke gloed. Koele grijzen en ijzige pastels maken je vlakker.",
  },
  brightSpring: {
    line: "Helder, warm en onvergetelijk.",
    text: "Je combineert warmte met contrast en helderheid. Je kunt felle, schone kleuren dragen zonder dat ze je overstemmen: klaproos, jadegroen, helder blauw. Stoffige, gedempte tinten doen je tekort.",
  },
  lightSummer: {
    line: "Licht, koel en moeiteloos.",
    text: "Je kleuren zijn licht en koel, met weinig contrast. Zachte pasteltinten met een blauwe ondertoon geven je een frisse, rustige uitstraling: poederroze, lavendel, zeeblauw. Zwart en felle warme kleuren zijn te hard.",
  },
  coolSummer: {
    line: "Koel, rustig en verfijnd.",
    text: "Je ondertoon is duidelijk koel en je kleuren zijn middelhelder. Middentinten met een blauwe basis staan je frisser dan wat ook: denim, koel roze, grijsblauw, framboos. Oranje en goudgeel trekken de aandacht weg van je gezicht.",
  },
  softSummer: {
    line: "Zacht, koel en elegant.",
    text: "Je kleuren zijn gedempt en koel, met weinig contrast. Stoffige, grijzige tinten laten je gezicht spreken: salie, leisteen, mauve, zachte pruim. Felle en zuivere kleuren zijn te luid naast je.",
  },
  softAutumn: {
    line: "Warm, zacht, als een herfstmiddag.",
    text: "Je hebt een warme ondertoon met gedempte kleuren. Aardse, zachte tinten voelen als een verlengstuk van je huid: camel, olijf, zachte petrol, warme zalm. Koude, felle kleuren staan los van je.",
  },
  warmAutumn: {
    line: "Rijk, warm en kruidig.",
    text: "Je ondertoon is uitgesproken warm en je kleuren zijn rijk. Kruidige tinten als oker, olijf, roest en petrol passen bij je gloed. IJzige en koel-roze kleuren maken je bleek.",
  },
  deepAutumn: {
    line: "Diep, warm en krachtig.",
    text: "Je combineert diepte met warmte. Donkere, aardse kleuren geven je gezicht kracht: bordeaux, bosgroen, chocolade, petrol. Lichte pastels en ijzige tinten vallen weg naast je.",
  },
  deepWinter: {
    line: "Diep, koel en indrukwekkend.",
    text: "Je hebt diepte en contrast met een koele basis. Donkere juweeltinten passen bij je sterke uitstraling: inktblauw, smaragd, robijn, aubergine. Warme aardetinten en zachte pastels doen je verdwijnen.",
  },
  coolWinter: {
    line: "Koel, helder en scherp.",
    text: "Je ondertoon is duidelijk koel en je kunt veel contrast hebben. Juweeltinten en heldere koele kleuren staan je goed: royal navy, smaragd, wijnrood, koel paars. Warm oranje en goud zijn te zacht naast je.",
  },
  brightWinter: {
    line: "Helder, koel en vol contrast.",
    text: "Je combineert koelte met veel contrast en helderheid. Felle, zuivere kleuren en zwart-wit staan je opvallend goed: karmijn, kobalt, helder smaragd. Gedempte, stoffige tinten maken je vaal.",
  },
};

/**
 * "Vaak genoemd als …" (CLAUDE.md §2): names only, no photos, never as endorsement.
 * Per family (Lente, Zomer, Herfst, Winter), not per subtype: at subtype level the published
 * lists contradict each other (Julia Roberts is "Deep" in one source and "Soft Autumn" in the next),
 * at family level they mostly agree. Women: named for that family in at least two independent
 * colour-analysis sources. Men: fewer sources exist; names from men's colour guides, family only.
 * Sources and the date checked: docs/BESLISSINGEN.md (15 Oct 2026).
 */
const NAMED_BY_FAMILY: Record<BrandKey, Record<string, string[]>> = {
  nyanse: {
    Lente: ["Taylor Swift", "Amy Adams", "Cameron Diaz"],
    Zomer: ["Jennifer Aniston", "Cate Blanchett", "Catherine, prinses van Wales"],
    Herfst: ["Julia Roberts", "Jessica Chastain"],
    Winter: ["Anne Hathaway", "Liv Tyler", "Courteney Cox"],
  },
  kulort: {
    Lente: ["Chris Hemsworth", "Eddie Redmayne"],
    Zomer: ["Daniel Craig", "Alexander Skarsgård", "Mark Ruffalo"],
    Herfst: ["Ryan Reynolds", "Jude Law", "Kit Harington"],
    Winter: ["Idris Elba", "Henry Cavill"],
  },
};

export function oftenNamed(season: SeasonKey, brand: BrandKey, locale: Locale = "nl"): { family: string; names: string[] } {
  const family = familyOf(season);
  const names = NAMED_BY_FAMILY[brand][family] ?? [];
  return { family, names: locale === "en" ? names.map((n) => n.replace("prinses van Wales", "Princess of Wales")) : names };
}

/** The season story in the visitor's language. */
export const seasonStory = (season: SeasonKey, locale: Locale) => (locale === "en" ? SEASON_STORY_EN : SEASON_STORY)[season];

// English (21 Oct 2026), same content as the Dutch above.
export const SEASON_STORY_EN: Record<SeasonKey, { line: string; text: string }> = {
  lightSpring: {
    line: "Light as a spring morning.",
    text: "Your skin, hair and eyes are close together and have a warm, golden undertone. Light, clear colours with some warmth make you glow: peach, light gold, mint. Heavy, dark colours quickly take over.",
  },
  warmSpring: {
    line: "Warm, sunny, full of life.",
    text: "You have a clearly warm undertone and a fresh look. Gold tones, coral, warm green and turquoise match your natural glow. Cool greys and icy pastels make you look flatter.",
  },
  brightSpring: {
    line: "Clear, warm and unforgettable.",
    text: "You combine warmth with contrast and clarity. You can wear bright, clean colours without them overpowering you: poppy, jade green, bright blue. Dusty, muted shades don't do you justice.",
  },
  lightSummer: {
    line: "Light, cool and effortless.",
    text: "Your colours are light and cool, with little contrast. Soft pastels with a blue undertone give you a fresh, calm look: powder pink, lavender, sea blue. Black and bright warm colours are too harsh.",
  },
  coolSummer: {
    line: "Cool, calm and refined.",
    text: "Your undertone is clearly cool and your colours are medium-bright. Mid-tones with a blue base look fresher on you than anything else: denim, cool pink, grey-blue, raspberry. Orange and golden yellow pull attention away from your face.",
  },
  softSummer: {
    line: "Soft, cool and elegant.",
    text: "Your colours are muted and cool, with little contrast. Dusty, greyed shades let your face speak: sage, slate, mauve, soft plum. Bright, pure colours are too loud next to you.",
  },
  softAutumn: {
    line: "Warm and soft, like an autumn afternoon.",
    text: "You have a warm undertone with muted colours. Earthy, soft shades feel like an extension of your skin: camel, olive, soft teal, warm salmon. Cold, bright colours feel disconnected from you.",
  },
  warmAutumn: {
    line: "Rich, warm and spicy.",
    text: "Your undertone is distinctly warm and your colours are rich. Spicy shades like ochre, olive, rust and teal match your glow. Icy and cool pink colours make you look pale.",
  },
  deepAutumn: {
    line: "Deep, warm and powerful.",
    text: "You combine depth with warmth. Dark, earthy colours give your face strength: burgundy, forest green, chocolate, teal. Light pastels and icy shades fade away next to you.",
  },
  deepWinter: {
    line: "Deep, cool and striking.",
    text: "You have depth and contrast on a cool base. Dark jewel tones suit your strong presence: ink blue, emerald, ruby, aubergine. Warm earth tones and soft pastels make you disappear.",
  },
  coolWinter: {
    line: "Cool, clear and sharp.",
    text: "Your undertone is clearly cool and you can carry a lot of contrast. Jewel tones and clear cool colours suit you: royal navy, emerald, wine red, cool purple. Warm orange and gold are too soft next to you.",
  },
  brightWinter: {
    line: "Clear, cool and full of contrast.",
    text: "You combine coolness with lots of contrast and clarity. Bright, pure colours and black and white look striking on you: carmine, cobalt, bright emerald. Muted, dusty shades make you look dull.",
  },
};
