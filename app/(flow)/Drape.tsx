"use client";

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
  // Fit the face into the 4:5 frame.
  const f = face ?? { cx: 0.5, cy: 0.4, w: 0.45, aspect: 0.75, mirrored: false };
  const s = fit.w / f.w; // displayed image width in frame widths
  const left = 0.5 - (f.mirrored ? 1 - f.cx : f.cx) * s;
  const top = (fit.cy * 1.25 - f.cy * (s / f.aspect)) / 1.25;
  return (
    <div className={`drape ${className}`}>
      {photo ? (
        <img
          src={photo}
          alt=""
          style={{ width: `${s * 100}%`, left: `${left * 100}%`, top: `${top * 100}%`, transform: f.mirrored ? "scaleX(-1)" : undefined }}
        />
      ) : (
        <FacePlaceholder />
      )}
      <div className="drape-glow" style={{ background: `radial-gradient(ellipse at 50% 92%, ${color} 0%, transparent 62%)` }} />
      <svg className="drape-cloth" viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 L0 34 Q30 6 70 14 L100 54 L130 14 Q170 6 200 34 L200 70 Z" fill={color} />
        <path d="M0 70 L0 34 Q30 6 70 14 L100 54 L130 14 Q170 6 200 34 L200 70 Z" fill="url(#drape-fold)" />
        <path d="M70 14 L100 54 L130 14" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2" />
        <defs>
          <linearGradient id="drape-fold" x1="0" x2="1">
            <stop offset="0" stopColor="#000" stopOpacity=".18" />
            <stop offset=".35" stopColor="#fff" stopOpacity=".12" />
            <stop offset=".5" stopColor="#000" stopOpacity=".05" />
            <stop offset=".7" stopColor="#fff" stopOpacity=".1" />
            <stop offset="1" stopColor="#000" stopOpacity=".2" />
          </linearGradient>
        </defs>
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
