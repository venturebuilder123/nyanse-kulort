// Rules that turn colour measurements (skin, hair, iris) into the three-scale profile.
// Measurement and rules are deliberately separate: lab runs store the raw measurements,
// so a new RULES version can be re-applied to old runs without new photos.

import { deltaE2000, labToLch, type Lab } from "./convert";
import { nearestSeason, type Scales, type SeasonMatch } from "./seasons";

export type RegionStat = {
  /** robust centre (per-channel median after trimming highlights and shadows) */
  lab: Lab;
  /** pixels used */
  n: number;
  /** standard deviation of L* within the region */
  sdL: number;
};

export type Measurements = {
  skin: RegionStat;
  /** left and right cheek separately, to judge uneven light */
  cheekLeft?: RegionStat;
  cheekRight?: RegionStat;
  hair?: RegionStat;
  iris?: RegionStat;
  beard?: RegionStat;
  /** face width in pixels, a proxy for resolution */
  faceWidthPx: number;
  /** true when the reference card was found and used for white balance and exposure */
  calibrated: boolean;
};

export type Profile = Scales & {
  confidence: Scales & { overall: number };
  match: SeasonMatch;
  rulesVersion: number;
};

export const RULES = {
  version: 4, // v4: own check of skin, eyes and hair (one tint lighter or darker), gold/silver counts in the undertone; v3: no hair = small penalty only (bald, headscarf); v2: hair warmth from chroma, hair answer, confidence without card
  // AANNAME: starting values from colour science on skin (hue angle ~40–65°, L* ~30–75);
  // to be tuned on phase A data, never on the test set used for the gate.
  // Skin undertone = signed distance (in Lab units) from the neutral hue line, not the hue
  // angle itself: the angle swings wildly when skin chroma is low (pale or overexposed skin),
  // the distance shrinks towards neutral instead. Found in the first end-to-end test.
  undertone: { skinHueNeutral: 52, skinSpan: 5, hairChromaNeutral: 9, hairChromaSpan: 8, irisHueNeutral: 60, irisHueSpan: 40 },
  depth: { skinL: [30, 75], hairL: [12, 65], irisL: [20, 60] },
  clarity: { contrastL: [10, 50], irisC: [4, 28], skinC: [14, 28], hairC: [3, 22] },
  weights: {
    // jewel: the gold-or-silver answer. A camera's white balance shifts with bright clothes, the
    // answer does not, so it may move the undertone a little (it no longer only breaks ties).
    undertone: { skin: 0.65, hair: 0.2, iris: 0.15, jewel: 0.2 },
    depth: { skin: 0.5, hair: 0.35, iris: 0.15 },
    clarity: { contrast: 0.45, iris: 0.25, skin: 0.15, hair: 0.15 },
  },
  minPixels: { skin: 400, hair: 300, iris: 25 },
} as const;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
/** Map v from [lo, hi] onto [0, 1]. */
const norm = (v: number, [lo, hi]: readonly [number, number]) => clamp((v - lo) / (hi - lo), 0, 1);

type Term = { value: number; weight: number };
function weighted(terms: Term[]): { value: number; weightUsed: number } {
  const w = terms.reduce((s, t) => s + t.weight, 0);
  if (w === 0) return { value: 0, weightUsed: 0 };
  return { value: terms.reduce((s, t) => s + t.value * t.weight, 0) / w, weightUsed: w };
}

/**
 * Signed perpendicular distance of (a*, b*) from the line through the origin at `neutralDeg`.
 * Positive = more yellow than neutral (warm), negative = more red/pink (cool).
 */
export function hueLineDistance({ a, b }: Lab, neutralDeg: number): number {
  const t = (neutralDeg * Math.PI) / 180;
  return b * Math.cos(t) - a * Math.sin(t);
}

/** Hair/iris hue only carries information when the colour is not grey. */
const chromaWeight = (C: number, full: number) => clamp(C / full, 0, 1);

/**
 * What the person told us during the analysis screen. Dyed hair says nothing about natural
 * colouring; grey hair still sets today's contrast but not the undertone; no hair = no hair term.
 */
export type ProfileContext = { hair?: "natural" | "dyed" | "grey" | "none" | "covered"; jewel?: "goud" | "zilver" | "weetniet"; confirm?: Confirm };

/**
 * The person's own check after the selfie: "we think this is your skin colour, right?", with one
 * tint lighter and one darker next to it; the same for eyes and hair. Their pick moves the
 * measurement before the rules run, so a camera or clothing error is corrected by the person.
 */
export type Shade = "lighter" | "match" | "darker";
export type Confirm = { skin?: Shade; iris?: Shade; hair?: Shade };
/** One tint in L*: a step people can still tell apart on a phone screen (AANNAME, tune on phase A data). */
export const SHADE_STEP = { skin: 6, iris: 8, hair: 8 } as const;

export function shadeLab(lab: Lab, part: keyof Confirm, s: Shade): Lab {
  const dir = s === "lighter" ? 1 : s === "darker" ? -1 : 0;
  return { ...lab, L: clamp(lab.L + dir * SHADE_STEP[part], 2, 98) };
}

export function applyConfirm(m: Measurements, c?: Confirm): Measurements {
  if (!c) return m;
  const adj = <T extends RegionStat | undefined>(st: T, part: keyof Confirm): T => (st && c[part] ? { ...st, lab: shadeLab(st.lab, part, c[part]!) } : st);
  return { ...m, skin: adj(m.skin, "skin"), iris: adj(m.iris, "iris"), hair: adj(m.hair, "hair") };
}

