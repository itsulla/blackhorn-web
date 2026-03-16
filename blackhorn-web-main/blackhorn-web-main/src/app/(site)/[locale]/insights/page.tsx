import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchRecentBlogPosts, fetchPressArticles } from '@/lib/sanity/fetch'
import { localized } from '@/lib/i18n-utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('insightsTitle'),
    description: t('insightsDescription'),
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const sectionLinks = [
  { key: 'sectionNews', href: '/insights/news' },
  { key: 'sectionEvents', href: '/insights/events' },
  { key: 'sectionPress', href: '/insights/press' },
] as const

export default async function InsightsHubPage() {
  const t = await getTranslations('insights')
  const tc = await getTranslations('common')
  const locale = await getLocale()

  const [recentPosts, pressArticles] = await Promise.all([
    fetchRecentBlogPosts(),
    fetchPressArticles(),
  ])

  const nextEvent = {
    slug: 'investment-summit-2024',
    title: 'Blackhorn Immersive Wealth & Wellness Summit',
    date: 'November 2024',
    location: 'Hong Kong',
    image: '/images/events/event-photo-1.webp',
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Insights', href: '/insights' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src="/images/redesign/insight-media.png"
            alt={t('hubTitle')}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark-900/80" />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {t('overline')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('hubTitle')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {t('hubSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Section Menu Bar */}
        <div className="border-b border-light-border bg-brand-offwhite">
          <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-4">
            {sectionLinks.map((section) => (
              <Link
                key={section.key}
                href={section.href}
                className="group flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-light-text-secondary transition-colors duration-300 hover:text-gold-dark"
              >
                {t(section.key)}
                <span className="text-gold-dark/40 transition-colors duration-300 group-hover:text-gold-dark">
                  ⮞
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* News & Insights Preview */}
        <section className="bg-brand-offwhite py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                    {t('sectionNews')}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-light text-light-text">
                    {t('newsHero')}
                  </h2>
                </div>
                <Link
                  href="/insights/news"
                  className="group hidden items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-colors duration-300 hover:text-gold sm:inline-flex"
                >
                  {t('viewAll')}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ⮞
                  </span>
                </Link>
              </div>
            </FadeIn>

            {recentPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.slice(0, 3).map((post, i) => (
                  <FadeIn key={post._id} delay={i * 0.1}>
                    <Link
                      href={`/insights/news/${post.slug.current}`}
                      className="group flex h-full flex-col border border-light-border bg-white shadow-sm transition-all duration-[450ms] hover:border-gold/30 hover:shadow-md"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {post.coverImageUrl ? (
                          <Image
                            src={post.coverImageUrl}
                            alt={localized(post, 'title', locale)}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-light-bg">
                            <span className="text-2xl text-gold-dark/20">BH</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-gold-dark">
                          {formatDate(post.publishDate)}
                        </span>
                        <h3 className="mt-2 flex-1 font-serif text-lg font-light leading-snug text-light-text line-clamp-2">
                          {localized(post, 'title', locale)}
                        </h3>
                        <span className="mt-4 inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-gold-dark/60 transition-colors duration-300 group-hover:text-gold-dark">
                          {tc('readMore')} ⮞
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="border border-light-border bg-white p-12 text-center shadow-sm">
                <p className="font-sans text-sm text-light-text-secondary">
                  No news articles yet. Check back soon.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Events Preview */}
        <section className="border-t border-gold/6 bg-dark-section py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-widest text-gold">
                    {t('sectionEvents')}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-light text-light">
                    {t('eventsHero')}
                  </h2>
                </div>
                <Link
                  href="/insights/events"
                  className="group hidden items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light sm:inline-flex"
                >
                  {t('viewAll')}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ⮞
                  </span>
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Link
                href={`/insights/events/${nextEvent.slug}`}
                className="group grid grid-cols-1 gap-8 border-[0.5px] border-gold/8 bg-dark-card transition-all duration-[450ms] hover:border-gold/15 hover:bg-gold/[0.03] md:grid-cols-2"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={nextEvent.image}
                    alt={nextEvent.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <div className="flex items-center gap-4 font-sans text-xs text-muted">
                    <span>{nextEvent.date}</span>
                    <span className="h-[0.5px] w-4 bg-gold/30" />
                    <span>{nextEvent.location}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-light text-light transition-colors duration-300 group-hover:text-gold">
                    {nextEvent.title}
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-all duration-300 group-hover:gap-3">
                    {t('viewAll')} ⮞
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Press Preview */}
        <section className="bg-brand-offwhite py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                    {t('sectionPress')}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-light text-light-text">
                    {t('pressHero')}
                  </h2>
                </div>
                <Link
                  href="/insights/press"
                  className="group hidden items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-colors duration-300 hover:text-gold sm:inline-flex"
                >
                  {t('viewAll')}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ⮞
                  </span>
                </Link>
              </div>
            </FadeIn>

            {pressArticles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pressArticles.slice(0, 3).map((article, i) => (
                  <FadeIn key={article._id} delay={i * 0.1}>
                    <div className="flex h-full flex-col border border-light-border bg-white p-6 shadow-sm">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-dark">
                        {article.publication}
                      </span>
                      <h3 className="mt-2 flex-1 font-serif text-lg font-light leading-snug text-light-text line-clamp-2">
                        {localized(article, 'title', locale)}
                      </h3>
                      <span className="mt-3 font-sans text-xs text-light-text-secondary">
                        {formatDate(article.publishDate)}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  { pub: 'Capital CEO', title: 'Blackhorn Founder Yugi Lee \u2014 CEO of the Year' },
                  { pub: 'Asian Private Banker', title: 'US$1B Hong Kong IAM Eyes Recruiting 20 RMs' },
                  { pub: 'Citywire Asia', title: 'Ex-UBS Bankers\u2019 Boutique Aims to Double Assets' },
                ].map((item, i) => (
                  <FadeIn key={item.title} delay={i * 0.1}>
                    <div className="flex h-full flex-col border border-light-border bg-white p-6 shadow-sm">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-dark">
                        {item.pub}
                      </span>
                      <h3 className="mt-2 flex-1 font-serif text-lg font-light leading-snug text-light-text">
                        {item.title}
                      </h3>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  )
}
