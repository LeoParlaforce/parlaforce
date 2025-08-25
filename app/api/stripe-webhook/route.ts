import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Erreur vérification webhook:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("💰 Paiement confirmé:", session.id);

    try {
      await resend.emails.send({
        from: "no-reply@parlaforce.com",
        to: session.customer_email ?? "tonadresse@gmail.com", // fallback test
        subject: "Merci pour ton achat 💪",
        html: `
          <h2>Bravo et merci !</h2>
          <p>Ton paiement est confirmé. Voici ton lien de téléchargement :</p>
          <p><a href="https://parlaforce.com/download/guide.pdf">📥 Télécharger ton guide</a></p>
        `,
      });
      console.log("📧 Email envoyé !");
    } catch (emailErr: any) {
      console.error("❌ Erreur envoi email:", emailErr);
    }
  }

  return new Response("ok", { status: 200 });
}

export async function GET() {
  return new Response("✅ Webhook en ligne");
}
