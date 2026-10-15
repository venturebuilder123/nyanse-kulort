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
  await t.sendMail({ from: process.env.MAIL_FROM!, to, subject, text, html });
  return true;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** The mail after payment: one message, one button, the house style (BRANDBOOK §7). */
export function guideMail(o: { brand: string; tier: string; link: string }) {
  const name = o.brand === "kulort" ? "KULØRT" : "NYANSE";
  const pass = o.tier !== "digital";
  const text = [
    `Je betaling is binnen. Dank je wel.`,
    ``,
    `Open je persoonlijke stijlgids: ${o.link}`,
    pass ? `Je kleurenpas gaat binnen ±1 week op de post.` : ``,
    o.tier === "session" ? `We mailen je binnen twee werkdagen om je persoonlijke sessie in te plannen.` : ``,
    ``,
    `Bewaar deze mail: met de link open je je gids op elk apparaat.`,
    ``,
    `${name} · kulort-nyanse.com`,
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#F6F2EC;font-family:Helvetica,Arial,sans-serif;color:#141414">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px">
    <p style="font-family:Georgia,serif;font-size:18px;letter-spacing:.06em;margin:0 0 32px">KULØRT &nbsp;|&nbsp; NYANSE</p>
    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:34px;line-height:1.1;margin:0 0 16px">Je stijlgids <i>staat klaar.</i></h1>
    <p style="font-size:16px;line-height:1.55;color:#4a4540;margin:0 0 28px">Je betaling is binnen. Dank je wel.${pass ? " Je kleurenpas gaat binnen ±1 week op de post." : ""}${o.tier === "session" ? " We mailen je binnen twee werkdagen om je persoonlijke sessie in te plannen." : ""}</p>
    <a href="${esc(o.link)}" style="display:inline-block;background:#141414;color:#F6F2EC;text-decoration:none;padding:16px 26px;font-weight:700">Open mijn stijlgids</a>
    <p style="font-size:13px;color:#6F6862;margin:28px 0 0">Bewaar deze mail: met de link open je je gids op elk apparaat.</p>
    <p style="font-size:12px;color:#6F6862;margin:40px 0 0">${name} · kulort-nyanse.com</p>
  </div></body></html>`;
  return { subject: `Je ${name}-stijlgids staat klaar`, text, html };
}
