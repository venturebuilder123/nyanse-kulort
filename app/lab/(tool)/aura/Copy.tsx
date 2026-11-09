"use client";

import { useState } from "react";

export function Copy({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState<string | null>(null);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setDone("✓ gekopieerd"); } catch { setDone("lukte niet"); }
        setTimeout(() => setDone(null), 1800);
      }}
    >
      {done ?? label}
    </button>
  );
}
