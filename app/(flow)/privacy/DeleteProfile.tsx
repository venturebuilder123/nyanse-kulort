"use client";

import { useState } from "react";
import { forgetMe } from "@/lib/flow/forget";

export default function DeleteProfile() {
  const [done, setDone] = useState(false);
  return done ? (
    <p className="notice">Je profiel is verwijderd, van dit apparaat en van onze server.</p>
  ) : (
    <button className="btn" onClick={() => { void forgetMe().then(() => setDone(true)); }}>Verwijder mijn profiel</button>
  );
}
