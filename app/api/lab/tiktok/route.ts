import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { states } from "@/lib/social/run";
import { tiktokPosts } from "@/lib/social/tiktok";

// Founder only (proxy guards /api/lab): the TikTok list and a "posted" tick per video.
export async function GET() {
  const st = supabaseConfigured() ? await states().catch(() => new Map()) : new Map();
  return NextResponse.json({ posts: tiktokPosts().map((p) => ({ ...p, posted: st.get(p.key)?.status === "published" })) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const b = (await req.json().catch(() => ({}))) as { key?: string; posted?: boolean };
  const p = tiktokPosts().find((x) => x.key === b.key);
  if (!p) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (b.posted) await supabaseRest("social_posts?on_conflict=slot", { method: "POST", body: JSON.stringify({ slot: p.key, status: "published", media_id: "manual", error: null, updated_at: new Date().toISOString() }), prefer: "resolution=merge-duplicates,return=minimal" });
  else await supabaseRest(`social_posts?slot=eq.${encodeURIComponent(p.key)}`, { method: "DELETE" });
  return NextResponse.json({ ok: true });
}
