import Link from 'next/link'

export const metadata = {
  title: "Editorial Standards — Par la force",
  description: "How Par la force ensures accuracy, credibility, and independence in all athletic performance content.",
}

export default function EditorialStandards() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 prose prose-invert prose-zinc font-sans">
      {/* Navigation */}
      <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-blue-500 transition-colors no-underline mb-16 group">
        <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Back to Home
      </Link>

      <h1 className="text-white text-5xl font-black tracking-tight mb-12 uppercase leading-none">
        Editorial Standards
      </h1>
      
      <p className="text-zinc-300 text-xl leading-relaxed font-medium">
        How we ensure accuracy, credibility, and independence in every article and guide.
      </p>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Written by Certified Professionals
      </h2>
      <p className="text-zinc-400 leading-relaxed">
        All content on Par la force is produced by Leo Gayrard. Our guidance and technical articles are based on professional psychological training, sports science research (biomechanics and physiology), and extensive field experience in strength athletics.
      </p>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Research-Backed Content
      </h2>
      <p className="text-zinc-400 leading-relaxed">
        Every claim regarding performance, health, or technique is supported by peer-reviewed studies and established athletic principles. When evidence is preliminary or limited, it is clearly identified as such to ensure full transparency.
      </p>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Our Review Process
      </h2>
      <ul className="list-none p-0 space-y-4 text-zinc-400">
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
          The article is only published once it meets our rigorous standards for athletic intelligence.
        </li>
      </ul>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Update Frequency
      </h2>
      <p className="text-zinc-400 leading-relaxed">
        The field of sports science is constantly evolving. We review our core guides and articles regularly to ensure they reflect the most recent data and professional standards.
      </p>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Editorial Independence
      </h2>
      <p className="text-zinc-400 leading-relaxed">
        Par la force maintains absolute editorial independence. Our content is never influenced by advertisers, sponsors, or third-party affiliate programs. Our priority is the accuracy of the information and the performance of our readers.
      </p>

      <div className="mt-24 p-10 border border-zinc-900 bg-zinc-950/50">
        <h3 className="text-white font-bold uppercase mb-4 text-xs tracking-[0.3em]">Corrections Policy</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Accuracy is our foundation. If you believe an article contains an error, please report it to <a href="mailto:leo.gayrard@gmail.com" className="text-blue-600 hover:text-blue-400 transition-colors no-underline font-bold">leo.gayrard@gmail.com</a>. We investigate all reports and issue corrections promptly.
        </p>
      </div>
    </main>
  )
}