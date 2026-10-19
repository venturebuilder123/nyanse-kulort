import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { calendar } from "@/lib/social/calendar";
import { instagramConfigured, whoami } from "@/lib/social/instagram";
import { postSlot, states } from "@/lib/social/run";

// Founder only (proxy guards /api/lab): the calendar with its status, a connection check,
// "post now" for a test, and "skip" for a slot that should not go out.
export const maxDuration = 60;

export async function GET() {
  const st = supabaseConfigured() ? await states().catch(() => new Map()) : new Map();
  const account = instagramConfigured() ? await whoami().catch((e) => ({ error: String(e) })) : null;
  return NextResponse.json({
    configured: instagramConfigured(),
    account,
    slots: calendar().sort((a, b) => a.at.getTime() - b.at.getTime()).map((s) => ({ ...s, at: s.at.toISOString(), state: st.get(s.key) ?? null })),
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as { action?: string; slot?: string };
  const s = calendar().find((x) => x.key === b.slot);
  if (!s) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (b.action === "skip") {
    await supabaseRest("social_posts?on_conflict=slot", { method: "POST", body: JSON.stringify({ slot: s.key, status: "skipped", updated_at: new Date().toISOString() }), prefer: "resolution=merge-duplicates,return=minimal" });
    return NextResponse.json({ ok: true });
  }
  if (b.action === "unskip") {
    await supabaseRest(`social_posts?slot=eq.${encodeURIComponent(s.key)}`, { method: "DELETE" });
    return NextResponse.json({ ok: true });
  }
  if (b.action === "post") {
    if (!instagramConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
    return NextResponse.json(await postSlot(s));
  }
  return NextResponse.json({ error: "invalid" }, { status: 400 });
}
