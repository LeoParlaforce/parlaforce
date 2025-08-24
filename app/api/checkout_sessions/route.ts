import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
console.log("🔑 STRIPE_SECRET_KEY (preview):", process.env.STRIPE_SECRET_KEY ? "✅ définie" : "❌ manquante");

// Vérifie que la clé existe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY n'est pas défini dans Vercel !");
}

// Création du client Stripe (pas besoin d’apiVersion)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    // Récupère l'origine dynamiquement (utile pour dev ET prod)
    const origin = req.headers.get("origin") || "https://parlaforce.com";

    // Création de la session Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Mon produit test",
            },
            unit_amount: 2000, // prix en centimes (20€)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    // Retourne l’URL Stripe Checkout au frontend
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err.message);
    return NextResponse.json({ error: "Erreur Stripe" }, { status: 500 });
  }
}
