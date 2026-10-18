import { analysisEn, emailEn, pageEn, resultEn, retentionEn, SELFIE_EN_NYANSE } from "../common.en";
import type { VoiceCopy } from "../types";

// NYANSE in English. Girl Math: playful sums with a wink, never money promises. Boss Lady: sure
// and short on time, "buy less, choose better". Signature: calm and grown-up, colours for who you
// are now; never "look younger", never insecurity (CLAUDE.md §12).

const accessories = "which jewellery, bags and make-up shades suit you";
const shared = {
  pass: { label: "Colour card", season: "Your season" },
  selfie: SELFIE_EN_NYANSE,
  analysis: analysisEn("Jewellery: gold or silver?"),
  ring: ["#C8285A", "#C9A9AC", "#8FA3B8", "#A6879C", "#B9926B", "#2F4F3A", "#A2462A", "#1F4FC4", "#F4E3A1", "#D9C7AE"],
};
const style = (headline: readonly [string, string]) => ({ pill: "Free", skip: "Skip", headline, occasionQuestion: "", budgetQuestion: "What do you usually spend per item?", shopsQuestion: "Where do you like to shop?", shopsHint: "Optional. So we look in the right places later.", next: "Next: selfie" });
const free = { title: "Free", text: "Your exact colour type (e.g. Soft Summer), 6 colours that make you glow and what to avoid." };
const paid = { title: "In your guide, from €12.99", text: "All 30 colours with names, combinations that work and which jewellery, bags and make-up shades suit you." };
const proof = { title: ["Same face.", "Different colour."] as const, text: "One drape under the chin and you see the difference. Exactly what the app does with your selfie." };

export const bossladyEn: VoiceCopy = {
  ...shared,
  locale: "en",
  meta: { title: "NYANSE · Which colours suit you? Colour analysis from one selfie", description: "Your personal colour profile from one selfie, with you in every shop." },
  landing: {
    pill: "Free colour profile",
    eyebrow: "Colour analysis from one selfie",
    headline: ["Colours that work", "as hard as you do."],
    sub: "No time for bad buys. One selfie shows which colours make you look confident, from meeting to dinner.",
    trustMain: "Your photo never leaves your phone",
    occasionQuestion: "Where do you want to look your best? Pick one or more.",
    trustSmall: ["No account needed", "Free colour profile"],
    free,
    paid,
    hero: { caption: "Same face. Different colour.", bad: "fades", good: "your colour" },
  },
  page: pageEn({ galleryTitle: ["Same face.", "Different colour."], howTitle: ["How it", "works."], compareTitle: ["Free or", "the guide?"], finalTitle: ["Buy less,", "choose better."], accessories, trustTitle: ["Calm and", "no fuss."] }),
  story: {
    image: "/brand/editorial/nyanse-jv-campagne-1.jpg",
    imageAlt: "A woman at the mirror choosing between a coral and a grey blouse",
    pains: { title: ["Beautiful. Bought.", "Never worn."], items: [["No time for doubt", "Your diary is full. Your wardrobe just has to work."], ["Beautiful pieces, no outfits", "All bought separately, nothing goes together."], ["Returns as a hobby", "Ordered online, at home it's not your colour after all."]] },
    proof,
    gets: { title: ["What you", "get."], items: [["Your colour profile", "Free: your type, your 6 best colours and what to leave on the rack."], ["Your personal style guide", "All 30 colours, 4 looks, a 12-piece capsule, jewellery, bag and make-up."], ["Your colour card", "In your wallet. In the shop you see at a glance whether it works."]] },
    final: ["Buy less,", "choose better."],
  },
  retention: retentionEn({ friend: "friend", friendLine: "Friend discount", calm: true, weekly: ["{kleur}. Wear it near your face: a blouse, a scarf, a knit.", "{kleur} this week. One piece, the rest in your neutrals.", "{kleur}. Buy less, choose better: look in your own wardrobe first."] }),
  guide: {
    tagline: "Buy less, choose better.",
    summary: "Your colours at a glance. Keep it close.",
    effect: "The difference is one thing: the colour near your face.",
    combos: "Four combinations where everything goes together.",
    swaps: "Not this, but this. A calmer alternative from your own palette.",
    closing: ["A wardrobe where", "everything goes together."],
  },
  style: style(["Your style,", "your budget."]),
  email: emailEn(["Your colours are", "ready."]),
  result: resultEn(
    "6 colours that make you glow",
    ["All 30 colours with names: base, accent and neutral", "Combinations that work, so your wardrobe goes together", "Jewellery, bags and make-up shades", "Your personal style guide as a PDF + digital card"],
    { kind: "compare", title: "Choose right, once", them: ["Colour consultant", "a 1 to 2 hour appointment"], us: ["With your style guide", "one selfie, your colours always with you"] },
  ),
};

