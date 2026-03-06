import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('visionPage')
  return {
    title: `${t('title')} | Blackhorn Wealth Management`,
    description: t('paragraph1'),
  }
}

export default async function OurVisionPage() {
  const t = await getTranslations('visionPage')
  const ta = await getTranslations('about')
  const tc = await getTranslations('common')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: ta('heroLabel'), href: '/about' },
          { name: t('title'), href: '/about/our-vision' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-16 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-peach">
                {ta('heroLabel')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                {t('title')}
              </h1>
              <div className="mt-6 h-[0.5px] w-10 bg-gold" />
            </FadeIn>
          </div>
        </section>

        {/* Content — two-column: text + placeholder photo */}
        <section className="bg-brand-offwhite py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[3fr_2fr]">
            {/* Text column */}
            <FadeIn>
              <div className="space-y-6 font-sans text-base font-light leading-[1.85] text-light-text-secondary">
                <p>{t('paragraph1')}</p>
                <p>{t('paragraph2')}</p>
                <p>{t('paragraph3')}</p>
                <p>{t('paragraph4')}</p>
                <p className="font-medium text-light-text">{t('paragraph5')}</p>
              </div>
            </FadeIn>

            {/* Photo placeholder */}
            <FadeIn delay={0.2} className="hidden lg:block">
              <div className="sticky top-32 aspect-[3/4] w-full overflow-hidden border border-light-border bg-white">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <span className="font-serif text-5xl font-light text-gold/20">BH</span>
                    <p className="mt-4 font-sans text-[10px] uppercase tracking-widest text-light-text-secondary/40">
                      Photo placeholder
                    </p>
                  </div>
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
