import { analysisEs, emailEs, pageEs, resultEs, retentionEs, SELFIE_ES } from "../common.es";
import type { VoiceCopy } from "../types";

// KULØRT en español (9 Nov 2026). Wingman: seguridad y primera impresión, siempre sobre él.
// Director: presencia y autoridad, calidad antes que cantidad. Las mismas reglas que las voces neerlandesas.

const accessories = "qué reloj, cinturón y zapatos te van";
const page = pageEs({ galleryTitle: ["La misma cara.", "Otro color."], howTitle: ["Tres pasos.", "Listo."], compareTitle: ["¿Gratis o", "la guía?"], finalTitle: ["Sabe qué colores", "juegan a tu favor."], accessories, trustTitle: ["Sin líos.", "Sin adivinar."] });
const weekly = ["{kleur}. Llévalo cerca de la cara: camisa, jersey o corbata.", "{kleur} esta semana. Una prenda basta, el resto neutro.", "{kleur}. Funciona bajo una americana oscura, incluso un lunes."] as const;
const shared = {
  pass: { label: "Tarjeta de color", season: "Tu estación" },
  style: { pill: "Gratis", skip: "Saltar", headline: ["¿Dónde", "compras?"] as const, occasionQuestion: "", budgetQuestion: "¿Cuánto sueles gastar por prenda?", shopsQuestion: "¿Dónde te gusta comprar?", shopsHint: "Opcional. Así luego buscamos en los sitios adecuados.", next: "Siguiente: selfie" },
  selfie: SELFIE_ES,
  analysis: analysisEs("Reloj o anillo: ¿oro o plata?"),
  email: emailEs(["Tus colores están", "listos."]),
  result: resultEs(
    "6 colores que juegan a tu favor",
    ["Los 30 colores con nombre: base, acento y neutros", "Combinaciones para trabajo, fin de semana y citas", "Reloj, cinturón, zapatos y gafas: qué metal y qué piel", "Tu guía de estilo personal en PDF + tarjeta digital"],
    { kind: "impression", title: "Por qué importa", label: "Primera impresión", big: "0,1 s", text: "Ese es el tiempo que tarda alguien en formarse una primera impresión de una cara.", source: "Willis & Todorov, Psychological Science, 2006" },
  ),
  guide: {
    tagline: "La primera impresión, resuelta.",
    summary: "Todo lo que necesitas saber, en una página. Hazle una captura.",
    effect: "Por eso funciona. La misma cara, la misma luz. Solo cambia el color bajo la barbilla.",
    combos: "Cuatro looks que siempre funcionan. Sin líos, sin adivinar.",
    swaps: "Esto no, esto sí. Cómo sustituir lo que no te favorece.",
    closing: ["Ponte lo que", "juega a tu favor."] as const,
  },
  ring: ["#1B2A5C", "#8A4A26", "#5E6A7A", "#2F4F3A", "#B9926B", "#6E1F2A", "#4F6886", "#C99A1E", "#3A3D45", "#EADCC2"],
};

export const wingmanEs: VoiceCopy = {
  ...shared,
  locale: "es",
  meta: { title: "KULØRT · ¿Qué colores te quedan bien de verdad? Análisis de color con un selfie", description: "Descubre con un selfie qué colores te dan un aire impecable y cuáles mejor dejar en la percha." },
  landing: {
    pill: "Perfil de color gratis",
    eyebrow: "Análisis de color con un selfie",
    headline: ["¿Qué colores te quedan", "bien de verdad?"],
    sub: "Ve al instante qué colores te dan un aire impecable y cuáles mejor dejar en la percha.",
    trustMain: "Tu foto no sale de tu móvil",
    occasionQuestion: "¿Dónde quieres causar buena impresión? Elige una o más.",
    trustSmall: ["Sin cuenta", "Perfil de color gratis"],
    free: { title: "Gratis", text: "Tu tipo de color exacto (p. ej. Bright Winter), 6 colores que te favorecen y lo que mejor dejar en la percha." },
    paid: { title: "En tu guía, desde 12,99 €", text: "Los 30 colores con nombre, combinaciones que funcionan y qué reloj, cinturón y zapatos te van." },
    hero: { caption: "La misma cara. Otro color.", bad: "apaga", good: "tu color" },
  },
  page,
  story: {
    image: "/brand/editorial/kulort-jv-campagne-1.jpg",
    imageAlt: "Un hombre con americana azul marino y camisa celeste en la oficina",
    pains: { title: ["Armario lleno.", "Nada que ponerte."], items: [["Genial en la tienda, en casa no", "Rara vez es el corte. Casi siempre es el color."], ["Prendas sueltas", "Un montón de camisas que no van con nada."], ["Adivinar cada mañana", "Y acabar otra vez con la misma camisa."]] },
    proof: { title: ["La misma cara.", "Otro color."], text: "Un paño bajo la barbilla y ves la diferencia. Exactamente lo que hace la app con tu selfie." },
    gets: { title: ["Lo que", "recibes."], items: [["Tu perfil de color", "Gratis: tu tipo, tus 6 mejores colores y lo que mejor dejar en la percha."], ["Tu guía de estilo personal", "Los 30 colores, 4 looks para trabajo, fin de semana, citas y fiestas, y una cápsula de 12 prendas."], ["Tu tarjeta de color", "En la cartera. En la tienda lo sabes de un vistazo."]] },
    final: ["Sabe qué colores", "juegan a tu favor."],
  },
  retention: retentionEs({ friend: "un amigo", friendLine: "Descuento de amigo", weekly }),
};

export const directorEs: VoiceCopy = {
  ...wingmanEs,
  landing: {
    ...wingmanEs.landing,
    headline: ["La impresión correcta,", "cada día."],
    sub: "Compra menos, elige mejor. Un selfie muestra qué colores te dan un aire sereno y seguro, en la sala de juntas y fuera de ella.",
    occasionQuestion: "¿Dónde tiene que estar perfecto? Elige una o más.",
  },
  story: {
    image: "/brand/editorial/kulort-vol-campagne-1.jpg",
    imageAlt: "Un hombre coge un jersey camel de una pila de prendas de punto",
    pains: { title: ["Comprado.", "Nunca puesto."], items: [["Invertir sin retorno", "Una buena americana que aun así no funciona. Era el color."], ["Sin tiempo para dudas", "Tu agenda está llena. Tu armario simplemente tiene que funcionar."], ["Un armario sin línea", "Prendas bonitas que juntas no dicen nada."]] },
    proof: wingmanEs.story.proof,
    gets: { title: ["Lo que", "recibes."], items: [["Tu perfil de color", "Gratis: tu tipo, tus 6 mejores colores y lo que mejor dejar en la percha."], ["Tu guía de estilo personal", "Los 30 colores, 4 looks y una cápsula de 12 prendas: todo lo que compras combina."], ["Tu tarjeta de color", "Tus colores en el bolsillo. En el sastre o en la tienda, de un vistazo."]] },
    final: ["Un armario que", "juega a tu favor."],
  },
};
