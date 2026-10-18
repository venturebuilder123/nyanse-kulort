import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { mollieConfigured, paymentForOrder } from "@/lib/payments/mollie";

// Try again: a new Mollie payment for an unpaid order (cancelled at the bank, expired, wrong method).
// Only with the order's own secret, and only while the order still awaits payment.
export async function POST(req: Request) {
  if (!mollieConfigured() || !supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const b = (await req.json().catch(() => null)) as { ref?: string; k?: string } | null;
  const ref = b?.ref ?? "", k = b?.k ?? "";
  if (!/^KN-[A-HJ-NP-Z2-9]{6}$/.test(ref) || !/^[A-Za-z0-9_-]{20,40}$/.test(k)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const r = await supabaseRest(`orders?select=ref,secret,brand,tier,amount_cents&ref=eq.${ref}&secret=eq.${encodeURIComponent(k)}&status=eq.awaiting_payment&limit=1`);
  const [o] = (await r.json()) as { ref: string; secret: string; brand: string; tier: string; amount_cents: number }[];
  if (!o) return NextResponse.json({ error: "not_found" }, { status: 404 });
  try {
    const p = await paymentForOrder(o, new URL(req.url).origin);
    return NextResponse.json({ checkoutUrl: p._links.checkout?.href ?? null });
  } catch {
    return NextResponse.json({ error: "mollie_failed" }, { status: 502 });
  }
}
