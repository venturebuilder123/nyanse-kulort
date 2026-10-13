// The analysis result for this visit. Numbers go to sessionStorage; the photo stays in
// memory only (for the before/after slider) and is gone when the tab closes.

import type { Measurements, Profile } from "@/lib/color/profile";
import { computeProfile } from "@/lib/color/profile";

export type Jewel = "goud" | "zilver" | "weetniet";

export type FlowResult = {
  measurements: Measurements;
  /** true when even the retry selfie stayed below the confidence threshold */
  lowConfidence: boolean;
  jewel?: Jewel;
  pipeline: "A";
  at: number;
};

const KEY = "nk_result";
let photo: { blob: Blob; url: string } | null = null;

export const flowSession = {
  setPhoto(blob: Blob) {
    if (photo) URL.revokeObjectURL(photo.url);
    photo = { blob, url: URL.createObjectURL(blob) };
  },
  photoUrl: () => photo?.url ?? null,

  setResult(r: FlowResult) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(r));
    } catch {}
  },
  result(): (FlowResult & { profile: Profile }) | null {
    try {
      const r = JSON.parse(sessionStorage.getItem(KEY) ?? "null") as FlowResult | null;
      // always recompute, so the latest rules apply
      return r ? { ...r, profile: computeProfile(r.measurements) } : null;
    } catch {
      return null;
    }
  },

  clear() {
    if (photo) URL.revokeObjectURL(photo.url);
    photo = null;
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  },
};
