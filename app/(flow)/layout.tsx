import type { Metadata, Viewport } from "next";
import { fontVariables } from "../fonts";
import { currentBrand } from "./brand";
import { BrandProvider } from "./BrandProvider";
import { Lifecycle } from "./Lifecycle";
import "./flow.css";

export async function generateMetadata(): Promise<Metadata> {
  const { copy, config } = await currentBrand();
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, title: config.name, statusBarStyle: "default" },
    icons: { apple: `/icons/${config.key}-apple.png`, icon: `/icons/${config.key}-192.png` },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const { config } = await currentBrand();
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: config.themeColor.light },
      { media: "(prefers-color-scheme: dark)", color: config.themeColor.dark },
    ],
  };
}

export default async function FlowLayout({ children }: { children: React.ReactNode }) {
  const { config, voice, copy } = await currentBrand();
  return (
    <div className={`app ${fontVariables}`} data-brand={config.key} data-voice={voice}>
      <BrandProvider value={{ config, voice, copy }}>
        <Lifecycle />
        {children}
      </BrandProvider>
    </div>
  );
}
