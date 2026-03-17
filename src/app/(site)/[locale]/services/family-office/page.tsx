import type { Metadata } from 'next'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import Accordion from '@/components/ui/Accordion'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getTranslations } from 'next-intl/server'
import { fetchSiteSettings, getHeroImage } from '@/lib/sanity/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('servicesTitle'),
    description:
      'Family office advisory services including will and estate planning, trusts, philanthropy, enduring power of attorney, tax planning, and insurance planning from Blackhorn in Hong Kong.',
  }
}

export default async function FamilyOfficePage() {
  const t = await getTranslations('servicesHub')
  const tc = await getTranslations('common')

  const settings = await fetchSiteSettings()
  const heroImage = getHeroImage(settings, 'services-family-office')

  const accordionItems = [
    { title: t('foWillEstate'), content: t('foWillEstateDesc') },
    { title: t('foPhilanthropy'), content: t('foPhilanthropyDesc') },
    { title: t('foTrusts'), content: t('foTrustsDesc') },
    { title: t('foEPA'), content: t('foEPADesc') },
    { title: t('foAdvanceDirective'), content: t('foAdvanceDirectiveDesc') },
    { title: t('foTaxPlanning'), content: t('foTaxPlanningDesc') },
    { title: t('foInsurancePlanning'), content: t('foInsurancePlanningDesc') },
  ]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: t('overline'), href: '/services' },
          { name: t('sectionFO'), href: '/services/family-office' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src={heroImage?.src ?? "/images/redesign/service-family-office-advisory.png"}
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
                {t('foHeroHeading')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {t('foHeroSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Accordion Content */}
        <section className="bg-brand-offwhite py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="max-w-3xl">
                <Accordion items={accordionItems} defaultOpen={0} variant="light" />
              </div>
            </FadeIn>

            {/* Advisory Team */}
            <FadeIn delay={0.15}>
              <div className="mt-16 max-w-3xl">
                <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                  {t('foAdvisoryTeam')}
                </h2>
                <div className="mt-6 border border-light-border bg-white p-8 shadow-sm">
                  <p className="font-serif text-lg font-light text-light-text">
                    Peter Tsang
                  </p>
                  <p className="mt-3 font-sans text-sm font-light leading-[1.85] text-light-text-secondary">
                    Founding partner of a reputable local law firm with over 30
                    years of experience specialising in wills, trusts, probate,
                    estate planning, and the law of succession. Member of the
                    Probate Committee of The Law Society of Hong Kong and a Trust
                    and Estate Practitioner (TEP) of STEP.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Family Office Infographic */}
            <FadeIn delay={0.25}>
              <div className="mt-16">
                <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                  {t('foInfoPlaceholder')}
                </h2>
                <div className="mt-6">
                  <Image
                    src="/images/services/family-office-infographic.jpg"
                    alt="Family Office structure diagram — Entrepreneur/Family connects to Blackhorn professionals, who provide services including Wealth Planning, Will and Estate Planning, Family Trust, and Insurance Planning through Private Bank, Investment Bank, Insurance Planning, Family Trust/Tax Planning/Will and Estate Planning, and Next Generation Education"
                    width={1440}
                    height={800}
                    className="w-full"
                    quality={90}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  )
}
