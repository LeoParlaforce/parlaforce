// app/api/get-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

export const runtime = "nodejs";

const PDF_FOLDER = "/protected_pdfs/";

function verifyTemporaryLink(token: string, filename: string, expires: number) {
  const expectedToken = crypto
    .createHmac("sha256", process.env.STRIPE_SECRET_KEY!)
    .update(filename + expires)
    .digest("hex");
  return expectedToken === token && Math.floor(Date.now() / 1000) < expires;
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-07-30.basil" });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 1 });
    const priceId = lineItems.data[0].price?.id;

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

    if (!pdfFilename || !session.customer_email) {
      return NextResponse.json({ error: "Impossible de générer le lien" }, { status: 400 });
    }

    // Génère un lien temporaire valide 1h
    const expires = Math.floor(Date.now() / 1000) + 3600;
    const token = crypto
      .createHmac("sha256", process.env.STRIPE_SECRET_KEY!)
      .update(pdfFilename + expires)
      .digest("hex");

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}${PDF_FOLDER}${pdfFilename}?expires=${expires}&token=${token}`;

    return NextResponse.json({ url: link });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Erreur inconnue" }, { status: 500 });
  }
}
