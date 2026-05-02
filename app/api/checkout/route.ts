import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

export async function POST(req: NextRequest) {
  try {
    const { 
      title, 
      priceAmount, 
      currency, 
      pdfFile, 
      paymentMode,
      language 
    } = await req.json();

    // paymentMode: "once" or "installments"
    // language: "en" or "fr"

    const baseUrl = req.nextUrl.origin;

    if (paymentMode === "installments") {
      // 3 monthly payments via subscription
      const installmentAmount = Math.ceil(priceAmount / 3);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: currency || "eur",
              product_data: {
                name: `${title} - 3 monthly installments`,
                description: "Elite Protocol - Digital Delivery",
              },
              unit_amount: installmentAmount,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        subscription_data: {
          // Cancel automatically after 3 payments (3 months)
          // Trick: use cancel_at to set hard end date
          metadata: {
            pdfFile: pdfFile,
            language: language || "en",
            totalPayments: "3",
            client_currency: currency || "eur",
          },
        },
        metadata: {
          pdfFile: pdfFile,
          language: language || "en",
          paymentMode: "installments",
          client_currency: currency || "eur",
        },
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/programs`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Single payment (default)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency || "eur",
            product_data: {
              name: title,
              description: "Elite Protocol - Digital Delivery",
            },
            unit_amount: priceAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        pdfFile: pdfFile,
        language: language || "en",
        paymentMode: "once",
        client_currency: currency || "eur",
      },
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/programs`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}