export function computeProfile(measured: Measurements, ctx: ProfileContext = {}): Profile {
  const R = RULES;
  const m = applyConfirm(measured, ctx.confirm);
  const skin = labToLch(m.skin.lab);
  const hairOk = m.hair && m.hair.n >= R.minPixels.hair;
  const irisOk = m.iris && m.iris.n >= R.minPixels.iris;
  const hairStatus = ctx.hair ?? "natural";
  // hair for depth and contrast: anything but dyed or absent
  const hair = hairOk && (hairStatus === "natural" || hairStatus === "grey") ? labToLch(m.hair!.lab) : undefined;
  // hair for undertone: natural colour only
  const hairHue = hairStatus === "natural" ? hair : undefined;
  const iris = irisOk ? labToLch(m.iris!.lab) : undefined;

  // Undertone: yellower skin (towards b*) = warmer, pinker (towards a*) = cooler.
  const u = weighted([
    { value: clamp(hueLineDistance(m.skin.lab, R.undertone.skinHueNeutral) / R.undertone.skinSpan, -1, 1), weight: R.weights.undertone.skin },
    // Hair: copper and golden hair are strongly chromatic, ash hair is greyish. Very dark hair
    // carries little undertone information, so its weight fades with lightness.
    ...(hairHue ? [{ value: clamp((hairHue.C - R.undertone.hairChromaNeutral) / R.undertone.hairChromaSpan, -1, 1), weight: R.weights.undertone.hair * clamp((hairHue.L - 12) / 25, 0, 1) }] : []),
    ...(iris ? [{ value: clamp((iris.h - R.undertone.irisHueNeutral) / R.undertone.irisHueSpan, -1, 1), weight: R.weights.undertone.iris * chromaWeight(iris.C, 10) }] : []),
    ...(ctx.jewel === "goud" || ctx.jewel === "zilver" ? [{ value: ctx.jewel === "goud" ? 1 : -1, weight: R.weights.undertone.jewel }] : []),
  ]);

  // Depth: darker skin, hair and eyes = deeper.
  const d = weighted([
    { value: 1 - norm(skin.L, R.depth.skinL), weight: R.weights.depth.skin },
    ...(hair ? [{ value: 1 - norm(hair.L, R.depth.hairL), weight: R.weights.depth.hair }] : []),
    ...(iris ? [{ value: 1 - norm(iris.L, R.depth.irisL), weight: R.weights.depth.iris }] : []),
  ]);

  // Clarity: high contrast between hair and skin, and clear (chromatic) eyes = brighter.
  const c = weighted([
    ...(hair ? [{ value: norm(Math.abs(skin.L - hair.L), R.clarity.contrastL), weight: R.weights.clarity.contrast }] : []),
    ...(iris ? [{ value: norm(iris.C, R.clarity.irisC), weight: R.weights.clarity.iris }] : []),
    { value: norm(skin.C, R.clarity.skinC), weight: R.weights.clarity.skin },
    ...(hair ? [{ value: norm(hair.C, R.clarity.hairC), weight: R.weights.clarity.hair }] : []),
  ]);

  // Confidence per scale: enough pixels, agreement between cheeks, calibration, resolution.
  const skinEnough = clamp(m.skin.n / (R.minPixels.skin * 5), 0.3, 1);
  // Up to ΔE 2 between the cheeks is normal facial variation, not a lighting problem.
  const cheekAgreement =
    m.cheekLeft && m.cheekRight ? Math.exp(-Math.max(0, cheekDeltaE(m) - 2) / 5) : 0.7;
  // Without the card we cannot correct the light, but a good selfie must still pass the gate.
  const calib = m.calibrated ? 1 : 0.8;
  const resolution = clamp(m.faceWidthPx / 300, 0.4, 1);
  const base = calib * resolution;

  const confidence = {
    undertone: clamp(base * skinEnough * cheekAgreement, 0, 1),
    // No visible hair (bald, shaved, headscarf, cap) is a normal case, not bad input: a small
    // penalty only. In v1 it pushed everyone without hair below the threshold (CX review 13 Oct).
    depth: clamp(base * skinEnough * (hair ? 1 : 0.9) * (iris ? 1 : 0.9), 0, 1),
    clarity: clamp(base * (hair ? 1 : 0.85) * (iris ? 1 : 0.7), 0, 1),
    overall: 0,
  };
  confidence.overall = Math.min(confidence.undertone, confidence.depth, confidence.clarity);

  const scales: Scales = { undertone: u.value, depth: d.value, clarity: c.value };
  return { ...scales, confidence, match: nearestSeason(scales), rulesVersion: R.version };
}

/** Colour difference between the two cheeks; large = uneven light (side light, shadow). */
export function cheekDeltaE(m: Measurements): number {
  return m.cheekLeft && m.cheekRight ? deltaE2000(m.cheekLeft.lab, m.cheekRight.lab) : 0;
}

/** Above this the flow tells people to face the light. */
export const UNEVEN_LIGHT_DE = 5;

/** Below this the flow asks for one more selfie with a concrete tip (CLAUDE.md §5). */
export const LOW_CONFIDENCE = 0.5;
