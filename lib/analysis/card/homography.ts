// Planar homography from four point pairs (direct linear transform, h33 = 1).

import type { Point } from "../image";

export type Homography = readonly number[]; // 9 values, row-major

export function computeHomography(src: Point[], dst: Point[]): Homography {
  if (src.length !== 4 || dst.length !== 4) throw new Error("need exactly 4 point pairs");
  const A: number[][] = [];
  const bvec: number[] = [];
  for (let i = 0; i < 4; i++) {
    const { x, y } = src[i]!;
    const { x: u, y: v } = dst[i]!;
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    bvec.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    bvec.push(v);
  }
  const h = solve(A, bvec);
  return [...h, 1];
}

export function applyHomography(H: Homography, p: Point): Point {
  const w = H[6]! * p.x + H[7]! * p.y + H[8]!;
  return {
    x: (H[0]! * p.x + H[1]! * p.y + H[2]!) / w,
    y: (H[3]! * p.x + H[4]! * p.y + H[5]!) / w,
  };
}

/** Gaussian elimination with partial pivoting. */
function solve(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]!]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r]![col]!) > Math.abs(M[pivot]![col]!)) pivot = r;
    }
    if (Math.abs(M[pivot]![col]!) < 1e-12) throw new Error("degenerate point configuration");
    [M[col], M[pivot]] = [M[pivot]!, M[col]!];
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const row = M[r]!;
      const pivotRow = M[col]!;
      const f = row[col]! / pivotRow[col]!;
      for (let c = col; c <= n; c++) row[c] = row[c]! - f * pivotRow[c]!;
    }
  }
  return M.map((row, i) => row[n]! / row[i]!);
}
