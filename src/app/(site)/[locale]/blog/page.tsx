import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchBlogPosts } from '@/lib/sanity/fetch'
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

export default async function BlogPage() {
  const t = await getTranslations('blog')
  const posts = await fetchBlogPosts()

  const featuredPost = posts.find((p) => p.featured)
  const regularPosts = posts.filter((p) => p !== featuredPost)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'News & Insights', href: '/blog' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {t('sectionTitle')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                News &{' '}
                <span className="italic text-gold">Insights</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {t('subtitle')}
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
              <section className="border-b border-gold/6 bg-dark-section py-16">
                <div className="mx-auto max-w-7xl px-6">
                  <FadeIn>
                    <Link
                      href={`/blog/${featuredPost.slug.current}`}
                      className="group grid grid-cols-1 gap-8 lg:grid-cols-2"
                    >
                      {/* Cover image */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {featuredPost.coverImageUrl ? (
                          <Image
                            src={featuredPost.coverImageUrl}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-dark-700">
                            <span className="text-4xl text-gold/20">BH</span>
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
                          <span className="mb-3 font-sans text-xs uppercase tracking-widest text-gold">
                            {t(CATEGORY_KEYS[featuredPost.category] || 'allPosts')}
                          </span>
                        )}
                        <h2 className="font-serif text-2xl font-light leading-snug text-light transition-colors duration-300 group-hover:text-gold md:text-3xl">
                          {featuredPost.title}
                        </h2>
                        {featuredPost.excerpt && (
                          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                        )}
                        <div className="mt-6 flex items-center gap-3">
                          <span className="font-sans text-xs text-muted">
                            {formatDate(featuredPost.publishDate)}
                          </span>
                        </div>
                        <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 group-hover:text-gold-light">
                          {t('readMore')} &rarr;
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
