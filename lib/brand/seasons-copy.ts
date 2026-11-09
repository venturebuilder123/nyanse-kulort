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
  const princess = { nl: "prinses van Wales", en: "Princess of Wales", de: "Prinzessin von Wales", es: "princesa de Gales" }[locale];
  return { family, names: names.map((n) => n.replace("prinses van Wales", princess)) };
}

/** The season story in the visitor's language. */
export const seasonStory = (season: SeasonKey, locale: Locale) => ({ nl: SEASON_STORY, en: SEASON_STORY_EN, de: SEASON_STORY_DE, es: SEASON_STORY_ES })[locale][season];

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

// German and Spanish (9 Nov 2026), same content as the Dutch above.
export const SEASON_STORY_DE: Record<SeasonKey, { line: string; text: string }> = {
  lightSpring: { line: "Hell wie ein Frühlingsmorgen.", text: "Haut, Haar und Augen liegen nah beieinander und haben einen warmen, goldenen Unterton. Helle, klare Farben mit etwas Wärme lassen dich strahlen: Pfirsich, Hellgold, Mint. Schwere, dunkle Farben übernehmen schnell." },
  warmSpring: { line: "Warm, sonnig, voller Leben.", text: "Du hast einen deutlich warmen Unterton und eine frische Ausstrahlung. Goldtöne, Koralle, warmes Grün und Türkis passen zu deinem natürlichen Glow. Kühle Grautöne und eisige Pastelle machen dich flacher." },
  brightSpring: { line: "Klar, warm und unvergesslich.", text: "Du verbindest Wärme mit Kontrast und Klarheit. Du kannst leuchtende, reine Farben tragen, ohne dass sie dich übertönen: Mohnrot, Jadegrün, leuchtendes Blau. Staubige, gedämpfte Töne werden dir nicht gerecht." },
  lightSummer: { line: "Hell, kühl und mühelos.", text: "Deine Farben sind hell und kühl, mit wenig Kontrast. Sanfte Pastelle mit blauem Unterton geben dir eine frische, ruhige Ausstrahlung: Puderrosa, Lavendel, Meeresblau. Schwarz und knallige warme Farben sind zu hart." },
  coolSummer: { line: "Kühl, ruhig und raffiniert.", text: "Dein Unterton ist deutlich kühl und deine Farben sind mittelhell. Mitteltöne mit blauer Basis lassen dich frischer aussehen als alles andere: Denim, kühles Rosa, Graublau, Himbeere. Orange und Goldgelb lenken vom Gesicht ab." },
  softSummer: { line: "Sanft, kühl und elegant.", text: "Deine Farben sind gedämpft und kühl, mit wenig Kontrast. Staubige, vergraute Töne lassen dein Gesicht sprechen: Salbei, Schiefer, Mauve, sanfte Pflaume. Knallige, reine Farben sind zu laut neben dir." },
  softAutumn: { line: "Warm und sanft, wie ein Herbstnachmittag.", text: "Du hast einen warmen Unterton mit gedämpften Farben. Erdige, sanfte Töne wirken wie eine Verlängerung deiner Haut: Camel, Oliv, sanftes Petrol, warmer Lachs. Kalte, knallige Farben wirken losgelöst von dir." },
  warmAutumn: { line: "Satt, warm und würzig.", text: "Dein Unterton ist ausgeprägt warm und deine Farben sind satt. Würzige Töne wie Ocker, Oliv, Rost und Petrol passen zu deinem Glow. Eisige und kühl-rosa Farben machen dich blass." },
  deepAutumn: { line: "Tief, warm und kraftvoll.", text: "Du verbindest Tiefe mit Wärme. Dunkle, erdige Farben geben deinem Gesicht Kraft: Bordeaux, Waldgrün, Schokolade, Petrol. Helle Pastelle und eisige Töne verblassen neben dir." },
  deepWinter: { line: "Tief, kühl und eindrucksvoll.", text: "Du hast Tiefe und Kontrast auf kühler Basis. Dunkle Juwelentöne passen zu deiner starken Ausstrahlung: Tintenblau, Smaragd, Rubin, Aubergine. Warme Erdtöne und sanfte Pastelle lassen dich verschwinden." },
  coolWinter: { line: "Kühl, klar und scharf.", text: "Dein Unterton ist deutlich kühl und du verträgst viel Kontrast. Juwelentöne und klare kühle Farben stehen dir: Royal-Navy, Smaragd, Weinrot, kühles Violett. Warmes Orange und Gold sind zu weich neben dir." },
  brightWinter: { line: "Klar, kühl und voller Kontrast.", text: "Du verbindest Kühle mit viel Kontrast und Klarheit. Leuchtende, reine Farben und Schwarz-Weiß stehen dir auffallend gut: Karmin, Kobalt, leuchtendes Smaragd. Gedämpfte, staubige Töne lassen dich fahl wirken." },
};

