import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { matchProducts, type Candidate } from "@/lib/catalog/match";
import { CATEGORIES } from "@/lib/catalog/normalize";

// Products in your colours for the guide (CLAUDE.md §7): your palette in, the closest products out,
// filtered on gender (brand), budget and, when chosen, your shops. Only numbers and hex codes come in.
const BUDGET: Record<string, [number, number]> = { low: [0, 30], mid: [25, 85], high: [75, 100000] };
const HEX = /^#[0-9a-f]{6}$/i;

export async function POST(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ products: [] });
  const b = (await req.json().catch(() => ({}))) as { brand?: string; palette?: { name?: string; hex?: string }[]; avoid?: string[]; budget?: string; shops?: string[] };
  const palette = (b.palette ?? []).filter((c) => c && HEX.test(c.hex ?? "")).slice(0, 40).map((c) => ({ name: String(c.name ?? "").slice(0, 40), hex: c.hex! }));
  if (!palette.length) return NextResponse.json({ products: [] });
  const avoid = (b.avoid ?? []).filter((h) => HEX.test(h)).slice(0, 8);
  const genders = b.brand === "kulort" ? "(men,unisex)" : "(women,unisex)";
  const [lo, hi] = BUDGET[b.budget ?? ""] ?? [0, 100000];
  const q = `products?hex=not.is.null&in_stock=is.true&gender=in.${genders}&price=gte.${lo}&price=lte.${hi}&select=id,shop,title,image_url,price,old_price,category,lab_l,lab_a,lab_b&limit=4000`;
  // before migration 0007 (or if the database hiccups): no products, never an error page
  let rows = ((await supabaseRest(q).then((r) => r.json()).catch(() => [])) ?? []) as Candidate[];
  const shops = (b.shops ?? []).filter((s) => typeof s === "string").slice(0, 12);
  // prefer the shops someone chose, but never show an empty page because of it
  if (shops.length) {
    const mine = rows.filter((r) => shops.includes(r.shop));
    if (mine.length >= 12) rows = mine;
  }
  const matches = matchProducts(rows.filter((r) => (CATEGORIES as readonly string[]).includes(r.category)), palette, avoid, 4);
  return NextResponse.json(
    { products: matches.map(({ lab_l, lab_a, lab_b, ...m }) => m) },
    { headers: { "Cache-Control": "private, max-age=600" } },
  );
}
