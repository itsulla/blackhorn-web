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

const keyMembers = [
  { name: 'Mary Chiu', role: 'Co-Founder', image: '/images/team/mary-chiu.webp', initials: 'MC' },
  { name: 'Yugi Lee', role: 'Co-Founder', image: '/images/team/yugi-lee.webp', initials: 'YL' },
  { name: 'Alan Lee', role: 'Managing Director', image: '/images/team/alan-lee.webp', initials: 'AL' },
  { name: 'Wilson Hui', role: 'Director', image: '/images/team/wilson-hui.webp', initials: 'WH' },
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
      <main className="min-h-screen bg-white">
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

        {/* ─── Our Team ──────────────────────────────────────────────── */}
        <section className="border-t border-light-border bg-white py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold-dark">
                {t('sectionTeam')}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light-text md:text-4xl">
                {t('teamHeroHeading')}
              </h2>
              <div className="mt-6 h-[0.5px] w-10 bg-gold-dark" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-8 max-w-2xl font-sans text-sm font-light leading-relaxed text-light-text-secondary">
                {t('teamHeroSubtext')}
              </p>
            </FadeIn>

            {/* Team member cards */}
            <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
              {keyMembers.map((member, i) => (
                <FadeIn key={member.name} delay={0.15 + i * 0.08}>
                  <Link
                    href="/about/leadership"
                    className="group block border border-light-border bg-white shadow-sm transition-all duration-[450ms] hover:border-gold/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-serif text-sm font-light text-light-text">{member.name}</p>
                      <p className="mt-1 font-sans text-[11px] text-light-text-secondary">{member.role}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            {/* CTA */}
            <FadeIn delay={0.5}>
              <div className="mt-12 text-center">
                <Link
                  href="/about/leadership"
                  className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-all duration-300 hover:gap-3 hover:text-gold"
                >
                  {t('meetTeam')} ⮞
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── Contact CTA ──────────────────────────────────────────── */}
        <ContactCTA />
      </main>
    </>
  )
}
