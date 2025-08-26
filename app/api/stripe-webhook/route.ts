// route.ts (version temporaire pour éviter l'erreur de build)

import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Retourner une réponse simple pour ne pas bloquer la build
  return new Response("Webhook temporairement désactivé", { status: 200 });
}

export async function GET() {
  return new Response("Webhook temporairement désactivé");
}
