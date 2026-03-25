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
  openGraph: {
    title: "Par la force | Athletic Intelligence",
    description: "Evidence-based training systems by Leo Gayrard.",
    url: 'https://parlaforce.com',
    siteName: 'Par la force',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  // La balise canonique empêche le contenu dupliqué
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-zinc-300 antialiased font-sans flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />

        {/* Google Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Par la force",
              "url": "https://parlaforce.com",
              "logo": "https://parlaforce.com/logo.png",
              "founder": {
                "@type": "Person",
                "name": "Leo Gayrard",
                "jobTitle": "Licensed Psychologist & Strength Athlete",
                "sameAs": [
                  "https://www.instagram.com/par_la_force/",
                  "https://www.youtube.com/@ParLaForce",
                  "https://thirdpath.cloud"
                ]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1184 route de la Maurette",
                "addressLocality": "Roquebrune-sur-Argens",
                "postalCode": "83520",
                "addressCountry": "FR"
              }
            })
          }}
        />

        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}