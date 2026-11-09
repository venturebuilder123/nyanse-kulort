import { analysisEs, emailEs, pageEs, resultEs, retentionEs, SELFIE_ES_NYANSE } from "../common.es";
import type { VoiceCopy } from "../types";

// NYANSE en español (9 Nov 2026). Girl Math: cuentas juguetonas con un guiño, nunca promesas de
// dinero. Boss Lady: segura y con poco tiempo, "compra menos, elige mejor". Signature: serena y
// adulta, colores para quien eres ahora; nunca "parecer más joven", nunca inseguridad.

const accessories = "qué joyas, bolsos y tonos de maquillaje te favorecen";
const shared = {
  pass: { label: "Tarjeta de color", season: "Tu estación" },
  selfie: SELFIE_ES_NYANSE,
  analysis: analysisEs("Joyas: ¿oro o plata?"),
  ring: ["#C8285A", "#C9A9AC", "#8FA3B8", "#A6879C", "#B9926B", "#2F4F3A", "#A2462A", "#1F4FC4", "#F4E3A1", "#D9C7AE"],
};
const style = (headline: readonly [string, string]) => ({ pill: "Gratis", skip: "Saltar", headline, occasionQuestion: "", budgetQuestion: "¿Cuánto sueles gastar por prenda?", shopsQuestion: "¿Dónde te gusta comprar?", shopsHint: "Opcional. Así luego buscamos en los sitios adecuados.", next: "Siguiente: selfie" });
const free = { title: "Gratis", text: "Tu tipo de color exacto (p. ej. Soft Summer), 6 colores que te hacen brillar y lo que mejor evitar." };
const paid = { title: "En tu guía, desde 12,99 €", text: "Los 30 colores con nombre, combinaciones que funcionan y qué joyas, bolsos y tonos de maquillaje te favorecen." };
const proof = { title: ["La misma cara.", "Otro color."] as const, text: "Un paño bajo la barbilla y ves la diferencia. Exactamente lo que hace la app con tu selfie." };

export const bossladyEs: VoiceCopy = {
  ...shared,
  locale: "es",
  meta: { title: "NYANSE · ¿Qué colores te favorecen? Análisis de color con un selfie", description: "Tu perfil de color personal a partir de un selfie, contigo en cada tienda." },
  landing: {
    pill: "Perfil de color gratis",
    eyebrow: "Análisis de color con un selfie",
    headline: ["Colores que trabajan", "tanto como tú."],
    sub: "Sin tiempo para compras fallidas. Un selfie muestra qué colores te dan un aire seguro, de la reunión a la cena.",
    trustMain: "Tu foto no sale de tu móvil",
    occasionQuestion: "¿Dónde quieres estar espectacular? Elige una o más.",
    trustSmall: ["Sin cuenta", "Perfil de color gratis"],
    free,
    paid,
    hero: { caption: "La misma cara. Otro color.", bad: "apaga", good: "tu color" },
  },
  page: pageEs({ galleryTitle: ["La misma cara.", "Otro color."], howTitle: ["Cómo", "funciona."], compareTitle: ["¿Gratis o", "la guía?"], finalTitle: ["Compra menos,", "elige mejor."], accessories, trustTitle: ["Tranquila y", "sin complicaciones."] }),
  story: {
    image: "/brand/editorial/nyanse-jv-campagne-1.jpg",
    imageAlt: "Una mujer frente al espejo elige entre una blusa coral y una gris",
    pains: { title: ["Bonito. Comprado.", "Nunca puesto."], items: [["Sin tiempo para dudas", "Tu agenda está llena. Tu armario simplemente tiene que funcionar."], ["Prendas bonitas, sin looks", "Todo comprado por separado, nada combina."], ["Devoluciones como hobby", "Pedido online y en casa resulta que no es tu color."]] },
    proof,
    gets: { title: ["Lo que", "recibes."], items: [["Tu perfil de color", "Gratis: tu tipo, tus 6 mejores colores y lo que mejor dejar en la percha."], ["Tu guía de estilo personal", "Los 30 colores, 4 looks, una cápsula de 12 prendas, joyas, bolso y maquillaje."], ["Tu tarjeta de color", "En la cartera. En la tienda ves de un vistazo si funciona."]] },
    final: ["Compra menos,", "elige mejor."],
  },
  retention: retentionEs({ friend: "una amiga", friendLine: "Descuento de amiga", calm: true, weekly: ["{kleur}. Llévalo cerca de la cara: una blusa, un pañuelo, un jersey.", "{kleur} esta semana. Una prenda, el resto en tus neutros.", "{kleur}. Compra menos, elige mejor: mira primero en tu propio armario."] }),
  guide: {
    tagline: "Compra menos, elige mejor.",
    summary: "Tus colores de un vistazo. Tenlos a mano.",
    effect: "La diferencia es una sola cosa: el color cerca de tu cara.",
    combos: "Cuatro combinaciones en las que todo combina.",
    swaps: "Esto no, esto sí. Una alternativa más tranquila de tu propia paleta.",
    closing: ["Un armario donde", "todo combina."],
  },
  style: style(["Tu estilo,", "tu presupuesto."]),
  email: emailEs(["Tus colores están", "listos."]),
  result: resultEs(
    "6 colores que te hacen brillar",
    ["Los 30 colores con nombre: base, acento y neutros", "Combinaciones que funcionan, para que tu armario combine", "Joyas, bolsos y tonos de maquillaje", "Tu guía de estilo personal en PDF + tarjeta digital"],
    { kind: "compare", title: "Elige bien, una vez", them: ["Asesora de color", "una cita de 1 a 2 horas"], us: ["Con tu guía de estilo", "un selfie, tus colores siempre contigo"] },
  ),
};

