import Link from "next/link";

export default function Legal() {
  return (
    <main className="p-8 text-white">
      
      <Link href="/" className="mb-6 inline-block text-blue-400 underline">
        ← Back to site
      </Link>

      <h1 className="text-2xl mb-4">Legal Notice</h1>

      <p>Owner: Léo Gayrard</p>
      <p>SIRET: 53816800600020</p>
      <p>Address: 1184 route de la maurette, 83520 Roquebrune-sur-Argens, France</p>
      <p>Email: leo.gayrard@gmail.com</p>
    </main>
  );
}