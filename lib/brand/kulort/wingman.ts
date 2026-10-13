import { analysisNl, emailNl, resultNl, SELFIE_NL } from "../common";
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
    free: { title: "Gratis", text: "Je kleurtype, 6 kleuren die werken en wat je beter laat hangen." },
    paid: { title: "In je gids, vanaf €6,99", text: "Al je 30 kleuren, outfits en het horloge, de riem en schoenen die kloppen." },
    hero: { caption: "Zelfde gezicht. Andere kleur.", bad: "valt weg", good: "jouw kleur" },
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Gratis",
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
    ["Je precieze type (één van 12)", "Alle 30 kleuren met namen", "Outfits voor werk, weekend en date", "Horloge, riem en schoenen"],
    { kind: "impression", title: "Waarom het telt", label: "Eerste indruk", big: "0,1 sec", text: "Zo snel vormt iemand een eerste indruk van een gezicht.", source: "Willis & Todorov, Psychological Science, 2006" },
  ),
  ring: ["#1B2A5C", "#8A4A26", "#5E6A7A", "#2F4F3A", "#B9926B", "#6E1F2A", "#4F6886", "#C99A1E", "#3A3D45", "#EADCC2"],
};
