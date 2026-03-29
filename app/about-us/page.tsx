import Link from 'next/link'

export const metadata = {
  title: "About Us — Par la force",
  description: "Meet Leo Gayrard, licensed psychologist and strength athlete. Learn the mission behind Par la force — evidence-based athletic intelligence.",
  alternates: {
    canonical: 'https://parlaforce.com/about-us',
  },
  openGraph: {
    title: "About Us — Par la force",
    description: "Licensed psychologist and strength athlete. Evidence-based athletic intelligence.",
    url: 'https://parlaforce.com/about-us',
    type: 'profile',
  },
}

export default function AboutUs() {
  // JSON-LD : AboutPage lié à l'auteur défini dans le layout
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://parlaforce.com/about-us",
    "name": "About Par la force",
    "url": "https://parlaforce.com/about-us",
    "description": "Meet Leo Gayrard, licensed psychologist and strength athlete behind Par la force.",
    "publisher": { "@id": "https://parlaforce.com/#organization" },
    "mainEntity": { "@id": "https://parlaforce.com/#author" }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-blue-500 transition-colors no-underline mb-16 group"
      >
        <span className="text-lg group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Back to Home
      </Link>

      <h1 className="text-white text-5xl font-black tracking-tight mb-6 uppercase leading-none italic">
        About Par la force
      </h1>

      <p className="text-zinc-300 text-xl leading-relaxed font-medium mb-16">
        Research-backed athletic guidance from a licensed psychologist and strength athlete.
      </p>

      <section aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Our Mission
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Par la force exists to provide reliable, evidence-based athletic resources, guides, and insights. Every article and guide is grounded in research, clinical experience, and ethical practice. We bridge the gap between complex sports science and practical application.
        </p>
      </section>

      <section aria-labelledby="who-heading">
        <h2 id="who-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Who We Are
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Par la force is operated by <strong className="text-white">Leo Gayrard</strong>, a licensed psychologist and dedicated strength athlete. Our guidance combines professional academic training, clinical experience, and years of competitive strength training to deliver practical, reliable, and psychologically sound athletic insights.
        </p>
      </section>

      <section aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Why Par la force
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          We make athletic knowledge accessible, structured, and useful. Whether you are exploring hypertrophy, maximum strength, or performance optimization, every guide is evidence-backed and professionally validated.
        </p>
      </section>

      <section aria-labelledby="editorial-heading">
        <h2 id="editorial-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Our Editorial Process
        </h2>
        {/* FIX : <ol> sémantique pour une liste ordonnée de processus */}
        <ol className="list-none p-0 space-y-4 text-zinc-400">
          <li><strong className="text-zinc-200 uppercase text-xs tracking-widest">01. Research and drafting:</strong> Articles written by a certified professional.</li>
          <li><strong className="text-zinc-200 uppercase text-xs tracking-widest">02. Fact-checking:</strong> Evidence and sources verified against peer-reviewed studies.</li>
          <li><strong className="text-zinc-200 uppercase text-xs tracking-widest">03. Technical review:</strong> Review for accuracy and compliance with sports science.</li>
          <li><strong className="text-zinc-200 uppercase text-xs tracking-widest">04. Regular updates:</strong> Content updated to reflect the latest research and standards.</li>
        </ol>
      </section>

      <section aria-labelledby="find-heading">
        <h2 id="find-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-8 border-l-4 border-blue-600 pl-4">
          What You Will Find Here
        </h2>
        <ul className="list-none p-0 space-y-8">
          <li>
            <Link href="/articles" className="text-zinc-300 hover:text-blue-500 transition-colors no-underline group block">
              <strong className="text-white uppercase tracking-wider block group-hover:text-blue-500">Complete Guides</strong>
              <span className="text-sm text-zinc-500">Practical, evidence-based articles and training documentation.</span>
            </Link>
          </li>
          <li>
            <Link href="/articles" className="text-zinc-300 hover:text-blue-500 transition-colors no-underline group block">
              <strong className="text-white uppercase tracking-wider block group-hover:text-blue-500">Performance Insights</strong>
              <span className="text-sm text-zinc-500">In-depth sports science and physiological analysis.</span>
            </Link>
          </li>
          <li>
            <Link href="/programs" className="text-zinc-300 hover:text-blue-400 transition-colors no-underline group block">
              <strong className="text-blue-400 uppercase tracking-wider block group-hover:text-blue-300">Training Programs</strong>
              <span className="text-sm text-zinc-500">Structured and progressive approaches to elite performance.</span>
            </Link>
          </li>
          <li>
            <Link href="/programs" className="text-zinc-300 hover:text-blue-400 transition-colors no-underline group block">
              <strong className="text-blue-400 uppercase tracking-wider block group-hover:text-blue-300">Resources</strong>
              <span className="text-sm text-zinc-500">Specific exercises, techniques, and reflections.</span>
            </Link>
          </li>
        </ul>
      </section>

      {/* CTA CONVERSION : ajout d'un bloc d'appel à l'action avant le contact */}
      <div className="mt-20 p-10 border border-blue-600/20 bg-blue-600/5 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">Ready to start?</p>
        <h3 className="text-white font-black uppercase italic text-2xl tracking-tighter mb-6">
          Access the Protocols<span className="text-blue-600">.</span>
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/programs"
            className="bg-blue-600 text-white font-black uppercase py-3 px-8 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all"
          >
            View PDF Protocols
          </Link>
          <Link
            href="/articles"
            className="border border-zinc-700 text-zinc-400 font-black uppercase py-3 px-8 text-[10px] tracking-[0.3em] hover:border-blue-600 hover:text-blue-600 transition-all"
          >
            Read Articles
          </Link>
        </div>
      </div>

      <div className="mt-12 p-10 border border-zinc-900 bg-zinc-950/50">
        <h3 className="text-white font-bold uppercase mb-4 text-xs tracking-[0.3em]">Contact Us</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Questions, feedback, or suggestions? Email:{' '}
          <a
            href="mailto:leo.gayrard@gmail.com"
            className="text-blue-600 hover:text-blue-400 transition-colors no-underline font-bold"
          >
            leo.gayrard@gmail.com
          </a>
          . We respond within 48 hours on business days.
        </p>
      </div>
    </main>
  )
}
