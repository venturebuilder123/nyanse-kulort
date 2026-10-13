import { analysisNl, emailNl, pageNl, resultNl, SELFIE_NL_NYANSE } from "../common";
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
    free: { title: "Gratis", text: "Je precieze kleurtype (bijv. Bright Spring), 6 kleuren die je staan en wat je kunt laten liggen." },
    paid: { title: "In je gids, vanaf €6,99", text: "Al je 30 kleuren met namen, combinaties die werken en welke sieraden en make-uptinten je staan." },
    hero: { caption: "Zelfde gezicht. Andere kleur.", bad: "valt weg", good: "jouw kleur" },
  },
  page: pageNl({ galleryTitle: ["Zelfde gezicht.", "Andere kleur."], howTitle: ["Zo simpel", "is het."], compareTitle: ["Gratis of", "de gids?"], finalTitle: ["Stop met kopen wat je", "niet staat."], accessories: "welke sieraden en make-uptinten je staan", trustTitle: ["Geen gedoe,", "geen catch."] }),
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Gratis",
    skip: "Sla over",
    headline: ["Wat is je", "budget?"],
    occasionQuestion: "",
    budgetQuestion: "Wat geef je meestal uit per item?",
    shopsQuestion: "Waar shop je graag?",
    shopsHint: "Optioneel. Zo zoeken we straks op de goede plekken.",
    next: "Volgende: selfie",
  },
  selfie: SELFIE_NL_NYANSE,
  analysis: analysisNl("Sieraden: goud of zilver?"),
  email: emailNl(["Oké, je kleuren zijn", "klaar."]),
  result: resultNl(
    "6 kleuren die je laten stralen",
    ["Alle 30 kleuren met namen: basis, accent en neutraal", "Combinaties die werken, dus minder miskopen", "Sieraden en make-uptinten", "Stijlgids als PDF op jouw naam + digitale pas"],
    { kind: "receipt", title: "Waarom dit eigenlijk een steal is", head: "Girl math", lines: [["Stijlgids", "€6,99"], ["÷ 365 dagen", "€0,02 per dag"], ["Minder gokken bij het kopen", "✓"]], total: ["Girl math zegt", "worth it ✨"] },
  ),
  ring: ["#D61F5B", "#FFE9A6", "#F4A3A0", "#8FA3B8", "#F3A27A", "#A6879C", "#2BB3A8", "#FFE6EE", "#B9926B", "#6E5468"],
};
