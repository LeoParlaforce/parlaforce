import Link from "next/link";
import RandomTexture from "@/components/RandomTexture";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const SIGNAL_LINK = "https://signal.me/#u/leogayrard.11";
const SIGNAL_USERNAME = "@leogayrard.11";

async function verifySession(sessionId: string | undefined) {
  if (!sessionId) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-08-27.basil" as any,
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.status === "complete" || session.payment_status === "paid") {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

export default async function SupervisionSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const session = await verifySession(params.session_id);
  const valid = !!session;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-6 bg-black font-sans lowercase relative overflow-x-hidden text-white w-full">
      <div className="pointer-events-none fixed inset-0 z-[0] opacity-10">
        <RandomTexture />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-[0]"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.60) 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.90' numOctaves='1' stitchTiles='stitch' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fineGrain)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-12 left-0 right-0 flex justify-center z-[110]">
        <Link
          href="/"
          className="text-zinc-500 hover:text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] transition-all py-4 px-8 inline-block"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-3xl w-full relative z-10 py-32 text-center">
        {valid ? (
          <>
            <div className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] mb-6">
              Subscription Active
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-12 italic">
              Welcome.
            </h1>

            <div className="space-y-12 max-w-xl mx-auto text-left">
              <div className="border-l border-blue-600 pl-6">
                <h2 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                  Next Step
                </h2>
                <p className="text-zinc-300 text-base italic leading-relaxed">
                  Your supervision is delivered through Signal — a private,
                  encrypted messaging app. Install Signal on your phone (and
                  optionally on your computer), then start the conversation with
                  the link below.
                </p>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 p-6 space-y-4">
                <div className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em]">
                  Signal Contact
                </div>
                <div className="text-white text-2xl font-mono lowercase break-all">
                  {SIGNAL_USERNAME}
                </div>
                <a
                  href={SIGNAL_LINK}
                  className="inline-block bg-white text-black font-black uppercase py-4 px-8 hover:bg-blue-600 hover:text-white transition-all text-sm tracking-widest w-full text-center"
                >
                  Open in Signal
                </a>
                <p className="text-zinc-600 text-[10px] leading-relaxed">
                  Don&apos;t have Signal yet? Download it free for iOS, Android,
                  macOS, Windows and Linux at{" "}
                  <a
                    href="https://signal.org/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    signal.org/download
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-3 text-zinc-500 text-xs leading-relaxed italic">
                <p>
                  This link has also been sent to your email along with your
                  Stripe receipt.
                </p>
              </div>

              <div className="pt-8 border-t border-zinc-900">
                <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest">
                  Billing managed via Stripe. Cancel anytime from your receipt
                  email.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-8 italic">
              Session not found.
            </h1>
            <p className="text-zinc-400 text-base italic mb-8 max-w-xl mx-auto">
              We couldn&apos;t verify your subscription. If you just paid, wait a
              few seconds and refresh. Otherwise, return to the supervision page
              to subscribe.
            </p>
            <Link
              href="/supervision"
              className="inline-block bg-white text-black font-black uppercase py-4 px-8 hover:bg-blue-600 hover:text-white transition-all text-sm tracking-widest"
            >
              Back to Supervision
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
