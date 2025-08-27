// app/api/serve-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const PDF_FOLDER = path.join(process.cwd(), "protected_pdfs"); // chemin absolu vers le dossier

function verifyTemporaryLink(token: string, filename: string, expires: number) {
  const expectedToken = crypto
    .createHmac("sha256", process.env.STRIPE_SECRET_KEY!)
    .update(filename + expires)
    .digest("hex");
  return expectedToken === token && Math.floor(Date.now() / 1000) < expires;
}

export async function GET(req: NextRequest) {
  const fileParam = req.nextUrl.searchParams.get("file");
  const token = req.nextUrl.searchParams.get("token");
  const expiresStr = req.nextUrl.searchParams.get("expires");

  if (!fileParam || !token || !expiresStr) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  const filename = decodeURIComponent(fileParam); 
  const expires = parseInt(expiresStr, 10);

  if (!verifyTemporaryLink(token, filename, expires)) {
    return NextResponse.json({ error: "Lien invalide ou expiré" }, { status: 403 });
  }

  const filePath = path.join(PDF_FOLDER, filename);

  // Vérification avant lecture du fichier
  const exists = fs.existsSync(filePath);
  console.log("Serve-pdf: recherche du fichier ->", filePath, "Existe :", exists);

  if (!exists) {
    const filesInFolder = fs.readdirSync(PDF_FOLDER);
    console.error("Fichier introuvable. Contenu du dossier protected_pdfs :", filesInFolder);
    return NextResponse.json({ error: "Fichier introuvable" }, { status: 404 });
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