export const SEASON_STORY_ES: Record<SeasonKey, { line: string; text: string }> = {
  lightSpring: { line: "Luminosa como una mañana de primavera.", text: "Tu piel, tu pelo y tus ojos están muy próximos y tienen un subtono cálido y dorado. Los colores claros y limpios con algo de calidez te hacen brillar: melocotón, dorado claro, menta. Los colores pesados y oscuros te eclipsan enseguida." },
  warmSpring: { line: "Cálida, soleada, llena de vida.", text: "Tienes un subtono claramente cálido y un aire fresco. Los dorados, el coral, el verde cálido y el turquesa van con tu brillo natural. Los grises fríos y los pasteles helados te apagan." },
  brightSpring: { line: "Nítida, cálida e inolvidable.", text: "Combinas calidez con contraste y claridad. Puedes llevar colores vivos y puros sin que te eclipsen: rojo amapola, verde jade, azul vivo. Los tonos empolvados y apagados no te hacen justicia." },
  lightSummer: { line: "Clara, fresca y natural.", text: "Tus colores son claros y fríos, con poco contraste. Los pasteles suaves con subtono azul te dan un aire fresco y tranquilo: rosa empolvado, lavanda, azul mar. El negro y los colores cálidos intensos son demasiado duros." },
  coolSummer: { line: "Fresca, serena y refinada.", text: "Tu subtono es claramente frío y tus colores tienen una claridad media. Los tonos medios con base azul te sientan mejor que nada: denim, rosa frío, gris azulado, frambuesa. El naranja y el amarillo dorado apartan la atención de tu cara." },
  softSummer: { line: "Suave, fresca y elegante.", text: "Tus colores son apagados y fríos, con poco contraste. Los tonos empolvados y agrisados dejan hablar a tu cara: salvia, pizarra, malva, ciruela suave. Los colores vivos y puros son demasiado ruidosos a tu lado." },
  softAutumn: { line: "Cálida y suave, como una tarde de otoño.", text: "Tienes un subtono cálido con colores apagados. Los tonos terrosos y suaves son como una prolongación de tu piel: camel, oliva, petróleo suave, salmón cálido. Los colores fríos e intensos no van contigo." },
  warmAutumn: { line: "Rica, cálida y especiada.", text: "Tu subtono es marcadamente cálido y tus colores son ricos. Los tonos especiados como ocre, oliva, óxido y petróleo van con tu brillo. Los colores helados y el rosa frío te restan color." },
  deepAutumn: { line: "Profunda, cálida y potente.", text: "Combinas profundidad y calidez. Los colores oscuros y terrosos dan fuerza a tu cara: burdeos, verde bosque, chocolate, petróleo. Los pasteles claros y los tonos helados se apagan a tu lado." },
  deepWinter: { line: "Profunda, fría e impactante.", text: "Tienes profundidad y contraste sobre una base fría. Los tonos joya oscuros van con tu fuerte presencia: azul tinta, esmeralda, rubí, berenjena. Los tonos tierra cálidos y los pasteles suaves te hacen desaparecer." },
  coolWinter: { line: "Fría, nítida y marcada.", text: "Tu subtono es claramente frío y puedes llevar mucho contraste. Los tonos joya y los colores fríos y nítidos te favorecen: azul marino real, esmeralda, rojo vino, morado frío. El naranja cálido y el dorado son demasiado suaves a tu lado." },
  brightWinter: { line: "Nítida, fría y llena de contraste.", text: "Combinas frialdad con mucho contraste y claridad. Los colores vivos y puros y el blanco y negro te sientan llamativamente bien: carmín, cobalto, esmeralda vivo. Los tonos apagados y empolvados te restan luz." },
};
