import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateUnsubscribeToken } from '../token'

const resend = new Resend(process.env.RESEND_API_KEY)

const successHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Unsubscribed — ParlaForce</title>
</head>
<body style="background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:48px 24px;">
  <div style="max-width:540px;margin:0 auto;">
    <p style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;color:#2563eb;margin:0 0 32px;">ParlaForce · Newsletter</p>
    <h1 style="font-size:40px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.03em;color:#fff;margin:0 0 20px;line-height:1;">Done.</h1>
    <p style="color:#71717a;font-size:16px;line-height:1.75;margin:0 0 32px;font-style:italic;">
      You've been unsubscribed. You won't hear from us again.
    </p>
    <a href="https://parlaforce.com" style="display:inline-block;background:#2563eb;color:#fff;font-weight:900;text-transform:uppercase;font-size:10px;letter-spacing:0.3em;padding:14px 28px;text-decoration:none;font-style:italic;">
      Back to ParlaForce →
    </a>
  </div>
</body>
</html>`

const errorHtml = (message: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Error — ParlaForce</title>
</head>
<body style="background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:48px 24px;">
  <div style="max-width:540px;margin:0 auto;">
    <p style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;color:#2563eb;margin:0 0 32px;">ParlaForce · Newsletter</p>
    <h1 style="font-size:40px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.03em;color:#fff;margin:0 0 20px;line-height:1;">Error.</h1>
    <p style="color:#71717a;font-size:16px;line-height:1.75;margin:0 0 32px;font-style:italic;">${message}</p>
    <a href="https://parlaforce.com/contact" style="display:inline-block;background:#2563eb;color:#fff;font-weight:900;text-transform:uppercase;font-size:10px;letter-spacing:0.3em;padding:14px 28px;text-decoration:none;font-style:italic;">
      Contact us →
    </a>
  </div>
</body>
</html>`

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  const token = req.nextUrl.searchParams.get('token')

  if (!email || !token) {
    return new NextResponse(errorHtml('Invalid unsubscribe link.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const expectedToken = generateUnsubscribeToken(email)
  if (token !== expectedToken) {
    return new NextResponse(errorHtml('Invalid unsubscribe link.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) {
    return new NextResponse(errorHtml('Configuration error. Please contact us.'), {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  try {
    const { data: contacts } = await resend.contacts.list({ audienceId })
    const contact = contacts?.data?.find((c: any) => c.email.toLowerCase() === email.toLowerCase())

    if (contact) {
      await resend.contacts.update({
        id: contact.id,
        audienceId,
        unsubscribed: true,
      })
    }

    return new NextResponse(successHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return new NextResponse(errorHtml('Something went wrong. Please try again or contact us.'), {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    })
  }
}
