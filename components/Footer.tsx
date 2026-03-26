import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 text-white font-sans w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-20">
          
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight uppercase">
              Parla<span className="text-blue-600">Force</span>
            </Link>
            <p className="mt-6 text-zinc-500 max-w-sm leading-relaxed text-sm">
              Athletic intelligence and raw performance. Evidence-based training systems for high-level results.
            </p>
            {/* Nouveau lien vers Third Path */}
            <div className="mt-8">
              <a 
                href="https://thirdpath.cloud" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-blue-500 transition-colors border-b border-zinc-800 pb-1 block w-max"
              >
                Interested in psychology?
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-zinc-200 font-bold mb-6 text-xs uppercase tracking-[0.2em]">Navigation</h3>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="/articles" className="hover:text-blue-500 transition-colors">Articles</Link></li>
              <li><Link href="/programs" className="hover:text-blue-500 transition-colors">Programs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-zinc-200 font-bold mb-6 text-xs uppercase tracking-[0.2em]">Social</h3>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="https://www.instagram.com/par_la_force/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Instagram</a></li>
              <li><a href="https://www.youtube.com/@ParLaForce" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">YouTube</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.15em] font-medium text-zinc-600 uppercase text-center md:text-left">
          <p>© {year} Par la force. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-4 md:gap-x-8 gap-y-4">
            <Link href="/about-us" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/editorial-standards" className="hover:text-white transition-colors">Editorial Standards</Link>
            <Link href="/legal-notice" className="hover:text-white transition-colors">Legal Notice</Link>
            <Link href="/contact" className="hover:text-blue-500 transition-colors text-blue-600 font-bold">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}