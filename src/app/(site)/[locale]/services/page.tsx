import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { services } from '@/lib/services'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('servicesTitle'),
    description: t('servicesDescription'),
  }
}

export default async function ServicesPage() {
  const tHub = await getTranslations('servicesHub')
  const tServices = await getTranslations('services')
  const tCommon = await getTranslations('common')

  const slugToKey: Record<string, string> = {
    'wealth-management': 'wealthManagement',
    'family-office': 'familyOffice',
    'investment-advisory': 'dealSourcing',
    'estate-legacy': 'legacyPlanning',
    'real-estate-financing': 'realEstateFinancing',
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src="/images/hero/hk-night.webp"
            alt=""
            fill
            className="object-cover"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAQBACdASoUAAsAPzmEuVOvKKWisAgB4CcJZACdH8ADFYWNvdn4qUBekAD+2QyF93Mf61ksqBzrVF/kDI6fHBTJLqVfM9y2gE/503QAAAA="
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark-900/80" />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {tHub('overline')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {tHub('title')}{' '}
                <span className="italic text-gold">{tHub('titleHighlight')}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {tHub('description1')}
              </p>
              <p className="mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {tHub('description2')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Service grid — top 3 */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((s, i) => {
                const key = slugToKey[s.slug] || s.slug
                return (
                  <FadeIn key={s.slug} delay={i * 0.1}>
                    <Link href={s.href} className="group block h-full">
                      <div className="flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-10 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-lg hover:shadow-gold/[0.03]">
                        <span className="text-3xl text-gold">{s.icon}</span>
                        <h2 className="mt-6 font-serif text-2xl font-light text-light">
                          {tServices(`${key}.title`)}
                        </h2>
                        <p className="mt-4 flex-1 font-sans text-sm font-light leading-relaxed text-muted">
                          {tServices(`${key}.desc`)}
                        </p>
                        <span className="mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 group-hover:text-gold-light">
                          {tCommon('learnMore')}
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                            &rarr;
                          </span>
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                )
              })}
            </div>

            {/* Bottom 2 — centered */}
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+1rem)]">
              {services.slice(3).map((s, i) => {
                const key = slugToKey[s.slug] || s.slug
                return (
                  <FadeIn key={s.slug} delay={(i + 3) * 0.1}>
                    <Link href={s.href} className="group block h-full">
                      <div className="flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-10 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-lg hover:shadow-gold/[0.03]">
                        <span className="text-3xl text-gold">{s.icon}</span>
                        <h2 className="mt-6 font-serif text-2xl font-light text-light">
                          {tServices(`${key}.title`)}
                        </h2>
                        <p className="mt-4 flex-1 font-sans text-sm font-light leading-relaxed text-muted">
                          {tServices(`${key}.desc`)}
                        </p>
                        <span className="mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 group-hover:text-gold-light">
                          {tCommon('learnMore')}
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                            &rarr;
                          </span>
                        </span>
                      </div>
                    </Link>
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
