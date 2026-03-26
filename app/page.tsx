import { Metadata } from 'next'
import Link from 'next/link'

// OPTIMISATION SEO & MÉTA-DONNÉES
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
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-black font-sans lowercase relative overflow-hidden text-white">
      
      {/* Label haut de page */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full text-center">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] border border-blue-600 px-4 py-2">
          Clinical Strength Architecture
        </span>
      </div>

      <div className="max-w-5xl w-full relative z-10 py-24 text-center mt-12">
        
        {/* Titre Principal */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8 italic">
          PARLA<span className="text-blue-600">FORCE.</span>
        </h1>
        
        {/* Sous-titre : Approche structurelle sans jargon */}
        <div className="mb-16 max-w-2xl mx-auto space-y-6">
          <p className="text-zinc-500 text-sm md:text-base font-bold uppercase tracking-[0.3em] leading-relaxed">
            Human-led protocols for psychological <br className="hidden md:block" /> and physical dominance.
          </p>
          
          <div className="space-y-2">
            <p className="text-zinc-400 normal-case italic text-lg leading-relaxed">
              Protocols designed for the structural reorganization of performance. <br className="hidden md:block" />
              Beyond mechanics, we target the internal logic that dictates physical capacity.
            </p>
          </div>

          <div className="pt-4">
            <span className="bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] px-4 py-2 border border-blue-600/20">
              NO AI USED — 100% HUMAN INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Boutons d'action (Design Brutaliste) */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link 
            href="/programs" 
            className="group relative border border-zinc-800 bg-black px-12 py-8 text-center hover:border-blue-600 hover:bg-zinc-950 transition-all duration-300 no-underline min-w-[280px]"
          >
            <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-blue-600 mb-2 transition-colors">
              Acquire Protocols
            </span>
            <span className="block text-2xl font-black uppercase tracking-tight text-white italic">
              Systems
            </span>
          </Link>
          
          <Link 
            href="/articles" 
            className="group relative border border-zinc-800 bg-zinc-900/20 px-12 py-8 text-center hover:border-zinc-500 hover:bg-zinc-900/40 transition-all duration-300 no-underline min-w-[280px]"
          >
            <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-zinc-400 mb-2 transition-colors">
              Read Theory
            </span>
            <span className="block text-2xl font-black uppercase tracking-tight text-zinc-300 group-hover:text-white italic">
              Articles
            </span>
          </Link>
        </div>
      </div>

      {/* Footer / Versioning */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full">
        <span className="text-zinc-800 text-[10px] font-black uppercase tracking-[0.4em]">
          System v2.0.26 // Built by the Architect
        </span>
      </div>

    </main>
  )
}