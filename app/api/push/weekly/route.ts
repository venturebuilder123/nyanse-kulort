import { NextResponse } from "next/server";
import webpush from "web-push";
import { pushConfigured, pushStore } from "@/lib/push/store";
import { canSend, MIN_GAP_MS, weeklyMessage } from "@/lib/push/weekly";

// Weekly colour tip, called by Vercel Cron (vercel.json). Vercel sends
// "Authorization: Bearer $CRON_SECRET"; anything else is refused.
// Someone outside the daytime window now is simply picked up by a later run.

export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!pushConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT ?? "mailto:nyansekulort@gmail.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );

  const now = new Date();
  const rows = await pushStore.due(new Date(now.getTime() - MIN_GAP_MS));
  let sent = 0, skipped = 0, gone = 0, failed = 0;

  for (const row of rows) {
    const last = row.last_sent_at ? Date.parse(row.last_sent_at) : null;
    if (!canSend({ lastSentAt: last, timeZone: row.time_zone }, now)) {
      skipped++;
      continue;
    }
    const msg = weeklyMessage({ brand: row.brand, voice: row.voice, season: row.season }, now);
    try {
      await webpush.sendNotification(
        { endpoint: row.endpoint, keys: { p256dh: row.p256dh, auth: row.auth } },
        JSON.stringify({ ...msg, icon: `/icons/${row.brand}-192.png` }),
        { TTL: 60 * 60 * 12, urgency: "low" },
      );
      await pushStore.sent(row, now);
      sent++;
    } catch (e) {
      // 404/410: the browser dropped the subscription; delete it (no zombie data)
      const code = (e as { statusCode?: number }).statusCode;
      if (code === 404 || code === 410) {
        await pushStore.remove(row.endpoint);
        gone++;
      } else failed++;
    }
  }
  return NextResponse.json({ sent, skipped, gone, failed });
}
