import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { markPaid } from "@/lib/flow/fulfil";
import { mailConfigured, sendMail, shippedMail } from "@/lib/mail";

// Founder only (proxy.ts guards /api/lab with the lab password).
// GET: recent orders. POST {ref, status}: mark paid (sends the guide link) or shipped/cancelled.

export async function GET() {
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const res = await supabaseRest("orders?select=ref,created_at,status,tier,amount_cents,brand,season,email,name,street,postcode,city,country,friend_code,paid_at,mailed_at,locale:profile->>locale&order=created_at.desc&limit=200");
  return NextResponse.json(await res.json(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const b = (await req.json().catch(() => null)) as { ref?: string; status?: string } | null;
  const ref = b?.ref ?? "";
  const status = b?.status ?? "";
  if (!/^KN-[A-HJ-NP-Z2-9]{6}$/.test(ref) || !["paid", "shipped", "done", "cancelled", "awaiting_payment"].includes(status)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const origin = new URL(req.url).origin;
  if (status === "paid") {
    const r = await markPaid(ref, origin, "transfer", { resend: true });
    if (!r.found) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true, link: r.link, mailed: r.mailed, mailConfigured: mailConfigured() });
  }
  const res = await supabaseRest(`orders?ref=eq.${ref}&select=ref,secret,email,brand,profile`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    prefer: "return=representation",
  });
  const [o] = (await res.json()) as { ref: string; secret: string; email: string; brand: string; profile: { locale?: string } | null }[];
  if (!o) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const link = `${origin}/gids?o=${o.ref}&k=${o.secret}`;
  // "je pas is onderweg" (CLAUDE.md §7)
  let mailed = false;
  if (status === "shipped") {
    const m = shippedMail({ brand: o.brand, link, locale: o.profile?.locale === "en" ? "en" : "nl" });
    mailed = await sendMail(o.email, m.subject, m.text, m.html).catch(() => false);
  }
  return NextResponse.json({ ok: true, link, mailed, mailConfigured: mailConfigured() });
}