export const girlmathEn: VoiceCopy = {
  ...bossladyEn,
  meta: { title: "NYANSE · Which colours suit you? Colour analysis from one selfie", description: "Stop buying what doesn't suit you. Your colours from one selfie." },
  landing: {
    ...bossladyEn.landing,
    headline: ["Stop buying what", "doesn't suit you."],
    sub: "One selfie = you know which colours suit you. So also which ones you don't need to buy.",
    free: { title: "Free", text: "Your exact colour type (e.g. Bright Spring), 6 colours that suit you and what to skip." },
    paid: { title: "In your guide, from €12.99", text: "All 30 colours with names, combinations that work and which jewellery and make-up shades suit you." },
  },
  page: pageEn({ galleryTitle: ["Same face.", "Different colour."], howTitle: ["It's that", "simple."], compareTitle: ["Free or", "the guide?"], finalTitle: ["Stop buying what", "doesn't suit you."], accessories: "which jewellery and make-up shades suit you", trustTitle: ["No fuss,", "no catch."] }),
  story: {
    image: "/brand/editorial/nyanse-jong-campagne-1.jpg",
    imageAlt: "Three friends in a student room holding up a lilac top",
    pains: { title: ["Full closet,", "nothing to wear."], items: [["Fitting room: yes. At home: no.", "It wasn't you. It was the colour."], ["One more in black", "Because it's safe. But is black even your colour?"], ["Return number whatever", "Order, try, send back. Again."]] },
    proof: { title: ["Same face.", "Different colour."], text: "One drape under your chin and you see it straight away. Exactly what the app does with your selfie." },
    gets: { title: ["What you", "get."], items: [["Your colour profile", "Free: your type, your 6 best colours and what to skip."], ["Your personal style guide", "30 colours, 4 looks, a 12-piece capsule: more outfits from fewer clothes."], ["Your colour card", "In your wallet, for the fitting room. No more maybe-buys."]] },
    final: ["Stop buying what", "doesn't suit you."],
  },
  retention: {
    ...retentionEn({ friend: "friend", friendLine: "Bestie discount", weekly: ["{kleur} is your colour of the week. Near your face = instant glow.", "{kleur}. Check your wardrobe first: you might already have it 👀", "{kleur} this week. One item, the rest neutral. Done."] }),
    greet: "Hey {type} ✨",
    resumeTitle: "Almost there!",
    resumeCta: "Finish it",
    guideText: "Your style guide is ready 💅",
    invited: "{naam} invited you 💌 You get €1 off your guide.",
    invitedAnon: "A friend invited you 💌 You get €1 off your guide.",
  },
  guide: {
    tagline: "Fewer bad buys, more outfits that work. ✨",
    summary: "The cheat sheet. Screenshot and done.",
    effect: "Same face, different colour. That's the whole secret.",
    combos: "Four outfits that always work. Girl math: that's endless combinations.",
    swaps: "Not this, but this. So you never buy the wrong one again.",
    closing: ["Stop buying what", "doesn't suit you."],
  },
  style: style(["What's your", "budget?"]),
  email: emailEn(["Okay, your colours are", "ready."]),
  result: resultEn(
    "6 colours that make you glow",
    ["All 30 colours with names: base, accent and neutral", "Combinations that work, so fewer bad buys", "Jewellery and make-up shades", "Your personal style guide as a PDF + digital card"],
    { kind: "receipt", title: "Why this is actually a steal", head: "Girl math", lines: [["Style guide", "€12.99"], ["÷ 365 days", "€0.04 a day"], ["Less guessing when you shop", "✓"]], total: ["Girl math says", "worth it ✨"] },
  ),
  ring: ["#D61F5B", "#FFE9A6", "#F4A3A0", "#8FA3B8", "#F3A27A", "#A6879C", "#2BB3A8", "#FFE6EE", "#B9926B", "#6E5468"],
};

