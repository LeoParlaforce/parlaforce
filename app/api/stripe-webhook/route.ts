import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

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

    // On traite uniquement la complétion du paiement
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Log pour debug en console
      console.log(`✅ Paiement validé pour : ${session.customer_details?.email}`);
      console.log(`📦 Session ID : ${session.id}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("❌ Erreur Webhook:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}