// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // On récupère le code pays (Vercel le fournit via les headers)
  // Par défaut 'US' si non détecté
  const country = request.headers.get('x-vercel-ip-country') || 'FR'
  
  // On stocke le pays dans un cookie pour que le client (le navigateur) y accède
  response.cookies.set('user-country', country, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // Garde en mémoire 1 semaine
  })

  return response
}

export const config = {
  matcher: '/programs/:path*', // Ne s'active que sur les pages de programmes
}