import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Training Systems & Psychological Protocols | No AI",
  description: "Human-led psychological coaching and training systems for strength athletes. No AI. Direct access to expert clinical psychology and performance protocols.",
  alternates: {
    canonical: "https://parlaforce.com/programs",
  },
}

const mainApp = {
  id: "athletic-intelligence",
  title: "ATHLETIC INTELLIGENCE",
  price: "50€",
  period: "/month",
  description: "Direct encrypted chat access to a specialized clinical psychologist. Real-time guidance on training, nutrition, and the unique psychological architecture of high performance.",
  link: "https://chat.troisiemechemin.fr",
}

const guides = [
  {
    title: "Psychological Guide",
    subtitle: "Stop being a little b!tch in strength sports",
    price: "15€",
    description: "Elite mindset training to break mental barriers and execute under pressure.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBq3zDeJ5HH",
  },
  {
    title: "Create Your Program",
    subtitle: "Customization & Design",
    price: "12€",
    description: "Master the variables of strength. Learn to build or adapt any training system.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBqOQE5vPij",
  },
  {
    title: "Mobility",
    subtitle: "Reinforce your body",
    price: "12€",
    description: "Bulletproof your joints and optimize your movement for heavy lifting.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBq2zrmKT7o",
  },
  {
    title: "The Diet",
    subtitle: "English Version",
    price: "9€",
    description: "Science-based nutrition strategies to fuel performance and body composition.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBq5UnMtkxl",
  },
  {
    title: "Strongman",
    subtitle: "Training Systems",
    price: "9€",
    description: "Specific programming for unconventional strength and explosive power.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBqT1Eicmj9",
  },
]

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-24">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic">
            SYSTEMS<span className="text-blue-600">.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className="text-zinc-500 text-sm md:text-base max-w-xl uppercase tracking-[0.3em] font-bold leading-relaxed">
              Human-led protocols for psychological and physical dominance.
            </p>
            <span className="text-blue-600 text-[10px] font-black tracking-[0.4em] uppercase border border-blue-600 px-3 py-1 w-fit">
              NO AI CONTENT
            </span>
          </div>
        </header>

        {/* GUIDES GRID */}
        <section className="mb-32">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-12 border-b border-zinc-900 pb-4">
            Specialized Human Intelligence Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {guides.map((guide, idx) => (
              <div key={idx} className="group border border-zinc-800 p-8 flex flex-col hover:border-zinc-500 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-black uppercase leading-tight tracking-tight max-w-[70%]">
                    {guide.title}
                    <span className="block text-zinc-500 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
                      {guide.subtitle}
                    </span>
                  </h3>
                  <span className="text-xl font-black italic">{guide.price}</span>
                </div>
                <p className="text-zinc-500 text-sm mb-10 flex-grow leading-relaxed italic">
                  {guide.description}
                </p>
                <a 
                  href={guide.link}
                  className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-zinc-800 pb-2 self-start hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  Acquire Knowledge
                </a>
              </div>
            ))}

            {/* FREE GUIDE (Home Gym) */}
            <div className="border border-zinc-800 p-8 flex flex-col bg-zinc-900/20">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-black uppercase leading-tight tracking-tight">
                  Home Gym
                  <span className="block text-blue-500 text-[10px] mt-1 uppercase font-black tracking-widest">
                    Free Human Resource
                  </span>
                </h3>
                <span className="text-xl font-black italic text-blue-500">0€</span>
              </div>
              <p className="text-zinc-500 text-sm mb-10 flex-grow leading-relaxed">
                The essential guide to building your own temple of strength.
              </p>
              <Link 
                href="/protected_pdfs/home gym - guide.pdf"
                className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-blue-500 pb-2 self-start hover:text-white transition-all text-blue-500"
              >
                Download PDF
              </Link>
            </div>
          </div>
        </section>

        {/* TRUST SECTION: THE EXPERT */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-y border-zinc-900 py-20">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6">The Architect</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 italic">Clinical Expertise <br/> meets Raw Performance.</h3>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Unlike AI-generated templates, every protocol here is built by a licensed Clinical Psychologist specializing in the psycho-pathology of performance. 
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We don't just optimize your sets and reps; we restructure the cognitive architecture that dictates your physical output.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-zinc-800 p-6 text-center">
              <div className="text-3xl font-black mb-1 italic">100%</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Human Intelligence</div>
            </div>
            <div className="border border-zinc-800 p-6 text-center">
              <div className="text-3xl font-black mb-1 italic">Licensed</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Clinical Psych</div>
            </div>
            <div className="border border-zinc-800 p-6 text-center">
              <div className="text-3xl font-black mb-1 italic">Direct</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Encrypted Chat</div>
            </div>
            <div className="border border-zinc-800 p-6 text-center">
              <div className="text-3xl font-black mb-1 italic">Elite</div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Strength Protocols</div>
            </div>
          </div>
        </section>

        {/* FEATURED: THE APP (The 1:1 Connection) */}
        <section className="mb-24">
          <div className="group relative border-2 border-blue-600 bg-zinc-950 p-8 md:p-16 overflow-hidden transition-all">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                    DIRECT HUMAN INTERFACE
                  </span>
                  <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-600 px-2 py-0.5">
                    ZERO ALGORITHMS
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic">
                  {mainApp.title}
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-6">
                  {mainApp.description}
                </p>
                <ul className="text-zinc-600 text-xs uppercase font-bold tracking-[0.2em] space-y-3">
                  <li>• Direct 1:1 Dialogue with a Clinical Expert</li>
                  <li>• Evidence-Based Performance Psychology</li>
                  <li>• High-Resolution Training & Nutrition Strategy</li>
                </ul>
              </div>
              <div className="text-left lg:text-right w-full lg:w-auto">
                <div className="text-6xl font-black mb-8 italic">
                  {mainApp.price}<span className="text-xl text-zinc-500 font-normal"> {mainApp.period}</span>
                </div>
                <a 
                  href={mainApp.link}
                  className="inline-block w-full lg:w-auto bg-white text-black hover:bg-blue-600 hover:text-white font-black uppercase py-6 px-14 transition-all text-sm tracking-widest text-center"
                >
                  Start The Conversation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Footer */}
        <div className="flex justify-center pt-12">
          <Link href="/" className="text-zinc-800 hover:text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] transition-all">
            ← Back to Intelligence
          </Link>
        </div>
      </div>
    </div>
  )
}