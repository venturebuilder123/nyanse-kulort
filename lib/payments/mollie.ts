// Mollie Payments API (v2) over plain fetch: iDEAL | Wero, Apple Pay, card, PayPal, whatever is
// enabled in the Mollie dashboard. Server only. Without MOLLIE_API_KEY checkout falls back to bank transfer.

const API = "https://api.mollie.com/v2";

export const mollieConfigured = () => !!process.env.MOLLIE_API_KEY?.trim();

export type MolliePayment = {
  id: string;
  status: "open" | "pending" | "authorized" | "paid" | "canceled" | "expired" | "failed";
  amount: { currency: string; value: string };
  method: string | null;
  metadata: { ref?: string } | null;
  _links: { checkout?: { href: string } };
};

async function mollie(path: string, init: RequestInit = {}): Promise<MolliePayment> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${process.env.MOLLIE_API_KEY!.trim()}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`mollie ${res.status}`);
  return (await res.json()) as MolliePayment;
}

/** "6.99": Mollie wants a string with exactly two decimals. */
export const mollieValue = (cents: number) => (cents / 100).toFixed(2);

export function createPayment(o: { ref: string; cents: number; description: string; redirectUrl: string; webhookUrl?: string }) {
  return mollie("/payments", {
    method: "POST",
    body: JSON.stringify({
      amount: { currency: "EUR", value: mollieValue(o.cents) },
      description: o.description,
      redirectUrl: o.redirectUrl,
      // Mollie cannot reach localhost: locally the webhook is left out and the founder desk still works
      ...(o.webhookUrl ? { webhookUrl: o.webhookUrl } : {}),
      metadata: { ref: o.ref },
      locale: "nl_NL",
    }),
  });
}

export const getPayment = (id: string) => mollie(`/payments/${encodeURIComponent(id)}`);

/** A payment for a stored order; the description is what the bank statement shows, per brand. */
export function paymentForOrder(o: { ref: string; secret: string; brand: string; tier: string; amount_cents: number }, origin: string) {
  const brand = o.brand === "kulort" ? "KULØRT" : "NYANSE";
  const what = o.tier === "session" ? "persoonlijke sessie" : o.tier === "card" ? "stijlgids + kleurenpas" : "stijlgids";
  return createPayment({
    ref: o.ref,
    cents: o.amount_cents,
    description: `${brand} ${what} ${o.ref}`,
    redirectUrl: `${origin}/klaar?order=${o.ref}&k=${encodeURIComponent(o.secret)}&via=mollie`,
    webhookUrl: origin.startsWith("https://") ? `${origin}/api/mollie/webhook` : undefined,
  });
}
