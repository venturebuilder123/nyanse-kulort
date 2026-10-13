import { describe, expect, it } from "vitest";
import { assessFrame, coverMap } from "./live";

const box = { w: 400, h: 500 };

/** A face centred in the oval, `width` as a fraction of the box. */
function face(width = 0.5, dx = 0, dy = 0) {
  const lm = Array.from({ length: 478 }, () => ({ x: 200 + dx, y: 220 + dy }));
  lm[234] = { x: 200 + dx - (width * 400) / 2, y: 220 + dy };
  lm[454] = { x: 200 + dx + (width * 400) / 2, y: 220 + dy };
  lm[10] = { x: 200 + dx, y: 120 + dy };
  lm[152] = { x: 200 + dx, y: 320 + dy };
  return lm;
}
const even = () => 0.6;

describe("assessFrame", () => {
  it("passes a centred, well-lit face", () => {
    expect(assessFrame(face(), 1, box, even)).toEqual({ faces: 1, face: true, light: true, even: true });
  });

  it("fails without a face, with two faces, off-centre or too far away", () => {
    expect(assessFrame(null, 0, box, even).face).toBe(false);
    expect(assessFrame(face(), 2, box, even).face).toBe(false);
    expect(assessFrame(face(0.5, 120), 1, box, even).face).toBe(false);
    expect(assessFrame(face(0.2), 1, box, even).face).toBe(false);
  });

  it("flags dark, blown-out and uneven light", () => {
    expect(assessFrame(face(), 1, box, () => 0.15).light).toBe(false);
    expect(assessFrame(face(), 1, box, () => 0.97).light).toBe(false);
    expect(assessFrame(face(), 1, box, (i) => (i === 205 ? 0.7 : 0.35)).even).toBe(false);
  });
});

describe("coverMap", () => {
  it("crops a landscape video into a portrait box like object-fit: cover", () => {
    const map = coverMap({ w: 1280, h: 720 }, { w: 400, h: 500 });
    // centre stays centre
    expect(map({ x: 0.5, y: 0.5 })).toEqual({ x: 200, y: 250 });
    // full height is used, sides are cropped
    expect(map({ x: 0.5, y: 0 }).y).toBeCloseTo(0);
    expect(map({ x: 0, y: 0.5 }).x).toBeLessThan(0);
  });
});
