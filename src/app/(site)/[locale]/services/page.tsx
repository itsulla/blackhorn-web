import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { services } from '@/lib/services'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Services | Blackhorn Wealth Management',
  description:
    'Explore our full suite of portfolio management, family office, deal sourcing, legacy planning, and real estate financing services from Blackhorn in Hong Kong.',
}

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Our Services
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                The Client{' '}
                <span className="italic text-gold">Experience</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-muted">
                As an independent and privately managed organisation, we can
                focus exclusively on client needs. Our team of professionals is
                ready to work with you on creating a total solution for your
                wealth planning needs.
              </p>
              <p className="mt-4 max-w-2xl font-sans text-base font-light leading-relaxed text-muted">
                The advisory process with clients is based on understanding,
                collaboration, and results.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Service grid — top 3 */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((s, i) => (
                <FadeIn key={s.slug} delay={i * 0.1}>
                  <Link href={s.href} className="group block h-full">
                    <div className="flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-10 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-lg hover:shadow-gold/[0.03]">
                      <span className="text-3xl text-gold">{s.icon}</span>
                      <h2 className="mt-6 font-serif text-2xl font-light text-light">
                        {s.title}
                      </h2>
                      <p className="mt-4 flex-1 font-sans text-sm font-light leading-relaxed text-muted">
                        {s.desc}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 group-hover:text-gold-light">
                        Learn More
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            {/* Bottom 2 — centered */}
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+1rem)]">
              {services.slice(3).map((s, i) => (
                <FadeIn key={s.slug} delay={(i + 3) * 0.1}>
                  <Link href={s.href} className="group block h-full">
                    <div className="flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-10 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-lg hover:shadow-gold/[0.03]">
                      <span className="text-3xl text-gold">{s.icon}</span>
                      <h2 className="mt-6 font-serif text-2xl font-light text-light">
                        {s.title}
                      </h2>
                      <p className="mt-4 flex-1 font-sans text-sm font-light leading-relaxed text-muted">
                        {s.desc}
                      </p>
                      <span className="mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 group-hover:text-gold-light">
                        Learn More
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gold/6 bg-dark-section py-20">
          <div className="mx-auto max-w-[600px] px-6 text-center">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Get Started
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                Ready to explore how we can help?
              </h2>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted">
                Speak with our team to discover how our advisory process can be
                tailored to your unique needs.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary">
                  Book a Consultation
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  )
}
