import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";

// Shops that really are in the catalogue for this brand (CLAUDE.md §6: only real shops in the flow).
export async function GET(req: Request) {
  const brand = new URL(req.url).searchParams.get("brand") === "kulort" ? "kulort" : "nyanse";
  if (!supabaseConfigured()) return NextResponse.json({ shops: [] });
  const rows = (await (await supabaseRest(`feeds?active=eq.true&last_count=gt.0&brands=cs.{${brand}}&select=shop&order=shop`)).json()) as { shop: string }[];
  return NextResponse.json({ shops: [...new Set(rows.map((r) => r.shop))] }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
