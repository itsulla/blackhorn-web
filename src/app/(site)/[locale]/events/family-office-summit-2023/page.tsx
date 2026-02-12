import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Family Office Summit 2023 | Blackhorn Wealth Management',
  description:
    'Recap of the Blackhorn Family Office Summit 2023 in Hong Kong, focusing on family governance, wealth transfer, and next-generation planning.',
  openGraph: {
    title: 'Family Office Summit 2023 | Blackhorn Wealth Management',
    description:
      'A focused forum on family office best practices, governance structures, and next-generation wealth transfer strategies.',
  },
}

const topics = [
  {
    title: 'Family Governance',
    description:
      'Best practices for establishing family constitutions, decision-making frameworks, and conflict resolution mechanisms.',
  },
  {
    title: 'Wealth Transfer',
    description:
      'Strategies for tax-efficient, cross-jurisdictional wealth transfer through trusts, foundations, and holding structures.',
  },
  {
    title: 'Next-Generation Planning',
    description:
      'Preparing the next generation for responsible stewardship through education, mentorship, and gradual involvement.',
  },
  {
    title: 'Philanthropy',
    description:
      'Integrating philanthropic goals with family values through donor-advised funds, family foundations, and impact investing.',
  },
]

export default function FamilyOfficeSummit2023Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Events', href: '/events' },
          {
            name: 'Family Office Summit 2023',
            href: '/events/family-office-summit-2023',
          },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/events/group-event-1.webp"
              alt=""
              fill
              className="object-cover opacity-[0.06]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-section/60 via-dark-section/80 to-dark-section" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            {/* Breadcrumb */}
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
                  href="/events"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  Events
                </Link>
                <span className="text-gold/30">/</span>
                <span className="text-white/50">
                  Family Office Summit 2023
                </span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="bg-gold/10 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-gold">
                  Past Event
                </span>
                <span className="font-sans text-xs text-muted">
                  2023 &middot; Hong Kong
                </span>
              </div>
              <h1 className="font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                Family Office{' '}
                <span className="italic text-gold">Summit</span>
              </h1>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-muted">
                The Blackhorn Family Office Summit 2023 gathered leading
                practitioners and families for an in-depth exploration of family
                office governance, wealth transfer strategies, and
                next-generation planning.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Topics */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Summit Themes
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                Key Discussion Areas
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {topics.map((topic, i) => (
                <FadeIn key={topic.title} delay={i * 0.08}>
                  <div className="h-full border-[0.5px] border-gold/8 bg-dark-card p-8 transition-all duration-[450ms] hover:border-gold/15 hover:bg-gold/[0.02]">
                    <div className="mb-4 h-[0.5px] w-8 bg-gold/40" />
                    <h3 className="font-serif text-lg font-light text-light">
                      {topic.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted">
                      {topic.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="border-t border-gold/6 bg-dark-section py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Gallery
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                Summit Highlights
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              <FadeIn>
                <div className="group relative aspect-[4/3] overflow-hidden border-[0.5px] border-gold/8 bg-dark-card">
                  <Image
                    src="/images/events/group-event-1.webp"
                    alt="Family Office Summit 2023 group photo"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.08}>
                <div className="group relative aspect-[4/3] overflow-hidden border-[0.5px] border-gold/8 bg-dark-card">
                  <Image
                    src="/images/events/event-photo-2.webp"
                    alt="Summit panel discussion"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.16}>
                <div className="group relative aspect-[4/3] overflow-hidden border-[0.5px] border-gold/8 bg-dark-card">
                  <Image
                    src="/images/events/event-photo-3.webp"
                    alt="Summit networking session"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="border border-gold/10 bg-dark-card p-10 text-center">
                <p className="font-sans text-xs uppercase tracking-widest text-gold">
                  Related Service
                </p>
                <h2 className="mt-4 font-serif text-2xl font-light text-light md:text-3xl">
                  Family Office Services
                </h2>
                <p className="mx-auto mt-4 max-w-lg font-sans text-sm font-light leading-relaxed text-muted">
                  Explore how Blackhorn helps families establish and manage
                  comprehensive governance structures spanning trusts, wills,
                  philanthropy, and multi-generational planning.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/services/family-office"
                    className="inline-flex items-center justify-center bg-gold px-8 py-3 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center border border-gold/30 px-8 py-3 font-sans text-xs uppercase tracking-widest text-gold transition-all duration-300 hover:border-gold hover:bg-gold/[0.04]"
                  >
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gold/6 bg-dark-section py-20">
          <div className="mx-auto max-w-[600px] px-6 text-center">
            <FadeIn>
              <h2 className="font-serif text-3xl font-light text-light">
                Join us at our{' '}
                <span className="italic text-gold">next event</span>
              </h2>
              <p className="mt-6 font-sans text-sm font-light leading-relaxed text-muted">
                Stay informed about upcoming Blackhorn events and exclusive
                gatherings.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" variant="primary">
                  Get in Touch
                </Button>
                <Link
                  href="/events"
                  className="font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
                >
                  &larr; All Events
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  )
}
