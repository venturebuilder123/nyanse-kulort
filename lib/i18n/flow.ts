// Fixed words of the customer flow that are not voice copy (founder, 21 Oct 2026: English for EU
// customers now; German, Spanish and French later). Voice copy lives in lib/brand; the guide in
// app/(flow)/gids; this is the rest, one object per language with the same shape.
import type { Locale } from "./locale";

const nl = {
  noAnalysis: "Nog geen analyse.", toSelfie: "Naar de selfie", openGuide: "Open mijn stijlgids", wait: "Even geduld…", checking: "Even kijken…",
  scaleEnds: { cool: "koel", warm: "warm", light: "licht", deep: "diep", soft: "zacht", clear: "helder" },
  result: {
    girlDigital: (price: string, per: string) => `Girl math: ${price} voor 30 kleuren = ${per} per kleur.`,
    girlCard: (extra: string, per: string) => `Girl math: ${extra} extra voor een pas die altijd mee shopt. Tien keer shoppen = ${per} per keer.`,
    girlSession: "Girl math: een eigen kleurconsulent, zonder afspraak en zonder reistijd.",
    declared: (s: string) => `Je koos zelf ${s}. Zeker weten? Met een selfie checken we het gratis, en je foto verlaat je telefoon niet.`, checkSelfie: "Check met een selfie →",
    ownPick: "Eigen opgave", all30: "Jouw 30 kleuren", first6: "Je eerste 6 kleuren, van ons cadeau",
    wardrobe: "Je kast, in jouw kleuren", wornAlt: (s: string) => `Een outfit in de kleuren van ${s}`, worn: (s: string) => `${s}, gedragen: zo ziet jouw kleurfamilie eruit van top tot schoen.`,
    combine: "30 kleuren die allemaal met elkaar combineren: alles in je kast past bij alles. Zo ziet dat eruit.",
    more: (n: number, list: string) => `+${n} looks voor ${list}, plus je capsule-garderobe, in je gids`, and: "en", lookIn: (t: string) => `Look ${t}: staat in je stijlgids`,
  },
  checkout: {
    failed: "Dat lukte nu niet. Probeer het nog eens, of mail ons via de contactpagina.",
    transferTitle: (a: string) => `Betaal ${a} per bankoverschrijving`, transferText: "Open je bank-app, kies Overmaken en kopieer deze gegevens. Vermeld het kenmerk, dan koppelen we je betaling direct.",
    copied: "Gekopieerd", copy: "Kopieer", afterTransfer: "Zodra je overschrijving binnen is, krijg je een mail met de link naar je stijlgids.", sessionPhotos: " Daarna vragen we je per mail om 3 foto's voor je persoonlijke advies.",
    free: "Gratis", where: "Waar sturen we je stijlgids heen?",
    codeDigitalOnly: "Deze code geldt alleen voor de digitale gids.", codeUsed: "Deze code is al gebruikt.", codeUnknown: "Deze code kennen we niet.",
    codePh: "Kortingscode", apply: "Toepassen", haveCode: "Heb je een kortingscode?", toPay: (a: string) => `Naar betalen · ${a}`,
    amount: "Bedrag", to: "Naar", reference: "Kenmerk", iPaid: "Ik heb betaald", cardPost: " Je kleurenpas gaat dan op de post.",
  },
  done: {
    thanks: "Dank je wel.", checkingPay: "We controleren je betaling.", seconds: "Dit duurt meestal een paar seconden. Deze pagina opent je stijlgids vanzelf, en je krijgt de link ook per mail.",
    failedQ: "Betaling afgebroken of niet gelukt?", retry: "Opnieuw betalen",
    transfer: "Zodra je overschrijving binnen is (meestal dezelfde of de volgende werkdag), krijg je een mail met de link naar je stijlgids. Deze pagina opent hem ook vanzelf.",
    noRef: "Overgemaakt zonder het kenmerk in de omschrijving? Mail ons via de contactpagina, dan zoeken we het op.",
    card: (when: string) => `Je kleurenpas gaat ${when} op de post. Je krijgt een mail als hij onderweg is.`,
    session: "Voor je persoonlijke advies: beantwoord de mail die je net kreeg met 3 foto's bij daglicht. Binnen 3 werkdagen krijg je je video.",
    mailed: "We hebben de link ook gemaild, zodat je je gids op elk apparaat opent. Niet gezien? Kijk bij Reclame of Spam.", homeTip: "Tip: zet je gids op je beginscherm via Delen › Zet op beginscherm.",
    none: "Geen bestelling gevonden.", noneText: "Open de link uit je bevestigingsmail, of kies je stijlgids op je resultaatpagina.",
    paid: "Betaald", ordered: "Besteld", orderNo: (r: string) => `Bestelnummer ${r}`, ready: "Je stijlgids", readyEm: "staat klaar.", toResult: "Naar mijn resultaat", dateLocale: "nl-NL",
  },
  mirror: { good: "laat het gezicht oplichten", bad: "trekt de aandacht weg: laat hangen", pick: "Kies een kleur", legendGood: "Kleuren die je goed staan", legendBad: "Minder mooi bij je gezicht" },
  selfie: { qrAlt: "QR-code naar deze pagina op je telefoon", privacy: "De analyse draait op je eigen telefoon. Wij ontvangen je foto niet, bewaren hem niet en delen hem met niemand. Je profiel bestaat alleen uit getallen en verwijder je met één tik.", privacyLink: "Privacyverklaring" },
  error: { title: "Er ging iets mis.", text: "Je foto is nergens heen gestuurd. Probeer het nog een keer.", again: "Opnieuw", home: "Naar het begin" },
  known: { title: ["Welk kleurtype", "ben jij?"] as [string, string], sub: "Kies je type, dan zie je meteen je kleuren, je look en wat je gids je geeft.", doubt: "Twijfel je?", selfie: "Doe de gratis selfie", doubtRest: ": in 30 seconden weet je het, en je foto verlaat je telefoon niet." },
  reveal: { scales: "Zo ben je opgebouwd", season: "Je seizoen", exactType: "Je precieze kleurtype", named: (f: string) => `Vaak genoemd als ${f}:` },
  deck: { more: (n: number) => `+${n} kleuren met naam in je gids`, moreAria: (n: number) => `Nog ${n} kleuren met naam in je stijlgids` },
  email: { meant: (s: string) => `Bedoel je ${s}?`, privacy: "Zo gaan we met je gegevens om" },
  landing: { knownShort: "Ik ken mijn kleurprofiel al", next: "Verder", pick: "Kies één of meer", known: "Ken je je kleurtype al? Kies het en ga direct naar je stijlgids →" },
  sections: {
    proofAlt: (men: boolean): string => (men ? "Dezelfde man met een tomaatrode en een indigo doek" : "Dezelfde vrouw met een koningsblauwe en een zacht petrol doek"),
    proofCap: "Eén doek onder de kin, een heel ander effect.", try: "Probeer het zelf: tik op een kleur",
    free: "Gratis", from: (p: string) => `Vanaf ${p}`, withCard: (p: string) => `Met de pas ${p}`,
    final: (d: string, c: string) => `Je kleurprofiel is gratis. Je persoonlijke stijlgids vanaf ${d}, met kleurenpas ${c}.`,
    fromGuide: (t: string) => `Uit een stijlgids · ${t}`, lookText: "Elke look in je eigen kleuren, met kleding die je echt kunt kopen. Alles combineert met alles.",
  },
  split: { atelierAlt: "Twee klanten in het atelier houden een stofstaal in hun kleur onder hun kin" },
};

