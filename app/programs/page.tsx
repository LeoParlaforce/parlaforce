"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProgramsPage() {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [paymentMode, setPaymentMode] = useState<"once" | "installments">("once");
  const [loading, setLoading] = useState(false);

  // Launch week pricing
  const LAUNCH_PRICE_EUR = 15000; // 150€ in cents
  const REGULAR_PRICE_EUR = 19900; // 199€ in cents

  // Set this to false after launch week
  const IS_LAUNCH_WEEK = true;
  const currentPrice = IS_LAUNCH_WEEK ? LAUNCH_PRICE_EUR : REGULAR_PRICE_EUR;
  const installmentAmount = Math.ceil(currentPrice / 3);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Elite — Become an Elite Athlete",
          priceAmount: currentPrice,
          currency: "eur",
          pdfFile: "elite",
          language,
          paymentMode,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  };

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(0)}`;

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden selection:bg-blue-600/30 w-full">
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] md:opacity-[0.02] bg-repeat"
        aria-hidden="true"
        style={{ backgroundImage: "url('/grain.png')", backgroundSize: "200px" }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-6 md:p-8 flex justify-between items-center border-b border-zinc-900 mb-12 bg-black/50 backdrop-blur-sm">
          <Link
            href="/"
            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-zinc-500 hover:text-blue-600 transition-all italic"
          >
            ← Home
          </Link>
          <Link
            href="/articles"
            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-zinc-500 hover:text-blue-600 transition-all italic"
          >
            Articles →
          </Link>
        </nav>

        {/* Launch banner */}
        {IS_LAUNCH_WEEK && (
          <div className="bg-blue-600 py-3 mb-12 -mt-12">
            <p className="text-center text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs italic">
              Launch Week — €150 instead of €199. Limited time.
            </p>
          </div>
        )}

        {/* Hero with cover image */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
          <div className="relative h-[60vh] lg:h-[80vh] border border-zinc-900 bg-zinc-950 overflow-hidden">
            <Image
              src="/elite-cover.jpg"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              alt="Elite — Become an Elite Athlete"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              The Elite Protocol
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-[0.85]">
              Elite<span className="text-blue-600">.</span>
            </h1>
            <p className="text-zinc-400 italic normal-case text-xl md:text-2xl mb-10 leading-relaxed">
              The complete protocol to reach your maximum athletic potential. Not a generic program. Not motivational content. The actual psychological and physical work that turns serious athletes into elite ones.
            </p>

            <div className="flex items-baseline gap-4 mb-10">
              {IS_LAUNCH_WEEK && (
                <span className="text-zinc-600 line-through text-2xl md:text-3xl font-black italic">
                  {formatPrice(REGULAR_PRICE_EUR)}
                </span>
              )}
              <span className="text-white text-5xl md:text-6xl font-black italic">
                {formatPrice(currentPrice)}
              </span>
              {IS_LAUNCH_WEEK && (
                <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] italic">
                  Launch Week
                </span>
              )}
            </div>

            {/* Language selector */}
            <div className="mb-6">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3">
                Language
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setLanguage("en")}
                  className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
                    language === "en"
                      ? "border-blue-600 bg-blue-600/10 text-white"
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("fr")}
                  className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
                    language === "fr"
                      ? "border-blue-600 bg-blue-600/10 text-white"
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                  }`}
                >
                  Français
                </button>
              </div>
              <p className="text-zinc-600 italic normal-case text-xs mt-3">
                Both versions included with your purchase. You can download both.
              </p>
            </div>

            {/* Payment mode */}
            <div className="mb-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3">
                Payment
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMode("once")}
                  className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all border text-left ${
                    paymentMode === "once"
                      ? "border-blue-600 bg-blue-600/10 text-white"
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                  }`}
                >
                  <span className="block">Once</span>
                  <span className="block text-zinc-400 normal-case italic mt-1 text-xs tracking-normal">
                    {formatPrice(currentPrice)}
                  </span>
                </button>
                <button
                  onClick={() => setPaymentMode("installments")}
                  className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all border text-left ${
                    paymentMode === "installments"
                      ? "border-blue-600 bg-blue-600/10 text-white"
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                  }`}
                >
                  <span className="block">3 × Monthly</span>
                  <span className="block text-zinc-400 normal-case italic mt-1 text-xs tracking-normal">
                    {formatPrice(installmentAmount)} × 3
                  </span>
                </button>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-blue-600 text-white font-black uppercase py-6 px-12 text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
            >
              {loading ? "Loading..." : "Buy Now →"}
            </button>

            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest mt-6 text-center">
              Instant Download · Stripe Secure Checkout
            </p>
          </div>
        </section>

        {/* What's inside */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              What's Inside
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              60+ Pages of Real Work<span className="text-blue-600">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
                Part 1
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">
                The Psychological Work
              </h3>
              <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                The mental processes that separate elite athletes from very good ones. What it actually takes to believe in your work without overdoing or underdoing it. The internal structure that makes world-class performance possible.
              </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
                Part 2
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">
                Diet, Sleep, Recovery
              </h3>
              <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                Precise guidelines on nutrition, sleep, and recovery. Principles explained, then applied. No vague "listen to your body" — actual numbers, actual structure, actual decisions.
              </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
                Program 1
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">
                L'Archange Expurgateur
              </h3>
              <p className="text-zinc-400 italic normal-case text-base leading-relaxed mb-4">
                Full-body training, 4 sessions per week. Configurable for hypertrophy, strength, or a mix of both. Built on top sets, back-offs, and progressive overload that actually progresses.
              </p>
              <p className="text-zinc-600 italic normal-case text-sm">
                For: hypertrophy, strength, body recomposition.
              </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
                Program 2
              </p>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">
                Le Bras Armé des Dieux
              </h3>
              <p className="text-zinc-400 italic normal-case text-base leading-relaxed mb-4">
                Specialized grip strength program. Devastating for armlifting, climbing, armwrestling, strongman, powerlifting, and serious forearm hypertrophy.
              </p>
              <p className="text-zinc-600 italic normal-case text-sm">
                For: grip athletes, climbers, strength athletes who need more from their hands.
              </p>
            </div>
          </div>

          <div className="border border-blue-600/30 bg-blue-600/5 p-8 md:p-12 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              The Premise
            </p>
            <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              People think only superhumans can become world-class. They're wrong. The difference is psychological — and it can be worked on. Elite is the protocol for that work.
            </p>
          </div>
        </section>

        {/* For who */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              For Whom
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
              Serious Athletes Only<span className="text-blue-600">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                If You Are
              </p>
              <ul className="space-y-3 text-zinc-400 italic normal-case text-lg">
                <li>— Already training hard but stuck below your potential</li>
                <li>— A strength athlete looking to specialize grip</li>
                <li>— Tired of generic templates</li>
                <li>— Willing to put in the actual work</li>
              </ul>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                If You Want
              </p>
              <ul className="space-y-3 text-zinc-400 italic normal-case text-lg">
                <li>— Real progression, not motivational content</li>
                <li>— Both psychology and physiology addressed</li>
                <li>— Programs designed for long-term progress</li>
                <li>— No AI, no template — actual clinical-quality work</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-20 text-center relative overflow-hidden">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              Ready
            </p>
            <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
              Stop Guessing. Start Moving<span className="text-blue-600">.</span>
            </h3>
            <p className="text-zinc-500 italic max-w-xl mx-auto normal-case text-base md:text-lg mb-12">
              The bar responds to what you actually do with it.
            </p>

            <div className="flex items-baseline justify-center gap-4 mb-8">
              {IS_LAUNCH_WEEK && (
                <span className="text-zinc-600 line-through text-xl font-black italic">
                  {formatPrice(REGULAR_PRICE_EUR)}
                </span>
              )}
              <span className="text-white text-4xl md:text-5xl font-black italic">
                {formatPrice(currentPrice)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-blue-600 text-white font-black uppercase py-5 px-10 text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Elite →"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
