// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) throw new Error("STRIPE_SECRET_KEY manquant !");
if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET manquant !");

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-07-30.basil" });

// Dossier contenant les PDFs privés
const PDF_FOLDER = "/protected_pdfs/";

// Génère un lien temporaire signé
function generateTemporaryLink(filename: string, expiresInSec = 3600) {
  const expires = Math.floor(Date.now() / 1000) + expiresInSec;
  const token = crypto
    .createHmac("sha256", process.env.STRIPE_SECRET_KEY!)
    .update(filename + expires)
    .digest("hex");

  return `${process.env.NEXT_PUBLIC_BASE_URL}${PDF_FOLDER}${filename}?expires=${expires}&token=${token}`;
}

// Middleware côté page PDF pour vérifier token
// Ex: app/protected_pdfs/[filename]/route.ts
// Vérifier token et expiration avant de servir le fichier

export async function POST(req: NextRequest) {
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf);
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret as string);
  } catch (err: any) {
    console.log("Erreur signature Stripe:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode === "subscription") {
      const subscriptionId = session.subscription as string;
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const items = subscription.items.data;
      const priceId = items[0].price.id;

      let pdfFilename = "";

      switch (priceId) {
        case "price_1S01zCGzln310EBqT1Eicmj9":
          pdfFilename = "strongman_6_semaines.pdf";
          break;
        case "price_1S01yYGzln310EBqvLgvATcC":
          pdfFilename = "guide_home_gym.pdf";
          break;
        case "price_1S01y2Gzln310EBq5UnMtkxl":
          pdfFilename = "diete.pdf";
          break;
        case "price_1S01x9Gzln310EBq2zrmKT7o":
          pdfFilename = "mobilite.pdf";
          break;
        case "price_1S01w0Gzln310EBqOQE5vPij":
          pdfFilename = "creer_son_programme.pdf";
          break;
        case "price_1S01uTGzln310EBq3zDeJ5HH":
          pdfFilename = "guide_psychique.pdf";
          break;
      }

      if (pdfFilename && session.customer_email) {
        const link = generateTemporaryLink(pdfFilename, 3600); // lien valide 1h
        console.log(`Envoyer lien sécurisé à ${session.customer_email}: ${link}`);
        // Ici : envoyer l’email via ton service (SendGrid, Nodemailer, etc.)
      }
    }
  }

  return NextResponse.json({ received: true });
}
