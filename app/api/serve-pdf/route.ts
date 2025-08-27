// app/api/serve-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const PDF_FOLDER = path.join(process.cwd(), "protected_pdfs");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("file");
  const expires = searchParams.get("expires");
  const token = searchParams.get("token");

  if (!filename || !expires || !token) {
    return new NextResponse("Paramètres manquants", { status: 400 });
  }

  // Vérifie expiration
  const now = Math.floor(Date.now() / 1000);
  if (parseInt(expires) < now) {
    return new NextResponse("Lien expiré", { status: 403 });
  }

  // Vérifie token
  const key = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY!;
  const expectedToken = crypto
    .createHmac("sha256", key)
    .update(filename + expires)
    .digest("hex");

  if (token !== expectedToken) {
    return new NextResponse("Token invalide", { status: 403 });
  }

  // Sert le fichier
  const filePath = path.join(PDF_FOLDER, filename);
  if (!fs.existsSync(filePath)) {
    return new NextResponse("Fichier introuvable", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
