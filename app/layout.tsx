// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import BackgroundFX from "@/components/BackgroundFX";

export const metadata: Metadata = {
  title: "Par la Force",
  description: "Guides & séances",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh relative overflow-x-hidden antialiased">
        {/* fond fixe */}
        <div className="fixed inset-0 -z-20 bg-static" />
        {/* voile lisibilité */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-black/30" />
        {/* FX vivants */}
        <BackgroundFX />
        {children}
      </body>
    </html>
  );
}
