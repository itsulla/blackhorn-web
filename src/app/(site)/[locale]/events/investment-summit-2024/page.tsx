import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title:
    'Blackhorn Immersive Wealth & Wellness Summit 2024 | Blackhorn Wealth Management',
  description:
    'Recap of the Blackhorn Immersive Wealth & Wellness Summit 2024 in Hong Kong, featuring distinguished speakers on wealth management, technology, wellness, and lifestyle.',
  openGraph: {
    title: 'Blackhorn Immersive Wealth & Wellness Summit 2024',
    description:
      'An exclusive gathering exploring holistic approaches to prosperity, featuring 10 distinguished speakers.',
  },
}

interface Speaker {
  name: string
  title: string
  organisation: string
  image?: string
  initials: string
}

const speakers: Speaker[] = [
  {
    name: 'Yugi Lee',
    title: 'Co-Founder & CEO',
    organisation: 'Blackhorn Wealth Management',
    image: '/images/team/yugi-lee.webp',
    initials: 'YL',
  },
  {
    name: 'Mary Chiu',
    title: 'Co-Founder',
    organisation: 'Blackhorn Wealth Management',
    image: '/images/team/mary-chiu.webp',
    initials: 'MC',
  },
  {
    name: 'Alan Lee',
    title: 'Head of Investment Strategy, Managing Director',
    organisation: 'Blackhorn Wealth Management',
    image: '/images/team/alan-lee.webp',
    initials: 'AL',
  },
  {
    name: 'Wilson Hui',
    title: 'Head of Wealth Solutions, Managing Director',
    organisation: 'Blackhorn Wealth Management',
    image: '/images/team/wilson-hui.webp',
    initials: 'WH',
  },
  {
    name: 'Agnes Wong',
    title: 'Head of Fixed Income',
    organisation: 'Blackhorn Wealth Management',
    initials: 'AW',
  },
  {
    name: 'Peter Tsang',
    title: 'Senior Partner',
    organisation: 'Legal Advisory',
    initials: 'PT',
  },
  {
    name: 'Andrew Lo',
    title: 'Founder & CEO',
    organisation: 'EFT Solutions Ltd',
    initials: 'AL',
  },
  {
    name: 'Dr. Vivian Lam',
    title: 'Wellness & Longevity Specialist',
    organisation: 'Wellness Advisor',
    initials: 'VL',
  },
  {
    name: 'Jason Cheung',
    title: 'Managing Partner',
    organisation: 'Asia-Pacific Ventures',
    initials: 'JC',
  },
  {
    name: 'Nejteh Demirian',
    title: 'Advisory Board Member',
    organisation: 'Blackhorn Wealth Management',
    image: '/images/team/nejteh-demirian.webp',
    initials: 'ND',
  },
]

const summitHighlights = [
  {
    title: 'Wealth Strategy',
    description:
      'Expert panels on portfolio diversification, alternative investments, and navigating Asia-Pacific market dynamics.',
  },
  {
    title: 'Technology & Innovation',
    description:
      'Exploring how fintech, AI, and digital assets are reshaping wealth management for the next decade.',
  },
  {
    title: 'Wellness & Lifestyle',
    description:
      'Holistic approaches to health, longevity, and wellbeing as integral components of true prosperity.',
  },
  {
    title: 'Legacy & Impact',
    description:
      'Next-generation wealth transfer, philanthropy, and creating lasting impact through purposeful investing.',
  },
]

const galleryImages = [
  {
    src: '/images/events/event-photo-1.webp',
    alt: 'Summit keynote presentation',
  },
  {
    src: '/images/events/event-photo-2.webp',
    alt: 'Panel discussion at the summit',
  },
  {
    src: '/images/events/event-photo-3.webp',
    alt: 'Networking at the summit',
  },
  {
    src: '/images/events/event-photo-4.webp',
    alt: 'Summit attendees',
  },
  {
    src: '/images/events/team-group.webp',
    alt: 'Blackhorn team at the summit',
  },
  {
    src: '/images/events/founders-portrait.webp',
    alt: 'Blackhorn founders at the summit',
  },
]

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="group border-[0.5px] border-gold/8 bg-dark-card p-6 text-center transition-all duration-[450ms] hover:border-gold/15 hover:bg-gold/[0.02]">
      {/* Portrait */}
      <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border border-gold/15">
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt={speaker.name}
            width={112}
            height={112}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-dark-section">
            <span className="font-serif text-2xl font-light text-gold/60">
              {speaker.initials}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="font-serif text-lg font-light text-light">
        {speaker.name}
      </h3>
      <p className="mt-1 font-sans text-xs text-gold/70">{speaker.title}</p>
      <p className="mt-1 font-sans text-[11px] text-muted">
        {speaker.organisation}
      </p>
    </div>
  )
}

export default function InvestmentSummit2024Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Events', href: '/events' },
          {
            name: 'Investment Summit 2024',
            href: '/events/investment-summit-2024',
          },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative border-b border-gold/6 bg-dark-section pb-20 pt-32">
          {/* Background image with overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/events/event-photo-1.webp"
              alt=""
              fill
              className="object-cover opacity-[0.08]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-section/60 via-dark-section/80 to-dark-section" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            {/* Breadcrumb */}
            <FadeIn>
              <nav className="mb-8 flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-muted">
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  Home
                </Link>
                <span className="text-gold/30">/</span>
                <Link
                  href="/events"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  Events
                </Link>
                <span className="text-gold/30">/</span>
                <span className="text-white/50">
                  Investment Summit 2024
                </span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="bg-gold/10 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-gold">
                  Past Event
                </span>
                <span className="font-sans text-xs text-muted">
                  November 2024 &middot; Hong Kong
                </span>
              </div>
              <h1 className="font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                Immersive Wealth &{' '}
                <span className="italic text-gold">Wellness Summit</span>
              </h1>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-muted">
                The Blackhorn Immersive Wealth & Wellness Summit 2024 brought
                together distinguished speakers and industry leaders for an
                exclusive exploration of holistic prosperity &mdash; spanning
                wealth strategy, technology, wellness, and legacy.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Summit Highlights */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Summit Themes
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                Key Discussion Areas
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {summitHighlights.map((highlight, i) => (
                <FadeIn key={highlight.title} delay={i * 0.08}>
                  <div className="h-full border-[0.5px] border-gold/8 bg-dark-card p-8 transition-all duration-[450ms] hover:border-gold/15 hover:bg-gold/[0.02]">
                    <div className="mb-4 h-[0.5px] w-8 bg-gold/40" />
                    <h3 className="font-serif text-lg font-light text-light">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted">
                      {highlight.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Speakers */}
        <section className="border-t border-gold/6 bg-dark-section py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Distinguished Speakers
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                Our Speakers
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {speakers.map((speaker, i) => (
                <FadeIn key={speaker.name} delay={i * 0.06}>
                  <SpeakerCard speaker={speaker} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Gallery
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                Summit Moments
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              {galleryImages.map((img, i) => (
                <FadeIn key={img.src} delay={i * 0.06}>
                  <div className="group relative aspect-[4/3] overflow-hidden border-[0.5px] border-gold/8 bg-dark-card">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA />
      </main>
    </>
  )
}
