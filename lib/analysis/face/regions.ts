// Turn face landmarks + a segmentation mask into colour measurements per region.
// Pure functions (no MediaPipe import), so they run in tests and in the browser alike.

import { SRGB8_TO_LINEAR, linearRgbToLab, type Lab, type RGB } from "@/lib/color/convert";
import type { Measurements, RegionStat } from "@/lib/color/profile";
import type { ImageLike, Point } from "../image";

// MediaPipe Face Mesh indices (478-point model incl. irises).
export const LM = {
  faceOval: [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109],
  rightCheek: 205, // subject's right = image left on a non-mirrored photo
  leftCheek: 425,
  foreheadTop: 10,
  betweenBrows: 9,
  noseTip: 1,
  faceRightEdge: 234,
  faceLeftEdge: 454,
  rightEye: [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246],
  leftEye: [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466],
  rightIris: { centre: 468, ring: [469, 470, 471, 472] },
  leftIris: { centre: 473, ring: [474, 475, 476, 477] },
} as const;

// hair_segmenter categories. Skin regions are defined by landmarks and exclude hair pixels
// (fringes, beards); the 16 MB multiclass model was dropped for mobile download size.
export const SEG = { background: 0, hair: 1 } as const;

export type Mask = { width: number; height: number; data: Uint8Array };

export type RegionDebug = {
  cheeks: { centre: Point; r: number }[];
  forehead: { centre: Point; r: number };
  irises: { centre: Point; r: number }[];
  faceOval: Point[];
  hairPx: number;
  beardPx: number;
};

export type RegionResult = {
  measurements: Omit<Measurements, "calibrated">;
  debug: RegionDebug;
  /** share of skin samples with a clipped channel: a sign of overexposure */
  skinClipped: number;
  /** fraction of the lower face covered by beard-class hair */
  beardFraction: number;
};

type Sample = { lab: Lab; clipped: boolean };

const lerp = (a: Point, b: Point, t: number): Point => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

export function pointInPolygon(p: Point, poly: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i]!, b = poly[j]!;
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

