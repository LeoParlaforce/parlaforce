import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 text-white font-sans w-full overflow-hidden" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-20">

          {/* BRAND */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight uppercase hover:text-blue-600 transition-colors">
              Parla<span className="text-blue-600">Force</span>
            </Link>
            <p className="mt-6 text-zinc-500 max-w-sm leading-relaxed text-sm">
              Athletic intelligence and raw performance. Evidence-based training systems for high-level results.
            </p>
            <p className="mt-4 text-zinc-700 text-xs uppercase tracking-widest font-bold">
              By Leo Gayrard · Licensed Psychologist
            </p>
            <div className="mt-6">
              <a
                href="https://thirdpath.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-blue-500 transition-colors border-b border-zinc-800 pb-1 block w-max"
              >
                Interested in psychology? →
              </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav aria-label="Footer navigation">
            <h3 className="text-zinc-200 font-bold mb-6 text-xs uppercase tracking-[0.2em]">Navigation</h3>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="/articles" className="hover:text-blue-500 transition-colors">Articles</Link></li>
              <li><Link href="/programs" className="hover:text-blue-500 transition-colors">Programs</Link></li>
              <li><Link href="/about-us" className="hover:text-blue-500 transition-colors">About</Link></li>
            </ul>
          </nav>

          {/* SOCIAL */}
          <div>
            <h3 className="text-zinc-200 font-bold mb-6 text-xs uppercase tracking-[0.2em]">Follow</h3>
            <ul className="space-y-5 text-sm text-zinc-500">
              <li>
                <a
                  href="https://www.instagram.com/par_la_force/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ParLaForce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1"
                >
                  <span className="flex items-center gap-2 text-zinc-400 group-hover:text-red-500 transition-colors font-bold">
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </span>
                  <span className="text-zinc-600 text-xs normal-case group-hover:text-zinc-500 transition-colors leading-snug">
                    Protocols in action
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.15em] font-medium text-zinc-600 uppercase text-center md:text-left">
          <p>© {year} Par la force. All rights reserved.</p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap justify-center md:justify-end gap-x-4 md:gap-x-8 gap-y-4 list-none p-0">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/editorial-standards" className="hover:text-white transition-colors">Editorial Standards</Link></li>
              <li><Link href="/legal-notice" className="hover:text-white transition-colors">Legal Notice</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors text-blue-600 font-bold">Contact</Link></li>
            </ul>
          </nav>
        </div>

      </div>
    </footer>
  )
}
