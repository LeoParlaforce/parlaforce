"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

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
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  // Parallax refs
  const trapRef = useRef<HTMLDivElement>(null);
  const unifiedRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const lifelongRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: trapProgress } = useScroll({
    target: trapRef,
    offset: ["start end", "end start"],
  });
  const trapY = useTransform(trapProgress, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: unifiedProgress } = useScroll({
    target: unifiedRef,
    offset: ["start end", "end start"],
  });
  const unifiedY = useTransform(unifiedProgress, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: aiProgress } = useScroll({
    target: aiRef,
    offset: ["start end", "end start"],
  });
  const aiY = useTransform(aiProgress, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: lifelongProgress } = useScroll({
    target: lifelongRef,
    offset: ["start end", "end start"],
  });
  const lifelongY = useTransform(lifelongProgress, [0, 1], ["-12%", "12%"]);

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative selection:bg-blue-600/30 w-full">
      <div
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heavyGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch' seed='13'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heavyGrain)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-6 md:p-8 flex justify-between items-center bg-black/50 backdrop-blur-sm relative z-30">
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

        {IS_LAUNCH_WEEK && (
          <div className="bg-blue-600 py-3 relative z-30">
            <p className="text-center text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs italic">
              Launch Week · €150 instead of €199 · Limited time
            </p>
          </div>
        )}

        {/* HERO */}
        <section className="relative bg-black pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
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
                  Progress more in 8 months than in 8 years without this program.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
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

        {/* THE TRAP - idea_3 cropped on the LEFT edge burn (yellow/orange flare) */}
        <section ref={trapRef} className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
            style={{
              y: trapY,
              backgroundImage: "url('/textures/idea_3_clean.jpg')",
              backgroundSize: "150% auto",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.5))",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #000000, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #0a0a18)" }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-40 md:py-56">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-200/90 mb-6">
                Why This Guide Exists
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white drop-shadow-2xl">
                An Engine Works To Its <br />
                <span className="text-orange-100">Fullest Potential When All<br />
                The Pieces Are From The Same Machine.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/95 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Online you find everything and its opposite. AI has amplified this — it centralizes the consensus, recombines the contradictions, and outputs an averaged answer that fits no one.
              </p>
              <p className="text-white/85 italic normal-case text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                Most athletes fail not because they cannot find good methods. They fail because they assemble pieces of <em>different</em> methods. A diet from one coach. A program from another. A recovery protocol from a third.
              </p>
              <p className="text-white/85 italic normal-case text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                Each piece may be valid in its original system. Bolted together, they cancel each other out. The engine does not run.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-orange-200 pl-6">
                Elite is one engine. Every part — training, diet, recovery, sleep, supplementation, mental work, programming — built from the same internal logic.
              </p>
            </motion.div>
          </div>
        </section>

        {/* UNIFIED APPROACH - idea_2 cropped on the RIGHT (red dot top-right + blue right edge) */}
        <section ref={unifiedRef} className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
            style={{
              y: unifiedY,
              backgroundImage: "url('/textures/idea_2_clean.jpg')",
              backgroundSize: "150% auto",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to left, rgba(0,0,0,0.15), rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.55))",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #0a0a18, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #0a0418)" }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-40 md:py-56">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300/90 mb-6">
                Everything In One Place
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white drop-shadow-2xl">
                Nine Components.<br />
                <span className="text-blue-300">One Coherent System.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">
                Elite covers every domain that affects performance. Each treated in depth. Each consistent with the others. Nothing left aside, nothing contradicting.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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
                    transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="border border-white/15 bg-black/30 backdrop-blur-sm py-4 px-3 md:py-5 md:px-4 text-center"
                  >
                    <p className="text-white/95 font-black uppercase italic text-xs md:text-sm tracking-tight">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ANTI-AI - idea_5 cropped on the LEFT (violet edge burn) */}
        <section ref={aiRef} className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
            style={{
              y: aiY,
              backgroundImage: "url('/textures/idea_5_clean.jpg')",
              backgroundSize: "150% auto",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.5))",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #0a0418, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #100806)" }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-40 md:py-56">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-200/90 mb-6">
                Why €199 In 2026
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white drop-shadow-2xl">
                The Generic Programs<br />
                <span className="text-purple-200">Are Free Now.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">
                Anyone can ask an AI for a 12-week program, a macro split, a deload protocol. That world existed at €30 a PDF. That world is over. What is left for sale is what AI cannot deliver.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="border border-white/10 bg-black/50 backdrop-blur-sm p-8">
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

                <div className="border border-purple-300/40 bg-purple-500/15 backdrop-blur-sm p-8">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-200 mb-4">
                    What Elite Does
                  </p>
                  <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-4 leading-tight">
                    Refuses The Errors.
                  </p>
                  <p className="text-white/85 italic normal-case text-base leading-relaxed">
                    Takes positions where most flinch. Names what is wrong in the dominant approaches and proposes a coherent alternative. Built on lived clinical and athletic practice.
                  </p>
                </div>
              </div>

              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-purple-200 pl-6">
                Premium in 2026 means human. Singular. Coherent end to end. Elite is what €199 buys when €30 buys nothing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* LIFELONG - idea_4 cropped on the TOP (violet/cream horizon) */}
        <section ref={lifelongRef} className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
            style={{
              y: lifelongY,
              backgroundImage: "url('/textures/idea_4_clean.jpg')",
              backgroundSize: "120% auto",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55))",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #100806, transparent)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-40 md:py-56">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-100/90 mb-6">
                Lifelong · Exponential
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white drop-shadow-2xl">
                Not 12 Weeks.<br />
                <span className="text-amber-100">A Method For Life.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Most programs run for a fixed block — 8 weeks, 12 weeks, then they expire. You buy another. The cycle never ends.
              </p>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Elite is built differently. The programs progress with you indefinitely. <span className="text-amber-100 font-medium">The longer you apply it, the more it works.</span> That is the exponential — and that is what being elite means.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-amber-100 pl-6">
                Year one teaches you the structure. Year three reveals layers you missed. Year ten — you are still finding what was always there.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHAT'S IN THE GUIDE */}
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
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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

        {/* GRIP - INVISIBLE LIMIT */}
        <section className="relative py-32 md:py-40 bg-black overflow-hidden">
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 1200px 800px at 50% 30%, rgba(30, 60, 180, 0.18), transparent 65%), radial-gradient(circle 500px at 90% 80%, rgba(60, 80, 180, 0.15), transparent 60%)",
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6">
                Le Bras Armé des Dieux · World-Class & Unique
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">
                The Limit You<br />
                <span className="text-blue-400">Don't Even Know You Have.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="max-w-4xl mx-auto mb-16">
              <div className="border border-zinc-900 bg-zinc-950/40 p-8 md:p-12">
                <p className="text-zinc-300 italic normal-case text-lg md:text-xl leading-relaxed mb-6">
                  You feel like you should be stronger. You train hard, you recover, you eat right — and yet on every pulling movement (deadlifts, rows, pull-ups, every single one) something stops you before you can fully express what you have.
                </p>
                <p className="text-zinc-300 italic normal-case text-lg md:text-xl leading-relaxed mb-6">
                  You blame your back. You blame your conditioning. You blame your technique. You are wrong. <span className="text-white font-medium">It's your grip — and you don't even feel it.</span>
                </p>
                <p className="text-zinc-300 italic normal-case text-lg md:text-xl leading-relaxed mb-6">
                  When the grip is weak, the nervous system silently caps the recruitment of every muscle further up the chain. Your back, your lats, your legs are never given permission to fire at full capacity — because the system protects what would otherwise drop the load.
                </p>
                <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium border-l-2 border-blue-400 pl-6 mb-6">
                  This happens without your knowledge. You feel only the ceiling, never the cause.
                </p>
                <p className="text-zinc-300 italic normal-case text-lg md:text-xl leading-relaxed">
                  Train this — bring your grip to a world-class level — and the cap lifts. Suddenly your back works. Your legs work. Every lift you have been grinding on for years explodes upward. <span className="text-white font-medium">Try it. You will see what your body was holding back.</span>
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
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

        {/* FOR WHOM */}
        <section className="relative py-32 md:py-40 bg-black">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                For Whom
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
                Serious Athletes<span className="text-blue-600">.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
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

        {/* WHO WROTE IT */}
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
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                  Athletic Side
                </p>
                <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6 leading-tight">
                  9 years strength sport &amp; martial arts · training, diet, recovery
                </p>
                <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                  Strength training, programming, periodization, nutrition science, recovery protocols, grip specialization. Progress more in 8 months on this method than in the previous 8 years without it.
                </p>
              </motion.div>
            </div>

            <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
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
                  style={{ background: "radial-gradient(circle 400px at 50% 50%, rgba(37, 99, 235, 0.4), transparent 70%)" }}
                />
                <div className="relative">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">Ready</p>
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
