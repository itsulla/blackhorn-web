import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import AdvisorsGrid from '@/components/about/AdvisorsGrid'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchAdvisoryBoard } from '@/lib/sanity/fetch'

export const metadata: Metadata = {
  title: 'Advisory Board | Blackhorn Wealth Management',
  description:
    'Our advisory board brings specialized expertise in venture investing, legal estate planning, and fintech innovation.',
}

export default async function AdvisorsPage() {
  const cmsAdvisory = await fetchAdvisoryBoard()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
          { name: 'Advisory Board', href: '/about/advisors' },
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
                <span className="text-white/50">Advisory Board</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                About Blackhorn
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                Advisory Board
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted">
                Our advisory board members bring specialized expertise across
                venture capital, legal estate planning, and financial technology
                to strengthen our capabilities and broaden our perspective.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Advisory Board Grid */}
        <section className="bg-light-bg py-24">
          <div className="mx-auto max-w-7xl px-6">
            <AdvisorsGrid cmsAdvisory={cmsAdvisory.length > 0 ? cmsAdvisory : undefined} />
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA />
      </main>
    </>
  )
}
