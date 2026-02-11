import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'

export default function About() {
  return (
    <section className="bg-dark py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-12 lg:grid-cols-2">
        {/* Text column */}
        <FadeIn>
          <p className="font-sans text-xs uppercase tracking-widest text-gold">
            Our Philosophy
          </p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-light md:text-5xl">
            Built on Trust, Driven by{' '}
            <span className="italic text-gold">Insight</span>
          </h2>
          <div className="mt-8 h-[0.5px] w-10 bg-gold" />
          <p className="mt-8 font-sans text-base font-light leading-relaxed text-muted">
            Blackhorn Wealth Management is an independent, Hong Kong-based firm
            providing sophisticated investment solutions to high-net-worth
            individuals, families, and institutions. We combine deep market
            knowledge with a disciplined, research-driven approach.
          </p>
          <p className="mt-5 font-sans text-base font-light leading-relaxed text-muted">
            Our team draws on decades of experience across private banking,
            asset management, and family office advisory — delivering
            personalised strategies that preserve and grow wealth across
            generations.
          </p>
          <Link
            href="/about"
            className="group mt-10 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
          >
            Learn Our Story
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </FadeIn>

        {/* Visual column */}
        <FadeIn delay={0.2} className="hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden border-[0.5px] border-gold/12 bg-dark-card">
            {/* Abstract skyline shapes */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around gap-3 px-8 pb-0">
              <div className="h-[45%] w-[8%] bg-gradient-to-t from-gold/10 to-gold/3" />
              <div className="h-[65%] w-[6%] bg-gradient-to-t from-gold/12 to-gold/4" />
              <div className="h-[80%] w-[10%] bg-gradient-to-t from-gold/10 to-gold/2" />
              <div className="h-[55%] w-[7%] bg-gradient-to-t from-gold/8 to-gold/3" />
              <div className="h-[70%] w-[9%] bg-gradient-to-t from-gold/12 to-gold/4" />
              <div className="h-[50%] w-[6%] bg-gradient-to-t from-gold/10 to-gold/3" />
              <div className="h-[90%] w-[11%] bg-gradient-to-t from-gold/10 to-gold/2" />
              <div className="h-[60%] w-[7%] bg-gradient-to-t from-gold/8 to-gold/3" />
            </div>

            {/* Location text */}
            <div className="absolute bottom-6 left-6">
              <p className="font-sans text-[10px] uppercase tracking-widest text-muted/30">
                Hong Kong &middot; Central
              </p>
              <p className="mt-1 font-sans text-[9px] uppercase tracking-widest text-muted/20">
                Bank of America Tower
              </p>
            </div>

            {/* Floating rotated square accent */}
            <div className="absolute -right-4 -top-4 h-20 w-20 rotate-45 border-[0.5px] border-gold/10" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
