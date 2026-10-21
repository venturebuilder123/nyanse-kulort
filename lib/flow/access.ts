// Access to the paid guide, verified by the server (decision 15 Oct 2026): the browser keeps the
// order reference and its secret; the server says whether the order is paid. Editing local storage
// or typing /klaar?status=paid no longer opens anything.

import { flowSession, type FlowResult } from "./session";

const KEY = "nk_order";
export type OrderKey = { ref: string; k: string };

export const orderKey = {
  get(): OrderKey | null {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) ?? "null") as OrderKey | null;
      return v && /^KN-[A-Z2-9]{6}$/.test(v.ref) && typeof v.k === "string" ? v : null;
    } catch {
      return null;
    }
  },
  set(v: OrderKey) {
    try {
      localStorage.setItem(KEY, JSON.stringify(v));
    } catch {}
  },
  clear() {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  },
};

export type Access = { state: "paid"; tier: string } | { state: "pending" } | { state: "none" } | { state: "offline" };

/**
 * Checks the order with the server. When paid: marks the local profile paid and, on a device
 * without a profile (the link from the mail), restores the profile from the order.
 */
export async function verifyAccess(key: OrderKey | null = orderKey.get()): Promise<Access> {
  if (!key) return { state: "none" };
  try {
    const res = await fetch(`/api/order/status?ref=${key.ref}&k=${encodeURIComponent(key.k)}`, { cache: "no-store" });
    if (res.status === 404 || res.status === 400) return { state: "none" };
    if (!res.ok) return { state: "offline" };
    const d = (await res.json()) as { paid: boolean; tier: string; profile: Partial<FlowResult> | null };
    if (!d.paid) return { state: "pending" };
    orderKey.set(key);
    const local = flowSession.result();
    if (!local && d.profile) {
      flowSession.setResult({
        measurements: d.profile.measurements,
        declared: d.profile.declared,
        hair: d.profile.hair,
        jewel: d.profile.jewel,
        confirm: d.profile.confirm,
        lowConfidence: false,
        pipeline: d.profile.declared ? "declared" : "A",
        at: Date.now(),
        paid: true,
      });
    } else flowSession.update({ paid: true });
    return { state: "paid", tier: d.tier };
  } catch {
    return { state: "offline" };
  }
}