export const girlmathEs: VoiceCopy = {
  ...bossladyEs,
  meta: { title: "NYANSE · ¿Qué colores te favorecen? Análisis de color con un selfie", description: "Deja de comprar lo que no te favorece. Tus colores a partir de un selfie." },
  landing: {
    ...bossladyEs.landing,
    headline: ["Deja de comprar lo que", "no te favorece."],
    sub: "Un selfie = sabes qué colores te favorecen. Y también cuáles no necesitas comprar.",
    free: { title: "Gratis", text: "Tu tipo de color exacto (p. ej. Bright Spring), 6 colores que te favorecen y lo que puedes saltarte." },
    paid: { title: "En tu guía, desde 12,99 €", text: "Los 30 colores con nombre, combinaciones que funcionan y qué joyas y tonos de maquillaje te favorecen." },
  },
  page: pageEs({ galleryTitle: ["La misma cara.", "Otro color."], howTitle: ["Así de", "fácil."], compareTitle: ["¿Gratis o", "la guía?"], finalTitle: ["Deja de comprar lo que", "no te favorece."], accessories: "qué joyas y tonos de maquillaje te favorecen", trustTitle: ["Sin líos,", "sin trampa."] }),
  story: {
    image: "/brand/editorial/nyanse-jong-campagne-1.jpg",
    imageAlt: "Tres amigas en un piso de estudiantes sostienen un top lila",
    pains: { title: ["Armario lleno,", "nada que ponerte."], items: [["Probador: sí. En casa: no.", "No eras tú. Era el color."], ["Otra más en negro", "Porque es seguro. Pero ¿el negro es siquiera tu color?"], ["Devolución número mil", "Pedir, probar, devolver. Otra vez."]] },
    proof: { title: ["La misma cara.", "Otro color."], text: "Un paño bajo la barbilla y lo ves al instante. Exactamente lo que hace la app con tu selfie." },
    gets: { title: ["Lo que", "recibes."], items: [["Tu perfil de color", "Gratis: tu tipo, tus 6 mejores colores y lo que puedes saltarte."], ["Tu guía de estilo personal", "30 colores, 4 looks, una cápsula de 12 prendas: más looks con menos ropa."], ["Tu tarjeta de color", "En la cartera, para el probador. Se acabaron las compras de quizás."]] },
    final: ["Deja de comprar lo que", "no te favorece."],
  },
  retention: {
    ...retentionEs({ friend: "una amiga", friendLine: "Descuento bestie", weekly: ["{kleur} es tu color de la semana. Cerca de la cara = glow al instante.", "{kleur}. Mira primero en tu armario: igual ya lo tienes 👀", "{kleur} esta semana. Una prenda, el resto neutro. Listo."] }),
    greet: "Hola {type} ✨",
    resumeTitle: "¡Ya casi!",
    resumeCta: "Terminar",
    guideText: "Tu guía de estilo está lista 💅",
    invited: "{naam} te ha invitado 💌 Tienes 1 € de descuento en tu guía.",
    invitedAnon: "Una amiga te ha invitado 💌 Tienes 1 € de descuento en tu guía.",
  },
  guide: {
    tagline: "Menos compras fallidas, más looks que funcionan. ✨",
    summary: "La chuleta. Captura y listo.",
    effect: "La misma cara, otro color. Ese es todo el secreto.",
    combos: "Cuatro looks que siempre funcionan. Girl math: eso son combinaciones infinitas.",
    swaps: "Esto no, esto sí. Para que nunca vuelvas a comprar lo que no es.",
    closing: ["Deja de comprar lo que", "no te favorece."],
  },
  style: style(["¿Cuál es tu", "presupuesto?"]),
  email: emailEs(["Vale, tus colores están", "listos."]),
  result: resultEs(
    "6 colores que te hacen brillar",
    ["Los 30 colores con nombre: base, acento y neutros", "Combinaciones que funcionan, así menos compras fallidas", "Joyas y tonos de maquillaje", "Tu guía de estilo personal en PDF + tarjeta digital"],
    { kind: "receipt", title: "Por qué en realidad es un chollo", head: "Girl math", lines: [["Guía de estilo", "12,99 €"], ["÷ 365 días", "0,04 € al día"], ["Menos adivinar al comprar", "✓"]], total: ["Girl math dice", "merece la pena ✨"] },
  ),
  ring: ["#D61F5B", "#FFE9A6", "#F4A3A0", "#8FA3B8", "#F3A27A", "#A6879C", "#2BB3A8", "#FFE6EE", "#B9926B", "#6E5468"],
};

