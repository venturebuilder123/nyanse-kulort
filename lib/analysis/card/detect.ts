// Find the reference card via its ArUco marker and read its patches.

import { AR } from "@/lib/vendor/js-aruco2";
import { SRGB8_TO_LINEAR, type RGB } from "@/lib/color/convert";
import { downscale, type ImageLike, type Point } from "../image";
import { applyHomography, computeHomography, type Homography } from "./homography";
import { CARD_LAYOUT, markerCornersMm, type CardLayout, type PatchKey } from "./layout";

// OpenCV's DICT_4X4_50 is the first 50 codes of the 4x4_1000 dictionary.
const DICTIONARY = "ARUCO_4X4_1000";

export type PatchReading = {
  /** per-channel median in linear RGB (0..1), before calibration */
  linear: RGB;
  /** relative spread of luminance inside the patch; high = glare, shadow or occlusion */
  nonUniformity: number;
  /** share of samples with a clipped (255) channel */
  clipped: number;
};

export type CardDetection = {
  /** marker corners in image pixels */
  corners: Point[];
  /** maps card millimetres to image pixels */
  H: Homography;
  /** marker edge length in pixels (resolution proxy) */
  markerPx: number;
  patches: Record<PatchKey, PatchReading>;
  /** outline of the card in image pixels, for the debug overlay */
  outline: Point[];
};

export function detectCard(img: ImageLike, layout: CardLayout = CARD_LAYOUT): CardDetection | null {
  const detector = new AR.Detector({ dictionaryName: DICTIONARY });
  let corners: Point[] | null = null;

  // Retry at half resolution: sensor noise on large photos can break the binarisation.
  for (const factor of [1, 2]) {
    const src = factor === 1 ? img : downscale(img, factor);
    const found = detector
      .detect(src)
      .filter((m) => m.id === layout.marker.id)
      .sort((a, b) => edge(b.corners) - edge(a.corners))[0];
    if (found) {
      corners = found.corners.map((p) => ({ x: p.x * factor, y: p.y * factor }));
      break;
    }
  }
  if (!corners) return null;

  const H = computeHomography(markerCornersMm(layout), corners);
  const patches = {} as Record<PatchKey, PatchReading>;
  for (const p of layout.patches) {
    patches[p.key] = samplePatch(img, H, p, layout.sampleInset);
  }
  const { width: w, height: h } = layout.card;
  const outline = [
    { x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: h }, { x: 0, y: h },
  ].map((pt) => applyHomography(H, pt));

  return { corners, H, markerPx: edge(corners), patches, outline };
}

function edge(c: Point[]): number {
  return Math.hypot(c[1]!.x - c[0]!.x, c[1]!.y - c[0]!.y);
}

/** Sample a grid inside the patch (inset from the edges) and take per-channel medians. */
export function samplePatch(
  img: ImageLike,
  H: Homography,
  p: { x: number; y: number; w: number; h: number },
  inset: number,
): PatchReading {
  const GRID = 12;
  const r: number[] = [], g: number[] = [], b: number[] = [], lum: number[] = [];
  let clipped = 0;
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const mx = p.x + p.w * (inset + ((1 - 2 * inset) * (i + 0.5)) / GRID);
      const my = p.y + p.h * (inset + ((1 - 2 * inset) * (j + 0.5)) / GRID);
      const { x, y } = applyHomography(H, { x: mx, y: my });
      const px = Math.round(x);
      const py = Math.round(y);
      if (px < 0 || py < 0 || px >= img.width || py >= img.height) continue;
      const k = (py * img.width + px) * 4;
      const R = img.data[k]!, G = img.data[k + 1]!, B = img.data[k + 2]!;
      if (R === 255 || G === 255 || B === 255) clipped++;
      const lr = SRGB8_TO_LINEAR[R]!, lg = SRGB8_TO_LINEAR[G]!, lb = SRGB8_TO_LINEAR[B]!;
      r.push(lr);
      g.push(lg);
      b.push(lb);
      lum.push(0.2126 * lr + 0.7152 * lg + 0.0722 * lb);
    }
  }
  if (lum.length < (GRID * GRID) / 2) {
    // patch largely outside the image
    return { linear: [0, 0, 0], nonUniformity: 1, clipped: 1 };
  }
  const m = median(lum);
  const mad = median(lum.map((v) => Math.abs(v - m)));
  return {
    linear: [median(r), median(g), median(b)],
    nonUniformity: m > 0 ? mad / m : 1,
    clipped: clipped / lum.length,
  };
}

export function median(values: number[]): number {
  if (values.length === 0) return NaN;
  const s = [...values].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}
