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

/** Map normalised video coordinates to box pixels for `object-fit: cover`. */
export function coverMap(video: { w: number; h: number }, box: { w: number; h: number }) {
  const scale = Math.max(box.w / video.w, box.h / video.h);
  const ox = (box.w - video.w * scale) / 2;
  const oy = (box.h - video.h * scale) / 2;
  return (p: Point): Point => ({ x: p.x * video.w * scale + ox, y: p.y * video.h * scale + oy });
}

/**
 * @param landmarks first face, in box pixels (null when none)
 * @param luminance 0..1 sRGB luma around a landmark index
 */
export function assessFrame(
  landmarks: Point[] | null,
  faces: number,
  box: { w: number; h: number },
  luminance: (landmarkIndex: number) => number,
): LiveChecks {
  if (!landmarks || faces === 0) return NO_FACE;
  const left = landmarks[FACE_LEFT]!, right = landmarks[FACE_RIGHT]!;
  const top = landmarks[FOREHEAD]!, chin = landmarks[CHIN]!;
  const width = Math.abs(right.x - left.x) / box.w;
  const cx = (left.x + right.x) / 2 / box.w;
  const cy = (top.y + chin.y) / 2 / box.h;
  const centred = Math.abs(cx - OVAL.cx) < 0.12 && Math.abs(cy - OVAL.cy) < 0.11;
  const sized = width > 0.34 && width < 0.78;

  const [l1, l2] = CHEEKS.map(luminance) as [number, number];
  const mean = (l1 + l2) / 2;
  return {
    faces,
    face: faces === 1 && centred && sized,
    light: mean > 0.3 && mean < 0.9,
    even: Math.min(l1, l2) / Math.max(l1, l2, 1e-6) > 0.78,
  };
}
