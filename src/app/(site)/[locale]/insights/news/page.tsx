import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchBlogPosts, fetchSiteSettings, getHeroImage } from '@/lib/sanity/fetch'
import { localized } from '@/lib/i18n-utils'
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter'

export const metadata: Metadata = {
  title: 'News & Insights | Blackhorn Wealth Management',
  description:
    'Latest updates, market commentary, and investment insights from the Blackhorn Wealth Management team.',
  openGraph: {
    title: 'News & Insights | Blackhorn Wealth Management',
    description:
      'Latest updates, market commentary, and investment insights from the Blackhorn Wealth Management team.',
  },
}

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

export default async function NewsPage() {
  const t = await getTranslations('blog')
  const ti = await getTranslations('insights')
  const locale = await getLocale()
  const settings = await fetchSiteSettings()
  const heroImage = getHeroImage(settings, 'insights-news')
  const posts = await fetchBlogPosts()

  const featuredPost = posts.find((p) => p.featured)
  const regularPosts = posts.filter((p) => p !== featuredPost)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Insights', href: '/insights' },
          { name: ti('sectionNews'), href: '/insights/news' },
        ]}
      />
      <main className="min-h-screen bg-light-bg">
        {/* Hero */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src={heroImage?.src ?? "/images/redesign/insight-media.png"}
            alt={ti('sectionNews')}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {ti('sectionNews')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {ti('newsHero')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {ti('newsSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {posts.length === 0 ? (
          <section className="py-24">
            <div className="mx-auto max-w-7xl px-6 text-center">
              <p className="font-sans text-lg text-muted">{t('noPosts')}</p>
            </div>
          </section>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="border-b border-light-border bg-white py-16">
                <div className="mx-auto max-w-7xl px-6">
                  <FadeIn>
                    <Link
                      href={`/insights/news/${featuredPost.slug.current}`}
                      className="group grid grid-cols-1 gap-8 lg:grid-cols-2"
                    >
                      {/* Cover image */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {featuredPost.coverImageUrl ? (
                          <Image
                            src={featuredPost.coverImageUrl}
                            alt={localized(featuredPost, 'title', locale)}
                            fill
                            className="object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-light-bg">
                            <span className="text-4xl text-gold-dark/20">BH</span>
                          </div>
                        )}
                        <div className="absolute left-4 top-4">
                          <span className="bg-gold px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-dark">
                            {t('featured')}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center">
                        {featuredPost.category && (
                          <span className="mb-3 font-sans text-xs uppercase tracking-widest text-gold-dark">
                            {t(CATEGORY_KEYS[featuredPost.category] || 'allPosts')}
                          </span>
                        )}
                        <h2 className="font-serif text-2xl font-light leading-snug text-light-text transition-colors duration-300 group-hover:text-gold-dark md:text-3xl">
                          {localized(featuredPost, 'title', locale)}
                        </h2>
                        {(featuredPost.excerpt || featuredPost.excerpt_zh) && (
                          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-light-text-secondary line-clamp-3">
                            {localized(featuredPost, 'excerpt', locale)}
                          </p>
                        )}
                        <div className="mt-6 flex items-center gap-3">
                          <span className="font-sans text-xs text-light-text-secondary">
                            {formatDate(featuredPost.publishDate)}
                          </span>
                        </div>
                        <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-colors duration-300 group-hover:text-gold">
                          {t('readMore')} ›
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                </div>
              </section>
            )}

            {/* Category Filter + Posts Grid */}
            <BlogCategoryFilter posts={regularPosts} />
          </>
        )}

        <ContactCTA />
      </main>
    </>
  )
}
