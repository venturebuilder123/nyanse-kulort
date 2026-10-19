// English layer over the (Dutch) guide engine output, for the Etsy packages. Fixed sentences are
// translated one to one; sentences with colours in them are rebuilt from the swatches.
import type { Guide, Swatch } from "@/lib/guide/build";
import { colorNameEn } from "@/lib/color/names-en";

const T: Record<string, string> = {
  // groups
  Basis: "Base", Neutraal: "Neutrals", Accent: "Accents",
  "Je donkere ankers: broeken, jassen, colberts en schoenen. Hier begint elke outfit.": "Your dark anchors: trousers, coats, jackets and shoes. Every outfit starts here.",
  "Rustige kleuren die alles verbinden: shirts, truien en lagen onder of over je accenten.": "Quiet colours that tie everything together: shirts, knits and layers under or over your accents.",
  "De kleuren die je gezicht laten oplichten. Draag ze dicht bij je gezicht: shirt, trui, sjaal.": "The colours that make your face light up. Wear them close to your face: shirt, knit, scarf.",
  // looks
  Werk: "Work", Weekend: "Weekend", Date: "Date night", Feest: "Evening out",
  "Een das of pochet in een heldere accentkleur maakt het af.": "A tie or pocket square in a clear accent colour finishes it.",
  "Een sjaal of sieraad in een heldere accentkleur maakt het af.": "A scarf or a piece of jewellery in a clear accent colour finishes it.",
  "Houd het tonaal: één familie van kleuren, verschillende diepten.": "Keep it tonal: one colour family, different depths.",
  "De accentkleur zit bij je gezicht, de rest ondersteunt.": "The accent colour sits by your face; the rest supports it.",
  "Je sterkste kleur onder je gezicht: daar kijkt de ander naar.": "Your strongest colour right under your face: that's where they look.",
  "Diep en rijk, met één kleur die opvalt.": "Deep and rich, with one colour that stands out.",
  // contrast
  "Jij kunt contrast hebben": "You can carry contrast",
  "Licht naast donker en een heldere kleur bij je gezicht staan je sterk. Te veel van hetzelfde maakt je juist vlak.": "Light next to dark and a clear colour by your face look strong on you. Too much of the same makes you look flat.",
  "Jij wint met tonaal": "You win with tonal",
  "Kleuren die dicht bij elkaar liggen laten je rustig en verzorgd ogen. Harde contrasten, zoals zwart met wit, trekken de aandacht weg van je gezicht.": "Colours that sit close together make you look calm and polished. Hard contrasts, like black with white, pull attention away from your face.",
  "Jij zit in het midden": "You sit in the middle",
  "Gemiddeld contrast werkt het best: één duidelijk accent per outfit, de rest rustig.": "Medium contrast works best: one clear accent per outfit, the rest quiet.",
  // rules
  "Contrast mag: licht naast donker.": "Contrast is allowed: light next to dark.",
  "Kies tonaal: kleuren dicht bij elkaar.": "Go tonal: colours close together.",
  "Eén accent per outfit, de rest rustig.": "One accent per outfit, the rest quiet.",
  "Warm boven koel: goud, camel, roest.": "Warm over cool: gold, camel, rust.",
  "Koel boven warm: zilver, navy, ijstinten.": "Cool over warm: silver, navy, icy tints.",
  "Neutraal: je kunt beide kanten op, kies zacht.": "Neutral: you can go both ways; choose soft.",
  "Diepe kleuren dragen je; pastel valt weg.": "Deep colours carry you; pastels fade.",
  "Lichte kleuren laten je stralen; zwart is te zwaar.": "Light colours make you glow; black is too heavy.",
  "Middentinten zijn je basis; extremen spaarzaam.": "Mid tones are your base; extremes sparingly.",
  // basics
  "Jouw wit": "Your white", "Jouw zwart": "Your black", "Jouw donker": "Your dark", "Jouw denim": "Your denim",
  "Helder wit staat je, ook dicht bij je gezicht. Gebroken wit en crème maken je juist vaal.": "Pure white suits you, even close to your face. Off-white and cream make you look washed out.",
  "Geen helder wit, maar een warme, romige tint. Die laat je huid gloeien in plaats van grauw.": "Not pure white but a warm, creamy shade. It makes your skin glow instead of grey.",
  "Geen spierwit, maar een zachte, gebroken tint. Die oogt frisser bij jouw gezicht.": "Not stark white but a soft off-white. It looks fresher next to your face.",
  "Zwart mag, juist naast wit of een heldere kleur. Je gezicht kan die diepte aan.": "Black works, especially next to white or a clear colour. Your face can carry that depth.",
  "Liever niet zwart bij je gezicht: deze tint geeft dezelfde diepte zonder je te overstemmen.": "Skip black near your face: this shade gives the same depth without overpowering you.",
  "Kies denim in deze tint: dan combineert je jeans met al je bovenstukken.": "Choose denim in this shade: then your jeans go with all your tops.",
  "Een egale, iets vergrijsde wassing. Felle stonewash en bijna-zwart zijn te hard naast je zachte kleuren.": "An even, slightly greyed wash. Bright stonewash and near-black are too harsh next to your soft colours.",
  "Egaal en zonder vaal of verwassen effect, in deze diepte.": "An even wash without a faded effect, in this depth.",
  // first buys
  "Dicht bij je gezicht en elke dag te dragen.": "Close to your face and wearable every day.",
  "Je sterkste kleur, daar kijken mensen naar.": "Your strongest colour: that's where people look.",
  "Een rustige basis onder alles.": "A calm base under everything.",
  "Maakt elke outfit af, van werk tot weekend.": "Finishes every outfit, from work to weekend.",
  "Eén leerkleur die je steeds herhaalt.": "One leather colour you repeat every time.",
  "Je sterkste kleur dicht bij je gezicht.": "Your strongest colour close to your face.",
  "Zacht, licht en met alles te combineren.": "Soft, light and easy to combine with everything.",
  "Een rustige basis onder al je kleuren.": "A calm base under all your colours.",
  "Maakt elke outfit af, van werk tot diner.": "Finishes every outfit, from work to dinner.",
  "De snelste manier om een outfit in je kleuren te brengen.": "The fastest way to bring an outfit into your colours.",
  // wardrobe check
  "Leg alles wat je bij je gezicht draagt (shirts, truien, sjaals) op bed, bij daglicht.": "Lay everything you wear near your face (shirts, knits, scarves) on the bed, in daylight.",
  "Houd je kleurenpas of je 30 kleuren ernaast. Lijkt een stuk op een van je kleuren? Houden.": "Hold your palette card next to it. Does a piece look like one of your colours? Keep.",
  "Twijfel? Houd het onder je kin voor de spiegel. Licht je gezicht op, dan houden.": "Not sure? Hold it under your chin in front of a mirror. If your face lights up, keep it.",
  "Staat het je niet, maar draag je het graag? Draag het onder je middel: als broek of schoenen.": "Doesn't suit you, but you love it? Wear it below the waist: as trousers or shoes.",
  "Staat het je niet, maar draag je het graag? Draag het onder je middel: als broek, rok of schoenen.": "Doesn't suit you, but you love it? Wear it below the waist: as trousers, a skirt or shoes.",
  "Wat overblijft: doorverkopen of weggeven. Zo heb je minder, maar draag je alles.": "What's left: sell it or give it away. You'll own less, but wear everything.",
  // shopping
  "Houd het kledingstuk bij daglicht onder je kin. Lichten je ogen op en oogt je huid egaal? Dan is het jouw kleur.": "Hold the garment under your chin in daylight. Do your eyes light up and does your skin look even? Then it's your colour.",
  "Twijfel tussen twee tinten? Kies de tint die het dichtst bij een kleur op je pas ligt.": "Torn between two shades? Pick the one closest to a colour on your card.",
  "Een kleur die je niet staat, kan wel onder je middel: als broek of schoenen.": "A colour that doesn't suit you can still go below the waist: as trousers or shoes.",
  "Een kleur die je niet staat, kan wel onder je middel: als broek, rok of schoenen.": "A colour that doesn't suit you can still go below the waist: as trousers, a skirt or shoes.",
  "Online: vergelijk de productfoto met je pas op hetzelfde scherm. Productfoto's zijn vaak warmer of feller dan in het echt.": "Online: compare the product photo with your palette on the same screen. Product photos are often warmer or brighter than real life.",
  "Jij kunt contrast hebben: Licht naast donker en een heldere kleur bij je gezicht staan je sterk.": "You can carry contrast: light next to dark and a clear colour by your face look strong on you.",
  "Jij wint met tonaal: Kleuren die dicht bij elkaar liggen laten je rustig en verzorgd ogen.": "You win with tonal: colours that sit close together make you look calm and polished.",
  "Jij zit in het midden: Gemiddeld contrast werkt het best: één duidelijk accent per outfit, de rest rustig.": "You sit in the middle: one clear accent per outfit, the rest quiet.",
  // avoid reasons
  "te warm voor je koele ondertoon": "too warm for your cool undertone",
  "te koel voor je warme ondertoon": "too cool for your warm undertone",
  "te fel naast je zachte kleuren": "too loud next to your soft colours",
  "te fel: hij overstemt je gezicht": "too bright: it overpowers your face",
  "te vlak naast je contrast": "too flat next to your contrast",
  "trekt de aandacht weg van je gezicht": "pulls attention away from your face",
  // make-up
  Lippen: "Lips", Blush: "Blush", Ogen: "Eyes",
  "Gedempt en romig, niet te glanzend.": "Muted and creamy, not too glossy.",
  "Een heldere tint mag: hij past bij je contrast.": "A clear shade is welcome: it matches your contrast.",
  "Perzik- en koraaltinten.": "Peach and coral shades.",
  "Roze- en bestinten.": "Pink and berry shades.",
  "Zacht rozenhout.": "Soft rosewood.",
  "Je basiskleuren als oogschaduw of eyeliner.": "Your base colours as eyeshadow or eyeliner.",
};
export function t(nl: string): string {
  const en = T[nl];
  if (!en) throw new Error(`no English text for "${nl}"`);
  return en;
}

