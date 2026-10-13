import type { AnalysisCopy, EmailCopy, ResultCopy, SelfieCopy } from "./types";

// Shared Dutch copy for steps that sound the same in every voice.
export const SELFIE_NL: SelfieCopy = {
  pill: "Gratis",
  intro: "Eén selfie, bij daglicht",
  introText: "Kijk recht in de camera, zonder filter of bril. De analyse gebeurt op je telefoon.",
  // one tap = the 16+ confirmation and the context for the camera permission prompt
  startCamera: "Ik ben 16+ · camera aan",
  denied: "Geen toegang tot je camera. Geef toestemming in de instellingen van je browser, of maak een selfie met je camera-app.",
  hold: "Blijf zo…",
  tips: { face: "Gezicht in het ovaal", light: "Genoeg licht", even: "Licht gelijkmatig" },
  hint: "Daglicht, geen filter, bril af",
  age: "Ik ben 16 jaar of ouder",
  start: "Start AI-kleuranalyse",
  busy: "Even kijken…",
  loading: "Camera starten…",
  trust: "Je foto verlaat je telefoon niet",
  takePhoto: "Maak een selfie",
  pickPhoto: "Liever een foto uit je camerarol?",
  noCamera: "Tik hier en maak een selfie met je camera.",
  retryTitle: "Nog één selfie?",
  retryGeneric: "Ga bij een raam staan, met je gezicht naar het licht.",
  noFace: "We zien je gezicht niet goed. Kijk recht in de camera.",
  failed: "Dat lukte niet. Probeer het nog een keer.",
};

const ANALYSIS_BASE = {
  pill: "Bijna klaar",
  label: "Kleurdoeken passen",
  scales: { undertone: "Ondertoon", depth: "Diepte", clarity: "Helderheid" },
  goodLines: ["laat je gezicht helder ogen", "geeft je huid een frisse gloed", "laat je ogen spreken"],
  badLines: ["trekt de aandacht weg van je gezicht", "valt weg tegen je huid", "is te veel naast je gezicht"],
  questionsTitle: "Twee snelle vragen, dan wordt je profiel preciezer",
  hairQ: "Is dit je natuurlijke haarkleur?",
  hair: { natural: "Ja, naturel", dyed: "Nee, geverfd", grey: "Grijs of wit", none: "Kaal of heel kort" },
  jewel: { goud: "Goud", zilver: "Zilver", weetniet: "Geen voorkeur" },
  thanks: "Top, verwerkt.",
  waiting: "Even passen…",
  cta: "Bekijk mijn kleuren",
  skip: "Sla over",
};

/** The gold/silver check is phrased per brand: men think watch, women think jewellery. */
export const analysisNl = (jewelQ: string): AnalysisCopy => ({ ...ANALYSIS_BASE, jewelQ });

const EMAIL_BASE = {
  pill: "Profiel klaar",
  teaser: "Je kleurtype en 6 kleuren staan klaar",
  lead: "Waar sturen we je kleurprofiel naartoe?",
  placeholder: "jij@voorbeeld.nl",
  optin: "Elke maand een outfit en sale-tips in mijn kleuren",
  submit: "Bewaar en laat zien",
  skip: "Nu niet, laat zien",
  invalid: "Vul een geldig e-mailadres in, bijvoorbeeld jij@voorbeeld.nl.",
};

export const emailNl = (headline: EmailCopy["headline"]): EmailCopy => ({ ...EMAIL_BASE, headline });

const RESULT_BASE: Omit<ResultCopy, "why" | "colorsTitle" | "lockedItems"> = {
  pill: "Gratis profiel",
  label: "Jouw kleurtype",
  provisional: "Voorlopig",
  between: "op de grens met {b}",
  scalesTitle: "Zo is je kleur opgebouwd",
  avoidTitle: "Liever niet bij je gezicht",
  avoidText: "Deze kleuren werken tegen je in. Draag ze liever niet direct onder je gezicht.",
  baTitle: "Zie het verschil",
  baHint: "Sleep om te vergelijken",
  lowConfidence: "Je foto was lastig te lezen, dus dit is een voorlopig profiel. Met een selfie bij daglicht wordt het preciezer.",
  lowConfidenceCta: "Nog een selfie",
  lockedTitle: "In je gids",
  lockedSubtype: "Je precieze type (één van 12)",
  tiersTitle: "Kies je gids",
  tiers: {
    card: {
      name: "Gids + kleurenpas",
      badge: "Aanrader",
      line: "Je pas in de brievenbus, verzending inbegrepen, binnen 7 werkdagen",
      features: ["Alles uit de digitale gids", "Stevige kleurenpas voor in je portemonnee, ook handig in de winkel"],
    },
    digital: {
      name: "Digitale gids",
      line: "Direct op je telefoon",
      features: ["Je precieze type en alle 30 kleuren", "Stijlgids als PDF, op jouw naam", "Digitale kleurenpas op je telefoon"],
    },
  },
  ctaChoose: "Kies je gids",
  ctaDigital: "Krijg mijn gids",
  ctaCard: "Krijg mijn gids + pas",
  fine: "Prijzen inclusief btw en verzending.",
  checkout: {
    pay: "Betalen",
    shipping: "Verzending",
    withdrawal: "Ik wil de digitale gids direct ontvangen. Daarmee vervalt mijn herroepingsrecht voor de digitale gids.",
    test: "Testversie: betalen staat nog uit. Hier komen Apple Pay, Google Pay, iDEAL | Wero, PayPal en kaart.",
    close: "Sluiten",
  },
};

export const resultNl = (colorsTitle: string, lockedItems: readonly string[], why: ResultCopy["why"]): ResultCopy => ({
  ...RESULT_BASE,
  colorsTitle,
  lockedItems,
  why,
});

/** Family-level text for the free result: it must not give away the paid precise type. */
export const FAMILY_TEXT_NL = {
  Lente: "Warm en fris. Heldere, levendige kleuren met een gouden ondertoon staan je goed.",
  Zomer: "Koel en zacht. Kleuren met een blauwe ondertoon geven je een frisse, rustige uitstraling.",
  Herfst: "Warm en aards. Rijke, gedempte tinten passen bij je natuurlijke warmte.",
  Winter: "Koel en helder. Contrast en zuivere kleuren laten je scherp uitkomen.",
} as const;

/** Precise-type descriptions, for the paid guide. */
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
