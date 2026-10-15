// What the result says about each season: a catchy line and a fuller explanation.
// Written for the result page's reveal; Dutch, no promises, no body judgements.

import type { SeasonKey } from "@/lib/color/seasons";
import type { BrandKey } from "@/lib/brand/types";
import { familyOf } from "@/lib/color/describe";

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

export function oftenNamed(season: SeasonKey, brand: BrandKey): { family: string; names: string[] } {
  const family = familyOf(season);
  return { family, names: NAMED_BY_FAMILY[brand][family] ?? [] };
}
