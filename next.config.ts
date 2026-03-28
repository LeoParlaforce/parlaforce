import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // OPTIMISATION DES IMAGES
  images: {
    formats: ['image/avif', 'image/webp'], // Force les formats légers pour le SEO
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // SEO & SÉCURITÉ : Compression Gzip/Brotli automatique
  compress: true,

  // NETTOYAGE : Enlève le header "X-Powered-By: Next.js" pour la discrétion (Architect style)
  poweredByHeader: false,
};

export default nextConfig;