type FlowText = typeof nl;

const en: FlowText = {
  noAnalysis: "No analysis yet.", toSelfie: "Go to the selfie", openGuide: "Open my style guide", wait: "One moment…", checking: "Checking…",
  scaleEnds: { cool: "cool", warm: "warm", light: "light", deep: "deep", soft: "soft", clear: "clear" },
  result: {
    girlDigital: (price, per) => `Girl math: ${price} for 30 colours = ${per} per colour.`,
    girlCard: (extra, per) => `Girl math: ${extra} extra for a card that shops with you. Ten shopping trips = ${per} per trip.`,
    girlSession: "Girl math: your own colour consultant, no appointment and no travel time.",
    declared: (s) => `You picked ${s} yourself. Sure? A selfie checks it for free, and your photo never leaves your phone.`, checkSelfie: "Check with a selfie →",
    ownPick: "Your own pick", all30: "Your 30 colours", first6: "Your first 6 colours, on us",
    wardrobe: "Your wardrobe, in your colours", wornAlt: (s) => `An outfit in the colours of ${s}`, worn: (s) => `${s}, worn: this is your colour family from top to toe.`,
    combine: "30 colours that all combine with each other: everything in your wardrobe goes with everything. This is what it looks like.",
    more: (n, list) => `+${n} looks for ${list}, plus your capsule wardrobe, in your guide`, and: "and", lookIn: (t) => `Look ${t}: in your style guide`,
  },
  checkout: {
    failed: "That didn't work right now. Please try again, or e-mail us via the contact page.",
    transferTitle: (a) => `Pay ${a} by bank transfer`, transferText: "Open your banking app, choose Transfer and copy these details. Include the reference so we can match your payment straight away.",
    copied: "Copied", copy: "Copy", afterTransfer: "As soon as your transfer arrives, you'll get an e-mail with the link to your style guide.", sessionPhotos: " After that we'll ask you by e-mail for 3 photos for your personal advice.",
    free: "Free", where: "Where shall we send your style guide?",
    codeDigitalOnly: "This code is only valid for the digital guide.", codeUsed: "This code has already been used.", codeUnknown: "We don't know this code.",
    codePh: "Discount code", apply: "Apply", haveCode: "Have a discount code?", toPay: (a) => `Continue to payment · ${a}`,
    amount: "Amount", to: "To", reference: "Reference", iPaid: "I've paid", cardPost: " Your colour card then goes in the post.",
  },
  done: {
    thanks: "Thank you.", checkingPay: "We're checking your payment.", seconds: "This usually takes a few seconds. This page opens your style guide by itself, and you'll get the link by e-mail too.",
    failedQ: "Payment cancelled or failed?", retry: "Pay again",
    transfer: "As soon as your transfer arrives (usually the same or the next working day), you'll get an e-mail with the link to your style guide. This page opens it by itself too.",
    noRef: "Transferred without the reference? E-mail us via the contact page and we'll look it up.",
    card: (when) => `Your colour card goes in the post ${when}. You'll get an e-mail when it's on its way.`,
    session: "For your personal advice: reply to the e-mail you just received with 3 photos in daylight. You'll get your video within 3 working days.",
    mailed: "We've e-mailed the link too, so you can open your guide on any device. Not there? Check your spam folder.", homeTip: "Tip: put your guide on your home screen via Share › Add to Home Screen.",
    none: "No order found.", noneText: "Open the link from your confirmation e-mail, or choose your style guide on your result page.",
    paid: "Paid", ordered: "Ordered", orderNo: (r) => `Order number ${r}`, ready: "Your style guide", readyEm: "is ready.", toResult: "Go to my result", dateLocale: "en-GB",
  },
  mirror: { good: "makes the face light up", bad: "pulls attention away: leave it", pick: "Choose a colour", legendGood: "Colours that suit you", legendBad: "Less flattering near your face" },
  selfie: { qrAlt: "QR code to this page on your phone", privacy: "The analysis runs on your own phone. We don't receive your photo, don't store it and don't share it with anyone. Your profile is just numbers, and you delete it with one tap.", privacyLink: "Privacy statement" },
  error: { title: "Something went wrong.", text: "Your photo wasn't sent anywhere. Please try again.", again: "Try again", home: "Back to the start" },
  known: { title: ["Which colour type", "are you?"], sub: "Choose your type and you'll see your colours, your look and what your guide gives you straight away.", doubt: "Not sure?", selfie: "Take the free selfie", doubtRest: ": you'll know in 30 seconds, and your photo never leaves your phone." },
  reveal: { scales: "How you're built", season: "Your season", exactType: "Your exact colour type", named: (f) => `Often named as ${f}:` },
  deck: { more: (n) => `+${n} named colours in your guide`, moreAria: (n) => `${n} more named colours in your style guide` },
  email: { meant: (s) => `Did you mean ${s}?`, privacy: "How we handle your data" },
  landing: { knownShort: "I already know my colour profile", next: "Next", pick: "Choose one or more", known: "Already know your colour type? Pick it and go straight to your style guide →" },
  sections: {
    proofAlt: (men) => (men ? "The same man in a tomato red and an indigo drape" : "The same woman in a royal blue and a soft teal drape"),
    proofCap: "One drape under the chin, a completely different effect.", try: "Try it yourself: tap a colour",
    free: "Free", from: (p) => `From ${p}`, withCard: (p) => `With the card ${p}`,
    final: (d, c) => `Your colour profile is free. Your personal style guide from ${d}, with a colour card ${c}.`,
    fromGuide: (t) => `From a style guide · ${t}`, lookText: "Every look in your own colours, with clothes you can actually buy. Everything goes with everything.",
  },
  split: { atelierAlt: "Two customers in the atelier hold a fabric swatch in their colour under their chin" },
};

export const FLOW: Record<Locale, FlowText> = { nl, en };
