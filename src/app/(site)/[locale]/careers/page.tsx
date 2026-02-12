import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Careers | Blackhorn Wealth Management',
  description:
    'Join Blackhorn Wealth Management in Hong Kong. We are looking for experienced Private Bankers and Asset Managers to join our growing Multi-Family Office / External Asset Manager platform.',
  openGraph: {
    title: 'Careers | Blackhorn Wealth Management',
    description:
      'Are you a passionate wealth management professional looking to take your career to the next level? Explore opportunities at Blackhorn.',
  },
}

const benefits = [
  {
    title: 'Independence',
    description:
      'Work within an independent platform free from large bank bureaucracy. Focus on delivering the best outcomes for your clients without institutional constraints.',
  },
  {
    title: 'Partnership Culture',
    description:
      'Collaborative environment where idea sharing is encouraged. Our bankers and Portfolio Managers work together to deliver holistic solutions.',
  },
  {
    title: 'Multi-Platform Access',
    description:
      'Manage portfolios across 11 international private bank partnerships. Offer clients access to multiple financial institutions through a single point of contact.',
  },
  {
    title: 'Growth',
    description:
      'Join a rapidly growing firm with award-winning leadership. Be part of a team that has been recognised by WealthBriefingAsia, Capital CEO, and LGT Private Banking.',
  },
]

export default function CareersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Careers', href: '/careers' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Careers
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                Join Our{' '}
                <span className="italic text-gold">Team</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-muted">
                Are you a passionate and driven Wealth Management Professional
                looking to take your career to the next level?
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Opportunity */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
              {/* Main content */}
              <div>
                <FadeIn>
                  <h2 className="font-serif text-3xl font-light text-light">
                    The Opportunity
                  </h2>
                  <div className="mt-4 h-[0.5px] w-10 bg-gold" />
                </FadeIn>

                <FadeIn delay={0.1}>
                  <div className="mt-8 space-y-6 font-sans text-sm font-light leading-[1.85] text-muted">
                    <p>
                      Blackhorn Wealth Management is looking for experienced
                      Private Bankers and Asset Managers to join our growing
                      Multi-Family Office / External Asset Manager platform.
                    </p>
                    <p>
                      We partner with top tier banks and private funds to
                      provide our clients with flexible and diverse wealth
                      management solutions. Our bankers and Portfolio Managers
                      encourage idea sharing in our collaborative setup, and
                      clients enjoy having access to multiple financial
                      institutions managed by a single point of contact.
                    </p>
                    <p>
                      At Blackhorn, you will have the freedom to build deep,
                      long-term relationships with your clients while leveraging
                      our institutional infrastructure, compliance framework,
                      and extensive banking network. We believe that the best
                      outcomes are achieved when talented professionals are
                      empowered to do their best work.
                    </p>
                  </div>
                </FadeIn>
              </div>

              {/* Side callout */}
              <FadeIn delay={0.2} direction="left">
                <div className="border border-gold/10 bg-dark-card p-8">
                  <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold">
                    Who We&apos;re Looking For
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {[
                      'Experienced Private Bankers',
                      'Asset & Portfolio Managers',
                      'External Asset Management professionals',
                      'Wealth advisory specialists',
                      'Client relationship managers',
                    ].map((role) => (
                      <li key={role} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/60" />
                        <span className="font-sans text-sm text-muted">
                          {role}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Benefits grid */}
        <section className="border-t border-gold/6 bg-dark-section py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Why Blackhorn
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                What We Offer
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit, i) => (
                <FadeIn key={benefit.title} delay={i * 0.08}>
                  <div className="h-full border-[0.5px] border-gold/8 bg-dark-card p-8 transition-all duration-[450ms] hover:border-gold/15 hover:bg-gold/[0.02]">
                    <div className="mb-4 h-[0.5px] w-8 bg-gold/40" />
                    <h3 className="font-serif text-lg font-light text-light">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <div className="border border-gold/10 bg-dark-card p-10 text-center md:p-16">
                <h2 className="font-serif text-3xl font-light text-light md:text-4xl">
                  Ready for a{' '}
                  <span className="italic text-gold">
                    more rewarding career?
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-muted">
                  If you are an experienced private banker looking for a more
                  rewarding career, we&apos;d love to hear from you.
                </p>

                {/* Email CTA */}
                <div className="mt-10">
                  <a
                    href="mailto:careers@blackhorngrp.com"
                    className="inline-flex items-center justify-center bg-gold px-10 py-4 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                  >
                    careers@blackhorngrp.com
                  </a>
                </div>

                {/* Referral note */}
                <div className="mt-10 border-t border-gold/8 pt-8">
                  <p className="font-sans text-xs text-muted">
                    Know someone who&apos;d be a great fit?
                  </p>
                  <p className="mt-2 font-sans text-sm text-gold/80">
                    Ask about our employee referral programme.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
                  >
                    Contact Us
                    <span className="text-gold/50">&rarr;</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  )
}
