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
    // On récupère "session_id" (ce que Stripe envoie dans l'URL)
    const sessionId = searchParams.get("session_id");
    
    if (!sessionId) {
      setLoading(false);
      setError(true);
      return;
    }

    // CORRECTION ICI : On envoie "sessionId" (sans underscore) à l'API pour matcher le code de l'API
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
        <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-8">
          PROTOCOL <span className="text-blue-600">ACQUIRED.</span>
        </h1>

        {loading && (
          <p className="text-zinc-500 animate-pulse tracking-widest uppercase text-xs font-bold">
            Verifying session & generating link...
          </p>
        )}

        {!loading && downloadLink && (
          <div className="space-y-8">
            <p className="text-zinc-400 leading-relaxed italic">
              Your psychological protocol is ready for download. 
              Restructure your performance architecture now.
            </p>
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-black font-black uppercase py-4 px-8 hover:bg-blue-600 hover:text-white transition-all text-sm tracking-widest"
            >
              Download PDF Protocol
            </a>
          </div>
        )}

        {!loading && (error || !downloadLink) && (
          <div className="space-y-6">
            <p className="text-red-900 uppercase text-xs font-black tracking-widest bg-red-950/30 py-2">
              Error: Session not found
            </p>
            <p className="text-zinc-500 text-sm italic">
              Unable to generate secure link. If you have been charged, contact the architect directly.
            </p>
          </div>
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
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <SuccessContent />
    </Suspense>
  );
}