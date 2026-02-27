import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('eventsTitle'),
    description: t('eventsDescription'),
  }
}

export default async function EventsPage() {
  const t = await getTranslations('eventsPage')

  const events = [
    {
      slug: 'investment-summit-2024',
      title: t('event1Title'),
      date: 'November 2024',
      location: 'Hong Kong',
      image: '/images/events/event-photo-1.webp',
      description: t('event1Desc'),
      status: 'past' as const,
      featured: true,
    },
    {
      slug: 'family-office-summit-2023',
      title: t('event2Title'),
      date: '2023',
      location: 'Hong Kong',
      image: '/images/events/group-event-1.webp',
      description: t('event2Desc'),
      status: 'past' as const,
      featured: false,
    },
  ]
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Events', href: '/events' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {t('overline')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('title')}{' '}
                <span className="italic text-gold">{t('titleHighlight')}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-white text-shadow-hero">
                {t('description')}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Featured Event */}
        {events
          .filter((e) => e.featured)
          .map((event) => (
            <section
              key={event.slug}
              className="border-b border-light-border bg-light-bg py-20"
            >
              <div className="mx-auto max-w-7xl px-6">
                <FadeIn>
                  <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden border border-light-border">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Status badge */}
                      <div className="absolute left-4 top-4">
                        <span className="bg-white/90 border border-light-border px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-gold-dark backdrop-blur-sm">
                          {event.status === 'past'
                            ? t('pastEvent')
                            : t('upcoming')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-gold-dark">
                        {t('featuredEvent')}
                      </span>
                      <h2 className="mt-3 font-serif text-3xl font-light text-light-text md:text-4xl">
                        {event.title}
                      </h2>
                      <div className="mt-4 flex items-center gap-4 font-sans text-xs text-light-text-secondary">
                        <span>{event.date}</span>
                        <span className="h-[0.5px] w-4 bg-gold-dark/30" />
                        <span>{event.location}</span>
                      </div>
                      <p className="mt-6 font-sans text-sm font-light leading-relaxed text-light-text-secondary">
                        {event.description}
                      </p>
                      <div className="mt-8">
                        <Link
                          href={`/events/${event.slug}`}
                          className="inline-flex items-center gap-2 border border-light-text/20 px-6 py-3 font-sans text-xs uppercase tracking-widest text-light-text transition-all duration-300 hover:border-gold hover:text-gold"
                        >
                          {t('viewEventDetails')}
                          <span className="text-gold-dark/50">&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          ))}

        {/* All Events Grid */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                {t('allEventsOverline')}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-light">
                {t('allEventsTitle')}
              </h2>
              <div className="mt-4 h-[0.5px] w-10 bg-gold" />
            </FadeIn>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {events.map((event, i) => (
                <FadeIn key={event.slug} delay={i * 0.1}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="group block border-[0.5px] border-gold/8 bg-dark-card transition-all duration-[450ms] hover:border-gold/15 hover:bg-gold/[0.02]"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute left-4 top-4">
                        <span className="bg-dark/80 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-gold backdrop-blur-sm">
                          {event.status === 'past'
                            ? t('pastEvent')
                            : t('upcoming')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 font-sans text-xs text-muted">
                        <span>{event.date}</span>
                        <span className="h-[0.5px] w-4 bg-gold/30" />
                        <span>{event.location}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-xl font-light text-light transition-colors duration-300 group-hover:text-gold md:text-2xl">
                        {event.title}
                      </h3>
                      <p className="mt-3 font-sans text-sm font-light leading-relaxed text-muted line-clamp-2">
                        {event.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-all duration-300 group-hover:gap-3">
                        {t('viewDetails')}
                        <span>&rarr;</span>
                      </span>
                    </div>
                  </Link>
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
