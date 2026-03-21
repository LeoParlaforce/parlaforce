import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';

export default async function Page({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'posts', `${params.slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const contentHtml = await remark().use(html).process(fileContent);

  return <main className="p-8" dangerouslySetInnerHTML={{ __html: contentHtml.toString() }} />;
}