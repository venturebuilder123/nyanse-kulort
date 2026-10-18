import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/lab", "/api", "/go", "/gids", "/klaar", "/resultaat", "/analyse", "/email"] },
    sitemap: "https://www.kulort-nyanse.com/sitemap.xml",
  };
}
