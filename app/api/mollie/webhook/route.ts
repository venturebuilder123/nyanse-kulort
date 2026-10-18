import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { markPaid } from "@/lib/flow/fulfil";
import { getPayment, mollieConfigured, mollieValue } from "@/lib/payments/mollie";

// Mollie posts only the payment id (form-encoded, unsigned). We never trust the request itself:
// the payment is fetched from Mollie with our key, and the amount must match the stored order.
export async function POST(req: Request) {
  if (!mollieConfigured() || !supabaseConfigured()) return new NextResponse(null, { status: 503 });
  const id = String((await req.formData().catch(() => null))?.get("id") ?? "");
  if (!/^tr_[A-Za-z0-9]+$/.test(id)) return new NextResponse(null, { status: 200 }); // unknown: nothing to do, no retries

  try {
    const p = await getPayment(id);
    const ref = p.metadata?.ref ?? "";
    if (p.status !== "paid" || !/^KN-[A-HJ-NP-Z2-9]{6}$/.test(ref)) return new NextResponse(null, { status: 200 });
    const r = await supabaseRest(`orders?ref=eq.${ref}&select=amount_cents&limit=1`);
    const [o] = (await r.json()) as { amount_cents: number }[];
    if (!o || p.amount.currency !== "EUR" || p.amount.value !== mollieValue(o.amount_cents)) {
      console.error("mollie webhook: amount or order mismatch", ref, id);
      return new NextResponse(null, { status: 200 });
    }
    await markPaid(ref, new URL(req.url).origin, `mollie:${p.method ?? "unknown"}`);
    return new NextResponse(null, { status: 200 });
  } catch (e) {
    // a temporary failure (Mollie or Supabase down): a non-200 makes Mollie try again later
    console.error("mollie webhook failed", e);
    return new NextResponse(null, { status: 500 });
  }
}
