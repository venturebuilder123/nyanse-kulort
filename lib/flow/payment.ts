// Bank-transfer checkout (pilot, NL first; decision 14 Oct 2026). No payment provider yet:
// the customer pays by transfer with a unique reference; the founder matches payments to orders.
// Public data on purpose: this account is shown to every buyer.

import { PRICES, type Tier } from "./pricing";

export const PAYEE = { name: "Basic Element", iban: "NL24RABO3152458398" } as const;

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function orderRef(random: () => number = Math.random): string {
  return "KN-" + Array.from({ length: 6 }, () => ALPHABET[Math.floor(random() * ALPHABET.length)]).join("");
}

/** Server and client agree on the amount: tier price minus €1 with a valid friend code. */
export function amountFor(tier: Tier, friend: boolean): number {
  return Math.round((PRICES[tier] - (friend ? 1 : 0)) * 100) / 100;
}

/**
 * EPC QR ("GiroCode", EPC069-12 v002): name, IBAN, amount and reference for banking apps
 * that can scan it. Unstructured remittance, max 140 chars.
 */
export function epcPayload(amount: number, remittance: string): string {
  return ["BCD", "002", "1", "SCT", "", PAYEE.name, PAYEE.iban, `EUR${amount.toFixed(2)}`, "", "", remittance.slice(0, 140), ""].join("\n");
}

export const formatIban = (iban: string) => iban.replace(/(.{4})/g, "$1 ").trim();
