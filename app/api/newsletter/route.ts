import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateUnsubscribeToken } from './token'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'ParlaForce <newsletter@troisiemechemin.fr>'
const ADMIN_EMAIL = 'leo.gayrard@gmail.com'

function buildWelcomeHtml(email: string): string {
  const token = generateUnsubscribeToken(email)
  const unsubscribeUrl = `https://parlaforce.com/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:48px 24px;">
  <div style="max-width:540px;margin:0 auto;">
    <p style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;color:#2563eb;margin:0 0 32px;">ParlaForce · Newsletter</p>
    <h1 style="font-size:40px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.03em;color:#fff;margin:0 0 20px;line-height:1;">You're in.</h1>
    <p style="color:#71717a;font-size:16px;line-height:1.75;margin:0 0 12px;font-style:italic;">
      New articles, new store drops, protocols — you'll be the first to know.
    </p>
    <p style="color:#71717a;font-size:16px;line-height:1.75;margin:0 0 32px;font-style:italic;">
      No spam. Just the real stuff.
    </p>
    <a href="https://parlaforce.com/articles" style="display:inline-block;background:#2563eb;color:#fff;font-weight:900;text-transform:uppercase;font-size:10px;letter-spacing:0.3em;padding:14px 28px;text-decoration:none;font-style:italic;">
      Read the articles →
    </a>
    <hr style="border:none;border-top:1px solid #18181b;margin:40px 0 24px;" />
    <p style="color:#27272a;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;margin:0;">
      <a href="https://parlaforce.com" style="color:#27272a;text-decoration:none;">parlaforce.com</a>
      &nbsp;·&nbsp;
      <a href="${unsubscribeUrl}" style="color:#27272a;text-decoration:none;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (audienceId) {
      try {
        await resend.contacts.create({ email, audienceId, unsubscribed: false })
      } catch (err: any) {
        if (err?.message?.toLowerCase().includes('already exists')) {
          return NextResponse.json({ alreadySubscribed: true })
        }
        console.error('Resend contacts error:', err)
      }
    }

    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "You're in. — ParlaForce",
        html: buildWelcomeHtml(email),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New newsletter subscriber: ${email}`,
        html: `<p style="font-family:sans-serif;">New subscriber: <strong>${email}</strong></p>`,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'Subscription failed. Try again.' }, { status: 500 })
  }
}
