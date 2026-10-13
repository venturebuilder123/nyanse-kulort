"use client";

import { useState } from "react";
import { flowSession } from "@/lib/flow/session";

export default function DeleteProfile() {
  const [done, setDone] = useState(false);
  return done ? (
    <p className="notice">Je profiel is verwijderd van dit apparaat.</p>
  ) : (
    <button className="btn" onClick={() => { flowSession.clear(); setDone(true); }}>Verwijder mijn profiel</button>
  );
}
