// The drape cloth (shared by the site and the campaign renderer in scripts/make-aura.ts).

/**
 * The cloth in frame units (100 wide, 125 high), anchored to the face: it closes around the
 * neck just below the chin and falls over the shoulders, so no T-shirt shows above it.
 * Proportions from portrait anatomy, in face widths and heights.
 */
export function clothPath(fit: { w: number; cy: number }, faceH?: number) {
  const fw = fit.w * 100;
  const fh = (faceH ?? fit.w * 1.32) * 100;
  const cx = 50;
  const chin = fit.cy * 125 + fh / 2;
  const neckY = chin + 0.2 * fh; // where the cloth meets the neck
  const neckHalf = 0.34 * fw;
  const dip = neckY + 0.07 * fh; // the collar's curve under the throat
  const shY = chin + 0.4 * fh; // top of the shoulders
  const shX = 1.9 * fw;
  const outY = shY + 0.4 * fh; // where the arms fall away
  const L = cx - neckHalf, R = cx + neckHalf;
  const d = [
    `M${L} ${neckY}`,
    // trapezius: a soft S from the neck down to the shoulder
    `C${L - 0.12 * fw} ${neckY + 0.04 * fh} ${cx - shX + 0.25 * fw} ${shY - 0.06 * fh} ${cx - shX} ${shY + 0.02 * fh}`,
    `Q${cx - shX - 0.22 * fw} ${shY + 0.1 * fh} ${cx - shX - 0.3 * fw} ${outY}`,
    `L-6 ${outY + 0.2 * fh} L-6 131 L106 131 L106 ${outY + 0.2 * fh}`,
    `L${cx + shX + 0.3 * fw} ${outY}`,
    `Q${cx + shX + 0.22 * fw} ${shY + 0.1 * fh} ${cx + shX} ${shY + 0.02 * fh}`,
    `C${cx + shX - 0.25 * fw} ${shY - 0.06 * fh} ${R + 0.12 * fw} ${neckY + 0.04 * fh} ${R} ${neckY}`,
    // the collar, back to the start
    `C${R - 0.08 * fw} ${dip} ${L + 0.08 * fw} ${dip} ${L} ${neckY}`,
    "Z",
  ].join(" ");
  const collar = `M${L} ${neckY} C${L + 0.08 * fw} ${dip} ${R - 0.08 * fw} ${dip} ${R} ${neckY}`;
  return { d, collar, neckY, neckHalf };
}
