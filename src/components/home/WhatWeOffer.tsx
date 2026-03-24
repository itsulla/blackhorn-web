import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { fetchSiteSettings } from '@/lib/sanity/fetch'

const cards = [
  {
    key: 'wealthManagement',
    titleKey: 'wealthManagementTitle',
    descKey: 'wealthManagementDesc',
    href: '/services/wealth-management',
    icon: '›',
  },
  {
    key: 'familyOffice',
    titleKey: 'familyOfficeTitle',
    descKey: 'familyOfficeDesc',
    href: '/services/family-office',
    icon: '›',
  },
  {
    key: 'legacyPlanning',
    titleKey: 'legacyPlanningTitle',
    descKey: 'legacyPlanningDesc',
    href: '/services/estate-legacy',
    icon: '›',
  },
  {
    key: 'ctfsEcosystem',
    titleKey: 'ctfsEcosystemTitle',
    descKey: 'ctfsEcosystemDesc',
    href: '/services/ctfs-ecosystem',
    icon: '›',
  },
]

export default async function WhatWeOffer() {
  const t = await getTranslations('homepage')
  const tc = await getTranslations('common')
  const locale = await getLocale()
  const settings = await fetchSiteSettings()

  // Build a lookup from CMS cards
  const cmsCards = settings?.whatWeOfferCards
  const cmsLookup = new Map(
    cmsCards?.map((c) => [c.key, c]) ?? []
  )

  function getCardTitle(card: (typeof cards)[number]) {
    const cms = cmsLookup.get(card.key)
    if (cms) {
      const val = locale === 'zh-hant' && cms.title_zh ? cms.title_zh : cms.title
      if (val) return val
    }
    return t(card.titleKey)
  }

  function getCardDesc(card: (typeof cards)[number]) {
    const cms = cmsLookup.get(card.key)
    if (cms) {
      const val = locale === 'zh-hant' && cms.description_zh ? cms.description_zh : cms.description
      if (val) return val
    }
    return t(card.descKey)
  }

  return (
    <section className="border-t border-light-border bg-brand-offwhite py-28">
      <div className="mx-auto max-w-7xl px-12">
        <FadeIn>
          <SectionHeader
            overline={t('whatWeOffer')}
            title={t('whatWeOfferSubtitle')}
            highlight={t('whatWeOffer')}
            variant="light"
          />
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <FadeIn key={card.key} delay={i * 0.12}>
              <Link href={card.href} className="group block h-full">
                <div className="flex h-full flex-col border border-light-border bg-white p-8 shadow-sm transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/30 hover:shadow-md">
                  <svg className="h-6 w-6 text-gold-dark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                  </svg>
                  <h3 className="mt-5 font-serif text-xl font-light text-light-text">
                    {getCardTitle(card)}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm font-light leading-relaxed text-light-text-secondary">
                    {getCardDesc(card)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-colors duration-300 group-hover:text-gold">
                    {tc('learnMore')}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      ›
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
