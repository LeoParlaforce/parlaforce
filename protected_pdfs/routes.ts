// app/protected_pdfs/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const expires = url.searchParams.get("expires");

  if (!token || !expires) {
    return new NextResponse("Lien invalide", { status: 400 });
  }

  const expiresInt = parseInt(expires, 10);
  if (isNaN(expiresInt) || expiresInt < Math.floor(Date.now() / 1000)) {
    return new NextResponse("Lien expiré", { status: 403 });
  }

  // Vérifie le token côté serveur
  const expectedToken = crypto
    .createHmac("sha256", process.env.STRIPE_SECRET_KEY!)
    .update(filename + expires)
    .digest("hex");

  if (token !== expectedToken) {
    return new NextResponse("Token invalide", { status: 403 });
  }

  // Chemin réel du fichier PDF
  const pdfPath = path.join(process.cwd(), "protected_pdfs", filename);

  if (!fs.existsSync(pdfPath)) {
    return new NextResponse("Fichier non trouvé", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(pdfPath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
