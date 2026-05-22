'use client'

import { useState, useEffect } from 'react'

const SUBSCRIBED_KEY = 'newsletter_subscribed'
const DISMISSED_KEY = 'newsletter_dismissed'
const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000 // 7 days
const SHOW_DELAY = 10_000 // 10 seconds

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (localStorage.getItem(SUBSCRIBED_KEY)) return
    const dismissed = localStorage.getItem(DISMISSED_KEY)
    if (dismissed && Date.now() - parseInt(dismissed) < DISMISS_TTL) return

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    setVisible(false)
    localStorage.setItem(DISMISSED_KEY, Date.now().toString())
  }

  async function handleSubmit(e: React.FormEvent) {
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
        localStorage.setItem(SUBSCRIBED_KEY, 'true')
        setTimeout(() => setVisible(false), 2500)
      } else {
        setStatus('success')
        localStorage.setItem(SUBSCRIBED_KEY, 'true')
        setTimeout(() => setVisible(false), 2500)
      }
    } catch {
      setErrorMsg('Connection error. Try again.')
      setStatus('error')
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-md p-7 sm:p-9">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
          aria-label="Close"
        >
          ✕
        </button>

        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
          Newsletter
        </p>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none mb-3">
          Stay in the system<span className="text-blue-600">.</span>
        </h2>
        <p className="text-zinc-500 normal-case text-sm mb-6 leading-relaxed">
          Articles, protocols, frameworks — straight to your inbox. No noise.
        </p>

        {status === 'success' ? (
          <p className="text-blue-500 font-black uppercase text-sm tracking-[0.2em]">
            You're in. ✓
          </p>
        ) : status === 'already' ? (
          <p className="text-zinc-400 font-black uppercase text-sm tracking-[0.2em]">
            Already subscribed. ✓
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="bg-black border border-zinc-700 focus:border-blue-600 text-white placeholder-zinc-600 px-4 py-3 text-sm outline-none normal-case disabled:opacity-50 transition-colors"
            />
            {status === 'error' && (
              <p className="text-red-500 text-xs normal-case">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] px-6 py-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
            >
              {status === 'loading' ? '…' : 'Subscribe →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
