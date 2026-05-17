import Stripe from 'stripe'
import { Resend } from 'resend'
import { readFileSync } from 'fs'
import { join } from 'path'

const stripeKey = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY
const resendKey = process.env.RESEND_API_KEY

if (!stripeKey) { console.error('❌ STRIPE_SECRET_KEY manquant'); process.exit(1) }
if (!resendKey) { console.error('❌ RESEND_API_KEY manquant'); process.exit(1) }

const stripe = new Stripe(stripeKey, { apiVersion: '2025-08-27.basil' })
const resend = new Resend(resendKey)

const addendumBuffer = readFileSync(join(process.cwd(), 'protected_pdfs', 'elite-addendum-behemoth.pdf'))

function buildEmail(language) {
  if (language === 'fr') {
    return {
      subject: "And there's more. — L'addendum Behemoth est là",
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;line-height:1.6;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;">
  <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#2563eb;margin:0 0 32px;">ParlaForce · Elite</p>
  <h1 style="font-size:32px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.02em;margin:0 0 24px;">And there's more.</h1>
  <p style="font-size:16px;color:#444;margin:0 0 16px;">L'addendum Behemoth est en pièce jointe.</p>
  <p style="font-size:16px;color:#444;margin:0 0 16px;">Du contenu supplémentaire construit sur la même logique que le guide — plus de protocoles, plus de détails.</p>
  <p style="font-size:16px;color:#444;margin:0 0 32px;">Bonne lecture.</p>
  <div style="margin-top:40px;padding-top:20px;border-top:1px solid #e5e5e5;color:#999;font-size:13px;">
    Léo Gayrard<br>
    Psychologue clinicien · Athlète et coach de force<br>
    <a href="https://parlaforce.com" style="color:#999;">parlaforce.com</a>
  </div>
</body>
</html>`,
    }
  }
  return {
    subject: "And there's more. — The Behemoth addendum is here",
    html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;line-height:1.6;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;">
  <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#2563eb;margin:0 0 32px;">ParlaForce · Elite</p>
  <h1 style="font-size:32px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.02em;margin:0 0 24px;">And there's more.</h1>
  <p style="font-size:16px;color:#444;margin:0 0 16px;">The Behemoth addendum is attached to this email.</p>
  <p style="font-size:16px;color:#444;margin:0 0 16px;">Extra content built on the same logic as the guide — more protocols, more detail.</p>
  <p style="font-size:16px;color:#444;margin:0 0 32px;">Enjoy.</p>
  <div style="margin-top:40px;padding-top:20px;border-top:1px solid #e5e5e5;color:#999;font-size:13px;">
    Léo Gayrard<br>
    Clinical Psychologist · Strength athlete & coach<br>
    <a href="https://parlaforce.com" style="color:#999;">parlaforce.com</a>
  </div>
</body>
</html>`,
  }
}

// Fetch all completed Elite sessions (have pdfFile, not supervision)
const buyers = new Map() // email → language
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
      buyers.set(email.toLowerCase().trim(), session.metadata?.language === 'fr' ? 'fr' : 'en')
    }
  }

  hasMore = sessions.has_more
  if (hasMore) startingAfter = sessions.data[sessions.data.length - 1].id
}

console.log(`📦 ${buyers.size} acheteur(s) Elite trouvé(s) dans Stripe`)

for (const [email, language] of buyers) {
  const { subject, html } = buildEmail(language)
  try {
    await resend.emails.send({
      from: 'ParlaForce <newsletter@troisiemechemin.fr>',
      to: email,
      subject,
      html,
      replyTo: 'leo.gayrard@gmail.com',
      attachments: [{ filename: 'Elite-Addendum-Behemoth.pdf', content: addendumBuffer }],
    })
    console.log(`  ✓ ${email} (${language})`)
  } catch (err) {
    console.error(`  ❌ ${email} — ${err?.message}`)
  }
}

console.log('\n✅ Terminé')
