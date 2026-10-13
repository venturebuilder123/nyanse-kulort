import type { Viewport } from "next";

// Minimal shell; the customer flow (app/(flow)) and the lab (app/lab) bring their own styles.
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
