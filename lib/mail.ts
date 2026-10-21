// Server-only transactional mail via Brevo SMTP. Without the env vars mail is skipped (logged),
// never a crash: the founder can still send the guide link by hand from /lab/orders.
import nodemailer from "nodemailer";

export const mailConfigured = () => !!(process.env.BREVO_SMTP_USER && process.env.BREVO_SMTP_KEY && process.env.MAIL_FROM);

export async function sendMail(to: string, subject: string, text: string, html: string): Promise<boolean> {
  if (!mailConfigured()) return false;
  const t = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: { user: process.env.BREVO_SMTP_USER!, pass: process.env.BREVO_SMTP_KEY! },
  });
  // replies go to the inbox the founder (and later the assistant) reads; hi@ has no mailbox
  const replyTo = process.env.MAIL_REPLY_TO || process.env.MAIL_TO_FOUNDER || undefined;
  await t.sendMail({ from: process.env.MAIL_FROM!, to, subject, text, html, ...(replyTo ? { replyTo } : {}) });
  return true;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

const shell = (h1: string, body: string, cta: string, link: string, note: string, name: string) => `<!doctype html><html><body style="margin:0;background:#F6F2EC;font-family:Helvetica,Arial,sans-serif;color:#141414">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px">
    <p style="font-family:Georgia,serif;font-size:18px;letter-spacing:.06em;margin:0 0 32px">KULØRT &nbsp;|&nbsp; NYANSE</p>
    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:34px;line-height:1.1;margin:0 0 16px">${h1}</h1>
    <p style="font-size:16px;line-height:1.55;color:#4a4540;margin:0 0 28px">${body}</p>
    <a href="${esc(link)}" style="display:inline-block;background:#141414;color:#F6F2EC;text-decoration:none;padding:16px 26px;font-weight:700">${cta}</a>
    ${note ? `<p style="font-size:13px;color:#6F6862;margin:28px 0 0">${note}</p>` : ""}
    <p style="font-size:12px;color:#6F6862;margin:40px 0 0">${name} · kulort-nyanse.com</p>
  </div></body></html>`;

// the mails in the customer's language (founder, 21 Oct 2026); the language comes with the order
const MAIL = {
  nl: {
    paid: "Je betaling is binnen. Dank je wel.", open: "Open je persoonlijke stijlgids:", card: "Je kleurenpas gaat binnen ±1 week op de post.",
    session: "Voor je persoonlijke kleuradvies: beantwoord deze mail met 3 foto's bij daglicht, zonder filter: je gezicht zonder make-up, en 2 kledingstukken waar je over twijfelt (onder je kin). Binnen 3 werkdagen na je foto's krijg je een persoonlijke video van onze kleurconsulent.",
    keep: "Bewaar deze mail: met de link open je je gids op elk apparaat.", h1: "Je stijlgids <i>staat klaar.</i>", cta: "Open mijn stijlgids", subject: (n: string) => `Je ${n}-stijlgids staat klaar`,
    shipped: "Je kleurenpas is onderweg. Meestal ligt hij binnen een paar werkdagen in je brievenbus.", stays: "Je stijlgids blijft hier:", tip: "Tip: bewaar de pas in je portemonnee en houd hem in de winkel naast een kledingstuk.",
    shippedH1: "Je kleurenpas <i>is onderweg.</i>", shippedBody: "Meestal ligt hij binnen een paar werkdagen in je brievenbus. Bewaar hem in je portemonnee en houd hem in de winkel naast een kledingstuk.", shippedSubject: (n: string) => `Je ${n}-kleurenpas is onderweg`,
  },
  en: {
    paid: "Your payment is in. Thank you.", open: "Open your personal style guide:", card: "Your colour card goes in the post within about a week.",
    session: "For your personal colour advice: reply to this e-mail with 3 photos in daylight, without a filter: your face without make-up, and 2 pieces of clothing you're unsure about (under your chin). Within 3 working days of your photos you'll get a personal video from our colour consultant.",
    keep: "Keep this e-mail: the link opens your guide on any device.", h1: "Your style guide <i>is ready.</i>", cta: "Open my style guide", subject: (n: string) => `Your ${n} style guide is ready`,
    shipped: "Your colour card is on its way. It usually arrives within a few working days.", stays: "Your style guide stays here:", tip: "Tip: keep the card in your wallet and hold it next to a garment in the shop.",
    shippedH1: "Your colour card <i>is on its way.</i>", shippedBody: "It usually arrives within a few working days. Keep it in your wallet and hold it next to a garment in the shop.", shippedSubject: (n: string) => `Your ${n} colour card is on its way`,
  },
} as const;

/** The mail after payment: one message, one button, the house style (BRANDBOOK §7). */
export function guideMail(o: { brand: string; tier: string; link: string; locale?: "nl" | "en" }) {
  const M = MAIL[o.locale ?? "nl"];
  const name = o.brand === "kulort" ? "KULØRT" : "NYANSE";
  const pass = o.tier !== "digital";
  const text = [M.paid, ``, `${M.open} ${o.link}`, pass ? M.card : ``, o.tier === "session" ? M.session : ``, ``, M.keep, ``, `${name} · kulort-nyanse.com`]
    .filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
  const body = `${M.paid}${pass ? ` ${M.card}` : ""}${o.tier === "session" ? ` ${M.session}` : ""}`;
  return { subject: M.subject(name), text, html: shell(M.h1, body, M.cta, o.link, M.keep, name) };
}

/** "Je pas is onderweg": when the founder marks the colour card as shipped (CLAUDE.md §7). */
export function shippedMail(o: { brand: string; link: string; locale?: "nl" | "en" }) {
  const M = MAIL[o.locale ?? "nl"];
  const name = o.brand === "kulort" ? "KULØRT" : "NYANSE";
  const text = [M.shipped, ``, `${M.stays} ${o.link}`, ``, M.tip, ``, `${name} · kulort-nyanse.com`].join("\n");
  return { subject: M.shippedSubject(name), text, html: shell(M.shippedH1, M.shippedBody, M.cta, o.link, "", name) };
}