export function measureRegions(img: ImageLike, landmarks: Point[], mask: Mask, gains: RGB): RegionResult {
  const L = (i: number) => landmarks[i]!;
  const faceOval = LM.faceOval.map(L);
  const faceWidthPx = dist(L(LM.faceRightEdge), L(LM.faceLeftEdge));

  const sx = mask.width / img.width;
  const sy = mask.height / img.height;
  const category = (x: number, y: number) =>
    mask.data[Math.min(mask.height - 1, Math.floor(y * sy)) * mask.width + Math.min(mask.width - 1, Math.floor(x * sx))];

  const sampleAt = (x: number, y: number): Sample => {
    const k = (y * img.width + x) * 4;
    const R = img.data[k]!, G = img.data[k + 1]!, B = img.data[k + 2]!;
    const lin: RGB = [SRGB8_TO_LINEAR[R]! * gains[0], SRGB8_TO_LINEAR[G]! * gains[1], SRGB8_TO_LINEAR[B]! * gains[2]];
    return { lab: linearRgbToLab(lin), clipped: R === 255 || G === 255 || B === 255 };
  };

  /** Visit every pixel in a bounding box that passes the predicate. */
  const collect = (box: { x0: number; y0: number; x1: number; y1: number }, keep: (x: number, y: number) => boolean) => {
    const out: Sample[] = [];
    const x0 = Math.max(0, Math.floor(box.x0)), x1 = Math.min(img.width - 1, Math.ceil(box.x1));
    const y0 = Math.max(0, Math.floor(box.y0)), y1 = Math.min(img.height - 1, Math.ceil(box.y1));
    // Large regions are subsampled; statistics stay stable and it keeps phones fast.
    const step = Math.max(1, Math.floor(Math.sqrt(((x1 - x0) * (y1 - y0)) / 40000)));
    for (let y = y0; y <= y1; y += step) for (let x = x0; x <= x1; x += step) if (keep(x, y)) out.push(sampleAt(x, y));
    return out;
  };

  const skinDisc = (centre: Point, r: number) =>
    collect({ x0: centre.x - r, y0: centre.y - r, x1: centre.x + r, y1: centre.y + r }, (x, y) =>
      (x - centre.x) ** 2 + (y - centre.y) ** 2 <= r * r && category(x, y) !== SEG.hair);

  // Cheeks: discs around the cheek landmarks, without hair pixels (drops beard and loose hair).
  const cheekR = faceWidthPx * 0.075;
  const rightCheekCentre = lerp(L(LM.rightCheek), L(LM.rightEye[3]!), 0.25);
  const leftCheekCentre = lerp(L(LM.leftCheek), L(LM.leftEye[3]!), 0.25);
  const cheekRight = skinDisc(rightCheekCentre, cheekR);
  const cheekLeft = skinDisc(leftCheekCentre, cheekR);

  // Forehead: between hairline and brows; the mask removes fringes.
  const foreheadCentre = lerp(L(LM.foreheadTop), L(LM.betweenBrows), 0.55);
  const foreheadR = faceWidthPx * 0.09;
  const forehead = skinDisc(foreheadCentre, foreheadR);

  // Irises: an annulus that skips the pupil and the dark limbal ring, inside the eye opening.
  const irisDebug: { centre: Point; r: number }[] = [];
  const iris: Sample[] = [];
  for (const [def, eye] of [[LM.rightIris, LM.rightEye], [LM.leftIris, LM.leftEye]] as const) {
    const centre = L(def.centre);
    const r = def.ring.reduce((s, i) => s + dist(centre, L(i)), 0) / def.ring.length;
    const eyePoly = eye.map(L);
    irisDebug.push({ centre, r });
    const px = collect({ x0: centre.x - r, y0: centre.y - r, x1: centre.x + r, y1: centre.y + r }, (x, y) => {
      const d = Math.hypot(x - centre.x, y - centre.y);
      return d >= r * 0.35 && d <= r * 0.85 && pointInPolygon({ x, y }, eyePoly);
    });
    iris.push(...px);
  }

  // Hair and beard from the segmentation mask, restricted to the area around this face.
  const top = Math.min(...faceOval.map((p) => p.y));
  const bottom = Math.max(...faceOval.map((p) => p.y));
  const left = Math.min(...faceOval.map((p) => p.x));
  const right = Math.max(...faceOval.map((p) => p.x));
  const faceH = bottom - top;
  const noseY = L(LM.noseTip).y;
  const eyeY = (L(LM.rightIris.centre).y + L(LM.leftIris.centre).y) / 2;

  const hair = collect(
    { x0: left - faceWidthPx * 0.5, y0: top - faceH * 0.7, x1: right + faceWidthPx * 0.5, y1: bottom + faceH * 0.3 },
    (x, y) => category(x, y) === SEG.hair && !(y > eyeY && pointInPolygon({ x, y }, faceOval)),
  );
  let lowerFace = 0;
  const beard = collect({ x0: left, y0: noseY, x1: right, y1: bottom }, (x, y) => {
    if (!pointInPolygon({ x, y }, faceOval)) return false;
    lowerFace++;
    return category(x, y) === SEG.hair;
  });
  const beardFraction = lowerFace > 0 ? beard.length / lowerFace : 0;

  const skinSamples = [...cheekLeft, ...cheekRight, ...forehead];
  const skinClipped = skinSamples.length ? skinSamples.filter((s) => s.clipped).length / skinSamples.length : 0;

  const optional = (s: Sample[], min: number, trim?: [number, number]) => (s.length >= min ? robustStat(s, trim) : undefined);

  return {
    measurements: {
      skin: robustStat(skinSamples),
      cheekLeft: optional(cheekLeft, 50),
      cheekRight: optional(cheekRight, 50),
      hair: optional(hair, 50),
      // Irises: drop catchlights (top) and lash shadow (bottom) more aggressively.
      iris: optional(iris, 10, [0.2, 0.75]),
      beard: beardFraction > 0.15 ? optional(beard, 50) : undefined,
      faceWidthPx,
    },
    debug: {
      cheeks: [{ centre: rightCheekCentre, r: cheekR }, { centre: leftCheekCentre, r: cheekR }],
      forehead: { centre: foreheadCentre, r: foreheadR },
      irises: irisDebug,
      faceOval,
      hairPx: hair.length,
      beardPx: beard.length,
    },
    skinClipped,
    beardFraction,
  };
}

/**
 * Trim by lightness (drops specular shine and shadows), then take per-channel medians.
 * Default keeps the 10th–85th percentile of L*.
 */
export function robustStat(samples: Sample[], [lo, hi]: [number, number] = [0.1, 0.85]): RegionStat {
  if (samples.length === 0) return { lab: { L: NaN, a: NaN, b: NaN }, n: 0, sdL: NaN };
  const sorted = [...samples].sort((p, q) => p.lab.L - q.lab.L);
  const kept = sorted.slice(Math.floor(sorted.length * lo), Math.max(Math.ceil(sorted.length * hi), Math.floor(sorted.length * lo) + 1));
  const med = (vals: number[]) => {
    const s = vals.sort((a, b) => a - b);
    const m = s.length >> 1;
    return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
  };
  const Ls = kept.map((s) => s.lab.L);
  const meanL = Ls.reduce((a, b) => a + b, 0) / Ls.length;
  return {
    lab: { L: med([...Ls]), a: med(kept.map((s) => s.lab.a)), b: med(kept.map((s) => s.lab.b)) },
    n: kept.length,
    sdL: Math.sqrt(Ls.reduce((a, v) => a + (v - meanL) ** 2, 0) / Ls.length),
  };
}
