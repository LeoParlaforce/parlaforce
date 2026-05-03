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

  // Reusable scroll-triggered fade-up animation
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden selection:bg-blue-600/30 w-full">
      {/* Global grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")`,
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

        {/* HERO with horizontal banner image */}
        <section className="relative">
          {/* Cinematic banner image */}
          <div className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden">
            <Image
              src="/elite-cover.jpg"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              alt="Elite — Become an Elite Athlete"
            />
            {/* Overlays for cinematic feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

            {/* Light leak overlay */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 800px 600px at 85% 10%, rgba(220, 80, 60, 0.4), transparent 50%), radial-gradient(ellipse 600px 400px at 5% 90%, rgba(80, 60, 220, 0.3), transparent 50%)",
              }}
            />

            {/* Hero content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-7xl mx-auto w-full"
              >
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-400 mb-4 drop-shadow-lg">
                  The Elite Protocol · 66 Pages · Lifelong
                </p>
                <h1 className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-black uppercase italic tracking-tighter leading-[0.85] drop-shadow-2xl">
                  Elite<span className="text-blue-500">.</span>
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Hero text + buy block below image */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div {...fadeUp}>
              <p className="text-zinc-300 italic normal-case text-2xl md:text-3xl mb-8 leading-relaxed">
                The complete protocol to reach your maximum athletic potential.
              </p>
              <p className="text-zinc-500 italic normal-case text-base md:text-lg mb-10 leading-relaxed">
                Most people think only superhumans become world-class. They are wrong. The difference is psychological — and it can be worked on.
              </p>
              <div className="border-l-2 border-blue-600 pl-6">
                <p className="text-zinc-400 italic normal-case text-base md:text-lg leading-relaxed">
                  The author progressed more in 8 months applying this guide than in the previous 8 years without it.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
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

        {/* SECTION: THE TRAP — organic background (warm/orange like idea_1) */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: "radial-gradient(ellipse 1200px 800px at 50% 50%, #4a1f15 0%, #2a0f08 40%, #0a0505 80%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-50 mix-blend-screen"
            style={{
              background: "radial-gradient(circle 600px at 20% 30%, rgba(220, 100, 60, 0.5), transparent 60%), radial-gradient(circle 400px at 80% 70%, rgba(180, 60, 40, 0.4), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heavyGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heavyGrain)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-300/70 mb-6">
                The Modern Trap
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white">
                Online You Find Everything <br />
                <span className="text-orange-200">And Its Opposite</span>.
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Eat 6 meals a day. Eat 2. Train to failure. Never train to failure. High intensity. Low intensity. Carbs are essential. Carbs are the enemy. Whatever you believe, you will find ten experts confirming it — and ten more contradicting it.
              </p>
              <p className="text-white/80 italic normal-case text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                AI has amplified this. It centralizes the consensus and recombines the contradictions. You ask a question, you get an averaged answer assembled from incompatible sources. The result reads as authoritative — and works on no one.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-orange-300 pl-6">
                The trap is not failing to find the right method. The trap is taking a piece of one method, a piece of another, assembling them — and discovering they were parts of different machines.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION: UNIFIED APPROACH — organic background (cool/blue like idea_3) */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: "radial-gradient(ellipse 1400px 900px at 50% 50%, #1a1a2e 0%, #0f0f1c 40%, #050510 80%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-60 mix-blend-screen"
            style={{
              background: "radial-gradient(circle 500px at 70% 20%, rgba(100, 80, 200, 0.4), transparent 60%), radial-gradient(circle 700px at 20% 80%, rgba(60, 100, 180, 0.3), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heavyGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heavyGrain)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300/80 mb-6">
                The Solution
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white">
                One Machine.<br />
                <span className="text-blue-300">All The Pieces.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">
                Elite is not the best of every method assembled into one. It is a unified approach — a single internal logic that runs through every recommendation, from the morning wake-up to the last set of the session.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-12 max-w-3xl">
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
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="border border-blue-400/30 bg-blue-500/5 backdrop-blur-sm py-4 px-3 md:py-5 md:px-4 text-center"
                  >
                    <p className="text-white/90 font-black uppercase italic text-xs md:text-sm tracking-tight">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-blue-300 pl-6">
                Nothing is left aside. Every part holds the others. Remove a piece — the machine still runs. That is what makes it work where assembled methods fail.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION: ANTI-AI POSITIONING — organic background (deep purple/black like idea_2) */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: "radial-gradient(ellipse 1200px 800px at 30% 50%, #2a1545 0%, #15082a 40%, #050208 80%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-50 mix-blend-screen"
            style={{
              background: "linear-gradient(105deg, rgba(180, 100, 200, 0.3) 0%, transparent 30%, transparent 70%, rgba(100, 80, 220, 0.2) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heavyGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heavyGrain)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-300/80 mb-6">
                Why €199 in 2026
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white">
                The Generic Programs<br />
                <span className="text-purple-300">Are Free Now.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
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
                    Averages out the internet. Repeats what most coaches repeat. Cannot refuse the dominant errors of the field — because it has no position to refuse from.
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
                    Takes positions where most flinch. Names what is wrong in the dominant approaches and proposes a coherent alternative. Built on lived clinical and athletic practice — not on data scraped from a contradictory web.
                  </p>
                </div>
              </div>

              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-purple-300 pl-6">
                Premium in 2026 means human. Singular. Coherent end to end. Elite is what €199 buys when €30 buys nothing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION: LIFELONG / EXPONENTIAL — organic background (warm/cream like idea_4) */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: "radial-gradient(ellipse 1200px 800px at 50% 50%, #3a2a1a 0%, #1f1410 40%, #0a0606 80%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              background: "radial-gradient(ellipse 800px 400px at 50% 0%, rgba(220, 180, 130, 0.4), transparent 70%), radial-gradient(circle 500px at 80% 90%, rgba(180, 100, 60, 0.2), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heavyGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heavyGrain)'/%3E%3C/svg%3E")`,
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

            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Most programs run for a fixed block — 8 weeks, 12 weeks, then they expire. You buy another. The cycle never ends.
              </p>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Elite is built differently. The programs progress with you indefinitely. The principles do not expire. <span className="text-amber-200 font-medium">The longer you apply it, the more it works.</span> That is the exponential.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-amber-200 pl-6">
                Year one teaches you the structure. Year three reveals layers you missed. Year ten — you are still finding what was always there. That is what being elite means.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION: WHAT'S IN THE GUIDE — back to dark/black */}
        <section className="relative py-32 md:py-40 bg-black">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-20">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                What's In The Guide
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-[0.9]">
                66 Pages, 5 Parts<span className="text-blue-600">.</span>
              </h2>
              <p className="text-zinc-500 italic normal-case text-lg max-w-2xl mx-auto">
                No motivational fluff. No vague "listen to your body". Concrete protocols, real numbers, theoretical depth.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  num: "Part 1",
                  pages: "pp. 3–14",
                  tag: "The psychological work",
                  title: "Why Champions Decide to Become Champions",
                  body: "The mental architecture that separates elite athletes from very good ones. The unconscious mechanisms — the superego, the inner enemy, the indomitable desire — that bridle most people from realizing their potential, and what to do about them.",
                },
                {
                  num: "Part 2",
                  pages: "pp. 15–42",
                  tag: "Daily protocols",
                  title: "Diet, Sleep, Recovery — Real Numbers",
                  body: "Exact macros, exact timing, exact protocols. Every food in the sample diet justified by mechanism (mTORC1, indole-3-carbinol, leucine threshold). Every supplement dose-specified. Every blood marker comes with the exact term to write on your prescription.",
                },
                {
                  num: "Part 3",
                  pages: "pp. 43–59",
                  tag: "How to read, use, adapt",
                  title: "The Program Is a Frame. The Decision Is Yours.",
                  body: "How to use the programs across years. The minimum effective. Strength vs hypertrophy at the cellular level. Volume and intensity as capacities, not numbers. When to deload, how to peak, how to handle injuries.",
                },
              ].map((part, i) => (
                <motion.div
                  key={part.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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

        {/* SECTION: THE TWO PROGRAMS - with book mockup */}
        <section className="relative py-32 md:py-40 bg-black overflow-hidden">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(ellipse 1000px 600px at 50% 30%, rgba(30, 60, 180, 0.15), transparent 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-20">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                The Two Programs
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-[0.9]">
                Two Programs<span className="text-blue-600">.</span><br />
                One Body Trained Whole.
              </h2>
            </motion.div>

            {/* Book mockup centered */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex justify-center mb-20"
            >
              <div className="relative" style={{ perspective: "2000px" }}>
                <div
                  className="relative"
                  style={{
                    transform: "rotateY(-15deg) rotateX(2deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Book spine shadow */}
                  <div
                    className="absolute -left-2 top-1 bottom-1 w-4 bg-gradient-to-r from-black to-zinc-800"
                    style={{ transform: "rotateY(-90deg) translateZ(8px)" }}
                  />
                  {/* Book front cover */}
                  <div className="relative w-[280px] md:w-[360px] h-[400px] md:h-[520px] shadow-2xl">
                    <div className="absolute inset-0 bg-zinc-900 border border-zinc-800">
                      <Image
                        src="/elite-cover.jpg"
                        fill
                        sizes="360px"
                        className="object-cover"
                        alt="Elite book cover"
                      />
                    </div>
                    {/* Book gloss highlight */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, rgba(255,255,255,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
                      }}
                    />
                  </div>
                  {/* Pages on the right edge */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-[6px] bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-300"
                    style={{ transform: "translateX(6px) rotateY(90deg)" }}
                  />
                </div>
                {/* Drop shadow under book */}
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[280px] md:w-[360px] h-8 rounded-full"
                  style={{
                    background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
                    filter: "blur(12px)",
                  }}
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                  Program 1
                </p>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                  L'Archange Expurgateur
                </h3>
                <p className="text-zinc-300 italic normal-case text-lg leading-relaxed mb-6">
                  Full-body hypertrophy and strength. 4 sessions per week. Configurable for hypertrophy, strength, or both.
                </p>
                <p className="text-zinc-500 italic normal-case text-base leading-relaxed">
                  The complete program for the entire body. Nothing is left aside. Lifelong progression — you will train on it for years.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="border border-blue-600/40 bg-blue-600/5 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400 mb-4">
                  Program 2 · World-class & Unique
                </p>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                  Le Bras Armé des Dieux
                </h3>
                <p className="text-white italic normal-case text-lg leading-relaxed mb-6">
                  Specialized grip strength program. International-level forearm and hand work. <span className="text-blue-300 font-medium">Found nowhere else — this approach to grip is unique in the world.</span>
                </p>
                <p className="text-zinc-300 italic normal-case text-base leading-relaxed">
                  At the cutting edge of grip programming and methodology.
                </p>
              </motion.div>
            </div>

            {/* The chain argument */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="border-t border-zinc-900 pt-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 text-center">
                  Why Grip Matters For Everyone
                </p>
                <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 leading-tight text-center">
                  The Body Is A Chain<span className="text-blue-600">.</span>
                </h3>
                <p className="text-zinc-300 italic normal-case text-lg md:text-xl leading-relaxed mb-6 text-center max-w-3xl mx-auto">
                  Movement is a chain. A chain is only as strong as its weakest link. And the very first link is the hands — the wrists, the forearms, the elbows.
                </p>
                <p className="text-zinc-400 italic normal-case text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
                  Most athletes are bridled by grip without knowing it. Their deadlift stops because the bar slips. Their pull-ups end before their lats are tired. Their press peaks before their triceps are spent. Train the first link — the rest of the body unlocks. That is what this program does for everyone, not just specialists.
                </p>
              </div>
            </motion.div>
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

            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
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
                This guide is not a synthesis of internet content. It is the convergence of two parallel disciplines, both pursued seriously for years, both fully integrated.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                  Athletic Side
                </p>
                <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6 leading-tight">
                  9 years strength sport · martial arts · training, diet, recovery
                </p>
                <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                  Strength training, programming, periodization, nutrition science, recovery protocols, grip specialization. Tested in practice. Refined through experimentation. The author progressed more in 8 months on this method than in the previous 8 years without it.
                </p>
              </motion.div>
            </div>

            <motion.div {...fadeUp} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
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
                  className="absolute inset-0 opacity-20 pointer-events-none"
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
