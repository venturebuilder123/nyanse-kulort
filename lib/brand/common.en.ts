import type { AnalysisCopy, EmailCopy, ResultCopy, SelfieCopy, VoiceCopy } from "./types";

// Shared English copy (prepared 18 Oct 2026; live once NEXT_PUBLIC_LOCALES includes "en").
// Same structure as common.ts. Prices in euros with a decimal point, as English readers expect.

const SELFIE_BASE_EN: SelfieCopy = {
  pill: "Free",
  intro: "One selfie, in daylight",
  introText: "The colour analysis runs on your phone. Look straight into the camera, in daylight, without a filter or glasses.",
  under16: "Under 16? You can't do this yet.",
  startCamera: "I'm 16+ · camera on",
  denied: "No access to your camera. Allow it in your browser settings (iPhone: Settings › Safari › Camera), or take a selfie with your camera app.",
  hold: "Hold still…",
  tips: { face: "Face in the oval", light: "Enough light", even: "Even light" },
  fixTips: {
    faces: "Just you in the frame, please.",
    face: "A little closer, in the middle of the oval.",
    light: "Turn towards the window, not with your back to it.",
    even: "Stand straight in front of the window so both cheeks get light.",
  },
  issueTips: {
    dark: "It's a bit dark. Face a window.",
    uneven: "One side is in shadow. Stand straight in front of the window.",
    overexposed: "Too bright. Step out of direct sunlight and turn off the flash.",
    small: "Come a little closer to the camera.",
    faces: "Just you in the frame, please.",
    eyes: "Take off your glasses for a moment and look straight into the camera.",
    skin: "Brush your hair out of your face for a moment.",
  },
  loadSlow: "This is taking a while. Try it on wifi.",
  retryLoad: "Try again",
  desktopTitle: "It works better on your phone",
  desktopText: "Scan the code with your phone camera. Your answers come with you.",
  hint: "Daylight, glasses off, neutral top",
  clothing: "Wear something neutral (white, grey, beige) or put a white towel over your shoulders: a bright top tints your skin on camera.",
  age: "I'm 16 or older",
  start: "Start my colour analysis",
  busy: "Just a moment…",
  loading: "Starting the camera…",
  trust: "Your photo never leaves your phone",
  takePhoto: "Take a selfie",
  pickPhoto: "Rather use a photo from your camera roll? Only of yourself, 16+.",
  noCamera: "Tap here and take a selfie with your camera.",
  retryTitle: "One more selfie?",
  retryGeneric: "Stand by a window, facing the light.",
  noFace: "We can't see your face clearly. Look straight into the camera.",
  failed: "That didn't work. Please try again.",
};

export const SELFIE_EN = SELFIE_BASE_EN;
export const SELFIE_EN_NYANSE: SelfieCopy = { ...SELFIE_BASE_EN, introExtra: "Foundation changes your skin tone: ideally without, or your usual daytime look." };

const ANALYSIS_BASE_EN = {
  pill: "Almost there",
  label: "Trying colour drapes",
  scales: { undertone: "Undertone", depth: "Depth", clarity: "Clarity" },
  goodLines: ["makes your face look clear", "gives your skin a fresh glow", "lets your eyes speak"],
  badLines: ["draws attention away from your face", "fades against your skin", "is too much next to your face"],
  questionsTitle: "A few quick questions to make your profile even more precise",
  skinQ: "We think this is your skin colour. Is that right?",
  skinHint: "Hold your hand next to the screen, in daylight.",
  irisQ: "And your eyes?",
  irisHint: "Take a quick look in the mirror.",
  hairShadeQ: "And your hair colour?",
  hairShadeHint: "Your natural colour, at the roots.",
  shade: { lighter: "Lighter", match: "That's right", darker: "Darker" },
  hairQ: "Is this your natural hair colour?",
  hair: { natural: "Yes, natural", dyed: "Dyed", grey: "Grey or white", none: "Bald", covered: "Covered (headscarf, cap)" },
  jewel: { goud: "Gold", zilver: "Silver", weetniet: "No preference" },
  thanks: "Great, noted.",
  waiting: "Trying colours…",
  cta: "See my colours",
  skip: "Skip",
};
export const analysisEn = (jewelQ: string): AnalysisCopy => ({ ...ANALYSIS_BASE_EN, jewelQ });

