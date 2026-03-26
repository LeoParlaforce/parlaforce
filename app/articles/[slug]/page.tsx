import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Link from "next/link"
import { FaXTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa6"

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  
  return {
    title: `${post.title} | Parla Force`,
    description: post.summary,
    alternates: {
      canonical: `https://parlaforce.com/articles/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://parlaforce.com/articles/${slug}`,
      images: [{ url: post.image }],
      type: 'article',
      publishedTime: post.date,
    },
  }
}

const SocialShare = ({ slug, title }: { slug: string, title: string }) => {
  const url = `https://parlaforce.com/articles/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const shareLinks = [
    { name: 'X', icon: <FaXTwitter />, href: `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}` },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { name: 'Facebook', icon: <FaFacebookF />, href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { name: 'Instagram', icon: <FaInstagram />, href: `https://www.instagram.com/parlaforce/` }, 
  ];

  return (
    <div className="flex flex-col items-center gap-4 border-y border-zinc-900 py-6 my-12 group">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-zinc-400 transition-colors">
        Share Protocol
      </span>
      <div className="flex gap-8">
        {shareLinks.map(link => (
          <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" 
             className="text-xl text-zinc-500 hover:text-blue-600 transition-all hover:scale-110">
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default async function PostPage({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  // SÉCURITÉ CHEMIN IMAGE
  const imageUrl = post.image.startsWith('http') ? post.image : post.image.startsWith('/') ? post.image : `/${post.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "image": `https://parlaforce.com${imageUrl}`,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": "Parla Force", "url": "https://parlaforce.com" }
  };

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden selection:bg-blue-600/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.02]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")` }}></div>

      <div className="relative z-10">
        <nav className="p-8 flex justify-between items-center border-b border-zinc-900 mb-12">
          <Link href="/articles" className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 hover:text-blue-600 transition-all italic">
            ← Articles Access
          </Link>
          <span className="text-zinc-800 text-[10px] font-black uppercase tracking-[0.3em]">Protocol Ref: PF-{slug.substring(0,3).toUpperCase()}</span>
        </nav>

        {post.image && (
          <div className="relative max-w-7xl mx-auto mb-16 group h-[50vh] md:h-[75vh] overflow-hidden border-x border-zinc-900 bg-zinc-950">
            {/* UTILISATION DE IMG STANDARD POUR ÉVITER LES BUGS DE PATH */}
            <img 
              src={imageUrl} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" 
              alt={post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-16 z-20 px-6">
              <div className="mb-6 flex justify-center gap-6 text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase">
                <span>{post.date}</span>
                <span className="text-blue-600 border border-blue-600/20 px-2 py-0.5">{post.category}</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase italic leading-[0.85] tracking-tighter text-white text-center drop-shadow-2xl">
                {post.title}<span className="text-blue-600">.</span>
              </h1>
            </div>
          </div>
        )}

        <header className="max-w-4xl mx-auto px-6 text-center mb-20">
          <p className="text-zinc-400 italic max-w-2xl mx-auto normal-case text-xl md:text-2xl leading-relaxed font-light">
            {post.summary}
          </p>
        </header>

        <article className="max-w-3xl mx-auto px-6">
          <SocialShare slug={slug} title={post.title} />

          <div className="prose prose-invert prose-blue max-w-none prose-p:italic prose-li:italic prose-p:normal-case prose-li:normal-case prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-strong:text-white prose-strong:uppercase">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({...props}) => <h2 {...props} className="text-3xl md:text-4xl font-black mt-24 mb-10 text-white border-b border-zinc-900 pb-4" />,
                h3: ({...props}) => <h3 {...props} className="text-xl md:text-2xl font-black mt-16 mb-8 text-blue-600" />,
                p: ({...props}) => <p {...props} className="text-lg md:text-xl leading-relaxed text-zinc-400 mb-10" />,
                li: ({...props}) => <li {...props} className="text-lg text-zinc-400 mb-4 leading-relaxed marker:text-blue-600" />,
                blockquote: ({...props}) => <blockquote {...props} className="border-l-2 border-blue-600 bg-zinc-950/50 p-8 italic text-zinc-200 my-12 text-xl" />,
                a: ({...props}) => <a {...props} className="text-blue-500 hover:text-white transition-colors underline decoration-blue-900/50" />,
                hr: () => <hr className="border-zinc-900 my-20" />,
                summary: ({...props}) => (
                  <summary {...props} className="flex justify-between items-center cursor-pointer list-none outline-none group text-sm font-bold uppercase tracking-widest text-blue-600 py-4 border-b border-zinc-900">
                    {props.children}
                    <span className="text-blue-600/30 group-hover:text-blue-600 transition-transform group-open:rotate-180">↓</span>
                  </summary>
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          
          <SocialShare slug={slug} title={post.title} />

          <div className="mt-32 border border-zinc-900 bg-zinc-950/30 p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-[8px] font-black uppercase tracking-[0.5em] vertical-text">Parla Force / Systems</div>
            <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
              ARCHITECT YOUR PERFORMANCE<span className="text-blue-600">.</span>
            </h3>
            <p className="text-zinc-500 italic max-w-xl mx-auto normal-case text-lg mb-12">
              Ready to implement these variables with clinical precision? Access our specialized human-led systems.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/programs" className="bg-blue-600 text-white font-black uppercase py-5 px-10 text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all">
                View Protocols
              </Link>
              <a href="https://chat.troisiemechemin.fr" target="_blank" rel="noopener noreferrer" className="border border-zinc-800 text-zinc-400 font-black uppercase py-5 px-10 text-xs tracking-[0.4em] hover:border-blue-600 hover:text-blue-600 transition-all">
                Supervision App
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}