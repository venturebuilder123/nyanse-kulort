"use client";

import { useState } from "react";
import { forgetMe } from "@/lib/flow/forget";
import { useBrand } from "../BrandProvider";

const T = {
  nl: ["Verwijder mijn profiel", "Je profiel is verwijderd, van dit apparaat en van onze server."],
  en: ["Delete my profile", "Your profile has been deleted, from this device and from our server."],
  de: ["Mein Profil löschen", "Dein Profil wurde gelöscht, von diesem Gerät und von unserem Server."],
  es: ["Borrar mi perfil", "Tu perfil se ha borrado, de este dispositivo y de nuestro servidor."],
} as const;

export default function DeleteProfile() {
  const { locale } = useBrand();
  const [done, setDone] = useState(false);
  const [btn, msg] = T[locale];
  return done ? (
    <p className="notice">{msg}</p>
  ) : (
    <button className="btn" onClick={() => { void forgetMe().then(() => setDone(true)); }}>{btn}</button>
  );
}
