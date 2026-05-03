import { Metadata } from 'next'
import Link from 'next/link'
import RandomTexture from '@/components/RandomTexture'

export const metadata: Metadata = {
  title: 'ParlaForce | Systems for Physical & Psychological Dominance',
  description: 'Human-led protocols for elite performance. Clinical strength architecture, sports science, and cognitive restructuring without AI interference.',
  alternates: { canonical: 'https://parlaforce.com' },
}

const IS_LAUNCH_WEEK = true;

export default function Home() {
  return (
    <main className="h-screen md:h-screen min-h-[760px] md:min-h-0 flex flex-col items-center justify-center px-4 md:px-6 bg-black font-sans lowercase relative overflow-hidden text-white w-full">
      
      {/* Random texture background */}
      <RandomTexture />
      
      {/* Heavy black overlay for content readability while preserving texture richness on edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Cinematic grain */}
      <div 
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.05]" 
        aria-hidden="true"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")` }}
      />

      {/* Launch banner - top */}
      {IS_LAUNCH_WEEK && (
        <Link 
          href="/programs"
          className="absolute top-0 left-0 right-0 bg-blue-600 py-2 md:py-3 z-20 hover:bg-blue-500 transition-colors"
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

      {/* Top label */}
      <div className={`absolute ${IS_LAUNCH_WEEK ? 'top-12 md:top-16' : 'top-8'} left-1/2 -translate-x-1/2 w-full px-4 text-center z-10`}>
        <span className="text-blue-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] border border-blue-600 px-3 md:px-4 py-1.5 md:py-2 inline-block">
          Clinical Strength Architecture
        </span>
      </div>

      {/* Main content - centered vertically */}
      <div className="max-w-5xl w-full relative z-10 text-center">
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none mb-4 md:mb-6 italic">
          PARLA<span className="text-blue-600">FORCE.</span>
        </h1>
        
        <div className="mb-6 md:mb-8 max-w-2xl mx-auto space-y-3 md:space-y-4 px-2 md:px-0">
          <p className="text-zinc-500 text-[10px] md:text-sm font-bold uppercase tracking-widest md:tracking-[0.3em] leading-relaxed">
            Human-led protocols for psychological &amp; physical dominance.
          </p>
          
          <p className="text-zinc-400 normal-case italic text-sm md:text-base leading-relaxed">
            Protocols designed for the structural reorganization of performance.
          </p>

          <div className="pt-2">
            <span className="bg-blue-600/10 text-blue-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em] px-3 md:px-4 py-1.5 md:py-2 border border-blue-600/20 inline-block">
              NO AI USED — 100% HUMAN INTELLIGENCE
            </span>
          </div>
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
                {IS_LAUNCH_WEEK ? (
                  <>
                    <p className="text-zinc-600 line-through text-sm md:text-base font-black italic leading-none"></p>
                    <p className="text-white text-2xl md:text-3xl font-black italic leading-none mt-1"></p>
                    <p className="text-blue-600 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] italic mt-1">Launch</p>
                  </>
                ) : (
                  <p className="text-white text-2xl md:text-3xl font-black italic"></p>
                )}
              </div>
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-blue-600/20 flex items-center justify-between gap-3">
              <span className="text-zinc-400 italic normal-case text-[11px] md:text-sm leading-tight">
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
            className="group relative border border-zinc-800 bg-black/40 backdrop-blur-sm px-4 md:px-8 py-3 md:py-4 text-center hover:border-blue-600 hover:bg-zinc-950 transition-all duration-300 no-underline flex-1"
          >
            <span className="block text-[8px] md:text-[9px] font-black uppercase tracking-widest md:tracking-[0.3em] text-zinc-600 group-hover:text-blue-600 mb-1 transition-colors">
              1:1 Human Interface
            </span>
            <span className="block text-base md:text-lg font-black uppercase tracking-tight text-white italic leading-none">
              Supervision
            </span>
          </Link>
          
          <Link 
            href="/articles" 
            className="group relative border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm px-4 md:px-8 py-3 md:py-4 text-center hover:border-zinc-500 hover:bg-zinc-900/40 transition-all duration-300 no-underline flex-1"
          >
            <span className="block text-[8px] md:text-[9px] font-black uppercase tracking-widest md:tracking-[0.3em] text-zinc-600 group-hover:text-zinc-400 mb-1 transition-colors">
              Read Theory
            </span>
            <span className="block text-base md:text-lg font-black uppercase tracking-tight text-zinc-300 group-hover:text-white italic leading-none">
              Articles
            </span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4 z-10">
        <span className="text-zinc-700 text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em]">
          System v2.0.26 // Built by the Architect
        </span>
      </div>

    </main>
  )
}
