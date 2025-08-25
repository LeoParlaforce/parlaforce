"use client";

import { useState } from "react";

const products = [
  {
    id: "price_1S01uTGzln310EBq3zDeJ5HH", // Guide psycho
    name: "Le Guide psychologique des sports de Force",
    price: "20€",
  },
  {
    id: "price_1S01w0Gzln310EBqOQE5vPij", // Programme
    name: "Comment créer son propre programme",
    price: "15€",
  },
  {
    id: "price_1S01y2Gzln310EBq5UnMtkxl", // Diète
    name: "Diète : transformez votre corps",
    price: "10€",
  },
  {
    id: "price_1S01x9Gzln310EBq2zrmKT7o", // Mobilité
    name: "Mobilité - le Guide du mouvement & de la santé du corps massif",
    price: "10€",
  },
  {
    id: "price_1S01yYGzln310EBqvLgvATcC", // Home gym
    name: "Guide du home gym",
    price: "5€",
  },
  {
    id: "price_1S01zCGzln310EBqT1Eicmj9", // Strongman
    name: "Strongman - 6 semaines d'entraînement",
    price: "15€",
  },
];

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setLoading(priceId);
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur Stripe : " + (data.error ?? "inconnue"));
      }
    } catch {
      alert("Une erreur est survenue");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main
      className="min-h-screen text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/60 min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-5xl font-bold mb-4">Par la Force</h1>
        <p className="text-xl mb-12">Découvrez votre vrai potentiel</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-black bg-opacity-40 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-[0_0_20px_5px_rgba(255,215,0,0.8)]"
            >
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
      </div>
    </main>
  );
}
