import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title:
    'Pressing On Toward the Goal \u2014 Blackhorn Founder Yugi Lee | Blackhorn Wealth Management',
  description:
    'Capital CEO magazine profiled Yugi Lee as CEO of the Year, covering her journey from Bank of Shanghai to co-founding Blackhorn at age 30.',
  openGraph: {
    title:
      'Pressing On Toward the Goal \u2014 Blackhorn Founder Yugi Lee',
    description:
      'Capital CEO magazine profiled Yugi Lee as CEO of the Year.',
    images: [
      {
        url: '/images/press/capital-ceo-interview-2022.webp',
        width: 1200,
        height: 803,
        alt: 'Capital CEO interview with Yugi Lee',
      },
    ],
  },
}

export default function CapitalCeoCeoOfYear2023() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Press & Media', href: '/press' },
          {
            name: 'Capital CEO \u2014 CEO of the Year 2022',
            href: '/press/capital-ceo-yugi-ceo-of-year-2023',
          },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-4xl px-6">
            <FadeIn>
              <Link
                href="/press"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
              >
                &larr; Back to Press
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-8 flex items-center gap-3">
                <span className="font-sans text-[10px] uppercase tracking-widest text-gold">
                  Capital CEO
                </span>
                <span className="text-white/15">&middot;</span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-muted">
                  February 2023
                </span>
              </div>
              <h1 className="mt-4 font-serif text-3xl font-light leading-tight text-light md:text-4xl lg:text-5xl">
                Pressing On Toward the Goal &mdash; Blackhorn Founder{' '}
                <span className="italic text-gold">Yugi Lee</span>
              </h1>
              <p className="mt-2 font-serif text-lg text-muted/70">
                努力面前 向著標竿直跑 &mdash; BLACKHORN 創始人李汶臻
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6">
            {/* Hero Image */}
            <FadeIn>
              <div className="relative aspect-[3/2] w-full overflow-hidden border-[0.5px] border-gold/10">
                <Image
                  src="/images/press/capital-ceo-interview-2022.webp"
                  alt="Capital CEO interview with Yugi Lee"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
              <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-muted/50">
                Publication: Capital CEO &mdash; CEO of the Year 2022
              </p>
            </FadeIn>

            {/* Summary */}
            <FadeIn delay={0.15}>
              <div className="mt-12 space-y-6">
                <p className="font-sans text-base font-light leading-[1.85] text-muted">
                  Capital CEO magazine profiled Yugi Lee as CEO of the Year,
                  covering her journey from being a founding member of Bank of
                  Shanghai&apos;s Hong Kong branch to co-founding Blackhorn at
                  age 30.
                </p>
                <p className="font-sans text-base font-light leading-[1.85] text-muted">
                  The article highlighted how the firm built strategic
                  partnerships with over 10 international private banks during
                  its founding year, achieving rapid growth and recognition
                  across the industry. Blackhorn&apos;s multi-platform approach
                  &mdash; acting as an independent gatekeeper for client assets
                  across multiple banking platforms &mdash; was noted as a
                  distinctive advantage in the Hong Kong wealth management
                  landscape.
                </p>
                <p className="font-sans text-base font-light leading-[1.85] text-muted">
                  The profile also covered Blackhorn&apos;s award-winning first
                  year, including recognition from WealthBriefingAsia and Asian
                  Private Banker, and Yugi&apos;s philosophy of prioritising
                  client interests through institutional-quality service
                  delivered on a personal level.
                </p>
              </div>
            </FadeIn>

            {/* Divider */}
            <div className="mt-12 h-[0.5px] w-full bg-gold/10" />

            {/* Back Link */}
            <FadeIn delay={0.2}>
              <div className="mt-8">
                <Link
                  href="/press"
                  className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
                >
                  &larr; View All Press Coverage
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  )
}
