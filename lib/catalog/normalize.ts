// Turns one row of any affiliate feed (Daisycon, Awin, TradeTracker: CSV, JSON or XML) into one
// product, or null when it is not something the guide recommends. Pure: no network, no database.

export const CATEGORIES = [
  "overhemd", "blouse", "top", "trui", "vest", "colbert", "jas", "broek", "jeans", "rok", "jurk",
  "schoenen", "sneakers", "riem", "horloge", "sieraden", "sjaal", "tas", "das",
] as const;
export type Category = (typeof CATEGORIES)[number];
export type Gender = "men" | "women" | "unisex";

export type NormalProduct = {
  external_id: string; title: string; brand_name: string | null; url: string; image_url: string | null;
  price: number | null; old_price: number | null; currency: string; gender: Gender | null; category: Category; in_stock: boolean;
};

type Row = Record<string, unknown>;

// field names differ per network; the first one present wins
const ALIASES: Record<keyof Omit<NormalProduct, "category" | "gender" | "in_stock"> | "cat" | "gender" | "stock" | "colour", string[]> = {
  external_id: ["sku", "id", "product_id", "productid", "aw_product_id", "merchant_product_id", "ean", "gtin", "ID"],
  title: ["title", "name", "product_name", "productname"],
  brand_name: ["brand", "brand_name", "brandname", "merchant_brand"],
  url: ["link", "deeplink", "aw_deep_link", "url", "productURL", "URL", "product_url", "tracking_url"],
  image_url: ["image_link", "image_default", "image_large", "aw_image_url", "merchant_image_url", "large_image", "image", "imageURL", "image_url", "images"],
  price: ["sale_price", "search_price", "price", "selling_price", "price_incl_vat", "store_price"],
  old_price: ["price_old", "old_price", "rrp_price", "price_from", "from_price", "base_price", "regular_price", "original_price"],
  currency: ["currency", "currency_code"],
  cat: ["category", "category_path", "merchant_category", "category_name", "categories", "productType", "product_type", "google_product_category", "subcategory", "sub_category"],
  gender: ["gender", "gender_target", "target_gender", "sex"],
  stock: ["in_stock", "availability", "stock", "instock", "is_in_stock"],
  colour: ["color", "colour", "color_primary"],
};

