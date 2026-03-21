type PageProps = {
  params: { slug: string };
};

export default function ArticlePage({ params }: PageProps) {
  const { slug } = params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-white">
      <h1 className="text-4xl font-bold mb-4">{slug}</h1>
      <p className="text-xl opacity-90">
        This page will display the content of the article "{slug}" once it is added.
      </p>
    </main>
  );
}