"use client";

import Link from "next/link";

export default function FlowError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="screen">
      <div className="pad" style={{ justifyContent: "center", textAlign: "center", minHeight: "70svh" }}>
        <h1 className="disp sm">Er ging iets mis.</h1>
        <p className="sub" style={{ margin: "0 auto" }}>Je foto is nergens heen gestuurd. Probeer het nog een keer.</p>
        <button className="btn" onClick={reset}>Opnieuw</button>
        <Link className="link-btn" href="/">Naar het begin</Link>
      </div>
    </main>
  );
}
