import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const postsDir = path.join(process.cwd(), 'posts');

export default function Blog() {
  let posts: { slug: string; title: string }[] = [];

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir);

    posts = files.map(file => {
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      // Cherche la première ligne commençant par "# " pour le titre
      const firstLine = content.split('\n').find(line => line.startsWith('# ')) || '';
      const title = firstLine.replace(/^# /, '').trim() || file.replace(/\.md$/, '');
      return { slug: file.replace(/\.md$/, ''), title };
    });
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      {posts.length === 0 ? (
        <p>No articles yet.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.slug} className="mb-4">
              <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}