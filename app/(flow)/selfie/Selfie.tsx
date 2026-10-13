"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { assessFrame, coverMap, NO_FACE, type LiveChecks } from "@/lib/analysis/live";
import { LOW_CONFIDENCE } from "@/lib/color/profile";
import { track } from "@/lib/analytics";
import { flowSession } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";
import { AppBar, CheckIcon, Crumbs, LockIcon } from "../ui";

// intro: one tap confirms 16+ and gives context before the browser asks for the camera
type Mode = "intro" | "starting" | "live" | "denied";
type Retry = { tip: string; attempts: number } | null;

const LIVE_INTERVAL_MS = 250;
const PROBE_W = 320; // small frame for live checks: fast on phones
const HOLD_MS = 1200; // all checks green this long: capture automatically

export default function Selfie() {
  const { copy, ctx } = useBrand();
  const t = copy.selfie;
  const router = useRouter();

  const video = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const greenSince = useRef<number | null>(null);
  const capturing = useRef(false);
  const done = useRef(false); // set after a successful analysis: no second capture while navigating
  const [mode, setMode] = useState<Mode>("intro");
  const [canLive, setCanLive] = useState(true);
  const [checks, setChecks] = useState<LiveChecks>(NO_FACE);
  const [hold, setHold] = useState(0); // 0..1 progress of the automatic capture
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState<Retry>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCanLive(window.isSecureContext && !!navigator.mediaDevices?.getUserMedia);
    // models were prefetched on the style step; make sure the analysis code is ready too
    void import("@/lib/analysis/face/mediapipe").then((m) => m.loadVision()).catch(() => {});
    void import("@/lib/analysis/pipelineA");
    return () => stream.current?.getTracks().forEach((tr) => tr.stop());
  }, []);

  async function startCamera() {
    setMode("starting");
    track("selfie_start", ctx, { mode: "live" });
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } },
        audio: false,
      });
      stream.current = s;
      const v = video.current!;
      v.srcObject = s;
      await v.play().catch(() => {});
      setMode("live");
    } catch {
      setMode("denied");
    }
  }

  const analyse = useCallback(
    async (blob: Blob, mirrored = false) => {
      if (capturing.current || done.current) return;
      capturing.current = true;
      setBusy(true);
      setError(null);
      try {
        const { runPipelineA } = await import("@/lib/analysis/pipelineA");
        const { result, debug, canvas } = await runPipelineA(blob);
        const attempts = (retry?.attempts ?? 0) + 1;
        if (!result.ok || !result.measurements || !result.profile) {
          setRetry({ tip: t.noFace, attempts });
          return;
        }
        const low = result.profile.confidence.overall < LOW_CONFIDENCE;
        // Never a firm result on poor input: ask once more with a concrete tip (CLAUDE.md §5).
        if (low && attempts < 2) {
          setRetry({ tip: result.quality.issues[0] ?? t.retryGeneric, attempts });
          return;
        }
        const oval = debug.regions?.faceOval ?? [];
        const xs = oval.map((q) => q.x), ys = oval.map((q) => q.y);
        const face = oval.length
          ? {
              cx: (Math.min(...xs) + Math.max(...xs)) / 2 / canvas.width,
              cy: (Math.min(...ys) + Math.max(...ys)) / 2 / canvas.height,
              w: (Math.max(...xs) - Math.min(...xs)) / canvas.width,
              aspect: canvas.width / canvas.height,
              mirrored,
            }
          : undefined;
        flowSession.setPhoto(blob);
        flowSession.setResult({ measurements: result.measurements, lowConfidence: low, face, pipeline: "A", at: Date.now() });
        track("selfie_ok", ctx, { attempts, mode });
        track("analysis_done", ctx, {
          pipeline: "A",
          confidence: Number(result.profile.confidence.overall.toFixed(2)),
          cost_eur: 0,
          ms: Math.round(result.timings.totalMs),
          card: result.card.used,
        });
        done.current = true;
        stream.current?.getTracks().forEach((tr) => tr.stop());
        router.push("/analyse");
      } catch {
        setError(t.failed);
      } finally {
        capturing.current = false;
        greenSince.current = null;
        setHold(0);
        setBusy(false);
      }
    },
    [ctx, mode, retry, router, t],
  );

  const capture = useCallback(async () => {
    const v = video.current;
    if (!v?.videoWidth || capturing.current || done.current) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    const blob = await new Promise<Blob | null>((res) => c.toBlob(res, "image/jpeg", 0.92));
    if (blob) await analyse(blob, true);
  }, [analyse]);

  // Live checks a few times per second on a small copy of the frame; auto-capture when all green.
  useEffect(() => {
    if (mode !== "live") return;
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;
    const probe = document.createElement("canvas");
    const pctx = probe.getContext("2d", { willReadFrequently: true })!;
    const tick = async () => {
      if (stop) return;
      const v = video.current, b = box.current;
      if (v && b && v.videoWidth && !capturing.current && !done.current) {
        try {
          const { loadLandmarker } = await import("@/lib/analysis/face/mediapipe");
          const vision = await loadLandmarker();
          probe.width = PROBE_W;
          probe.height = Math.round((PROBE_W * v.videoHeight) / v.videoWidth);
          pctx.drawImage(v, 0, 0, probe.width, probe.height);
          const faces = vision.landmarker.detect(probe).faceLandmarks;
          const first = faces[0];
          const map = coverMap({ w: v.videoWidth, h: v.videoHeight }, { w: b.clientWidth, h: b.clientHeight });
          const luminance = (i: number, j?: number, tt = 0) => {
            const a = first?.[i];
            const z = j !== undefined ? first?.[j] : undefined;
            if (!a) return 0;
            const px = z ? a.x + (z.x - a.x) * tt : a.x;
            const py = z ? a.y + (z.y - a.y) * tt : a.y;
            const x = Math.max(0, Math.min(probe.width - 3, Math.round(px * probe.width) - 1));
            const y = Math.max(0, Math.min(probe.height - 3, Math.round(py * probe.height) - 1));
            const d = pctx.getImageData(x, y, 3, 3).data;
            let sum = 0;
            for (let k = 0; k < d.length; k += 4) sum += 0.2126 * d[k]! + 0.7152 * d[k + 1]! + 0.0722 * d[k + 2]!;
            return sum / 9 / 255;
          };
          const c = assessFrame(first ? first.map(map) : null, faces.length, { w: b.clientWidth, h: b.clientHeight }, luminance);
          if (!stop) {
            setChecks(c);
            const green = c.face && c.light && c.even;
            const now = performance.now();
            if (green) {
              greenSince.current ??= now;
              const p = Math.min(1, (now - greenSince.current) / HOLD_MS);
              setHold(p);
              if (p >= 1) void capture();
            } else {
              greenSince.current = null;
              setHold(0);
            }
          }
        } catch {
          // models still loading: try again next tick
        }
      }
      timer = setTimeout(tick, LIVE_INTERVAL_MS);
    };
    void tick();
    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [mode, capture]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    track("selfie_start", ctx, { mode: "file" });
    void analyse(f);
  }

  const allGreen = checks.face && checks.light && checks.even;
  const live = mode === "live" || mode === "starting";

  return (
    <main className="screen">
      <AppBar pill={t.pill} />
      <Crumbs step={2} />
      <div className="pad selfie">
        {!live && (
          <section className="selfie-intro">
            <div className="intro-oval" aria-hidden="true"><span /></div>
            <h1 className="disp sm">{t.intro}</h1>
            <p className="sub">{t.introText}</p>
          </section>
        )}

        <div className={`viewfinder${mode === "live" ? " is-live" : ""}${allGreen ? " is-ok" : ""}`} ref={box} hidden={!live}>
          <video ref={video} playsInline muted autoPlay aria-hidden="true" />
          {/* oval and dimmed surround in one shape, so they always line up (OVAL in lib/analysis/live.ts) */}
          <svg className="oval" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
            <path className="dim" fillRule="evenodd" d="M0 0H100V125H0Z M21 55a29 38.7 0 1 0 58 0a29 38.7 0 1 0 -58 0Z" />
            <ellipse cx="50" cy="55" rx="29" ry="38.7" />
          </svg>
          {mode === "starting" && <div className="vf-fallback"><p>{t.loading}</p></div>}
          <div className="vf-tips" role="status">
            {(["face", "light", "even"] as const).map((k) => (
              <span key={k} className={checks[k] ? "ok" : ""}>
                {checks[k] && <CheckIcon />}
                {t.tips[k]}
              </span>
            ))}
          </div>
          {mode === "live" && (
            <button className="shutter" onClick={capture} disabled={busy} aria-label={t.start}>
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="29" className="shutter-ring" />
                <circle cx="32" cy="32" r="29" className="shutter-progress" style={{ strokeDashoffset: `${182 * (1 - hold)}` }} />
                <circle cx="32" cy="32" r="22" className="shutter-core" />
              </svg>
            </button>
          )}
          {busy && <div className="vf-busy"><span>{t.busy}</span></div>}
        </div>

        {retry && (
          <div className="notice" role="status">
            <b>{t.retryTitle}</b>
            <span>{retry.tip}</span>
          </div>
        )}
        {mode === "denied" && <p className="notice" role="alert">{t.denied}</p>}
        {error && <p className="notice bad" role="alert">{error}</p>}

        <div className="stack-sm">
          {mode === "intro" && canLive ? (
            <button className="btn" onClick={startCamera}>
              <CameraIcon />
              {t.startCamera}
            </button>
          ) : mode === "live" ? (
            <button className="btn" onClick={capture} disabled={busy}>
              {busy ? t.busy : hold > 0 ? t.hold : t.start}
            </button>
          ) : mode === "starting" ? null : (
            // no live camera (http, or permission denied): the phone's own camera app
            <label className={`btn${busy ? " is-busy" : ""}`}>
              <CameraIcon />
              {busy ? t.busy : `Ik ben 16+ · ${t.takePhoto.toLowerCase()}`}
              <input type="file" accept="image/*" capture="user" hidden onChange={onFile} disabled={busy} />
            </label>
          )}
          {!busy && mode !== "starting" && (
            <label className="link-btn">
              {mode === "live" ? t.pickPhoto : `${t.pickPhoto} (16+)`}
              <input type="file" accept="image/*" hidden onChange={onFile} disabled={busy} />
            </label>
          )}
        </div>

        <p className="trust-main"><LockIcon />{t.trust}</p>
      </div>
    </main>
  );
}

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}
