// Interface words that are the same in every voice: navigation, steps, footer and the maison home.
// The voice copy lives in lib/brand (per voice, per language); this is the rest.

const nl = {
  nav: { colourAnalysis: "Kleuranalyse", contact: "Contact", how: "Hoe het werkt", prices: "Prijzen", start: "Begin gratis" },
  steps: { label: (n: number, of: number) => `Stap ${n} van ${of}`, names: ["Jij", "Stijl", "Selfie", "Analyse", "Resultaat"] },
  footer: { terms: "Voorwaarden", privacy: "Privacy", vat: "Prijzen inclusief btw" },
  switchTo: { kulort: "Voor mannen", nyanse: "Voor vrouwen" },
  home: {
    eyebrow: "Kleuranalyse uit één selfie",
    h1: ["Je kleuren.", "Je kast. Je gids."],
    sub: "Ontdek in een paar minuten welke kleuren jou staan. Gratis, met één selfie. Kies je atelier:",
    doors: { kulort: ["Voor hem", "Je eerste indruk, geregeld."], nyanse: ["Voor haar", "Minder kopen, beter kiezen."] },
    begin: "Begin gratis",
    facts: (price: string) => ["Kleurprofiel gratis", "Je foto wordt nergens bewaard", `Stijlgids vanaf ${price}`, "Kleurenpas in de brievenbus"],
    proof: { eyebrow: "Het effect", h2: ["Zelfde gezicht.", "Andere kleur."], text: "Een kleur die bij je past laat je huid egaal en je ogen helder ogen. Een kleur die niet past trekt de aandacht weg van je gezicht. Dat verschil zie je in één oogopslag, en daarna zie je het overal." },
    how: { eyebrow: "Zo werkt het", h2: ["Drie stappen.", "Een kast die samengaat."], steps: [["Eén selfie", "Bij daglicht, zonder filter. Een paar minuten, ook zonder account."], ["Je kleurprofiel", "Je kleurtype, je beste kleuren en wat je beter laat hangen. Gratis."], ["Je stijlgids", "30 kleuren met naam, outfits, je eerste vijf aankopen en een kast-check. Als PDF en op je telefoon."]] },
    band: ["Minder kopen.", "Beter kiezen."],
    prices: {
      eyebrow: "Wat het kost", h2: ["Begin gratis.", "Kies daarna wat bij je past."],
      tiers: [["Kleurprofiel", "Gratis", "Je kleurtype, je plek op de drie schalen en je 6 beste kleuren."], ["Stijlgids", "", "Al je 30 kleuren, looks per gelegenheid, je capsule en je kast-check. Direct als PDF."], ["Stijlgids + kleurenpas", "", "Plus een stevige pas met je 8 kernkleuren, voor in je portemonnee. Gratis verzonden."], ["Persoonlijk kleuradvies", "", "Een kleurconsulent bekijkt jouw foto's en stuurt je een persoonlijke video. Zonder afspraak."]],
      badge: "Aanrader", fine: "Prijzen inclusief btw. Je betaalt pas als je je stijlgids kiest, na je gratis profiel.",
    },
    seasons: { eyebrow: "Vier seizoenen, twaalf kleurtypen", h2: ["Welk seizoen", "ben jij?"], names: [["Lente", "warm en helder"], ["Zomer", "koel en zacht"], ["Herfst", "warm en diep"], ["Winter", "koel en contrastrijk"]], more: "Alles over kleuranalyse en de 12 kleurtypen →" },
    faqTitle: "Vragen",
    faq: [["Hoe werkt het?", "Je maakt één selfie bij daglicht. De analyse draait op je telefoon en bepaalt je ondertoon, diepte en helderheid. Daaruit volgt je kleurtype, met je beste kleuren. Dat profiel is gratis."], ["Wat krijg ik in de stijlgids?", "Al je 30 kleuren met namen, combinaties voor werk, weekend, date en feest, je basis (wit, donker, denim), je eerste vijf aankopen, een kast-check en de kleuren voor horloge, sieraden en make-up. Als PDF en op je telefoon."], ["Ken ik mijn kleurtype al?", "Dan kies je het zelf en ga je direct naar je kleuren en je stijlgids, zonder selfie."], ["Wat gebeurt er met mijn foto?", "Hij wordt niet naar ons gestuurd en nergens bewaard."]],
    final: { h2: ["Klaar om", "je kleuren", "te zien?"], sub: "Gratis, met één selfie. Kies je atelier." },
  },
};

