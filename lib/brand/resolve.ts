import { BRANDS, DEFAULT_BRAND, VOICE_PARAM } from "./config";
import type { BrandKey, VoiceKey } from "./types";

export const BRAND_COOKIE = "nk_brand";
export const VOICE_COOKIE = "nk_voice";
export const BRAND_HEADER = "x-nk-brand";
export const VOICE_HEADER = "x-nk-voice";
export const CHOSEN_HEADER = "x-nk-chosen";

const isBrand = (v: string | null | undefined): v is BrandKey => v === "nyanse" || v === "kulort";

export function brandForHost(host: string | null): BrandKey | null {
  const h = (host ?? "").toLowerCase().split(":")[0]!.replace(/^www\./, "");
  for (const b of Object.values(BRANDS)) if (b.hosts.includes(h)) return b.key;
  return null;
}

/**
 * Brand: a production brand domain always wins (CLAUDE.md §2). Elsewhere (the shared main
 * domain, previews, localhost) ?brand= decides, then a voice that belongs to one brand
 * (?s=gm → NYANSE), then the cookie. Nothing of that: not chosen yet, the home page shows
 * the split choice (decision 13 Oct 2026); other pages fall back to the default.
 * Voice: ?s=, then the age segment of a new link (?g=jong|40), then the cookie, then the brand's
 * default; never a voice of the other brand.
 */
const VOICE_BY_SEGMENT: Record<BrandKey, Partial<Record<string, VoiceKey>>> = {
  kulort: { jong: "wingman", "40": "director" },
  nyanse: { jong: "girlmath", "40": "signature" },
};

export function resolveBrand(input: {
  host: string | null;
  brandParam?: string | null;
  voiceParam?: string | null;
  brandCookie?: string | null;
  voiceCookie?: string | null;
  segmentParam?: string | null;
}): { brand: BrandKey; voice: VoiceKey; chosen: boolean } {
  const byHost = brandForHost(input.host);
  const paramVoice = input.voiceParam ? VOICE_PARAM[input.voiceParam] : undefined;
  const byVoice = paramVoice ? (Object.values(BRANDS).find((b) => b.voices.includes(paramVoice))?.key ?? null) : null;
  const picked: BrandKey | null =
    byHost ?? (isBrand(input.brandParam) ? input.brandParam : byVoice ?? (isBrand(input.brandCookie) ? input.brandCookie : null));
  const brand: BrandKey = picked ?? DEFAULT_BRAND;

  const allowed = BRANDS[brand].voices;
  const fromParam = input.voiceParam ? VOICE_PARAM[input.voiceParam] : undefined;
  const fromCookie = input.voiceCookie as VoiceKey | undefined;
  const fromSegment = input.segmentParam ? VOICE_BY_SEGMENT[brand][input.segmentParam] : undefined;
  const voice =
    fromParam && allowed.includes(fromParam)
      ? fromParam
      : fromSegment
        ? fromSegment
        : fromCookie && allowed.includes(fromCookie)
        ? fromCookie
        : BRANDS[brand].defaultVoice;
  return { brand, voice, chosen: picked !== null };
}
