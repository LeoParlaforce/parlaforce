"use client";

import Link from "next/link";
import Footer from "../components/Footer";

// Liste de tous les articles du blog
const articles = [
  {
    slug: "nutrition",
    title: "Understanding Nutrition for Everyone",
    summary:
      "How proteins, carbs, and fats work for everyone and why tracking your diet matters for health and performance.",
  },
  // Tu peux ajouter d'autres articles ici
];

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>

        <div className="grid gap-8">
          {articles.map((article) => (
            <div
              key={article.slug}
              className="bg-black/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="mb-4">{article.summary}</p>
              <Link
                href={`/blog/${article.slug}`}
                className="inline-block bg-teal-900 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Read Article
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}