import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Link from "next/link"
import Image from "next/image"
import SocialShare from "@/components/SocialShare"

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
      images: [{ 
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.title
      }],
      type: 'article',
      publishedTime: post.date,
      authors: ['Leo Gayrard'],
      section: post.category,
    },
  }
}

const MidArticleCTA = ({ slug }: { slug: string }) => (
  <div className="my-16 border border-blue-600/20 bg-blue-600/5 p-8 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
      Supervision
    </p>
    <p className="text-white font-black uppercase italic text-xl md:text-2xl tracking-tight mb-4 leading-tight">
      Someone who holds you to the standard when you want to lower it.
    </p>
    <p className="text-zinc-500 text-sm italic mb-6 normal-case">
      Personalized programming, mental coaching, and nutrition supervision. Built around your training, not a template.
    </p>
    <div className="flex flex-col sm:flex-row gap-3">
      <Link 
        href="/programs" 
        className="bg-blue-600 text-white font-black uppercase py-3 px-8 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all text-center"
      >
        View PDF Protocols
      </Link>
      <a 
        href="https://chat.troisiemechemin.fr" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="border border-zinc-700 text-zinc-400 font-black uppercase py-3 px-8 text-[10px] tracking-[0.3em] hover:border-blue-600 hover:text-blue-600 transition-all text-center"
      >
        1:1 Supervision →
      </a>
    </div>
  </div>
)

export default async function PostPage({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  const imageUrl = post.image.startsWith('http') ? post.image : post.image.startsWith('/') ? post.image : `/${post.image}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://parlaforce.com/articles/${slug}`,
    "headline": post.title,
    "description": post.summary,
    "image": {
      "@type": "ImageObject",
      "url": `https://parlaforce.com${imageUrl}`,
      "width": 1200,
      "height": 630
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "inLanguage": "en-US",
    "author": { "@id": "https://parlaforce.com/#author" },
    "publisher": { "@id": "https://parlaforce.com/#organization" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://parlaforce.com/articles/${slug}`
    },
    "articleSection": post.category,
    "isPartOf": { "@id": "https://parlaforce.com/#website" }
  }

  const faqJsonLd = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null

  const contentLength = post.content?.length || 0
  const isLongArticle = contentLength > 3000
  const contentParts = isLongArticle ? splitContentAtMiddle(post.content) : [post.content, '']

  const markdownComponents = {
    h2: ({...props}) => <h2 {...props} className="text-3xl md:text-4xl font-black mt-20 md:mt-24 mb-10 text-white border-b border-zinc-900 pb-4" />,
    h3: ({...props}) => <h3 {...props} className="text-xl md:text-2xl font-black mt-12 md:mt-16 mb-8 text-blue-600" />,
    p: ({...props}) => <p {...props} className="text-lg md:text-xl leading-relaxed text-zinc-400 mb-10" />,
    li: ({...props}) => <li {...props} className="text-lg text-zinc-400 mb-4 leading-relaxed marker:text-blue-600" />,
    blockquote: ({...props}) => <blockquote {...props} className="border-l-2 border-blue-600 bg-zinc-950/50 p-6 md:p-8 italic text-zinc-200 my-12 text-lg md:text-xl" />,
    a: ({...props}) => <a {...props} className="text-blue-500 hover:text-white transition-colors underline decoration-blue-900/50" />,
    hr: () => <hr className="border-zinc-900 my-16 md:my-20" />,
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden selection:bg-blue-600/30 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <div 
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] md:opacity-[0.02] bg-repeat" 
        aria-hidden="true"
        style={{ backgroundImage: "url('/grain.png')", backgroundSize: '200px' }}
      />

      <div className="relative z-10">
        <nav aria-label="Article navigation" className="p-6 md:p-8 flex justify-between items-center border-b border-zinc-900 mb-12 bg-black/50 backdrop-blur-sm">
          <Link href="/articles" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-zinc-500 hover:text-blue-600 transition-all italic">
            ← Articles Access
          </Link>
        </nav>

        {post.image && (
          <div className="relative max-w-7xl mx-auto mb-16 h-[50vh] md:h-[75vh] overflow-hidden border-y md:border-x border-zinc-900 bg-zinc-950">
            <Image
              src={imageUrl}
              fill
              priority={true}
              sizes="100vw"
              className="object-cover transition-transform duration-1000 hover:scale-105 opacity-80"
              alt={post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
            
            <div className="absolute inset-0 flex flex-col justify-end items-center pb-12 md:pb-16 z-20 px-6">
              <div className="mb-6 flex justify-center gap-6 text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase">
                <time dateTime={post.date}>{post.date}</time>
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
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {contentParts[0]}
            </ReactMarkdown>

            {isLongArticle && <MidArticleCTA slug={slug} />}

            {contentParts[1] && (
              <ReactMarkdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                {contentParts[1]}
              </ReactMarkdown>
            )}
          </div>
          
          <SocialShare slug={slug} title={post.title} />

          <div className="mt-32 border border-zinc-900 bg-zinc-950/30 p-8 md:p-20 text-center relative overflow-hidden">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              Next Step
            </p>
            <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
              Stop Guessing. Start Moving<span className="text-blue-600">.</span>
            </h3>
            <p className="text-zinc-500 italic max-w-xl mx-auto normal-case text-base md:text-lg mb-4">
              The bar responds to what you actually do with it — not what you plan to do next cycle.
            </p>
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest mb-12">
              Personalized · Zero AI · Built around your training
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/programs" 
                className="bg-blue-600 text-white font-black uppercase py-5 px-10 text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all"
              >
                View Protocols
              </Link>
              <a 
                href="https://chat.troisiemechemin.fr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="border border-zinc-800 text-zinc-400 font-black uppercase py-5 px-10 text-[10px] tracking-[0.4em] hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                1:1 Supervision →
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

function splitContentAtMiddle(content: string): [string, string] {
  if (!content) return ['', '']
  const half = Math.floor(content.length / 2)
  const splitIndex = content.indexOf('\n\n', half)
  if (splitIndex === -1) return [content, '']
  return [content.substring(0, splitIndex), content.substring(splitIndex)]
}
