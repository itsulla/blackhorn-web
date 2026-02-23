import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { aboutLinks } from '@/lib/about'

export const metadata: Metadata = {
  title: 'About Us | Blackhorn Wealth Management',
  description:
    'Meet the team behind Blackhorn — an independent Hong Kong wealth management firm founded on the values of partnership, with decades of private banking experience at UBS, Morgan Stanley, Credit Suisse, and HSBC.',
  openGraph: {
    title: 'About Us | Blackhorn Wealth Management',
    description:
      'Meet the team behind Blackhorn — an independent Hong Kong wealth management firm founded on the values of partnership, with decades of private banking experience at UBS, Morgan Stanley, Credit Suisse, and HSBC.',
  },
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'About Us', href: '/about' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* ─── Section 1: Hero Banner ─────────────────────────────────────── */}
        <section className="relative border-b border-gold/6 pb-20 pt-32">
          {/* Background — Victoria Harbour with Star Ferry */}
          <Image
            src="/images/hero/hk-harbour.webp"
            alt="Victoria Harbour with Star Ferry and Convention Centre"
            fill
            className="object-cover"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAACQAwCdASoUAA0APzmGulQvKSWjMAgB4CcJZwAAW7epBy7rKjqAAP7r3RpiJ3RZTv9oh0+oKgHzaFRJ/dDo7rHvaMasL/Jjf9d2WkvAAAA="
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                About Blackhorn
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight text-light text-shadow-hero md:text-5xl lg:text-6xl">
                Blackhorn was founded on the values of{' '}
                <span className="italic text-gold">partnership.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-white text-shadow-hero">
                As a privately owned and managed organization, we focus on
                fostering long-term relationships within our partnerships. Your
                success is essential to our own success.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Section 2: About Sub-Page Cards ─────────────────────────────── */}
        <section className="border-b border-light-border bg-light-bg py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold-dark">
                Learn More
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light-text md:text-4xl">
                Explore Our Story
              </h2>
              <div className="mt-6 h-[0.5px] w-10 bg-gold-dark" />
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aboutLinks.map((item, i) => (
                <FadeIn key={item.slug} delay={i * 0.08}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col border border-light-border bg-white p-10 shadow-sm transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-gold/30 hover:shadow-md"
                  >
                    <span className="text-xl text-gold-dark">{item.icon}</span>
                    <h3 className="mt-6 font-serif text-xl font-light text-light-text transition-colors duration-300 group-hover:text-gold">
                      {item.title}
                    </h3>
                    <p className="mt-4 flex-1 font-sans text-sm font-light leading-[1.85] text-light-text-secondary">
                      {item.desc}
                    </p>
                    <span className="mt-6 font-sans text-[10px] uppercase tracking-widest text-gold-dark/60 transition-colors duration-300 group-hover:text-gold-dark">
                      Learn More &rarr;
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Our Culture Gallery ─────────────────────────────── */}
        <section className="border-t border-gold/6 bg-dark-section py-28">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Our Culture
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light md:text-4xl">
                Life at Blackhorn
              </h2>
              <div className="mt-6 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <FadeIn delay={0.1}>
                <div className="group relative aspect-[3/2] overflow-hidden border-[0.5px] border-gold/8">
                  <Image
                    src="/images/events/3rd-anniversary-group.webp"
                    alt="Blackhorn 3rd Anniversary Celebration 2024 — full team group photo"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="group relative aspect-[3/2] overflow-hidden border-[0.5px] border-gold/8">
                  <Image
                    src="/images/events/3rd-anniversary-team.webp"
                    alt="Blackhorn 3rd Anniversary Celebration 2024 — team members"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.25}>
              <p className="mt-4 text-center font-sans text-xs text-muted/50">
                Blackhorn 3rd Anniversary Celebration, 2024
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Contact CTA ─────────────────────────────────────────────── */}
        <ContactCTA />
      </main>
    </>
  )
}
