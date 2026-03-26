import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableTextBlock } from '@portabletext/react'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import ServicePortableText from '@/components/services/ServicePortableText'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getTranslations, getLocale } from 'next-intl/server'
import { fetchSiteSettings, fetchServiceBySlug, getHeroImage } from '@/lib/sanity/fetch'
import { localized, localizedBlocks } from '@/lib/i18n-utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('servicesTitle'),
    description:
      'Strategic partnerships with major international private banks. Institutional-grade research and portfolio management from Blackhorn in Hong Kong.',
  }
}

// Fallback content sections (used when Sanity has no data)
const fallbackSections = [
  {
    titleKey: 'wmPortfolioManagement',
    descKey: 'wmPortfolioManagementDesc',
    icon: '›',
  },
  {
    titleKey: 'wmInvestmentAdvisory',
    descKey: 'wmInvestmentAdvisoryDesc',
    icon: '›',
  },
  {
    titleKey: 'wmLegacyPlanning',
    descKey: 'wmLegacyPlanningDesc',
    icon: '›',
  },
]

export default async function WealthManagementPage() {
  const t = await getTranslations('servicesHub')
  const tc = await getTranslations('common')
  const locale = await getLocale()
  const settings = await fetchSiteSettings()
  const heroImage = getHeroImage(settings, 'services-wealth-management')

  // Fetch service data from Sanity
  const service = await fetchServiceBySlug('wealth-management')

  // Priority: Full Page Content (rich text) > Key Features > hardcoded fallback
  const richContent = localizedBlocks(service, 'content', locale) as
    | PortableTextBlock[]
    | undefined

  // Use CMS title/subtitle if available, otherwise fall back to i18n
  const heroHeading = localized(service, 'title', locale) || t('wmHeroHeading')
  const heroSubtext = localized(service, 'shortDescription', locale) || t('wmHeroSubtext')

  // Use CMS features if available, otherwise fallback to i18n
  const cmsFeatures =
    locale === 'zh-hant' && service?.features_zh?.length
      ? service.features_zh
      : service?.features?.length
        ? service.features
        : null

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
                {heroHeading}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {heroSubtext}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content Sections */}
        <section className="bg-brand-offwhite py-24">
          <div className="mx-auto max-w-7xl px-6">
            {richContent ? (
              <FadeIn delay={0.1}>
                <div className="max-w-[800px] space-y-6 font-sans text-sm leading-[1.85] text-light-text-secondary">
                  <ServicePortableText value={richContent} />
                </div>
              </FadeIn>
            ) : (
              <div className="space-y-8">
                {cmsFeatures
                  ? cmsFeatures.map((feature, i) => (
                      <FadeIn key={i} delay={i * 0.1}>
                        <div className="flex flex-col border border-light-border bg-white p-10 shadow-sm md:flex-row md:items-start md:gap-10">
                          <div className="mb-6 flex h-14 w-14 flex-shrink-0 items-center justify-center border border-light-border text-gold-dark md:mb-0">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>
                          </div>
                          <div className="flex-1">
                            <h2 className="font-serif text-2xl font-light text-light-text">
                              {feature.title}
                            </h2>
                            <p className="mt-4 font-sans text-sm font-light leading-[1.85] text-light-text-secondary">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    ))
                  : fallbackSections.map((section, i) => (
                      <FadeIn key={section.titleKey} delay={i * 0.1}>
                        <div className="flex flex-col border border-light-border bg-white p-10 shadow-sm md:flex-row md:items-start md:gap-10">
                          <div className="mb-6 flex h-14 w-14 flex-shrink-0 items-center justify-center border border-light-border text-gold-dark md:mb-0">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>
                          </div>
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
            )}
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  )
}