export const signatureEn: VoiceCopy = {
  ...bossladyEn,
  meta: { title: "NYANSE · Colours for who you are now", description: "Your personal colour profile from one selfie, with you in every shop." },
  landing: {
    ...bossladyEn.landing,
    headline: ["Colours for", "who you are now."],
    sub: "Your hair, your skin and your taste evolve. One selfie shows which colours suit you best today.",
    hero: { caption: "Same face. Different colour.", bad: "drains", good: "your colour" },
  },
  page: pageEn({ galleryTitle: ["Same face.", "Different colour."], howTitle: ["How it", "works."], compareTitle: ["Free or", "the guide?"], finalTitle: ["Colours with", "confidence."], accessories, trustTitle: ["Calm, personal,", "no fuss."] }),
  story: {
    image: "/brand/editorial/nyanse-40-campagne-1.jpg",
    imageAlt: "A woman with silver-grey hair in a cobalt blue blouse at a café table",
    pains: { title: ["Your colours", "move with you."], items: [["What suited you then suits you differently now", "Greyer hair, softer skin: your palette shifts too."], ["A wardrobe full of old certainties", "Colours you always wore, that do less for you now."], ["Less, but better", "You buy with care. So the colour has to be right."]] },
    proof,
    gets: { title: ["What you", "get."], items: [["Your colour profile", "Free: your type, your 6 best colours and what to leave on the rack."], ["Your personal style guide", "All 30 colours, 4 looks, a 12-piece capsule, jewellery and make-up."], ["Your colour card", "In your wallet. In the shop you see at a glance whether it works."]] },
    final: ["Colours for", "who you are now."],
  },
  retention: retentionEn({ friend: "friend", friendLine: "Friend discount", calm: true, weekly: ["{kleur}. Wear it near your face: a blouse, a scarf, a knit.", "{kleur} this week. One piece, the rest in your neutrals.", "{kleur}. Lovely with grey or silver hair: wear it close to your face."] }),
  guide: {
    tagline: "Calm in your wardrobe, confidence in your colours.",
    summary: "Your colours at a glance. Keep it close.",
    effect: "The difference is one thing: the colour near your face.",
    combos: "Four combinations where everything goes together.",
    swaps: "Not this, but this. A calmer alternative from your own palette.",
    closing: ["Colours for", "who you are now."],
  },
  style: style(["Your style,", "your choice."]),
  result: resultEn(
    "6 colours that suit you best now",
    ["All 30 colours with names: base, accent and neutral", "Combinations that work, so your wardrobe goes together", "Jewellery, bags and make-up shades", "Your personal style guide as a PDF + digital card"],
    { kind: "compare", title: "Your colours move with you", them: ["Before", "colours chosen for your hair back then"], us: ["Now", "measured on who you are today, grey hair included"] },
  ),
  ring: ["#6B2D5C", "#B9A3B0", "#7D8FA6", "#A6879C", "#C2A27E", "#3F5A4C", "#8E3B46", "#2B4A8C", "#E9DCC4", "#CFC3B8"],
};
