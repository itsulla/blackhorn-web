'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import type { CMSBlogPost } from '@/lib/sanity/fetch'
import { localized } from '@/lib/i18n-utils'

const CATEGORIES = [
  { value: 'all', key: 'allPosts' },
  { value: 'market-commentary', key: 'marketCommentary' },
  { value: 'company-news', key: 'companyNews' },
  { value: 'investment-insights', key: 'investmentInsights' },
  { value: 'event-recap', key: 'eventRecap' },
  { value: 'industry-update', key: 'industryUpdate' },
] as const

const CATEGORY_KEYS: Record<string, string> = {
  'market-commentary': 'marketCommentary',
  'company-news': 'companyNews',
  'investment-insights': 'investmentInsights',
  'event-recap': 'eventRecap',
  'industry-update': 'industryUpdate',
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogCategoryFilter({
  posts,
}: {
  posts: CMSBlogPost[]
}) {
  const t = useTranslations('blog')
  const locale = useLocale()
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`font-sans text-xs uppercase tracking-widest transition-all duration-300 px-4 py-2 border ${
                activeCategory === cat.value
                  ? 'border-gold-dark bg-gold-dark/10 text-gold-dark'
                  : 'border-light-border text-light-text-secondary hover:border-gold-dark/40 hover:text-light-text'
              }`}
            >
              {t(cat.key)}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {filtered.length === 0 ? (
              <p className="col-span-full py-12 text-center font-sans text-light-text-secondary">
                {t('noPosts')}
              </p>
            ) : (
              filtered.map((post) => (
                <Link
                  key={post._id}
                  href={`/insights/news/${post.slug.current}`}
                  className="group flex flex-col border border-light-border bg-white shadow-sm transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-gold-dark/30 hover:shadow-md"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt={localized(post, 'title', locale)}
                        fill
                        className="object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-light-bg">
                        <span className="text-3xl text-gold-dark/20">BH</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-center gap-2">
                      {post.category && (
                        <span className="font-sans text-xs uppercase tracking-widest text-gold-dark">
                          {t(CATEGORY_KEYS[post.category] || 'allPosts')}
                        </span>
                      )}
                      <span className="text-light-text-secondary/40">&middot;</span>
                      <span className="font-sans text-xs text-light-text-secondary">
                        {formatDate(post.publishDate)}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-light leading-snug text-light-text transition-colors duration-300 group-hover:text-gold-dark line-clamp-2">
                      {localized(post, 'title', locale)}
                    </h3>
                    {(post.excerpt || post.excerpt_zh) && (
                      <p className="mt-3 flex-1 font-sans text-sm font-light leading-relaxed text-light-text-secondary line-clamp-3">
                        {localized(post, 'excerpt', locale)}
                      </p>
                    )}
                    <div className="mt-6 flex items-center justify-between">
                      {post.author && (
                        <span className="font-sans text-xs text-light-text-secondary">
                          {t('by')} {localized(post.author, 'name', locale)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-gold-dark opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                        {t('readMore')} ›
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
