import { Resend } from 'resend'
import * as fs from 'fs'
import * as path from 'path'

async function main() {
  const envPath = path.join(process.cwd(), '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf-8')

  const apiKeyMatch = envContent.match(/RESEND_API_KEY=(.+)/)
  if (!apiKeyMatch) {
    console.error('RESEND_API_KEY introuvable dans .env.local')
    process.exit(1)
  }

  const resend = new Resend(apiKeyMatch[1].trim())

  console.log('Création de l\'audience "ParlaForce Newsletter"...')

  const { data, error } = await resend.audiences.create({ name: 'ParlaForce Newsletter' })

  if (error || !data) {
    console.error('Erreur :', error)
    process.exit(1)
  }

  console.log(`\nAudience créée ! ID : ${data.id}\n`)

  const updated = envContent.includes('RESEND_AUDIENCE_ID=')
    ? envContent.replace(/RESEND_AUDIENCE_ID=.*/, `RESEND_AUDIENCE_ID=${data.id}`)
    : envContent + `\nRESEND_AUDIENCE_ID=${data.id}\n`

  fs.writeFileSync(envPath, updated)
  console.log('RESEND_AUDIENCE_ID ajouté automatiquement dans .env.local')
}

main()
