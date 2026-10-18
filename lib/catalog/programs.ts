// Affiliate programmes for the catalogue (CLAUDE.md §7). Selection of 18 Oct 2026 from the Daisycon
// fashion list, see docs/fase-b/AFFILIATE.md. `status` follows the Daisycon dashboard: only
// "approved" programmes may show up in outfits, the analysis ticker or the shop chips.
// Recommendations are made on colour, never on commission ("Aanbevolen op kleur, nooit op commissie").

import type { BrandKey } from "@/lib/brand/types";

export type Program = {
  network: "daisycon";
  id: number;
  name: string;
  /** which house the products serve */
  brands: BrandKey[];
  /** budget level from /stijl: 0 = tot €30, 1 = €30–80, 2 = €80+ */
  budget: (0 | 1 | 2)[];
  /** what we use it for in the guide and the outfits */
  use: string;
  commissionPct: number;
  cookieDays: number;
  feed: boolean;
  status: "to_apply" | "pending" | "approved" | "rejected";
};

export const PROGRAMS: Program[] = [
  // first wave: broad, mid-price, NL, with a product feed
  { network: "daisycon", id: 15549, name: "Mexx", brands: ["kulort", "nyanse"], budget: [1], use: "basis: overhemden, truien, blouses, broeken", commissionPct: 7, cookieDays: 30, feed: true, status: "to_apply" },
  { network: "daisycon", id: 20868, name: "AllSaints", brands: ["kulort", "nyanse"], budget: [2], use: "knitwear, leren jassen, denim", commissionPct: 3.5, cookieDays: 30, feed: true, status: "to_apply" },
  { network: "daisycon", id: 15679, name: "Zadig&Voltaire", brands: ["kulort", "nyanse"], budget: [2], use: "kasjmier truien, jassen, leer", commissionPct: 9.6, cookieDays: 30, feed: true, status: "to_apply" },
  { network: "daisycon", id: 19810, name: "Giglio", brands: ["kulort", "nyanse"], budget: [2], use: "breed designeraanbod in alle kleuren", commissionPct: 7.2, cookieDays: 30, feed: true, status: "to_apply" },
  { network: "daisycon", id: 18357, name: "Lureaux", brands: ["kulort"], budget: [1, 2], use: "schoenen en riemen in kleur (Accessoires)", commissionPct: 8.4, cookieDays: 30, feed: true, status: "to_apply" },
  { network: "daisycon", id: 18346, name: "Theo Grace (Myka)", brands: ["nyanse"], budget: [1], use: "sieraden in goud, zilver of roségoud (Accessoires)", commissionPct: 5.6, cookieDays: 30, feed: true, status: "to_apply" },
  // second wave: premium women, after the first numbers
  { network: "daisycon", id: 18138, name: "Isabel Marant", brands: ["nyanse"], budget: [2], use: "premium dameskleding", commissionPct: 12, cookieDays: 30, feed: true, status: "to_apply" },
  { network: "daisycon", id: 15224, name: "Stella McCartney", brands: ["nyanse", "kulort"], budget: [2], use: "duurzaam premium", commissionPct: 8, cookieDays: 30, feed: true, status: "to_apply" },
];

export const approved = (brand: BrandKey) => PROGRAMS.filter((p) => p.status === "approved" && p.brands.includes(brand));
