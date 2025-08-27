// app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const PDF_FOLDER = "/protected_pdfs/";

function generateTemporaryLink(filename: string, expiresInSec = 3600) {
  const expires = Math.floor(Date.now() / 1000) + expiresInSec;
  const key = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY!; // <-- utilise NEW en priorité
  const token = crypto
    .createHmac("sha256", key)
    .update(filename + expires)
    .digest("hex");

  return `${process.env.NEXT_PUBLIC_BASE_URL}${PDF_FOLDER}${filename}?expires=${expires}&token=${token}`;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    console.error("STRIPE_SECRET_KEY manquant !");
    return NextResponse.json({ error: "STRIPE_SECRET_KEY manquant" }, { status: 500 });
  }
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET manquant !");
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET manquant" }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);

  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    const body = Buffer.from(await req.arrayBuffer());
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Erreur signature Stripe:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const { data } = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
    const priceId = data[0]?.price?.id;

    let pdfFilename = "";
    switch (priceId) {
      case "price_1S01zCGzln310EBqT1Eicmj9":
        pdfFilename = "Strongman.pdf";
        break;
      case "price_1S01yYGzln310EBqvLgvATcC":
        pdfFilename = "Guide du home gym.pdf";
        break;
      case "price_1S01y2Gzln310EBq5UnMtkxl":
        pdfFilename = "La diète - Guide pour transformer votre corps selon vos objectifs.pdf";
        break;
      case "price_1S01x9Gzln310EBq2zrmKT7o":
        pdfFilename = "Mobilité - Guide du corps massif en santé & en mouvement.pdf";
        break;
      case "price_1S01w0Gzln310EBqOQE5vPij":
        pdfFilename = "Comment créer son propre programme ou en personnaliser un qui existe déjà.pdf";
        break;
      case "price_1S01uTGzln310EBq3zDeJ5HH":
        pdfFilename = "Guide psychologique pour arrêter d'être une petite sal.pe dans les sports de force.pdf";
        break;
    }

    if (pdfFilename && session.customer_email) {
      const link = generateTemporaryLink(pdfFilename, 3600);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: session.customer_email,
        subject: "Votre PDF après paiement",
        html: `<p>Bonjour,</p>
               <p>Merci pour votre achat ! Vous pouvez télécharger votre PDF ici (valable 1h) :</p>
               <p><a href="${link}">Télécharger le PDF</a></p>
               <p>Bonne lecture !</p>`,
      });
      console.log(`Lien PDF envoyé à ${session.customer_email}: ${link}`);
    }
  }

  return NextResponse.json({ received: true });
}
