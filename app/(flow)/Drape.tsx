"use client";

import { useId } from "react";

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
  const cloth = clothPath(fit, f.h !== undefined ? f.h * (s / f.aspect) : undefined);
  // unique per instance, several drapes share a page
  const id = useId().replace(/:/g, "");
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

/**
 * The cloth in frame units (100 wide, 125 high), anchored to the face: it closes around the
 * neck just below the chin and falls over the shoulders, so no T-shirt shows above it.
 * Proportions from portrait anatomy, in face widths and heights.
 */
export function clothPath(fit: { w: number; cy: number }, faceH?: number) {
  const fw = fit.w * 100;
  const fh = (faceH ?? fit.w * 1.32) * 100;
  const cx = 50;
  const chin = fit.cy * 125 + fh / 2;
  const neckY = chin + 0.2 * fh; // where the cloth meets the neck
  const neckHalf = 0.34 * fw;
  const dip = neckY + 0.07 * fh; // the collar's curve under the throat
  const shY = chin + 0.4 * fh; // top of the shoulders
  const shX = 1.9 * fw;
  const outY = shY + 0.4 * fh; // where the arms fall away
  const L = cx - neckHalf, R = cx + neckHalf;
  const d = [
    `M${L} ${neckY}`,
    // trapezius: a soft S from the neck down to the shoulder
    `C${L - 0.12 * fw} ${neckY + 0.04 * fh} ${cx - shX + 0.25 * fw} ${shY - 0.06 * fh} ${cx - shX} ${shY + 0.02 * fh}`,
    `Q${cx - shX - 0.22 * fw} ${shY + 0.1 * fh} ${cx - shX - 0.3 * fw} ${outY}`,
    `L-6 ${outY + 0.2 * fh} L-6 131 L106 131 L106 ${outY + 0.2 * fh}`,
    `L${cx + shX + 0.3 * fw} ${outY}`,
    `Q${cx + shX + 0.22 * fw} ${shY + 0.1 * fh} ${cx + shX} ${shY + 0.02 * fh}`,
    `C${cx + shX - 0.25 * fw} ${shY - 0.06 * fh} ${R + 0.12 * fw} ${neckY + 0.04 * fh} ${R} ${neckY}`,
    // the collar, back to the start
    `C${R - 0.08 * fw} ${dip} ${L + 0.08 * fw} ${dip} ${L} ${neckY}`,
    "Z",
  ].join(" ");
  const collar = `M${L} ${neckY} C${L + 0.08 * fw} ${dip} ${R - 0.08 * fw} ${dip} ${R} ${neckY}`;
  return { d, collar, neckY, neckHalf };
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
