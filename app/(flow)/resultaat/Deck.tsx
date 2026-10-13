"use client";

import { useEffect, useRef, useState } from "react";
import type { BrandKey } from "@/lib/brand/types";

export type DeckCard = { hex: string; name: string; open: boolean };

// All 30 colours as cards. The free ones flip open like small presents when they scroll into
// view; the rest stay face down, showing only a sliver of their colour. Honest curiosity:
// every closed card is a real colour from this person's palette, in the guide.
export function Deck({ cards, brand, onLocked }: { cards: DeckCard[]; brand: BrandKey; onLocked: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setInView(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  let opened = 0;
  return (
    <div className={`deck${inView ? " is-in" : ""}`} ref={ref}>
      {cards.map((c, i) =>
        c.open ? (
          <div key={c.hex + i} className="dk dk-open" style={{ "--d": `${200 + opened++ * 160}ms` } as React.CSSProperties}>
            <div className="dk-in">
              <div className="dk-back"><Mark brand={brand} /></div>
              <div className="dk-front" style={{ background: c.hex }}><b>{c.name}</b></div>
            </div>
          </div>
        ) : (
          <button key={c.hex + i} className="dk dk-shut" onClick={onLocked} aria-label="Nog dicht: staat in je stijlgids">
            <div className="dk-back"><Mark brand={brand} /><i style={{ background: c.hex }} /></div>
          </button>
        ),
      )}
    </div>
  );
}

function Mark({ brand }: { brand: BrandKey }) {
  return brand === "kulort" ? <span className="dk-mark dk-mark-k">Ø</span> : <span className="dk-mark dk-mark-n">N</span>;
}
