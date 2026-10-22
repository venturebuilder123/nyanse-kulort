// Answers collected before the selfie. No personal data: occasion, budget and shops only.
// Kept on this device (so "je antwoorden zijn bewaard" is true when someone comes back); carried across brands in a short-lived URL token (CLAUDE.md §2).

import type { BudgetKey, OccasionKey } from "@/lib/brand/types";

export type Answers = {
  occasions: OccasionKey[];
  budget?: BudgetKey;
  shops: string[];
};

export const EMPTY: Answers = { occasions: [], shops: [] };

const KEY = "nk_answers";
const TOKEN_TTL_MS = 60 * 60 * 1000;
const OCCASION_KEYS: OccasionKey[] = ["werk", "weekend", "date", "feest", "sport"];
const BUDGET_KEYS: BudgetKey[] = ["low", "mid", "high"];

/** A shop name as typed: trimmed, at most 40 characters, no markup. */
export const cleanShop = (s: string) => s.replace(/[^\p{L}\p{N} &'.+\-]/gu, "").replace(/\s+/g, " ").trim().slice(0, 40);

/** Keep only known values, so a tampered token or old storage can't inject anything. */
export function sanitize(raw: unknown): Answers {
  const r = (raw ?? {}) as Partial<Record<keyof Answers, unknown>>;
  const occasions = Array.isArray(r.occasions)
    ? r.occasions.filter((o): o is OccasionKey => OCCASION_KEYS.includes(o as OccasionKey))
    : [];
  const budget = BUDGET_KEYS.includes(r.budget as BudgetKey) ? (r.budget as BudgetKey) : undefined;
  // shop names, including ones people type themselves: letters, digits and a few signs only
  const shops = Array.isArray(r.shops)
    ? r.shops.filter((s): s is string => typeof s === "string").map(cleanShop).filter(Boolean).slice(0, 30)
    : [];
  return { occasions: [...new Set(occasions)], budget, shops: [...new Set(shops)] };
}

export function loadAnswers(): Answers {
  try {
    return sanitize(JSON.parse(sessionStorage.getItem(KEY) ?? localStorage.getItem(KEY) ?? "null"));
  } catch {
    return { ...EMPTY };
  }
}

export function saveAnswers(a: Answers): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(a));
    localStorage.setItem(KEY, JSON.stringify(a));
  } catch {
    // private mode or storage disabled: the flow still works within the page
  }
}

const b64url = {
  encode: (s: string) =>
    btoa(String.fromCharCode(...new TextEncoder().encode(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),
  decode: (s: string) =>
    new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0))),
};

export function encodeToken(a: Answers, now = Date.now()): string {
  return b64url.encode(JSON.stringify({ v: 1, exp: now + TOKEN_TTL_MS, a }));
}

/** Returns null for expired, malformed or foreign tokens. */
export function decodeToken(token: string, now = Date.now()): Answers | null {
  try {
    const t = JSON.parse(b64url.decode(token));
    if (t?.v !== 1 || typeof t.exp !== "number" || t.exp < now) return null;
    return sanitize(t.a);
  } catch {
    return null;
  }
}
