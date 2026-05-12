import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supervision | Direct Performance Coaching',
  description: 'Private encrypted supervision for serious strength athletes. Training, programming, diet, recovery, psychology, competition — every dimension of performance, with a clinical psychologist who is also a strength athlete.',
  alternates: {
    canonical: 'https://parlaforce.com/supervision',
  },
  openGraph: {
    title: 'Supervision | Par la force',
    description: 'Daily access to a clinical psychologist and strength athlete. Training, programming, technique, psychology — every dimension, one conversation.',
    url: 'https://parlaforce.com/supervision',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ParlaForce Supervision' }],
  },
}

export default function SupervisionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
