export default function NavBar() {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-blue-600">
          Par la Force
        </a>

        {/* Liens */}
        <div className="flex gap-6 text-gray-700">
          <a href="/" className="hover:text-blue-600 transition">
            Accueil
          </a>
          <a href="/contact" className="hover:text-blue-600 transition">
            Contact
          </a>
          <a href="#services" className="hover:text-blue-600 transition">
            Services
          </a>
        </div>
      </div>
    </nav>
  );
}
