import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: lets a phone on the same home/office network open the lab for selfie tests.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // Lab pages must never be indexed or cached by intermediaries.
  async headers() {
    return [
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
