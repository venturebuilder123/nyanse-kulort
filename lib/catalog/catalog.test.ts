import { describe, expect, it } from "vitest";
import { hexToRgb8 } from "@/lib/color/convert";
import { dominantColour } from "./colour";
import { matchProducts } from "./match";
import { categoryOf, genderOf, normalize, parsePrice } from "./normalize";

describe("normalize feed rows", () => {
  it("reads Daisycon-, Awin- and TradeTracker-style rows", () => {
    const d = normalize({ sku: "A1", title: "Heren overhemd slim fit", link: "https://lt45.net/c/?x=1", image_default: "https://img/1.jpg", price: "49,95", price_old: "69,95", brand: "Mexx", category: "Heren > Overhemden", in_stock: "true" });
    expect(d).toMatchObject({ external_id: "A1", category: "overhemd", gender: "men", price: 49.95, old_price: 69.95, in_stock: true });
    const a = normalize({ aw_product_id: "9", product_name: "Cashmere jumper", aw_deep_link: "https://www.awin1.com/pclick.php?p=9", aw_image_url: "https://i/9.jpg", search_price: "189.00", rrp_price: "189.00", merchant_category: "Women Knitwear" });
    expect(a).toMatchObject({ category: "trui", gender: "women", price: 189, old_price: null });
    const t = normalize({ ID: "7", name: "Leren riem", URL: "https://tc.tradetracker.net/?x", images: { image: "https://i/7.jpg" }, price: "€ 39,-", categories: "Accessoires heren" });
    expect(t).toMatchObject({ category: "riem", gender: "men", image_url: "https://i/7.jpg" });
  });
  it("skips kids, underwear, socks and things without a link", () => {
    expect(normalize({ title: "Kids sweater", link: "https://x" })).toBeNull();
    expect(normalize({ title: "Sokken 3-pack heren", link: "https://x" })).toBeNull();
    expect(normalize({ title: "Overhemd", link: "" })).toBeNull();
  });
  it("parses prices and genders", () => {
    expect(parsePrice("1.299,95")).toBe(1299.95);
    expect(parsePrice("12.99 EUR")).toBe(12.99);
    expect(parsePrice("")).toBeNull();
    expect(genderOf("Dames blouse")).toBe("women");
    expect(categoryOf("Wollen jas")).toBe("jas");
    expect(categoryOf("Chino broek")).toBe("broek");
  });
});

/** a 32×32 product shot: background colour with a centred garment */
function shot(bg: string, garment: string) {
  const [br, bgG, bb] = hexToRgb8(bg), [r, g, b] = hexToRgb8(garment);
  const w = 32, px = new Uint8Array(w * w * 4);
  for (let y = 0; y < w; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4, inside = x > 6 && x < 26 && y > 4 && y < 28;
    px.set(inside ? [r, g, b, 255] : [br, bgG, bb, 255], i);
  }
  return px;
}

describe("dominant colour of a product photo", () => {
  it("finds the garment, not the white background", () => {
    const d = dominantColour(shot("#FFFFFF", "#1B2A5C"), 32, 32)!;
    expect(d.hex.toLowerCase()).toBe("#1b2a5c");
  });
  it("still finds a white shirt on a white background", () => {
    const d = dominantColour(shot("#FFFFFF", "#FFFFFF"), 32, 32)!;
    expect(d.lab.L).toBeGreaterThan(95);
  });
  it("works on a grey studio background", () => {
    const d = dominantColour(shot("#E9E5DF", "#9B1B30"), 32, 32)!;
    expect(d.hex.toLowerCase()).toBe("#9b1b30");
  });
});

describe("matching products to a palette", () => {
  const lab = (L: number, a: number, b: number) => ({ lab_l: L, lab_a: a, lab_b: b });
  const base = { shop: "Mexx", image_url: null, price: 49, old_price: null };
  it("keeps close colours, drops far ones and ones nearer to a colour to avoid", () => {
    const navy = { id: 1, title: "navy trui", category: "trui" as const, ...base, ...lab(19, 8, -30) };
    const mustard = { id: 2, title: "mosterd trui", category: "trui" as const, ...base, ...lab(65, 8, 60) };
    const m = matchProducts([navy, mustard], [{ name: "Navy", hex: "#1B2A5C" }], ["#C9A24A"]);
    expect(m.map((x) => x.id)).toEqual([1]);
    expect(m[0]!.colour).toBe("Navy");
  });
});
