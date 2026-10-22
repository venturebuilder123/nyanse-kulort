// "Comment SEASON" → a DM with the free colour check (founder, 21 Oct 2026). Instagram's official
// private replies: one message per commenter, within 7 days of the comment, and only to people
// who asked for it by commenting the word. Each comment is handled once (social_posts, "dm-<id>").
import { commentsSince, privateReply, replyToComment, whoami } from "./instagram";

export const KEYWORD = /\b(season|seizoen)\b/i;
const LINK = (dutch: boolean) => `https://www.kulort-nyanse.com${dutch ? "" : "/en"}/kleuranalyse?utm_source=instagram&utm_medium=dm&utm_campaign=season`;
/** Dutch when the comment is: the reply follows the commenter's language. */
export const isDutch = (text: string) => /\b(seizoen|ik|ben|mijn|graag|wat|welk|jij|hoi)\b/i.test(text);
export const dmText = (dutch: boolean) =>
  dutch
    ? `Hoi! 💌 Hier is je gratis kleurcheck: één selfie, en binnen een minuut weet je je seizoen.\n${LINK(true)}`
    : `Hi! 💌 Here's your free colour check: one selfie, and you know your season in a minute.\n${LINK(false)}`;
export const publicText = (dutch: boolean) => (dutch ? "Staat in je DM 💌" : "Sent you a DM 💌");
/** While DMs are switched off in the app: point to the bio publicly, and send the DM once they work. */
export const bioText = (dutch: boolean) => (dutch ? "De gratis kleurcheck is de eerste link in onze bio 💌" : "The free colour check is the first link in our bio 💌");
/** Instagram's answer when "Allow access to messages" is off: not this comment's fault, so retry later. */
export const isDmSwitchedOff = (e: unknown) => /disabled access to Instagram Direct/i.test(String(e));

type Save = (slot: string, status: string, extra?: { error?: string | null; media_id?: string | null }) => Promise<unknown>;

export async function answerKeywordComments(now: Date, handled: (key: string) => boolean, save: Save) {
  // a little inside the 7-day window, so a reply never arrives just too late
  const since = new Date(now.getTime() - 6.5 * 864e5);
  const me = (await whoami()).username;
  const out: { comment: string; ok: boolean; error?: string }[] = [];
  for (const c of await commentsSince(since, 25)) {
    if (!KEYWORD.test(c.text) || c.username === me || handled(`dm-${c.id}`)) continue;
    const dutch = isDutch(c.text);
    const pointed = handled(`bio-${c.id}`);
    try {
      const id = await privateReply(c.id, dmText(dutch));
      // the public "sent you a DM" also shows others that the word works (not twice after the bio reply)
      if (!pointed) await replyToComment(c.id, publicText(dutch)).catch(() => "");
      await save(`dm-${c.id}`, "published", { media_id: id });
      out.push({ comment: c.id, ok: true });
    } catch (e) {
      if (isDmSwitchedOff(e)) {
        // DMs off in the app: answer publicly once, leave the DM open (retried every hour within 7 days)
        if (!pointed && (await replyToComment(c.id, bioText(dutch)).then(() => true).catch(() => false))) await save(`bio-${c.id}`, "published");
        out.push({ comment: c.id, ok: false, error: "dm switched off in the Instagram app" });
        continue;
      }
      await save(`dm-${c.id}`, "failed", { error: String(e).slice(0, 300) });
      out.push({ comment: c.id, ok: false, error: String(e) });
    }
  }
  return out;
}
