"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    // Appel à ton endpoint pour récupérer le lien sécurisé
    fetch(`/api/get-pdf?sessionId=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.url) setDownloadLink(data.url);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Paiement réussi ! 🎉</h1>

      {loading && <p>Génération de votre lien de téléchargement…</p>}

      {!loading && downloadLink && (
        <a
          href={downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-6 py-3 bg-teal-700 hover:bg-teal-900 text-white rounded-lg"
        >
          Télécharger votre PDF
        </a>
      )}

      {!loading && !downloadLink && <p>Impossible de générer le lien. Contactez-nous.</p>}
    </main>
  );
}
