import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";

// Outbound product links go through here: one place to count affiliate clicks (CLAUDE.md §10,
// affiliate_click per shop) without personal data, then straight on to the shop's tracking link.
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const home = new URL("/", req.url);
  if (!/^\d{1,12}$/.test(id) || !supabaseConfigured()) return NextResponse.redirect(home);
  const [p] = (await (await supabaseRest(`products?id=eq.${id}&select=url,shop,category,gender`)).json()) as { url: string; shop: string; category: string; gender: string | null }[];
  if (!p || !/^https?:\/\//.test(p.url)) return NextResponse.redirect(home);
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (key) {
    await fetch(`${process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com"}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: key, event: "affiliate_click", distinct_id: `go-${id}`, properties: { shop: p.shop, category: p.category, brand: p.gender === "men" ? "kulort" : "nyanse", $process_person_profile: false } }),
      signal: AbortSignal.timeout(1500),
    }).catch(() => {});
  }
  return NextResponse.redirect(p.url, { status: 302, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
}
