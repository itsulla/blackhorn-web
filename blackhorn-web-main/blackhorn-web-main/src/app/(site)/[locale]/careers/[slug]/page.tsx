import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { PortableText, PortableTextBlock } from '@portabletext/react'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchCareerPostingBySlug } from '@/lib/sanity/fetch'
import { localized, localizedBlocks } from '@/lib/i18n-utils'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posting = await fetchCareerPostingBySlug(slug)
  if (!posting) return { title: 'Position Not Found' }

  return {
    title: `${posting.title} | Careers | Blackhorn Wealth Management`,
    description: `${posting.title} — ${posting.department || ''} at Blackhorn Wealth Management, ${posting.location || 'Hong Kong'}`,
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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-4 mt-10 font-serif text-2xl font-light text-light-text">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-8 font-serif text-xl font-light text-light-text">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 font-sans text-sm font-light leading-[1.85] text-light-text-secondary">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-light-text">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params
  const posting = await fetchCareerPostingBySlug(slug)

  if (!posting) {
    notFound()
  }

  const t = await getTranslations('careers')
  const tc = await getTranslations('common')
  const locale = await getLocale()

  const descriptionContent = localizedBlocks(posting, 'description', locale) as PortableTextBlock[] | undefined

  const requirements = locale === 'zh-hant' && posting.requirements_zh?.length
    ? posting.requirements_zh
    : posting.requirements

  const benefits = locale === 'zh-hant' && posting.benefits_zh?.length
    ? posting.benefits_zh
    : posting.benefits

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: t('overline'), href: '/careers' },
          { name: localized(posting, 'title', locale), href: `/careers/${slug}` },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-16 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <Link
                href="/careers"
                className="mb-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
              >
                &larr; {t('backToCareers')}
              </Link>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                {t('overline')}
              </p>
              <h1 className="mt-4 font-serif text-3xl font-light text-light md:text-4xl lg:text-5xl">
                {localized(posting, 'title', locale)}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 font-sans text-xs text-muted">
                {posting.department && (
                  <>
                    <span className="border border-gold/20 px-3 py-1 text-gold">
                      {DEPARTMENT_LABELS[posting.department] || posting.department}
                    </span>
                  </>
                )}
                {posting.employmentType && (
                  <span>{t(TYPE_KEYS[posting.employmentType] || 'fullTime')}</span>
                )}
                {posting.location && (
                  <>
                    <span className="text-muted/30">|</span>
                    <span>{posting.location}</span>
                  </>
                )}
                <span className="text-muted/30">|</span>
                <span>{t('posted')}: {formatDate(posting.publishDate)}</span>
                {posting.closingDate && (
                  <>
                    <span className="text-muted/30">|</span>
                    <span>{t('closingDate')}: {formatDate(posting.closingDate)}</span>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Content */}
        <section className="bg-brand-offwhite py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-[1fr_340px]">
              {/* Main content */}
              <FadeIn>
                <div className="max-w-[720px]">
                  {/* Description (Portable Text) */}
                  {descriptionContent && (
                    <div className="prose-custom">
                      <PortableText
                        value={descriptionContent}
                        components={portableTextComponents}
                      />
                    </div>
                  )}

                  {/* Requirements */}
                  {requirements && requirements.length > 0 && (
                    <div className="mt-12">
                      <h2 className="font-serif text-2xl font-light text-light-text">
                        {t('requirements')}
                      </h2>
                      <ul className="mt-6 space-y-3">
                        {requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
                            <span className="font-sans text-sm font-light leading-[1.85] text-light-text-secondary">
                              {req}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {benefits && benefits.length > 0 && (
                    <div className="mt-12">
                      <h2 className="font-serif text-2xl font-light text-light-text">
                        {t('benefits')}
                      </h2>
                      <ul className="mt-6 space-y-3">
                        {benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
                            <span className="font-sans text-sm font-light leading-[1.85] text-light-text-secondary">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Sidebar — Apply CTA */}
              <FadeIn delay={0.15} direction="left">
                <aside className="space-y-6">
                  <div className="border border-light-border bg-white p-8 shadow-sm">
                    <h3 className="font-serif text-xl font-light text-light-text">
                      {t('applyNow')}
                    </h3>
                    <p className="mt-4 font-sans text-sm font-light leading-relaxed text-light-text-secondary">
                      {t('applyInstruction')}{' '}
                      <a
                        href={`mailto:${posting.contactEmail || 'careers@blackhorngrp.com'}`}
                        className="font-medium text-gold-dark transition-colors duration-300 hover:text-gold"
                      >
                        {posting.contactEmail || 'careers@blackhorngrp.com'}
                      </a>
                    </p>
                    <a
                      href={`mailto:${posting.contactEmail || 'careers@blackhorngrp.com'}?subject=${encodeURIComponent(`Application: ${posting.title}`)}`}
                      className="mt-6 inline-flex w-full items-center justify-center bg-gold px-6 py-3 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                    >
                      {t('applyNow')} ⮞
                    </a>
                  </div>

                  <div className="border border-light-border bg-white p-6 shadow-sm">
                    <Link
                      href="/careers"
                      className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-colors duration-300 hover:text-gold"
                    >
                      &larr; {t('backToCareers')}
                    </Link>
                  </div>
                </aside>
              </FadeIn>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  )
}
