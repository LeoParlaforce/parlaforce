import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

export const runtime = "nodejs";

function generateTemporaryLink(filename: string, expiresInSec = 3600) {
  const expires = Math.floor(Date.now() / 1000) + expiresInSec;
  const key = process.env.STRIPE_SECRET_KEY!;
  const token = crypto.createHmac("sha256", key).update(filename + expires).digest("hex");

  return `${process.env.NEXT_PUBLIC_BASE_URL}/api/serve-pdf?file=${encodeURIComponent(filename)}&expires=${expires}&token=${token}`;
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ error: "Missing session" }, { status: 400 });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-27.basil" as any });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // On récupère le nom du fichier via les metadata qu'on a envoyé au checkout
    const pdfFilename = session.metadata?.pdfFile;

    if (!pdfFilename) {
      return NextResponse.json({ error: "Fichier non trouvé dans la session" }, { status: 404 });
    }

    const link = generateTemporaryLink(pdfFilename);
    return NextResponse.json({ url: link });
  } catch (err: any) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}