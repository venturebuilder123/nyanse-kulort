import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab · NYANSE · KULØRT",
  robots: { index: false, follow: false },
};

export default function LabRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
