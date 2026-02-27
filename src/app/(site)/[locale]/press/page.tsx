import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('pressTitle'),
    description: t('pressDescription'),
  }
}

interface PressArticle {
  slug?: string
  title: string
  publication: string
  date: string
  image: string
  summary: string
  external?: boolean
}

const articles: PressArticle[] = [
  {
    slug: 'capital-ceo-yugi-ceo-of-year-2023',
    title: 'Pressing On Toward the Goal \u2014 Blackhorn Founder Yugi Lee',
    publication: 'Capital CEO',
    date: 'February 2023',
    image: '/images/press/capital-ceo-interview-2022.webp',
    summary:
      'Capital CEO profiled Yugi Lee as CEO of the Year, covering her journey from founding member of Bank of Shanghai\u2019s Hong Kong branch to co-founding Blackhorn at age 30.',
  },
  {
    title: 'Blackhorn Family Office \u2014 Interview with Mary Chiu & Yugi Lee',
    publication: 'Capital CEO',
    date: 'December 2022',
    image: '/images/press/capital-ceo-family-office-2022.webp',
    summary:
      'Capital CEO interviewed the co-founders on how Blackhorn Family Office serves prominent Hong Kong families with holistic wealth management solutions.',
  },
  {
    title: 'WealthBriefingAsia EAM Awards 2022 \u2014 Blackhorn Feature',
    publication: 'Acclaim Magazine (WealthBriefingAsia)',
    date: 'October 2022',
    image: '/images/press/acclaim-cover-2022.webp',
    summary:
      'Acclaim magazine featured Blackhorn following its double win at the WealthBriefingAsia EAM Awards \u2014 Newcomer and EAM Based in Hong Kong.',
  },
  {
    title: 'Structured Products Insight \u2014 Blackhorn Interview',
    publication: 'SRP Insight',
    date: 'September 2022',
    image: '/images/press/srp-insight-2022.webp',
    summary:
      'SRP Insight interviewed Blackhorn on their approach to structured products and how they leverage multi-bank relationships to deliver institutional-quality solutions.',
  },
  {
    title: 'Yugi Lee \u2014 Founders Magazine Cover Story',
    publication: 'Founders Magazine',
    date: 'September 2022',
    image: '/images/press/founders-cover-2022.webp',
    summary:
      'Founders Magazine featured Yugi Lee on its cover, profiling her entrepreneurial journey and vision for building an independent wealth management firm in Hong Kong.',
  },
  {
    title: 'US$1B Hong Kong IAM Eyes Recruiting 20 RMs from Top-Tier PBs by Late 2023',
    publication: 'Asian Private Banker',
    date: 'June 2022',
    image: '/images/press/asian-private-banker-2022.webp',
    summary:
      'Asian Private Banker reported on Blackhorn\u2019s rapid growth to US$1 billion in AUM and its ambitious plan to recruit 20 relationship managers from top private banks.',
  },
  {
    title: 'Ex-UBS Bankers\u2019 Boutique Aims to Double Assets to $2bn in a Year',
    publication: 'Citywire Asia',
    date: 'June 2022',
    image: '/images/press/citywire-2022.webp',
    summary:
      'Citywire Asia covered Blackhorn\u2019s launch by former UBS wealth managers and their target to double assets under management within the first year.',
  },
]

export default async function PressPage() {
  const t = await getTranslations('pressPage')
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Press & Media', href: '/press' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {t('overline')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('title')}{' '}
                <span className="italic text-gold">{t('titleHighlight')}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {t('description')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="bg-light-bg py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => {
                const inner = (
                  <div className="group flex h-full flex-col border border-light-border bg-white shadow-sm transition-all duration-[450ms] hover:border-gold/30 hover:shadow-md">
                    {/* Thumbnail */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-gold-dark">
                          {article.publication}
                        </span>
                        <span className="text-light-text-secondary/20">&middot;</span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-light-text-secondary">
                          {article.date}
                        </span>
                      </div>
                      <h2 className="mt-3 font-serif text-lg font-light leading-snug text-light-text">
                        {article.title}
                      </h2>
                      <p className="mt-3 flex-1 font-sans text-xs font-light leading-relaxed text-light-text-secondary line-clamp-3">
                        {article.summary}
                      </p>
                      <span className="mt-4 inline-block font-sans text-[10px] uppercase tracking-widest text-gold-dark transition-colors duration-300 group-hover:text-gold">
                        {article.slug ? t('readMoreArrow') : t('viewArticleArrow')}
                      </span>
                    </div>
                  </div>
                )

                return (
                  <FadeIn key={article.title} delay={i * 0.08}>
                    {article.slug ? (
                      <Link href={`/press/${article.slug}`} className="block h-full">
                        {inner}
                      </Link>
                    ) : (
                      <div className="h-full">{inner}</div>
                    )}
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA />
      </main>
    </>
  )
}
