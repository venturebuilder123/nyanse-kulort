// The analysis result. CLAUDE.md §5: the profile stays on the device by default (localStorage,
// numbers only) and is deleted with one tap. The photo itself lives in memory only, for the
// before/after slider, and is gone when the tab closes. Storage can be blocked (private mode),
// so everything falls back to memory instead of failing.

import type { Measurements, Profile, ProfileContext } from "@/lib/color/profile";
import { computeProfile } from "@/lib/color/profile";
import { profileForSeason } from "@/lib/color/declared";
import type { SeasonKey } from "@/lib/color/seasons";
import { applyJewel } from "./tiebreak";

export type Jewel = "goud" | "zilver" | "weetniet";
export type HairAnswer = NonNullable<ProfileContext["hair"]>;

/** Face position in the photo (fractions), for cropping the drape views. */
export type FaceBox = { cx: number; cy: number; w: number; h?: number; aspect: number; mirrored: boolean };

export type FlowResult = {
  /** from the selfie (pipeline A); absent when the person declared their season */
  measurements?: Measurements;
  /** "ik weet mijn kleurtype al": the season the person chose themselves */
  declared?: SeasonKey;
  /** true when even the retry selfie stayed below the confidence threshold */
  lowConfidence: boolean;
  jewel?: Jewel;
  hair?: HairAnswer;
  face?: FaceBox;
  /** set by the confirmation page after payment; until payments are wired: /klaar?status=paid */
  paid?: boolean;
  /** name on the guide's cover (CLAUDE.md §9: PDF with name on the cover) */
  name?: string;
  /** friend code, created on this device the first time the guide opens */
  refCode?: string;
  pipeline: "A" | "declared";
  at: number;
};

const KEY = "nk_profile";
let memory: FlowResult | null = null;
let photo: { blob: Blob; url: string } | null = null;

const store = {
  get(): FlowResult | null {
    if (memory) return memory;
    for (const s of [safe(() => sessionStorage), safe(() => localStorage)]) {
      const raw = s && safe(() => s.getItem(KEY));
      if (raw) {
        try {
          return (memory = JSON.parse(raw) as FlowResult);
        } catch {}
      }
    }
    return null;
  },
  set(r: FlowResult) {
    memory = r;
    const json = JSON.stringify(r);
    safe(() => sessionStorage.setItem(KEY, json));
    safe(() => localStorage.setItem(KEY, json));
  },
  clear() {
    memory = null;
    for (const s of [safe(() => sessionStorage), safe(() => localStorage)]) {
      safe(() => s?.removeItem(KEY));
      safe(() => s?.removeItem("nk_answers"));
      safe(() => s?.removeItem("nk_email"));
    }
  },
};

function safe<T>(fn: () => T): T | undefined {
  try {
    return fn();
  } catch {
    return undefined;
  }
}

export const flowSession = {
  setPhoto(blob: Blob) {
    if (photo) URL.revokeObjectURL(photo.url);
    photo = { blob, url: URL.createObjectURL(blob) };
  },
  photoUrl: () => photo?.url ?? null,

  setResult: (r: FlowResult) => store.set(r),
  result(): (FlowResult & { profile: Profile }) | null {
    const r = store.get();
    // always recompute, so the latest rules and answers apply
    if (!r) return null;
    if (r.declared) return { ...r, profile: profileForSeason(r.declared) };
    return r.measurements ? { ...r, profile: applyJewel(computeProfile(r.measurements, { hair: r.hair }), r.jewel) } : null;
  },

  /** Merge later answers (analysis questions, e-mail) into the stored result. */
  update(patch: Partial<FlowResult>) {
    const r = store.get();
    if (r) store.set({ ...r, ...patch });
  },

  /** "Verwijder mijn profiel": everything on this device, in one tap. */
  clear() {
    if (photo) URL.revokeObjectURL(photo.url);
    photo = null;
    store.clear();
  },
};
