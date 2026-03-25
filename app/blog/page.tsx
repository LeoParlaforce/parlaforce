import { getAllPosts } from "@/lib/posts"
import Link from "next/link"

export default function BlogListing() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-blue-600">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="mb-24">
          <h1 className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 italic">
            PARLA<br/><span className="text-blue-600">FORCE</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-xl font-light uppercase tracking-widest">
            Intelligence athlétique & Performance brute.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-16">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative block">
                {post.image && (
                  <div className="aspect-video overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="space-y-4">
                  <span className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase">{post.category}</span>
                  <h2 className="text-4xl font-black uppercase italic group-hover:text-blue-500 transition-colors leading-none">{post.title}</h2>
                  <p className="text-slate-400 text-lg line-clamp-2 font-light">{post.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 border-t border-slate-900">
            <p className="text-slate-600 uppercase tracking-widest font-bold">Publications à venir.</p>
          </div>
        )}
      </div>
    </main>
  )
}