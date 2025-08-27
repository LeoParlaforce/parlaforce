// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

// Debug précis : début + fin de la clé utilisée
console.log(
  "Stripe key utilisée:",
  process.env.STRIPE_SECRET_KEY
    ? process.env.STRIPE_SECRET_KEY.slice(0, 8) +
      "..." +
      process.env.STRIPE_SECRET_KEY.slice(-6)
    : "absente"
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  const k = process.env.STRIPE_SECRET_KEY || "";
  return NextResponse.json({
    stripeKey: k ? k.slice(0, 8) + "..." + k.slice(-6) : null,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message || "Erreur inconnue" }, { status: 500 });
  }
}
