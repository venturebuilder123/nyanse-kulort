import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/db/supabase";
import { activeFeeds, importFeed, tagBatch } from "@/lib/catalog/server";

// The catalogue keeps itself up to date (CLAUDE.md §7):
//   Vercel Cron, daily:        /api/cron/catalog            (import every feed, then tag)
//   GitHub Actions, hourly:    /api/cron/catalog?step=tag   (colour-tag what is new)
// Both send "Authorization: Bearer $CRON_SECRET"; anything else is refused.
export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const t0 = Date.now();
  const step = new URL(req.url).searchParams.get("step") ?? "all";
  const imported: Record<string, unknown> = {};
  if (step === "all" || step === "import") {
    for (const f of await activeFeeds()) {
      if (Date.now() - t0 > 35000) { imported[f.shop] = "skipped: time"; continue; }
      imported[f.shop] = await importFeed(f).catch((e) => `error: ${String(e).slice(0, 120)}`);
    }
  }
  const tagged = step === "import" ? null : await tagBatch(150, Math.max(5000, 52000 - (Date.now() - t0)));
  return NextResponse.json({ ok: true, imported, tagged, ms: Date.now() - t0 });
}
