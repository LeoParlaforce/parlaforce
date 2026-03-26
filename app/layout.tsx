import "./globals.css";
import Footer from "../components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  metadataBase: new URL('https://parlaforce.com'),
  title: {
    default: "Par la force | Athletic Intelligence",
    template: "%s | Par la force"
  },
  description: "Evidence-based training systems, sports science, and psychological insights for elite performance.",
  keywords: ["performance", "sports science", "psychology", "strength training", "protocols"],
  authors: [{ name: "Leo Gayrard" }],
  creator: "Leo Gayrard",
  openGraph: {
    title: "Par la force | Athletic Intelligence",
    description: "Evidence-based training systems for elite performance.",
    url: 'https://parlaforce.com',
    siteName: 'Par la force',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // Assurez-vous d'avoir cette image dans /public
        width: 1200,
        height: 630,
        alt: 'ParlaForce - Clinical Strength Architecture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Par la force | Athletic Intelligence',
    description: 'Evidence-based training systems.',
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
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1184 route de la Maurette",
          "addressLocality": "Roquebrune-sur-Argens",
          "postalCode": "83520",
          "addressCountry": "FR"
        }
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
        "image": "https://parlaforce.com/leo-gayrard.jpg", // Image de profil recommandée
        "knowsAbout": ["Psychology", "Strength Training", "Human Performance", "Biology"],
        "sameAs": [
          "https://www.instagram.com/par_la_force/"
        ]
      }
    ]
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="bg-black text-zinc-300 antialiased font-sans flex flex-col min-h-screen overflow-x-hidden w-full relative">
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}