export const signatureEs: VoiceCopy = {
  ...bossladyEs,
  meta: { title: "NYANSE · Colores para quien eres ahora", description: "Tu perfil de color personal a partir de un selfie, contigo en cada tienda." },
  landing: {
    ...bossladyEs.landing,
    headline: ["Colores para", "quien eres ahora."],
    sub: "Tu pelo, tu piel y tu gusto evolucionan. Un selfie muestra qué colores te favorecen más hoy.",
    hero: { caption: "La misma cara. Otro color.", bad: "resta", good: "tu color" },
  },
  page: pageEs({ galleryTitle: ["La misma cara.", "Otro color."], howTitle: ["Cómo", "funciona."], compareTitle: ["¿Gratis o", "la guía?"], finalTitle: ["Colores con", "seguridad."], accessories, trustTitle: ["Tranquila, personal,", "sin complicaciones."] }),
  story: {
    image: "/brand/editorial/nyanse-40-campagne-1.jpg",
    imageAlt: "Una mujer de pelo gris plata con una blusa azul cobalto en la mesa de un café",
    pains: { title: ["Tus colores", "cambian contigo."], items: [["Lo que antes te favorecía ahora te favorece distinto", "Pelo más gris, piel más suave: tu paleta también se desplaza."], ["Un armario lleno de viejas certezas", "Colores que siempre llevaste y que ahora hacen menos por ti."], ["Menos, pero mejor", "Compras con cuidado. Así que el color tiene que acertar."]] },
    proof,
    gets: { title: ["Lo que", "recibes."], items: [["Tu perfil de color", "Gratis: tu tipo, tus 6 mejores colores y lo que mejor dejar en la percha."], ["Tu guía de estilo personal", "Los 30 colores, 4 looks, una cápsula de 12 prendas, joyas y maquillaje."], ["Tu tarjeta de color", "En la cartera. En la tienda ves de un vistazo si funciona."]] },
    final: ["Colores para", "quien eres ahora."],
  },
  retention: retentionEs({ friend: "una amiga", friendLine: "Descuento de amiga", calm: true, weekly: ["{kleur}. Llévalo cerca de la cara: una blusa, un pañuelo, un jersey.", "{kleur} esta semana. Una prenda, el resto en tus neutros.", "{kleur}. Precioso con el pelo gris o plateado: llévalo cerca de la cara."] }),
  guide: {
    tagline: "Calma en tu armario, seguridad en tus colores.",
    summary: "Tus colores de un vistazo. Tenlos a mano.",
    effect: "La diferencia es una sola cosa: el color cerca de tu cara.",
    combos: "Cuatro combinaciones en las que todo combina.",
    swaps: "Esto no, esto sí. Una alternativa más tranquila de tu propia paleta.",
    closing: ["Colores para", "quien eres ahora."],
  },
  style: style(["Tu estilo,", "tu elección."]),
  result: resultEs(
    "6 colores que más te favorecen ahora",
    ["Los 30 colores con nombre: base, acento y neutros", "Combinaciones que funcionan, para que tu armario combine", "Joyas, bolsos y tonos de maquillaje", "Tu guía de estilo personal en PDF + tarjeta digital"],
    { kind: "compare", title: "Tus colores cambian contigo", them: ["Antes", "colores elegidos para tu pelo de entonces"], us: ["Ahora", "medidos en quien eres hoy, canas incluidas"] },
  ),
  ring: ["#6B2D5C", "#B9A3B0", "#7D8FA6", "#A6879C", "#C2A27E", "#3F5A4C", "#8E3B46", "#2B4A8C", "#E9DCC4", "#CFC3B8"],
};
