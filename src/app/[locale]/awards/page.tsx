import type { Metadata } from 'next'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Awards & Recognition | Blackhorn Wealth Management',
  description:
    'Our commitment to excellence has been recognised by the industry\u2019s most respected institutions, including WealthBriefingAsia, Capital CEO, LGT Private Banking, and Asian Fund Distributors.',
  openGraph: {
    title: 'Awards & Recognition | Blackhorn Wealth Management',
    description:
      'Our commitment to excellence has been recognised by the industry\u2019s most respected institutions.',
  },
}

const awards = [
  {
    year: '2024',
    org: 'Asian Fund Distributors',
    title: 'Gold Award \u2014 Outstanding Wealth Management',
    context:
      'Asian Fund Distributors recognises excellence among independent asset managers and wealth advisory firms across the Asia-Pacific region.',
  },
  {
    year: '2024',
    org: 'LGT Private Banking',
    title: 'Top Valued Business Partner',
    context:
      'LGT Private Banking, one of the world\u2019s largest family-owned private banking groups, recognises its most valued external asset management partners annually.',
  },
  {
    year: '2023',
    org: 'WealthBriefingAsia',
    title: 'Best Independent Wealth Manager \u2014 Hong Kong',
    image: '/images/awards/wealthbriefingasia-banner.webp',
    context:
      'The WealthBriefingAsia Awards programme is one of the most prestigious in the Asian wealth management industry, recognising outstanding firms across the region.',
  },
  {
    year: '2022',
    org: 'Capital CEO',
    title: 'Outstanding Wealth Management Firm',
    image: '/images/awards/capital-ceo-yugi-2022.webp',
    secondImage: '/images/awards/capital-ceo-team-2022.webp',
    context:
      'Capital CEO magazine honours leading businesses and executives in Hong Kong. Co-Founder Yugi Lee also received the Outstanding CEO Award at the same ceremony.',
  },
]

const galleryImages = [
  {
    src: '/images/awards/capital-ceo-team-2022.webp',
    alt: 'Blackhorn team at Capital CEO Awards 2022',
  },
  {
    src: '/images/awards/capital-ceo-yugi-2022.webp',
    alt: 'Yugi Lee receiving Capital CEO Outstanding CEO Award 2022',
  },
  {
    src: '/images/awards/wealthbriefingasia-banner.webp',
    alt: 'WealthBriefingAsia Awards 2023',
  },
  {
    src: '/images/awards/award-badge.webp',
    alt: 'Award recognition badge',
  },
]

export default function AwardsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Awards & Recognition', href: '/awards' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Recognition
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                Awards &{' '}
                <span className="italic text-gold">Recognition</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-muted">
                Our commitment to excellence has been recognised by the
                industry&apos;s most respected institutions.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Awards Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="space-y-8">
              {awards.map((award, i) => (
                <FadeIn key={`${award.year}-${award.title}`} delay={i * 0.1}>
                  <div className="grid gap-8 border-[0.5px] border-gold/8 bg-dark-card p-8 transition-all duration-[450ms] hover:border-gold/15 hover:bg-gold/[0.02] md:grid-cols-[auto_1fr] md:p-10">
                    {/* Year badge */}
                    <div className="flex flex-col items-center justify-start">
                      <span className="font-serif text-5xl font-light text-gold">
                        {award.year}
                      </span>
                      <div className="mt-2 h-[0.5px] w-8 bg-gold/30" />
                    </div>

                    {/* Content */}
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-gold/70">
                        {award.org}
                      </p>
                      <h2 className="mt-3 font-serif text-2xl font-light text-light md:text-3xl">
                        {award.title}
                      </h2>
                      <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted">
                        {award.context}
                      </p>

                      {/* Award images */}
                      {award.image && (
                        <div className="mt-6 flex flex-wrap gap-4">
                          <div className="relative h-48 w-full overflow-hidden border-[0.5px] border-gold/10 sm:w-72">
                            <Image
                              src={award.image}
                              alt={`${award.title} - ${award.org}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 288px"
                            />
                          </div>
                          {award.secondImage && (
                            <div className="relative h-48 w-full overflow-hidden border-[0.5px] border-gold/10 sm:w-72">
                              <Image
                                src={award.secondImage}
                                alt={`${award.title} - team photo`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 288px"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
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
                Award Ceremonies
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {galleryImages.map((img, i) => (
                <FadeIn key={img.src} delay={i * 0.08}>
                  <div className="group relative aspect-square overflow-hidden border-[0.5px] border-gold/8 bg-dark-card">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gold/6 bg-dark py-20">
          <div className="mx-auto max-w-[600px] px-6 text-center">
            <FadeIn>
              <h2 className="font-serif text-3xl font-light text-light">
                Award-winning service,{' '}
                <span className="italic text-gold">personally delivered.</span>
              </h2>
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
