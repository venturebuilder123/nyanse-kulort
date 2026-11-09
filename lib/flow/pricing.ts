// The one ask for money in the flow (CLAUDE.md §2). Prices include VAT.
export const PRICES = { digital: 12.99, card: 39.99, session: 110 } as const;
export type Tier = keyof typeof PRICES;

/** €12,99 in Dutch, €12.99 in English. */
/** €12,99 (nl), €12.99 (en), 12,99 € (de, es): each the way its readers write it */
export const euro = (n: number, locale: "nl" | "en" | "de" | "es" = "nl") => {
  const v = Number.isInteger(n) ? String(n) : locale === "en" ? n.toFixed(2) : n.toFixed(2).replace(".", ",");
  return locale === "de" || locale === "es" ? `${v} €` : `€${v}`;
};
