import { headers } from "next/headers";
import { BRANDS, VOICES } from "@/lib/brand/config";
import { BRAND_HEADER, resolveBrand, VOICE_HEADER } from "@/lib/brand/resolve";
import type { BrandKey, VoiceKey } from "@/lib/brand/types";

/** Brand and voice for this request, as set by proxy.ts. */
export async function currentBrand() {
  const h = await headers();
  const fromProxy = { brand: h.get(BRAND_HEADER) as BrandKey | null, voice: h.get(VOICE_HEADER) as VoiceKey | null };
  const { brand, voice } =
    fromProxy.brand && fromProxy.voice
      ? { brand: fromProxy.brand, voice: fromProxy.voice }
      : resolveBrand({ host: h.get("host") });
  return { brand, voice, config: BRANDS[brand], copy: VOICES[voice] };
}
