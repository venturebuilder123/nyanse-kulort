// One path to "paid", for the founder desk (bank transfer) and the Mollie webhook alike:
// set paid, mail the guide link, send the server-side "paid" event. Idempotent: an order that is
// already paid is not mailed or counted twice (Mollie may call the webhook more than once).

import { supabaseRest } from "@/lib/db/supabase";
import { guideMail, sendMail } from "@/lib/mail";

type Paid = { ref: string; email: string; brand: string; tier: string; secret: string; amount_cents: number };

export async function markPaid(ref: string, origin: string, method: string, opts: { resend?: boolean } = {}) {
  // only an unpaid order moves to paid; a second call finds nothing to change
  const res = await supabaseRest(`orders?ref=eq.${ref}&status=eq.awaiting_payment&select=ref,email,brand,tier,secret,amount_cents`, {
    method: "PATCH",
    body: JSON.stringify({ status: "paid", paid_at: new Date().toISOString() }),
    prefer: "return=representation",
  });
  let [o] = (await res.json()) as Paid[];
  const fresh = !!o;
  if (!o && opts.resend) {
    // the founder may press "Betaald" again to resend the mail
    const r = await supabaseRest(`orders?ref=eq.${ref}&status=in.(paid,shipped,done)&select=ref,email,brand,tier,secret,amount_cents`);
    [o] = (await r.json()) as Paid[];
  }
  if (!o) return { found: false as const };

  const link = `${origin}/gids?o=${o.ref}&k=${o.secret}`;
  const m = guideMail({ brand: o.brand, tier: o.tier, link });
  const mailed = await sendMail(o.email, m.subject, m.text, m.html).catch(() => false);
  if (mailed) await supabaseRest(`orders?ref=eq.${ref}`, { method: "PATCH", body: JSON.stringify({ mailed_at: new Date().toISOString() }) });

  // the verified sale for the funnel (server-side, no personal data), counted once
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (fresh && key) {
    await fetch(`${process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com"}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: key, event: "paid", distinct_id: o.ref, properties: { brand: o.brand, tier: o.tier, amount: o.amount_cents / 100, method, $process_person_profile: false } }),
    }).catch(() => {});
  }
  return { found: true as const, link, mailed, fresh, amount_cents: o.amount_cents };
}
