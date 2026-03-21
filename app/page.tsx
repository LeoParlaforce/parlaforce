import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const headersList = await headers()
  const lang = headersList.get('accept-language') || ''

  if (lang.startsWith('fr')) {
    redirect('/fr')
  } else {
    redirect('/en')
  }
}