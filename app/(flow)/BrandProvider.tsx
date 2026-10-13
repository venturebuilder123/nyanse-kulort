"use client";

import { createContext, useContext } from "react";
import type { BrandConfig, VoiceCopy, VoiceKey } from "@/lib/brand/types";

type BrandCtx = { config: BrandConfig; voice: VoiceKey; copy: VoiceCopy };

const Ctx = createContext<BrandCtx | null>(null);

export function BrandProvider({ value, children }: { value: BrandCtx; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBrand(): BrandCtx & { ctx: { brand: string; voice: string } } {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBrand outside BrandProvider");
  return { ...v, ctx: { brand: v.config.key, voice: v.voice } };
}
