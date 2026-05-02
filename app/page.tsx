import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ParlaForce | Systems for Physical & Psychological Dominance',
  description: 'Human-led protocols for elite performance. Clinical strength architecture, sports science, and cognitive restructuring without AI interference.',
  alternates: { canonical: 'https://parlaforce.com' },
}

// Set this to false after launch week
const IS_LAUNCH_WEEK = true;

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 bg-black font-sans lowercase relative overflow-hidden text-white w-full">
      
      {/* GRAIN CINÉMATIQUE */}
      <div 
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.04]" 
        aria-hidden="true"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")` }}
      />

      {/* LAUNCH BANNER */}
      {IS_LAUNCH_WEEK && (
        <Link 
          href="/programs"
          className="absolute top-0 left-0 right-0 bg-blue-600 py-3 z-20 hover:bg-blue-500 transition-colors"
        >
          <p className="text-center text-white font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-xs italic px-4">
            <span className="hidden md:inline">Elite Launch Week · </span>
            <span className="line-through opacity-50 mr-2">€199</span>
            <span>€150</span>
            <span className="mx-2 opacity-60">·</span>
            <span>Acquire Elite →</span>
          </p>
        </Link>
      )}

      {/* LABEL HAUT DE PAGE */}
      <div className={`absolute ${IS_LAUNCH_WEEK ? 'top-20 md:top-24' : 'top-12'} left-1/2 -translate-x-1/2 w-full px-4 text-center z-10`}>
        <span className="text-blue-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] border border-blue-600 px-3 md:px-4 py-2 inline-block">
          Clinical Strength Architecture
        </span>
      </div>

      <div className={`max-w-5xl w-full relative z-10 py-24 text-center ${IS_LAUNCH_WEEK ? 'mt-24 md:mt-20' : 'mt-16 md:mt-12'}`}>
        
        <h1 className="text-5xl sm:text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8 italic">
          PARLA<span className="text-blue-600">FORCE.</span>
        </h1>
        
        <div className="mb-12 max-w-2xl mx-auto space-y-6 px-2 md:px-0">
          <p className="text-zinc-500 text-xs md:text-base font-bold uppercase tracking-widest md:tracking-[0.3em] leading-relaxed">
            Human-led protocols for psychological <br className="hidden md:block" /> and physical dominance.
          </p>
          
          <div className="space-y-4">
            <p className="text-zinc-400 normal-case italic text-base md:text-lg leading-relaxed">
              Protocols designed for the structural reorganization of performance. <br className="hidden md:block" />
              Beyond mechanics, we target the internal logic that dictates physical capacity.
            </p>
          </div>

          <div className="pt-4">
            <span className="bg-blue-600/10 text-blue-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em] px-3 md:px-4 py-2 border border-blue-600/20 inline-block">
              NO AI USED — 100% HUMAN INTELLIGENCE
            </span>
          </div>
        </div>

        {/* ELITE FEATURED BLOCK */}
        <div className="mb-12 md:mb-16 max-w-3xl mx-auto">
          <Link
            href="/programs"
            className="group block border border-blue-600/40 bg-blue-600/5 hover:bg-blue-600/10 hover:border-blue-600 transition-all duration-300 p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-left flex-1">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em] text-blue-600 mb-3">
                  The Elite Protocol · 66 Pages · Lifelong
                </p>
                <p className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none mb-3">
                  Elite<span className="text-blue-600">.</span>
                </p>
                <p className="text-zinc-400 italic normal-case text-sm md:text-base leading-relaxed">
                  The complete protocol — psychology, diet, recovery, and two programs (L'Archange Expurgateur, Le Bras Armé des Dieux). 16 years of clinical and athletic work in one document.
                </p>
              </div>
              <div className="text-left md:text-right shrink-0">
                {IS_LAUNCH_WEEK ? (
                  <>
                    <p className="text-zinc-600 line-through text-lg font-black italic">€199</p>
                    <p className="text-white text-3xl md:text-4xl font-black italic">€150</p>
                    <p className="text-blue-600 text-[9px] font-black uppercase tracking-[0.3em] italic mt-1">Launch Week</p>
                  </>
                ) : (
                  <p className="text-white text-3xl md:text-4xl font-black italic">€199</p>
                )}
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-blue-600/20 flex items-center justify-between">
              <span className="text-zinc-500 italic normal-case text-xs md:text-sm">
                More in 8 months than 8 previous years.
              </span>
              <span className="text-blue-600 group-hover:text-white text-[10px] font-black uppercase tracking-[0.3em] italic transition-colors">
                Acquire →
              </span>
            </div>
          </Link>
        </div>

        {/* SECONDARY ACTIONS */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-sm mx-auto md:max-w-3xl">
          <Link 
            href="/supervision" 
            className="group relative border border-zinc-800 bg-black px-8 md:px-10 py-5 md:py-6 text-center hover:border-blue-600 hover:bg-zinc-950 transition-all duration-300 no-underline w-full"
          >
            <span className="block text-[9px] font-black uppercase tracking-widest md:tracking-[0.4em] text-zinc-600 group-hover:text-blue-600 mb-2 transition-colors">
              1:1 Human Interface
            </span>
            <span className="block text-xl font-black uppercase tracking-tight text-white italic">
              Supervision App
            </span>
          </Link>
          
          <Link 
            href="/articles" 
            className="group relative border border-zinc-800 bg-zinc-900/20 px-8 md:px-10 py-5 md:py-6 text-center hover:border-zinc-500 hover:bg-zinc-900/40 transition-all duration-300 no-underline w-full"
          >
            <span className="block text-[9px] font-black uppercase tracking-widest md:tracking-[0.4em] text-zinc-600 group-hover:text-zinc-400 mb-2 transition-colors">
              Read Theory
            </span>
            <span className="block text-xl font-black uppercase tracking-tight text-zinc-300 group-hover:text-white italic">
              Articles
            </span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-4 z-10">
        <span className="text-zinc-800 text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em]">
          System v2.0.26 // Built by the Architect
        </span>
      </div>

    </main>
  )
}
