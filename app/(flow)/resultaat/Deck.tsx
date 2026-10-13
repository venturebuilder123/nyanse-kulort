"use client";

import { useEffect, useRef, useState } from "react";

export type DeckCard = { hex: string; name: string; open: boolean };

// The colours as cards. The free ones flip open like small presents when they scroll into
// view; the closed ones are a compact strip of the real colours, blurred and without names.
// Honest curiosity: every closed tile is a real colour from this person's palette, in the guide.
export function Deck({ cards, onLocked }: { cards: DeckCard[]; onLocked: () => void }) {
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
              <div className="dk-front" style={{ background: c.hex }}><b>{c.name}</b></div>
            </div>
          </div>
        ))}
      </div>
      {shut.length > 0 && (
        <button className="deck-shut" onClick={onLocked} aria-label={`Nog ${shut.length} kleuren met naam in je stijlgids`}>
          <span className="deck-shut-grid" aria-hidden="true">
            {shut.map((c, i) => <i key={c.hex + i} style={{ background: c.hex }} />)}
          </span>
          <span className="deck-shut-label">+{shut.length} kleuren met naam in je gids <span aria-hidden="true">→</span></span>
        </button>
      )}
    </div>
  );
}
