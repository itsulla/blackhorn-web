import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import AboutSectionNav from '@/components/about/AboutSectionNav'
import { fetchSiteSettings, getHeroImage } from '@/lib/sanity/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('visionPage')
  return {
    title: `${t('title')} | Blackhorn Wealth Management`,
    description: t('heroHeading'),
  }
}

export default async function OurVisionPage() {
  const t = await getTranslations('visionPage')
  const ta = await getTranslations('about')
  const tc = await getTranslations('common')
  const settings = await fetchSiteSettings()
  const heroImage = getHeroImage(settings, 'about-our-vision')


  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: ta('heroLabel'), href: '/about' },
          { name: t('title'), href: '/about/our-vision' },
        ]}
      />
      <main className="min-h-screen bg-white">
        {/* Hero — dark with photo overlay */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src={heroImage?.src ?? "/images/redesign/about-our-vision.png"}
            alt="Victoria Harbour, Hong Kong"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-peach text-shadow-hero">
                {ta('heroLabel')}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 max-w-3xl font-serif text-3xl font-light leading-tight text-light text-shadow-hero md:text-4xl lg:text-5xl">
                {t('heroHeading')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white/80 text-shadow-hero">
                {t('heroSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Section Menu Bar ──────────────────────────────────────── */}
        <AboutSectionNav />

        {/* Content — two-column: text + placeholder photo */}
        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[3fr_2fr]">
            {/* Text column */}
            <FadeIn>
              <div className="space-y-6 font-sans text-base font-light leading-[1.85] text-light-text-secondary">
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
