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
    title: "Psychological Protocol",
    subtitle: "Stop being a little b!tch in strength sports",
    price: "15€",
    description: "Analysis of performance inhibition. How to manage the subjective limit under heavy mechanical load without the noise of mainstream motivation.",
    features: ["Failure Confrontation", "Focus Architecture", "Pressure Management"],
    references: "Ref: Journal of Applied Sport Psychology (2024); Clinical performance standards.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBq3zDeJ5HH",
  },
  {
    title: "Create Your Program",
    subtitle: "Customization & Design",
    price: "12€",
    description: "Master the variables of strength. Learn to build, adapt, and scale any training system with mechanical precision.",
    features: ["Programming Logic", "Variable Scaling", "System Design"],
    references: "Ref: Strength & Conditioning Research; Periodization Models.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBqOQE5vPij",
  },
  {
    title: "Mobility",
    subtitle: "Reinforce your body",
    price: "12€",
    description: "Bulletproof your joints and optimize your movement patterns for high-intensity heavy lifting.",
    features: ["Joint Integrity", "Movement Optimization", "Injury Prevention"],
    references: "Ref: Clinical Biomechanics; Sports Medicine Standards.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBq2zrmKT7o",
  },
  {
    title: "Architectural Nutrition",
    subtitle: "Protocol 01: English Version",
    price: "9€",
    description: "A clinical framework for performance. Focus on energy kinetics, structural macronutrient ratios, and biological reset through fasting.",
    features: ["Metabolic Equations", "Leucine Threshold", "72h Fasting Protocols"],
    references: "Ref: JISSN (2023); Longo & Mattson (2014); Mifflin-St Jeor (1990).",
    link: "https://buy.stripe.com/6oE2bfGzln310EBq5UnMtkxl",
  },
  {
    title: "Strongman",
    subtitle: "Training Systems",
    price: "9€",
    description: "Specific programming for unconventional strength, explosive power, and structural durability.",
    features: ["Unconventional Force", "Explosive Power", "Specific Loading"],
    references: "Ref: International Journal of Sports Science; Elite Strength Standards.",
    link: "https://buy.stripe.com/6oE2bfGzln310EBqT1Eicmj9",
  },
]

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 font-sans lowercase">
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
              <a 
                key={idx} 
                href={guide.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-zinc-800 p-8 flex flex-col hover:border-blue-600 hover:bg-zinc-950 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-black uppercase leading-tight tracking-tight max-w-[75%] group-hover:text-blue-500 transition-colors">
                    {guide.title}
                    <span className="block text-zinc-600 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
                      {guide.subtitle}
                    </span>
                  </h3>
                  <span className="text-xl font-black italic text-zinc-400 group-hover:text-white">{guide.price}</span>
                </div>
                
                <p className="text-zinc-500 text-sm mb-6 flex-grow leading-relaxed normal-case italic">
                  {guide.description}
                </p>

                <div className="space-y-2 mb-8 text-[9px] uppercase tracking-widest text-zinc-700 font-bold group-hover:text-zinc-500">
                  {guide.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-600 rounded-full" /> {f}
                    </div>
                  ))}
                </div>

                <div className="mb-6 p-3 bg-black border border-zinc-900 group-hover:border-blue-900 transition-colors">
                  <p className="text-[8px] text-zinc-600 font-mono leading-tight italic">
                    {guide.references}
                  </p>
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-zinc-800 pb-2 self-start group-hover:text-blue-600 group-hover:border-blue-600 transition-all">
                  Acquire Protocol
                </div>
              </a>
            ))}

            {/* FREE GUIDE (Home Gym) - Fully Clickable */}
            <Link 
              href="/protected_pdfs/home gym - guide.pdf"
              className="group border border-zinc-800 p-8 flex flex-col bg-zinc-900/20 hover:border-blue-500 hover:bg-zinc-900/40 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-black uppercase leading-tight tracking-tight">
                  Home Gym
                  <span className="block text-blue-500 text-[10px] mt-1 uppercase font-black tracking-widest">
                    Free Human Resource
                  </span>
                </h3>
                <span className="text-xl font-black italic text-blue-500">0€</span>
              </div>
              <p className="text-zinc-500 text-sm mb-10 flex-grow leading-relaxed normal-case">
                The essential guide to building your own temple of strength. Clinical efficiency for home-based performance.
              </p>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-blue-500 pb-2 self-start group-hover:text-white transition-all text-blue-500">
                Download PDF
              </div>
            </Link>
          </div>
        </section>

        {/* TRUST SECTION: THE EXPERT */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-y border-zinc-900 py-20">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6">The Architect</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 italic">Clinical Expertise <br/> meets Raw Performance.</h3>
            <p className="text-zinc-400 leading-relaxed mb-6 normal-case">
              Unlike AI-generated templates, every protocol here is built by a licensed Clinical Psychologist specializing in the pathology of performance. 
            </p>
            <p className="text-zinc-400 leading-relaxed normal-case">
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

        {/* FEATURED: THE APP (The 1:1 Connection) - Fully Clickable */}
        <section className="mb-24">
          <a 
            href={mainApp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block border-2 border-blue-600 bg-zinc-950 p-8 md:p-16 overflow-hidden transition-all hover:bg-zinc-900"
          >
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
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-6 normal-case">
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
                <div className="inline-block w-full lg:w-auto bg-white text-black group-hover:bg-blue-600 group-hover:text-white font-black uppercase py-6 px-14 transition-all text-sm tracking-widest text-center">
                  Start The Conversation
                </div>
              </div>
            </div>
          </a>
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