"use client";

import { useState } from "react";
import { forgetMe } from "@/lib/flow/forget";
import { useBrand } from "../BrandProvider";

export default function DeleteProfile() {
  const { locale } = useBrand();
  const [done, setDone] = useState(false);
  const en = locale === "en";
  return done ? (
    <p className="notice">{en ? "Your profile has been deleted, from this device and from our server." : "Je profiel is verwijderd, van dit apparaat en van onze server."}</p>
  ) : (
    <button className="btn" onClick={() => { void forgetMe().then(() => setDone(true)); }}>{en ? "Delete my profile" : "Verwijder mijn profiel"}</button>
  );
}
