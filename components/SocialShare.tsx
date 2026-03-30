"use client"

import { useState } from "react"
import { FaXTwitter, FaLinkedinIn, FaFacebookF, FaInstagram, FaLink } from "react-icons/fa6"

interface SocialShareProps {
  slug: string
  title: string
}

export default function SocialShare({ slug, title }: SocialShareProps) {
  const url = `https://parlaforce.com/articles/${slug}`
  const encodedTitle = encodeURIComponent(title)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareLinks = [
    { name: 'X', icon: <FaXTwitter />, href: `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}` },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { name: 'Facebook', icon: <FaFacebookF />, href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { name: 'Instagram', icon: <FaInstagram />, href: `https://www.instagram.com/parlaforce/` },
  ]

  return (
    <div className="flex flex-col items-center gap-4 border-y border-zinc-900 py-6 my-12 group">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-zinc-400 transition-colors text-center">
        Share Article
      </span>
      <div className="flex gap-8 items-center">
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
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="text-xl text-zinc-500 hover:text-blue-600 transition-all hover:scale-110 relative"
        >
          <FaLink />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest text-blue-600 whitespace-nowrap">
              Copied
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
