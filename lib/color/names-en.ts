// English names for the master palette and the fixed guide swatches (metals, leather, denim,
// frames). Used by the English Etsy guides now and the English site later (phase 2).

const EN: Record<string, string> = {
  Abrikoos: "Apricot", Amber: "Amber", Antraciet: "Anthracite", Aqua: "Aqua", Aubergine: "Aubergine",
  Bessenrood: "Berry red", Blauwgroen: "Blue-green", Bordeaux: "Burgundy", Bosgroen: "Forest green", Boter: "Butter",
  Brons: "Bronze", Camel: "Camel", Chocolade: "Chocolate", Chocolademelk: "Milk chocolate", Citroengeel: "Lemon yellow",
  Cognac: "Cognac", Crème: "Cream", Denim: "Denim", "Diep mosterd": "Deep mustard", "Diep olijf": "Deep olive",
  "Diep robijn": "Deep ruby", "Diep smaragd": "Deep emerald", "Diep tomaat": "Deep tomato", "Donker denim": "Dark denim",
  "Donker schildpad of zwart": "Dark tortoiseshell or black", Donkerbruin: "Dark brown", Duifblauw: "Dove blue",
  Espresso: "Espresso", Felblauw: "Bright blue", Feloranje: "Bright orange", Felroze: "Hot pink", Framboos: "Raspberry",
  Fuchsia: "Fuchsia", "Gebroken wit": "Off-white", Goud: "Gold", Goudbruin: "Golden brown", Goudgeel: "Golden yellow",
  Grasgroen: "Grass green", Grijsblauw: "Grey-blue", Grijsbruin: "Grey-brown", Grijsgroen: "Grey-green", Grijsroze: "Dusty pink",
  "Helder cyaan": "Bright cyan", "Helder koraal": "Bright coral", "Helder navy": "Bright navy", "Helder paars": "Bright purple",
  "Helder smaragd": "Bright emerald", "Helder turkoois": "Bright turquoise", "Helder wit": "Pure white", Hemelsblauw: "Sky blue",
  Honing: "Honey", Houtskool: "Charcoal", IJsblauw: "Icy blue", IJsgrijs: "Icy grey", IJsgroen: "Icy green", IJsroze: "Icy pink",
  Indigo: "Indigo", Inktblauw: "Ink blue", Ivoorwit: "Ivory white", Jadegroen: "Jade green", Kaki: "Khaki", Kalkwit: "Chalk white",
  Kameel: "Camel", Kaneel: "Cinnamon", Karamel: "Caramel", Karmijn: "Carmine", Kastanje: "Chestnut", Klaprood: "Poppy red",
  Kobalt: "Cobalt", Kobaltnavy: "Cobalt navy", "Koel hemelsblauw": "Cool sky blue", "Koel paars": "Cool purple", "Koel rood": "Cool red",
  "Koel roze": "Cool pink", "Koel taupe": "Cool taupe", "Koel turkoois": "Cool turquoise", "Koel wit": "Cool white", "Koele munt": "Cool mint",
  Koningsblauw: "Royal blue", Koper: "Copper", Koraal: "Coral", Korenblauw: "Cornflower blue", Lavendel: "Lavender",
  Lavendelgrijs: "Lavender grey", Legergroen: "Army green", Leisteen: "Slate", Lentegroen: "Spring green", "Licht camel": "Light camel",
  "Licht denim": "Light denim", "Licht kameel": "Light camel", "Licht olijf": "Light olive", "Licht rozenhout": "Light rosewood",
  "Licht schildpad of transparant": "Light tortoiseshell or clear", Lichtgoud: "Light gold", Lichtgrijs: "Light grey", Lichtroze: "Light pink",
  Lila: "Lilac", Limoen: "Lime", Maagdenpalm: "Periwinkle", Mandarijn: "Tangerine", Marine: "Marine", Mauve: "Mauve",
  Middenblauw: "Mid blue", "Middenblauw denim": "Mid-blue denim", Middengrijs: "Mid grey", Mosgroen: "Moss green", Mosterd: "Mustard",
  Munt: "Mint", Nachtblauw: "Midnight blue", Navy: "Navy", Oker: "Ochre", Olijf: "Olive", Olijfgroen: "Olive green", Paars: "Purple",
  Papaya: "Papaya", Pastelpaars: "Pastel purple", Perzik: "Peach", Petrol: "Petrol blue", Petrolgroen: "Deep teal", Platina: "Platinum",
  Poederblauw: "Powder blue", Poederroze: "Powder pink", Pompoen: "Pumpkin", Pruim: "Plum", Robijn: "Ruby", Robijnrood: "Ruby red",
  Roest: "Rust", Roestroze: "Rust pink", Room: "Warm cream", "Royal navy": "Royal navy", Rozenhout: "Rosewood", Roségoud: "Rose gold",
  Saffier: "Sapphire", Salie: "Sage", Siena: "Sienna", Smaragd: "Emerald", Staalgrijs: "Steel grey", Steen: "Stone",
  Steengrijs: "Stone grey", Steengroen: "Stone green", Steenrood: "Brick red", "Stoffig blauw": "Dusty blue", Tabak: "Tobacco",
  Taupe: "Taupe", Tomaat: "Tomato", Turkoois: "Turquoise", Ultramarijn: "Ultramarine", "Warm bordeaux": "Warm burgundy",
  "Warm ivoor": "Warm ivory", "Warm rood": "Warm red", "Warm roze": "Warm pink", "Warm wit": "Warm white",
  "Warme aubergine": "Warm aubergine", "Warme zalm": "Warm salmon", "Washed denim": "Washed denim", Wijnrood: "Wine red",
  Wit: "White", Witgoud: "White gold", "Zacht schildpad of grijs": "Soft tortoiseshell or grey", "Zachte framboos": "Soft raspberry",
  "Zachte petrol": "Soft teal", "Zachte pruim": "Soft plum", "Zachte terracotta": "Soft terracotta", Zachtwit: "Soft white",
  Zadelbruin: "Saddle brown", Zalm: "Salmon", Zalmroze: "Salmon pink", Zand: "Sand", Zeeblauw: "Sea blue", Zeegroen: "Sea green",
  Zilver: "Silver", Zilvergrijs: "Silver grey", Zonnegeel: "Sunshine yellow", Zwart: "Black",
};

/** The English name; "Goud of Brons" style lists are translated part by part. Throws on a gap, so none slip through. */
export function colorNameEn(nl: string): string {
  if (EN[nl]) return EN[nl];
  if (nl.includes(" of ")) return nl.split(" of ").map(colorNameEn).join(" or ");
  throw new Error(`no English name for colour "${nl}"`);
}
