// Pipeline A (CLAUDE.md §5): everything on the device. The photo never leaves the browser;
// only the numbers in PipelineAResult are stored.

import type { RGB } from "@/lib/color/convert";
import { estimateMonk } from "@/lib/color/monk";
import { cheekDeltaE, computeProfile, UNEVEN_LIGHT_DE, type Measurements, type Profile } from "@/lib/color/profile";
import { calibrate, IDENTITY, type Calibration } from "./card/calibrate";
import { detectCard } from "./card/detect";
import { measureRegions, type RegionDebug } from "./face/regions";
import { loadVision } from "./face/mediapipe";
import type { Point } from "./image";

/** Longest image side used for analysis: enough detail for irises, fast on phones. */
const MAX_SIDE = 1600;

export type CardSummary = {
  found: boolean;
  used: boolean;
  markerPx?: number;
  rejected?: string;
  warnings: string[];
  gains?: RGB;
  whiteChroma?: number;
  checks?: Calibration["checks"];
};

export type PipelineAResult = {
  pipeline: "A";
  ok: boolean;
  error?: string;
  /** with card correction when the card was usable, otherwise uncorrected */
  measurements?: Measurements;
  profile?: Profile;
  /** same photo without card correction (only when the card was used): isolates the card's effect */
  uncalibrated?: { measurements: Measurements; profile: Profile };
  /** internal only (CLAUDE.md §5): never shown as a label */
  monkEstimate?: number;
  card: CardSummary;
  quality: { faces: number; faceWidthPx: number; skinClipped: number; beardFraction: number; issues: string[] };
  timings: { totalMs: number; decodeMs: number; cardMs: number; faceMs: number; segmentMs: number; measureMs: number };
  image: { width: number; height: number };
  delegate?: "GPU" | "CPU";
};

/** Geometry for the lab's debug overlay; kept in memory, never stored. */
export type PipelineADebug = { regions?: RegionDebug; cardOutline?: Point[]; markerCorners?: Point[] };

export async function runPipelineA(file: Blob): Promise<{ result: PipelineAResult; debug: PipelineADebug; canvas: HTMLCanvasElement }> {
  const t0 = performance.now();
  const timings = { totalMs: 0, decodeMs: 0, cardMs: 0, faceMs: 0, segmentMs: 0, measureMs: 0 };
  const debug: PipelineADebug = {};
  const issues: string[] = [];

  // Decode with EXIF orientation applied, then scale down.
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  timings.decodeMs = performance.now() - t0;

  const base = {
    pipeline: "A" as const,
    image: { width: canvas.width, height: canvas.height },
  };

  // 1. Card
  let t = performance.now();
  const card = detectCard(img);
  const cardSummary: CardSummary = { found: !!card, used: false, warnings: [] };
  let gains: RGB = IDENTITY;
  if (card) {
    const cal = calibrate(card);
    debug.cardOutline = card.outline;
    debug.markerCorners = card.corners;
    Object.assign(cardSummary, {
      markerPx: card.markerPx,
      rejected: cal.rejected,
      warnings: cal.warnings,
      whiteChroma: cal.whiteChroma,
      checks: cal.checks,
      gains: cal.gains,
      used: !cal.rejected,
    });
    if (!cal.rejected) gains = cal.gains;
    else issues.push(`Kaart gevonden maar niet bruikbaar: ${cal.rejected}`);
  }
  timings.cardMs = performance.now() - t;

  // 2. Face landmarks + segmentation
  const vision = await loadVision();
  t = performance.now();
  const faces = vision.landmarker.detect(canvas).faceLandmarks;
  timings.faceMs = performance.now() - t;

  const quality = { faces: faces.length, faceWidthPx: 0, skinClipped: 0, beardFraction: 0, issues };
  const fail = (error: string): { result: PipelineAResult; debug: PipelineADebug; canvas: HTMLCanvasElement } => {
    timings.totalMs = performance.now() - t0;
    return { result: { ...base, ok: false, error, card: cardSummary, quality, timings, delegate: vision.delegate }, debug, canvas };
  };
  if (faces.length === 0) return fail("Geen gezicht gevonden");
  if (faces.length > 1) issues.push("Meer dan één gezicht in beeld: het grootste is gebruikt");

  // largest face first
  const toPx = (f: { x: number; y: number }[]) => f.map((p) => ({ x: p.x * canvas.width, y: p.y * canvas.height }));
  const face = faces
    .map(toPx)
    .sort((a, b) => Math.abs(b[454]!.x - b[234]!.x) - Math.abs(a[454]!.x - a[234]!.x))[0]!;

  t = performance.now();
  const seg = vision.segmenter.segment(canvas);
  const maskSrc = seg.categoryMask;
  if (!maskSrc) {
    seg.close();
    return fail("Segmentatie mislukt");
  }
  const mask = { width: maskSrc.width, height: maskSrc.height, data: new Uint8Array(maskSrc.getAsUint8Array()) };
  seg.close();
  timings.segmentMs = performance.now() - t;

  // 3. Measure (calibrated, plus uncorrected for comparison when the card was used)
  t = performance.now();
  const regions = measureRegions(img, face, mask, gains);
  debug.regions = regions.debug;
  const measurements: Measurements = { ...regions.measurements, calibrated: cardSummary.used };
  const profile = computeProfile(measurements);

  let uncalibrated: PipelineAResult["uncalibrated"];
  if (cardSummary.used) {
    const raw = measureRegions(img, face, mask, IDENTITY);
    const m: Measurements = { ...raw.measurements, calibrated: false };
    uncalibrated = { measurements: m, profile: computeProfile(m) };
  }
  timings.measureMs = performance.now() - t;

  quality.faceWidthPx = measurements.faceWidthPx;
  quality.skinClipped = regions.skinClipped;
  quality.beardFraction = regions.beardFraction;

  if (measurements.faceWidthPx < 180) issues.push("Gezicht klein in beeld: kom dichter bij de camera");
  if (regions.skinClipped > 0.05) issues.push("Huid overbelicht: vermijd direct zonlicht en flitser");
  if (measurements.skin.n < 200) issues.push("Te weinig huid zichtbaar (haar, bril of schaduw?)");
  if (!cardSummary.used && measurements.skin.lab.L < 25) issues.push("Te donker: ga met je gezicht naar een raam");
  if (!measurements.iris) issues.push("Ogen niet goed zichtbaar");
  if (cheekDeltaE(measurements) > UNEVEN_LIGHT_DE) issues.push("Ongelijk licht op je gezicht: ga recht voor het raam staan");
  if (!cardSummary.used && profile.confidence.overall < 0.5 && issues.length === 0) {
    issues.push("Ga bij een raam staan, met je gezicht naar het licht");
  }

  timings.totalMs = performance.now() - t0;
  return {
    result: {
      ...base,
      ok: true,
      measurements,
      profile,
      uncalibrated,
      monkEstimate: estimateMonk(measurements.skin.lab),
      card: cardSummary,
      quality,
      timings,
      delegate: vision.delegate,
    },
    debug,
    canvas,
  };
}
