import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.blackhorngrp.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/services/wealth-management', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/family-office', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/investment-advisory', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services/estate-legacy', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/family-office', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/awards', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/insights', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: '/careers', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/disclaimer', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const now = new Date()

  return staticPages.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // TODO: Add dynamic routes from Sanity (insights articles)
  // const insights = await getInsights()
  // const insightUrls = insights.map((insight) => ({
  //   url: `${BASE_URL}/insights/${insight.slug}`,
  //   lastModified: new Date(insight._updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))
  // return [...staticUrls, ...insightUrls]
}
