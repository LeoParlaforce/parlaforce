import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = `https://parlaforce.com/blog/${slug}`

  return {
    title: `${post.title} | Parla Force`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: url,
      images: [{ url: post.image }],
      type: 'article',
    },
  }
}

export default async function PostPage({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) return notFound()

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      <nav className="p-6">
        <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:text-white transition-colors">
          ← Retour
        </Link>
      </nav>

      <header className="max-w-5xl mx-auto px-6 pt-10 pb-20 text-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-none mb-8 tracking-tighter">
          {post.title}
        </h1>
        <div className="flex justify-center gap-8 text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase">
          <span>{post.date}</span>
          <span className="text-blue-600">{post.category}</span>
        </div>
      </header>

      {post.image && (
        <div className="max-w-4xl mx-auto px-6 mb-20">
          <img src={post.image} className="w-full h-auto grayscale" alt={post.title} />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-6 prose prose-invert prose-blue">
        <ReactMarkdown 
          components={{
            h2: ({...props}) => <h2 {...props} className="text-4xl font-black uppercase italic mt-16 mb-8 text-white" />,
            p: ({...props}) => <p {...props} className="text-xl leading-relaxed text-slate-400 mb-8" />,
            li: ({...props}) => <li {...props} className="text-lg text-slate-400 mb-2" />
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  )
}