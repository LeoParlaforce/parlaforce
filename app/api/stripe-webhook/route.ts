import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

const SIGNAL_USERNAME = "@leogayrard.11";
const SIGNAL_LINK = "https://signal.me/#u/leogayrard.11";
const SIGNAL_DOWNLOAD = "https://signal.org/download";
const FROM_EMAIL = "Léo Gayrard <supervision@troisiemechemin.fr>";

function buildEmail(language: "en" | "fr"): { subject: string; html: string; text: string } {
  if (language === "fr") {
    const subject = "Votre supervision est active — contact Signal à l'intérieur";

    const text = `Votre abonnement est désormais actif. Merci.

La supervision se fait sur Signal, une application de messagerie chiffrée de bout en bout. Pour commencer :

1. Installez Signal sur votre téléphone si ce n'est pas déjà fait : ${SIGNAL_DOWNLOAD}

2. Ouvrez la conversation avec moi via ce lien : ${SIGNAL_LINK}

Mon nom d'utilisateur Signal : ${SIGNAL_USERNAME}

Écrivez quand vous voulez.

La facturation est gérée par Stripe. Vous pouvez annuler à tout moment depuis l'email de reçu que Stripe vous envoie séparément.

—
Léo Gayrard
Psychologue clinicien · Athlète et coach de force
parlaforce.com`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; }
    h2 { font-weight: 600; margin-top: 32px; }
    a { color: #2563eb; }
    .button { display: inline-block; background: #000; color: #fff !important; padding: 14px 24px; text-decoration: none; font-weight: 700; letter-spacing: 0.05em; margin: 16px 0; }
    .username { font-family: ui-monospace, monospace; background: #f4f4f4; padding: 4px 8px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <p>Votre abonnement est désormais actif. Merci.</p>

  <p>La supervision se fait sur <strong>Signal</strong>, une application de messagerie chiffrée de bout en bout. Pour commencer :</p>

  <p><strong>1.</strong> Installez Signal sur votre téléphone si ce n'est pas déjà fait : <a href="${SIGNAL_DOWNLOAD}">${SIGNAL_DOWNLOAD}</a></p>

  <p><strong>2.</strong> Ouvrez la conversation avec moi :</p>

  <p><a href="${SIGNAL_LINK}" class="button">Ouvrir dans Signal</a></p>

  <p>Mon nom d'utilisateur Signal : <span class="username">${SIGNAL_USERNAME}</span></p>

  <p>Écrivez quand vous voulez.</p>

  <p>La facturation est gérée par Stripe. Vous pouvez annuler à tout moment depuis l'email de reçu que Stripe vous envoie séparément.</p>

  <div class="footer">
    Léo Gayrard<br>
    Psychologue clinicien · Athlète et coach de force<br>
    <a href="https://parlaforce.com">parlaforce.com</a>
  </div>
</body>
</html>`;

    return { subject, html, text };
  }

  // English (default)
  const subject = "Your supervision is active — Signal contact inside";

  const text = `Your subscription is now active. Thank you.

Supervision is delivered through Signal, an end-to-end encrypted messaging app. To get started:

1. Install Signal on your phone if you don't have it yet: ${SIGNAL_DOWNLOAD}

2. Open the conversation with me using this link: ${SIGNAL_LINK}

My Signal username: ${SIGNAL_USERNAME}

Write whenever you want.

Billing is handled by Stripe. You can cancel anytime from the receipt email Stripe sends you separately.

—
Léo Gayrard
Clinical Psychologist · Strength athlete & coach
parlaforce.com`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; }
    h2 { font-weight: 600; margin-top: 32px; }
    a { color: #2563eb; }
    .button { display: inline-block; background: #000; color: #fff !important; padding: 14px 24px; text-decoration: none; font-weight: 700; letter-spacing: 0.05em; margin: 16px 0; }
    .username { font-family: ui-monospace, monospace; background: #f4f4f4; padding: 4px 8px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <p>Your subscription is now active. Thank you.</p>

  <p>Supervision is delivered through <strong>Signal</strong>, an end-to-end encrypted messaging app. To get started:</p>

  <p><strong>1.</strong> Install Signal on your phone if you don't have it yet: <a href="${SIGNAL_DOWNLOAD}">${SIGNAL_DOWNLOAD}</a></p>

  <p><strong>2.</strong> Open the conversation with me:</p>

  <p><a href="${SIGNAL_LINK}" class="button">Open in Signal</a></p>

  <p>My Signal username: <span class="username">${SIGNAL_USERNAME}</span></p>

  <p>Write whenever you want.</p>

  <p>Billing is handled by Stripe. You can cancel anytime from the receipt email Stripe sends you separately.</p>

  <div class="footer">
    Léo Gayrard<br>
    Clinical Psychologist · Strength athlete & coach<br>
    <a href="https://parlaforce.com">parlaforce.com</a>
  </div>
</body>
</html>`;

  return { subject, html, text };
}

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    console.error("ERREUR: Config Stripe manquante dans .env.local");
    return NextResponse.json({ error: "Missing config" }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-08-27.basil" as any,
  });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  try {
    const body = Buffer.from(await req.arrayBuffer());
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;

      console.log(`✅ Paiement validé pour : ${email}`);
      console.log(`📦 Session ID : ${session.id}`);

      // Guide installments: set cancel_at on the subscription (89 days = before 4th cycle)
      const isInstallments = session.metadata?.paymentMode === "installments";
      if (isInstallments && session.subscription) {
        const cancelAt = Math.floor(Date.now() / 1000) + 89 * 24 * 60 * 60;
        try {
          await stripe.subscriptions.update(session.subscription as string, {
            cancel_at: cancelAt,
          });
          console.log(`🔴 Abonnement ${session.subscription} sera annulé dans 89 jours`);
        } catch (subErr: any) {
          console.error("❌ Erreur mise à jour cancel_at:", subErr.message);
        }
      }

      // Supervision-specific handling: send Signal email
      const isSupervision = session.metadata?.service === "supervision";

      if (isSupervision && email) {
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
          console.error("❌ RESEND_API_KEY manquant — email supervision non envoyé");
        } else {
          const language: "en" | "fr" =
            session.metadata?.language === "fr" ? "fr" : "en";

          const { subject, html, text } = buildEmail(language);

          try {
            const resend = new Resend(resendApiKey);
            const result = await resend.emails.send({
              from: FROM_EMAIL,
              to: email,
              subject,
              html,
              text,
              replyTo: "leo.gayrard@gmail.com",
            });
            console.log(`📧 Email supervision envoyé à ${email} (${language})`, result);
          } catch (emailErr: any) {
            console.error("❌ Erreur envoi email supervision:", emailErr.message);
            // On ne fait pas échouer le webhook pour autant — le paiement est OK
            // Stripe ne doit pas retenter
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Erreur Webhook:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}