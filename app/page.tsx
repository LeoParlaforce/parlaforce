export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Section Hero */}
      <section className="flex flex-col items-center justify-center flex-1 text-center bg-gradient-to-b from-blue-50 to-white p-12">
        <h1 className="text-6xl font-extrabold text-gray-900">
          Par la Force 💪
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          Des guides pratiques et motivants pour t’aider à progresser, 
          apprendre et rester inspiré au quotidien.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
            Découvrir les guides
          </button>
          <button className="px-6 py-3 text-lg border-2 border-blue-600 rounded-2xl hover:bg-blue-50">
            En savoir plus
          </button>
        </div>
      </section>

      {/* Section Guides */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">Nos guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="rounded-2xl shadow-md p-6 bg-white">
            <h3 className="text-2xl font-semibold mb-2">Guide 1</h3>
            <p className="text-gray-600 mb-4">
              Une introduction claire et motivante pour débuter ton parcours.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Voir plus
            </button>
          </div>
          <div className="rounded-2xl shadow-md p-6 bg-white">
            <h3 className="text-2xl font-semibold mb-2">Guide 2</h3>
            <p className="text-gray-600 mb-4">
              Approfondis tes connaissances et progresse étape par étape.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Voir plus
            </button>
          </div>
          <div className="rounded-2xl shadow-md p-6 bg-white">
            <h3 className="text-2xl font-semibold mb-2">Guide 3</h3>
            <p className="text-gray-600 mb-4">
              Des conseils pratiques et concrets pour rester motivé.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Voir plus
            </button>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          Tu veux en savoir plus ou me poser une question ? 
          Contacte-moi et je serai ravi d’échanger avec toi.
        </p>
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
            Me contacter
          </button>
        </div>
      </section>
    </main>
  )
}
