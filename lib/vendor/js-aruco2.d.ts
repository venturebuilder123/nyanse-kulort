export namespace AR {
  type Point = { x: number; y: number };
  type Marker = { id: number; corners: Point[]; hammingDistance: number };
  type ImageLike = { width: number; height: number; data: Uint8ClampedArray | Uint8Array };
  class Detector {
    constructor(config?: { dictionaryName?: string; maxHammingDistance?: number });
    detect(image: ImageLike): Marker[];
  }
}
