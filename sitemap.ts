import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parlaforce.com'
  const posts = getAllPosts()
  
  // 1. Articles dynamiques
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // 2. Programmes spécifiques
  const programSlugs = ['programme-anxiete', 'restructuration-cognitive'] 
  
  const programEntries: MetadataRoute.Sitemap = programSlugs.map((slug) => ({
    url: `${baseUrl}/programs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // 3. Pages statiques (Home, Index Articles, Index Programs, Supervision)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/supervision`, // Ajout de la nouvelle interface
      lastModified: new Date(),
      changeFrequency: 'daily', // Haute fréquence car c'est un point de conversion clé
      priority: 0.9,
    },
  ]

  // Fusion de toutes les entrées sans rien supprimer du passé
  return [...staticPages, ...programEntries, ...postEntries]
}