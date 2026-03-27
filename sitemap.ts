import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://parlaforce.com'
  const posts = getAllPosts()
  
  // 1. Tes Articles (Dynamiques)
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7, // Articles informatifs
  }))

  // 2. Tes Programmes (Pages de conversion / Revenus)
  // Ajoute ici le slug de chaque dossier présent dans app/programs
  const programSlugs = ['programme-anxiete', 'restructuration-cognitive'] // Remplace par tes vrais noms de dossiers
  
  const programEntries: MetadataRoute.Sitemap = programSlugs.map((slug) => ({
    url: `${baseUrl}/programs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, // Haute priorité car ce sont tes produits
  }))

  // 3. Pages Statiques de base
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1, // Accueil = Priorité maximale
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
  ]

  return [...staticPages, ...programEntries, ...postEntries]
}