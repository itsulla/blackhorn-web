import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import ManagementTeamSection from '@/components/about/ManagementTeamSection'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchManagementTeam } from '@/lib/sanity/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('leadershipTitle'),
    description: 'Meet our management team — experienced professionals from UBS, Morgan Stanley, Credit Suisse, and HSBC with decades of private banking expertise.',
  }
}

export default async function LeadershipPage() {
  const cmsManagement = await fetchManagementTeam()
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
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-16 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-peach">
                {t('heroLabel')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                {t('teamHeroHeading')}
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted">
                {t('teamHeroSubtext')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Management Team Grid */}
        <section className="bg-brand-offwhite py-24">
          <div className="mx-auto max-w-7xl px-6">
            <ManagementTeamSection
              cmsData={cmsManagement.length > 0 ? cmsManagement : undefined}
              variant="light"
            />
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  )
}
