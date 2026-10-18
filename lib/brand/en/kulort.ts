import { analysisEn, emailEn, pageEn, resultEn, retentionEn, SELFIE_EN } from "../common.en";
import type { VoiceCopy } from "../types";

// KULØRT in English. Wingman: confidence and first impressions, always about him. Director:
// presence and authority, quality over quantity. Same rules as the Dutch voices (CLAUDE.md §6, §12).

const accessories = "which watch, belt and shoes are right";
const page = pageEn({ galleryTitle: ["Same face.", "Different colour."], howTitle: ["Three steps.", "Done."], compareTitle: ["Free or", "the guide?"], finalTitle: ["Know which colours", "work for you."], accessories, trustTitle: ["No fuss.", "No guessing."] });
const weekly = ["{kleur}. Wear it close to your face: shirt, knit or tie.", "{kleur} this week. One piece is enough, keep the rest neutral.", "{kleur}. Works under a dark jacket, even on a Monday."] as const;
const shared = {
  pass: { label: "Colour card", season: "Your season" },
  style: { pill: "Free", skip: "Skip", headline: ["Where do you", "shop?"] as const, occasionQuestion: "", budgetQuestion: "What do you usually spend per item?", shopsQuestion: "Where do you like to shop?", shopsHint: "Optional. So we look in the right places later.", next: "Next: selfie" },
  selfie: SELFIE_EN,
  analysis: analysisEn("Watch or ring: gold or silver?"),
  email: emailEn(["Your colours are", "ready."]),
  result: resultEn(
    "6 colours that work for you",
    ["All 30 colours with names: base, accent and neutral", "Combinations that work for work, weekend and dates", "Watch, belt, shoes and glasses: which metal and leather", "Your personal style guide as a PDF + digital card"],
    { kind: "impression", title: "Why it matters", label: "First impression", big: "0.1 sec", text: "That's how fast someone forms a first impression of a face.", source: "Willis & Todorov, Psychological Science, 2006" },
  ),
  guide: {
    tagline: "First impression: sorted.",
    summary: "Everything you need to know, on one page. Screenshot it.",
    effect: "This is why it works. Same face, same light. Only the colour under the chin is different.",
    combos: "Four looks that always work. No fuss, no guessing.",
    swaps: "Not this, but this. How to replace what doesn't suit you.",
    closing: ["Wear what", "works for you."] as const,
  },
  ring: ["#1B2A5C", "#8A4A26", "#5E6A7A", "#2F4F3A", "#B9926B", "#6E1F2A", "#4F6886", "#C99A1E", "#3A3D45", "#EADCC2"],
};

export const wingmanEn: VoiceCopy = {
  ...shared,
  locale: "en",
  meta: { title: "KULØRT · Which colours actually suit you? Colour analysis from one selfie", description: "Find out with one selfie which colours make you look sharp, and which to leave on the rack." },
  landing: {
    pill: "Free colour profile",
    eyebrow: "Colour analysis from one selfie",
    headline: ["What colours actually", "work on you?"],
    sub: "See straight away which colours make you look sharp, and which ones to leave on the rack.",
    trustMain: "Your photo never leaves your phone",
    occasionQuestion: "Where do you want to look sharp? Pick one or more.",
    trustSmall: ["No account needed", "Free colour profile"],
    free: { title: "Free", text: "Your exact colour type (e.g. Bright Winter), 6 colours that work and what to leave on the rack." },
    paid: { title: "In your guide, from €12.99", text: "All 30 colours with names, combinations that work and which watch, belt and shoes suit you." },
    hero: { caption: "Same face. Different colour.", bad: "fades", good: "your colour" },
  },
  page,
  story: {
    image: "/brand/editorial/kulort-jv-campagne-1.jpg",
    imageAlt: "A man in a navy blazer and light blue shirt at the office",
    pains: { title: ["Full closet.", "Nothing to wear."], items: [["Great in the shop, not at home", "It's rarely the fit. Usually it's the colour."], ["Random pieces", "A pile of shirts that go with nothing."], ["Guessing every morning", "And ending up in the same shirt again."]] },
    proof: { title: ["Same face.", "Different colour."], text: "One drape under the chin and you see the difference. Exactly what the app does with your selfie." },
    gets: { title: ["What you", "get."], items: [["Your colour profile", "Free: your type, your 6 best colours and what to leave on the rack."], ["Your personal style guide", "All 30 colours, 4 looks for work, weekend, dates and parties, and a 12-piece capsule."], ["Your colour card", "In your wallet. In the shop you know at a glance."]] },
    final: ["Know which colours", "work for you."],
  },
  retention: retentionEn({ friend: "friend", friendLine: "Friend discount", weekly }),
};

export const directorEn: VoiceCopy = {
  ...wingmanEn,
  landing: {
    ...wingmanEn.landing,
    headline: ["The right impression,", "every day."],
    sub: "Buy less, choose better. One selfie shows which colours make you look calm and sure of yourself, in the boardroom and beyond.",
    occasionQuestion: "Where does it need to be right? Pick one or more.",
  },
  story: {
    image: "/brand/editorial/kulort-vol-campagne-1.jpg",
    imageAlt: "A man picks a camel jumper from a stack of folded knitwear",
    pains: { title: ["Bought it.", "Never wore it."], items: [["Investing without a return", "A good blazer that still doesn't work. It was the colour."], ["No time for doubt", "Your diary is full. Your wardrobe just has to be right."], ["A wardrobe without a line", "Beautiful pieces that do nothing together."]] },
    proof: wingmanEn.story.proof,
    gets: { title: ["What you", "get."], items: [["Your colour profile", "Free: your type, your 6 best colours and what to leave on the rack."], ["Your personal style guide", "All 30 colours, 4 looks and a 12-piece capsule: everything you buy works together."], ["Your colour card", "Your colours in your pocket. At the tailor or in the shop, at a glance."]] },
    final: ["A wardrobe that", "works for you."],
  },
};
