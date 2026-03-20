import { getTranslations, getLocale } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { fetchAwards } from '@/lib/sanity/fetch'
import { localized } from '@/lib/i18n-utils'

// Hardcoded fallback — used when CMS is empty
const fallbackAwards = [
  {
    year: '2024',
    org: 'Asian Fund Distributors',
    title: 'Gold Award — Outstanding Wealth Management',
  },
  {
    year: '2024',
    org: 'LGT Private Banking',
    title: 'Top Valued Business Partner',
  },
  {
    year: '2023',
    org: 'WealthBriefingAsia',
    title: 'Best Independent Wealth Manager — Hong Kong',
  },
  {
    year: '2022',
    org: 'Capital CEO',
    title: 'Outstanding Wealth Management Firm',
  },
]

export default async function Awards() {
  const t = await getTranslations('awards')
  const locale = await getLocale()

  // Fetch from CMS; fall back to hardcoded if empty (show top 4)
  const cmsAwards = await fetchAwards()
  const awards = cmsAwards.length > 0
    ? cmsAwards.slice(0, 4).map((a) => ({
        year: String(a.year),
        org: localized(a, 'organization', locale),
        title: localized(a, 'title', locale),
      }))
    : fallbackAwards

  return (
    <section className="bg-light-bg py-28">
      <div className="mx-auto max-w-7xl px-12">
        <FadeIn>
          <SectionHeader
            overline={t('overline')}
            title={t('title')}
            highlight={t('highlight')}
            variant="light"
          />
        </FadeIn>

        <div className="space-y-0">
          {awards.map((a, i) => (
            <FadeIn key={`${a.year}-${a.title}`} delay={i * 0.1}>
              <div className="group grid grid-cols-[60px_1fr] items-baseline gap-4 border-b border-light-border py-6 transition-colors duration-300 hover:bg-gold/[0.04] md:grid-cols-[80px_200px_1fr] md:gap-8">
                <span className="font-serif text-lg text-gold-dark">
                  {a.year}
                </span>
                <span className="hidden font-sans text-xs uppercase tracking-wide text-light-text-secondary md:block">
                  {a.org}
                </span>
                <span className="font-serif text-base font-light text-light-text-secondary transition-colors duration-300 group-hover:text-light-text">
                  {a.title}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