const EMAIL_BASE_EN = {
  pill: "Profile ready",
  teaser: "Your colour type and 6 colours are ready",
  lead: "Where should we send your colour profile?",
  placeholder: "you@example.com",
  optin: "One outfit and sale tips in my colours, every month",
  submit: "Save and show me",
  skip: "Not now, show me",
  invalid: "Please enter a valid email address, for example you@example.com.",
};
export const emailEn = (headline: EmailCopy["headline"]): EmailCopy => ({ ...EMAIL_BASE_EN, headline });

const RESULT_BASE_EN: Omit<ResultCopy, "why" | "colorsTitle" | "lockedItems"> = {
  pill: "Free profile",
  welcomeBack: "Welcome back: you're {familie}.",
  seeColors: "See my colours",
  startOver: "Start again",
  noPhoto: "We don't keep your photo, not even on your phone. Want to see the difference? Take a quick new selfie.",
  newSelfie: "New selfie",
  lowCta: "One more selfie in daylight",
  lowTiersNote: "Your guide uses your best selfie. A new selfie? Your guide updates for free.",
  mailTitle: "Email me my profile",
  mailCta: "Send",
  mailDone: "Saved. Your profile is on its way to {email}.",
  deleteProfile: "Delete my profile",
  deleted: "Your profile has been deleted from this device.",
  label: "Your colour type",
  provisional: "Provisional",
  between: "on the edge of {b}",
  typeLabel: "Your exact type",
  scalesTitle: "How your colouring is built",
  avoidTitle: "Better not near your face",
  avoidText: "These colours work against you. Avoid wearing them right under your face.",
  baTitle: "See the difference",
  baHint: "Drag to compare",
  lowConfidence: "Your photo was hard to read, so this is a provisional profile. A selfie in daylight makes it more precise.",
  lowConfidenceCta: "One more selfie",
  lockedTitle: "What the guide adds",
  lockedWhy: "Your full palette has 30 colours. The first 6 are on us. The other 24, with names and how to combine them, are in your style guide.",
  tiersTitle: "Choose your style guide",
  tiers: {
    digital: {
      name: "Style guide",
      line: "Instantly on your phone and as a PDF",
      features: ["All 30 of your colours, with names", "4 looks and a 12-piece capsule", "Metals, leather and what to leave on the rack"],
    },
    card: {
      name: "Style guide + colour card",
      badge: "Recommended",
      line: "Your colours always with you, even in the fitting room",
      note: "Free delivery to NL, BE and DE, within about a week",
      features: ["Everything in the style guide", "A sturdy card with your 8 key colours, for your wallet"],
    },
    session: {
      name: "Personal colour advice",
      line: "A colour consultant looks at your photos and records a video for you",
      note: "No appointment, in your inbox within 3 working days",
      features: ["Everything in the guide + colour card", "Your result checked by a colour consultant", "A personal video about your colours and your own wardrobe"],
    },
  },
  ctaChoose: "Choose your guide",
  buyCard: "Choose guide + card · {price}",
  buyDigital: "Choose style guide · {price}",
  buySession: "Choose personal advice · {price}",
  ctaFrom: "See your guide · from {price}",
  mailLater: "Need a moment? Email me my profile",
  next: "Below: your colours, your look and what to leave on the rack",
  ctaDigital: "Get my guide",
  ctaCard: "Get my guide + card",
  fine: "Prices include VAT and delivery.",
  checkout: {
    pay: "Pay",
    shipping: "Delivery",
    shippingWhen: "included · within about a week",
    address: "Where should your card go?",
    name: "Name",
    street: "Street and number",
    postcode: "Postcode",
    city: "City",
    country: "Country",
    countryNote: "We currently send the card to the Netherlands, Belgium and Germany. Choose the digital guide, or email us.",
    withdrawal: "I agree to the terms and want my guide straight away. After that, the cooling-off period no longer applies to the guide.",
    test: "Test version: payments are switched off.",
    close: "Close",
  },
};
export const resultEn = (colorsTitle: string, lockedItems: readonly string[], why: ResultCopy["why"]): ResultCopy => ({ ...RESULT_BASE_EN, colorsTitle, lockedItems, why });

