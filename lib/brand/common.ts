import type { AnalysisCopy, EmailCopy, ResultCopy, SelfieCopy } from "./types";

// Shared Dutch copy for steps that sound the same in every voice.
const SELFIE_BASE: SelfieCopy = {
  pill: "Gratis",
  intro: "Eén selfie, bij daglicht",
  // auto-capture means many never see the button text, so the AI notice sits here too (AI Act)
  introText: "De kleuranalyse draait op je telefoon. Kijk recht in de camera, bij daglicht, zonder filter of bril.",
  under16: "Jonger dan 16? Dan kun je dit nog niet doen.",
  // one tap = the 16+ confirmation and the context for the camera permission prompt
  startCamera: "Ik ben 16+ · camera aan",
  denied: "Geen toegang tot je camera. Geef toestemming in de instellingen van je browser (iPhone: Instellingen › Safari › Camera), of maak een selfie met je camera-app.",
  hold: "Blijf zo…",
  tips: { face: "Gezicht in het ovaal", light: "Genoeg licht", even: "Licht gelijkmatig" },
  fixTips: {
    faces: "Alleen jij in beeld, graag.",
    face: "Iets dichterbij en midden in het ovaal.",
    light: "Draai je naar het raam, niet met je rug ernaar.",
    even: "Ga recht voor het raam staan, zodat beide wangen licht krijgen.",
  },
  issueTips: {
    dark: "Het is wat donker. Ga met je gezicht naar een raam.",
    uneven: "Er valt schaduw op één kant. Ga recht voor het raam staan.",
    overexposed: "Te fel licht. Ga uit direct zonlicht en zet de flitser uit.",
    small: "Kom iets dichter bij de camera.",
    faces: "Alleen jij in beeld, graag.",
    eyes: "Zet je bril even af en kijk recht in de camera.",
    skin: "Haal je haar even uit je gezicht.",
  },
  loadSlow: "Het laden duurt lang. Probeer het op wifi.",
  retryLoad: "Opnieuw proberen",
  desktopTitle: "Op je telefoon gaat het beter",
  desktopText: "Scan de code met je telefooncamera. Je antwoorden gaan mee.",
  hint: "Daglicht, geen filter, bril af",
  age: "Ik ben 16 jaar of ouder",
  start: "Start mijn kleuranalyse",
  busy: "Even kijken…",
  loading: "Camera starten…",
  trust: "Je foto verlaat je telefoon niet",
  takePhoto: "Maak een selfie",
  pickPhoto: "Liever een foto uit je camerarol? Alleen van jezelf, 16+.",
  noCamera: "Tik hier en maak een selfie met je camera.",
  retryTitle: "Nog één selfie?",
  retryGeneric: "Ga bij een raam staan, met je gezicht naar het licht.",
  noFace: "We zien je gezicht niet goed. Kijk recht in de camera.",
  failed: "Dat lukte niet. Probeer het nog een keer.",
};

export const SELFIE_NL = SELFIE_BASE;
export const SELFIE_NL_NYANSE: SelfieCopy = {
  ...SELFIE_BASE,
  introExtra: "Foundation verandert je huidtint: liefst zonder, of je gewone daglook.",
};

