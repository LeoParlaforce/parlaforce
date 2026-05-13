"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SupervisionPage() {
  const [loading, setLoading] = useState<"reduced" | "full" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const fadeUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };

  // Parallax refs
  const aloneRef = useRef<HTMLDivElement>(null);
  const fullStackRef = useRef<HTMLDivElement>(null);
  const writtenRef = useRef<HTMLDivElement>(null);
  const ceilingRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: aloneProgress } = useScroll({
    target: aloneRef,
    offset: ["start end", "end start"],
  });
  const aloneY = useTransform(aloneProgress, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: fullStackProgress } = useScroll({
    target: fullStackRef,
    offset: ["start end", "end start"],
  });
  const fullStackY = useTransform(fullStackProgress, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: writtenProgress } = useScroll({
    target: writtenRef,
    offset: ["start end", "end start"],
  });
  const writtenY = useTransform(writtenProgress, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: ceilingProgress } = useScroll({
    target: ceilingRef,
    offset: ["start end", "end start"],
  });
  const ceilingY = useTransform(ceilingProgress, [0, 1], ["-12%", "12%"]);

  const faqs = [
    {
      q: "How does it actually work day to day?",
      a: "Think of it as a private messaging conversation — like texting, but encrypted. After subscribing, you get my Signal contact. You write whenever something is alive in you: a training question, a technique problem, a video of a lift, how a session went, something mental you can't shake. As much as you want, whenever you want. I respond within 24 hours. And so it goes, day after day — a continuous conversation about your training and your progress.",
    },
    {
      q: "Can I send videos of my exercises?",
      a: "Yes. Send me video of any lift and I'll analyze the technique, the bar path, the intent, the effort, what's missing, what's compensating. Same for grip work, accessory movements, any movement you want to refine.",
    },
    {
      q: "Will you actually write my programs?",
      a: "I'll teach you to program your own training. You'll learn to structure your weeks, choose your exercises, manage your volume and intensity, deload, peak, handle injuries — for the rest of your training life. We work on your current cycle together, you bring your own structure, I correct and refine.",
    },
    {
      q: "What about the mental side?",
      a: "Strength is half nervous system, half psyche. The hesitation before a heavy attempt, the bail on a lift you should have made, the plateau that has nothing to do with the program — that's where most of your locked PRs are hiding. I bring eight years of clinical work to this exact problem. Nobody else in strength sport gives you this.",
    },
    {
      q: "Why chat only? No calls, no video sessions?",
      a: "Deliberate. A weekly 45-minute slot forces you to improvise in real time on a calendar that has nothing to do with when something is alive in you. Writing lets you formulate things when they matter — before a session, after a failed lift, the morning of a meet. The act of writing is itself part of the work.",
    },
    {
      q: "Is this an AI app?",
      a: "Absolutely not. You're writing with a human — licensed clinical psychologist, strength athlete, eight years of clinical practice and nine years of strength training. No algorithms. No automated replies. No scripts.",
    },
    {
      q: "Who is this for?",
      a: "Any athlete who trains seriously and wants a tight follow-up. Powerlifters, strongmen, climbers, arm wrestlers, martial artists, bodybuilders, anyone whose performance depends on strength. Beginner to international level — the work scales to where you are.",
    },
    {
      q: "Why two prices for the same service?",
      a: "Because money should not be what stops young athletes from getting serious follow-up. The reduced rate (€80) is for students and young athletes with tight budgets. The full rate (€150) is the standard. The service is strictly identical at both prices.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. One click from your Stripe receipt email. No commitment, no minimum term.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "ParlaForce Supervision",
    description:
      "Private encrypted supervision for serious strength athletes. Training, programming, diet, recovery, psychology, competition — every dimension of performance, with a clinical psychologist who is also a strength athlete.",
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
      },
      {
        "@type": "Offer",
        name: "Full Rate",
        price: "150",
        priceCurrency: "EUR",
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
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative selection:bg-blue-600/30 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            href="/programs"
            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-zinc-500 hover:text-blue-600 transition-all italic"
          >
            Elite Guide →
          </Link>
        </nav>

        {/* HERO */}
        <section className="relative bg-black pt-24 md:pt-32 pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div {...fadeUp}>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-blue-400 mb-6">
                Direct Supervision · Encrypted · Human · No AI
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8 whitespace-nowrap">
                Supervision<span className="text-blue-500">.</span>
              </h1>
              <p className="text-zinc-200 italic normal-case text-2xl md:text-3xl mb-6 leading-relaxed">
                Brutally strong, monstrously massive, your full potential unleashed with the most miraculous feats of strength humanity can provide.
              </p>
              <p className="text-zinc-300 italic normal-case text-xl md:text-2xl mb-6 leading-relaxed font-medium">
                Meet your destiny. Remember who you are. Discover what you can be.
              </p>
              <p className="text-zinc-500 italic normal-case text-base md:text-lg mb-10 leading-relaxed">
                Training, programming, technique correction on video, diet, body composition, recovery, sleep, supplementation, competition prep, peaking. Every dimension of becoming a serious strength athlete — handled by one person, in one continuous conversation.
              </p>
              <div className="border-l-2 border-blue-600 pl-6">
                <p className="text-zinc-300 italic normal-case text-base md:text-lg leading-relaxed">
                  A private messaging conversation — on Signal. You write whenever you want, as much as you want. I respond within 24 hours. Day after day, the conversation continues.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
            >
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3">
                Monthly Subscription · Cancel Anytime
              </p>

              <div className="border-l-2 border-zinc-800 pl-4 mb-6">
                <p className="text-zinc-400 italic normal-case text-sm leading-relaxed">
                  Two prices, <strong className="text-white not-italic font-medium">exactly the same service</strong>. The reduced rate exists for students and young athletes with tight budgets. The full rate is the standard.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handleSubscribe("reduced")}
                  disabled={loading !== null}
                  className="border border-zinc-800 hover:border-blue-600 bg-zinc-950/30 hover:bg-blue-600/5 p-6 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-blue-400 transition-all mb-3">
                    Reduced Rate
                  </p>
                  <p className="text-white text-5xl font-black italic mb-1">
                    €80
                  </p>
                  <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-4">
                    per month
                  </p>
                  <p className="text-zinc-500 italic normal-case text-xs leading-relaxed mb-4">
                    Students and young athletes with tight budgets.
                  </p>
                  <p className="text-zinc-300 italic normal-case text-sm font-medium">
                    {loading === "reduced" ? "Opening…" : "Subscribe →"}
                  </p>
                </button>

                <button
                  onClick={() => handleSubscribe("full")}
                  disabled={loading !== null}
                  className="border border-blue-600/40 hover:border-blue-600 bg-blue-600/5 hover:bg-blue-600/10 p-6 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400 mb-3">
                    Full Rate
                  </p>
                  <p className="text-white text-5xl font-black italic mb-1">
                    €150
                  </p>
                  <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-4">
                    per month
                  </p>
                  <p className="text-zinc-400 italic normal-case text-xs leading-relaxed mb-4">
                    The standard rate.
                  </p>
                  <p className="text-white italic normal-case text-sm font-medium">
                    {loading === "full" ? "Opening…" : "Subscribe →"}
                  </p>
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-xs text-center italic mb-4">
                  {error}
                </p>
              )}

              <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest text-center">
                Delivered via Signal · Stripe Secure Checkout
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHY YOU ARE ALONE - Section 1 */}
        <section ref={aloneRef} className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
            style={{
              y: aloneY,
              backgroundImage: "url('/textures/idea_3_clean.jpg')",
              backgroundSize: "150% auto",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.5))",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #000000, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #0a0a18)",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-40 md:py-56">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-200/90 mb-6">
                Why You Plateau
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white drop-shadow-2xl">
                You Are Training<br />
                <span className="text-orange-100">
                  Without A Witness.
                </span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
            >
              <p className="text-white/95 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                You read articles. You watch videos. You ask AI. You try things. You get conflicting advice from every direction and you assemble the pieces yourself.
              </p>
              <p className="text-white/85 italic normal-case text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                And in your training, nobody actually sees what you do. Your sets, your bar speed, your technique under fatigue, the way you eat the day before a heavy session, the way you sleep when you're cutting, what you tell yourself before a max attempt. Nobody.
              </p>
              <p className="text-white/85 italic normal-case text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
                You believe you're being honest with yourself. Everyone believes that. It's almost never true. The plateau is not a programming problem — it's a witness problem.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-orange-200 pl-6">
                Supervision is a witness. Someone who sees what you do, sees what you don't see in yourself, and tells you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHAT'S COVERED - Section 2: full stack */}
        <section ref={fullStackRef} className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
            style={{
              y: fullStackY,
              backgroundImage: "url('/textures/idea_2_clean.jpg')",
              backgroundSize: "150% auto",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.15), rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.55))",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #0a0a18, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #0a0418)",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-40 md:py-56">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300/90 mb-6">
                What You Get To Work On
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white drop-shadow-2xl">
                Every Dimension<br />
                <span className="text-blue-300">Of The Work.</span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
            >
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">
                Same scope as the Elite guide — but now applied to <em>you</em>, in real time, day after day. The whole stack treated by one person, with one internal logic.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-12">
                {[
                  "Training",
                  "Programming",
                  "Technique",
                  "Diet",
                  "Recovery",
                  "Sleep",
                  "Supplementation",
                  "Body Composition",
                  "Competition Prep",
                  "Peaking & Deload",
                  "Injury Management",
                  "Mental Work",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border border-white/15 bg-black/30 backdrop-blur-sm py-4 px-3 md:py-5 md:px-4 text-center"
                  >
                    <p className="text-white/95 font-black uppercase italic text-xs md:text-sm tracking-tight">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="text-white/90 italic normal-case text-lg md:text-xl leading-relaxed max-w-3xl mb-8">
                Send a video of your squat — I'll analyze the bar path, the depth, the intent under load, what's failing technically, what's failing psychologically. Send your week's training log — I'll tell you what to cut, what to push, what to deload. Send your meal plan — I'll correct the macros, the timing, the food choices.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-blue-300 pl-6">
                And the psychological work runs underneath all of it — because that's what separates serious athletes from very good ones.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHY WRITING - Section 3 */}
        <section ref={writtenRef} className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
            style={{
              y: writtenY,
              backgroundImage: "url('/textures/idea_5_clean.jpg')",
              backgroundSize: "150% auto",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.5))",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #0a0418, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #100806)",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-40 md:py-56">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-200/90 mb-6">
                Why Chat, Not Calls
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white drop-shadow-2xl">
                Writing Is Stronger<br />
                <span className="text-purple-200">Than Talking.</span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
            >
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl">
                A weekly 45-minute video call forces you to improvise. The calendar decides when you speak, not what's actually alive in your training. You forget what mattered. You repeat what you've already said. You leave more confused than when you started.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="border border-white/10 bg-black/50 backdrop-blur-sm p-8">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4">
                    Weekly Call Coaching
                  </p>
                  <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-4 leading-tight">
                    Improvised, Forgotten.
                  </p>
                  <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                    45 minutes once a week. You improvise in real time. Half the content evaporates between sessions. No written trace, no continuity, no archive of what was decided.
                  </p>
                </div>

                <div className="border border-purple-300/40 bg-purple-500/15 backdrop-blur-sm p-8">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-200 mb-4">
                    Written Supervision
                  </p>
                  <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-4 leading-tight">
                    Formulated, Permanent.
                  </p>
                  <p className="text-white/85 italic normal-case text-base leading-relaxed">
                    You write when something is alive. The act of writing forces you to formulate — and formulation is half the work. Every exchange is permanent, searchable, your own training journal.
                  </p>
                </div>
              </div>

              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-purple-200 pl-6">
                You will look back at our exchanges six months from now and see how far you've come — because it's all there, in writing, signed by you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* THE INNER CEILING - Section 4 */}
        <section ref={ceilingRef} className="relative overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
            style={{
              y: ceilingY,
              backgroundImage: "url('/textures/idea_4_clean.jpg')",
              backgroundSize: "120% auto",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55))",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #100806, transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #000000)",
            }}
          />

          <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-40 md:py-56">
            <motion.div {...fadeUp}>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-100/90 mb-6">
                What No Coach Will Touch
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 leading-[0.9] text-white drop-shadow-2xl">
                The Real Ceiling<br />
                <span className="text-amber-100">Is In Your Head.</span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
            >
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                You miss a lift you've hit ten times in training. You hesitate before a heavy attempt. You bail on a rep you could have made. You can't push past a number that's been the same for three years. Everyone tells you to "want it more" — useless.
              </p>
              <p className="text-white/90 italic normal-case text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl">
                Strength is half nervous system, half psyche. Most coaches stop at programming and call it a day. <span className="text-amber-100 font-medium">The brain that lifts the bar is the same one that holds it back</span> — and nobody trains the second part.
              </p>
              <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed font-medium max-w-3xl border-l-2 border-amber-100 pl-6">
                I bring eight years of clinical work to this exact problem. The mental side is treated as seriously as the squat — because that's where most of your locked PRs are hiding.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHO YOU'RE TALKING TO */}
        <section className="relative py-32 md:py-40 bg-black">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                Who You're Talking To
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">
                Two Disciplines<span className="text-blue-600">.</span>
                <br />
                One Practice.
              </h2>
              <p className="text-zinc-400 italic normal-case text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                I'm not a coach with a side interest in psychology. I'm not a psychologist with a hobby in lifting. Both disciplines, pursued seriously, for years, fully integrated.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                  Clinical Side
                </p>
                <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6 leading-tight">
                  6 years university · 8 years private practice · ~200 patients
                </p>
                <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                  Master in clinical psychology. Lacanian psychoanalyst. Years of work on what stops people from realizing their potential — applied here directly to the psychology of performance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                }}
                className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                  Athletic Side
                </p>
                <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6 leading-tight">
                  9 years strength sport & martial arts · training, diet, recovery
                </p>
                <p className="text-zinc-400 italic normal-case text-base leading-relaxed">
                  Strength training, programming, periodization, nutrition science, recovery, grip specialization. The methods I supervise you on are the methods I apply to myself.
                </p>
              </motion.div>
            </div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
            >
              <div className="border border-blue-600/30 bg-blue-600/5 p-8 md:p-12 text-center">
                <p className="text-white italic normal-case text-xl md:text-2xl leading-relaxed">
                  The body and the psyche are not two separate domains — they meet in the speaking subject. Supervision treats them as one.
                </p>
              </div>
            </motion.div>
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
                Athletes Who Want<br />
                <span className="text-blue-600">A Tight Follow-Up.</span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            >
              <p className="text-zinc-400 italic normal-case text-xl md:text-2xl leading-relaxed text-center max-w-3xl mx-auto mb-16">
                Powerlifters. Strongmen. Climbers. Arm wrestlers. Martial artists. Bodybuilders. Beginners to international level. Anyone who trains for real and wants a witness.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                    If You Are
                  </p>
                  <ul className="space-y-4 text-zinc-400 italic normal-case text-lg">
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      Stuck below your potential and you can't figure out why
                    </li>
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      Tired of contradictory advice from coaches, gurus, and AI
                    </li>
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      Preparing a competition and want someone serious in your corner
                    </li>
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      A serious athlete in any strength or grip-dependent sport
                    </li>
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      Curious about what's actually stopping you in your head
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                    If You Want
                  </p>
                  <ul className="space-y-4 text-zinc-400 italic normal-case text-lg">
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      Daily access to one person who treats every dimension
                    </li>
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      Video review of your lifts, real technical feedback
                    </li>
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      To learn to program your own training, not depend forever
                    </li>
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      The psychological dimension treated seriously, not as a buzzword
                    </li>
                    <li className="flex">
                      <span className="text-blue-600 mr-3 shrink-0">—</span>{" "}
                      A written archive of your work that compounds over months
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-32 md:py-40 bg-black">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
                FAQ
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
                Questions<span className="text-blue-600">.</span>
              </h2>
            </motion.div>

            <motion.div {...fadeUp}>
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
                      className="w-full p-6 flex justify-between items-center text-left hover:bg-zinc-900/50 transition-colors"
                    >
                      <span className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-200 italic pr-4">
                        {faq.q}
                      </span>
                      <span className="text-blue-600 font-black text-xl shrink-0">
                        {openFaq === index ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === index && (
                      <div className="p-6 pt-0 text-base text-zinc-400 italic normal-case leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
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
                    background:
                      "radial-gradient(circle 400px at 50% 50%, rgba(37, 99, 235, 0.4), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                    Ready
                  </p>
                  <h3 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
                    Get A Witness<span className="text-blue-600">.</span>
                  </h3>
                  <p className="text-zinc-500 italic max-w-xl mx-auto normal-case text-base md:text-lg mb-8">
                    Stop training in the dark.
                  </p>
                  <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest mb-12">
                    Direct · Encrypted · Cancel Anytime
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
                    <button
                      onClick={() => handleSubscribe("reduced")}
                      disabled={loading !== null}
                      className="bg-zinc-100 text-black font-black uppercase py-5 px-6 text-[10px] tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                    >
                      {loading === "reduced"
                        ? "Opening…"
                        : "€80 · Reduced →"}
                    </button>
                    <button
                      onClick={() => handleSubscribe("full")}
                      disabled={loading !== null}
                      className="bg-blue-600 text-white font-black uppercase py-5 px-6 text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
                    >
                      {loading === "full" ? "Opening…" : "€150 · Full →"}
                    </button>
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs italic mb-4">{error}</p>
                  )}

                  <p className="text-zinc-500 italic normal-case text-sm leading-relaxed max-w-md mx-auto">
                    Same service at both prices. Reduced is for students and young athletes with tight budgets. Full is the standard rate.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
