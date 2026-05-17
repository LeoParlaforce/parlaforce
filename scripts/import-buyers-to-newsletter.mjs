import Stripe from 'stripe'
import { Resend } from 'resend'

const stripeKey = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY
const resendKey = process.env.RESEND_API_KEY
const audienceId = process.env.RESEND_AUDIENCE_ID

if (!stripeKey) { console.error('❌ STRIPE_SECRET_KEY manquant'); process.exit(1) }
if (!resendKey) { console.error('❌ RESEND_API_KEY manquant'); process.exit(1) }
if (!audienceId) { console.error('❌ RESEND_AUDIENCE_ID manquant'); process.exit(1) }

const stripe = new Stripe(stripeKey, { apiVersion: '2025-08-27.basil' })
const resend = new Resend(resendKey)

// Récupère tous les emails d'acheteurs depuis Stripe (pagination automatique)
async function fetchBuyerEmails() {
  const emails = new Set()
  let hasMore = true
  let startingAfter = undefined

  while (hasMore) {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: 'complete',
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    })

    for (const session of sessions.data) {
      const email = session.customer_details?.email
      if (email) emails.add(email.toLowerCase().trim())
    }

    hasMore = sessions.has_more
    if (hasMore) startingAfter = sessions.data[sessions.data.length - 1].id
  }

  return emails
}

const emails = await fetchBuyerEmails()
console.log(`📦 ${emails.size} email(s) d'acheteurs trouvés dans Stripe`)

let added = 0
let skipped = 0

for (const email of emails) {
  try {
    await resend.contacts.create({ email, audienceId, unsubscribed: false })
    console.log(`  ✓ ${email}`)
    added++
  } catch (err) {
    if (err?.message?.toLowerCase().includes('already exists')) {
      console.log(`  · ${email} (déjà abonné)`)
      skipped++
    } else {
      console.error(`  ❌ ${email} — ${err?.message}`)
    }
  }
}

console.log(`\n✅ Terminé — ${added} ajouté(s), ${skipped} déjà présent(s)`)
