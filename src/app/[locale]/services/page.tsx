import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { services } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Services | Blackhorn Wealth Management',
  description:
    'Explore our full suite of wealth management, family office, investment advisory, and estate planning services.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-dark">
      {/* Hero */}
      <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <SectionHeader
              overline="Our Services"
              title="Tailored Solutions for Discerning Clients"
              highlight="Discerning"
              className="mb-0 text-left md:text-left lg:text-left"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted">
              We provide a comprehensive suite of advisory services designed to
              protect, grow, and transfer wealth across generations. Each
              engagement is tailored to the specific needs of our clients.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((s, i) => (
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
        </div>
      </section>
    </main>
  )
}
