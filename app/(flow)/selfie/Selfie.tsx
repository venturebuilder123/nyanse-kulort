"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { assessFrame, coverMap, NO_FACE, type LiveChecks } from "@/lib/analysis/live";
import { LOW_CONFIDENCE } from "@/lib/color/profile";
import { track } from "@/lib/analytics";
import { flowSession, type Jewel } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";
import { AppBar, CheckIcon, Crumbs, LockIcon } from "../ui";

type Mode = "starting" | "live" | "fallback";
type Retry = { tip: string; attempts: number } | null;

const LIVE_INTERVAL_MS = 250;
const PROBE_W = 320; // small frame for live checks: fast on phones

export default function Selfie() {
  const { copy, ctx } = useBrand();
  const t = copy.selfie;
  const router = useRouter();

  const video = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [mode, setMode] = useState<Mode>("starting");
  const [checks, setChecks] = useState<LiveChecks>(NO_FACE);
  const [jewel, setJewel] = useState<Jewel | null>(null);
  const [age, setAge] = useState(false);
  const [ageWarn, setAgeWarn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState<Retry>(null);
  const [error, setError] = useState<string | null>(null);

  // Camera: live only in a secure context (https or localhost); otherwise the phone's camera app.
  useEffect(() => {
    let cancelled = false;
    // models were prefetched on the style step; make sure they load
    void import("@/lib/analysis/face/mediapipe").then((m) => m.loadVision()).catch(() => {});
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setMode("fallback");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } }, audio: false })
      .then(async (s) => {
        if (cancelled) return s.getTracks().forEach((tr) => tr.stop());
        stream.current = s;
        const v = video.current!;
        v.srcObject = s;
        await v.play().catch(() => {});
        setMode("live");
        track("selfie_start", ctx, { mode: "live" });
      })
      .catch(() => setMode("fallback"));
    return () => {
      cancelled = true;
      stream.current?.getTracks().forEach((tr) => tr.stop());
    };
  }, []);

  // Live checks: a few times per second on a small copy of the frame.
  useEffect(() => {
    if (mode !== "live") return;
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;
    const probe = document.createElement("canvas");
    const pctx = probe.getContext("2d", { willReadFrequently: true })!;
    const tick = async () => {
      if (stop) return;
      const v = video.current, b = box.current;
      if (v && b && v.videoWidth) {
        try {
          const { loadVision } = await import("@/lib/analysis/face/mediapipe");
          const vision = await loadVision();
          probe.width = PROBE_W;
          probe.height = Math.round((PROBE_W * v.videoHeight) / v.videoWidth);
          pctx.drawImage(v, 0, 0, probe.width, probe.height);
          const faces = vision.landmarker.detect(probe).faceLandmarks;
          const first = faces[0];
          const map = coverMap({ w: v.videoWidth, h: v.videoHeight }, { w: b.clientWidth, h: b.clientHeight });
          const luminance = (i: number) => {
            const p = first?.[i];
            if (!p) return 0;
            const x = Math.max(0, Math.min(probe.width - 3, Math.round(p.x * probe.width) - 1));
            const y = Math.max(0, Math.min(probe.height - 3, Math.round(p.y * probe.height) - 1));
            const d = pctx.getImageData(x, y, 3, 3).data;
            let sum = 0;
            for (let k = 0; k < d.length; k += 4) sum += 0.2126 * d[k]! + 0.7152 * d[k + 1]! + 0.0722 * d[k + 2]!;
            return sum / 9 / 255;
          };
          if (!stop) setChecks(assessFrame(first ? first.map(map) : null, faces.length, { w: b.clientWidth, h: b.clientHeight }, luminance));
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
  }, [mode]);

  const analyse = useCallback(
    async (blob: Blob, mirrored = false) => {
      setBusy(true);
      setError(null);
      try {
        const { runPipelineA } = await import("@/lib/analysis/pipelineA");
        const { result, debug, canvas } = await runPipelineA(blob);
        if (!result.ok || !result.measurements || !result.profile) {
          setRetry({ tip: t.noFace, attempts: (retry?.attempts ?? 0) + 1 });
          return;
        }
        const attempts = (retry?.attempts ?? 0) + 1;
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
        flowSession.setResult({
          measurements: result.measurements,
          lowConfidence: low,
          jewel: jewel ?? undefined,
          face,
          pipeline: "A",
          at: Date.now(),
        });
        track("selfie_ok", ctx, { attempts, mode });
        track("analysis_done", ctx, {
          pipeline: "A",
          confidence: Number(result.profile.confidence.overall.toFixed(2)),
          cost_eur: 0,
          ms: Math.round(result.timings.totalMs),
          card: result.card.used,
        });
        stream.current?.getTracks().forEach((tr) => tr.stop());
        router.push("/analyse");
      } catch {
        setError(t.failed);
      } finally {
        setBusy(false);
      }
    },
    [ctx, jewel, mode, retry, router, t],
  );

  function guardAge(): boolean {
    if (age) return true;
    setAgeWarn(true);
    return false;
  }

  async function capture() {
    if (!guardAge()) return;
    const v = video.current;
    if (!v?.videoWidth) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    const blob = await new Promise<Blob | null>((res) => c.toBlob(res, "image/jpeg", 0.92));
    if (blob) await analyse(blob, true);
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    track("selfie_start", ctx, { mode: "file" });
    void analyse(f);
  }

  const allGreen = checks.face && checks.light && checks.even;

  return (
    <main className="screen">
      <AppBar pill={t.pill} />
      <Crumbs step={2} />
      <div className="pad">
        <div className={`viewfinder${mode === "live" ? " is-live" : ""}${allGreen ? " is-ok" : ""}`} ref={box}>
          <video ref={video} playsInline muted autoPlay aria-hidden="true" />
          {/* oval and dimmed surround in one shape, so they always line up (OVAL in lib/analysis/live.ts) */}
          <svg className="oval" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
            <path className="dim" fillRule="evenodd" d="M0 0H100V125H0Z M21 55a29 38.7 0 1 0 58 0a29 38.7 0 1 0 -58 0Z" />
            <ellipse cx="50" cy="55" rx="29" ry="38.7" />
          </svg>
          {mode === "fallback" && (
            <label className="vf-fallback is-tap" onClick={(e) => { if (!guardAge()) e.preventDefault(); }}>
              <CameraIcon />
              <p>{t.noCamera}</p>
              <input type="file" accept="image/*" capture="user" hidden onChange={onFile} disabled={busy} />
            </label>
          )}
          {mode === "starting" && <div className="vf-fallback"><p>{t.loading}</p></div>}
          <div className="vf-tips" aria-live="polite">
            {mode === "live" ? (
              (["face", "light", "even"] as const).map((k) => (
                <span key={k} className={checks[k] ? "ok" : ""}>
                  {checks[k] && <CheckIcon />}
                  {t.tips[k]}
                </span>
              ))
            ) : (
              <span>{t.hint}</span>
            )}
          </div>
          {busy && <div className="vf-busy"><span>{t.busy}</span></div>}
        </div>

        {retry && (
          <div className="notice" role="status">
            <b>{t.retryTitle}</b>
            <span>{retry.tip}</span>
          </div>
        )}
        {error && <p className="notice bad" role="alert">{error}</p>}

        <section className="q" aria-labelledby="q-jewel">
          <h2 id="q-jewel">{t.jewelQuestion}</h2>
          <div className="chips">
            {(["goud", "zilver", "weetniet"] as const).map((j) => (
              <button key={j} aria-pressed={jewel === j} onClick={() => setJewel(j)}>
                {j !== "weetniet" && <i className={`metal ${j}`} aria-hidden="true" />}
                {t.jewel[j]}
              </button>
            ))}
          </div>
        </section>

        <label className={`agecheck${ageWarn && !age ? " warn" : ""}`}>
          <input type="checkbox" checked={age} onChange={(e) => { setAge(e.target.checked); setAgeWarn(false); }} />
          <span>{t.age}</span>
        </label>
        {ageWarn && !age && <p className="small warn-text" role="alert">{t.ageNeeded}</p>}

        <div className="stack-sm">
          {mode === "live" ? (
            <button className="btn" onClick={capture} disabled={busy}>
              <CameraIcon />
              {busy ? t.busy : t.start}
            </button>
          ) : (
            <label className={`btn${busy ? " is-busy" : ""}`} onClick={(e) => { if (!guardAge()) e.preventDefault(); }}>
              <CameraIcon />
              {busy ? t.busy : t.start}
              <input type="file" accept="image/*" capture="user" hidden onChange={onFile} disabled={busy} />
            </label>
          )}
          <label className="link-btn" onClick={(e) => { if (!guardAge()) e.preventDefault(); }}>
            {t.pickPhoto}
            <input type="file" accept="image/*" hidden onChange={onFile} disabled={busy} />
          </label>
        </div>

        <p className="trust"><LockIcon />{t.trust}</p>
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
