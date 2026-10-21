// Words that come out of the (Dutch) colour engine, shown in the visitor's language.
import { colourSafe, FAMILY_EN, itemSafe, SCALE_WORD_EN } from "@/lib/guide/en";
import type { Locale } from "./locale";

export const colourName = (nl: string, locale: Locale) => (locale === "en" ? colourSafe(nl) : nl);
export const scaleWord = (nl: string, locale: Locale) => (locale === "en" ? SCALE_WORD_EN[nl] ?? nl : nl);
export const familyName = (nl: string, locale: Locale) => (locale === "en" ? FAMILY_EN[nl] ?? nl : nl);
export const garmentName = (nl: string, locale: Locale) => (locale === "en" ? itemSafe(nl) : nl);
