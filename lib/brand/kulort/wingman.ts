import type { VoiceCopy } from "../types";

// Wingman: confidence and first impressions. Always about him, never about women as a target.
export const wingman: VoiceCopy = {
  locale: "nl",
  meta: {
    title: "KULØRT · Jouw kleuren, uit één selfie",
    description: "Ontdek welke kleuren jou staan en shop outfits in jouw kleuren bij je favoriete winkels.",
  },
  landing: {
    pill: "Gratis · 30 sec",
    headline: ["Maak indruk", "voor je iets zegt."],
    sub: "Eén selfie. Daarna weet je welke kleuren jou scherp laten ogen, en welke je kunt laten hangen.",
    checksTitle: "Dit krijg je",
    checks: ["Je kleurprofiel en de kleuren die bij je passen", "Outfits voor werk, weekend en date", "Horloge, riem en schoenen die kloppen"],
    occasionQuestion: "Waar wil je er goed uitzien?",
    trust: ["Foto blijft op je telefoon", "Geen account nodig", "Profiel gratis"],
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Nog ±25 sec",
    headline: ["Waar shop", "jij?"],
    occasionQuestion: "Nog meer momenten?",
    budgetQuestion: "Wat geef je meestal uit per item?",
    shopsQuestion: "Waar shop je graag?",
    shopsHint: "Kies er een paar, of sla over.",
    next: "Volgende: selfie",
  },
  ring: ["#1B2A5C", "#8A4A26", "#5E6A7A", "#2F4F3A", "#B9926B", "#6E1F2A", "#4F6886", "#C99A1E", "#3A3D45", "#EADCC2"],
};
