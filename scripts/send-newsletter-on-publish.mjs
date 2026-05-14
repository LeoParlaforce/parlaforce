import { Resend } from 'resend'
import { readFileSync } from 'fs'
import matter from 'gray-matter'

const resend = new Resend(process.env.RESEND_API_KEY)
const audienceId = process.env.RESEND_AUDIENCE_ID
const rawFiles = process.env.NEW_ARTICLE_FILES?.trim() || ''
const files = rawFiles.split('\n').filter(Boolean)

if (!audienceId) {
  console.error('RESEND_AUDIENCE_ID manquant dans les secrets GitHub')
  process.exit(1)
}

if (files.length === 0) {
  console.log('Aucun nouvel article détecté.')
  process.exit(0)
}

for (const filePath of files) {
  const content = readFileSync(filePath, 'utf-8')
  const { data } = matter(content)

  const title = data.title || 'Nouvel article'
  const summary = data.summary || ''
  const slug = filePath.replace('app/posts/', '').replace('.md', '')
  const url = `https://parlaforce.com/articles/${slug}`

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:48px 24px;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;color:#2563eb;margin:0 0 32px;">
      ParlaForce · Nouvel article
    </p>
    <h1 style="font-size:36px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:-0.03em;color:#fff;margin:0 0 20px;line-height:1.1;">
      ${title}<span style="color:#2563eb;">.</span>
    </h1>
    ${summary ? `<p style="color:#71717a;font-size:16px;line-height:1.75;margin:0 0 32px;font-style:italic;">${summary}</p>` : ''}
    <a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;font-weight:900;text-transform:uppercase;font-size:10px;letter-spacing:0.3em;padding:14px 28px;text-decoration:none;font-style:italic;">
      Lire l'article →
    </a>
    <hr style="border:none;border-top:1px solid #18181b;margin:40px 0 24px;" />
    <p style="color:#27272a;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;margin:0;">
      <a href="https://parlaforce.com" style="color:#27272a;text-decoration:none;">parlaforce.com</a>
      &nbsp;·&nbsp;
      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#27272a;text-decoration:none;">Se désabonner</a>
    </p>
  </div>
</body>
</html>`

  const { data: broadcast, error: createError } = await resend.broadcasts.create({
    audienceId,
    from: 'ParlaForce <newsletter@troisiemechemin.fr>',
    name: `Article — ${title}`,
    subject: `${title} — ParlaForce`,
    html,
  })

  if (createError || !broadcast) {
    console.error('Erreur création broadcast:', createError)
    process.exit(1)
  }

  const { error: sendError } = await resend.broadcasts.send(broadcast.id)

  if (sendError) {
    console.error('Erreur envoi broadcast:', sendError)
    process.exit(1)
  }

  console.log(`✓ Newsletter envoyée pour : "${title}"`)
}
