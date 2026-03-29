import Link from 'next/link'

export const metadata = {
  title: "Contact — Par la force",
  description: "Contact Leo Gayrard for questions about training protocols, articles, or supervision.",
  alternates: {
    canonical: 'https://parlaforce.com/contact',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 font-sans">

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-blue-500 transition-colors no-underline mb-16 group"
      >
        <span className="text-lg group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Back to Home
      </Link>

      <h1 className="text-white text-5xl font-black tracking-tight mb-6 uppercase leading-none italic">
        Contact<span className="text-blue-600">.</span>
      </h1>

      <p className="text-zinc-400 text-xl leading-relaxed mb-16 italic normal-case">
        Questions about protocols, articles, or supervision? Reach the architect directly.
      </p>

      {/*
        FIX : suppression du composant client "use client" inutile.
        Un simple mailto: href fait exactement la même chose sans JavaScript.
        Moins de JS = meilleure performance = meilleur score Core Web Vitals.
      */}
      <div className="space-y-8">

        <a
          href="mailto:leo.gayrard@gmail.com?subject=Inquiry — Par la force"
          className="group flex items-center justify-between border border-zinc-800 bg-zinc-950 p-8 hover:border-blue-600 hover:bg-zinc-900 transition-all"
        >
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-blue-600 mb-2 transition-colors">
              Primary Contact
            </p>
            <p className="text-white font-black uppercase italic text-xl tracking-tight">
              leo.gayrard@gmail.com
            </p>
          </div>
          <span className="text-blue-600 font-black text-2xl group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
        </a>

        <a
          href="https://www.instagram.com/par_la_force/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between border border-zinc-800 bg-zinc-950 p-8 hover:border-blue-600 hover:bg-zinc-900 transition-all"
        >
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-blue-600 mb-2 transition-colors">
              Instagram
            </p>
            <p className="text-white font-black uppercase italic text-xl tracking-tight">
              @par_la_force
            </p>
          </div>
          <span className="text-blue-600 font-black text-2xl group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
        </a>

        <a
          href="https://chat.troisiemechemin.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between border-2 border-blue-600 bg-blue-600/5 p-8 hover:bg-blue-600/10 transition-all"
        >
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">
              Direct supervision
            </p>
            <p className="text-white font-black uppercase italic text-xl tracking-tight">
              Athletic Intelligence App
            </p>
            <p className="text-zinc-500 text-xs mt-1 normal-case italic">Real-time 1:1 access · 50€/month</p>
          </div>
          <span className="text-blue-600 font-black text-2xl group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
        </a>

      </div>

      <p className="text-zinc-700 text-xs uppercase tracking-widest font-bold mt-12 text-center">
        Response time: 48h on business days
      </p>

    </main>
  )
}
