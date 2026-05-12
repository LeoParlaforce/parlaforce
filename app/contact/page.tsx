import Link from 'next/link'

export const metadata = {
  title: 'Contact | Par la force',
  description: 'Questions, feedback, or partnership inquiries. Contact Leo Gayrard at Par la force.',
  alternates: {
    canonical: 'https://parlaforce.com/contact',
  },
  openGraph: {
    title: 'Contact | Par la force',
    description: 'Questions, feedback, or partnership inquiries.',
    url: 'https://parlaforce.com/contact',
    type: 'website',
  },
}

export default function Contact() {
  return (
    <main className="min-h-screen bg-black text-white font-sans lowercase relative px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-blue-500 transition-colors no-underline mb-16 group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Back to Home
        </Link>

        <h1 className="text-white text-5xl font-black tracking-tighter mb-6 uppercase leading-none italic">
          Contact<span className="text-blue-600">.</span>
        </h1>

        <p className="text-zinc-400 text-xl italic normal-case leading-relaxed mb-16 max-w-lg">
          Questions, feedback, or inquiries about programs and supervision.
        </p>

        <div className="border border-zinc-900 bg-zinc-950/30 p-10">
          <h2 className="text-white font-bold uppercase text-xs tracking-[0.3em] mb-4">Email</h2>
          <p className="text-zinc-500 text-sm italic normal-case leading-relaxed mb-6">
            Responses within 48 hours on business days.
          </p>
          <a
            href="mailto:leo.gayrard@gmail.com"
            className="inline-block bg-blue-600 text-white font-black uppercase py-4 px-8 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all"
          >
            leo.gayrard@gmail.com
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/programs"
            className="border border-zinc-900 bg-zinc-950/30 p-6 hover:border-blue-600 transition-all group"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">Programs</p>
            <p className="text-white font-black uppercase italic tracking-tight group-hover:text-blue-500 transition-colors">Acquire Elite →</p>
          </Link>
          <Link
            href="/supervision"
            className="border border-zinc-900 bg-zinc-950/30 p-6 hover:border-blue-600 transition-all group"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">Supervision</p>
            <p className="text-white font-black uppercase italic tracking-tight group-hover:text-blue-500 transition-colors">1:1 Coaching →</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
