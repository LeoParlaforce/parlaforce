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
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.04]"
        aria-hidden="true"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-6 md:p-8 flex justify-between items-center border-b border-zinc-900 bg-black/50 backdrop-blur-sm">
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
          <div className="bg-blue-600 py-3">
            <p className="text-center text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs italic">
              Launch Week · €150 instead of €199 · Limited time
            </p>
          </div>
        )}

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="relative h-[60vh] lg:h-[85vh] border border-zinc-900 bg-zinc-950 overflow-hidden order-2 lg:order-1">
            <Image
              src="/elite-cover.jpg"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              alt="Elite — Become an Elite Athlete"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center order-1 lg:order-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              The Elite Protocol · 66 Pages · Lifelong
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black uppercase italic tracking-tighter mb-8 leading-[0.85]">
              Elite<span className="text-blue-600">.</span>
            </h1>
            <p className="text-zinc-300 italic normal-case text-xl md:text-2xl mb-6 leading-relaxed">
              The complete protocol to reach your maximum athletic potential.
            </p>
            <p className="text-zinc-500 italic normal-case text-base md:text-lg mb-10 leading-relaxed">
              Most people think only superhumans become world-class. They are wrong. The difference is psychological — and it can be worked on.
            </p>

            <div className="border-l-2 border-blue-600 pl-6 mb-12">
              <p className="text-zinc-400 italic normal-case text-base md:text-lg leading-relaxed">
                The author progressed more in 8 months applying this guide than in the previous 8 years without it.
              </p>
            </div>

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
                Both versions included — you can download both.
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
              {loading ? "Loading..." : "Acquire Elite →"}
            </button>

            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest mt-6 text-center">
              Instant Download · Stripe Secure Checkout
            </p>
          </div>
        </section>

        {/* WHY THIS PRICE */}
        <section className="max-w-5xl mx-auto px-6 mb-32 border-y border-zinc-900 py-20">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              Why €199
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
              The Generic Programs Are Free Now<span className="text-blue-600">.</span>
            </h2>
            <p className="text-zinc-400 italic normal-case text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Anyone can ask an AI for a 12-week program, a macro split, a deload protocol. That world existed at €30 a PDF. That world is over.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-4">
                What AI Can Do
              </p>
              <p className="text-white font-black uppercase italic text-xl tracking-tight mb-4 leading-tight">
                Recombine consensus.
              </p>
              <p className="text-zinc-500 italic normal-case text-base leading-relaxed">
                Generate a generic program. List standard recommendations. Average out what the internet says. Repeat what most coaches repeat. It does this for free, instantly, on demand.
              </p>
            </div>

            <div className="border border-blue-600/40 bg-blue-600/5 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                What AI Cannot Do
              </p>
              <p className="text-white font-black uppercase italic text-xl tracking-tight mb-4 leading-tight">
                Take a position.
              </p>
              <p className="text-zinc-300 italic normal-case text-base leading-relaxed">
                Have lived 16 years between a clinical practice and a strength sport. Treat the body and the psyche as one. Refuse the dominant errors of the field. Write from a singular voice that does not negotiate.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              The Premium Difference
            </p>
            <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-6">
              In 2026, paying for a digital program means paying for what the AI cannot replace. Elite is written by a clinical psychologist and strength athlete, with 16 years of work behind every page. Zero AI. Zero filler. Zero compromise.
            </p>
            <p className="text-zinc-500 italic normal-case text-base md:text-lg max-w-2xl mx-auto">
              That is what €199 buys. Not a program. A position.
            </p>
          </div>
        </section>

        {/* LIFELONG */}
        <section className="max-w-5xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                Lifelong
              </p>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                Not 12 Weeks<span className="text-blue-600">.</span>
              </h2>
              <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-8 leading-tight text-zinc-400">
                A Method for the Rest of Your Training Life.
              </h3>
            </div>
            <div className="space-y-6 text-zinc-400 italic normal-case text-base md:text-lg leading-relaxed">
              <p>
                Most programs run for a fixed block — 8 weeks, 12 weeks, then they expire. You buy another one. The cycle never ends.
              </p>
              <p className="text-white">
                Elite is built differently. The programs progress with you indefinitely. The principles do not expire. The deeper you go, the more you extract from them.
              </p>
              <p>
                Year one teaches you the structure. Year three reveals layers you missed. Year ten — you are still finding what was always there. The author has been applying it for years and still progresses.
              </p>
              <p className="border-l-2 border-blue-600 pl-6 text-white">
                You buy this once. You will return to it for the rest of your training life.
              </p>
            </div>
          </div>
        </section>

        {/* WHO WROTE IT */}
        <section className="max-w-5xl mx-auto px-6 mb-32 border-y border-zinc-900 py-20">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              Who Wrote It
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8">
              16 Years of Work<span className="text-blue-600">.</span>
            </h2>
            <p className="text-zinc-400 italic normal-case text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              This guide is not a synthesis of internet content. It is the convergence of two parallel disciplines, both pursued seriously for over a decade, both fully integrated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                Clinical Side
              </p>
              <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6 leading-tight">
                Master in Clinical Psychology · 8 years private practice · ~200 patients
              </p>
              <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                Lacanian psychoanalyst. Years of work on desire, the superego, what stops people from realizing their potential — applied directly to the psychology of performance. The clinical depth of this guide does not come from books. It comes from the consulting room.
              </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                Athletic Side
              </p>
              <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6 leading-tight">
                8 years of strength sport · training, diet, recovery, programming
              </p>
              <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                Strength training, programming, periodization, nutrition science, recovery protocols, grip specialization. Tested in practice. Refined through experimentation. Documented through results — including the author's own progression: more in 8 months on this method than in the previous 8 years without it.
              </p>
            </div>
          </div>

          <div className="mt-12 border border-blue-600/30 bg-blue-600/5 p-8 md:p-10 text-center">
            <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed">
              Elite is what happens when these two trainings meet. The body and the psyche are not two separate domains — they meet in the speaking subject. This guide treats them as one.
            </p>
          </div>
        </section>

        {/* WHAT'S INSIDE - DETAILED */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <div className="text-center mb-20">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              What's Inside
            </p>
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-none">
              66 Pages, 5 Parts, Zero Filler<span className="text-blue-600">.</span>
            </h2>
            <p className="text-zinc-500 italic normal-case text-lg max-w-2xl mx-auto">
              No motivational fluff. No vague "listen to your body". Concrete protocols, real numbers, theoretical depth.
            </p>
          </div>

          {/* Part 1 - Foundations */}
          <div className="mb-12 border border-zinc-900 bg-zinc-950/30 p-8 md:p-12">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600">
                Part 1 · Foundations · pp. 3–14
              </p>
              <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">
                The psychological work
              </p>
            </div>
            <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
              Why Champions Are Not Born — They Are Permitted
            </h3>
            <p className="text-zinc-400 italic normal-case text-base md:text-lg leading-relaxed mb-8">
              The mental architecture that separates elite athletes from very good ones. Not tips, not affirmations — the actual unconscious mechanisms (the superego, the inner enemy, the need for idols, the indomitable desire) that bridle most people from realizing their potential, and what to do about them.
            </p>
            <ul className="space-y-3 text-zinc-400 italic normal-case text-base">
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Process Above All — why the result follows the process, never the reverse</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> The Greatest Lie of Coaching — what the industry sells you, and why it keeps you small</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Your Real Potential — the central governor, hysterical strength, what your body actually withholds (Angela Cavallo and the 1700kg Chevrolet)</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> The Indomitable Desire — Freud, the superego, the bridled drive — and how to free it</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> The Inner Enemy — why most athletes need idols and choose weakness</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Recovery and soreness — what the popular wisdom gets wrong</li>
            </ul>
          </div>

          {/* Part 2 - Practical Guidelines */}
          <div className="mb-12 border border-zinc-900 bg-zinc-950/30 p-8 md:p-12">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600">
                Part 2 · Practical Guidelines · pp. 15–42
              </p>
              <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">
                Daily protocols
              </p>
            </div>
            <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
              Diet, Sleep, Recovery — Real Numbers
            </h3>
            <p className="text-zinc-400 italic normal-case text-base md:text-lg leading-relaxed mb-8">
              Everything that surrounds training. Not "eat clean" — exact macros, exact timing, exact protocols. Every food in the sample diet is justified by mechanism (mTORC1, indole-3-carbinol, leucine threshold, aromatase inhibition). Every supplement is dose-specified. Every blood marker comes with the exact term to write on your prescription.
            </p>
            <ul className="space-y-3 text-zinc-400 italic normal-case text-base">
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> The wake-up — circadian anchoring through the ipRGCs and melanopsin</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Hydration — why the modern athlete is chronically behind</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> The truth about meals — why the "6 small meals, 30g protein each" dogma was wrong</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Real macros — protein 1.6g/kg in all phases, including deficit (most coaches get this wrong)</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Cycles — surplus, maintenance, deficit — exact percentages of bodyweight per week</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Sample diet at maintenance — every food, every gram, with full macro breakdown</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Why these foods — the biochemistry of every ingredient (steroidogenesis, aromatase inhibition, gut-hormone axis)</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Supplementation — D3, Omega-3, Magnesium, Zinc+Copper, Creatine — exact forms and doses</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Blood test guide — the exact terms to write on your prescription, and how to interpret each marker</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Sleep — the mirror of desire — why protocols alone are never enough</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Cortisol — the first killer of adaptation — and what actually lowers it</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Active recovery, technique on positive/negative phases, accessory exercise execution</li>
            </ul>
          </div>

          {/* Part 3 - Programming */}
          <div className="mb-12 border border-zinc-900 bg-zinc-950/30 p-8 md:p-12">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600">
                Part 3 · Programming · pp. 43–59
              </p>
              <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">
                How to read, use, adapt
              </p>
            </div>
            <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
              The Program Is a Frame. The Decision Is Yours.
            </h3>
            <p className="text-zinc-400 italic normal-case text-base md:text-lg leading-relaxed mb-8">
              How to actually use the programs across years. The minimum effective. The difference between strength and hypertrophy at the cellular level, and how to choose which to push. Volume and intensity as capacities, not numbers. When to deload. How to peak. When to substitute exercises. How to handle injuries. The "horse cocking" principle.
            </p>
            <ul className="space-y-3 text-zinc-400 italic normal-case text-base">
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Tailored vs Off-the-shelf — two ways to use the system</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Strength vs Hypertrophy — what intensity actually means, and why high-intensity is overrated for strength</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> The Minimum Effective — the most misunderstood concept in training</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Tracking progression on every exercise — why neglecting accessories costs you the physique</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Deload — when to schedule it (before the plateau, not after)</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Strengthening, dynamic stretching, the "ready at any moment" principle</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Decision flowchart — should I add a set? (the full questionnaire)</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Three types of injuries and how to keep progressing through them</li>
              <li className="flex"><span className="text-blue-600 mr-3 shrink-0">·</span> Horse cocking — when to break technique to push load</li>
            </ul>
          </div>

          {/* Programs side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
                Program 1 · pp. 60–63
              </p>
              <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                L'Archange Expurgateur
              </h3>
              <p className="text-zinc-400 italic normal-case text-base leading-relaxed mb-6">
                Full-body program, 4 sessions per week. Configurable for hypertrophy, strength, or both. Built around grip work integrated into compound lifts (axle deadlift, thumbless row, Saxon work, fat grip variations).
              </p>
              <ul className="space-y-2 text-zinc-500 italic normal-case text-sm mb-6">
                <li>· Day 1 — Axle deadlift, thumbless row, incline pressing, triceps</li>
                <li>· Day 2 — Deficit deadlift, no-strap pulls, posterior chain</li>
                <li>· Day 3 — Saxon variations, hack squat, back squat, lunges</li>
                <li>· Day 4 — Fat grip pulldowns, bent-over rows, biceps</li>
              </ul>
              <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">
                Rep ranges 4–6 (top sets) · 6–8 (back-offs) · 6–15 (accessories) · Lifelong progression
              </p>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/30 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
                Program 2 · pp. 64–66
              </p>
              <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                Le Bras Armé des Dieux
              </h3>
              <p className="text-zinc-400 italic normal-case text-base leading-relaxed mb-6">
                Specialized grip strength toolbox. 9 exercises targeting forearm hypertrophy, finger strength, wrist resilience, thumb strength. Devastating for armlifting, climbing, armwrestling, strongman, powerlifting, and serious forearm aesthetics.
              </p>
              <ul className="space-y-2 text-zinc-500 italic normal-case text-sm mb-6">
                <li>· Pinch plates — lateral raises and curls</li>
                <li>· Fat grip thumbless variations</li>
                <li>· Andrieux roller wrist extension</li>
                <li>· Finger roll superset wrist flexion</li>
                <li>· Fingertip shrug, thumb flexion, finger extender</li>
              </ul>
              <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest italic">
                Frequency 2–4 × per week · Toolbox approach · Lifelong progression
              </p>
            </div>
          </div>
        </section>

        {/* DISTINCTIVE QUOTES */}
        <section className="max-w-4xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              Excerpts
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 leading-none">
              The Tone of the Work<span className="text-blue-600">.</span>
            </h2>
          </div>

          <div className="space-y-8">
            <blockquote className="border-l-2 border-blue-600 pl-8 py-4">
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed mb-3">
                "The result is the consequence of the process."
              </p>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">From Foundations</p>
            </blockquote>

            <blockquote className="border-l-2 border-blue-600 pl-8 py-4">
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed mb-3">
                "Desire is not a need. A need is filled. Desire is always ahead. You will always be hungry. Life is a one-way ticket. Knife between the teeth, and bon voyage."
              </p>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">From The Indomitable Desire</p>
            </blockquote>

            <blockquote className="border-l-2 border-blue-600 pl-8 py-4">
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed mb-3">
                "Many people need idols — superhuman athletes, untouchable champions. They keep watch at the top in our place. But what if you became that strong one? You would have to fully assume what you are — without a tutelary figure, without a champion to look up to from below."
              </p>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">From The Inner Enemy</p>
            </blockquote>

            <blockquote className="border-l-2 border-blue-600 pl-8 py-4">
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed mb-3">
                "Effortless victory produces no effect. Potential is found in the battle."
              </p>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">From Active Recovery</p>
            </blockquote>

            <blockquote className="border-l-2 border-blue-600 pl-8 py-4">
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed mb-3">
                "Sleep is not commanded. It is earned — by the desire of what comes after."
              </p>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">From Sleep — The Mirror of Desire</p>
            </blockquote>
          </div>
        </section>

        {/* FOR WHOM */}
        <section className="max-w-5xl mx-auto px-6 mb-32 border-y border-zinc-900 py-20">
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
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                If You Are
              </p>
              <ul className="space-y-4 text-zinc-400 italic normal-case text-lg">
                <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> Already training hard but stuck below your potential</li>
                <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> A strength athlete looking to specialize grip</li>
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
                <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> Programs designed for years, not weeks</li>
                <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> No AI — actual clinical-quality work</li>
                <li className="flex"><span className="text-blue-600 mr-3 shrink-0">—</span> A document you will return to for the rest of your training life</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-20 text-center relative overflow-hidden">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              Ready
            </p>
            <h3 className="text-3xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
              Stop Guessing. Start Moving<span className="text-blue-600">.</span>
            </h3>
            <p className="text-zinc-500 italic max-w-xl mx-auto normal-case text-base md:text-lg mb-8">
              The bar responds to what you actually do with it.
            </p>
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest mb-12">
              Lifelong · Zero AI · 100% Human Intelligence
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
        </section>
      </div>
    </main>
  );
}
