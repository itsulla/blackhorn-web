import { ReactNode } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { aboutLinks } from '@/lib/about'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

interface AboutPageLayoutProps {
  title: string
  overline: string
  subtitle: string
  currentSlug: string
  children: ReactNode
}

export default function AboutPageLayout({
  title,
  overline,
  subtitle,
  currentSlug,
  children,
}: AboutPageLayoutProps) {
  const otherPages = aboutLinks.filter((a) => a.slug !== currentSlug)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
          { name: title, href: `/about/${currentSlug}` },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-16 pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <FadeIn>
              {/* Breadcrumb */}
              <nav className="mb-8 flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-muted">
                <Link
                  href="/"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  Home
                </Link>
                <span className="text-gold/30">/</span>
                <Link
                  href="/about"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  About
                </Link>
                <span className="text-gold/30">/</span>
                <span className="text-white/50">{title}</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                {overline}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted">
                {subtitle}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content + Sidebar */}
        <section className="bg-light-bg py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_300px]">
            {/* Main content */}
            <FadeIn delay={0.15}>
              <div className="max-w-[800px] space-y-6 font-sans text-sm leading-[1.85] text-light-text-secondary">
                {children}
              </div>
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.25} direction="left">
              <aside className="space-y-8">
                {/* Other About Pages nav */}
                <div className="border border-light-border bg-white p-6 shadow-sm">
                  <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                    About Blackhorn
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {otherPages.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={a.href}
                          className="group flex items-center gap-3 font-sans text-sm text-light-text-secondary transition-colors duration-300 hover:text-light-text"
                        >
                          <span className="text-gold-dark/40 transition-colors duration-300 group-hover:text-gold-dark">
                            {a.icon}
                          </span>
                          {a.shortTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA card */}
                <div className="border border-light-border bg-white p-6 shadow-sm">
                  <h3 className="font-serif text-lg font-light text-light-text">
                    Ready to get started?
                  </h3>
                  <p className="mt-3 font-sans text-xs leading-relaxed text-light-text-secondary">
                    Speak with our team to explore how we can tailor our services
                    to your needs.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center justify-center bg-gold px-6 py-2.5 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                  >
                    Book a Consultation
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
