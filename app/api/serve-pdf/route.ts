// app/api/serve-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Readable } from "stream";

export const runtime = "nodejs";
const PDF_FOLDER = path.join(process.cwd(), "protected_pdfs");

function buildContentDisposition(
  filename: string,
  disposition: "inline" | "attachment" = "attachment"
) {
  const ascii = filename
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\s+/g, "_");
  const utf8Encoded = encodeURIComponent(filename);
  return `${disposition}; filename="${ascii}"; filename*=UTF-8''${utf8Encoded}`;
}

function isHex64(s: string) {
  return /^[a-f0-9]{64}$/i.test(s);
}

// Normalisation tolérante pour comparer des noms
function canon(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/\s+/g, "_")
    .toLowerCase();
}

// Essaie de retrouver le vrai nom sur disque si l'exact n'existe pas
async function resolveFilenameOnDisk(requested: string): Promise<string | null> {
  try {
    const entries = await fs.promises.readdir(PDF_FOLDER);

    // 0) Exact
    if (entries.includes(requested)) return requested;

    // 1) Ajouter .pdf si absent
    if (!requested.toLowerCase().endsWith(".pdf")) {
      const withPdf = requested + ".pdf";
      if (entries.includes(withPdf)) return withPdf;
    }

    // 2) Case-insensitive
    const lowerReq = requested.toLowerCase();
    const caseHit = entries.find((e) => e.toLowerCase() === lowerReq);
    if (caseHit) return caseHit;

    // 3) Canon (sans accents, underscores/espaces normalisés, + .pdf si besoin)
    const reqWithPdf = requested.toLowerCase().endsWith(".pdf") ? requested : requested + ".pdf";
    const canReq = canon(reqWithPdf);
    const canonHit = entries.find((e) => canon(e) === canReq);
    if (canonHit) return canonHit;

    return null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filename = (searchParams.get("file") || "").trim();   // <-- tu utilises "file" côté lien
    const expiresStr = (searchParams.get("expires") || "").trim();
    const token = (searchParams.get("token") || "").trim();

    if (!filename || !expiresStr || !token) {
      return new NextResponse("Paramètres manquants", { status: 400 });
    }
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return new NextResponse("Nom de fichier invalide", { status: 400 });
    }

    const expires = Number(expiresStr);
    if (!Number.isFinite(expires)) {
      return new NextResponse("Paramètre 'expires' invalide", { status: 400 });
    }
    const now = Math.floor(Date.now() / 1000);
    if (expires < now) {
      return new NextResponse("Lien expiré", { status: 403 });
    }

    const key = process.env.STRIPE_SECRET_KEY_NEW || process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return new NextResponse("Clé serveur manquante", { status: 500 });
    }

    // Vérif token sur le nom REÇU (on ne modifie pas la surface de sécurité)
    const payload = filename + String(expires);
    const expectedHex = crypto.createHmac("sha256", key).update(payload).digest("hex");
    if (!isHex64(token)) {
      return new NextResponse("Token invalide", { status: 403 });
    }
    const tokenBuf = Buffer.from(token, "hex");
    const expectedBuf = Buffer.from(expectedHex, "hex");
    if (tokenBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(tokenBuf, expectedBuf)) {
      return new NextResponse("Token invalide", { status: 403 });
    }

    // Résolution tolérante du fichier sur disque
    const actualName = await resolveFilenameOnDisk(filename);
    if (!actualName) {
      return new NextResponse("Fichier introuvable", { status: 404 });
    }

    const filePath = path.join(PDF_FOLDER, actualName);

    // (Optionnel) Content-Length pour meilleure UX
    let contentLength: string | undefined;
    try {
      const stat = await fs.promises.stat(filePath);
      contentLength = String(stat.size);
    } catch {}

    // Web ReadableStream (pas de soucis de types)
    const nodeStream = fs.createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream) as unknown as ReadableStream;

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // on affiche le nom “demandé” (joli) dans Content-Disposition
        "Content-Disposition": buildContentDisposition(filename, "attachment"), // ou "inline"
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        ...(contentLength ? { "Content-Length": contentLength } : {}),
      },
    });
  } catch (e) {
    console.error("[serve-pdf] ERROR", e);
    return new NextResponse("Erreur interne", { status: 500 });
  }
}
