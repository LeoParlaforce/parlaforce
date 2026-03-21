'use client'
import { useState } from 'react'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:leo.gayrard@gmail.com?subject=Contact&body=${encodeURIComponent(message)}`
    setSent(true)
  }

  if (sent) return <p className="p-6 text-center">Merci, votre message a été envoyé !</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 flex flex-col gap-4">
      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" required />

      <label>Message</label>
      <textarea value={message} onChange={e => setMessage(e.target.value)} className="border p-2 rounded" rows={5} required />

      <button type="submit" className="bg-teal-900 text-white py-2 px-4 rounded">Envoyer</button>
    </form>
  )
}