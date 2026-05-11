"use client";

import Link from "next/link";
import { useState } from "react";
import RandomTexture from "@/components/RandomTexture";

export default function SupervisionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState<"reduced" | "full" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (tier: "reduced" | "full") => {
    setLoading(tier);
    setError(null);
    try {
      const locale =
        typeof navigator !== "undefined" ? navigator.language : "en";
      const res = await fetch("/api/supervision-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(null);
      }
    } catch (e) {
      setError("Network error. Please try again.");
      setLoading(null);
    }
  };

  const faqs = [
    {
      q: "How does the supervision work?",
      a: "After subscribing, you receive a private Signal contact by email. Signal is an end-to-end encrypted messaging app. You write whenever you need to — about training, performance plateaus, competition preparation, or the psychological dimensions of your practice. I respond as a clinical psychologist with a specific orientation around strength sport and the inner work it demands.",
    },
    {
      q: "Why chat only? Why no calls or video sessions?",
      a: "This is a deliberate choice, not a limitation. A weekly 45-minute slot forces you to improvise in real time. Writing lets you formulate what matters when it matters — and the act of putting things into words is itself part of the work. You also keep a written trace of everything, which a live session never gives you.",
    },
    {
      q: "Is this an AI app?",
      a: "Absolutely not. You are writing with a licensed clinical psychologist. No algorithms, no automated replies, no scripts.",
    },
    {
      q: "Who is this for?",
      a: "Strength athletes hitting plateaus or preparing for competition. Therapists in private practice looking for supervision. Anyone who wants serious engagement with the psychological structure underneath their training, their work, or their daily life.",
    },
    {
      q: "Why two prices for the same service?",
      a: "The service is identical. The two prices simply let people choose what fits their situation. No verification, no questions asked.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancellation is one click from your Stripe receipt email. No commitment, no minimum term.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ParlaForce Supervision",
    alternateName: "Troisième Chemin",
    description:
      "Private encrypted chat with a clinical psychologist specialized in strength sport. Direct human supervision, asynchronous format.",
    url: "https://parlaforce.com/supervision",
    logo: "https://parlaforce.com/logo.png",
    provider: {
      "@type": "LocalBusiness",
      name: "ParlaForce",
      priceRange: "$$",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Reduced Rate",
        price: "80",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "80",
          priceCurrency: "EUR",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
      },
      {
        "@type": "Offer",
        name: "Full Rate",
        price: "150",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "150",
          priceCurrency: "EUR",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
      },
    ],
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-6 bg-black font-sans lowercase relative overflow-x-hidden text-white w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none fixed inset-0 z-[0] opacity-10">
        <RandomTexture />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[0]"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.60) 100%)",
        }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")`,
        }}
      />

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
              Direct encrypted chat with a clinical psychologist specialized in
              strength sport. Asynchronous by design — you write when it
              matters, not when a calendar slot says so. Delivered through
              Signal.
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] text-center">
              Monthly Subscription // Cancel Anytime
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-zinc-900 bg-zinc-950/30 p-8 flex flex-col">
                <div className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em] mb-4">
                  Reduced Rate
                </div>
                <div className="text-5xl font-black mb-2 italic">€80</div>
                <div className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-8">
                  per month
                </div>
                <button
                  onClick={() => handleSubscribe("reduced")}
                  disabled={loading !== null}
                  className="mt-auto bg-zinc-100 text-black font-black uppercase py-4 px-6 hover:bg-blue-600 hover:text-white transition-all text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === "reduced" ? "Opening…" : "Subscribe"}
                </button>
              </div>

              <div className="border border-blue-600 bg-zinc-950/30 p-8 flex flex-col">
                <div className="text-blue-600 text-[9px] font-black uppercase tracking-[0.4em] mb-4">
                  Full Rate
                </div>
                <div className="text-5xl font-black mb-2 italic">€150</div>
                <div className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-8">
                  per month
                </div>
                <button
                  onClick={() => handleSubscribe("full")}
                  disabled={loading !== null}
                  className="mt-auto bg-white text-black font-black uppercase py-4 px-6 hover:bg-blue-600 hover:text-white transition-all text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === "full" ? "Opening…" : "Subscribe"}
                </button>
              </div>
            </div>

            <p className="text-zinc-600 text-[10px] leading-relaxed text-center italic max-w-md mx-auto">
              The service is identical at both prices. Choose what fits your
              situation.
            </p>

            {error && (
              <p className="text-red-500 text-xs text-center italic">{error}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-8">
            <div className="space-y-4">
              <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">
                Asynchronous by Design
              </span>
              <p className="text-zinc-400 text-sm leading-relaxed italic">
                No 45-minute weekly slot to improvise in. You write when
                something is alive — training, competition, work, life — and
                the act of writing is itself part of the work.
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">
                Encrypted, Human, Direct
              </span>
              <p className="text-zinc-400 text-sm leading-relaxed italic">
                Signal — end-to-end encrypted. No algorithm, no scripts, no
                automated replies. A clinical psychologist on the other end of
                every message.
              </p>
            </div>
          </div>

          <section className="pt-16 border-t border-zinc-900 text-left">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 font-sans">
              System FAQ
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-zinc-900 bg-zinc-950/30"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    className="w-full p-4 flex justify-between items-center text-left hover:bg-zinc-900 transition-colors"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                      {faq.q}
                    </span>
                    <span className="text-blue-600 font-black">
                      {openFaq === index ? "−" : "+"}
                    </span>
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
            System v2.1.0 // Delivered via Signal // Billed via Stripe
          </div>
        </div>
      </div>
    </main>
  );
}
