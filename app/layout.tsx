import "./globals.css";
import Footer from "../components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Important pour l'accessibilité tout en restant contrôlé
}

export const metadata = {
  metadataBase: new URL('https://parlaforce.com'),
  title: {
    default: "Par la force | Athletic Intelligence & Performance Architecture",
    template: "%s | Par la force"
  },
  description: "Evidence-based training systems, sports science, and psychological insights for elite performance. Designed for the structural reorganization of human potential.",
  keywords: ["performance architecture", "sports science", "clinical strength", "psychological dominance", "athletic intelligence", "elite training protocols"],
  authors: [{ name: "Leo Gayrard" }],
  creator: "Leo Gayrard",
  openGraph: {
    title: "Par la force | Clinical Strength Architecture",
    description: "Human-led protocols for physical and psychological dominance. No AI content.",
    url: 'https://parlaforce.com',
    siteName: 'Par la force',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ParlaForce - Clinical Strength Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Par la force | Athletic Intelligence',
    description: 'Evidence-based training systems for elite performance.',
    creator: '@par_la_force',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://parlaforce.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://parlaforce.com/#organization",
        "name": "Par la force",
        "url": "https://parlaforce.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://parlaforce.com/logo.png",
          "width": 112,
          "height": 112
        },
        "sameAs": [
          "https://www.instagram.com/par_la_force/",
          "https://www.youtube.com/@ParLaForce",
          "https://thirdpath.cloud"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://parlaforce.com/#website",
        "url": "https://parlaforce.com",
        "name": "Par la force",
        "publisher": { "@id": "https://parlaforce.com/#organization" },
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": "https://parlaforce.com/#author",
        "name": "Leo Gayrard",
        "jobTitle": "Licensed Psychologist & Strength Athlete",
        "url": "https://parlaforce.com",
        "knowsAbout": ["Psychology", "Strength Training", "Human Performance", "Biomechanics"]
      },
      {
        "@type": "Service",
        "name": "Clinical Strength Architecture",
        "provider": { "@id": "https://parlaforce.com/#organization" },
        "description": "Evidence-based training systems and psychological protocols for elite athletes.",
        "offers": {
          "@type": "Offer",
          "category": "Performance Protocols"
        }
      }
    ]
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-black text-zinc-300 antialiased font-sans flex flex-col min-h-screen overflow-x-hidden w-full relative">
        
        {/* LE GRAIN NUMÉRIQUE (SVG) - OPTIMISÉ */}
        <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.18] mix-blend-soft-light" aria-hidden="true">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.60" 
                numOctaves="3" 
                stitchTiles="stitch" 
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <main className="flex-grow relative z-10">
          {children}
        </main>
        
        <div className="relative z-10">
          <Footer />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <GoogleAnalytics gaId="G-YR024XZRG5" />
      </body>
    </html>
  );
}