// TODO: Replace hardcoded strings with useTranslations('services')
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'
import { services } from '@/lib/services'

export default function Services() {
  return (
    <section className="border-t border-gold/6 bg-dark-section py-28">
      <div className="mx-auto max-w-7xl px-12">
        <FadeIn>
          <SectionHeader
            overline="What We Offer"
            title="Tailored Solutions for Discerning Clients"
            highlight="Discerning"
          />
        </FadeIn>

        {/* Top row — 3 cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <FadeIn key={s.slug} delay={i * 0.12}>
              <Link href={s.href} className="group block h-full">
                <div className="flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-8 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-lg hover:shadow-gold/[0.03]">
                  <span className="text-2xl text-gold">{s.icon}</span>
                  <h3 className="mt-5 font-serif text-xl font-light text-light">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm font-light leading-relaxed text-muted">
                    {s.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 group-hover:text-gold-light">
                    Explore
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Bottom row — 2 cards, centered on desktop */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+0.75rem)] lg:grid-cols-2">
          {services.slice(3).map((s, i) => (
            <FadeIn key={s.slug} delay={(i + 3) * 0.12}>
              <Link href={s.href} className="group block h-full">
                <div className="flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-8 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-lg hover:shadow-gold/[0.03]">
                  <span className="text-2xl text-gold">{s.icon}</span>
                  <h3 className="mt-5 font-serif text-xl font-light text-light">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm font-light leading-relaxed text-muted">
                    {s.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 group-hover:text-gold-light">
                    Explore
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
  )
}
