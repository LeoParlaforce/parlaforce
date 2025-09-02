"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  isNew?: boolean;
};

const products: Product[] = [
  // Nouveaux produits en tête
  {
    id: "price_1S2pY2Gzln310EBqtXDba2PK",
    name: "Fake natty - 12 semaines d'entraînement",
    price: "15€",
    isNew: true,
  },
  {
    id: "price_1S2pXBGzln310EBqWmq3YzF0",
    name: "Tié un tigre - 12 semaines powerlifting édition",
    price: "15€",
    isNew: true,
  },

  // Anciens produits
  { id: "price_1S01uTGzln310EBq3zDeJ5HH", name: "Le Guide psychologique des sports de Force", price: "20€" },
  { id: "price_1S01w0Gzln310EBqOQE5vPij", name: "Comment créer son propre programme", price: "15€" },
  { id: "price_1S01y2Gzln310EBq5UnMtkxl", name: "Diète : transformez votre corps", price: "10€" },
  { id: "price_1S01x9Gzln310EBq2zrmKT7o", name: "Mobilité - mouvement & santé du corps massif", price: "10€" },
  { id: "price_1S01yYGzln310EBqvLgvATcC", name: "Guide du home gym", price: "5€" },
  { id: "price_1S01zCGzln310EBqT1Eicmj9", name: "Strongman - 6 semaines d'entraînement", price: "15€" },
];

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Erreur Stripe : " + (data.error ?? "inconnue"));
    } catch {
      alert("Une erreur est survenue");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="relative min-h-screen text-white">
      {/* BACKGROUND FIXE (met ton image dans /public/bg.jpg si besoin) */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpg')", // si ton fond est injecté par CSS global, laisse cette ligne telle quelle ou supprime-la
        }}
      />
      {/* VOILE NOIR PAR-DESSUS LE FOND */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/60" />

      {/* CONTENU */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-5xl font-bold mb-4 drop-shadow">Par la Force</h1>
        <p className="text-xl mb-12 opacity-95 drop-shadow">Guides et programmes pour libérer votre potentiel</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-black/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105"
            >
              {product.isNew && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  Nouveau
                </span>
              )}
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="mb-4">{product.price}</p>
              <button
                onClick={() => handleCheckout(product.id)}
                disabled={loading === product.id}
                className="w-full bg-teal-900 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {loading === product.id ? "Redirection..." : "Acheter"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