export const FAMILY_EN = { Spring: "Spring", Summer: "Summer", Autumn: "Autumn", Winter: "Winter" } as const;

type Page = VoiceCopy["page"];
export const pageEn = (o: { galleryTitle: Page["gallery"]["title"]; howTitle: Page["how"]["title"]; compareTitle: Page["compare"]["title"]; finalTitle: Page["final"]["title"]; accessories: string; trustTitle: Page["trust"]["title"] }): Page => ({
  nav: { how: "How it works", prices: "What you get", start: "Start free" },
  gallery: { title: o.galleryTitle, text: "The same photo, just a different colour drape underneath. Exactly what the app does with your selfie." },
  how: {
    title: o.howTitle,
    steps: [
      ["One selfie", "In daylight, on your phone. The analysis runs on your device; your photo goes nowhere."],
      ["Your colour profile", "Your exact type, your place on the scales of undertone, depth and clarity, and 6 colours that work. Free."],
      ["Your guide", "All 30 of your colours with names, combinations that work and " + o.accessories + ". As a PDF, with a card for the shops."],
    ],
  },
  compare: {
    title: o.compareTitle,
    free: "Free",
    paid: "Guide",
    rows: [
      ["Your exact colour type (1 of 12)", true, true],
      ["Undertone, depth and clarity", true, true],
      ["6 colours that work", true, true],
      ["Colours to avoid", true, true],
      ["All 30 colours with names", false, true],
      ["Combinations that work together", false, true],
      [o.accessories.charAt(0).toUpperCase() + o.accessories.slice(1), false, true],
      ["Your personal style guide as a PDF", false, true],
      ["Digital colour card (or a real one in the post)", false, true],
    ],
  },
  trust: {
    title: o.trustTitle,
    items: [
      ["Your photo stays with you", "The analysis runs on your phone. We don't send your photo anywhere and we don't keep it."],
      ["No account needed", "Your profile lives on your own device. Deleted with one tap."],
      ["Recommended on colour", "Never on commission. We show what suits you, not what earns us the most."],
    ],
  },
  final: { title: o.finalTitle, cta: "Start free" },
});

type Retention = VoiceCopy["retention"];
/** The calm retention copy, shared by Wingman, Director, Boss Lady and Signature (Girl Math has its own). */
export const retentionEn = (o: { friend: string; friendLine: string; weekly: Retention["weekly"]["bodies"]; calm?: boolean }): Retention => ({
  greet: o.calm ? "Welcome back, {type}." : "{type}. Good to have you back.",
  resumeTitle: "You're almost there.",
  resumeText: "{n} more steps, about {s} seconds. Your answers are saved.",
  resumeCta: o.calm ? "Continue where you were" : "Continue",
  resultText: "Your colours are ready, just as you left them.",
  guideText: "Your style guide is ready.",
  invited: "{naam} sent you this. You get €1 off your guide.",
  invitedAnon: `A ${o.friend} sent you this. You get €1 off your guide.`,
  friendLine: o.friendLine,
  push: {
    title: "One colour a week",
    text: "Every week one colour from your palette and how to wear it. At most one notification a week, during the day. Off with one tap.",
    cta: o.calm ? "Get the colour of the week" : "Turn on colour tips",
    on: "Switched on. Your first colour arrives next week.",
    off: o.calm ? "Turn off colour of the week" : "Turn off colour tips",
    ios: "On iPhone this works from your home screen. Add the app first (step below) and open it from there.",
    denied: "Notifications are off in your settings. You can turn them back on there.",
  },
  weekly: { title: "{type} · colour of the week", bodies: o.weekly },
});
