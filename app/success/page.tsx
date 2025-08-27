"use client";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          Paiement réussi 🎉
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Merci pour votre achat !
        </p>
        <p className="text-base text-gray-600">
          Vous allez recevoir un <span className="font-semibold">email</span> avec
          le lien de téléchargement de votre PDF (valable 1 heure).
        </p>
      </div>
    </main>
  );
}
