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
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-zinc-400 transition-colors text-center">
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

  const imageUrl = post.image.startsWith('http') ? post.image : post.image.startsWith('/') ? post.image : `/${post.image}`;

  // JSON-LD BLINDÉ : On lie l'article à l'auteur défini dans le layout
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.summary,
    "image": `https://parlaforce.com${imageUrl}`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Leo Gayrard",
      "url": "https://parlaforce.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Parla Force",
      "logo": {
        "@type": "ImageObject",
        "url": "https://parlaforce.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://parlaforce.com/articles/${slug}`
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden selection:bg-blue-600/30 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* SYSTÈME DE GRAIN UNIFIÉ (PNG pour visibilité mobile) */}
      <div 
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] md:opacity-[0.02] bg-repeat" 
        style={{ backgroundImage: "url('/grain.png')", backgroundSize: '200px' }}
      ></div>

      <div className="relative z-10">
        <nav className="p-6 md:p-8 flex justify-between items-center border-b border-zinc-900 mb-12 bg-black/50 backdrop-blur-sm">
          <Link href="/articles" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-zinc-500 hover:text-blue-600 transition-all italic">
            ← Articles Access
          </Link>
          <span className="text-zinc-800 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block">
            Protocol Ref: PF-{slug.substring(0,3).toUpperCase()}
          </span>
        </nav>

        {post.image && (
          <div className="relative max-w-7xl mx-auto mb-16 group h-[50vh] md:h-[75vh] overflow-hidden border-y md:border-x border-zinc-900 bg-zinc-950">
            <img 
              src={imageUrl} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" 
              alt={post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 md:pb-16 z-20 px-6">
              <div className="mb-6 flex justify-center gap-6 text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase">
                <span>{post.date}</span>
                <span className="text-blue-600 border border-blue-600/20 px-2 py-0.5">{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-9xl font-black uppercase italic leading-[0.85] tracking-tighter text-white text-center drop-shadow-2xl px-4">
                {post.title}<span className="text-blue-600">.</span>
              </h1>
            </div>
          </div>
        )}

        <header className="max-w-4xl mx-auto px-6 text-center mb-20">
          <p className="text-zinc-400 italic max-w-2xl mx-auto normal-case text-lg md:text-2xl leading-relaxed font-light">
            {post.summary}
          </p>
        </header>

        <article className="max-w-3xl mx-auto px-6">
          <SocialShare slug={slug} title={post.title} />

          <div className="prose prose-invert prose-blue max-w-none prose-p:italic prose-li:italic prose-p:normal-case prose-li:normal-case prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-strong:text-white prose-strong:uppercase">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({...props}) => <h2 {...props} className="text-3xl md:text-4xl font-black mt-20 md:mt-24 mb-10 text-white border-b border-zinc-900 pb-4" />,
                h3: ({...props}) => <h3 {...props} className="text-xl md:text-2xl font-black mt-12 md:mt-16 mb-8 text-blue-600" />,
                p: ({...props}) => <p {...props} className="text-lg md:text-xl leading-relaxed text-zinc-400 mb-10" />,
                li: ({...props}) => <li {...props} className="text-lg text-zinc-400 mb-4 leading-relaxed marker:text-blue-600" />,
                blockquote: ({...props}) => <blockquote {...props} className="border-l-2 border-blue-600 bg-zinc-950/50 p-6 md:p-8 italic text-zinc-200 my-12 text-lg md:text-xl" />,
                a: ({...props}) => <a {...props} className="text-blue-500 hover:text-white transition-colors underline decoration-blue-900/50" />,
                hr: () => <hr className="border-zinc-900 my-16 md:my-20" />,
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

          <div className="mt-32 border border-zinc-900 bg-zinc-950/30 p-8 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-[8px] font-black uppercase tracking-[0.5em] vertical-text hidden md:block">Parla Force / Systems</div>
            <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
              ARCHITECT YOUR PERFORMANCE<span className="text-blue-600">.</span>
            </h3>
            <p className="text-zinc-500 italic max-w-xl mx-auto normal-case text-base md:text-lg mb-12">
              Ready to implement these variables with clinical precision? Access our specialized human-led systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/programs" className="bg-blue-600 text-white font-black uppercase py-5 px-10 text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all">
                View Protocols
              </Link>
              <a href="https://chat.troisiemechemin.fr" target="_blank" rel="noopener noreferrer" className="border border-zinc-800 text-zinc-400 font-black uppercase py-5 px-10 text-[10px] tracking-[0.4em] hover:border-blue-600 hover:text-blue-600 transition-all">
                Supervision App
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}