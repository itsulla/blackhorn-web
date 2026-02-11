import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'

const services = [
  {
    icon: '\u25C7',
    title: 'Wealth Management',
    desc: 'Comprehensive portfolio construction, risk management, and investment advisory tailored to your financial objectives and risk appetite.',
    href: '/services',
  },
  {
    icon: '\u25C8',
    title: 'Family Office',
    desc: 'Holistic family wealth governance, succession planning, and concierge services designed for multigenerational prosperity.',
    href: '/family-office',
  },
  {
    icon: '\u25BD',
    title: 'Investment Advisory',
    desc: 'Curated access to global opportunities across public markets, private equity, real estate, and alternative investments.',
    href: '/services',
  },
  {
    icon: '\u25CB',
    title: 'Estate & Legacy',
    desc: 'Strategic estate structuring, philanthropic planning, and wealth transfer solutions to secure your family\u2019s lasting legacy.',
    href: '/services',
  },
]

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

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.12}>
              <div className="group flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-8 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/20 hover:bg-gold/[0.04] hover:shadow-lg hover:shadow-gold/[0.03]">
                <span className="text-2xl text-gold">{s.icon}</span>
                <h3 className="mt-5 font-serif text-xl font-light text-light">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 font-sans text-sm font-light leading-relaxed text-muted">
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  className="mt-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
                >
                  Explore
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
