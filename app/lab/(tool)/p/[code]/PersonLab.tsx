"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PipelineADebug, PipelineAResult } from "@/lib/analysis/pipelineA";
import { labToHex } from "@/lib/color/convert";
import { computeProfile, LOW_CONFIDENCE } from "@/lib/color/profile";
import { SEASONS } from "@/lib/color/seasons";
import { labDb } from "@/lib/lab/db";
import { LIGHTS, runId, type Light, type Person, type Run } from "@/lib/lab/types";

type Preview = { canvas: HTMLCanvasElement; debug: PipelineADebug };

export default function PersonLab({ code }: { code: string }) {
  const [person, setPerson] = useState<Person | null | undefined>(undefined);
  const [runs, setRuns] = useState<Run[]>([]);
  // Previews live only in memory for this page view; photos are never stored.
  const [previews, setPreviews] = useState<Record<string, Preview>>({});

  const reload = useCallback(async () => {
    const [p, r] = await Promise.all([labDb.person(code), labDb.runsFor(code)]);
    setPerson(p ?? null);
    setRuns(r);
  }, [code]);
  useEffect(() => void reload(), [reload]);

  if (person === undefined) return <p className="muted">Laden…</p>;
  if (person === null) return <p>Onbekende testpersoon. <Link href="/lab">Terug</Link></p>;

  return (
    <div className="stack">
      <p className="small"><Link href="/lab">← Testpersonen</Link></p>
      <h1>{person.code}</h1>
      <p className="muted small">
        Monk {person.monk} · {{ v: "vrouw", m: "man", x: "anders" }[person.gender]}
        {person.gender === "m" ? ` · ${person.beard ? "baard" : "geen baard"}` : ""} · pijplijn A (op dit apparaat)
      </p>
      {([1, 2, 3] as Light[]).map((light) => (
        <section key={light}>
          <h2>{light}. {LIGHTS[light]}</h2>
          <div className="grid grid-2">
            {[true, false].map((withCard) => {
              const id = runId(person.code, light, withCard);
              return (
                <Slot
                  key={id}
                  title={withCard ? "Met kaart" : "Zonder kaart"}
                  withCard={withCard}
                  run={runs.find((r) => r.id === id)}
                  preview={previews[id]}
                  person={person}
                  onDone={async (result, preview) => {
                    await labDb.saveRun({ id, personCode: person.code, light, withCard, createdAt: new Date().toISOString(), result });
                    setPreviews((p) => ({ ...p, [id]: preview }));
                    reload();
                  }}
                  onDelete={async () => {
                    await labDb.deleteRun(id);
                    setPreviews(({ [id]: _, ...rest }) => rest);
                    reload();
                  }}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function Slot(props: {
  title: string;
  withCard: boolean;
  run?: Run;
  preview?: Preview;
  person: Person;
  onDone: (r: PipelineAResult, p: Preview) => Promise<void>;
  onDelete: () => void;
}) {
  const { title, withCard, run, preview, person } = props;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  async function analyse(file: File) {
    setBusy(true);
    setError(null);
    try {
      // dynamic import keeps MediaPipe out of the other lab pages
      const { runPipelineA } = await import("@/lib/analysis/pipelineA");
      const { result, debug, canvas } = await runPipelineA(file);
      await props.onDone(result, { canvas, debug });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  const res = run?.result;
  return (
    <div className="card slot">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div className="row">
          <label className="button secondary" style={{ display: "inline-block" }}>
            {busy ? "Analyseren…" : res ? "Opnieuw" : "Foto kiezen"}
            <input
              ref={input}
              type="file"
              accept="image/*"
              hidden
              disabled={busy}
              onChange={(e) => e.target.files?.[0] && analyse(e.target.files[0])}
            />
          </label>
          {res && !busy && <button className="danger" onClick={props.onDelete}>Wis</button>}
        </div>
      </div>
      {error && <p className="error small">{error}</p>}
      {preview && <Overlay preview={preview} />}
      {res && <ResultView result={res} withCard={withCard} person={person} hasPreview={!!preview} />}
    </div>
  );
}

function Overlay({ preview }: { preview: Preview }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const out = ref.current;
    if (!out) return;
    const { canvas, debug } = preview;
    out.width = canvas.width;
    out.height = canvas.height;
    const ctx = out.getContext("2d")!;
    ctx.drawImage(canvas, 0, 0);
    const lw = Math.max(2, canvas.width / 400);
    ctx.lineWidth = lw;
    const circle = (c: { centre: { x: number; y: number }; r: number }, colour: string) => {
      ctx.strokeStyle = colour;
      ctx.beginPath();
      ctx.arc(c.centre.x, c.centre.y, c.r, 0, Math.PI * 2);
      ctx.stroke();
    };
    const poly = (pts: { x: number; y: number }[], colour: string) => {
      ctx.strokeStyle = colour;
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.stroke();
    };
    if (debug.regions) {
      poly(debug.regions.faceOval, "rgba(255,255,255,0.6)");
      debug.regions.cheeks.forEach((c) => circle(c, "#00e5ff"));
      circle(debug.regions.forehead, "#00e5ff");
      debug.regions.irises.forEach((c) => circle(c, "#ffea00"));
    }
    if (debug.cardOutline) poly(debug.cardOutline, "#00ff6a");
    if (debug.markerCorners) poly(debug.markerCorners, "#ff00c8");
  }, [preview]);
  return <canvas ref={ref} aria-label="Analyse-overlay: blauw = huid, geel = iris, groen = kaart" />;
}

function ResultView({ result, withCard, person, hasPreview }: { result: PipelineAResult; withCard: boolean; person: Person; hasPreview: boolean }) {
  if (!result.ok || !result.measurements) {
    return (
      <div className="status">
        <p className="bad"><strong>Mislukt:</strong> {result.error}</p>
        {result.quality.issues.length > 0 && <ul className="issues">{result.quality.issues.map((i) => <li key={i}>{i}</li>)}</ul>}
      </div>
    );
  }
  // recompute so the view always reflects the current rules version
  const p = computeProfile(result.measurements);
  const m = result.measurements;
  const issues = [...result.quality.issues];
  if (withCard && !result.card.found) issues.unshift("Kaart niet gevonden: houd hem plat, scherp en helemaal in beeld");
  if (!withCard && result.card.found) issues.unshift("Er staat toch een kaart op deze foto");
  const uncal = result.uncalibrated && computeProfile(result.uncalibrated.measurements);

  return (
    <div className="status stack" style={{ gap: 8 }}>
      {!hasPreview && <p className="muted small">Foto niet bewaard; alleen de meetwaarden hieronder.</p>}
      <div>
        <span className="season">{SEASONS[p.match.season].name}</span>
        {p.match.border && <span className="muted"> · rand met {SEASONS[p.match.second].name}</span>}
      </div>
      <Scale label="Ondertoon" value={(p.undertone + 1) / 2} raw={p.undertone} conf={p.confidence.undertone} left="koel" right="warm" />
      <Scale label="Diepte" value={p.depth} raw={p.depth} conf={p.confidence.depth} left="licht" right="diep" />
      <Scale label="Helderheid" value={p.clarity} raw={p.clarity} conf={p.confidence.clarity} left="zacht" right="helder" />
      <p className="small">
        Betrouwbaarheid{" "}
        <span className={p.confidence.overall < LOW_CONFIDENCE ? "bad" : p.confidence.overall < 0.7 ? "warn" : "ok"}>
          {p.confidence.overall.toFixed(2)}
        </span>
        {p.confidence.overall < LOW_CONFIDENCE && " · in de app zou hier om een extra selfie gevraagd worden"}
      </p>
      <div className="row small">
        <Chip label="huid" lab={m.skin.lab} n={m.skin.n} />
        {m.hair && <Chip label="haar" lab={m.hair.lab} n={m.hair.n} />}
        {m.iris && <Chip label="iris" lab={m.iris.lab} n={m.iris.n} />}
        {m.beard && <Chip label="baard" lab={m.beard.lab} n={m.beard.n} />}
      </div>
      <p className="small muted">
        Kaart: {result.card.used ? `gebruikt (marker ${Math.round(result.card.markerPx ?? 0)} px, wit-restkleur ${result.card.whiteChroma?.toFixed(1)})` : result.card.found ? `gevonden, niet gebruikt (${result.card.rejected})` : "niet gevonden"}
        {uncal && ` · zonder correctie: ${SEASONS[uncal.match.season].name}`}
        <br />
        Monk-schatting {result.monkEstimate} (onderzoeker: {person.monk}) · gezicht {Math.round(result.quality.faceWidthPx)} px ·{" "}
        {Math.round(result.timings.totalMs)} ms ({result.delegate}) · €0
      </p>
      {result.card.warnings.length + issues.length > 0 && (
        <ul className="issues">{[...issues, ...result.card.warnings].map((i) => <li key={i}>{i}</li>)}</ul>
      )}
    </div>
  );
}

function Scale({ label, value, raw, conf, left, right }: { label: string; value: number; raw: number; conf: number; left: string; right: string }) {
  return (
    <div className="scale" title={`${left} ← → ${right} · betrouwbaarheid ${conf.toFixed(2)}`}>
      <span>{label}</span>
      <div className="bar" style={{ opacity: 0.35 + 0.65 * conf }}>
        <span style={{ left: `${Math.min(100, Math.max(0, value * 100))}%` }} />
      </div>
      <span className="muted">{raw.toFixed(2)}</span>
    </div>
  );
}

function Chip({ label, lab, n }: { label: string; lab: { L: number; a: number; b: number }; n: number }) {
  return (
    <span className="row" style={{ gap: 4 }} title={`L ${lab.L.toFixed(1)} · a ${lab.a.toFixed(1)} · b ${lab.b.toFixed(1)} · ${n} px`}>
      <span style={{ width: 18, height: 18, borderRadius: 4, background: labToHex(lab), border: "1px solid var(--line)" }} />
      {label}
    </span>
  );
}
