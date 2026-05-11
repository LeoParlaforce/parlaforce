import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

type Tier = "reduced" | "full";

const TIERS: Record<Tier, { amount: number; label: string }> = {
  reduced: {
    amount: 8000, // 80€
    label: "Supervision — Reduced Rate",
  },
  full: {
    amount: 15000, // 150€
    label: "Supervision — Full Rate",
  },
};

export async function POST(req: NextRequest) {
  try {
    const { tier, locale } = (await req.json()) as {
      tier?: Tier;
      locale?: string;
    };

    if (tier !== "reduced" && tier !== "full") {
      return NextResponse.json({ error: "invalid_tier" }, { status: 400 });
    }

    // Detect language from client-provided locale (browser navigator.language)
    // Default to English (parlaforce targets international anglophone audience)
    const language =
      locale && locale.toLowerCase().startsWith("fr") ? "fr" : "en";

    const baseUrl = req.nextUrl.origin;
    const { amount, label } = TIERS[tier];

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      locale: "auto",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: amount,
            recurring: { interval: "month" },
            product_data: {
              name: label,
              description:
                "Private encrypted chat with Léo Gayrard — clinical psychologist. Cancel anytime.",
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: { tier, service: "supervision", language },
      },
      metadata: { tier, service: "supervision", language },
      allow_promotion_codes: true,
      success_url: `${baseUrl}/supervision/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/supervision`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Supervision checkout error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}