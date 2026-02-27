import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { aboutLinks } from '@/lib/about'

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
  const t = await getTranslations('aboutHub')
  const tc = await getTranslations('common')
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: t('heading'), href: '/about' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* ─── Section 1: Hero Banner ─────────────────────────────────────── */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          {/* Background — Victoria Harbour with Star Ferry */}
          <Image
            src="/images/hero/hk-harbour.webp"
            alt={t('altHarbour')}
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
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {t('overline')}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('heading')}{' '}
                <span className="italic text-gold">{t('headingHighlight')}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-white text-shadow-hero">
                {t('description')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Section 2: About Sub-Page Cards ─────────────────────────────── */}
        <section className="border-b border-light-border bg-light-bg py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold-dark">
                {t('learnMoreOverline')}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light-text md:text-4xl">
                {t('exploreStory')}
              </h2>
              <div className="mt-6 h-[0.5px] w-10 bg-gold-dark" />
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(() => {
                const slugToKeys: Record<string, { title: string; desc: string }> = {
                  'our-expertise': { title: t('cardExpertiseTitle'), desc: t('cardExpertiseDesc') },
                  'our-philosophy': { title: t('cardPhilosophyTitle'), desc: t('cardPhilosophyDesc') },
                  'commitment-to-results': { title: t('cardCommitmentTitle'), desc: t('cardCommitmentDesc') },
                  'partnerships': { title: t('cardPartnershipsTitle'), desc: t('cardPartnershipsDesc') },
                  'leadership': { title: t('cardLeadershipTitle'), desc: t('cardLeadershipDesc') },
                  'advisors': { title: t('cardAdvisorsTitle'), desc: t('cardAdvisorsDesc') },
                }
                return aboutLinks.map((item, i) => {
                  const keys = slugToKeys[item.slug]
                  return (
                    <FadeIn key={item.slug} delay={i * 0.08}>
                      <Link
                        href={item.href}
                        className="group flex h-full flex-col border border-light-border bg-white p-10 shadow-sm transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-gold/30 hover:shadow-md"
                      >
                        <span className="text-xl text-gold-dark">{item.icon}</span>
                        <h3 className="mt-6 font-serif text-xl font-light text-light-text transition-colors duration-300 group-hover:text-gold">
                          {keys?.title ?? item.title}
                        </h3>
                        <p className="mt-4 flex-1 font-sans text-sm font-light leading-[1.85] text-light-text-secondary">
                          {keys?.desc ?? item.desc}
                        </p>
                        <span className="mt-6 font-sans text-[10px] uppercase tracking-widest text-gold-dark/60 transition-colors duration-300 group-hover:text-gold-dark">
                          {t('learnMoreArrow')}
                        </span>
                      </Link>
                    </FadeIn>
                  )
                })
              })()}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Our Culture Gallery ─────────────────────────────── */}
        <section className="border-t border-gold/6 bg-dark-section py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                {t('cultureOverline')}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light md:text-4xl">
                {t('cultureTitle')}
              </h2>
              <div className="mt-6 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <FadeIn delay={0.1}>
                <div className="group relative aspect-[3/2] overflow-hidden border-[0.5px] border-gold/8">
                  <Image
                    src="/images/events/3rd-anniversary-group.webp"
                    alt={t('altGroupPhoto')}
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
                    alt={t('altTeamPhoto')}
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.25}>
              <p className="mt-4 text-center font-sans text-xs text-muted/50">
                {t('cultureCaption')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Contact CTA ─────────────────────────────────────────────── */}
        <ContactCTA />
      </main>
    </>
  )
}
