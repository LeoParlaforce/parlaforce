// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import BackgroundSparkles from "@/components/BackgroundSparkles";

export const metadata: Metadata = {
  title: "Par la Force",
  description: "Guides & séances",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh relative overflow-x-hidden antialiased">
        {/* Fond fixe (pas de zoom) */}
        <div className="fixed inset-0 -z-20 bg-static" />
        {/* Légère couche sombre pour la lisibilité */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-black/28" />
        {/* Étincelles légères */}
        <BackgroundSparkles />
        {children}
      </body>
    </html>
  );
}
