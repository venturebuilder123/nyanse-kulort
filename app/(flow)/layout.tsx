import type { Metadata, Viewport } from "next";
import { fontVariables } from "../fonts";
import { currentBrand } from "./brand";
import { BrandProvider } from "./BrandProvider";
import { Lifecycle } from "./Lifecycle";
import { LangHint } from "./Lang";
import { enabledLocales } from "@/lib/i18n/locale";
import "./flow.css";

export async function generateMetadata(): Promise<Metadata> {
  const { copy, config } = await currentBrand();
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    // the English home exists once English is switched on; search engines get both
    ...(enabledLocales().includes("en") ? { alternates: { languages: { nl: "https://www.kulort-nyanse.com/", en: "https://www.kulort-nyanse.com/en", "x-default": "https://www.kulort-nyanse.com/" } } } : {}),
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, title: config.name, statusBarStyle: "default" },
    // the house monogram Ø|N for both brands; app/favicon.ico (picked up by Next.js) covers the browser tab
    icons: { apple: "/icons/monogram-apple.png", icon: { url: "/icons/monogram-192.png", type: "image/png" } },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const { config } = await currentBrand();
  return {
    themeColor: "#F6F2EC",
    colorScheme: "light",
  };
}

export default async function FlowLayout({ children }: { children: React.ReactNode }) {
  const { config, voice, copy, segment, chosen, locale } = await currentBrand();
  return (
    <div className={`app ${fontVariables}`} data-brand={chosen ? config.key : "maison"} data-voice={voice} data-segment={segment ?? undefined}>
      <script
        type="application/ld+json"
        // the house and its public profiles, for search engines
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "KULØRT · NYANSE", url: "https://www.kulort-nyanse.com", email: "nyansekulort@gmail.com", sameAs: ["https://www.instagram.com/kulortnyanse/"] }) }}
      />
      <BrandProvider value={{ config, voice, copy, segment, locale }}>
        <LangHint />
        <Lifecycle />
        {children}
      </BrandProvider>
    </div>
  );
}
