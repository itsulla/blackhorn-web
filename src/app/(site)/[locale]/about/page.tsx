import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const sectionLinks = [
  { key: 'sectionVision', href: '/about/our-vision' },
  { key: 'sectionTeam', href: '/about/leadership' },
  { key: 'sectionAwards', href: '/awards' },
  { key: 'sectionLocation', href: '/about/our-location' },
]

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    openGraph: {
      title: t('aboutTitle'),
      description: t('aboutDescription'),
    },
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  const tc = await getTranslations('common')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: t('heroLabel'), href: '/about' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* ─── Hero ──────────────────────────────────────────────────── */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src="/images/hero/hk-harbour.webp"
            alt="Victoria Harbour, Hong Kong"
            fill
            className="object-cover"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAACQAwCdASoUAA0APzmGulQvKSWjMAgB4CcJZwAAW7epBy7rKjqAAP7r3RpiJ3RZTv9oh0+oKgHzaFRJ/dDo7rHvaMasL/Jjf9d2WkvAAAA="
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-peach text-shadow-hero">
                {t('heroLabel')}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('heroHeading')}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-white text-shadow-hero">
                {t('heroSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Section Menu Bar ──────────────────────────────────────── */}
        <section className="border-b border-light-border bg-brand-offwhite">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-6 py-5 md:gap-10">
            {sectionLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-brand-dark transition-colors duration-300 hover:text-brand-gold"
              >
                <span className="text-brand-gold">⮞</span>
                {t(link.key)}
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Culture Gallery ──────────────────────────────────────── */}
        <section className="border-t border-gold/6 bg-dark-section py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                {t('sectionTeam')}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light md:text-4xl">
                {t('teamHeroHeading')}
              </h2>
              <div className="mt-6 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <FadeIn delay={0.1}>
                <div className="group relative aspect-[3/2] overflow-hidden border-[0.5px] border-gold/8">
                  <Image
                    src="/images/events/3rd-anniversary-group.webp"
                    alt="Blackhorn team group photo"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="group relative aspect-[3/2] overflow-hidden border-[0.5px] border-gold/8">
                  <Image
                    src="/images/events/3rd-anniversary-team.webp"
                    alt="Blackhorn team members"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── Contact CTA ──────────────────────────────────────────── */}
        <ContactCTA />
      </main>
    </>
  )
}
