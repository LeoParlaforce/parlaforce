import Link from 'next/link'

export const metadata = {
  title: "Legal Notice — Par la force",
  description: "Legal information for Par la force. Owner: Leo Gayrard, licensed psychologist.",
  alternates: {
    canonical: 'https://parlaforce.com/legal-notice',
  },
  // On demande à Google de ne pas indexer cette page (inutile pour le SEO)
  robots: {
    index: false,
    follow: true,
  },
}

export default function Legal() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 font-sans">

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-blue-500 transition-colors no-underline mb-16 group"
      >
        <span className="text-lg group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Back to Home
      </Link>

      <h1 className="text-white text-5xl font-black tracking-tight mb-6 uppercase leading-none italic">
        Legal Notice
      </h1>

      <p className="text-zinc-500 text-sm mb-16 uppercase tracking-widest font-bold">
        Mandatory information in accordance with French law (LCEN).
      </p>

      <section aria-labelledby="publisher-heading" className="mb-12">
        <h2 id="publisher-heading" className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
          Publisher
        </h2>
        <div className="space-y-3 text-zinc-400 text-sm leading-relaxed">
          <p><span className="text-zinc-200 font-bold uppercase text-xs tracking-widest">Owner:</span> Léo Gayrard</p>
          <p><span className="text-zinc-200 font-bold uppercase text-xs tracking-widest">SIRET:</span> 53816800600020</p>
          <p><span className="text-zinc-200 font-bold uppercase text-xs tracking-widest">Address:</span> 1184 route de la maurette, 83520 Roquebrune-sur-Argens, France</p>
          <p>
            <span className="text-zinc-200 font-bold uppercase text-xs tracking-widest">Email:</span>{' '}
            <a href="mailto:leo.gayrard@gmail.com" className="text-blue-600 hover:text-blue-400 transition-colors">
              leo.gayrard@gmail.com
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="hosting-heading" className="mb-12">
        <h2 id="hosting-heading" className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
          Hosting
        </h2>
        <div className="space-y-3 text-zinc-400 text-sm leading-relaxed">
          <p><span className="text-zinc-200 font-bold uppercase text-xs tracking-widest">Provider:</span> Vercel Inc.</p>
          <p><span className="text-zinc-200 font-bold uppercase text-xs tracking-widest">Address:</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
          <p>
            <span className="text-zinc-200 font-bold uppercase text-xs tracking-widest">Website:</span>{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-400 transition-colors">
              vercel.com
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="ip-heading">
        <h2 id="ip-heading" className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
          Intellectual Property
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          All content on this site (articles, guides, protocols, design) is the exclusive property of Léo Gayrard / Par la force. Any reproduction without prior written consent is strictly prohibited.
        </p>
      </section>

    </main>
  )
}
