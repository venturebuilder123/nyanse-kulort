import { analysisNl, emailNl, resultNl, SELFIE_NL } from "../common";
import type { VoiceCopy } from "../types";

// Atelier: calm and certain. "Minder kopen, beter kiezen."
export const atelier: VoiceCopy = {
  locale: "nl",
  meta: {
    title: "NYANSE · Welke kleuren staan jou? Kleuranalyse uit één selfie",
    description: "Je persoonlijke kleurprofiel uit één selfie, dat met je meegaat naar elke winkel.",
  },
  landing: {
    pill: "Gratis kleurprofiel",
    eyebrow: "Kleuranalyse uit één selfie",
    headline: ["Welke kleuren laten", "jou stralen?"],
    sub: "Minder kopen, beter kiezen. Je ziet direct welke kleuren bij je passen, en welke niet.",
    trustMain: "Je foto verlaat je telefoon niet",
    occasionQuestion: "Waar wil je er goed uitzien?",
    trustSmall: ["Geen account nodig", "Kleurprofiel gratis"],
    free: { title: "Gratis", text: "Je kleurtype, 6 kleuren die je laten stralen en wat je beter vermijdt." },
    paid: { title: "In je gids, vanaf €6,99", text: "Al je 30 kleuren, outfits bij jouw winkels, sieraden, tas en make-up." },
    hero: { caption: "Zelfde gezicht. Andere kleur.", bad: "valt weg", good: "jouw kleur" },
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Gratis",
    headline: ["Jouw stijl,", "jouw budget."],
    occasionQuestion: "",
    budgetQuestion: "Wat geef je meestal uit per item?",
    shopsQuestion: "Waar shop je graag?",
    shopsHint: "Optioneel. Zo zoeken we straks op de goede plekken.",
    next: "Volgende: selfie",
  },
  selfie: SELFIE_NL,
  analysis: analysisNl("Sieraden: goud of zilver?"),
  email: emailNl(["Je kleuren zijn", "klaar."]),
  result: resultNl(
    "6 kleuren die je laten stralen",
    ["Je precieze type (één van 12)", "Alle 30 kleuren met namen", "Outfits bij jouw winkels", "Sieraden, tas en make-up"],
    { kind: "compare", title: "Eén keer goed kiezen", them: ["Kleuradviseur", "een afspraak van 1 à 2 uur"], us: ["NYANSE", "één selfie, je kleuren altijd bij je"] },
  ),
  ring: ["#C8285A", "#C9A9AC", "#8FA3B8", "#A6879C", "#B9926B", "#2F4F3A", "#A2462A", "#1F4FC4", "#F4E3A1", "#D9C7AE"],
};
