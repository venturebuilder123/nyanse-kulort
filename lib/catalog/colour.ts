// The dominant colour of a product photo (CLAUDE.md §7: "eigen pixelanalyse"). Product shots sit on
// a plain background, so we estimate the background from the border, drop it, and take the largest
// cluster of what remains (k-means in Lab). Pure: pixels in, colour out.

import { deltaE2000, labToHex, labToLch, linearRgbToLab, SRGB8_TO_LINEAR } from "@/lib/color/convert";

export type Lab = { L: number; a: number; b: number };
export type Dominant = { lab: Lab; hex: string; chroma: number; share: number };

const toLab = (r: number, g: number, b: number): Lab => linearRgbToLab([SRGB8_TO_LINEAR[r]!, SRGB8_TO_LINEAR[g]!, SRGB8_TO_LINEAR[b]!]);

/** rgba: width × height × 4 bytes (e.g. from sharp(...).resize(64, 64).raw()). */
export function dominantColour(rgba: Uint8Array | Buffer, width: number, height: number): Dominant | null {
  const px: Lab[] = [];
  const border: Lab[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (rgba[i + 3]! < 128) continue; // transparent background
      const lab = toLab(rgba[i]!, rgba[i + 1]!, rgba[i + 2]!);
      const edge = x < 2 || y < 2 || x >= width - 2 || y >= height - 2;
      (edge ? border : px).push(lab);
    }
  }
  if (!px.length) return null;
  // background = the median border colour
  const med = (k: keyof Lab) => border.map((p) => p[k]).sort((a, b) => a - b)[Math.floor(border.length / 2)] ?? 100;
  const bg: Lab = border.length ? { L: med("L"), a: med("a"), b: med("b") } : { L: 100, a: 0, b: 0 };
  let fg = px.filter((p) => deltaE2000(p, bg) > 7);
  // a garment in the background colour (a white shirt on white): use the centre instead
  if (fg.length < px.length * 0.06) {
    const cx = width / 2, cy = height / 2;
    fg = [];
    for (let y = Math.floor(cy - height / 6); y < cy + height / 6; y++) for (let x = Math.floor(cx - width / 6); x < cx + width / 6; x++) {
      const i = (y * width + x) * 4;
      fg.push(toLab(rgba[i]!, rgba[i + 1]!, rgba[i + 2]!));
    }
  }
  const lab = largestCluster(fg);
  return { lab: lab.centre, hex: labToHex(lab.centre), chroma: labToLch(lab.centre).C, share: lab.size / px.length };
}

/** k-means (k = 3) in Lab; returns the biggest cluster, ignoring tiny highlight/shadow clusters. */
function largestCluster(points: Lab[]): { centre: Lab; size: number } {
  const k = Math.min(3, points.length);
  const sorted = [...points].sort((a, b) => a.L - b.L);
  let centres: Lab[] = Array.from({ length: k }, (_, i) => ({ ...sorted[Math.floor(((i + 0.5) / k) * sorted.length)]! }));
  let groups: Lab[][] = [];
  for (let it = 0; it < 10; it++) {
    groups = centres.map(() => []);
    for (const p of points) {
      let best = 0, bd = Infinity;
      centres.forEach((c, i) => {
        const d = (p.L - c.L) ** 2 + (p.a - c.a) ** 2 + (p.b - c.b) ** 2;
        if (d < bd) { bd = d; best = i; }
      });
      groups[best]!.push(p);
    }
    centres = groups.map((g, i) => (g.length ? { L: avg(g, "L"), a: avg(g, "a"), b: avg(g, "b") } : centres[i]!));
  }
  const biggest = groups.reduce((m, g, i) => (g.length > groups[m]!.length ? i : m), 0);
  return { centre: centres[biggest]!, size: groups[biggest]!.length };
}
const avg = (g: Lab[], k: keyof Lab) => g.reduce((s, p) => s + p[k], 0) / g.length;
