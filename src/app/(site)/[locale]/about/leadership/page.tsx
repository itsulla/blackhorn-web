import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import ManagementTeamSection from '@/components/about/ManagementTeamSection'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchManagementTeam } from '@/lib/sanity/fetch'

export const metadata: Metadata = {
  title: 'Leadership | Blackhorn Wealth Management',
  description:
    'Meet our management team — experienced professionals from UBS, Morgan Stanley, Credit Suisse, and HSBC with decades of private banking expertise.',
}

export default async function LeadershipPage() {
  const cmsManagement = await fetchManagementTeam()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
          { name: 'Leadership', href: '/about/leadership' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-16 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <nav className="mb-8 flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-muted">
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  Home
                </Link>
                <span className="text-gold/30">/</span>
                <Link
                  href="/about"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  About
                </Link>
                <span className="text-gold/30">/</span>
                <span className="text-white/50">Leadership</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                About Blackhorn
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                Leadership
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted">
                Our management team brings decades of experience from the
                world&apos;s leading financial institutions. Click on a team
                member to learn more about their background.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Management Team Grid */}
        <section className="bg-light-bg py-24">
          <div className="mx-auto max-w-7xl px-6">
            <ManagementTeamSection
              cmsData={cmsManagement.length > 0 ? cmsManagement : undefined}
              variant="light"
            />
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA />
      </main>
    </>
  )
}
