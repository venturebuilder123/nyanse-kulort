"use client";

import Link from "next/link";
import { FLOW } from "@/lib/i18n/flow";
import { useBrand } from "./BrandProvider";

export default function FlowError({ reset }: { error: Error; reset: () => void }) {
  const E = FLOW[useBrand().locale].error;
  return (
    <main className="screen">
      <div className="pad" style={{ justifyContent: "center", textAlign: "center", minHeight: "70svh" }}>
        <h1 className="disp sm">{E.title}</h1>
        <p className="sub" style={{ margin: "0 auto" }}>{E.text}</p>
        <button className="btn" onClick={reset}>{E.again}</button>
        <Link className="link-btn" href="/">{E.home}</Link>
      </div>
    </main>
  );
}
