"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setLoading(false);
      setError(true);
      return;
    }

    fetch(`/api/get-pdf?sessionId=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.url) {
          setDownloadLink(data.url);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans lowercase text-center">
      <div className="max-w-md w-full border border-zinc-900 p-12 bg-zinc-950 shadow-2xl">

        {/* ÉTAT : CHARGEMENT */}
        {loading && (
          <>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-8">
              VERIFYING<span className="text-blue-600">.</span>
            </h1>
            <p className="text-zinc-500 animate-pulse tracking-widest uppercase text-xs font-bold">
              Securing your download link...
            </p>
          </>
        )}

        {/* ÉTAT : SUCCÈS */}
        {!loading && downloadLink && (
          <>
            <div className="mb-8">
              {/* Icône visuelle de succès */}
              <div className="w-12 h-12 border-2 border-blue-600 flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <span className="text-blue-600 font-black text-xl">✓</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                PROTOCOL <span className="text-blue-600">ACQUIRED.</span>
              </h1>
            </div>
            <p className="text-zinc-400 leading-relaxed italic mb-8">
              Your protocol is ready. Download it now — the link expires in 1 hour.
            </p>
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-black font-black uppercase py-4 px-8 hover:bg-blue-600 hover:text-white transition-all text-sm tracking-widest mb-4"
            >
              Download PDF Protocol
            </a>
            {/* Réassurance post-achat */}
            <p className="text-zinc-700 text-[9px] font-black uppercase tracking-widest">
              Check your spam if you don't receive confirmation
            </p>
          </>
        )}

        {/* ÉTAT : ERREUR */}
        {!loading && (error || !downloadLink) && (
          <>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-8">
              ERROR<span className="text-blue-600">.</span>
            </h1>
            <div className="space-y-6">
              <p className="text-red-900 uppercase text-xs font-black tracking-widest bg-red-950/30 py-3 px-4">
                Session not found or expired
              </p>
              <p className="text-zinc-500 text-sm italic normal-case leading-relaxed">
                If you were charged, contact us immediately with your payment confirmation.
              </p>
              {/* FIX CONVERSION : lien direct vers le mail avec sujet pré-rempli */}
              <a
                href="mailto:leo.gayrard@gmail.com?subject=Download issue — Par la force&body=My Stripe session ID is: "
                className="block w-full border border-zinc-800 text-zinc-400 font-black uppercase py-3 px-6 text-[10px] tracking-[0.3em] hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Contact Support →
              </a>
            </div>
          </>
        )}

        <div className="mt-12 pt-8 border-t border-zinc-900">
          <Link
            href="/programs"
            className="text-zinc-700 hover:text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] transition-all"
          >
            ← Return to Systems
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    // FIX : Suspense obligatoire pour useSearchParams() dans Next.js App Router
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-700 text-xs uppercase tracking-widest font-black animate-pulse">Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
