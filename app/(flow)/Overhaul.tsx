"use client";

import { useEffect, useState } from "react";

/** Sections slide in once when they come into view (9 Nov 2026); everything is visible without JS. */
export function useOvReveal(selector: string) {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(selector)];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    // only what is still below the fold animates; what you already see stays put
    const below = els.filter((el) => el.getBoundingClientRect().top > innerHeight * 0.9);
    below.forEach((el) => el.classList.add("ov-reveal"));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    below.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

/**
 * The start button that follows you on phones: shows once the first question has scrolled away and
 * hides again near the end, where the page has its own big button.
 */
export function StickyStart({ label, onStart, watch, until }: { label: string; onStart: () => void; watch: string; until?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const top = document.querySelector(watch), end = until ? document.querySelector(until) : null;
    if (!top) return;
    let past = false, atEnd = false;
    const set = () => setOn(past && !atEnd);
    const io = new IntersectionObserver(([e]) => { past = !e!.isIntersecting && e!.boundingClientRect.top < 0; set(); });
    const io2 = new IntersectionObserver(([e]) => { atEnd = e!.isIntersecting; set(); });
    io.observe(top);
    if (end) io2.observe(end);
    return () => { io.disconnect(); io2.disconnect(); };
  }, [watch, until]);
  return (
    <div className={`ov-sticky${on ? " is-on" : ""}`} aria-hidden={!on}>
      <button type="button" className="btn" tabIndex={on ? 0 : -1} onClick={onStart}>{label}</button>
    </div>
  );
}
