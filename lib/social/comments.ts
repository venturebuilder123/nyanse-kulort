// The morning comment digest (founder, 19 Oct 2026): every morning one mail with yesterday's new
// Instagram comments and a suggested reply for each. Nothing is posted automatically: automated
// replies read as spam and cost reach. The founder copies a reply, or doesn't.

import { supabaseRest } from "@/lib/db/supabase";
import { sendMail } from "@/lib/mail";
import { commentsSince, type IgComment } from "./instagram";

// a short reply needs no large model: Haiku keeps it to cents a month (CLAUDE_MODEL stays for the analysis)
const MODEL = () => process.env.COMMENT_MODEL ?? "claude-haiku-5-5";

/** One short reply in the house voice, in the language of the comment. Falls back to no draft. */
async function draft(c: IgComment): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL(),
      max_tokens: 200,
      system:
        "You write short Instagram replies for KULØRT · NYANSE, a personal colour analysis brand (KULØRT for men, NYANSE for women). " +
        "Warm, calm, helpful, never pushy. Reply in the language of the comment. One or two sentences, at most one emoji. " +
        "Answer colour questions concretely (undertone, depth, clarity, seasons). Mention the free colour check (link in bio) only when it truly helps. " +
        "Never comment on someone's looks negatively, never promise results, never invent facts or numbers. " +
        "If the comment is spam, rude or needs no answer, reply with exactly: (geen antwoord nodig)",
      messages: [{ role: "user", content: `Post: ${c.media.caption ?? ""}\nComment by @${c.username ?? "someone"}: ${c.text}\n\nWrite the reply only.` }],
    }),
  }).catch(() => null);
  if (!res?.ok) return null;
  const j = (await res.json().catch(() => null)) as { content?: { type: string; text?: string }[] } | null;
  return j?.content?.find((b) => b.type === "text")?.text?.trim() ?? null;
}

const esc = (s: string) => s.replace(/[&<>]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[ch]!);

/** Runs with the hourly cron; sends at most one digest per day, after 08:00 Amsterdam. */
export async function morningDigest(now = new Date()): Promise<string> {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", hour12: false }).format(now));
  if (hour < 8 || !process.env.MAIL_TO_FOUNDER) return "not now";
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(now);
  const st = ((await (await supabaseRest("app_settings?key=in.(ig_digest_day,ig_digest_since)&select=key,value")).json()) as { key: string; value: string }[]);
  if (st.find((r) => r.key === "ig_digest_day")?.value === today) return "already sent";
  const since = new Date(st.find((r) => r.key === "ig_digest_since")?.value ?? Date.now() - 864e5);
  const comments = await commentsSince(since);
  const save = (key: string, value: string) => supabaseRest("app_settings?on_conflict=key", { method: "POST", body: JSON.stringify({ key, value, updated_at: now.toISOString() }), prefer: "resolution=merge-duplicates,return=minimal" });
  await save("ig_digest_day", today);
  await save("ig_digest_since", now.toISOString());
  if (!comments.length) return "no new comments";
  const rows = await Promise.all(comments.slice(0, 30).map(async (c) => ({ c, d: await draft(c) })));
  const text = rows.map(({ c, d }) => `@${c.username ?? "?"} op "${c.media.caption ?? "post"}":\n"${c.text}"\nVoorstel: ${d ?? "(geen voorstel)"}\n${c.media.permalink ?? ""}`).join("\n\n");
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#141414">
    <p style="font-family:Georgia,serif;font-size:18px;letter-spacing:.06em">KULØRT | NYANSE</p>
    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px">${comments.length} nieuwe reactie${comments.length === 1 ? "" : "s"} op Instagram</h1>
    ${rows.map(({ c, d }) => `<div style="border-top:1px solid #ddd;padding:14px 0"><div style="font-size:13px;color:#6F6862">@${esc(c.username ?? "?")} · ${esc(c.media.caption ?? "post")}</div><p style="font-size:16px;margin:6px 0">${esc(c.text)}</p><p style="font-size:15px;margin:6px 0;background:#F6F2EC;padding:10px"><b>Voorstel:</b> ${esc(d ?? "(geen voorstel)")}</p>${c.media.permalink ? `<a href="${c.media.permalink}" style="font-size:13px">Open de post →</a>` : ""}</div>`).join("")}
    <p style="font-size:12px;color:#6F6862;margin-top:20px">Niets is automatisch geplaatst. Kopieer een voorstel als het goed is, of laat het.</p></div>`;
  await sendMail(process.env.MAIL_TO_FOUNDER, `Instagram: ${comments.length} nieuwe reactie${comments.length === 1 ? "" : "s"}`, text, html);
  return `sent ${comments.length}`;
}
