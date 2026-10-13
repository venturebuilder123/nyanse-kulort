// Live checks for the selfie viewfinder (CLAUDE.md §6.3: tips that turn into green ticks).
// Pure geometry so it can be tested; the component feeds it landmarks and a luminance probe.

import type { Point } from "./image";

export type LiveChecks = {
  /** exactly one face, centred in the oval and at a good size */
  face: boolean;
  /** cheeks neither too dark nor blown out */
  light: boolean;
  /** both cheeks similarly lit (no strong side light) */
  even: boolean;
  faces: number;
};

export const NO_FACE: LiveChecks = { face: false, light: false, even: false, faces: 0 };

/** The oval drawn in the viewfinder, as fractions of the box (keep in sync with flow.css). */
export const OVAL = { cx: 0.5, cy: 0.44, width: 0.58 } as const;

const CHEEKS = [205, 425] as const;
const FACE_LEFT = 234;
const FACE_RIGHT = 454;
const FOREHEAD = 10;
const CHIN = 152;

/**
 * Points on the whites of the eyes: between the iris centre and the outer eye corner.
 * Fairness: exposure is judged on the sclera, which is light for everyone, never on skin
 * brightness, which would wrongly tell people with deep skin tones that it is "too dark".
 */
export const SCLERA: readonly [iris: number, corner: number, t: number][] = [
  [468, 33, 0.55],
  [473, 263, 0.55],
];

/** Map normalised video coordinates to box pixels for `object-fit: cover`. */
export function coverMap(video: { w: number; h: number }, box: { w: number; h: number }) {
  const scale = Math.max(box.w / video.w, box.h / video.h);
  const ox = (box.w - video.w * scale) / 2;
  const oy = (box.h - video.h * scale) / 2;
  return (p: Point): Point => ({ x: p.x * video.w * scale + ox, y: p.y * video.h * scale + oy });
}

/** Thresholds on 0..1 sRGB luma. */
export const LIGHT = { scleraMin: 0.32, cheekClip: 0.93, evenRatio: 0.78 } as const;

/**
 * @param landmarks first face, in box pixels (null when none)
 * @param luminance 0..1 sRGB luma at a landmark, or between two landmarks (fraction t)
 */
export function assessFrame(
  landmarks: Point[] | null,
  faces: number,
  box: { w: number; h: number },
  luminance: (i: number, j?: number, t?: number) => number,
): LiveChecks {
  if (!landmarks || faces === 0) return NO_FACE;
  const left = landmarks[FACE_LEFT]!, right = landmarks[FACE_RIGHT]!;
  const top = landmarks[FOREHEAD]!, chin = landmarks[CHIN]!;
  const width = Math.abs(right.x - left.x) / box.w;
  const cx = (left.x + right.x) / 2 / box.w;
  const cy = (top.y + chin.y) / 2 / box.h;
  const centred = Math.abs(cx - OVAL.cx) < 0.12 && Math.abs(cy - OVAL.cy) < 0.11;
  const sized = width > 0.34 && width < 0.78;

  const sclera = SCLERA.map(([i, j, t]) => luminance(i, j, t));
  const scleraMean = sclera.reduce((a, b) => a + b, 0) / sclera.length;
  const [c1, c2] = CHEEKS.map((i) => luminance(i)) as [number, number];
  return {
    faces,
    face: faces === 1 && centred && sized,
    light: scleraMean > LIGHT.scleraMin && Math.max(c1, c2) < LIGHT.cheekClip,
    // a ratio, so it does not depend on skin tone
    even: Math.min(c1, c2) / Math.max(c1, c2, 1e-6) > LIGHT.evenRatio,
  };
}
