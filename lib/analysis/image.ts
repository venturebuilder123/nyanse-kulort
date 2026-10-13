// Minimal RGBA image type shared by browser (ImageData) and tests (pngjs).

export type ImageLike = {
  width: number;
  height: number;
  data: Uint8ClampedArray | Uint8Array;
};

export type Point = { x: number; y: number };

/** Box-filter downscale by an integer factor (for retrying marker detection). */
export function downscale(img: ImageLike, factor: number): ImageLike {
  const w = Math.floor(img.width / factor);
  const h = Math.floor(img.height / factor);
  const out = new Uint8ClampedArray(w * h * 4);
  const n = factor * factor;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0, g = 0, b = 0;
      for (let dy = 0; dy < factor; dy++) {
        for (let dx = 0; dx < factor; dx++) {
          const i = ((y * factor + dy) * img.width + (x * factor + dx)) * 4;
          r += img.data[i]!;
          g += img.data[i + 1]!;
          b += img.data[i + 2]!;
        }
      }
      const o = (y * w + x) * 4;
      out[o] = r / n;
      out[o + 1] = g / n;
      out[o + 2] = b / n;
      out[o + 3] = 255;
    }
  }
  return { width: w, height: h, data: out };
}
