import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import LeadershipTeamSection from '@/components/about/LeadershipTeamSection'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import AboutSectionNav from '@/components/about/AboutSectionNav'
import { fetchManagementTeam, fetchAdvisoryBoard } from '@/lib/sanity/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('leadershipTitle'),
    description: 'Meet our management team — experienced professionals from UBS, Morgan Stanley, Credit Suisse, and HSBC with decades of private banking expertise.',
  }
}

export default async function LeadershipPage() {
  const cmsManagement = await fetchManagementTeam()
  const cmsAdvisory = await fetchAdvisoryBoard()
  const t = await getTranslations('about')
  const tc = await getTranslations('common')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: t('heroLabel'), href: '/about' },
          { name: t('sectionTeam'), href: '/about/leadership' },
        ]}
      />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          <Image
            src="/images/redesign/service-our-team.png"
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
                {t('heroLabel')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('teamHeroHeading')}
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/80 text-shadow-hero">
                {t('teamHeroSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Section Menu Bar ──────────────────────────────────────── */}
        <AboutSectionNav />

        {/* Team Grid — Management + Advisory */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <LeadershipTeamSection
              cmsManagement={cmsManagement.length > 0 ? cmsManagement : undefined}
              cmsAdvisory={cmsAdvisory.length > 0 ? cmsAdvisory : undefined}
            />
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  )
}
