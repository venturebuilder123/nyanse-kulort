import { readFileSync } from "node:fs";
import { PNG } from "pngjs";
import { describe, expect, it } from "vitest";
import { deltaE2000, hexToLab, linearRgbToLab, type RGB } from "@/lib/color/convert";
import { calibrate } from "./calibrate";
import { detectCard } from "./detect";
import { applyHomography, computeHomography } from "./homography";
import { CARD_LAYOUT } from "./layout";

const load = (name: string) => {
  const png = PNG.sync.read(readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url)));
  return { width: png.width, height: png.height, data: png.data };
};

describe("homography", () => {
  it("maps the four source points onto the destination points", () => {
    const src = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
    const dst = [{ x: 5, y: 7 }, { x: 40, y: 12 }, { x: 38, y: 50 }, { x: 2, y: 44 }];
    const H = computeHomography(src, dst);
    src.forEach((p, i) => {
      const q = applyHomography(H, p);
      expect(q.x).toBeCloseTo(dst[i]!.x, 6);
      expect(q.y).toBeCloseTo(dst[i]!.y, 6);
    });
  });
});

describe("card detection on a clean render", () => {
  const card = detectCard(load("card-plain.png"));

  it("finds the marker", () => {
    expect(card).not.toBeNull();
    expect(card!.markerPx).toBeGreaterThan(100);
  });

  it("reads every printed patch close to its nominal colour", () => {
    for (const p of CARD_LAYOUT.patches.filter((p) => p.srgb)) {
      const lab = linearRgbToLab(card!.patches[p.key].linear);
      expect(deltaE2000(lab, hexToLab(p.srgb!)), p.key).toBeLessThan(1.5);
    }
  });

  it("reads the white patch as paper white", () => {
    expect(linearRgbToLab(card!.patches.white.linear).L).toBeGreaterThan(97);
  });
});

describe("calibration under warm, dim light at an angle", () => {
  const card = detectCard(load("card-warm-tilted.png"));
  const cal = card && calibrate(card);

  it("still finds the card", () => {
    expect(card).not.toBeNull();
  });

  it("accepts the card and corrects the colour cast", () => {
    expect(cal!.rejected).toBeUndefined();
    // warm light: blue channel needs the biggest boost
    expect(cal!.gains[2]).toBeGreaterThan(cal!.gains[0]);
    expect(cal!.whiteChroma).toBeLessThan(3);
  });

  it("brings the colour patches back near their nominal values", () => {
    for (const check of cal!.checks) {
      expect(check.deltaE, check.key).toBeLessThan(4);
    }
  });

  it("makes skin-like patches comparable across both photos", () => {
    const plain = detectCard(load("card-plain.png"))!;
    const plainCal = calibrate(plain);
    const corrected = (rgb: RGB, g: RGB) => linearRgbToLab([rgb[0] * g[0], rgb[1] * g[1], rgb[2] * g[2]]);
    for (const key of ["lightSkin", "darkSkin"] as const) {
      const a = corrected(plain.patches[key].linear, plainCal.gains);
      const b = corrected(card!.patches[key].linear, cal!.gains);
      expect(deltaE2000(a, b), key).toBeLessThan(2.5);
    }
  });
});
