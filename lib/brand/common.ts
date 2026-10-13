import type { AnalysisCopy, EmailCopy, ResultCopy, SelfieCopy } from "./types";

// Shared Dutch copy for steps that sound the same in every voice.
export const SELFIE_NL: SelfieCopy = {
  pill: "Nog ±15 sec",
  tips: { face: "Gezicht in het ovaal", light: "Genoeg licht", even: "Licht gelijkmatig" },
  hint: "Daglicht, geen filter, bril af",
  jewelQuestion: "Wat staat je beter?",
  jewel: { goud: "Goud", zilver: "Zilver", weetniet: "Weet ik niet" },
  age: "Ik ben 16 jaar of ouder",
  ageNeeded: "Bevestig eerst dat je 16 jaar of ouder bent.",
  start: "Start AI-kleuranalyse",
  busy: "Even kijken…",
  loading: "Camera starten…",
  trust: "Je foto verlaat je telefoon niet",
  takePhoto: "Maak een selfie",
  pickPhoto: "of kies een foto",
  noCamera: "Maak een selfie met de camera van je telefoon.",
  retryTitle: "Nog één selfie?",
  retryGeneric: "Ga bij een raam staan, met je gezicht naar het licht.",
  noFace: "We zien je gezicht niet goed. Kijk recht in de camera.",
  failed: "Dat lukte niet. Probeer het nog een keer.",
};

export const ANALYSIS_NL: AnalysisCopy = {
  pill: "Bijna klaar",
  label: "Kleurdoeken passen",
  scales: { undertone: "Ondertoon", depth: "Diepte", clarity: "Helderheid" },
  good: "laat je gezicht rustig en helder ogen",
  bad: "trekt de aandacht weg van je gezicht",
  questionsTitle: "Twee snelle vragen. Dan wordt je profiel nog preciezer.",
  hairQ: "Is dit je natuurlijke haarkleur?",
  hair: { natural: "Ja, naturel", dyed: "Nee, geverfd", grey: "Grijs of wit", none: "Kaal of heel kort" },
  sunQ: "Wat doet je huid in de zon?",
  sun: { verbrandt: "Verbrandt snel", "rood-bruin": "Eerst rood, dan bruin", bruin: "Wordt snel bruin", weetniet: "Weet ik niet" },
  thanks: "Top, verwerkt.",
  cta: "Bekijk mijn kleuren",
  skip: "Sla over",
};

const EMAIL_BASE = {
  pill: "Profiel klaar",
  teaser: "+ 6 kleuren die bij je passen",
  lead: "Waar sturen we je kleurprofiel naartoe?",
  placeholder: "jij@voorbeeld.nl",
  optin: "Elke maand een outfit en sale-tips in mijn kleuren",
  submit: "Stuur en laat zien",
  skip: "Nu niet",
  invalid: "Vul een geldig e-mailadres in, bijvoorbeeld jij@voorbeeld.nl.",
};

export const emailNl = (headline: EmailCopy["headline"]): EmailCopy => ({ ...EMAIL_BASE, headline });

const RESULT_BASE: Omit<ResultCopy, "why" | "colorsTitle"> = {
  pill: "Gratis profiel",
  label: "Jouw kleurtype",
  between: "tussen {a} en {b}",
  scalesTitle: "Zo is je kleur opgebouwd",
  avoidTitle: "Liever niet",
  avoidText: "Deze kleuren werken tegen je in. Bij je gezicht kun je ze beter laten hangen.",
  baTitle: "Zie het verschil",
  baHint: "Schuif tussen de twee kleuren",
  lowConfidence: "Voorlopig profiel: je foto was lastig te lezen. Met een selfie bij daglicht wordt het preciezer.",
  lowConfidenceCta: "Nog een selfie",
  lockedTitle: "Wat je ontgrendelt",
  lockedSubtype: "Jouw precieze type",
  tiersTitle: "Kies je gids",
  tiers: {
    digital: {
      name: "Digitaal",
      features: ["Je precieze type en alle 30 kleuren", "Stijlgids als PDF, op jouw naam", "Outfits en accessoires bij jouw winkels", "Digitale kleurenpas op je telefoon"],
    },
    card: {
      name: "Met kleurenpas",
      badge: "Aanrader",
      features: ["Alles van Digitaal", "Een stevige kleurenpas in je brievenbus", "Voor in je portemonnee, ook in de winkel"],
    },
  },
  cta: "Ontgrendel",
  fine: "Prijzen inclusief btw. Je gids wordt direct geleverd.",
};

export const resultNl = (colorsTitle: string, why: ResultCopy["why"]): ResultCopy => ({ ...RESULT_BASE, colorsTitle, why });

/** Short, positive descriptions per season (no claims about how anyone looks in other colours). */
export const SEASON_TEXT_NL = {
  lightSpring: "Licht, warm en fris. Zachte, heldere kleuren met een gouden gloed laten je stralen.",
  warmSpring: "Warm en zonnig. Goudtinten, warme groenen en koraal passen bij je natuurlijke gloed.",
  brightSpring: "Helder en warm. Je kunt felle, schone kleuren hebben zonder dat ze je overstemmen.",
  lightSummer: "Licht, koel en luchtig. Zachte tinten met een blauwe ondertoon staan je het best.",
  coolSummer: "Koel en rustig. Middentinten met een blauwe ondertoon geven je een frisse uitstraling.",
  softSummer: "Zacht, koel en gedempt. Stoffige, grijzige tinten laten je gezicht spreken.",
  softAutumn: "Warm en gedempt. Aardse, zachte kleuren voelen als een verlengstuk van je huid.",
  warmAutumn: "Warm en rijk. Kruidige tinten als oker, olijf en roest passen bij je warme ondertoon.",
  deepAutumn: "Diep, warm en rijk. Donkere, aardse kleuren geven je gezicht kracht.",
  deepWinter: "Diep en helder. Donkere, koele kleuren met contrast passen bij je sterke uitstraling.",
  coolWinter: "Koel en helder. Sterk contrast en juweeltinten staan je goed.",
  brightWinter: "Helder en koel. Felle, zuivere kleuren en zwart-wit staan je opvallend goed.",
} as const;

export const FAMILY_NL = { Spring: "Lente", Summer: "Zomer", Autumn: "Herfst", Winter: "Winter" } as const;
