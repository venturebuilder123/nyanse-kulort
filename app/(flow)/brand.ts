import { headers } from "next/headers";
import { BRANDS, VOICES } from "@/lib/brand/config";
import { BRAND_HEADER, CHOSEN_HEADER, resolveBrand, VOICE_HEADER } from "@/lib/brand/resolve";
import { SEGMENT_HEADER, type Segment } from "@/lib/brand/segment";
import type { BrandKey, VoiceKey } from "@/lib/brand/types";

/** Brand and voice for this request, as set by proxy.ts. */
export async function currentBrand() {
  const h = await headers();
  const fromProxy = { brand: h.get(BRAND_HEADER) as BrandKey | null, voice: h.get(VOICE_HEADER) as VoiceKey | null };
  const { brand, voice, chosen } =
    fromProxy.brand && fromProxy.voice
      ? { brand: fromProxy.brand, voice: fromProxy.voice, chosen: h.get(CHOSEN_HEADER) !== "0" }
      : resolveBrand({ host: h.get("host") });
  const seg = h.get(SEGMENT_HEADER);
  const segment: Segment | null = seg === "jong" || seg === "40" ? seg : null;
  return { brand, voice, chosen, segment, config: BRANDS[brand], copy: VOICES[voice] };
}
