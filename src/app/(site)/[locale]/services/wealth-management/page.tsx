import type { Metadata } from 'next'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getTranslations } from 'next-intl/server'
import { fetchSiteSettings, getHeroImage } from '@/lib/sanity/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('servicesTitle'),
    description:
      'Strategic partnerships with 11 major international private banks. Institutional-grade research and portfolio management from Blackhorn in Hong Kong.',
  }
}

const contentSections = [
  {
    titleKey: 'wmPortfolioManagement',
    descKey: 'wmPortfolioManagementDesc',
    icon: '⮞',
  },
  {
    titleKey: 'wmInvestmentAdvisory',
    descKey: 'wmInvestmentAdvisoryDesc',
    icon: '⮞',
  },
  {
    titleKey: 'wmLegacyPlanning',
    descKey: 'wmLegacyPlanningDesc',
    icon: '⮞',
  },
]

export default async function WealthManagementPage() {
  const t = await getTranslations('servicesHub')
  const tc = await getTranslations('common')
  const settings = await fetchSiteSettings()
  const heroImage = getHeroImage(settings, 'services-wealth-management')


  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: t('overline'), href: '/services' },
          { name: t('sectionWM'), href: '/services/wealth-management' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src={heroImage?.src ?? "/images/redesign/service-wealth-management.png"}
            alt=""
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-peach text-shadow-hero">
                {t('overline')}
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('wmHeroHeading')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {t('wmHeroSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 3 Content Sections */}
        <section className="bg-brand-offwhite py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="space-y-8">
              {contentSections.map((section, i) => (
                <FadeIn key={section.titleKey} delay={i * 0.1}>
                  <div className="flex flex-col border border-light-border bg-white p-10 shadow-sm md:flex-row md:items-start md:gap-10">
                    {/* Icon */}
                    <div className="mb-6 flex h-14 w-14 flex-shrink-0 items-center justify-center border border-light-border text-2xl text-gold-dark md:mb-0">
                      {section.icon}
                    </div>
                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl font-light text-light-text">
                        {t(section.titleKey)}
                      </h2>
                      <p className="mt-4 font-sans text-sm font-light leading-[1.85] text-light-text-secondary">
                        {t(section.descKey)}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  )
}
