// TODO: Replace hardcoded strings with useTranslations('about')
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'

export default function About() {
  return (
    <section className="bg-light-bg py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-12 lg:grid-cols-2">
        {/* Text column */}
        <FadeIn>
          <p className="font-sans text-xs uppercase tracking-widest text-gold-dark">
            Our Philosophy
          </p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-light-text md:text-5xl">
            Built on Partnership, Driven by{' '}
            <span className="italic text-gold-dark">Results</span>
          </h2>
          <div className="mt-8 h-[0.5px] w-10 bg-gold-dark" />
          <p className="mt-8 font-sans text-base font-light leading-relaxed text-light-text-secondary">
            Blackhorn was founded on the values of partnership. As a privately
            owned and managed organization, we focus on fostering long-term
            relationships within our partnerships. Your success is essential to
            our own success.
          </p>
          <p className="mt-5 font-sans text-base font-light leading-relaxed text-light-text-secondary">
            We take on a holistic view of managing client assets — looking
            beyond traditional investment returns. Our investment philosophy is
            guided by a strategic long-term view, emphasizing portfolio diversity
            with downside protection.
          </p>
          <Link
            href="/about"
            className="group mt-10 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold-dark transition-colors duration-300 hover:text-gold"
          >
            Learn Our Story
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </FadeIn>

        {/* Visual column */}
        <FadeIn delay={0.2} className="hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden border border-light-border bg-white">
            {/* Abstract skyline shapes */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around gap-3 px-8 pb-0">
              <div className="h-[45%] w-[8%] bg-gradient-to-t from-gold/15 to-gold/5" />
              <div className="h-[65%] w-[6%] bg-gradient-to-t from-gold/18 to-gold/6" />
              <div className="h-[80%] w-[10%] bg-gradient-to-t from-gold/15 to-gold/4" />
              <div className="h-[55%] w-[7%] bg-gradient-to-t from-gold/12 to-gold/5" />
              <div className="h-[70%] w-[9%] bg-gradient-to-t from-gold/18 to-gold/6" />
              <div className="h-[50%] w-[6%] bg-gradient-to-t from-gold/15 to-gold/5" />
              <div className="h-[90%] w-[11%] bg-gradient-to-t from-gold/15 to-gold/4" />
              <div className="h-[60%] w-[7%] bg-gradient-to-t from-gold/12 to-gold/5" />
            </div>

            {/* Location text */}
            <div className="absolute bottom-6 left-6">
              <p className="font-sans text-[10px] uppercase tracking-widest text-light-text-secondary/30">
                Hong Kong &middot; Central
              </p>
              <p className="mt-1 font-sans text-[9px] uppercase tracking-widest text-light-text-secondary/20">
                Bank of America Tower
              </p>
            </div>

            {/* Floating rotated square accent */}
            <div className="absolute -right-4 -top-4 h-20 w-20 rotate-45 border border-gold/15" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
