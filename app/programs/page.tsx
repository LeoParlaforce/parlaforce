"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProgramsPage() {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [paymentMode, setPaymentMode] = useState<"once" | "installments">("once");
  const [loading, setLoading] = useState(false);

  const LAUNCH_PRICE_EUR = 15000;
  const REGULAR_PRICE_EUR = 19900;
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
      if (data.url) window.location.href = data.url;
      else setLoading(false);
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  };

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(0)}`;

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden selection:bg-blue-600/30 w-full">
      {/* CSS for animated light leaks and film grain */}
      <style jsx global>{`
        @keyframes pulseLeakA {
          0%, 100% { opacity: 0.45; transform: scale(1) translate(0, 0); }
          50% { opacity: 0.7; transform: scale(1.15) translate(20px, -10px); }
        }
        @keyframes pulseLeakB {
          0%, 100% { opacity: 0.35; transform: scale(1.1) translate(0, 0); }
          50% { opacity: 0.55; transform: scale(1) translate(-15px, 10px); }
        }
        @keyframes driftBleed {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(8px) translateY(-6px); }
        }
        @keyframes filmGrain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-2%, 1%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-1%, 2%); }
          60% { transform: translate(-2%, -1%); }
          70% { transform: translate(2%, 1%); }
          80% { transform: translate(-1%, -2%); }
          90% { transform: translate(1%, 2%); }
        }
        .animated-grain {
          animation: filmGrain 1.2s steps(6) infinite;
        }
        .leak-pulse-a { animation: pulseLeakA 9s ease-in-out infinite; }
        .leak-pulse-b { animation: pulseLeakB 11s ease-in-out infinite; }
        .bleed-drift { animation: driftBleed 14s ease-in-out infinite; }
      `}</style>

      {/* Global animated grain - more textured than before */}
      <div
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.07] animated-grain"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heavyGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch' seed='13'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heavyGrain)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-6 md:p-8 flex justify-between items-center border-b border-zinc-900 bg-black/50 backdrop-blur-sm relative z-30">
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
          <div className="bg-blue-600 py-3 relative z-30">
            <p className="text-center text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs italic">
              Launch Week · €150 instead of €199 · Limited time
            </p>
          </div>
        )}

        {/* HERO with horizontal banner image - displayed at native proportions */}
        <section className="relative bg-black">
          {/* Banner container - keeps image at correct aspect ratio without zoom */}
          <div className="relative w-full bg-black flex items-center justify-center overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: "866 / 338" }}>
              <Image
                src="/elite-cover.jpg"
                fill
                priority
                sizes="100vw"
                className="object-contain object-center"
                alt="Elite — Become an Elite Athlete"
              />
              {/* Subtle vignette to blend edges into black */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(0,0,0,0.4) 100%)",
                }}
              />
              {/* Light leak overlays */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen leak-pulse-a"
                style={{
                  background: "radial-gradient(ellipse 400px 300px at 90% 10%, rgba(220, 80, 60, 0.35), transparent 60%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen leak-pulse-b"
                style={{
                  background: "radial-gradient(ellipse 300px 200px at 5% 90%, rgba(80, 60, 220, 0.3), transparent 60%)",
                }}
              />
            </div>
          </div>

          {/* Hero text + buy block below image */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div {...fadeUp}>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-400 mb-6">
                The Elite Protocol · 66 Pages · Lifelong
              </p>
              <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-black uppercase italic tracking-tighter leading-[0.85] mb-8">
                Elite<span className="text-blue-500">.</span>
              </h1>
              <p className="text-zinc-200 italic normal-case text-2xl md:text-3xl mb-6 leading-relaxed">
                The complete training, diet, recovery and psychology protocol for serious strength athletes.
              </p>
              <p className="text-zinc-500 italic normal-case text-base md:text-lg mb-10 leading-relaxed">
                Two programs — full body strength &amp; hypertrophy, and a world-class grip strength method. 66 pages. Built to apply for the rest of your training life.
              </p>
              <div className="border-l-2 border-blue-600 pl-6">
                <p className="text-zinc-300 italic normal-case text-base md:text-lg leading-relaxed">
                  The author progressed more in 8 months applying this guide than in the previous 8 years without it.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
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

              <div className="mb-6">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3">Language</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
                      language === "en" ? "border-blue-600 bg-blue-600/10 text-white" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("fr")}
                    className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${
                      language === "fr" ? "border-blue-600 bg-blue-600/10 text-white" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                    }`}
                  >
                    Français
                  </button>
                </div>
                <p className="text-zinc-600 italic normal-case text-xs mt-3">
                  Both versions included — you can download both.
                </p>
              </div>

              <div className="mb-8">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3">Payment</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMode("once")}
                    className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all border text-left ${
                      paymentMode === "once" ? "border-blue-600 bg-blue-600/10 text-white" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
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
                      paymentMode === "installments" ? "border-blue-600 bg-blue-600/10 text-white" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
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
                className="w-full bg-blue-600 text-white font-black uppercase py-6 px-12 text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                {loading ? "Loading..." : "Acquire Elite →"}
              </button>

              <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest mt-6 text-center">
                Instant Download · Stripe Secure Checkout
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION: BOOK MOCKUP - placed early so users see what they're buying */}
        <section className="relative py-32 md:py-40 bg-black overflow-hidden">
          {/* Smooth color bleed from above (black) into next section's warm tones */}
          <div
            className="absolute inset-0 opacity-40 bleed-drift pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 1000px 700px at 50% 30%, rgba(40, 30, 80, 0.4), transparent 70%), radial-gradient(circle 400px at 15% 80%, rgba(180, 60, 40, 0.15), transparent 60%)",
            }}
          />
          {/* Animated light leak from corner */}
          <div
            className="absolute top-0 right-0 w-[40%] h-[60%] opacity-50 leak-pulse-a pointer-events-none mix-blend-screen"
            style={{
              background: "radial-gradient(ellipse at top right, rgba(150, 80, 200, 0.4), transparent 60%)",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6">
                Not a PDF — a Book
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6">
                66 Pages.<br />
                <span className="text-blue-400">5 Parts.</span>
              </h2>
              <p className="text-zinc-400 italic normal-case text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Foundations · Practical Guidelines · Programming · L'Archange Expurgateur · Le Bras Armé des Dieux
              </p>
            </motion.div>

            {/* Book mockup */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <div className="relative" style={{ perspective: "2400px" }}>
                <div
                  className="relative"
                  style={{
                    transform: "rotateY(-18deg) rotateX(3deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Book front cover - using the actual title page (page 1) image */}
                  <div
                    className="relative w-[300px] md:w-[420px] shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
                    style={{ aspectRatio: "1 / 1.414" }}
                  >
                    <div className="absolute inset-0 bg-black border border-zinc-800 overflow-hidden">
                      <Image
                        src="/elite-cover.jpg"
                        fill
                        sizes="420px"
                        className="object-cover"
                        alt="Elite book cover"
                      />
                      {/* Title overlay to recreate the cover page look */}
                      <div className="absolute inset-0 flex flex-col justify-between py-12 px-6 pointer-events-none">
                        <div className="text-center">
                          <p
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#c8a45c", letterSpacing: "0.15em" }}
                            className="text-3xl md:text-5xl font-normal"
                          >
                            ELITE
                          </p>
                          <div className="w-12 h-px bg-[#c8a45c] mx-auto mt-2" />
                        </div>
                        <p
                          style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#c8a45c" }}
                          className="text-center italic text-xs md:text-sm"
                        >
                          written by Léo Gayrard
                        </p>
                      </div>
                    </div>
                    {/* Glossy reflection */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(110deg, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.4) 100%)",
                      }}
                    />
                  </div>
                  {/* Page edges visible on right */}
                  <div
                    className="absolute right-0 top-1 bottom-1 w-[8px]"
                    style={{
                      transform: "translateX(8px) rotateY(90deg)",
                      background: "repeating-linear-gradient(0deg, #f5f5f0 0px, #f5f5f0 1px, #d8d8d0 1px, #d8d8d0 2px)",
                    }}
                  />
                  {/* Spine shadow */}
                  <div
                    className="absolute -left-2 top-2 bottom-2 w-3"
                    style={{
                      transform: "rotateY(-90deg) translateZ(6px)",
                      background: "linear-gradient(to right, rgba(0,0,0,0.9), transparent)",
                    }}
                  />
                </div>
                {/* Floor shadow */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[280px] md:w-[400px] h-10 rounded-full opacity-70"
                  style={{
                    background: "radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, transparent 70%)",
                    filter: "blur(16px)",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Smooth fade out into next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(60, 25, 18, 0.5))",
            }}
          />
        </section>

        {/* SECTION: THE TRAP — clear & immediate, machine pieces argument front-loaded */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          {/* Base warm gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 1400px 1000px at 50% 50%, #4a1f15 0%, #2a0f08 45%, #0a0505 85%)",
            }}
          />
          {/* Color bleed coming from previous section */}
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent)",
            }}
          />
          {/* Bleeding edge on left like idea_1/idea_4 */}
          <div
            className="absolute top-0 left-0 bottom-0 w-[8%] pointer-events-none bleed-drift"
            style={{
              background: "linear-gradient(to right, rgba(255, 220, 130, 0.35), rgba(220, 100, 60, 0.2), transparent)",
              filter: "blur(2px)",
            }}
          />
          {/* Animated warm light leaks */}
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none leak-pulse-a"
            style={{
              background: "radial-gradient(ellipse 700px 500px at 25% 35%, rgba(220, 100, 60, 0.55), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none leak-pulse-b"
            style={{
              background: "radial-gradient(ellipse 500px 350px at 80% 70%, rgba(180, 60, 40, 0.4), transparent 60%)",
            }}
          />
          {/* Heavy textured grain */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none animated-grain"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='hg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23hg)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-300/80 mb-6">
                Why This Guide Exists
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white">
                A Machine Only Works <br />
                <span className="text-orange-200">When All The Pieces<br />Are From The Same Machine.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/95 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Most athletes fail not because they cannot find good methods. They fail because they assemble pieces of <em>different</em> methods. A diet from one coach. A program from another. A recovery protocol from a third.
              </p>
              <p className="text-white/85 italic normal-case text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                Each piece may be valid in its original system. Bolted together, they cancel each other out. The machine does not run.
              </p>
              <p className="text-white/85 italic normal-case text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                Online you find everything and its opposite. AI has amplified this — it centralizes the consensus, recombines the contradictions, and outputs an averaged answer that fits no one.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-orange-300 pl-6">
                Elite is one machine. Every part — training, diet, recovery, sleep, supplementation, mental work, programming — built from the same internal logic. Take any piece out and the rest still runs.
              </p>
            </motion.div>
          </div>

          {/* Smooth fade into next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(20, 20, 50, 0.6))",
            }}
          />
        </section>

        {/* SECTION: UNIFIED APPROACH - all components */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 1500px 1000px at 50% 50%, #1a1a2e 0%, #0f0f1c 45%, #050510 85%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(60, 25, 18, 0.5), transparent)",
            }}
          />
          {/* Bleeding edge on right side */}
          <div
            className="absolute top-0 right-0 bottom-0 w-[6%] pointer-events-none bleed-drift"
            style={{
              background: "linear-gradient(to left, rgba(120, 100, 220, 0.4), transparent)",
              filter: "blur(3px)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none leak-pulse-a"
            style={{
              background: "radial-gradient(ellipse 600px 400px at 75% 25%, rgba(120, 90, 220, 0.45), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none leak-pulse-b"
            style={{
              background: "radial-gradient(ellipse 700px 500px at 20% 80%, rgba(60, 100, 200, 0.35), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-35 mix-blend-overlay pointer-events-none animated-grain"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='hg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23hg)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300/80 mb-6">
                Everything In One Place
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white">
                Nine Components.<br />
                <span className="text-blue-300">One Coherent System.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">
                Elite covers every domain that affects performance. Each one is treated in depth. Each one is consistent with the others. Nothing is left aside, nothing contradicts.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-12">
                {[
                  "Training",
                  "Diet",
                  "Recovery",
                  "Stretching",
                  "Sleep",
                  "Mental Work",
                  "Supplementation",
                  "Periodization",
                  "Programming",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="border border-blue-400/30 bg-blue-500/5 backdrop-blur-sm py-4 px-3 md:py-5 md:px-4 text-center"
                  >
                    <p className="text-white/90 font-black uppercase italic text-xs md:text-sm tracking-tight">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(35, 15, 55, 0.6))",
            }}
          />
        </section>

        {/* SECTION: ANTI-AI POSITIONING */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 1300px 900px at 30% 50%, #2a1545 0%, #15082a 45%, #050208 85%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(20, 20, 50, 0.6), transparent)",
            }}
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-[10%] pointer-events-none bleed-drift"
            style={{
              background: "linear-gradient(to right, rgba(200, 120, 220, 0.5), rgba(120, 80, 200, 0.3), transparent)",
              filter: "blur(4px)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none leak-pulse-a"
            style={{
              background: "radial-gradient(ellipse 500px 400px at 80% 30%, rgba(180, 100, 220, 0.4), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-35 mix-blend-overlay pointer-events-none animated-grain"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='hg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23hg)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-300/80 mb-6">
                Why €199 In 2026
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white">
                The Generic Programs<br />
                <span className="text-purple-300">Are Free Now.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">
                Anyone can ask an AI for a 12-week program, a macro split, a deload protocol. That world existed at €30 a PDF. That world is over. What is left for sale is what AI cannot deliver.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="border border-white/10 bg-black/40 backdrop-blur-sm p-8">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4">
                    What AI Does
                  </p>
                  <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-4 leading-tight">
                    Recombines Consensus.
                  </p>
                  <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                    Averages out the internet. Repeats what most coaches repeat. Cannot refuse the errors of the field — because it has no position to refuse from.
                  </p>
                </div>

                <div className="border border-purple-400/40 bg-purple-500/10 backdrop-blur-sm p-8">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-300 mb-4">
                    What Elite Does
                  </p>
                  <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-4 leading-tight">
                    Refuses The Errors.
                  </p>
                  <p className="text-white/80 italic normal-case text-base leading-relaxed">
                    Takes positions where most flinch. Names what is wrong in the dominant approaches and proposes a coherent alternative. Built on lived clinical and athletic practice.
                  </p>
                </div>
              </div>

              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-purple-300 pl-6">
                Premium in 2026 means human. Singular. Coherent end to end. Elite is what €199 buys when €30 buys nothing.
              </p>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(50, 35, 20, 0.5))",
            }}
          />
        </section>

        {/* SECTION: LIFELONG / EXPONENTIAL */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 1300px 900px at 50% 50%, #3a2a1a 0%, #1f1410 45%, #0a0606 85%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(35, 15, 55, 0.6), transparent)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none bleed-drift"
            style={{
              background: "radial-gradient(ellipse 1000px 400px at 50% 0%, rgba(220, 180, 130, 0.5), transparent 70%)",
              filter: "blur(2px)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none leak-pulse-b"
            style={{
              background: "radial-gradient(circle 500px at 85% 85%, rgba(180, 100, 60, 0.3), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-35 mix-blend-overlay pointer-events-none animated-grain"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='hg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23hg)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-200/80 mb-6">
                Lifelong · Exponential
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white">
                Not 12 Weeks.<br />
                <span className="text-amber-200">A Method For Life.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Most programs run for a fixed block — 8 weeks, 12 weeks, then they expire. You buy another. The cycle never ends.
              </p>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Elite is built differently. The programs progress with you indefinitely. <span className="text-amber-200 font-medium">The longer you apply it, the more it works.</span> That is the exponential — and that is what being elite means.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-amber-200 pl-6">
                Year one teaches you the structure. Year three reveals layers you missed. Year ten — you are still finding what was always there.
              </p>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 1))",
            }}
          />
        </section>

        {/* SECTION: WHAT'S IN THE GUIDE */}
        <section className="relative py-32 md:py-40 bg-black">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-20">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                What's In The Guide
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-[0.9]">
                The Five Parts<span className="text-blue-600">.</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  num: "Part 1",
                  pages: "pp. 3–14",
                  tag: "The psychological work",
                  title: "Foundations",
                  body: "The mental architecture that separates elite athletes from very good ones. The unconscious mechanisms — the superego, the inner enemy, the indomitable desire — that bridle most people from realizing their potential.",
                },
                {
                  num: "Part 2",
                  pages: "pp. 15–42",
                  tag: "Daily protocols",
                  title: "Practical Guidelines",
                  body: "Diet, sleep, recovery, supplementation, blood work. Exact macros, exact timing, exact protocols. Every food and every supplement justified by mechanism.",
                },
                {
                  num: "Part 3",
                  pages: "pp. 43–59",
                  tag: "How to read, use, adapt",
                  title: "Programming",
                  body: "How to use the programs across years. Strength vs hypertrophy. The minimum effective. Volume and intensity as capacities. When to deload, peak, and handle injuries.",
                },
                {
                  num: "Part 4",
                  pages: "pp. 60–63",
                  tag: "Full body",
                  title: "L'Archange Expurgateur",
                  body: "The full body strength and hypertrophy program. 4 sessions per week. Configurable for hypertrophy, strength, or both.",
                },
                {
                  num: "Part 5",
                  pages: "pp. 64–66",
                  tag: "Specialized grip",
                  title: "Le Bras Armé des Dieux",
                  body: "The world-class grip strength program. Dynamic grip training approach found nowhere else.",
                },
              ].map((part, i) => (
                <motion.div
                  key={part.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-zinc-900 bg-zinc-950/30 hover:border-zinc-800 transition-all p-8 md:p-12"
                >
                  <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600">
                      {part.num} · {part.pages}
                    </p>
                    <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">
                      {part.tag}
                    </p>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                    {part.title}
                  </h3>
                  <p className="text-zinc-400 italic normal-case text-base md:text-lg leading-relaxed">
                    {part.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: GRIP - WHY IT MATTERS FOR EVERYONE */}
        <section className="relative py-32 md:py-40 bg-black overflow-hidden">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(ellipse 1200px 800px at 50% 30%, rgba(30, 60, 180, 0.2), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen pointer-events-none leak-pulse-a"
            style={{
              background: "radial-gradient(circle 400px at 90% 80%, rgba(80, 100, 200, 0.25), transparent 60%)",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6">
                Le Bras Armé des Dieux · World-Class & Unique
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">
                Grip Is Not <br />
                <span className="text-blue-400">A Specialization.</span>
              </h2>
              <p className="text-zinc-400 italic normal-case text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                It is the first link of every chain you train. And it is what holds back almost every athlete without them knowing it.
              </p>
            </motion.div>

            {/* The chain argument */}
            <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="max-w-4xl mx-auto mb-16">
              <div className="border border-zinc-900 bg-zinc-950/40 p-8 md:p-12">
                <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-8 leading-tight text-white">
                  The Body Is A Chain<span className="text-blue-400">.</span><br />
                  <span className="text-zinc-400">As Strong As Its Weakest Link.</span>
                </h3>
                <p className="text-zinc-300 italic normal-case text-lg md:text-xl leading-relaxed mb-6">
                  Most athletes are bridled by their grip without knowing it. The signs are everywhere — and they always blame the wrong cause.
                </p>
                <ul className="space-y-4 text-zinc-300 italic normal-case text-base md:text-lg mb-8">
                  <li className="flex"><span className="text-blue-400 mr-3 shrink-0 font-black">·</span>
                    <span>Your <strong className="text-white not-italic">bench press or overhead press</strong> stops short — and you wear wrist wraps to mask it. The truth: your wrists, your grip, your elbows are weak. The press cannot express what your chest and shoulders could deliver.</span>
                  </li>
                  <li className="flex"><span className="text-blue-400 mr-3 shrink-0 font-black">·</span>
                    <span>Your <strong className="text-white not-italic">deadlift</strong> stops because the bar slips before your back is tired. You blame your back. It is your hands.</span>
                  </li>
                  <li className="flex"><span className="text-blue-400 mr-3 shrink-0 font-black">·</span>
                    <span>Your <strong className="text-white not-italic">pull-ups</strong> end before your lats are spent. You think it is conditioning. It is forearms.</span>
                  </li>
                  <li className="flex"><span className="text-blue-400 mr-3 shrink-0 font-black">·</span>
                    <span>Your <strong className="text-white not-italic">rows</strong> never connect properly to the back. You think it is technique. It is grip transmission.</span>
                  </li>
                </ul>
                <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium border-l-2 border-blue-400 pl-6">
                  Train the first link — the rest of the body unlocks. When grip becomes strong, the progress on every other lift explodes. That is why this program belongs to everyone, not just specialists.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                  Program 1 — Full Body
                </p>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                  L'Archange Expurgateur
                </h3>
                <p className="text-zinc-300 italic normal-case text-lg leading-relaxed mb-6">
                  Full-body hypertrophy and strength. 4 sessions per week. Configurable for hypertrophy, strength, or both. Lifelong progression.
                </p>
                <p className="text-zinc-500 italic normal-case text-base leading-relaxed">
                  The complete program for the entire body. Nothing left aside. You will train on it for years.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="border border-blue-600/40 bg-blue-600/5 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4">
                  Program 2 — World-Class Grip
                </p>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                  Le Bras Armé des Dieux
                </h3>
                <p className="text-white italic normal-case text-lg leading-relaxed mb-6">
                  A <strong className="text-blue-300 not-italic">dynamic grip training</strong> approach found nowhere else. Unique in the world. At the cutting edge of grip programming and methodology.
                </p>
                <p className="text-zinc-300 italic normal-case text-base leading-relaxed">
                  Forearm hypertrophy, finger strength, wrist resilience, thumb strength. International-level results.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION: FOR WHOM */}
        <section className="relative py-32 md:py-40 bg-black border-y border-zinc-900">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                For Whom
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
                Serious Athletes<span className="text-blue-600">.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
              <p className="text-zinc-400 italic normal-case text-xl md:text-2xl leading-relaxed text-center max-w-3xl mx-auto mb-16">
                Powerlifters. Strongmen. Climbers. Arm wrestlers. Martial artists. Fighters. Bodybuilders. Anyone who trains for real and wants to break past their current ceiling.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                    If You Are
                  </p>
                  <ul className="space-y-4 text-zinc-400 italic normal-case text-lg">
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> Already training hard but stuck below your potential</li>
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> A serious athlete in any strength or grip-dependent sport</li>
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> Tired of generic templates and motivational content</li>
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> Willing to put in the actual work</li>
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> Interested in the psychological side of performance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                    If You Want
                  </p>
                  <ul className="space-y-4 text-zinc-400 italic normal-case text-lg">
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> Real progression — not motivation</li>
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> Both psychology and physiology addressed seriously</li>
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> A unified system, not a patchwork</li>
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> No AI — actual human, lived work</li>
                    <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> A document you will return to for the rest of your training life</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION: WHO WROTE IT */}
        <section className="relative py-32 md:py-40 bg-black">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                Who Wrote It
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">
                Two Disciplines<span className="text-blue-600">.</span><br />
                One Practice.
              </h2>
              <p className="text-zinc-400 italic normal-case text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                This guide is not a synthesis of internet content. It is the convergence of two parallel disciplines, both pursued seriously, both fully integrated.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                  Clinical Side
                </p>
                <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6 leading-tight">
                  6 years university · 8 years private practice · ~200 patients
                </p>
                <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                  Master in clinical psychology. Lacanian psychoanalyst. Years of work on desire, the superego, what stops people from realizing their potential — applied directly to the psychology of performance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                  Athletic Side
                </p>
                <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6 leading-tight">
                  9 years strength sport &amp; martial arts · training, diet, recovery
                </p>
                <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                  Strength training, programming, periodization, nutrition science, recovery protocols, grip specialization. The author progressed more in 8 months on this method than in the previous 8 years without it.
                </p>
              </motion.div>
            </div>

            <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <div className="border border-blue-600/30 bg-blue-600/5 p-8 md:p-12 text-center">
                <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed">
                  Elite is what happens when these two trainings meet. The body and the psyche are not two separate domains — they meet in the speaking subject. This guide treats them as one.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-32 md:py-40 bg-black">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp}>
              <div className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-20 text-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none leak-pulse-a"
                  style={{
                    background: "radial-gradient(circle 400px at 50% 50%, rgba(37, 99, 235, 0.4), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                    Ready
                  </p>
                  <h3 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
                    Stop Guessing<span className="text-blue-600">.</span>
                  </h3>
                  <p className="text-zinc-500 italic max-w-xl mx-auto normal-case text-base md:text-lg mb-8">
                    The bar responds to what you actually do with it.
                  </p>
                  <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest mb-12">
                    Lifelong · Unified · Zero AI
                  </p>

                  <div className="flex items-baseline justify-center gap-4 mb-10">
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
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
