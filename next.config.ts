import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets a phone on the same home/office network open the lab for selfie tests.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // Lab pages must never be indexed or cached by intermediaries.
  async headers() {
    return [
      // Face models and WASM: large and rarely changing. Cache for a week; revalidate in the background.
      {
        source: "/:dir(models|mediapipe)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
      {
        source: "/lab/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
