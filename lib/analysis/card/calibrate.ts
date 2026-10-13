// White balance and exposure correction from the card's grey and white patches.
//
// FEIT: a home-printed card is not colour-accurate in absolute terms. What the correction
// guarantees is that photos of the same card become comparable, which is exactly what the
// phase A consistency gate measures. Absolute accuracy needs the print-shop card (phase B).

import { deltaE2000, hexToLab, linearRgbToLab, type Lab, type RGB } from "@/lib/color/convert";
import type { CardDetection } from "./detect";
import { CARD_LAYOUT, type CardLayout, type PatchKey } from "./layout";

/** Linear value of the nominal 18% grey patch (#777777). */
export const GREY_TARGET = 0.184;

export type Calibration = {
  /** per-channel multipliers applied to linear RGB */
  gains: RGB;
  /** why the card could not be used, if so */
  rejected?: string;
  warnings: string[];
  /** corrected colour patches vs. their nominal values: a sanity check, not a target */
  checks: { key: PatchKey; lab: Lab; deltaE: number }[];
  /** chroma of the corrected white patch; near 0 = good white balance */
  whiteChroma: number;
};

export const IDENTITY: RGB = [1, 1, 1];

export function calibrate(card: CardDetection, layout: CardLayout = CARD_LAYOUT): Calibration {
  const grey = card.patches.grey18;
  const white = card.patches.white;
  const warnings: string[] = [];
  const lum = ([r, g, b]: RGB) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

  const reject = (reason: string): Calibration => ({ gains: IDENTITY, rejected: reason, warnings, checks: [], whiteChroma: NaN });

  if (grey.nonUniformity > 0.08) return reject("grijsvlak ongelijk belicht (schaduw, glans of vinger)");
  if (grey.clipped > 0.05) return reject("grijsvlak overbelicht");
  if (Math.min(...grey.linear) <= 0.002) return reject("grijsvlak te donker");
  // Paper white reflects ~4–5x more than 18% grey; much less means misdetection or glare.
  if (lum(white.linear) < lum(grey.linear) * 1.8) return reject("wit- en grijsvlak niet herkend als papier en grijs");

  if (white.clipped > 0.2) warnings.push("witvlak overbelicht: de camera belicht te fel");
  if (white.nonUniformity > 0.08) warnings.push("witvlak ongelijk belicht");
  if (card.markerPx < 30) warnings.push("kaart klein in beeld: houd hem dichter bij de camera");

  const gains = grey.linear.map((c) => GREY_TARGET / c) as unknown as RGB;
  const apply = (rgb: RGB): RGB => [rgb[0] * gains[0], rgb[1] * gains[1], rgb[2] * gains[2]];

  const whiteLab = linearRgbToLab(apply(white.linear));
  const whiteChroma = Math.hypot(whiteLab.a, whiteLab.b);
  if (whiteChroma > 6) warnings.push("witvlak blijft gekleurd na correctie: gemengd licht?");

  const checks = layout.patches
    .filter((p) => p.srgb && p.key !== "grey18")
    .map((p) => {
      const lab = linearRgbToLab(apply(card.patches[p.key].linear));
      return { key: p.key, lab, deltaE: deltaE2000(lab, hexToLab(p.srgb!)) };
    });

  return { gains, warnings, checks, whiteChroma };
}
