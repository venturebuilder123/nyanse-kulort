import Link from "next/link";
import { currentBrand } from "../brand";

// Placeholder until the selfie step is built (next round): camera, oval, live tips, 16+ tap.
export default async function Page() {
  const { copy } = await currentBrand();
  return (
    <main className="screen">
      <div className="pad" style={{ justifyContent: "center", textAlign: "center", minHeight: "60dvh" }}>
        <h1 className="disp sm">
          {copy.landing.headline[0]} <em>{copy.landing.headline[1]}</em>
        </h1>
        <p style={{ color: "var(--muted)" }}>De selfie-stap volgt in de volgende bouwronde.</p>
        <Link className="btn" href="/stijl">Terug</Link>
      </div>
    </main>
  );
}
