import { BRANDS, DEFAULT_BRAND, VOICE_PARAM } from "./config";
import type { BrandKey, VoiceKey } from "./types";

export const BRAND_COOKIE = "nk_brand";
export const VOICE_COOKIE = "nk_voice";
export const BRAND_HEADER = "x-nk-brand";
export const VOICE_HEADER = "x-nk-voice";

const isBrand = (v: string | null | undefined): v is BrandKey => v === "nyanse" || v === "kulort";

export function brandForHost(host: string | null): BrandKey | null {
  const h = (host ?? "").toLowerCase().split(":")[0]!.replace(/^www\./, "");
  for (const b of Object.values(BRANDS)) if (b.hosts.includes(h)) return b.key;
  return null;
}

/**
 * Brand: a production brand domain always wins (CLAUDE.md §2). Elsewhere (localhost,
 * previews) ?brand= decides, then the cookie, then the default.
 * Voice: ?s=gm|at, then the cookie, then the brand's default; never a voice of the other brand.
 */
export function resolveBrand(input: {
  host: string | null;
  brandParam?: string | null;
  voiceParam?: string | null;
  brandCookie?: string | null;
  voiceCookie?: string | null;
}): { brand: BrandKey; voice: VoiceKey } {
  const byHost = brandForHost(input.host);
  const brand: BrandKey =
    byHost ?? (isBrand(input.brandParam) ? input.brandParam : isBrand(input.brandCookie) ? input.brandCookie : DEFAULT_BRAND);

  const allowed = BRANDS[brand].voices;
  const fromParam = input.voiceParam ? VOICE_PARAM[input.voiceParam] : undefined;
  const fromCookie = input.voiceCookie as VoiceKey | undefined;
  const voice =
    fromParam && allowed.includes(fromParam)
      ? fromParam
      : fromCookie && allowed.includes(fromCookie)
        ? fromCookie
        : BRANDS[brand].defaultVoice;
  return { brand, voice };
}
