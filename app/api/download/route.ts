import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    const language = searchParams.get("lang") || "en";

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    // Validate Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check that payment is valid
    // For "once" mode: payment_status must be "paid"
    // For "installments" mode: subscription must be active
    const isOnce = session.metadata?.paymentMode === "once";
    const isInstallments = session.metadata?.paymentMode === "installments";

    let isValid = false;

    if (isOnce && session.payment_status === "paid") {
      isValid = true;
    } else if (isInstallments && session.status === "complete") {
      // First installment paid, grant access
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json({ error: "Payment not validated" }, { status: 403 });
    }

    // Resolve PDF file based on language
    // Files expected in: <project_root>/protected_pdfs/elite-en.pdf and elite-fr.pdf
    const filename = language === "fr" ? "elite-fr.pdf" : "elite-en.pdf";
    const filePath = path.join(process.cwd(), "protected_pdfs", filename);

    if (!fs.existsSync(filePath)) {
      console.error(`PDF not found: ${filePath}`);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Elite-${language.toUpperCase()}.pdf"`,
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (err: any) {
    console.error("Download Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}