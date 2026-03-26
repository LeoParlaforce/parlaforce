"use client";

import Link from "next/link";
import { useState } from "react";

const mainApp = {
  id: "athletic-intelligence",
  title: "ATHLETIC INTELLIGENCE",
  price: "50€",
  period: "/month",
  description: "Direct encrypted chat access to a specialized clinical psychologist. Real-time guidance on training, nutrition, and the unique psychological architecture of high performance.",
  link: "https://chat.troisiemechemin.fr",
};

const guides = [
  {
    title: "Psychological Protocol",
    subtitle: "Stop being a little b!tch in strength sports",
    price: "15€",
    priceAmount: 1500,
    pdfFile: "Psychological guide to stop being a little b!tch in strength sports.pdf",
    description: "Analysis of performance inhibition. How to manage the subjective limit under heavy mechanical load without the noise of mainstream motivation.",
    features: ["Failure Confrontation", "Focus Architecture", "Pressure Management"],
    references: "Ref: Journal of Applied Sport Psychology (2024); Clinical performance standards.",
  },
  {
    title: "Create Your Program",
    subtitle: "Customization & Design",
    price: "12€",
    priceAmount: 1200,
    pdfFile: "Create your own program.pdf",
    description: "Master the variables of strength. Learn to build, adapt, and scale any training system with mechanical precision.",
    features: ["Programming Logic", "Variable Scaling", "System Design"],
    references: "Ref: Strength & Conditioning Research; Periodization Models.",
  },
  {
    title: "Mobility",
    subtitle: "Reinforce your body",
    price: "12€",
    priceAmount: 1200,
    pdfFile: "Mobility - reinforce your body.pdf",
    description: "Bulletproof your joints and optimize your movement patterns for high-intensity heavy lifting.",
    features: ["Joint Integrity", "Movement Optimization", "Injury Prevention"],
    references: "Ref: Clinical Biomechanics; Sports Medicine Standards.",
  },
  {
    title: "Architectural Nutrition",
    subtitle: "Protocol 01: English Version",
    price: "9€",
    priceAmount: 900,
    pdfFile: "Le Diet - english version.pdf",
    description: "A clinical framework for performance. Focus on energy kinetics, structural macronutrient ratios, and biological reset through fasting.",
    features: ["Metabolic Equations", "Leucine Threshold", "72h Fasting Protocols"],
    references: "Ref: JISSN (2023); Longo & Mattson (2014); Mifflin-St Jeor (1990).",
  },
  {
    title: "Strongman",
    subtitle: "Training Systems",
    price: "9€",
    priceAmount: 900,
    pdfFile: "Strongman - training.pdf",
    description: "Specific programming for unconventional strength, explosive power, and structural durability.",
    features: ["Unconventional Force", "Explosive Power", "Specific Loading"],
    references: "Ref: International Journal of Sports Science; Elite Strength Standards.",
  },
];

const faqs = [
  {
    question: "Who are these psychological and strength protocols for?",
    answer: "These systems are engineered for intermediate to elite athletes in strength sports (Powerlifting, Strongman, Weightlifting). They do not rely on mainstream motivation. They are clinical tools designed to restructure cognitive architecture and physical output under heavy mechanical load."
  },
  {
    question: "Are these generic or AI-generated training templates?",
    answer: "Zero AI content. Zero generic algorithms. Every protocol, equation, and structural design is architected by a licensed Clinical Psychologist specializing in the pathology and psychology of extreme physical performance."
  },
  {
    question: "How is the PDF protocol delivered after purchase?",
    answer: "You will be redirected to a secure success page immediately after checkout, where a temporary, cryptographically signed download link will be generated for your specific PDF. Ensure you download it immediately."
  },
  {
    question: "What is the difference between the PDF Protocols and Athletic Intelligence?",
    answer: "The PDF Protocols are static, highly specialized clinical blueprints for self-application. ATHLETIC INTELLIGENCE is a premium, 1:1 encrypted chat interface offering dynamic, real-time psychological and programming adjustments directly with the architect."
  }
];