const str = (v: unknown): string => {
  if (v == null) return "";
  if (Array.isArray(v)) return str(v[0]);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    return str(o["#text"] ?? o.url ?? o.value ?? o.image ?? Object.values(o)[0]);
  }
  return String(v).trim();
};
function pick(row: Row, key: keyof typeof ALIASES): string {
  for (const k of ALIASES[key]) {
    const v = str(row[k] ?? row[k.toLowerCase()]);
    if (v) return v;
  }
  return "";
}
export function parsePrice(v: string): number | null {
  if (!v) return null;
  const m = v.replace(/[^\d.,]/g, "");
  if (!m) return null;
  // "1.299,95" or "1,299.95" or "12,99" or "12.99"
  const last = Math.max(m.lastIndexOf(","), m.lastIndexOf("."));
  const n = last >= 0 && m.length - last - 1 <= 2 ? Number(m.slice(0, last).replace(/[.,]/g, "") + "." + m.slice(last + 1)) : Number(m.replace(/[.,]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : null;
}

// keyword → category, Dutch, English and German; the first match wins, so specific words come first
const CAT_RULES: [Category, RegExp][] = [
  ["sneakers", /sneaker|trainer|turnschuh/],
  ["schoenen", /schoen|loafer|instapper|boot|laars|enkellaars|pump|sandaal|shoe|derby|oxford|brogue|mocassin|schuh|stiefel/],
  ["riem", /\briem|belt|gürtel|guertel/],
  ["horloge", /horloge|watch|\buhr\b|armbanduhr/],
  ["sieraden", /ketting|armband|oorbel|ring\b|ringen|sieraad|necklace|bracelet|earring|jewel|schmuck|halskette|ohrring|pendant|hanger/],
  ["sjaal", /sjaal|shawl|scarf|omslagdoek|schal\b|tuch\b/],
  ["das", /\bdas\b|stropdas|\btie\b|krawatte|vlinderdas|bow tie/],
  ["tas", /\btas\b|tassen|handtas|schoudertas|bag\b|tote|clutch|tasche|rugzak/],
  ["jeans", /jeans|denim broek|spijkerbroek/],
  ["colbert", /colbert|blazer|jacket(?!.*(down|puffer|rain))|sakko|kostuumjas/],
  ["jas", /\bjas\b|jassen|coat|parka|trenchcoat|mantel|bomber|overshirt|jacke|puffer|gilet|bodywarmer/],
  ["vest", /\bvest\b|cardigan|strickjacke/],
  ["trui", /trui|sweater|pullover|knit|gebreid|hoodie|sweatshirt|coltrui|turtleneck|jumper|pulli|strick/],
  ["overhemd", /overhemd|shirt(?!s?\s*(dress|jurk))|hemd|oberhemd|polo/],
  ["blouse", /blouse|bluse|tuniek|tunic/],
  ["jurk", /jurk|dress|kleid/],
  ["rok", /\brok\b|rokken|skirt|rock\b/],
  ["broek", /broek|pantalon|chino|trouser|pants|hose\b|culotte|legging/],
  ["top", /\btop\b|t-shirt|tshirt|tee\b|longsleeve|tanktop|camisole|body\b/],
];
// things we never recommend from a feed
const SKIP = /kind|kids|baby|junior|girls\b|boys\b|jongens|meisjes|kinder|ondergoed|underwear|lingerie|bh\b|bra\b|sok|sock|socke|zwem|swim|bikini|pyjama|nachtjapon|parfum|fragrance|duft|gift ?card|cadeaubon|geschenkkarte|accessoire set|maske|mask/;

export function categoryOf(text: string): Category | null {
  const t = text.toLowerCase();
  if (SKIP.test(t)) return null;
  for (const [cat, re] of CAT_RULES) if (re.test(t)) return cat;
  return null;
}

export function genderOf(text: string): Gender | null {
  const t = ` ${text.toLowerCase()} `;
  const men = /\b(heren|men|mens|men's|male|man|herren|homme|hombre)\b/.test(t);
  const women = /\b(dames|women|womens|women's|female|vrouw|vrouwen|damen|femme|mujer|ladies)\b/.test(t);
  if (men && !women) return "men";
  if (women && !men) return "women";
  if (/\bunisex\b/.test(t) || (men && women)) return "unisex";
  return null;
}

export function normalize(row: Row): NormalProduct | null {
  const title = pick(row, "title");
  const url = pick(row, "url");
  if (!title || !/^https?:\/\//.test(url)) return null;
  const catText = `${pick(row, "cat")} ${title}`;
  const category = categoryOf(catText);
  if (!category) return null;
  const price = parsePrice(pick(row, "price"));
  const old = parsePrice(pick(row, "old_price"));
  const stock = pick(row, "stock").toLowerCase();
  const image = pick(row, "image_url");
  return {
    external_id: (pick(row, "external_id") || url).slice(0, 200),
    title: title.slice(0, 200),
    brand_name: pick(row, "brand_name").slice(0, 80) || null,
    url,
    image_url: /^https?:\/\//.test(image) ? image : null,
    price,
    // only a real, higher old price counts as a sale (CLAUDE.md §7: no fake discounts)
    old_price: old && price && old > price ? old : null,
    currency: (pick(row, "currency") || "EUR").toUpperCase().slice(0, 3),
    gender: genderOf(`${pick(row, "gender")} ${catText}`),
    category,
    in_stock: !/(out of stock|niet op voorraad|false|^0$|^no$|nee|uitverkocht)/.test(stock),
  };
}
