import { createHmac } from 'crypto'

export function generateUnsubscribeToken(email: string): string {
  const secret = process.env.RESEND_API_KEY || ''
  return createHmac('sha256', secret).update(email.toLowerCase()).digest('hex')
}
