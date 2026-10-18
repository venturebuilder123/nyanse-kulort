// The one ask for money in the flow (CLAUDE.md §2). Prices include VAT.
export const PRICES = { digital: 12.99, card: 39.99, session: 110 } as const;
export type Tier = keyof typeof PRICES;

/** €12,99 in Dutch, €12.99 in English. */
export const euro = (n: number, locale: "nl" | "en" = "nl") => (Number.isInteger(n) ? `€${n}` : locale === "en" ? `€${n.toFixed(2)}` : `€${n.toFixed(2).replace(".", ",")}`);
