import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-black font-sans">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-8">
          Parla<span className="text-blue-600">Force</span>
        </h1>
        
        <p className="text-zinc-400 text-xl md:text-2xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
          Athletic intelligence and raw performance. Evidence-based training systems for high-level results.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center uppercase tracking-[0.2em] text-xs font-bold">
          <Link 
            href="/articles" 
            className="px-10 py-5 bg-white text-black hover:bg-blue-600 hover:text-white transition-all no-underline"
          >
            Read Articles
          </Link>
          <Link 
            href="/programs" 
            className="px-10 py-5 border border-zinc-800 text-white hover:border-blue-600 transition-all no-underline"
          >
            View Programs
          </Link>
        </div>
      </div>
    </main>
  )
}