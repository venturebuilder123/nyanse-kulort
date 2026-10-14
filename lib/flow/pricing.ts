// The one ask for money in the flow (CLAUDE.md §2). Prices include VAT.
export const PRICES = { digital: 6.99, card: 9.99, session: 89 } as const;
export type Tier = keyof typeof PRICES;

export const euro = (n: number) => (Number.isInteger(n) ? `€${n}` : `€${n.toFixed(2).replace(".", ",")}`);
