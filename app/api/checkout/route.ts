// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

function mask(s?: string | null) {
  return s ? s.slice(0, 8) + "..." + s.slice(-6) : null;
}

const ACTIVE_KEY =
  process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY; // <— priorité à la NEW

console.log("Stripe key utilisée:", mask(ACTIVE_KEY));

const stripe = new Stripe(ACTIVE_KEY!);

export async function GET() {
  return NextResponse.json({
    stripeKey: mask(ACTIVE_KEY),
    STRIPE_SECRET_KEY_NEW: mask(process.env.STRIPE_SECRET_KEY_NEW || null),
    STRIPE_SECRET_KEY: mask(process.env.STRIPE_SECRET_KEY || null),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();
    if (!priceId) return NextResponse.json({ error: "Missing priceId" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
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
