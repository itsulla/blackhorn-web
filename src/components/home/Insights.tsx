import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'

const articles = [
  {
    category: 'Events',
    date: 'Jan 2024',
    title: 'Recap: Blackhorn Immersive Wealth & Wellness Summit 2024',
  },
  {
    category: 'Market Commentary',
    date: 'Q1 2024',
    title: 'Navigating Asia-Pacific Markets: Our Investment Committee\u2019s Outlook',
  },
  {
    category: 'Family Office',
    date: '2024',
    title: 'Why Hong Kong Families Need a Family Office in 2024',
  },
]

export default async function Insights() {
  const t = await getTranslations('insights')
  const tc = await getTranslations('common')

  return (
    <section className="border-t border-gold/6 bg-dark-section py-28">
      <div className="mx-auto max-w-7xl px-12">
        {/* Header row */}
        <FadeIn>
          <div className="mb-16 flex items-end justify-between">
            <SectionHeader
              overline={t('overline')}
              title={t('title')}
              highlight={t('highlight')}
              className="mb-0 text-left"
            />
            <Link
              href="/press"
              className="group hidden items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light sm:inline-flex"
            >
              {tc('viewAll')}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                ⮞
              </span>
            </Link>
          </div>
        </FadeIn>

        {/* Article grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {articles.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.12}>
              <article className="group flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-9 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-gold/15 hover:bg-gold/[0.03]">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs uppercase tracking-widest text-gold">
                    {a.category}
                  </span>
                  <span className="text-muted/40">&middot;</span>
                  <span className="font-sans text-xs text-muted">
                    {a.date}
                  </span>
                </div>
                <h3 className="mt-5 flex-1 font-serif text-xl font-light leading-snug text-light line-clamp-3">
                  {a.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                  {tc('readMore')}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    ⮞
                  </span>
                </span>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
