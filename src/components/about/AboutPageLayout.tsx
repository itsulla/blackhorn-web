import { ReactNode } from 'react'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { PortableText, PortableTextBlock } from '@portabletext/react'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { aboutLinks } from '@/lib/about'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { fetchAboutPillars, fetchAboutPillarBySlug } from '@/lib/sanity/fetch'
import { localized, localizedBlocks } from '@/lib/i18n-utils'

interface AboutPageLayoutProps {
  title: string
  overline: string
  subtitle: string
  currentSlug: string
  children: ReactNode
  /** Override the hero section background (default: bg-dark-section) */
  heroBg?: string
  /** Override the content section background (default: bg-light-bg) */
  contentBg?: string
}

/* Hardcoded fallback sidebar links (used when CMS is empty) */
const fallbackSidebarSlugs = ['our-expertise', 'our-philosophy', 'commitment-to-results', 'partnerships']

/* Portable Text components for about page content */
const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl font-light text-light-text pt-2">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-4 border-l-2 border-gold-dark/40 pl-6 italic text-light-text-secondary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-4 space-y-2 pl-4">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="my-4 space-y-2 pl-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-3">
        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-light-text">{children}</strong>
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
        className="text-gold-dark underline decoration-gold-dark/30 transition-colors duration-300 hover:text-gold"
      >
        {children}
      </a>
    ),
  },
}

export default async function AboutPageLayout({
  title,
  overline,
  subtitle,
  currentSlug,
  children,
  heroBg,
  contentBg,
}: AboutPageLayoutProps) {
  const t = await getTranslations('aboutLayout')
  const tc = await getTranslations('common')
  const tNav = await getTranslations('nav')
  const locale = await getLocale()

  // Fetch this page's CMS content and all pillars for sidebar
  const [pillarDetail, cmsPillars] = await Promise.all([
    fetchAboutPillarBySlug(currentSlug),
    fetchAboutPillars(),
  ])

  // Use CMS title/subtitle if available
  const displayTitle = (pillarDetail ? localized(pillarDetail, 'title', locale) : '') || title
  const displaySubtitle = (pillarDetail ? localized(pillarDetail, 'subtitle', locale) : '') || subtitle

  // CMS rich text content
  const cmsContent = pillarDetail
    ? localizedBlocks(pillarDetail, 'content', locale) as PortableTextBlock[] | undefined
    : undefined

  // Build sidebar links from CMS or fall back to hardcoded
  const sidebarLinks = cmsPillars.length > 0
    ? cmsPillars
        .filter((p) => {
          const pillarSlug = p.slug?.current || ''
          return pillarSlug !== currentSlug
        })
        .map((p) => ({
          key: p._id,
          label: localized(p, 'title', locale),
          href: p.href || '#',
        }))
    : aboutLinks
        .filter((a) => fallbackSidebarSlugs.includes(a.slug) && a.slug !== currentSlug)
        .map((a) => {
          const slugToNavKey: Record<string, string> = {
            'our-expertise': 'ourExpertise',
            'our-philosophy': 'ourPhilosophy',
            'commitment-to-results': 'commitmentToResults',
            'partnerships': 'partnerships',
          }
          return {
            key: a.slug,
            label: slugToNavKey[a.slug] ? tNav(slugToNavKey[a.slug]) : a.shortTitle,
            href: a.href,
          }
        })

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: tNav('about'), href: '/about' },
          { name: displayTitle, href: `/about/${currentSlug}` },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className={`border-b border-gold/6 ${heroBg || 'bg-dark-section'} pb-16 pt-32`}>
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              {/* Breadcrumb */}
              <nav className="mb-8 flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-muted">
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  {tc('home')}
                </Link>
                <span className="text-gold/30">/</span>
                <Link
                  href="/about"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  {tNav('about')}
                </Link>
                <span className="text-gold/30">/</span>
                <span className="text-white/50">{displayTitle}</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-sans text-xs uppercase tracking-widest text-gold text-shadow-hero">
                {overline}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {displayTitle}
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white text-shadow-hero">
                {displaySubtitle}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className={`${contentBg || 'bg-light-bg'} py-24`}>
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_300px]">
            {/* Main content */}
            <FadeIn delay={0.15}>
              <div className="max-w-[800px] space-y-6 font-sans text-sm leading-[1.85] text-light-text-secondary">
                {cmsContent && cmsContent.length > 0 ? (
                  <PortableText
                    value={cmsContent}
                    components={portableTextComponents}
                  />
                ) : (
                  children
                )}
              </div>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.25} direction="left">
              <aside className="space-y-8">
                {/* Other About Pages nav */}
                <div className="border border-light-border bg-white p-6 shadow-sm">
                  <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                    {t('sidebarTitle')}
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {sidebarLinks.map((link) => (
                      <li key={link.key}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-3 font-sans text-sm text-light-text-secondary transition-colors duration-300 hover:text-light-text"
                        >
                          <span className="text-gold-dark/40 transition-colors duration-300 group-hover:text-gold-dark">
                            ›
                          </span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA card */}
                <div className="border border-light-border bg-white p-6 shadow-sm">
                  <h3 className="font-serif text-lg font-light text-light-text">
                    {t('ctaTitle')}
                  </h3>
                  <p className="mt-3 font-sans text-xs leading-relaxed text-light-text-secondary">
                    {t('ctaDescription')}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center justify-center bg-gold px-6 py-2.5 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                  >
                    {t('ctaButton')}
                  </Link>
                </div>
              </aside>
            </FadeIn>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA />
      </main>
    </>
  )
}
