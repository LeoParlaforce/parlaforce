import Link from 'next/link'

export const metadata = {
  title: "About Us — Par la force",
  description: "Meet Leo Gayrard, certified psychologist and strength athlete, and learn about the mission behind Par la force.",
}

export default function AboutUs() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 prose prose-invert prose-zinc font-sans">
      {/* Navigation élégante */}
      <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-blue-500 transition-colors no-underline mb-16 group">
        <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span> Back to Home
      </Link>

      <h1 className="text-white text-5xl font-black tracking-tight mb-12 uppercase leading-none">
        About Par la force
      </h1>
      
      <p className="text-zinc-300 text-xl leading-relaxed font-medium">
        Research-backed athletic guidance from a certified psychologist and strength athlete.
      </p>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Our Mission
      </h2>
      <p className="text-zinc-400 leading-relaxed">
        Par la force exists to provide reliable, evidence-based athletic resources, guides, and insights. Every article and guide is grounded in research, clinical experience, and ethical practice. We aim to bridge the gap between complex sports science and practical application.
      </p>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Who We Are
      </h2>
      <p className="text-zinc-400 leading-relaxed">
        Par la force is operated by Leo Gayrard, a licensed psychologist and dedicated strength athlete. Our guidance combines professional academic training, clinical experience, and years of competitive strength training to ensure practical, reliable, and psychologically sound athletic insights.
      </p>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Why Par la force
      </h2>
      <p className="text-zinc-400 leading-relaxed">
        We aim to make athletic knowledge accessible, structured, and useful. Whether exploring hypertrophy, maximum strength, or performance optimization, every guide is evidence-backed and professionally validated to ensure you get the most out of your training.
      </p>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-6 border-l-4 border-blue-600 pl-4">
        Our Editorial Process
      </h2>
      <ul className="list-none p-0 space-y-4 text-zinc-400">
        <li><strong className="text-zinc-200 uppercase text-xs tracking-widest">01. Research and drafting:</strong> Articles written by a certified professional.</li>
        <li><strong className="text-zinc-200 uppercase text-xs tracking-widest">02. Fact-checking:</strong> Evidence and sources verified against peer-reviewed studies.</li>
        <li><strong className="text-zinc-200 uppercase text-xs tracking-widest">03. Technical review:</strong> Review for accuracy and compliance with sports science.</li>
        <li><strong className="text-zinc-200 uppercase text-xs tracking-widest">04. Regular updates:</strong> Content updated to reflect the latest research and standards.</li>
      </ul>

      <h2 className="text-white text-xl font-bold uppercase tracking-widest mt-16 mb-8 border-l-4 border-blue-600 pl-4">
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

      <div className="mt-24 p-10 border border-zinc-900 bg-zinc-950/50">
        <h3 className="text-white font-bold uppercase mb-4 text-xs tracking-[0.3em]">Contact Us</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">
          Questions, feedback, or suggestions? Email: <a href="mailto:leo.gayrard@gmail.com" className="text-blue-600 hover:text-blue-400 transition-colors no-underline font-bold">leo.gayrard@gmail.com</a>. We respond within 48 hours on business days.
        </p>
      </div>
    </main>
  )
}