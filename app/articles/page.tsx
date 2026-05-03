// ============================================================
// articles/page.tsx
// ============================================================
import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"
import RandomTexture from "@/components/RandomTexture"

export const metadata = {
  title: 'Articles | Theory & Research',
  description: 'Technical documentation and theoretical frameworks for human performance, sports science, and psychological dominance.',
  alternates: {
    canonical: 'https://parlaforce.com/articles',
  },
}

export default function BlogListing() {
  const posts = getAllPosts()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Articles",
    "description": "Technical documentation on human performance and psychological dominance.",
    "url": "https://parlaforce.com/articles",
    "publisher": { "@id": "https://parlaforce.com/#organization" },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://parlaforce.com/articles/${post.slug}`,
        "name": post.title
      }))
    }
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans lowercase relative overflow-hidden selection:bg-blue-600/30 w-full">
      
      {/* Random texture */}
      <div className="pointer-events-none fixed inset-0 z-[0] opacity-10">
        <RandomTexture />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1]" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)" }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
        
        <nav aria-label="Breadcrumb" className="mb-12 md:mb-16 flex justify-between items-center border-b border-zinc-900 pb-6">
          <Link href="/" className="text-zinc-500 hover:text-blue-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] transition-all italic">
            ← Website Access
          </Link>
          <span className="text-zinc-800 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Theory v2.0.26</span>
        </nav>

        <header className="mb-16 md:mb-24 text-center">
          <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8 italic">
            ARTICLES<span className="text-blue-600">.</span>
          </h1>
          <p className="text-[10px] md:text-base text-zinc-500 max-w-xl mx-auto font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed px-4">
            Written architecture for human dominance. <br className="hidden md:block"/>
            Athletic intelligence & raw performance.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/articles/${post.slug}`} 
                className="group relative block aspect-[16/10] overflow-hidden border border-zinc-900 bg-zinc-950 w-full"
              >
                {post.image && (
                  <>
                    <div className="absolute inset-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 md:opacity-90 group-hover:opacity-100"
                        priority={false}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 transition-opacity group-hover:opacity-80" />
                  </>
                )}

                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-center z-20">
                  <div className="mb-4 flex justify-center gap-4 text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="text-blue-600 border border-blue-600/20 px-2 py-0.5">{post.category}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-5xl font-black uppercase italic text-white group-hover:text-blue-500 transition-colors leading-none tracking-tighter mb-6 line-clamp-3">
                    {post.title}<span className="text-blue-600">.</span>
                  </h2>
                  
                  <div className="text-zinc-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] border border-zinc-800 md:border-transparent group-hover:border-blue-600 group-hover:text-white group-hover:bg-blue-600/10 px-4 py-2 inline-block self-center transition-all">
                    Read Article →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 border-t border-zinc-900 text-center">
            <p className="text-zinc-700 uppercase tracking-widest font-black text-xs md:text-sm">
              Archives locked. Publications coming soon.
            </p>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
