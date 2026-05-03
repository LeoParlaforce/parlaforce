"use client";

import Link from 'next/link'
import { useState } from 'react'
import RandomTexture from '@/components/RandomTexture'

export default function SupervisionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does the supervision work?",
      a: "You gain access to a private, encrypted channel directly with the Architect. We analyze your training footage, physiological markers, and psychological state daily to adjust your protocols in real-time."
    },
    {
      q: "Is this an AI coaching app?",
      a: "Absolutely not. This is 100% human-led. You are communicating with a specialized Clinical Psychologist. No algorithms determine your progress—only clinical expertise and sports science."
    },
    {
      q: "Who is this for?",
      a: "Intermediate athletes looking to reach world-class performance. We solve the complex plateaus where standard programming fails by addressing the psychological and structural inhibitors."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "ParlaForce Supervision Interface",
    "alternateName": "Troisième Chemin",
    "description": "Direct human-led supervision for elite strength athletes. Clinical psychology, biomechanics, and indomitable will architecture.",
    "url": "https://parlaforce.com/supervision",
    "logo": "https://parlaforce.com/logo.png",
    "provider": {
      "@type": "LocalBusiness",
      "name": "ParlaForce",
      "priceRange": "$$$"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Performance Supervision",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Psychological & Physical Architecture"
          }
        }
      ]
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-6 bg-black font-sans lowercase relative overflow-x-hidden text-white w-full">
      
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />

      {/* Random texture */}
      <div className="pointer-events-none fixed inset-0 z-[0] opacity-10">
        <RandomTexture />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[0]"
        style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.60) 100%)" }}
      />
      
      {/* Cinematic grain */}
      <div 
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.04]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")` }}
      />

      {/* Back nav */}
      <div className="absolute top-12 left-0 right-0 flex justify-center z-[110]">
        <Link 
          href="/" 
          className="text-zinc-500 hover:text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] transition-all py-4 px-8 inline-block"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-4xl w-full relative z-10 py-32 text-center">
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-12 italic">
          Supervision <span className="text-blue-600">Interface.</span>
        </h1>

        <div className="space-y-16 max-w-2xl mx-auto">
          
          <div className="border-l border-blue-600 pl-6 text-left">
            <h2 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              The Protocol
            </h2>
            <p className="text-zinc-400 text-lg italic leading-relaxed">
              Direct encrypted chat interface with a specialized Clinical Psychologist focused on strength sports. We monitor the biological and psychological variables that dictate performance.
            </p>
          </div>

          <div className="py-4">
            <a 
              href="https://chat.troisiemechemin.fr" 
              className="inline-block bg-white text-black font-black uppercase py-6 px-12 hover:bg-blue-600 hover:text-white transition-all text-sm tracking-widest w-full md:w-auto"
            >
              Start Conversation
            </a>
            <p className="mt-4 text-zinc-800 text-[9px] uppercase font-black tracking-widest opacity-50">
              Direct human supervision // No AI interference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">Active Monitoring</span>
              <p className="text-zinc-400 text-sm leading-relaxed italic">
                Daily oversight of training variables, nutritional kinetics, and recovery patterns. No guesswork.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">Indomitable Will</span>
              <p className="text-zinc-400 text-sm leading-relaxed italic">
                Addressing the internal logic and stress management required to push intermediate athletes to world-class standards.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <section className="pt-16 border-t border-zinc-900 text-left">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 font-sans">
              System FAQ
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-zinc-900 bg-zinc-950/30">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 flex justify-between items-center text-left hover:bg-zinc-900 transition-colors"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">{faq.q}</span>
                    <span className="text-blue-600 font-black">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className="p-4 pt-0 text-sm text-zinc-400 italic leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className="pt-12 border-t border-zinc-900 text-zinc-800 text-[9px] uppercase font-black tracking-widest opacity-30">
            System v2.0.26 // Built for High-Output Systems
          </div>

        </div>
      </div>

    </main>
  )
}
