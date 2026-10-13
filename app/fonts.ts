// Brand typefaces (CLAUDE.md §6), self-hosted by next/font: no request to Google at runtime.
// Only Archivo (KULØRT headlines, the first test) and Manrope (body) are preloaded.
import { Archivo, Bodoni_Moda, Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";

export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
export const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-bodoni", display: "swap", preload: false });
export const bricolage = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--font-bricolage", display: "swap", preload: false });
export const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap", preload: false });

export const fontVariables = [archivo, bodoni, bricolage, manrope, mono].map((f) => f.variable).join(" ");
