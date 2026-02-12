import type { Metadata } from 'next'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import TeamGrid from '@/components/about/TeamGrid'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

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

const philosophyCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    title: 'Our Expertise',
    body: 'Our team comprises professionals with decades of experience in their respective fields. We believe that maintaining a diverse team of experts is the best way to serve our clients. From private wealth management to deal sourcing and legacy planning, our advisors will work with you to tailor custom solutions.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Our Philosophy',
    body: 'We take on a holistic view of managing client assets \u2014 looking beyond traditional investment returns. Our investment philosophy is guided by a strategic long-term view, emphasizing portfolio diversity with downside protection.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Our Commitment to Results',
    body: 'We offer institutional services on a personalized level. Our advisors are committed to deliver resilient and sustainable long-term results that are tailored to you and your family\u2019s goals.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Our Partnerships',
    body: 'As an external asset manager, we partner with the most reputable private banks. These trusted partnerships ensure that clients gain access to a diverse array of products and services to best suit their needs. Our advisors are able to manage portfolios across platforms to consolidate assets all under one roof.',
  },
]

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
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                About Blackhorn
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight text-light md:text-5xl lg:text-6xl">
                Blackhorn was founded on the values of{' '}
                <span className="italic text-gold">partnership.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-muted">
                As a privately owned and managed organization, we focus on
                fostering long-term relationships within our partnerships. Your
                success is essential to our own success.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Section 2: Philosophy Grid ─────────────────────────────────── */}
        <section className="border-b border-gold/6 bg-dark py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {philosophyCards.map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col border-[0.5px] border-gold/8 bg-dark-card p-10 transition-all duration-[450ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:border-gold/15 hover:bg-gold/[0.02]">
                    <span className="text-gold">{card.icon}</span>
                    <h3 className="mt-6 font-serif text-xl font-light text-light">
                      {card.title}
                    </h3>
                    <p className="mt-4 flex-1 font-sans text-sm font-light leading-[1.85] text-muted">
                      {card.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3 & 4: Team Grid + Advisory Board (Client Component) ─ */}
        <TeamGrid />

        {/* ─── Section 5: Our Culture Gallery ─────────────────────────────── */}
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

        {/* ─── Section 6: CTA ─────────────────────────────────────────────── */}
        <section className="relative border-t border-gold/6 bg-dark py-28">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)',
            }}
          />
          <div className="relative mx-auto max-w-[700px] px-6 text-center">
            <FadeIn>
              <h2 className="font-serif text-3xl font-light leading-snug text-light md:text-4xl">
                &ldquo;Your success is essential to{' '}
                <span className="italic text-gold">our own success.</span>&rdquo;
              </h2>
              <div className="mt-10">
                <Button href="/contact" variant="primary">
                  Get in Touch
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  )
}
