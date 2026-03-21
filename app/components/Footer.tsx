import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-sm text-gray-400 mt-16 mb-4 text-center">
      <Link href="/legal">Legal Notice</Link> |{" "}
      <Link href="/privacy">Privacy Policy</Link> |{" "}
      <Link href="/contact">Contact</Link>
    </footer>
  );
}