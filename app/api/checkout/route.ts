import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

export async function POST(req: NextRequest) {
  try {
    const { title, priceAmount, currency, pdfFile } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "eur", // Utilise la devise détectée (usd, eur, cad)
            product_data: { 
              name: title,
              description: "Clinical Protocol - Digital Delivery"
            },
            unit_amount: priceAmount, // Le montant est déjà en centimes
          },
          quantity: 1,
        },
      ],
      metadata: { 
        pdfFile: pdfFile,
        client_currency: currency || "eur" 
      },
      mode: "payment",
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/programs`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}