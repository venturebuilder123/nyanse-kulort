"use client";

import { useEffect, useRef, useState } from "react";
import type { Swatch } from "@/lib/guide/build";

// The unveiling: the person's colour fan opens in 3D, the season name types itself in,
// their best colour glows behind it. One moment of delight after the effort of the flow.
// Pointer/tilt adds a little depth; everything is static with prefers-reduced-motion.
export function Reveal(props: {
  kicker: string;
  family: string;
  typeLabel: string;
  season: string;
  between?: string;
  next: string;
  text: string;
  line: string;
  scales: { label: string; word: string; value: number; left: string; right: string }[];
  named: { family: string; names: string[] };
  fan: Swatch[];
  glow: string;
  provisional?: string;
}) {
  const [open, setOpen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(true));
    const el = stage.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return () => cancelAnimationFrame(id);
    const move = (x: number, y: number) => {
      el.style.setProperty("--ry", `${(x - 0.5) * 16}deg`);
      el.style.setProperty("--rx", `${(0.5 - y) * 10 + 14}deg`);
    };
    const onPointer = (e: PointerEvent) => move(e.clientX / innerWidth, e.clientY / innerHeight);
    const onTilt = (e: DeviceOrientationEvent) => e.gamma != null && e.beta != null && move(0.5 + e.gamma / 60, 0.5 + (e.beta - 45) / 90);
    addEventListener("pointermove", onPointer);
    addEventListener("deviceorientation", onTilt);
    return () => {
      cancelAnimationFrame(id);
      removeEventListener("pointermove", onPointer);
      removeEventListener("deviceorientation", onTilt);
    };
  }, []);

  const n = props.fan.length;
  return (
    <section className={`rv${open ? " is-open" : ""}`} style={{ "--glow": props.glow } as React.CSSProperties}>
      <div className="rv-stage" ref={stage} aria-hidden="true">
        <div className="rv-fan">
          {props.fan.map((c, i) => (
            <i key={c.hex + i} style={{ "--i": i, "--a": `${(i - (n - 1) / 2) * 9}deg`, background: c.hex } as React.CSSProperties}>
              <span>{c.name}</span>
            </i>
          ))}
          <b className="rv-pin" />
        </div>
      </div>
      <div className="rv-copy">
        {(props.kicker || props.provisional) && <p className="rv-kicker">{props.kicker}{props.provisional && <span className="tag-soft">{props.provisional}</span>}</p>}
        <p className="rv-level">Je seizoen</p>
        <h1 className="disp rv-family">{props.family}</h1>
        <p className="rv-level">Je precieze kleurtype</p>
        <p className="rv-type">
          <span className="sr-only">{props.typeLabel}: </span>
          <b aria-label={props.season}>
            {[...props.season].map((ch, i) => (
              <span key={i} aria-hidden="true" style={{ "--d": `${600 + i * 45}ms` } as React.CSSProperties}>{ch === " " ? " " : ch}</span>
            ))}
          </b>
        </p>
        {props.between && <p className="rv-between">{props.between}</p>}
        <p className="rv-line">{props.line}</p>
        <p className="rv-desc">{props.text}</p>
        <div className="rv-scales" aria-label="Zo ben je opgebouwd">
          {props.scales.map((s) => (
            <div key={s.label} className="rv-scale">
              <span className="rv-scale-head"><span>{s.label}</span><b>{s.word}</b></span>
              <span className="rv-scale-track"><i style={{ left: `${Math.max(3, Math.min(97, s.value * 100))}%` }} /></span>
              <span className="rv-scale-ends"><span>{s.left}</span><span>{s.right}</span></span>
            </div>
          ))}
        </div>
        {props.named.names.length > 0 && (
          <p className="rv-named"><span>Vaak genoemd als {props.named.family}:</span> {props.named.names.join(" · ")}</p>
        )}
        <p className="rv-cue">{props.next} <span aria-hidden="true">↓</span></p>
      </div>
    </section>
  );
}
