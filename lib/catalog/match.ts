// Products in your colours: the closest palette colour by ΔE2000, never close to a colour to avoid.
// Pure, so the same rule runs in the API and in the tests.

import { deltaE2000, hexToLab } from "@/lib/color/convert";
import type { Category } from "./normalize";

export type Candidate = { id: number; shop: string; title: string; image_url: string | null; price: number | null; old_price: number | null; category: Category; lab_l: number; lab_a: number; lab_b: number };
export type Match = Candidate & { colour: string; hex: string; deltaE: number };

/** ΔE below this reads as "the same colour family" on a phone screen. */
export const MATCH_DE = 11;

export function matchProducts(products: Candidate[], palette: { name: string; hex: string }[], avoid: string[], perCategory = 4): Match[] {
  const pal = palette.map((c) => ({ ...c, lab: hexToLab(c.hex) }));
  const bad = avoid.map((h) => hexToLab(h));
  const out: Match[] = [];
  for (const p of products) {
    const lab = { L: p.lab_l, a: p.lab_a, b: p.lab_b };
    let best = pal[0], bd = Infinity;
    for (const c of pal) {
      const d = deltaE2000(lab, c.lab);
      if (d < bd) { bd = d; best = c; }
    }
    if (!best || bd > MATCH_DE) continue;
    // closer to a colour to avoid than to the match: leave it out
    if (bad.some((b) => deltaE2000(lab, b) < bd)) continue;
    out.push({ ...p, colour: best.name, hex: best.hex, deltaE: Math.round(bd * 10) / 10 });
  }
  // best matches first, a few per category, and not all from one shop
  out.sort((a, b) => a.deltaE - b.deltaE);
  const per = new Map<string, number>();
  const perShop = new Map<string, number>();
  return out.filter((m) => {
    const n = per.get(m.category) ?? 0, s = perShop.get(`${m.category}:${m.shop}`) ?? 0;
    if (n >= perCategory || s >= Math.ceil(perCategory / 2)) return false;
    per.set(m.category, n + 1);
    perShop.set(`${m.category}:${m.shop}`, s + 1);
    return true;
  });
}
