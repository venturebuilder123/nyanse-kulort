// Copies the MediaPipe WASM runtime and downloads the models into public/,
// so the app never loads code or models from a third-party CDN at runtime.
// Runs automatically after `npm install` (also on Vercel builds).
import { createWriteStream, existsSync, mkdirSync, cpSync, statSync } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const MODELS = [
  {
    file: "public/models/face_landmarker.task",
    url: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
  },
  {
    file: "public/models/selfie_multiclass_256x256.tflite",
    url: "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite",
  },
];

mkdirSync("public/models", { recursive: true });
cpSync("node_modules/@mediapipe/tasks-vision/wasm", "public/mediapipe/wasm", { recursive: true });

for (const { file, url } of MODELS) {
  if (existsSync(file) && statSync(file).size > 0) continue;
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`download failed ${res.status}: ${url}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(file));
  console.log(`downloaded ${file}`);
}
