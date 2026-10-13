import { ANALYSIS_NL, emailNl, resultNl, SELFIE_NL } from "../common";
import type { VoiceCopy } from "../types";

// Girl Math: playful sums with a wink, never literal money promises.
export const girlmath: VoiceCopy = {
  locale: "nl",
  meta: {
    title: "NYANSE · Jouw kleuren, uit één selfie",
    description: "Stop met kopen wat je niet staat. Je kleuren uit één selfie.",
  },
  landing: {
    pill: "Gratis · 30 sec",
    headline: ["Stop met kopen wat je", "niet staat."],
    sub: "Eén selfie = je weet welke kleuren je staan. Dus ook welke je níet hoeft te kopen.",
    checksTitle: "Wat je krijgt",
    checks: ["Je kleurprofiel en de kleuren die bij je passen", "Outfits binnen je budget", "Minder miskopen, meer outfits die werken"],
    occasionQuestion: "Waar wil je er goed uitzien?",
    trust: ["Foto blijft op je telefoon", "Geen account nodig", "Profiel gratis"],
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Nog ±25 sec",
    headline: ["Wat is je", "vibe?"],
    occasionQuestion: "Nog meer momenten?",
    budgetQuestion: "Wat geef je meestal uit per item?",
    shopsQuestion: "Waar shop je graag?",
    shopsHint: "Kies er een paar, of sla over.",
    next: "Volgende: selfie",
  },
  selfie: SELFIE_NL,
  analysis: ANALYSIS_NL,
  email: emailNl(["Oké, je profiel is", "klaar."]),
  result: resultNl("6 kleuren die je laten stralen", { kind: "receipt", title: "Waarom dit eigenlijk een steal is", head: "Girl math", lines: [["Stijlgids", "€6,99"], ["÷ 365 dagen", "€0,02 per dag"], ["Eén miskoop minder", "✓"]], total: ["Dus eigenlijk", "basically gratis ✨"] }),
  ring: ["#D61F5B", "#FFE9A6", "#F4A3A0", "#8FA3B8", "#F3A27A", "#A6879C", "#2BB3A8", "#FFE6EE", "#B9926B", "#6E5468"],
};
