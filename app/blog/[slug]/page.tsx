// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';

type PageProps = {
  params: { slug: string }
};

export default function Page({ params }: PageProps) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const contentHtml = remark().use(html).processSync(fileContent).toString();

  return <main className="p-8" dangerouslySetInnerHTML={{ __html: contentHtml }} />;
}