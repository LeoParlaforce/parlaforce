import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Systems & Protocols | Clinical Strength Architecture',
  description: 'Acquire high-level psychological and physical protocols. Licensed clinical expertise for elite strength athletes. No AI-generated content.',
  alternates: { canonical: 'https://parlaforce.com/programs' },
  openGraph: {
    title: 'ParlaForce Systems | Performance Architecture',
    description: 'Specialized protocols for psychological and physical dominance.',
    url: 'https://parlaforce.com/programs',
    type: 'website',
    images: [{ url: '/og-programs.png', width: 1200, height: 630 }],
  },
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}