const ANALYSIS_BASE = {
  pill: "Bijna klaar",
  label: "Kleurdoeken passen",
  scales: { undertone: "Ondertoon", depth: "Diepte", clarity: "Helderheid" },
  goodLines: ["laat je gezicht helder ogen", "geeft je huid een frisse gloed", "laat je ogen spreken"],
  badLines: ["trekt de aandacht weg van je gezicht", "valt weg tegen je huid", "is te veel naast je gezicht"],
  questionsTitle: "Twee snelle vragen, dan wordt je profiel preciezer",
  hairQ: "Is dit je natuurlijke haarkleur?",
  hair: { natural: "Ja, naturel", dyed: "Geverfd", grey: "Grijs of wit", none: "Kaal", covered: "Bedekt (hoofddoek, pet)" },
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
  welcomeBack: "Welkom terug: jij bent {familie}.",
  seeColors: "Bekijk mijn kleuren",
  startOver: "Opnieuw doen",
  noPhoto: "Je foto bewaren we niet, ook niet op je telefoon. Wil je het verschil zien? Maak snel een nieuwe selfie.",
  newSelfie: "Nieuwe selfie",
  lowCta: "Nog een selfie bij daglicht",
  lowTiersNote: "Je gids gebruikt je beste selfie. Nieuwe selfie? Dan past je gids zich gratis aan.",
  mailTitle: "Mail mij mijn profiel",
  mailCta: "Stuur",
  mailDone: "Bewaard. Je profiel komt naar {email}.",
  deleteProfile: "Verwijder mijn profiel",
  deleted: "Je profiel is verwijderd van dit apparaat.",
  label: "Jouw kleurtype",
  provisional: "Voorlopig",
  between: "op de grens met {b}",
  typeLabel: "Je precieze type",
  scalesTitle: "Zo is je kleur opgebouwd",
  avoidTitle: "Liever niet bij je gezicht",
  avoidText: "Deze kleuren werken tegen je in. Draag ze liever niet direct onder je gezicht.",
  baTitle: "Zie het verschil",
  baHint: "Sleep om te vergelijken",
  lowConfidence: "Je foto was lastig te lezen, dus dit is een voorlopig profiel. Met een selfie bij daglicht wordt het preciezer.",
  lowConfidenceCta: "Nog een selfie",
  lockedTitle: "Wat de gids je extra geeft",
  lockedWhy: "Je volledige palet telt 30 kleuren. De eerste 6 krijg je van ons. De andere 24, met namen en hoe je ze combineert, zitten in je stijlgids.",
  tiersTitle: "Kies je stijlgids",
  tiers: {
    digital: {
      name: "Stijlgids",
      line: "Direct op je telefoon en als PDF",
      features: ["Al je 30 kleuren met namen", "4 looks en een capsule van 12 stuks", "Metaal, leer en wat je laat hangen"],
    },
    card: {
      name: "Stijlgids + kleurenpas",
      badge: "Aanrader",
      line: "Je kleuren altijd bij je, ook in de paskamer",
      note: "Gratis verzonden naar NL, BE en DE, binnen ±1 week",
      features: ["Alles uit de stijlgids", "Stevige pas met je 8 kernkleuren, voor in je portemonnee"],
    },
    session: {
      name: "Persoonlijke sessie",
      line: "45 minuten online met een kleurconsultant",
      note: "Via Teams, op een moment dat jou past",
      features: ["Alles uit stijlgids + kleurenpas", "Je kleuren samen nagelopen, met doeken", "Advies over je eigen kast en je vragen"],
    },
  },
  ctaChoose: "Kies je gids",
  buyCard: "Kies stijlgids + pas · {price}",
  buyDigital: "Kies stijlgids · {price}",
  buySession: "Plan mijn sessie · {price}",
  ctaFrom: "Bekijk je gids · vanaf {price}",
  mailLater: "Nog even nadenken? Mail mij mijn profiel",
  next: "Hieronder: je kleuren, je look en wat je beter laat hangen",
  ctaDigital: "Krijg mijn gids",
  ctaCard: "Krijg mijn gids + pas",
  fine: "Prijzen inclusief btw en verzending.",
  checkout: {
    pay: "Betalen",
    shipping: "Verzending",
    shippingWhen: "inbegrepen · binnen ±1 week",
    address: "Waar mag je pas heen?",
    name: "Naam",
    street: "Straat en huisnummer",
    postcode: "Postcode",
    city: "Plaats",
    country: "Land",
    countryNote: "De pas versturen we nu naar Nederland, België en Duitsland. Kies de digitale gids, of mail ons.",
    withdrawal: "Ik ga akkoord met de voorwaarden en wil mijn gids meteen ontvangen. Daarna geldt er geen bedenktijd voor de gids.",
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

type Page = import("./types").VoiceCopy["page"];

/** Sections shared by all voices; the voice files override titles where their tone differs. */
export const pageNl = (o: { galleryTitle: Page["gallery"]["title"]; howTitle: Page["how"]["title"]; compareTitle: Page["compare"]["title"]; finalTitle: Page["final"]["title"]; accessories: string; trustTitle: Page["trust"]["title"] }): Page => ({
  nav: { how: "Hoe het werkt", prices: "De waarde voor jou", start: "Begin gratis" },
  gallery: { title: o.galleryTitle, text: "Dezelfde foto, alleen een ander kleurdoek eronder. Precies wat de app met jouw selfie doet." },
  how: {
    title: o.howTitle,
    steps: [
      ["Eén selfie", "Bij daglicht, op je telefoon. De analyse draait op je toestel; je foto gaat nergens heen."],
      ["Je kleurprofiel", "Je precieze type, je plek op de schalen ondertoon, diepte en helderheid, en 6 kleuren die werken. Gratis."],
      ["Je gids", "Al je 30 kleuren met namen, combinaties die werken en " + o.accessories + ". Als PDF, met een pas voor in de winkel."],
    ],
  },
  compare: {
    title: o.compareTitle,
    free: "Gratis",
    paid: "Gids",
    rows: [
      ["Je precieze kleurtype (1 van 12)", true, true],
      ["Ondertoon, diepte en helderheid", true, true],
      ["6 kleuren die werken", true, true],
      ["Kleuren om te vermijden", true, true],
      ["Alle 30 kleuren met namen", false, true],
      ["Combinaties die samen werken", false, true],
      [o.accessories.charAt(0).toUpperCase() + o.accessories.slice(1), false, true],
      ["Je persoonlijke stijlgids als PDF", false, true],
      ["Digitale kleurenpas (of een echte in de bus)", false, true],
    ],
  },
  trust: {
    title: o.trustTitle,
    items: [
      ["Je foto blijft bij jou", "De analyse draait op je telefoon. We sturen je foto nergens heen en bewaren hem niet."],
      ["Geen account nodig", "Je profiel staat op je eigen toestel. Met één tik verwijderd."],
      ["Aanbevolen op kleur", "Nooit op commissie. We laten zien wat jou staat, niet wat ons het meest oplevert."],
    ],
  },
  final: { title: o.finalTitle, cta: "Begin gratis" },
});
