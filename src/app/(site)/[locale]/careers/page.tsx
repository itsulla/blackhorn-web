import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchCareerPostings, fetchSiteSettings } from '@/lib/sanity/fetch'
import { localized } from '@/lib/i18n-utils'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('careersTitle'),
    description: t('careersDescription'),
  }
}

const DEPARTMENT_LABELS: Record<string, string> = {
  'wealth-management': 'Wealth Management',
  'investment-advisory': 'Investment Advisory',
  'family-office': 'Family Office',
  operations: 'Operations',
  compliance: 'Compliance',
  marketing: 'Marketing',
}

const TYPE_KEYS: Record<string, string> = {
  'full-time': 'fullTime',
  'part-time': 'partTime',
  contract: 'contract',
  internship: 'internship',
}

export default async function CareersPage() {
  const t = await getTranslations('careers')
  const tc = await getTranslations('common')
  const locale = await getLocale()

  const [postings, settings] = await Promise.all([
    fetchCareerPostings(),
    fetchSiteSettings(),
  ])

  const benefits = [
    { title: t('benefitIndependenceTitle'), description: t('benefitIndependenceDesc') },
    { title: t('benefitPartnershipTitle'), description: t('benefitPartnershipDesc') },
    { title: t('benefitPlatformTitle'), description: t('benefitPlatformDesc') },
    { title: t('benefitGrowthTitle'), description: t('benefitGrowthDesc') },
  ]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: t('overline'), href: '/careers' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src="/images/redesign/careers.png"
            alt={t('heroHeading')}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {t('overline')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('heroHeading')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-white/85 text-shadow-hero">
                {t('heroSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Open Positions from CMS */}
        <section className="bg-brand-offwhite py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                {t('openPositions')}
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold-dark/30" />
            </FadeIn>

            {postings.length > 0 ? (
              <div className="mt-10 space-y-4">
                {postings.map((posting, i) => (
                  <FadeIn key={posting._id} delay={i * 0.08}>
                    <Link
                      href={`/careers/${posting.slug.current}`}
                      className="group flex flex-col gap-4 border border-light-border bg-white p-8 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-md md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-light text-light-text transition-colors duration-300 group-hover:text-gold-dark">
                          {localized(posting, 'title', locale)}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-3 font-sans text-xs text-light-text-secondary">
                          {posting.department && (
                            <>
                              <span>{DEPARTMENT_LABELS[posting.department] || posting.department}</span>
                              <span className="text-light-text-secondary/30">|</span>
                            </>
                          )}
                          {posting.employmentType && (
                            <>
                              <span>{t(TYPE_KEYS[posting.employmentType] || 'fullTime')}</span>
                              <span className="text-light-text-secondary/30">|</span>
                            </>
                          )}
                          {posting.location && <span>{posting.location}</span>}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-all duration-300 group-hover:gap-3">
                        {t('viewDetails')} ⮞
                      </span>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <FadeIn delay={0.1}>
                <div className="mt-10 border border-light-border bg-white p-12 text-center shadow-sm">
                  <p className="font-sans text-sm font-light leading-relaxed text-light-text-secondary">
                    {(locale === 'zh-hant' ? settings?.careersMessage_zh : settings?.careersMessage) || t('noPositions')}
                  </p>
                  <a
                    href="mailto:careers@blackhorngrp.com"
                    className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-colors duration-300 hover:text-gold"
                  >
                    {t('sendCV')} careers@blackhorngrp.com ⮞
                  </a>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* Opportunity */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
              <div>
                <FadeIn>
                  <h2 className="font-serif text-3xl font-light text-light">
                    {t('opportunityTitle')}
                  </h2>
                  <div className="mt-4 h-[0.5px] w-10 bg-gold" />
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div className="mt-8 space-y-6 font-sans text-sm font-light leading-[1.85] text-muted">
                    <p>{t('opportunityP1')}</p>
                    <p>{t('opportunityP2')}</p>
                    <p>{t('opportunityP3')}</p>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} direction="left">
                <div className="border border-gold/10 bg-dark-card p-8">
                  <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold">
                    {t('lookingFor')}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {[t('role1'), t('role2'), t('role3'), t('role4'), t('role5')].map((role) => (
                      <li key={role} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/60" />
                        <span className="font-sans text-sm text-muted">{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-gold/6 bg-dark-section py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                {t('whyOverline')}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                {t('whatWeOffer')}
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit, i) => (
                <FadeIn key={benefit.title} delay={i * 0.08}>
                  <div className="h-full border-[0.5px] border-gold/8 bg-dark-card p-8 transition-all duration-[450ms] hover:border-gold/15 hover:bg-gold/[0.02]">
                    <div className="mb-4 h-[0.5px] w-8 bg-gold/40" />
                    <h3 className="font-serif text-lg font-light text-gold">{benefit.title}</h3>
                    <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="border border-gold/10 bg-dark-card p-10 text-center md:p-16">
                <h2 className="font-serif text-3xl font-light text-light md:text-4xl">
                  {t('ctaTitle')}{' '}
                  <span className="italic text-gold">{t('ctaTitleHighlight')}</span>
                </h2>
                <p className="mx-auto mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-muted">
                  {t('ctaDescription')}
                </p>
                <div className="mt-10">
                  <a
                    href="mailto:careers@blackhorngrp.com"
                    className="inline-flex items-center justify-center bg-gold px-10 py-4 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                  >
                    careers@blackhorngrp.com
                  </a>
                </div>
                <div className="mt-10 border-t border-gold/8 pt-8">
                  <p className="font-sans text-xs text-muted">{t('referralQuestion')}</p>
                  <p className="mt-2 font-sans text-sm text-gold/80">{t('referralAnswer')}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
                  >
                    {tc('contactUs')}
                    <span className="text-gold/50">⮞</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  )
}
