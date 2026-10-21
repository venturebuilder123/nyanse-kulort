import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { LOCALE_HEADER } from "@/lib/i18n/locale";

// Minimal shell; the customer flow (app/(flow)) and the lab (app/lab) bring their own styles.
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

// Site ownership checks, on every page (Pinterest claimed the domain on 21 Oct 2026)
export const metadata: Metadata = { verification: { other: { "p:domain_verify": "b0af4cbd7580b972a5860834f406fac8" } } };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = (await headers()).get(LOCALE_HEADER) === "en" ? "en" : "nl";
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
