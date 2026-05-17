import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const audienceId = process.env.RESEND_AUDIENCE_ID

if (!process.env.RESEND_API_KEY) { console.error('❌ RESEND_API_KEY manquant'); process.exit(1) }
if (!audienceId) { console.error('❌ RESEND_AUDIENCE_ID manquant'); process.exit(1) }

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:48px 24px;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;color:#2563eb;margin:0 0 32px;">ParlaForce · Elite</p>
    <h1 style="font-size:40px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.03em;color:#fff;margin:0 0 24px;line-height:1;">And there's more<span style="color:#2563eb;">.</span></h1>
    <p style="color:#71717a;font-size:16px;line-height:1.75;margin:0 0 16px;font-style:italic;">
      The Behemoth addendum is now part of the Elite guide.
    </p>
    <p style="color:#71717a;font-size:16px;line-height:1.75;margin:0 0 16px;font-style:italic;">
      More protocols. More detail. Built on the same logic.
    </p>
    <p style="color:#71717a;font-size:16px;line-height:1.75;margin:0 0 32px;font-style:italic;">
      If you already bought the guide — check your inbox. We just sent it to you.
    </p>
    <a href="https://parlaforce.com/programs" style="display:inline-block;background:#2563eb;color:#fff;font-weight:900;text-transform:uppercase;font-size:10px;letter-spacing:0.3em;padding:14px 28px;text-decoration:none;font-style:italic;">
      Get the Elite guide →
    </a>
    <hr style="border:none;border-top:1px solid #18181b;margin:40px 0 24px;" />
    <p style="color:#27272a;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;margin:0;">
      <a href="https://parlaforce.com" style="color:#27272a;text-decoration:none;">parlaforce.com</a>
      &nbsp;·&nbsp;
      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#27272a;text-decoration:none;">Unsubscribe</a>
    </p>
  </div>
</body>
</html>`

const { data: broadcast, error: createError } = await resend.broadcasts.create({
  audienceId,
  from: 'ParlaForce <newsletter@troisiemechemin.fr>',
  name: "And there's more. — Behemoth addendum".substring(0, 70),
  subject: "And there's more. — The Behemoth addendum is here",
  html,
})

if (createError || !broadcast) {
  console.error('❌ Erreur création broadcast:', createError)
  process.exit(1)
}

const { error: sendError } = await resend.broadcasts.send(broadcast.id)

if (sendError) {
  console.error('❌ Erreur envoi broadcast:', sendError)
  process.exit(1)
}

console.log("✅ Newsletter 'And there's more.' envoyée à toute l'audience")
