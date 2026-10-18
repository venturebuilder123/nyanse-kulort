"use client";

import { createContext, useContext } from "react";
import type { Segment } from "@/lib/brand/segment";
import type { BrandConfig, VoiceCopy, VoiceKey } from "@/lib/brand/types";
import type { Locale } from "@/lib/i18n/locale";
import { UI } from "@/lib/i18n/ui";

type BrandCtx = { config: BrandConfig; voice: VoiceKey; copy: VoiceCopy; segment: Segment | null; locale: Locale };

const Ctx = createContext<BrandCtx | null>(null);

export function BrandProvider({ value, children }: { value: BrandCtx; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBrand(): BrandCtx & { ctx: { brand: string; voice: string } } {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBrand outside BrandProvider");
  return { ...v, ctx: { brand: v.config.key, voice: v.voice } };
}

/** Shared interface words in the visitor's language (lib/i18n/ui.ts). */
export function useT() {
  const v = useContext(Ctx);
  return UI[v?.locale ?? "nl"];
}
