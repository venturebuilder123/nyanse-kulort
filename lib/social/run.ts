// Runs every hour (GitHub Actions → /api/cron/social): posts what is due and has not been posted
// (Instagram, and YouTube Shorts once connected), and the day before mails the founder what goes out.
import { supabaseRest } from "@/lib/db/supabase";
import { mailConfigured, sendMail } from "@/lib/mail";
import { calendar, type Slot } from "./calendar";
import { containerState, instagramConfigured, publish, publishContainer, refreshToken } from "./instagram";
import { morningDigest } from "./comments";
import { uploadShort, youtubeConfigured } from "./youtube";

/** A slot only runs when its platform is connected; the other platform's slots just wait. */
export const platformReady = (s: Slot) => (s.kind === "short" ? youtubeConfigured() : instagramConfigured());

type Row = { slot: string; status: string; media_id: string | null; error: string | null };

export async function states(): Promise<Map<string, Row>> {
  const rows = (await (await supabaseRest("social_posts?select=slot,status,media_id,error")).json()) as Row[];
  return new Map(rows.map((r) => [r.slot, r]));
}
const save = (slot: string, status: string, extra: Partial<Row> = {}) =>
  supabaseRest("social_posts?on_conflict=slot", { method: "POST", body: JSON.stringify({ slot, status, ...extra, updated_at: new Date().toISOString() }), prefer: "resolution=merge-duplicates,return=minimal" });

export async function postSlot(s: Slot) {
  try {
    if (s.kind === "short") {
      const id = await uploadShort(s.images[0]!, { title: s.title ?? s.caption.split("\n")[0]!, description: s.caption, tags: s.tags ?? [] });
      await save(s.key, "published", { media_id: id, error: null });
      return { slot: s.key, ok: true, id };
    }
    const r = await publish(s.kind, s.images, s.caption);
    if ("pending" in r) {
      // a reel still being processed by Instagram: the container id waits in media_id for the next run
      await save(s.key, "processing", { media_id: r.pending, error: null });
      return { slot: s.key, ok: true, pending: r.pending };
    }
    await save(s.key, "published", { media_id: r.id, error: null });
    return { slot: s.key, ok: true, id: r.id };
  } catch (e) {
    await save(s.key, "failed", { error: String(e).slice(0, 300) });
    return { slot: s.key, ok: false, error: String(e) };
  }
}

export async function runSocial(now = new Date()) {
  if (!instagramConfigured() && !youtubeConfigured()) return { skipped: "no platform configured" };
  const token = instagramConfigured() ? await refreshToken().catch((e) => `refresh error: ${String(e)}`) : "instagram off";
  const done = await states();
  const out: unknown[] = [];
  for (const s of calendar()) {
    if (!platformReady(s)) continue;
    const row = done.get(s.key);
    const st = row?.status;
    if (st === "processing" && row?.media_id) {
      const c = await containerState(row.media_id).catch(() => "ERROR" as const);
      if (c === "FINISHED") {
        const id = await publishContainer(row.media_id).catch((e) => { out.push({ slot: s.key, ok: false, error: String(e) }); return null; });
        await save(s.key, id ? "published" : "failed", id ? { media_id: id } : { error: "publish after processing failed" });
        if (id) out.push({ slot: s.key, ok: true, id });
      } else if (c !== "IN_PROGRESS") await save(s.key, "failed", { error: `container ${c}` });
      continue;
    }
    // due, not handled, and not more than 2 days late (a late carousel looks odd; skip it then)
    if (s.at <= now && now.getTime() - s.at.getTime() < 48 * 3600e3 && st !== "published" && st !== "skipped" && st !== "failed") out.push(await postSlot(s));
  }
  // the day before a post: a preview mail to the founder, once per day
  const nextDay = calendar().filter((s) => platformReady(s) && s.at > now && s.at.getTime() - now.getTime() < 30 * 3600e3);
  const previewKey = `preview-${now.toISOString().slice(0, 10)}`;
  if (nextDay.length && !done.has(previewKey) && mailConfigured() && process.env.MAIL_TO_FOUNDER) {
    const list = nextDay.map((s) => `• ${s.at.toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam", weekday: "long", hour: "2-digit", minute: "2-digit" })}: ${s.kind === "carousel" ? "carrousel" : s.kind === "reel" ? "reel (video)" : s.kind === "short" ? "YouTube Short" : "beeld"}\n  ${s.images[0]}\n  ${s.caption.split("\n")[0]}`).join("\n\n");
    const text = `Morgen gaat dit automatisch online:\n\n${list}\n\nNiet goed? Open /lab/social en klik op Overslaan.`;
    await sendMail(process.env.MAIL_TO_FOUNDER, "Morgen op social", text, `<pre style="font-family:Helvetica,Arial,sans-serif;white-space:pre-wrap">${text.replace(/</g, "&lt;")}</pre>`).catch(() => false);
    await save(previewKey, "preview_sent");
  }
  const digest = mailConfigured() && instagramConfigured() ? await morningDigest(now).catch((e) => `digest error: ${String(e).slice(0, 120)}`) : "mail off";
  return { posted: out, token, digest };
}
