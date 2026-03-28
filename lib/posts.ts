import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'app/posts')

// Utilitaire pour calculer le temps de lecture
function getReadingTime(content: string) {
  const wordsPerMinute = 200;
  const numberOfWords = content.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
}

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return []
  
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "Untitled Protocol",
        date: data.date || new Date().toISOString(),
        summary: data.summary || "",
        image: data.image || "/og-image.png",
        category: data.category || "General",
        readingTime: getReadingTime(content),
        author: data.author || "Leo Gayrard",
        wordCount: content.split(/\s/g).length
      }
    })

  // Tri par date décroissante (plus récent en premier)
  return allPostsData.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

export function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) return null
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return { 
      slug, 
      content, 
      title: data.title || "Untitled Protocol",
      date: data.date || new Date().toISOString(),
      summary: data.summary || "",
      image: data.image || "/og-image.png",
      category: data.category || "General",
      readingTime: getReadingTime(content),
      author: data.author || "Leo Gayrard"
    }
  } catch (e) {
    console.error(`Error loading post ${slug}:`, e)
    return null
  }
}