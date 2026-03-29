import Link from 'next/link'

export const metadata = {
  title: "Editorial Standards — Par la force",
  description: "How Par la force ensures accuracy, credibility, and independence in all athletic performance content. Written by a licensed psychologist.",
  alternates: {
    canonical: 'https://parlaforce.com/editorial-standards',
  },
  openGraph: {
    title: "Editorial Standards — Par la force",
    description: "How Par la force ensures accuracy, credibility, and independence in all content.",
    url: 'https://parlaforce.com/editorial-standards',
    type: 'website',
  },
}

export default function EditorialStandards() {
  // JSON-LD : WebPage lié à l'organisation, signale la crédibilité éditoriale à Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://parlaforce.com/editorial-standards",
    "name": "Editorial Standards — Par la force",
    "url": "https://parlaforce.com/editorial-standards",
    "description": "How Par la force ensures accuracy, credibility, and independence in all athletic performance content.",
    "publisher": { "@id": "https://parlaforce.com/#organization" },
    "author": { "@id": "https://parlaforce.com/#author" },
    // speakable aide Google à identifier le contenu clé pour la recherche vocale
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2"]
    }
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
        Editorial Standards
      </h1>

      <p className="text-zinc-300 text-xl leading-relaxed font-medium mb-16">
        How we ensure accuracy, credibility, and independence in every article and guide.
      </p>

      <section aria-labelledby="certified-heading">
        <h2 id="certified-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Written by Certified Professionals
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          All content on Par la force is produced by <strong className="text-white">Leo Gayrard</strong>. Our guidance and technical articles are based on professional psychological training, sports science research (biomechanics and physiology), and extensive field experience in strength athletics.
        </p>
      </section>

      <section aria-labelledby="research-heading">
        <h2 id="research-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Research-Backed Content
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Every claim regarding performance, health, or technique is supported by peer-reviewed studies and established athletic principles. When evidence is preliminary or limited, it is clearly identified as such to ensure full transparency.
        </p>
      </section>

      <section aria-labelledby="review-heading">
        <h2 id="review-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Our Review Process
        </h2>
        <ol className="list-none p-0 space-y-4 text-zinc-400">
          <li>
            <strong className="text-zinc-200 uppercase text-xs tracking-widest block mb-1">01. Drafting</strong>
            Initial research and article creation by a certified professional expert.
          </li>
          <li>
            <strong className="text-zinc-200 uppercase text-xs tracking-widest block mb-1">02. Fact-checking</strong>
            Verification of all evidence, citations, and sources against current scientific literature.
          </li>
          <li>
            <strong className="text-zinc-200 uppercase text-xs tracking-widest block mb-1">03. Expert review</strong>
            A final technical review focusing on accuracy, clarity, and safety of the recommendations.
          </li>
          <li>
            <strong className="text-zinc-200 uppercase text-xs tracking-widest block mb-1">04. Final Validation</strong>
            The article is published only once it meets our rigorous standards for athletic intelligence.
          </li>
        </ol>
      </section>

      <section aria-labelledby="update-heading">
        <h2 id="update-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Update Frequency
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          The field of sports science is constantly evolving. We review our core guides and articles regularly to ensure they reflect the most recent data and professional standards.
        </p>
      </section>

      <section aria-labelledby="independence-heading">
        <h2 id="independence-heading" className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
          Editorial Independence
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          Par la force maintains absolute editorial independence. Our content is never influenced by advertisers, sponsors, or third-party affiliate programs. Our priority is the accuracy of the information and the performance of our readers.
        </p>
      </section>

      <div className="mt-24 p-10 border border-zinc-900 bg-zinc-950/50">
        <h3 className="text-white font-bold uppercase mb-4 text-xs tracking-[0.3em]">Corrections Policy</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Accuracy is our foundation. If you believe an article contains an error, please report it to{' '}
          <a
            href="mailto:leo.gayrard@gmail.com"
            className="text-blue-600 hover:text-blue-400 transition-colors no-underline font-bold"
          >
            leo.gayrard@gmail.com
          </a>
          . We investigate all reports and issue corrections promptly.
        </p>
      </div>
    </main>
  )
}
