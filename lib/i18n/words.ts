// Single words in the visitor's language (colour names, scale words, season families, garments).
// The engine and the data speak Dutch; lib/guide/lang.ts holds the translations.
import type { Locale } from "./locale";
import { colourIn_, familyIn, itemIn, scaleIn } from "@/lib/guide/lang";

export const colourName = (nl: string, locale: Locale) => colourIn_(nl, locale);
export const scaleWord = (nl: string, locale: Locale) => scaleIn(nl, locale);
export const familyName = (nl: string, locale: Locale) => familyIn(nl, locale);
export const garmentName = (nl: string, locale: Locale) => itemIn(nl, locale);
