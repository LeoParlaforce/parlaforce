import Link from 'next/link'

export const metadata = {
  title: "Privacy Policy — Par la force",
  description: "Privacy policy for Par la force. How we handle your data.",
  alternates: {
    canonical: 'https://parlaforce.com/privacy',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function Privacy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 font-sans">

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-zinc-500 hover:text-blue-500 transition-colors no-underline mb-16 group"
      >
        <span className="text-lg group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span> Back to Home
      </Link>

      <h1 className="text-white text-5xl font-black tracking-tight mb-6 uppercase leading-none italic">
        Privacy Policy
      </h1>

      <p className="text-zinc-500 text-sm mb-16 uppercase tracking-widest font-bold">
        Last updated: March 2026
      </p>

      <section aria-labelledby="data-heading" className="mb-12">
        <h2 id="data-heading" className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
          Data Collection
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          This website does not collect personal data except what you voluntarily provide (e.g. email via contact form). No data is sold or shared with third parties.
        </p>
      </section>

      <section aria-labelledby="payments-heading" className="mb-12">
        <h2 id="payments-heading" className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
          Payments
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          All payments are processed securely via{' '}
          <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-400 transition-colors">
            Stripe
          </a>
          . We do not store or access your payment card information at any time.
        </p>
      </section>

      <section aria-labelledby="analytics-heading" className="mb-12">
        <h2 id="analytics-heading" className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
          Analytics
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          This website uses Google Analytics to understand traffic patterns. Data is anonymized and used solely for improving the content and user experience. You can opt out via your browser settings or a browser extension.
        </p>
      </section>

      <section aria-labelledby="cookies-heading" className="mb-12">
        <h2 id="cookies-heading" className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
          Cookies
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          We use a minimal cookie to detect your country for currency display purposes. No tracking cookies are used for advertising.
        </p>
      </section>

      <section aria-labelledby="rights-heading">
        <h2 id="rights-heading" className="text-white text-xl font-bold uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-4">
          Your Rights (GDPR)
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Under GDPR, you have the right to access, rectify, or delete any personal data we hold about you. Contact us at{' '}
          <a href="mailto:leo.gayrard@gmail.com" className="text-blue-600 hover:text-blue-400 transition-colors">
            leo.gayrard@gmail.com
          </a>
          {' '}for any request.
        </p>
      </section>

    </main>
  )
}
