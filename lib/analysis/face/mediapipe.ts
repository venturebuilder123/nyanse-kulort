// Browser-only: lazily load MediaPipe from our own origin (see scripts/setup-models.mjs).
// Two stages: the face landmarker first (the live selfie checks need only that), the hair
// segmenter after it (needed only for the analysis itself).

import { FaceLandmarker, FilesetResolver, ImageSegmenter } from "@mediapipe/tasks-vision";

type Delegate = "GPU" | "CPU";
export type Vision = { landmarker: FaceLandmarker; segmenter: ImageSegmenter; delegate: Delegate };

let fileset: ReturnType<typeof FilesetResolver.forVisionTasks> | null = null;
let landmarker: Promise<{ landmarker: FaceLandmarker; delegate: Delegate }> | null = null;
let vision: Promise<Vision> | null = null;

const getFileset = () => (fileset ??= FilesetResolver.forVisionTasks("/mediapipe/wasm"));

async function withFallback<T>(make: (d: Delegate) => Promise<T>): Promise<{ value: T; delegate: Delegate }> {
  try {
    return { value: await make("GPU"), delegate: "GPU" };
  } catch {
    return { value: await make("CPU"), delegate: "CPU" };
  }
}

export function loadLandmarker() {
  landmarker ??= (async () => {
    const fs = await getFileset();
    const { value, delegate } = await withFallback((d) =>
      FaceLandmarker.createFromOptions(fs, {
        baseOptions: { modelAssetPath: "/models/face_landmarker.task", delegate: d },
        runningMode: "IMAGE",
        numFaces: 2, // 2 so we can warn about a second face instead of silently picking one
      }),
    );
    return { landmarker: value, delegate };
  })().catch((err) => {
    landmarker = null; // allow a retry after a failed load
    throw err;
  });
  return landmarker;
}

export function loadVision(): Promise<Vision> {
  vision ??= (async () => {
    const { landmarker: lm, delegate } = await loadLandmarker();
    const fs = await getFileset();
    const make = (d: Delegate) =>
      ImageSegmenter.createFromOptions(fs, {
        baseOptions: { modelAssetPath: "/models/hair_segmenter.tflite", delegate: d },
        runningMode: "IMAGE",
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      });
    const segmenter = await make(delegate).catch(() => make("CPU"));
    return { landmarker: lm, segmenter, delegate };
  })().catch((err) => {
    vision = null;
    throw err;
  });
  return vision;
}
