"use client";

import { useEffect, useRef, useState } from "react";
import { FLOW } from "@/lib/i18n/flow";
import { useBrand } from "../BrandProvider";

/** Relative luminance above ~0.6: the name goes dark (a white tile with a white name was unreadable). */
const light = (hex: string) => {
  const n = parseInt(hex.slice(1), 16), [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;
};

export type DeckCard = { hex: string; name: string; open: boolean };

// The colours as cards. The free ones flip open like small presents when they scroll into
// view; the closed ones are a compact strip of the real colours, blurred and without names.
// Honest curiosity: every closed tile is a real colour from this person's palette, in the guide.
export function Deck({ cards, onLocked }: { cards: DeckCard[]; onLocked: () => void }) {
  const Dk = FLOW[useBrand().locale].deck;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setInView(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const open = cards.filter((c) => c.open);
  const shut = cards.filter((c) => !c.open);
  return (
    <div className={`deck-wrap${inView ? " is-in" : ""}`} ref={ref}>
      <div className={`deck${shut.length ? "" : " deck-all"}`}>
        {open.map((c, i) => (
          <div key={c.hex + i} className="dk" style={{ "--d": `${150 + i * 150}ms` } as React.CSSProperties}>
            <div className="dk-in">
              <div className="dk-back" />
              <div className={`dk-front${light(c.hex) ? " is-light" : ""}`} style={{ background: c.hex }}><b>{c.name}</b></div>
            </div>
          </div>
        ))}
      </div>
      {shut.length > 0 && (
        <button className="deck-shut" onClick={onLocked} aria-label={Dk.moreAria(shut.length)}>
          <span className="deck-shut-grid" aria-hidden="true">
            {shut.map((c, i) => <i key={c.hex + i} style={{ background: c.hex }} />)}
          </span>
          <span className="deck-shut-label">{Dk.more(shut.length)} <span aria-hidden="true">→</span></span>
        </button>
      )}
    </div>
  );
}