export default function ProgramsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCheckout = async (guide: typeof guides[0]) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: guide.title,
          priceAmount: guide.priceAmount,
          pdfFile: guide.pdfFile 
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Erreur Checkout:", data.error);
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6 font-sans lowercase relative overflow-hidden">
      
      {/* GRAIN CINÉMATIQUE SUBTIL */}
      <div 
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.04]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      <div 
        className="pointer-events-none fixed inset-0 z-[102] opacity-[0.05] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='clumpingGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.005' numOctaves='6' stitchTiles='stitch' seed='13'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23clumpingGrain)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <nav className="mb-16 flex justify-between items-center border-b border-zinc-900 pb-6">
          <Link href="/" className="text-zinc-500 hover:text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] transition-all">
            ← Back to Website
          </Link>
          <span className="text-zinc-800 text-[10px] font-black uppercase tracking-[0.3em]">System v2.0.26</span>
        </nav>

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

        <section className="mb-32">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-12 border-b border-zinc-900 pb-4">
            Specialized Human Intelligence Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {guides.map((guide, idx) => (
              <button 
                key={idx} 
                onClick={() => handleCheckout(guide)}
                className="group border border-zinc-800 p-8 flex flex-col hover:border-blue-600 hover:bg-zinc-950 transition-all duration-300 text-left w-full"
              >
                <div className="flex justify-between items-start mb-6 w-full">
                  <h3 className="text-xl font-black uppercase leading-tight tracking-tight max-w-[75%] group-hover:text-blue-500 transition-colors">
                    {guide.title}
                    <span className="block text-zinc-600 text-[10px] mt-1 uppercase font-bold tracking-widest italic">
                      {guide.subtitle}
                    </span>
                  </h3>
                  <span className="text-xl font-black italic text-zinc-400 group-hover:text-white">{guide.price}</span>
                </div>
                
                <p className="text-zinc-500 text-sm mb-6 flex-grow leading-relaxed italic">
                  {guide.description}
                </p>

                <div className="space-y-2 mb-8 text-[9px] uppercase tracking-widest text-zinc-700 font-bold group-hover:text-zinc-500">
                  {guide.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-600 rounded-full" /> {f}
                    </div>
                  ))}
                </div>

                <div className="mb-6 p-3 bg-black border border-zinc-900 group-hover:border-blue-900 transition-colors w-full">
                  <p className="text-[8px] text-zinc-600 font-mono leading-tight italic">
                    {guide.references}
                  </p>
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-zinc-800 pb-2 self-start group-hover:text-blue-600 group-hover:border-blue-600 transition-all">
                  Acquire Protocol
                </div>
              </button>
            ))}

            <a 
              href="/pdfs/home-gym - guide.pdf" 
              download
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
              <p className="text-zinc-500 text-sm mb-10 flex-grow leading-relaxed">
                The essential guide to building your own temple of strength. Clinical efficiency for home-based performance.
              </p>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-blue-500 pb-2 self-start group-hover:text-white transition-all text-blue-500">
                Download PDF
              </div>
            </a>
          </div>
        </section>

        <section className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-y border-zinc-900 py-20">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6">The Architect</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 italic">Clinical Expertise <br/> meets Raw Performance.</h3>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Unlike AI-generated templates, every protocol here is built by a licensed Clinical Psychologist specializing in the pathology of performance. 
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

        <section className="mb-32">
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
                </div>
                <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter italic">
                  {mainApp.title}
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-6">
                  {mainApp.description}
                </p>
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

        <section className="mb-24 border-t border-zinc-900 pt-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-12 text-center">
              System Parameters & Inquiries
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="border border-zinc-800 bg-black overflow-hidden transition-colors hover:border-zinc-700"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left"
                  >
                    <span className="text-sm md:text-base font-bold uppercase tracking-wide">
                      {faq.question}
                    </span>
                    <span className="text-blue-600 font-black text-xl ml-4">
                      {openFaq === idx ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed italic border-t border-zinc-900 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}