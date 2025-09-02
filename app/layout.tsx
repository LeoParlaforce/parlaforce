import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Par la Force",
  description: "Guides et programmes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-neutral-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
