import { Metadata } from 'next'
import Link from 'next/link'
import RandomTexture from '@/components/RandomTexture'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'ParlaForce | Systems for Physical & Psychological Dominance',
  description: 'Human-led protocols for elite performance. Clinical strength architecture, sports science, and cognitive restructuring without AI interference.',
  alternates: { canonical: 'https://parlaforce.com' },
}

export default function Home() {
  return (
    <main className="bg-black font-sans lowercase text-white w-full relative">

      {/* Fixed background */}
      <div className="pointer-events-none fixed inset-0 z-[0] opacity-40">
        <RandomTexture />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1]" style={{ background: "rgba(0,0,0,0.65)" }} />

      {/* HERO */}
      <section className="h-screen min-h-[760px] flex flex-col items-center justify-start pt-20 md:pt-24 px-4 md:px-6 relative">

      <div className="max-w-5xl w-full relative z-10 text-center">

        <div className="mb-6 md:mb-8">
          <span className="bg-blue-600/10 text-blue-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em] px-3 md:px-4 py-1.5 md:py-2 border border-blue-600/20 inline-block">
            NO AI USED — 100% HUMAN INTELLIGENCE
          </span>
        </div>

        {/* Elite Featured Block */}
        <div className="mb-4 md:mb-6 max-w-2xl mx-auto">
          <Link
            href="/programs"
            className="group block border border-blue-600/40 bg-blue-600/5 hover:bg-blue-600/10 hover:border-blue-600 transition-all duration-300 p-4 md:p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-left flex-1 min-w-0">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em] text-blue-600 mb-1 md:mb-2">
                  Elite Protocol · 66 Pages · Lifelong
                </p>
                <p className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white leading-none">
                  Elite<span className="text-blue-600">.</span>
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white text-2xl md:text-3xl font-black italic"></p>
              </div>
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-blue-600/20 flex items-center justify-between gap-3">
              <span className="text-zinc-400 normal-case text-[11px] md:text-sm leading-tight">
                Progress more in 8 months than in 8 years.
              </span>
              <span className="text-blue-600 group-hover:text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] italic transition-colors shrink-0">
                Acquire →
              </span>
            </div>
          </Link>
        </div>

        {/* Secondary actions */}
        <div className="flex flex-row gap-3 md:gap-4 justify-center items-stretch w-full max-w-2xl mx-auto">
          <Link
            href="/supervision"
            className="group relative border border-zinc-800 bg-black/40 backdrop-blur-sm p-4 md:p-5 hover:border-amber-600 hover:bg-zinc-950 transition-all duration-300 no-underline flex-1 text-left"
          >
            <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest md:tracking-[0.3em] text-zinc-600 group-hover:text-amber-600 mb-2 transition-colors">
              1:1 · Signal · Encrypted
            </p>
            <p className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">
              Supervision<span className="text-amber-600">.</span>
            </p>
            <p className="text-zinc-500 normal-case text-[10px] md:text-xs leading-snug mb-3">
              Private monthly coaching with Leo Gayrard
            </p>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-end">
              <span className="text-amber-600 group-hover:text-white text-[8px] font-black uppercase tracking-[0.2em] italic transition-colors">
                Discover →
              </span>
            </div>
          </Link>

          <Link
            href="/articles"
            className="group relative border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm p-4 md:p-5 hover:border-red-800/60 hover:bg-zinc-900/40 transition-all duration-300 no-underline flex-1 text-left"
          >
            <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest md:tracking-[0.3em] text-zinc-600 group-hover:text-red-700 mb-2 transition-colors">
              Theory · Evidence-based
            </p>
            <p className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-2">
              Articles<span className="text-red-800">.</span>
            </p>
            <p className="text-zinc-500 normal-case text-[10px] md:text-xs leading-snug mb-3">
              Protocols, psychology & performance science
            </p>
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-end">
              <span className="text-red-800 group-hover:text-white text-[8px] font-black uppercase tracking-[0.2em] italic transition-colors">
                Read →
              </span>
            </div>
          </Link>
        </div>

        {/* YouTube */}
        <div className="mt-2 md:mt-3 w-full max-w-2xl mx-auto">
          <a
            href="https://www.youtube.com/@ParLaForce"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm px-4 md:px-6 py-2.5 md:py-3 hover:border-zinc-700 hover:bg-zinc-900/30 transition-all duration-300 w-full"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 shrink-0 text-zinc-600 group-hover:text-red-600 transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <div className="text-left">
                <span className="block text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-700 group-hover:text-zinc-500 transition-colors">
                  Free Content
                </span>
                <span className="block text-sm md:text-base font-black uppercase tracking-tight text-zinc-500 group-hover:text-zinc-300 italic leading-none transition-colors">
                  YouTube
                </span>
              </div>
            </div>
            <span className="text-zinc-700 group-hover:text-zinc-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] italic transition-colors">
              Watch →
            </span>
          </a>
        </div>
      </div>

        {/* Bottom label */}
        <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4 z-10">
          <span className="text-zinc-700 text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em]">
            System v2.0.26 // Built by the Architect
          </span>
        </div>

      </section>

      {/* NEWSLETTER */}
      <section className="py-20 md:py-28 px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

    </main>
  )
}
