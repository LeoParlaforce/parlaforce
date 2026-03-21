// app/blog/[slug]/page.tsx
"use client";

import Footer from "../../components/Footer";

type Props = {
  params: { slug: string };
};

export default function BlogPost({ params }: Props) {
  const { slug } = params;

  // Ici tu peux récupérer ton contenu réel du blog si tu as un système,
  // pour l'instant on affiche juste le slug
  return (
    <main className="min-h-screen px-6 py-12 bg-gray-900 text-white">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Blog Post: {slug}</h1>

        <article className="prose prose-invert">
          <p>
            {/* Ici tu affiches le contenu réel de ton article */}
            Content for post "{slug}" will appear here.
          </p>
        </article>

        <div className="mt-12 text-center">
          <a href="/" className="text-teal-400 underline">
            Back to site
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}