// The analysis result for this visit. Numbers go to sessionStorage; the photo stays in
// memory only (for the before/after slider) and is gone when the tab closes.

import type { Measurements, Profile, ProfileContext } from "@/lib/color/profile";
import { computeProfile } from "@/lib/color/profile";

export type Jewel = "goud" | "zilver" | "weetniet";
export type HairAnswer = NonNullable<ProfileContext["hair"]>;
export type SunAnswer = "verbrandt" | "rood-bruin" | "bruin" | "weetniet";

/** Face position in the photo (fractions), for cropping the drape views. */
export type FaceBox = { cx: number; cy: number; w: number; aspect: number; mirrored: boolean };

export type FlowResult = {
  measurements: Measurements;
  /** true when even the retry selfie stayed below the confidence threshold */
  lowConfidence: boolean;
  jewel?: Jewel;
  hair?: HairAnswer;
  /** stored for phase A analysis; not used in the rules until it proves useful */
  sun?: SunAnswer;
  face?: FaceBox;
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
      return r ? { ...r, profile: computeProfile(r.measurements, { hair: r.hair }) } : null;
    } catch {
      return null;
    }
  },

  /** Merge later answers (analysis questions, e-mail) into the stored result. */
  update(patch: Partial<FlowResult>) {
    const r = flowSession.result();
    if (!r) return;
    const { profile: _p, ...rest } = r;
    flowSession.setResult({ ...rest, ...patch });
  },

  clear() {
    if (photo) URL.revokeObjectURL(photo.url);
    photo = null;
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  },
};
