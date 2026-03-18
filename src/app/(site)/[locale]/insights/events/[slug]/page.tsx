import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { PortableText, PortableTextBlock } from '@portabletext/react'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchEventBySlug } from '@/lib/sanity/fetch'
import { urlFor } from '@/lib/sanity/image'
import { localized, localizedBlocks } from '@/lib/i18n-utils'

/* ── Helpers ─────────────────────────────────────────────────────────── */

function formatEventDate(dateString: string) {
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return dateString
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/* ── Portable Text components ────────────────────────────────────────── */

const portableTextComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            width={1200}
            height={675}
            className="w-full"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center font-sans text-xs text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-4 mt-12 font-serif text-3xl font-light text-light">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-8 font-serif text-2xl font-light text-light">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-6 font-sans text-lg font-light leading-relaxed text-white/80">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-white/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-light">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string }
      children?: React.ReactNode
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold underline decoration-gold/30 transition-colors duration-300 hover:text-gold-light"
      >
        {children}
      </a>
    ),
  },
}

/* ── Page ─────────────────────────────────────────────────────────────── */

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)
  if (!event) return { title: 'Event Not Found' }

  return {
    title: `${event.title} | Blackhorn Wealth Management`,
    description: event.title,
    openGraph: {
      title: event.title,
      type: 'article',
      ...(event.heroImageUrl && { images: [event.heroImageUrl] }),
    },
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params
  const event = await fetchEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const t = await getTranslations('eventsPage')
  const ti = await getTranslations('insights')
  const locale = await getLocale()
  const descriptionContent = localizedBlocks(event, 'description', locale) as
    | PortableTextBlock[]
    | undefined

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Insights', href: '/insights' },
          { name: ti('sectionEvents'), href: '/insights/events' },
          {
            name: localized(event, 'title', locale),
            href: `/insights/events/${slug}`,
          },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero / Cover Image */}
        <section className="relative pb-0 pt-24">
          {event.heroImageUrl ? (
            <div className="relative h-[40vh] min-h-[320px] w-full md:h-[50vh]">
              <Image
                src={event.heroImageUrl}
                alt={localized(event, 'title', locale)}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/30" />
            </div>
          ) : (
            <div className="h-24" />
          )}
        </section>

        {/* Event Header */}
        <section
          className={`${event.heroImageUrl ? '-mt-32 relative z-10' : ''} pb-8`}
        >
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              {/* Back link */}
              <Link
                href="/insights/events"
                className="mb-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold transition-colors duration-300 hover:text-gold-light"
              >
                &larr; {t('backToEvents')}
              </Link>

              {/* Date & Location */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {event.date && (
                  <span className="font-sans text-xs text-muted">
                    {formatEventDate(event.date)}
                  </span>
                )}
                {event.location && (
                  <>
                    <span className="text-muted/40">&middot;</span>
                    <span className="font-sans text-xs text-muted">
                      {event.location}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl font-light leading-tight text-light md:text-4xl lg:text-5xl">
                {localized(event, 'title', locale)}
              </h1>

              <div className="mt-6 border-b border-gold/8 pb-8" />
            </FadeIn>
          </div>
        </section>

        {/* Event Description */}
        {descriptionContent && descriptionContent.length > 0 && (
          <section className="pb-16">
            <div className="mx-auto max-w-3xl px-6">
              <FadeIn delay={0.1}>
                <div className="prose-custom">
                  <PortableText
                    value={descriptionContent}
                    components={portableTextComponents}
                  />
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <section className="border-t border-gold/6 bg-dark-section py-16">
            <div className="mx-auto max-w-7xl px-6">
              <FadeIn>
                <p className="font-sans text-xs uppercase tracking-widest text-gold">
                  {t('speakersOverline')}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-light text-light">
                  {t('speakersTitle')}
                </h2>
                <div className="mt-4 h-[0.5px] w-10 bg-gold" />
              </FadeIn>

              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {event.speakers.map((speaker, i) => (
                  <FadeIn key={speaker.name} delay={i * 0.08}>
                    <div className="flex items-center gap-5 border-[0.5px] border-gold/8 bg-dark-card p-6 transition-all duration-300 hover:border-gold/15">
                      {speaker.photoUrl ? (
                        <Image
                          src={speaker.photoUrl}
                          alt={speaker.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                          <span className="font-serif text-xl text-gold">
                            {speaker.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-sans text-sm font-medium text-light">
                          {speaker.name}
                        </p>
                        {speaker.title && (
                          <p className="mt-1 font-sans text-xs text-muted">
                            {speaker.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Photo Gallery */}
        {event.gallery && event.gallery.length > 0 && (
          <section className="border-t border-gold/6 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <FadeIn>
                <p className="font-sans text-xs uppercase tracking-widest text-gold">
                  {t('galleryOverline')}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-light text-light">
                  {t('galleryTitle')}
                </h2>
                <div className="mt-4 h-[0.5px] w-10 bg-gold" />
              </FadeIn>

              <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
                {event.gallery.map((img, i) => (
                  <FadeIn key={img.url} delay={i * 0.08}>
                    <div className="group relative aspect-square overflow-hidden border-[0.5px] border-gold/8 bg-dark-card">
                      <Image
                        src={img.url}
                        alt={img.caption || ''}
                        fill
                        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      {img.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 to-transparent p-4">
                          <p className="font-sans text-xs text-white/80">
                            {img.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        {event.ctaEmail && (
          <section className="border-t border-gold/6 bg-dark-section py-16">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <FadeIn>
                <h2 className="font-serif text-3xl font-light text-light">
                  {localized(event, 'ctaText', locale) || t('ctaDefault')}
                </h2>
                <div className="mt-8">
                  <a
                    href={`mailto:${event.ctaEmail}`}
                    className="inline-flex items-center gap-2 border border-gold bg-gold/10 px-8 py-4 font-sans text-xs uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-dark"
                  >
                    {t('ctaButton')}
                  </a>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <ContactCTA />
      </main>
    </>
  )
}
