// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Par la Force",
  description: "Guides & séances",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh relative overflow-x-hidden antialiased">
        {/* Background plein écran, fixe, derrière tout le reste */}
        <div aria-hidden className="fixed inset-0 -z-10">
          <Image
            src="/background.jpg"   // 👈 ici c’était .webp par erreur
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <main className="relative z-0">{children}</main>
      </body>
    </html>
  );
}
