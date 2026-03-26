import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ParlaForce | Clinical Strength Architecture',
  description: 'Human-led protocols for physical and psychological dominance. Restructuring the internal framework of high-performance output. No AI content.',
  openGraph: {
    title: 'ParlaForce | Clinical Strength Architecture',
    description: 'Structural reorganization of human performance. Beyond mechanics, we target the internal logic of physical capacity.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 bg-black font-sans lowercase relative overflow-hidden text-white">
      
      {/* SYSTÈME DE GRAIN CINÉMATIQUE MULTI-COUCHES */}
      <div 
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.02]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      <div 
        className="pointer-events-none fixed inset-0 z-[102] opacity-[0.025] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='clumpingGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='6' stitchTiles='stitch' seed='13'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23clumpingGrain)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      {/* Label haut de page */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[90%] md:w-full text-center z-10">
        <span className="text-blue-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.5em] border border-blue-600 px-3 md:px-4 py-2 block md:inline-block">
          Clinical Strength Architecture
        </span>
      </div>

      <div className="max-w-5xl w-full relative z-10 py-24 text-center mt-16 md:mt-12">
        
        {/* Titre Principal */}
        <h1 className="text-5xl sm:text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8 italic">
          PARLA<span className="text-blue-600">FORCE.</span>
        </h1>
        
        {/* Sous-titre */}
        <div className="mb-16 max-w-2xl mx-auto space-y-6 px-2 md:px-0">
          <p className="text-zinc-500 text-xs md:text-base font-bold uppercase tracking-widest md:tracking-[0.3em] leading-relaxed">
            Human-led protocols for psychological <br className="hidden md:block" /> and physical dominance.
          </p>
          
          <div className="space-y-2">
            <p className="text-zinc-400 normal-case italic text-base md:text-lg leading-relaxed">
              Protocols designed for the structural reorganization of performance. <br className="hidden md:block" />
              Beyond mechanics, we target the internal logic that dictates physical capacity.
            </p>
          </div>

          <div className="pt-4">
            <span className="bg-blue-600/10 text-blue-600 text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em] px-3 md:px-4 py-2 border border-blue-600/20 block md:inline-block">
              NO AI USED — 100% HUMAN INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link 
            href="/programs" 
            className="group relative border border-zinc-800 bg-black px-8 md:px-12 py-6 md:py-8 text-center hover:border-blue-600 hover:bg-zinc-950 transition-all duration-300 no-underline w-full max-w-[280px]"
          >
            <span className="block text-[9px] font-black uppercase tracking-widest md:tracking-[0.4em] text-zinc-600 group-hover:text-blue-600 mb-2 transition-colors">
              Acquire Protocols
            </span>
            <span className="block text-2xl font-black uppercase tracking-tight text-white italic">
              Systems
            </span>
          </Link>
          
          <Link 
            href="/articles" 
            className="group relative border border-zinc-800 bg-zinc-900/20 px-8 md:px-12 py-6 md:py-8 text-center hover:border-zinc-500 hover:bg-zinc-900/40 transition-all duration-300 no-underline w-full max-w-[280px]"
          >
            <span className="block text-[9px] font-black uppercase tracking-widest md:tracking-[0.4em] text-zinc-600 group-hover:text-zinc-400 mb-2 transition-colors">
              Read Theory
            </span>
            <span className="block text-2xl font-black uppercase tracking-tight text-zinc-300 group-hover:text-white italic">
              Articles
            </span>
          </Link>
        </div>
      </div>

      {/* Footer / Versioning */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-[90%] md:w-full z-10">
        <span className="text-zinc-800 text-[8px] md:text-[10px] font-black uppercase tracking-widest md:tracking-[0.4em]">
          System v2.0.26 // Built by the Architect
        </span>
      </div>

    </main>
  )
}