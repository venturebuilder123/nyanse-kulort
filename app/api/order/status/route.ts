import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";

// The guide's gate: is this order paid? Only with the order's own secret; the profile (numbers
// only) comes back once paid, so the guide opens on any device.
export async function GET(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const u = new URL(req.url);
  const ref = u.searchParams.get("ref") ?? "";
  const k = u.searchParams.get("k") ?? "";
  if (!/^KN-[A-HJ-NP-Z2-9]{6}$/.test(ref) || !/^[A-Za-z0-9_-]{20,40}$/.test(k)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const res = await supabaseRest(`orders?select=status,tier,brand,profile&ref=eq.${ref}&secret=eq.${encodeURIComponent(k)}&limit=1`);
  const [o] = (await res.json()) as { status: string; tier: string; brand: string; profile: unknown }[];
  if (!o) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const paid = ["paid", "shipped", "done"].includes(o.status);
  return NextResponse.json(
    { status: o.status, paid, tier: o.tier, brand: o.brand, profile: paid ? o.profile : null },
    { headers: { "Cache-Control": "no-store" } },
  );
}
