import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { fetchRecentBlogPosts } from '@/lib/sanity/fetch'
import { localized } from '@/lib/i18n-utils'

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
    month: 'short',
    day: 'numeric',
  })
}

export default async function LatestBlog() {
  const t = await getTranslations('blog')
  const tc = await getTranslations('common')
  const locale = await getLocale()
  const posts = await fetchRecentBlogPosts()

  // Hide section entirely if no blog posts exist
  if (posts.length === 0) return null

  return (
    <section className="border-t border-gold/6 bg-dark-section py-28">
      <div className="mx-auto max-w-7xl px-12">
        {/* Header row */}
        <FadeIn>
          <div className="mb-16 flex items-end justify-between">
            <SectionHeader
              overline={t('sectionTitle')}
              title={t('sectionTitle')}
              highlight="Insights"
              className="mb-0 text-left"
            />
            <Link
              href="/blog"
              className="group hidden items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light sm:inline-flex"
            >
              {tc('viewAll')}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                ⮞
              </span>
            </Link>
          </div>
        </FadeIn>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <FadeIn key={post._id} delay={i * 0.12}>
              <Link
                href={`/blog/${post.slug.current}`}
                className="group flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-gold/15 hover:bg-gold/[0.03]"
              >
                {/* Cover image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {post.coverImageUrl ? (
                    <Image
                      src={post.coverImageUrl}
                      alt={localized(post, 'title', locale)}
                      fill
                      className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-dark-700">
                      <span className="text-2xl text-gold/20">BH</span>
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
                  <h3 className="mt-4 flex-1 font-serif text-xl font-light leading-snug text-light line-clamp-2">
                    {localized(post, 'title', locale)}
                  </h3>
                  {(post.excerpt || post.excerpt_zh) && (
                    <p className="mt-3 font-sans text-xs font-light leading-relaxed text-muted line-clamp-2">
                      {localized(post, 'excerpt', locale)}
                    </p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                    {t('readMore')}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
