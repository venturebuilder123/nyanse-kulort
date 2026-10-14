export type BrandKey = "nyanse" | "kulort";
export type VoiceKey = "girlmath" | "bosslady" | "signature" | "wingman" | "director";
export type Locale = "nl"; // structure ready for "en" | "de"

export type OccasionKey = "werk" | "weekend" | "date" | "feest" | "sport";
export type BudgetKey = "low" | "mid" | "high";

/** Headline split in a plain part and an emphasised part (accent colour / marker). */
export type Headline = readonly [plain: string, emphasis: string];

export type VoiceCopy = {
  locale: Locale;
  meta: { title: string; description: string };
  landing: {
    pill: string;
    /** says literally what this is, above the headline */
    eyebrow: string;
    headline: Headline;
    /** one line under the headline: the problem and the promise */
    sub: string;
    /** the strongest trust claim, right under the sub */
    trustMain: string;
    occasionQuestion: string;
    trustSmall: readonly [string, string];
    /** what is free and what is paid, spelled out (no misleading "gratis") */
    free: { title: string; text: string };
    paid: { title: string; text: string };
    hero: { caption: string; bad: string; good: string };
  };
  /** the sections below the first tap (and the desktop page) */
  page: {
    nav: { how: string; prices: string; start: string };
    gallery: { title: Headline; text: string };
    how: { title: Headline; steps: readonly [title: string, text: string][] };
    compare: { title: Headline; free: string; paid: string; rows: readonly [label: string, free: boolean, paid: boolean][] };
    trust: { title: Headline; items: readonly [title: string, text: string][] };
    final: { title: Headline; cta: string };
  };
  /** the brand landing's story (docs/brand/BRANDBOOK.md §2): recognise the problem, see the proof, know what you get */
  story: {
    /** campaign photo for this voice, public/brand/... */
    image: string;
    imageAlt: string;
    pains: { title: Headline; items: readonly [title: string, text: string][] };
    proof: { title: Headline; text: string };
    gets: { title: Headline; items: readonly [title: string, text: string][] };
    final: Headline;
  };
  /** coming back: resume, invitation, greeting by colour type, weekly push (all opt-in, all true) */
  retention: {
    /** {type} = the person's season, e.g. "Deep Autumn" */
    greet: string;
    resumeTitle: string;
    /** {n} steps left, {s} seconds */
    resumeText: string;
    resumeCta: string;
    resultText: string;
    guideText: string;
    /** {naam} = the friend's first name from the code */
    invited: string;
    invitedAnon: string;
    friendLine: string;
    push: { title: string; text: string; cta: string; on: string; off: string; ios: string; denied: string };
    /** weekly notification: {type}, {kleur} */
    weekly: { title: string; bodies: readonly string[] };
  };
  /** voice lines for the style guide */
  guide: {
    tagline: string;
    summary: string;
    effect: string;
    combos: string;
    swaps: string;
    closing: Headline;
  };
  /** the kleurenpas in the hero: the season stays hidden until the selfie */
  pass: { label: string; season: string };
  style: {
    pill: string;
    skip: string;
    headline: Headline;
    occasionQuestion: string;
    budgetQuestion: string;
    shopsQuestion: string;
    shopsHint: string;
    next: string;
  };
  selfie: SelfieCopy;
  analysis: AnalysisCopy;
  email: EmailCopy;
  result: ResultCopy;
  /** colours on the 3D ring, chosen per voice */
  ring: readonly string[];
};

export type BrandConfig = {
  key: BrandKey;
  name: string;
  /** production hostnames that select this brand */
  hosts: readonly string[];
  voices: readonly VoiceKey[];
  defaultVoice: VoiceKey;
  /** 8 favourite shops offered in the style step (CLAUDE.md §6.2) */
  shops: readonly string[];
  other: BrandKey;
  /** the small cross-brand link on the landing */
  switchLabel: string;
  /** browser bar colour, light and dark (matches --bg) */
  themeColor: { light: string; dark: string };
  /** shown on bank statements and in mails (phase B) */
  descriptor: string;
};

export type SelfieCopy = {
  pill: string;
  intro: string;
  introText: string;
  /** extra intro line, per brand (NYANSE: foundation changes your skin tone) */
  introExtra?: string;
  under16: string;
  /** one specific tip for the first live check that fails */
  fixTips: { face: string; light: string; even: string; faces: string };
  /** customer wording for analysis issues */
  issueTips: { dark: string; uneven: string; overexposed: string; small: string; faces: string; eyes: string; skin: string };
  loadSlow: string;
  retryLoad: string;
  desktopTitle: string;
  desktopText: string;
  startCamera: string;
  denied: string;
  hold: string;
  tips: { face: string; light: string; even: string };
  hint: string;
  age: string;
  /** the AI notice lives in the button (CLAUDE.md §9, EU AI Act) */
  start: string;
  busy: string;
  loading: string;
  trust: string;
  takePhoto: string;
  pickPhoto: string;
  noCamera: string;
  retryTitle: string;
  retryGeneric: string;
  noFace: string;
  failed: string;
};

export type AnalysisCopy = {
  pill: string;
  label: string;
  scales: { undertone: string; depth: string; clarity: string };
  questionsTitle: string;
  hairQ: string;
  hair: { natural: string; dyed: string; grey: string; none: string; covered: string };
  jewelQ: string;
  jewel: { goud: string; zilver: string; weetniet: string };
  goodLines: readonly string[];
  badLines: readonly string[];
  waiting: string;
  thanks: string;
  cta: string;
  skip: string;
};

export type EmailCopy = {
  pill: string;
  headline: Headline;
  teaser: string;
  lead: string;
  placeholder: string;
  optin: string;
  submit: string;
  skip: string;
  invalid: string;
};

export type WhyBlock =
  | { kind: "impression"; title: string; label: string; big: string; text: string; source: string }
  | { kind: "compare"; title: string; them: [string, string]; us: [string, string] }
  | { kind: "receipt"; title: string; head: string; lines: [string, string][]; total: [string, string] };

export type ResultCopy = {
  pill: string;
  welcomeBack: string;
  seeColors: string;
  startOver: string;
  noPhoto: string;
  newSelfie: string;
  lowCta: string;
  lowTiersNote: string;
  mailTitle: string;
  mailCta: string;
  mailDone: string;
  deleteProfile: string;
  deleted: string;
  label: string;
  provisional: string;
  between: string;
  typeLabel: string;
  scalesTitle: string;
  colorsTitle: string;
  avoidTitle: string;
  avoidText: string;
  baTitle: string;
  baHint: string;
  lowConfidence: string;
  lowConfidenceCta: string;
  lockedTitle: string;
  /** why the guide is worth paying for when the type itself is free (and googleable) */
  lockedWhy: string;
  lockedItems: readonly string[];
  why: WhyBlock;
  tiersTitle: string;
  tiers: {
    digital: { name: string; line: string; features: readonly string[] };
    card: { name: string; badge: string; line: string; note: string; features: readonly string[] };
  };
  ctaChoose: string;
  /** buy button on each tier card: {price} */
  buyCard: string;
  buyDigital: string;
  /** sticky button: {price} = the lowest price */
  ctaFrom: string;
  mailLater: string;
  next: string;
  ctaDigital: string;
  ctaCard: string;
  fine: string;
  checkout: {
    pay: string;
    shipping: string;
    shippingWhen: string;
    address: string;
    name: string;
    street: string;
    postcode: string;
    city: string;
    country: string;
    countryNote: string;
    withdrawal: string;
    test: string;
    close: string;
  };
};
