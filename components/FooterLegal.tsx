'use client'

import Link from 'next/link'

type Props = { lang: 'fr' | 'en' }

export default function FooterLegal({ lang }: Props) {
  return (
    <footer className="text-sm text-gray-400 mt-16 mb-4 text-center">
      {lang === 'fr' ? (
        <>
          <Link href="/fr/mentions-legales">Mentions légales</Link> |{' '}
          <Link href="/fr/privacy-policy">Politique de confidentialité</Link> |{' '}
          <Link href="/fr/contact">Contact</Link>
        </>
      ) : (
        <>
          <Link href="/en/legal">Legal Notice</Link> |{' '}
          <Link href="/en/privacy">Privacy Policy</Link> |{' '}
          <Link href="/en/contact">Contact</Link>
        </>
      )}
    </footer>
  )
}