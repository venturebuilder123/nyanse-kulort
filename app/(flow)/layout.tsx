import type { Metadata, Viewport } from "next";
import { fontVariables } from "../fonts";
import { currentBrand } from "./brand";
import { BrandProvider } from "./BrandProvider";
import "./flow.css";

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await currentBrand();
  return { title: copy.meta.title, description: copy.meta.description };
}

export async function generateViewport(): Promise<Viewport> {
  const { config } = await currentBrand();
  return { themeColor: config.themeColor };
}

export default async function FlowLayout({ children }: { children: React.ReactNode }) {
  const { config, voice, copy } = await currentBrand();
  return (
    <div className={`app ${fontVariables}`} data-brand={config.key} data-voice={voice}>
      <BrandProvider value={{ config, voice, copy }}>{children}</BrandProvider>
    </div>
  );
}
