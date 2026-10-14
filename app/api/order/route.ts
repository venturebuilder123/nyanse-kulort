import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { parseOrder } from "@/lib/flow/order";

// Stores an order before the customer transfers the money; the founder matches by reference.
export async function POST(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const row = parseOrder(await req.json().catch(() => null));
  if (!row) return NextResponse.json({ error: "invalid" }, { status: 400 });
  try {
    await supabaseRest("orders", { method: "POST", body: JSON.stringify(row), prefer: "return=minimal" });
  } catch {
    return NextResponse.json({ error: "store_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, ref: row.ref, amount: row.amount_cents / 100 });
}
