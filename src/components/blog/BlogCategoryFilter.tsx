'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import type { CMSBlogPost } from '@/lib/sanity/fetch'

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
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gold/10 text-muted hover:border-gold/30 hover:text-light'
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
              <p className="col-span-full py-12 text-center font-sans text-muted">
                {t('noPosts')}
              </p>
            ) : (
              filtered.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col border-[0.5px] border-gold/8 bg-dark-card transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-gold/15 hover:bg-gold/[0.03]"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-dark-700">
                        <span className="text-3xl text-gold/20">BH</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-center gap-2">
                      {post.category && (
                        <span className="font-sans text-xs uppercase tracking-widest text-gold">
                          {t(CATEGORY_KEYS[post.category] || 'allPosts')}
                        </span>
                      )}
                      <span className="text-muted/40">&middot;</span>
                      <span className="font-sans text-xs text-muted">
                        {formatDate(post.publishDate)}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-light leading-snug text-light transition-colors duration-300 group-hover:text-gold line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-3 flex-1 font-sans text-sm font-light leading-relaxed text-muted line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-6 flex items-center justify-between">
                      {post.author && (
                        <span className="font-sans text-xs text-muted">
                          {t('by')} {post.author.name}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-gold opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                        {t('readMore')} &rarr;
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
