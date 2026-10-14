// Age segment for imagery (docs/fase-b/DOELGROEPEN.md). It follows the ad, like the voice:
// ?g=jong (±18–22) or ?g=40 (40+), kept for the visit. Never asked, never inferred from a photo.
// The Signature voice (NYANSE 40+) implies "40" unless the link says otherwise.

import type { VoiceKey } from "./types";

export type Segment = "jong" | "40";
export const SEGMENT_COOKIE = "nk_seg";
export const SEGMENT_HEADER = "x-nk-seg";

const isSegment = (v: string | null | undefined): v is Segment => v === "jong" || v === "40";

export function resolveSegment(input: { param?: string | null; cookie?: string | null; voice: VoiceKey }): Segment | null {
  if (isSegment(input.param)) return input.param;
  if (input.param === "") return null;
  if (isSegment(input.cookie)) return input.cookie;
  return input.voice === "signature" ? "40" : null;
}
