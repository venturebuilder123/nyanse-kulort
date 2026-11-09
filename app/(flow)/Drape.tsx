"use client";

import { useId, useState } from "react";

import { clothPath } from "@/lib/flow/cloth";
import type { FaceBox } from "@/lib/flow/session";

/**
 * The person's own photo, cropped to the face, with a colour cloth under the chin and a soft
 * reflection of that colour on the face (the classic drape test). Purely local: the photo is
 * an object URL that never leaves the device.
 */
export function Drape({
  photo,
  face,
  color,
  className = "",
  fit = { w: 0.52, cy: 0.42 },
}: {
  photo: string | null;
  face?: FaceBox;
  color: string;
  className?: string;
  /** face width (fraction of the frame) and vertical centre; smaller and higher shows more cloth */
  fit?: { w: number; cy: number };
}) {
  // Fit the face into the 4:5 frame. The real shape of the photo wins over the one measured during the
  // analysis: Safari on a Mac hands the camera frame over in another shape than the canvas had
  // (9 Nov 2026: the face sat high and the cloth far below it).
  const [real, setReal] = useState<number | null>(null);
  const f0 = face ?? { cx: 0.5, cy: 0.4, w: 0.45, aspect: 0.75, mirrored: false };
  const f = real && Math.abs(real - f0.aspect) > 0.02 ? { ...f0, aspect: real } : f0;
  const s = fit.w / f.w; // displayed image width in frame widths
  const left = 0.5 - (f.mirrored ? 1 - f.cx : f.cx) * s;
  const top = (fit.cy * 1.25 - f.cy * (s / f.aspect)) / 1.25;
  const cloth = clothPath(fit, f.h !== undefined ? f.h * (s / f.aspect) : undefined);
  // unique per instance, several drapes share a page
  const id = useId().replace(/:/g, "");
  return (
    <div className={`drape ${className}`}>
      {photo ? (
        <img
          src={photo}
          alt=""
          onLoad={(e) => { const i = e.currentTarget; if (i.naturalWidth && i.naturalHeight) setReal(i.naturalWidth / i.naturalHeight); }}
          style={{ width: `${s * 100}%`, left: `${left * 100}%`, top: `${top * 100}%`, transform: f.mirrored ? "scaleX(-1)" : undefined }}
        />
      ) : (
        <FacePlaceholder />
      )}
      <div className="drape-glow" style={{ background: `radial-gradient(ellipse 60% 26% at 50% ${(cloth.neckY + 4) / 1.25}%, ${color} 0%, transparent 70%)` }} />
      <svg className="drape-cloth" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          {/* folds running down from the neck, light from the front */}
          <linearGradient id={`${id}f`} x1="0" x2="1">
            <stop offset="0" stopColor="#000" stopOpacity=".28" />
            <stop offset=".22" stopColor="#fff" stopOpacity=".10" />
            <stop offset=".38" stopColor="#000" stopOpacity=".06" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".08" />
            <stop offset=".64" stopColor="#000" stopOpacity=".05" />
            <stop offset=".8" stopColor="#fff" stopOpacity=".09" />
            <stop offset="1" stopColor="#000" stopOpacity=".3" />
          </linearGradient>
          {/* the chin's shadow on the collar */}
          <radialGradient id={`${id}s`} cx="50" cy={cloth.neckY} r={cloth.neckHalf * 2.2} gradientUnits="userSpaceOnUse" gradientTransform={`translate(0 ${cloth.neckY}) scale(1 .45) translate(0 ${-cloth.neckY})`}>
            <stop offset="0" stopColor="#000" stopOpacity=".38" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}v`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".18" />
          </linearGradient>
        </defs>
        <path d={cloth.d} fill={color} className="drape-fill" />
        <path d={cloth.d} fill={`url(#${id}f)`} />
        <path d={cloth.d} fill={`url(#${id}v)`} />
        <path d={cloth.d} fill={`url(#${id}s)`} />
        <path d={cloth.collar} fill="none" stroke="rgba(0,0,0,.22)" strokeWidth=".7" strokeLinecap="round" />
        <path d={cloth.collar} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth=".35" strokeLinecap="round" transform="translate(0 .9)" />
      </svg>
    </div>
  );
}

function FacePlaceholder() {
  return (
    <svg className="drape-ph" viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="200" height="250" fill="#d9d3cc" />
      <ellipse cx="100" cy="105" rx="46" ry="58" fill="#c9b8a8" />
      <rect x="84" y="150" width="32" height="40" fill="#c9b8a8" />
    </svg>
  );
}
