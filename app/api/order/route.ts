import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";
import { parseOrder } from "@/lib/flow/order";
import { mailConfigured, sendMail } from "@/lib/mail";

// Stores an order before the customer transfers the money; the founder matches by reference.
// The secret is the buyer's key to the guide: it never leaves this response and the mail.
export async function POST(req: Request) {
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const row = parseOrder(await req.json().catch(() => null));
  if (!row) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const secret = randomBytes(18).toString("base64url");
  try {
    await supabaseRest("orders", { method: "POST", body: JSON.stringify({ ...row, secret }), prefer: "return=minimal" });
  } catch {
    return NextResponse.json({ error: "store_failed" }, { status: 502 });
  }
  // a short notice to the founder; failing mail never fails the order
  if (mailConfigured() && process.env.MAIL_TO_FOUNDER) {
    const euro = (row.amount_cents / 100).toFixed(2).replace(".", ",");
    void sendMail(
      process.env.MAIL_TO_FOUNDER,
      `Nieuwe bestelling ${row.ref} · €${euro}`,
      `${row.ref} · ${row.tier} · €${euro} · ${row.brand}\nControleer de overschrijving en klik op Betaald in /lab/orders.`,
      `<p><b>${row.ref}</b> · ${row.tier} · €${euro} · ${row.brand}</p><p>Controleer de overschrijving en klik op <b>Betaald</b> in <a href="https://www.kulort-nyanse.com/lab/orders">/lab/orders</a>.</p>`,
    ).catch(() => {});
  }
  return NextResponse.json({ ok: true, ref: row.ref, secret, amount: row.amount_cents / 100 });
}
