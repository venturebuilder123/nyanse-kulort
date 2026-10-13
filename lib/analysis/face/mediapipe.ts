// Browser-only: lazily load MediaPipe from our own origin (see scripts/setup-models.mjs).

import { FaceLandmarker, FilesetResolver, ImageSegmenter } from "@mediapipe/tasks-vision";

export type Vision = { landmarker: FaceLandmarker; segmenter: ImageSegmenter; delegate: "GPU" | "CPU" };

let loading: Promise<Vision> | null = null;

export function loadVision(): Promise<Vision> {
  loading ??= create().catch((err) => {
    loading = null; // allow a retry after a failed load
    throw err;
  });
  return loading;
}

async function create(): Promise<Vision> {
  const fileset = await FilesetResolver.forVisionTasks("/mediapipe/wasm");
  const build = async (delegate: "GPU" | "CPU"): Promise<Vision> => {
    const [landmarker, segmenter] = await Promise.all([
      FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: "/models/face_landmarker.task", delegate },
        runningMode: "IMAGE",
        numFaces: 2, // 2 so we can warn about a second face instead of silently picking one
      }),
      ImageSegmenter.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: "/models/selfie_multiclass_256x256.tflite", delegate },
        runningMode: "IMAGE",
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      }),
    ]);
    return { landmarker, segmenter, delegate };
  };
  try {
    return await build("GPU");
  } catch {
    return build("CPU");
  }
}
