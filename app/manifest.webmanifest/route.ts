import { NextResponse, type NextRequest } from "next/server";
import { BRANDS, VOICES } from "@/lib/brand/config";
import { BRAND_COOKIE, resolveBrand } from "@/lib/brand/resolve";

// One manifest per brand (CLAUDE.md §4): own name, icon and theme colour on the home screen.
export function GET(req: NextRequest) {
  const { brand } = resolveBrand({ host: req.headers.get("host"), brandCookie: req.cookies.get(BRAND_COOKIE)?.value });
  const b = BRANDS[brand];
  const copy = VOICES[b.voices[0]!];
  const icon = (name: string, size: number, purpose?: string) => ({ src: `/icons/monogram-${name}.png`, sizes: `${size}x${size}`, type: "image/png", ...(purpose ? { purpose } : {}) });
  return NextResponse.json(
    {
      id: `/?app=${brand}`,
      name: b.name,
      short_name: b.name,
      description: copy.meta.description,
      lang: "nl",
      start_url: "/?utm_source=homescreen",
      scope: "/",
      display: "standalone",
      background_color: b.themeColor.light,
      theme_color: b.themeColor.light,
      icons: [icon("192", 192), icon("512", 512), icon("maskable", 512, "maskable")],
    },
    { headers: { "Content-Type": "application/manifest+json", "Cache-Control": "public, max-age=3600", Vary: "Host, Cookie" } },
  );
}
