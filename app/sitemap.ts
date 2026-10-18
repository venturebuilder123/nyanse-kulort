import type { MetadataRoute } from "next";

// Public pages for search engines; the flow behind the check (result, guide) stays out.
const BASE = "https://www.kulort-nyanse.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-18");
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/kleuranalyse`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/kulort`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/nyanse`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/voorwaarden`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
