import { describe, expect, it } from "vitest";
import { deltaE2000, hexToLab, labToHex, labToLch, linearToSrgb8, srgb8ToLinear } from "./convert";

describe("sRGB <-> linear", () => {
  it("round-trips every 8-bit value", () => {
    for (let v = 0; v < 256; v++) expect(linearToSrgb8(srgb8ToLinear(v))).toBe(v);
  });
});

describe("Lab", () => {
  it("maps white and black to L=100 and L=0", () => {
    expect(hexToLab("#ffffff").L).toBeCloseTo(100, 1);
    expect(hexToLab("#000000").L).toBeCloseTo(0, 5);
  });

  it("matches reference values for known colours", () => {
    // reference values from Bruce Lindbloom's calculator (sRGB, D65)
    const red = hexToLab("#ff0000");
    expect(red.L).toBeCloseTo(53.24, 1);
    expect(red.a).toBeCloseTo(80.09, 1);
    expect(red.b).toBeCloseTo(67.2, 1);
  });

  it("puts #777777 at L* = 50 (18% grey)", () => {
    expect(hexToLab("#777777").L).toBeCloseTo(50, 0);
  });

  it("round-trips hex", () => {
    for (const hex of ["#c29682", "#735244", "#af363c", "#383d96", "#777777"]) {
      expect(labToHex(hexToLab(hex))).toBe(hex);
    }
  });

  it("computes hue angle in 0..360", () => {
    expect(labToLch({ L: 50, a: 0, b: -10 }).h).toBeCloseTo(270);
  });
});

describe("CIEDE2000", () => {
  // test pairs from Sharma, Wu & Dalal (2005), table 1
  const cases: [number, number, number, number, number, number, number][] = [
    [50, 2.6772, -79.7751, 50, 0, -82.7485, 2.0425],
    [50, 3.1571, -77.2803, 50, 0, -82.7485, 2.8615],
    [50, 2.5, 0, 50, 0, -2.5, 4.3065],
    [50, 2.5, 0, 73, 25, -18, 27.1492],
    [50, -0.001, 2.49, 50, 0.0011, -2.49, 4.7461],
    [60.2574, -34.0099, 36.2677, 60.4626, -34.1751, 39.4387, 1.2644],
    [22.7233, 20.0904, -46.694, 23.0331, 14.973, -42.5619, 2.0373],
    [90.9257, -0.5406, -0.9208, 88.6381, -0.8985, -0.7239, 1.5381],
  ];
  it.each(cases)("pair %#", (L1, a1, b1, L2, a2, b2, expected) => {
    expect(deltaE2000({ L: L1, a: a1, b: b1 }, { L: L2, a: a2, b: b2 })).toBeCloseTo(expected, 3);
  });
});
