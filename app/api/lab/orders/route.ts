import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { guideMail, mailConfigured, sendMail } from "@/lib/mail";

// Founder only (proxy.ts guards /api/lab with the lab password).
// GET: recent orders. POST {ref, status}: mark paid (sends the guide link) or shipped/cancelled.

export async function GET() {
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const res = await supabaseRest("orders?select=ref,created_at,status,tier,amount_cents,brand,season,email,name,street,postcode,city,country,friend_code,paid_at,mailed_at&order=created_at.desc&limit=200");
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
  const patch: Record<string, unknown> = { status };
  if (status === "paid") patch.paid_at = new Date().toISOString();
  const res = await supabaseRest(`orders?ref=eq.${ref}&select=ref,email,brand,tier,secret,amount_cents`, {
    method: "PATCH",
    body: JSON.stringify(patch),
    prefer: "return=representation",
  });
  const [o] = (await res.json()) as { ref: string; email: string; brand: string; tier: string; secret: string; amount_cents: number }[];
  if (!o) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const origin = new URL(req.url).origin;
  const link = `${origin}/gids?o=${o.ref}&k=${o.secret}`;
  let mailed = false;
  if (status === "paid") {
    const m = guideMail({ brand: o.brand, tier: o.tier, link });
    mailed = await sendMail(o.email, m.subject, m.text, m.html).catch(() => false);
    if (mailed) await supabaseRest(`orders?ref=eq.${ref}`, { method: "PATCH", body: JSON.stringify({ mailed_at: new Date().toISOString() }) });
    // the verified sale for the funnel (server-side, no personal data)
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (key) {
      void fetch(`${process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com"}/capture/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: key, event: "paid", distinct_id: o.ref, properties: { brand: o.brand, tier: o.tier, amount: o.amount_cents / 100, method: "transfer", $process_person_profile: false } }),
      }).catch(() => {});
    }
  }
  return NextResponse.json({ ok: true, link, mailed, mailConfigured: mailConfigured() });
}