const ITEM: Record<string, string> = {
  Blazer: "Blazer", Blouse: "Blouse", "Blouse of top": "Blouse or top", Chino: "Chinos", Colbert: "Jacket",
  "Colbert of overshirt": "Jacket or overshirt", Jeans: "Jeans", Longsleeve: "Long-sleeve top", Overhemd: "Shirt",
  Overshirt: "Overshirt", Pantalon: "Trousers", Riem: "Belt", Rok: "Skirt", Schoenen: "Shoes", "Schoenen en riem": "Shoes and belt",
  Sjaal: "Scarf", Sneakers: "Sneakers", Tas: "Bag", Top: "Top", Trui: "Knit",
};
export function item(nl: string): string {
  if (!ITEM[nl]) throw new Error(`no English garment for "${nl}"`);
  return ITEM[nl];
}

export const sw = (s: Swatch): Swatch => ({ name: colorNameEn(s.name), hex: s.hex });

/** Accessories rebuilt in English from the engine's swatches (the Dutch texts interpolate names). */
export function accessoriesEn(g: Guide, men: boolean): { title: string; text: string; swatches: Swatch[] }[] {
  const u = g.scales.values.undertone;
  const metalText = u > 0.15 ? "Warm metals make your skin glow." : u < -0.15 ? "Cool metals match your cool undertone." : "Your undertone is neutral: rose gold and both metals work.";
  const A = g.accessories.map((a) => ({ ...a, swatches: a.swatches.map(sw) }));
  const n = (s: Swatch) => s.name.toLowerCase();
  if (men) {
    const [watch, belt, shoes, glasses] = A as [typeof A[0], typeof A[0], typeof A[0], typeof A[0]];
    return [
      { title: "Watch", text: `${watch.swatches[0]!.name} case, ${n(watch.swatches[1]!)} strap. ${metalText}`, swatches: watch.swatches },
      { title: "Belt", text: `${belt.swatches[0]!.name} leather with a ${n(belt.swatches[1]!)} buckle; match it to your shoes.`, swatches: belt.swatches },
      { title: "Shoes", text: `${shoes.swatches.map((s) => s.name).join(" or ")} leather or suede.`, swatches: shoes.swatches },
      { title: "Glasses and sunglasses", text: `${glasses.swatches[0]!.name}: the frame follows your depth.`, swatches: glasses.swatches },
    ];
  }
  const [jewel, bag, scarf, sun] = A as [typeof A[0], typeof A[0], typeof A[0], typeof A[0]];
  return [
    { title: "Jewellery", text: `${jewel.swatches.map((s) => s.name).join(", ")}. ${metalText}`, swatches: jewel.swatches },
    { title: "Bag and shoes", text: `${bag.swatches.map((s) => s.name).join(" or ")}: pick one leather colour and stick with it.`, swatches: bag.swatches },
    { title: "Scarf", text: `An accent colour by your face: ${n(scarf.swatches[0]!)} or ${n(scarf.swatches[1]!)}.`, swatches: scarf.swatches },
    { title: "Sunglasses", text: `${sun.swatches[0]!.name}.`, swatches: sun.swatches },
  ];
}
