export const metadata = {
  title: "Contact | Parla Force",
  description: "Contactez Parla Force pour toute question sur nos programmes d'entraînement ou nos articles.",
}

export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-32 text-center text-white">
      <h1 className="text-5xl font-bold tracking-tight mb-6">Contactez-nous</h1>
      <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto">
        Pour toute question concernant nos programmes, nos articles ou une demande d'accompagnement.
      </p>
      
      <a 
        href="mailto:leo.gayrard@gmail.com" 
        className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors"
      >
        leo.gayrard@gmail.com
      </a>
    </main>
  )
}