import Link from "next/link";

// Unmatched URLs land outside the brand layout, so this page stays neutral.
export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeContent: "center", gap: 16, padding: 24, textAlign: "center", fontFamily: "system-ui, sans-serif", background: "#f4f0ea", color: "#1b2433" }}>
      <h1 style={{ fontSize: 24, margin: 0 }}>Deze pagina bestaat niet (meer).</h1>
      <Link href="/" style={{ color: "#8a4a26", fontWeight: 700 }}>Naar je kleuren</Link>
    </main>
  );
}
