import Link from "next/link";

export default function Privacy() {
  return (
    <main className="p-8 text-white">
      
      <Link href="/" className="mb-6 inline-block text-blue-400 underline">
        ← Back to site
      </Link>

      <h1 className="text-2xl mb-4">Privacy Policy</h1>

      <p>This website does not collect personal data except what you voluntarily provide.</p>
      <p>Payments are processed securely via Stripe.</p>
      <p>No data is sold or shared.</p>
    </main>
  );
}