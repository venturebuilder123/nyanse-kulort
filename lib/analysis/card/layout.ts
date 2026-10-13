// Typed access to the card layout, the single source of truth shared with the PDF generator.

import layoutJson from "@/tools/card/layout-v1.json";

export type PatchKey = "grey18" | "white" | "lightSkin" | "darkSkin" | "red" | "blue";

export type Patch = {
  key: PatchKey;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** nominal printed colour; null for bare paper */
  srgb: string | null;
};

export type CardLayout = {
  version: number;
  card: { width: number; height: number };
  marker: { dictionary: string; id: number; x: number; y: number; size: number };
  patches: Patch[];
  sampleInset: number;
};

export const CARD_LAYOUT = layoutJson as CardLayout;

/** Marker corners in card millimetres, in the order the detector reports them (TL, TR, BR, BL). */
export function markerCornersMm(layout: CardLayout = CARD_LAYOUT) {
  const { x, y, size } = layout.marker;
  return [
    { x, y },
    { x: x + size, y },
    { x: x + size, y: y + size },
    { x, y: y + size },
  ];
}
