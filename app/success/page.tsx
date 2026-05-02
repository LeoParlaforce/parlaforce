import Link from "next/link";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as any,
});

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;

  let isValid = false;
  let session: Stripe.Checkout.Session | null = null;

  if (session_id) {
    try {
      session = await stripe.checkout.sessions.retrieve(session_id);
      const isOnce = session.metadata?.paymentMode === "once";
      const isInstallments = session.metadata?.paymentMode === "installments";

      if (isOnce && session.payment_status === "paid") {
        isValid = true;
      } else if (isInstallments && session.status === "complete") {
        isValid = true;
      }
    } catch (err) {
      console.error("Stripe session retrieval error:", err);
    }
  }

  if (!isValid || !session_id) {
    return (
      <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
            Issue
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6">
            Payment Not Verified<span className="text-blue-600">.</span>
          </h1>
          <p className="text-zinc-400 italic normal-case mb-12">
            We could not validate your transaction. If you just completed a payment, wait a few seconds and refresh. Otherwise, return to the shop.
          </p>
          <Link
            href="/programs"
            className="inline-block bg-blue-600 text-white font-black uppercase py-5 px-10 text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all"
          >
            Return to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-24 font-sans lowercase relative overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] md:opacity-[0.02] bg-repeat"
        aria-hidden="true"
        style={{ backgroundImage: "url('/grain.png')", backgroundSize: "200px" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
            Confirmed
          </p>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 leading-none">
            Welcome to Elite<span className="text-blue-600">.</span>
          </h1>
          <p className="text-zinc-400 italic normal-case text-lg md:text-xl max-w-2xl mx-auto">
            Your payment is confirmed. Choose your language and download your guide below. The same files are available via your Stripe receipt if you need to access them again later.
          </p>
        </div>

        <div className="border border-zinc-900 bg-zinc-950/30 p-8 md:p-12">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6 text-center">
            Download
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-10 text-center">
            Choose Your Version<span className="text-blue-600">.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`/api/download?session_id=${session_id}&lang=en`}
              className="group border border-zinc-800 hover:border-blue-600 bg-black p-8 text-center transition-all"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-blue-600 mb-3 transition-colors">
                English
              </p>
              <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6">
                Elite — EN
              </p>
              <span className="inline-block bg-blue-600 text-white font-black uppercase py-3 px-8 text-[10px] tracking-[0.3em] group-hover:bg-white group-hover:text-black transition-all">
                Download PDF
              </span>
            </a>

            <a
              href={`/api/download?session_id=${session_id}&lang=fr`}
              className="group border border-zinc-800 hover:border-blue-600 bg-black p-8 text-center transition-all"
            >
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-blue-600 mb-3 transition-colors">
                Français
              </p>
              <p className="text-white font-black uppercase italic text-2xl tracking-tight mb-6">
                Elite — FR
              </p>
              <span className="inline-block bg-blue-600 text-white font-black uppercase py-3 px-8 text-[10px] tracking-[0.3em] group-hover:bg-white group-hover:text-black transition-all">
                Télécharger PDF
              </span>
            </a>
          </div>

          <p className="text-zinc-600 italic normal-case text-xs text-center mt-10">
            Both versions are included with your purchase. Download both if you wish.
          </p>
        </div>

        <div className="text-center mt-16">
          <Link
            href="/articles"
            className="inline-block border border-zinc-800 text-zinc-400 font-black uppercase py-4 px-8 text-[10px] tracking-[0.4em] hover:border-blue-600 hover:text-blue-600 transition-all"
          >
            Read More Articles →
          </Link>
        </div>
      </div>
    </main>
  );
}
