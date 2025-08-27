// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Par la Force",
  description: "Guides & séances",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh relative overflow-x-hidden antialiased">
        {/* BG animé */}
        <div className="fixed inset-0 -z-20 bg-animated" />

        {/* Voile sombre léger pour lisibilité */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-black/30" />

        {/* Disques additionnels (overlay) */}
        <img
          src="/plate-left.png"
          alt=""
          className="hidden md:block fixed bottom-6 left-8 w-40 opacity-90 plates pointer-events-none -z-10"
        />
        <img
          src="/plate-right.png"
          alt=""
          className="hidden md:block fixed bottom-8 right-10 w-44 opacity-90 plates pointer-events-none -z-10"
        />

        {children}
      </body>
    </html>
  );
}
