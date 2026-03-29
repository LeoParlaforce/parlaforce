import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import Link from "next/link"
import Image from "next/image"
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
      images: [{ 
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.title
      }],
      type: 'article',
      publishedTime: post.date,
      // FIX JSON-LD OpenGraph : auteur et section ajoutés
      authors: ['Leo Gayrard'],
      section: post.category,
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
          <a 
            key={link.name} 
            href={link.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={`Share on ${link.name}`}
            className="text-xl text-zinc-500 hover:text-blue-600 transition-all hover:scale-110"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

// NOUVEAU : CTA inline entre les sections de l'article pour améliorer la conversion
// Apparaît au milieu de l'article, moins intrusif qu'une popup, plus efficace qu'un CTA final seul
const MidArticleCTA = ({ slug }: { slug: string }) => (
  <div className="my-16 border border-blue-600/20 bg-blue-600/5 p-8 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
      Protocol Available
    </p>
    <p className="text-white font-black uppercase italic text-xl md:text-2xl tracking-tight mb-4 leading-tight">
      Ready to implement this with clinical precision?
    </p>
    <p className="text-zinc-500 text-sm italic mb-6 normal-case">
      Access the full system — built by a licensed psychologist, zero AI content.
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
);

export default async function PostPage({ params }: { params: any }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  const imageUrl = post.image.startsWith('http') ? post.image : post.image.startsWith('/') ? post.image : `/${post.image}`;

  // FIX JSON-LD : ajout wordCount, inLanguage, lien @id vers l'auteur du layout
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
    // Lien @id vers le Person défini dans le layout — évite la duplication
    "author": { "@id": "https://parlaforce.com/#author" },
    "publisher": { "@id": "https://parlaforce.com/#organization" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://parlaforce.com/articles/${slug}`
    },
    // articleSection améliore la catégorisation Google News / Discover
    "articleSection": post.category,
    "isPartOf": { "@id": "https://parlaforce.com/#website" }
  };

  // Calcul simple pour déterminer si l'article est long (>800 mots estimés)
  // On insère le CTA mid-article uniquement dans ce cas
  const contentLength = post.content?.length || 0;
  const isLongArticle = contentLength > 3000;

  // Pour split du contenu au milieu si article long
  const contentParts = isLongArticle ? splitContentAtMiddle(post.content) : [post.content, ''];

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden selection:bg-blue-600/30 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
          <span className="text-zinc-800 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block" aria-hidden="true">
            Protocol Ref: PF-{slug.substring(0,3).toUpperCase()}
          </span>
        </nav>

        {post.image && (
          <div className="relative max-w-7xl mx-auto mb-16 h-[50vh] md:h-[75vh] overflow-hidden border-y md:border-x border-zinc-900 bg-zinc-950">
            {/*
              FIX CORE WEB VITALS : <img> remplacé par <Image> Next.js
              priority={true} car c'est le LCP de la page — image la plus importante à charger
              fill + object-cover reproduit le comportement original sans CLS
            */}
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
            
            {/* Première moitié du contenu */}
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
              }}
            >
              {contentParts[0]}
            </ReactMarkdown>

            {/* CTA MID-ARTICLE : inséré au milieu des longs articles pour capter l'intention d'achat
                au moment où le lecteur est le plus engagé, avant de perdre son attention */}
            {isLongArticle && <MidArticleCTA slug={slug} />}

            {/* Deuxième moitié du contenu (si article long) */}
            {contentParts[1] && (
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
                }}
              >
                {contentParts[1]}
              </ReactMarkdown>
            )}
          </div>
          
          <SocialShare slug={slug} title={post.title} />

          {/* CTA FINAL — restructuré pour être plus direct sur la valeur */}
          <div className="mt-32 border border-zinc-900 bg-zinc-950/30 p-8 md:p-20 text-center relative overflow-hidden group">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
              Next Step
            </p>
            <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none">
              ARCHITECT YOUR PERFORMANCE<span className="text-blue-600">.</span>
            </h3>
            <p className="text-zinc-500 italic max-w-xl mx-auto normal-case text-base md:text-lg mb-4">
              Ready to implement these variables with clinical precision?
            </p>
            {/* FIX CONVERSION : ajout d'une ligne de réassurance sous le CTA */}
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-widest mb-12">
              Licensed psychologist · Zero AI · Instant PDF access
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
                Supervision App
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

// Utilitaire : coupe le contenu markdown en deux parties à peu près égales
// en respectant les sauts de paragraphe pour ne pas couper au milieu d'une phrase
function splitContentAtMiddle(content: string): [string, string] {
  if (!content) return ['', ''];
  const half = Math.floor(content.length / 2);
  // On cherche le prochain double saut de ligne après la moitié
  const splitIndex = content.indexOf('\n\n', half);
  if (splitIndex === -1) return [content, ''];
  return [content.substring(0, splitIndex), content.substring(splitIndex)];
}
