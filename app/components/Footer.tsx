export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Texte */}
        <p className="text-gray-600 text-sm text-center md:text-left">
          © {new Date().getFullYear()} Par la Force. Tous droits réservés.
        </p>

        {/* Liens */}
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="/contact" className="hover:text-blue-600 transition">
            Contact
          </a>
          <a href="#about" className="hover:text-blue-600 transition">
            À propos
          </a>
          <a href="#services" className="hover:text-blue-600 transition">
            Services
          </a>
        </div>
      </div>
    </footer>
  );
}
