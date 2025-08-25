import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Assure Node runtime (Stripe a besoin de Node, pas Edge)
export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// GET = simple test dans le navigateur
export async function GET() {
  return NextResponse.json({ status: "✅ Webhook en ligne et prêt" });
}

// POST = appelé par Stripe
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    const body = await req.text(); // raw body
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook verify error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("💰 checkout.session.completed:", session.id);
      break;
    }
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log("✅ payment_intent.succeeded:", pi.id);
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log("❌ payment_intent.payment_failed:", pi.id);
      break;
    }
    default:
      console.log("ℹ️ event:", event.type);
  }

  return new Response("ok", { status: 200 });
}
