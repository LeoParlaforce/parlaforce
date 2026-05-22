'use client'

import { useState } from 'react'

interface Props {
  variant?: 'full' | 'minimal'
}

export default function NewsletterSignup({ variant = 'full' }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.')
        setStatus('error')
      } else if (data.alreadySubscribed) {
        setStatus('already')
        setEmail('')
      } else {
        setStatus('success')
        setEmail('')
        localStorage.setItem('newsletter_subscribed', 'true')
      }
    } catch {
      setErrorMsg('Connection error. Try again.')
      setStatus('error')
    }
  }

  if (variant === 'minimal') {
    return (
      <div className="w-full">
        {status === 'success' ? (
          <p className="text-blue-500 text-xs font-black uppercase tracking-[0.2em]">
            You're in. ✓
          </p>
        ) : status === 'already' ? (
          <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em]">
            Already subscribed. ✓
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 text-white text-xs px-3 py-2 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-zinc-600 normal-case disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="shrink-0 bg-blue-600 text-white font-black uppercase text-[9px] tracking-[0.2em] px-4 py-2 hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '…' : 'OK'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-500 text-[10px] mt-2 normal-case">{errorMsg}</p>
        )}
      </div>
    )
  }

  return (
    <section className="border border-zinc-800 bg-zinc-950/50 p-8 md:p-12 text-center">
      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-3">
        Newsletter
      </p>
      <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-3 text-white">
        Stay in the loop<span className="text-blue-600">.</span>
      </h3>
      <p className="text-zinc-500 italic normal-case text-sm md:text-base mb-8 max-w-md mx-auto">
        New articles, new store drops — be the first to know.
      </p>

      {status === 'success' ? (
        <div className="max-w-md mx-auto">
          <p className="text-blue-500 font-black uppercase text-sm tracking-[0.2em]">
            You're in. ✓
          </p>
          <p className="text-zinc-600 italic normal-case text-xs mt-2">
            Check your inbox — a message is waiting.
          </p>
        </div>
      ) : status === 'already' ? (
        <div className="max-w-md mx-auto">
          <p className="text-zinc-400 font-black uppercase text-sm tracking-[0.2em]">
            Already subscribed. ✓
          </p>
          <p className="text-zinc-600 italic normal-case text-xs mt-2">
            You're already on the list.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-blue-600 transition-colors placeholder:text-zinc-600 normal-case disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="shrink-0 bg-blue-600 text-white font-black uppercase px-6 py-3 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all disabled:opacity-50"
          >
            {status === 'loading' ? '…' : "Subscribe →"}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-500 text-xs mt-4 normal-case">{errorMsg}</p>
      )}
    </section>
  )
}
