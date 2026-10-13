import { analysisNl, emailNl, resultNl, SELFIE_NL } from "../common";
import type { VoiceCopy } from "../types";

// Girl Math: playful sums with a wink, never literal money promises.
export const girlmath: VoiceCopy = {
  locale: "nl",
  meta: {
    title: "NYANSE · Welke kleuren staan jou? Kleuranalyse uit één selfie",
    description: "Stop met kopen wat je niet staat. Je kleuren uit één selfie.",
  },
  landing: {
    pill: "Gratis kleurprofiel",
    eyebrow: "Kleuranalyse uit één selfie",
    headline: ["Stop met kopen wat je", "niet staat."],
    sub: "Eén selfie = je weet welke kleuren je staan. Dus ook welke je níet hoeft te kopen.",
    trustMain: "Je foto verlaat je telefoon niet",
    occasionQuestion: "Waar wil je er goed uitzien?",
    trustSmall: ["Geen account nodig", "Kleurprofiel gratis"],
    free: { title: "Gratis", text: "Je kleurtype, 6 kleuren die je staan en wat je kunt laten liggen." },
    paid: { title: "In je gids, vanaf €6,99", text: "Al je 30 kleuren, outfits binnen je budget, sieraden en make-up." },
    hero: { caption: "Zelfde gezicht. Andere kleur.", bad: "valt weg", good: "jouw kleur" },
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Gratis",
    headline: ["Wat is je", "budget?"],
    occasionQuestion: "",
    budgetQuestion: "Wat geef je meestal uit per item?",
    shopsQuestion: "Waar shop je graag?",
    shopsHint: "Optioneel. Zo zoeken we straks op de goede plekken.",
    next: "Volgende: selfie",
  },
  selfie: SELFIE_NL,
  analysis: analysisNl("Sieraden: goud of zilver?"),
  email: emailNl(["Oké, je kleuren zijn", "klaar."]),
  result: resultNl(
    "6 kleuren die je laten stralen",
    ["Je precieze type (één van 12)", "Alle 30 kleuren met namen", "Outfits binnen je budget", "Sieraden en make-up"],
    { kind: "receipt", title: "Waarom dit eigenlijk een steal is", head: "Girl math", lines: [["Stijlgids", "€6,99"], ["÷ 365 dagen", "€0,02 per dag"], ["Minder gokken bij het kopen", "✓"]], total: ["Girl math zegt", "worth it ✨"] },
  ),
  ring: ["#D61F5B", "#FFE9A6", "#F4A3A0", "#8FA3B8", "#F3A27A", "#A6879C", "#2BB3A8", "#FFE6EE", "#B9926B", "#6E5468"],
};
