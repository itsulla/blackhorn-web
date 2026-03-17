import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'

const cards = [
  {
    titleKey: 'wealthManagementTitle',
    descKey: 'wealthManagementDesc',
    href: '/services/wealth-management',
    icon: '⮞',
  },
  {
    titleKey: 'familyOfficeTitle',
    descKey: 'familyOfficeDesc',
    href: '/services/family-office',
    icon: '⮞',
  },
  {
    titleKey: 'legacyPlanningTitle',
    descKey: 'legacyPlanningDesc',
    href: '/services/estate-legacy',
    icon: '⮞',
  },
]

export default async function WhatWeOffer() {
  const t = await getTranslations('homepage')
  const tc = await getTranslations('common')

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <FadeIn key={card.titleKey} delay={i * 0.12}>
              <Link href={card.href} className="group block h-full">
                <div className="flex h-full flex-col border border-light-border bg-white p-8 shadow-sm transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/30 hover:shadow-md">
                  <span className="text-2xl text-gold-dark">{card.icon}</span>
                  <h3 className="mt-5 font-serif text-xl font-light text-light-text">
                    {t(card.titleKey)}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm font-light leading-relaxed text-light-text-secondary">
                    {t(card.descKey)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-colors duration-300 group-hover:text-gold">
                    {tc('learnMore')}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      ⮞
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
