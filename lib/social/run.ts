// Runs every hour (GitHub Actions → /api/cron/social): posts what is due and has not been posted,
// and on Sunday evening mails the founder what goes out the next day.
import { supabaseRest } from "@/lib/db/supabase";
import { mailConfigured, sendMail } from "@/lib/mail";
import { calendar, type Slot } from "./calendar";
import { instagramConfigured, publish } from "./instagram";

type Row = { slot: string; status: string; media_id: string | null; error: string | null };

export async function states(): Promise<Map<string, Row>> {
  const rows = (await (await supabaseRest("social_posts?select=slot,status,media_id,error")).json()) as Row[];
  return new Map(rows.map((r) => [r.slot, r]));
}
const save = (slot: string, status: string, extra: Partial<Row> = {}) =>
  supabaseRest("social_posts?on_conflict=slot", { method: "POST", body: JSON.stringify({ slot, status, ...extra, updated_at: new Date().toISOString() }), prefer: "resolution=merge-duplicates,return=minimal" });

export async function postSlot(s: Slot) {
  try {
    const id = await publish(s.kind, s.images, s.caption);
    await save(s.key, "published", { media_id: id, error: null });
    return { slot: s.key, ok: true, id };
  } catch (e) {
    await save(s.key, "failed", { error: String(e).slice(0, 300) });
    return { slot: s.key, ok: false, error: String(e) };
  }
}

export async function runSocial(now = new Date()) {
  if (!instagramConfigured()) return { skipped: "instagram not configured" };
  const done = await states();
  const out: unknown[] = [];
  for (const s of calendar()) {
    const st = done.get(s.key)?.status;
    // due, not handled, and not more than 2 days late (a late carousel looks odd; skip it then)
    if (s.at <= now && now.getTime() - s.at.getTime() < 48 * 3600e3 && st !== "published" && st !== "skipped" && st !== "failed") out.push(await postSlot(s));
  }
  // Sunday after 18:00 Amsterdam: preview of the next 24–48 hours, once
  const nextDay = calendar().filter((s) => s.at > now && s.at.getTime() - now.getTime() < 30 * 3600e3);
  const previewKey = `preview-${now.toISOString().slice(0, 10)}`;
  if (nextDay.length && !done.has(previewKey) && mailConfigured() && process.env.MAIL_TO_FOUNDER) {
    const list = nextDay.map((s) => `• ${s.at.toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam", weekday: "long", hour: "2-digit", minute: "2-digit" })}: ${s.kind === "carousel" ? "carrousel" : "beeld"}\n  ${s.images[0]}\n  ${s.caption.split("\n")[0]}`).join("\n\n");
    const text = `Morgen gaat dit automatisch online op Instagram:\n\n${list}\n\nNiet goed? Open /lab/social en klik op Overslaan.`;
    await sendMail(process.env.MAIL_TO_FOUNDER, "Morgen op Instagram", text, `<pre style="font-family:Helvetica,Arial,sans-serif;white-space:pre-wrap">${text.replace(/</g, "&lt;")}</pre>`).catch(() => false);
    await save(previewKey, "preview_sent");
  }
  return { posted: out };
}
