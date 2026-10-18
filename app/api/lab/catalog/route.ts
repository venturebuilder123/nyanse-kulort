import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { importFeed, tagBatch, type Feed } from "@/lib/catalog/server";

// Founder only (proxy.ts guards /api/lab). Manage the feeds and run the jobs by hand.
export const maxDuration = 60;

export async function GET() {
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const feeds = await (await supabaseRest("feeds?select=id,network,program_id,shop,url,brands,active,max_products,last_import,last_count,last_error&order=id")).json();
  const count = async (q: string) => Number((await supabaseRest(`products?${q}&select=id&limit=1`, { prefer: "count=exact" })).headers.get("content-range")?.split("/")[1] ?? 0);
  const [total, tagged, failed] = await Promise.all([count("id=gt.0"), count("hex=not.is.null"), count("tag_error=not.is.null")]);
  const latest = await (await supabaseRest("products?hex=not.is.null&select=id,shop,title,image_url,hex,category,gender,price,old_price&order=tagged_at.desc&limit=24")).json();
  return NextResponse.json({ feeds, stats: { total, tagged, failed }, latest }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const id = Number(b.id);
  switch (b.action) {
    case "add": {
      const shop = String(b.shop ?? "").trim(), url = String(b.url ?? "").trim();
      const network = ["daisycon", "awin", "tradetracker", "partnerize", "other"].includes(String(b.network)) ? String(b.network) : "other";
      const brands = Array.isArray(b.brands) ? b.brands.filter((x) => x === "kulort" || x === "nyanse") : ["kulort", "nyanse"];
      if (!shop || !/^https:\/\//.test(url) || !brands.length) return NextResponse.json({ error: "invalid" }, { status: 400 });
      await supabaseRest("feeds", { method: "POST", body: JSON.stringify({ shop, url, network, program_id: b.program_id ? String(b.program_id) : null, brands }) });
      return NextResponse.json({ ok: true });
    }
    case "toggle":
      await supabaseRest(`feeds?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ active: !!b.active }) });
      return NextResponse.json({ ok: true });
    case "delete":
      await supabaseRest(`feeds?id=eq.${id}`, { method: "DELETE" });
      return NextResponse.json({ ok: true });
    case "import": {
      const [f] = (await (await supabaseRest(`feeds?id=eq.${id}&select=id,network,program_id,shop,url,brands,active,max_products`)).json()) as Feed[];
      if (!f) return NextResponse.json({ error: "not_found" }, { status: 404 });
      const r = await importFeed(f).catch((e) => ({ error: String(e).slice(0, 200) }));
      return NextResponse.json(r);
    }
    case "tag":
      return NextResponse.json(await tagBatch(150, 50000));
    case "retag":
      // after a fix to the colour rule: measure every product again on the next runs
      await supabaseRest("products?id=gt.0", { method: "PATCH", body: JSON.stringify({ tagged_at: null, tag_error: null }) });
      return NextResponse.json({ ok: true });
    default:
      return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
}
