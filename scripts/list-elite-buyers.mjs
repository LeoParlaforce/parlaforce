import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY
if (!stripeKey) { console.error('❌ STRIPE_SECRET_KEY manquant'); process.exit(1) }

const stripe = new Stripe(stripeKey, { apiVersion: '2025-08-27.basil' })

const buyers = new Map()
let hasMore = true
let startingAfter = undefined

while (hasMore) {
  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    status: 'complete',
    ...(startingAfter ? { starting_after: startingAfter } : {}),
  })

  for (const session of sessions.data) {
    const isElite = session.metadata?.pdfFile && session.metadata?.service !== 'supervision'
    const email = session.customer_details?.email
    if (isElite && email) {
      buyers.set(email.toLowerCase().trim(), {
        language: session.metadata?.language || 'en',
        pdfFile: session.metadata?.pdfFile,
        paymentMode: session.metadata?.paymentMode,
      })
    }
  }

  hasMore = sessions.has_more
  if (hasMore) startingAfter = sessions.data[sessions.data.length - 1].id
}

console.log(`\n📦 ${buyers.size} acheteur(s) Elite :\n`)
for (const [email, info] of buyers) {
  console.log(`  ${email}  (lang: ${info.language}, mode: ${info.paymentMode}, pdf: ${info.pdfFile})`)
}
