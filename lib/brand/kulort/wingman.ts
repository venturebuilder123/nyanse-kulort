import { analysisNl, emailNl, pageNl, resultNl, SELFIE_NL } from "../common";
import type { VoiceCopy } from "../types";

// Wingman: confidence and first impressions. Always about him, never about women as a target.
export const wingman: VoiceCopy = {
  locale: "nl",
  meta: {
    title: "KULØRT · Welke kleuren staan jou? Kleuranalyse uit één selfie",
    description: "Ontdek met één selfie welke kleuren jou staan, en welke je kunt laten hangen.",
  },
  landing: {
    pill: "Gratis kleurprofiel",
    eyebrow: "Kleuranalyse uit één selfie",
    headline: ["Welke kleuren staan", "jou echt?"],
    sub: "Je ziet direct welke kleuren je scherp laten ogen, en welke je kunt laten hangen.",
    trustMain: "Je foto verlaat je telefoon niet",
    occasionQuestion: "Waar wil je scherp voor de dag komen?",
    trustSmall: ["Geen account nodig", "Kleurprofiel gratis"],
    free: { title: "Gratis", text: "Je precieze kleurtype (bijv. Bright Winter), 6 kleuren die werken en wat je beter laat hangen." },
    paid: { title: "In je gids, vanaf €6,99", text: "Al je 30 kleuren met namen, combinaties die werken en welke kleur horloge, riem en schoenen bij je past." },
    hero: { caption: "Zelfde gezicht. Andere kleur.", bad: "valt weg", good: "jouw kleur" },
  },
  page: pageNl({ galleryTitle: ["Zelfde gezicht.", "Andere kleur."], howTitle: ["Drie stappen.", "Klaar."], compareTitle: ["Gratis of", "de gids?"], finalTitle: ["Weet welke kleuren", "voor je werken."], accessories: "welk horloge, welke riem en schoenen kloppen", trustTitle: ["Geen gedoe.", "Geen gok."] }),
  guide: {
    tagline: "Je eerste indruk, geregeld.",
    summary: "Alles wat je moet weten, op één pagina. Screenshot hem.",
    effect: "Dit is waarom het werkt. Zelfde gezicht, zelfde licht. Alleen de kleur onder de kin verschilt.",
    combos: "Vier looks die altijd kloppen. Geen gedoe, geen gok.",
    swaps: "Niet dit, maar dit. Zo vervang je wat je niet staat.",
    closing: ["Trek aan wat", "voor je werkt."],
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Gratis",
    skip: "Sla over",
    headline: ["Waar shop", "jij?"],
    occasionQuestion: "",
    budgetQuestion: "Wat geef je meestal uit per item?",
    shopsQuestion: "Waar shop je graag?",
    shopsHint: "Optioneel. Zo zoeken we straks op de goede plekken.",
    next: "Volgende: selfie",
  },
  selfie: SELFIE_NL,
  analysis: analysisNl("Horloge of ring: goud of zilver?"),
  email: emailNl(["Je kleuren zijn", "klaar."]),
  result: resultNl(
    "6 kleuren die voor je werken",
    ["Alle 30 kleuren met namen: basis, accent en neutraal", "Combinaties die werken voor werk, weekend en date", "Horloge, riem, schoenen en bril: welk metaal en leer", "Stijlgids als PDF op jouw naam + digitale pas"],
    { kind: "impression", title: "Waarom het telt", label: "Eerste indruk", big: "0,1 sec", text: "Zo snel vormt iemand een eerste indruk van een gezicht.", source: "Willis & Todorov, Psychological Science, 2006" },
  ),
  ring: ["#1B2A5C", "#8A4A26", "#5E6A7A", "#2F4F3A", "#B9926B", "#6E1F2A", "#4F6886", "#C99A1E", "#3A3D45", "#EADCC2"],
};