type Dict = typeof nl;
const en: Dict = {
  nav: { colourAnalysis: "Colour analysis", contact: "Contact", how: "How it works", prices: "Prices", start: "Start free" },
  steps: { label: (n, of) => `Step ${n} of ${of}`, names: ["You", "Style", "Selfie", "Analysis", "Result"] },
  footer: { terms: "Terms", privacy: "Privacy", vat: "Prices include VAT" },
  switchTo: { kulort: "For men", nyanse: "For women" },
  home: {
    eyebrow: "Colour analysis from one selfie",
    h1: ["Your colours.", "Your wardrobe. Your guide."],
    sub: "Find out in a few minutes which colours suit you. Free, with one selfie. Choose your atelier:",
    doors: { kulort: ["For him", "First impression: sorted."], nyanse: ["For her", "Buy less, choose better."] },
    begin: "Start free",
    facts: (price) => ["Free colour profile", "Your photo is never stored", `Style guide from ${price}`, "Colour card in the post"],
    proof: { eyebrow: "The effect", h2: ["Same face.", "Different colour."], text: "A colour that suits you makes your skin look even and your eyes clear. A colour that doesn't draws attention away from your face. You see the difference at a glance, and after that you see it everywhere." },
    how: { eyebrow: "How it works", h2: ["Three steps.", "A wardrobe that works together."], steps: [["One selfie", "In daylight, no filter. A few minutes, no account needed."], ["Your colour profile", "Your colour type, your best colours and what to leave on the rack. Free."], ["Your style guide", "30 colours with names, outfits, your first five buys and a wardrobe check. As a PDF and on your phone."]] },
    band: ["Buy less.", "Choose better."],
    prices: {
      eyebrow: "What it costs", h2: ["Start free.", "Then choose what suits you."],
      tiers: [["Colour profile", "Free", "Your colour type, your place on the three scales and your 6 best colours."], ["Style guide", "", "All 30 colours, looks per occasion, your capsule and your wardrobe check. Instantly as a PDF."], ["Style guide + colour card", "", "Plus a sturdy card with your 8 key colours, for your wallet. Free delivery."], ["Personal colour advice", "", "A colour consultant looks at your photos and sends you a personal video. No appointment."]],
      badge: "Recommended", fine: "Prices include VAT. You only pay when you choose your style guide, after your free profile.",
    },
    seasons: { eyebrow: "Four seasons, twelve colour types", h2: ["Which season", "are you?"], names: [["Spring", "warm and clear"], ["Summer", "cool and soft"], ["Autumn", "warm and deep"], ["Winter", "cool and high-contrast"]], more: "All about colour analysis and the 12 colour types →" },
    faqTitle: "Questions",
    faq: [["How does it work?", "You take one selfie in daylight. The analysis runs on your phone and measures your undertone, depth and clarity. That gives your colour type, with your best colours. The profile is free."], ["What's in the style guide?", "All 30 of your colours with names, combinations for work, weekend, dates and parties, your basics (white, dark, denim), your first five buys, a wardrobe check and the colours for watch, jewellery and make-up. As a PDF and on your phone."], ["I already know my colour type?", "Then pick it yourself and go straight to your colours and your style guide, no selfie needed."], ["What happens to my photo?", "It's not sent to us and it's never stored."]],
    final: { h2: ["Ready to see", "your colours", "?"], sub: "Free, with one selfie. Choose your atelier." },
  },
};

export const UI = { nl, en } as const;
