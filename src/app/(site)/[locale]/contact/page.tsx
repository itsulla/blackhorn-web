import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Linkedin, Briefcase, Newspaper } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import ContactFormAdvanced from '@/components/ContactFormAdvanced'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us | Blackhorn Wealth Management',
  description:
    'Schedule a confidential consultation with our advisory team. Room 705-708, 7/F, Bank of America Tower, 12 Harcourt Road, Central, Hong Kong.',
  openGraph: {
    title: 'Contact Us | Blackhorn Wealth Management',
    description:
      'Get in touch with Blackhorn Wealth Management in Central, Hong Kong.',
  },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* ─── Hero (dark) ─────────────────────────────────────────────── */}
        <section className="relative pb-20 pt-32">
          <Image
            src="/images/hero/hk-night.webp"
            alt=""
            fill
            className="object-cover"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAQBACdASoUAAsAPzmEuVOvKKWisAgB4CcJZACdH8ADFYWNvdn4qUBekAD+2QyF93Mf61ksqBzrVF/kDI6fHBTJLqVfM9y2gE/503QAAAA="
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-dark-900/85" />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs uppercase tracking-widest text-gold">
                Contact
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
                Get in{' '}
                <span className="italic text-gold">Touch</span>
              </h1>
              <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted">
                We welcome the opportunity to discuss how Blackhorn may serve your
                interests. Reach out to schedule a confidential consultation with
                our advisory team.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── Form + Info (light) ─────────────────────────────────────── */}
        <section className="bg-light-bg py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
              {/* Left column — form */}
              <FadeIn delay={0.1}>
                <div>
                  <h2 className="mb-2 font-serif text-2xl font-light text-light-text">
                    Send Us a Message
                  </h2>
                  <p className="mb-8 font-sans text-sm text-light-text-secondary">
                    Complete the form below and a member of our team will respond
                    within 2 business days.
                  </p>
                  <ContactFormAdvanced />
                </div>
              </FadeIn>

              {/* Right column — info cards */}
              <div className="space-y-6">
                {/* Office card */}
                <FadeIn delay={0.2} direction="left">
                  <div className="border border-light-border bg-white p-8 shadow-sm">
                    <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                      Our Office
                    </h3>

                    <div className="mt-6 space-y-5">
                      <div className="flex gap-4">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark" />
                        <p className="font-sans text-sm leading-relaxed text-light-text-secondary">
                          {SITE_CONFIG.address}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark" />
                        <a
                          href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                          className="font-sans text-sm text-light-text-secondary transition-colors duration-300 hover:text-gold-dark"
                        >
                          {SITE_CONFIG.phone}
                        </a>
                      </div>

                      <div className="flex gap-4">
                        <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark" />
                        <a
                          href={`mailto:${SITE_CONFIG.email}`}
                          className="font-sans text-sm text-light-text-secondary transition-colors duration-300 hover:text-gold-dark"
                        >
                          {SITE_CONFIG.email}
                        </a>
                      </div>

                      <div className="flex gap-4">
                        <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark" />
                        <p className="font-sans text-sm text-light-text-secondary">
                          Monday &ndash; Friday, 9:00 AM &ndash; 6:00 PM HKT
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Department contacts */}
                <FadeIn delay={0.25} direction="left">
                  <div className="border border-light-border bg-white p-8 shadow-sm">
                    <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                      Department Contacts
                    </h3>

                    <div className="mt-6 space-y-5">
                      <div className="flex gap-4">
                        <Newspaper className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark" />
                        <div>
                          <p className="font-sans text-xs uppercase tracking-wide text-light-text/60">
                            For media enquiries
                          </p>
                          <a
                            href="mailto:rachel.ip@blackhorngrp.com"
                            className="mt-1 block font-sans text-sm text-light-text-secondary transition-colors duration-300 hover:text-gold-dark"
                          >
                            rachel.ip@blackhorngrp.com
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Briefcase className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-dark" />
                        <div>
                          <p className="font-sans text-xs uppercase tracking-wide text-light-text/60">
                            For career opportunities
                          </p>
                          <a
                            href="mailto:careers@blackhorngrp.com"
                            className="mt-1 block font-sans text-sm text-light-text-secondary transition-colors duration-300 hover:text-gold-dark"
                          >
                            careers@blackhorngrp.com
                          </a>
                          <Link
                            href="/careers"
                            className="mt-1 inline-flex items-center gap-1 font-sans text-xs text-gold-dark/60 transition-colors duration-300 hover:text-gold-dark"
                          >
                            View open positions
                            <span>&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Google Maps */}
                <FadeIn delay={0.3} direction="left">
                  <div className="overflow-hidden border border-light-border">
                    <iframe
                      title="Blackhorn Wealth Management Office Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.9577726284513!2d114.15953477596484!3d22.28080474399783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404007b04e4e8e7%3A0x65b0ffe588e2a5!2sBank%20of%20America%20Tower!5e0!3m2!1sen!2shk!4v1700000000000!5m2!1sen!2shk"
                      width="100%"
                      height="280"
                      style={{
                        border: 0,
                        filter: 'grayscale(20%)',
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="block"
                    />
                  </div>
                </FadeIn>

                {/* Connect with us */}
                <FadeIn delay={0.35} direction="left">
                  <div className="border border-light-border bg-white p-8 shadow-sm">
                    <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                      Connect with Us
                    </h3>
                    <div className="mt-5">
                      <a
                        href={SITE_CONFIG.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 font-sans text-sm text-light-text-secondary transition-colors duration-300 hover:text-gold-dark"
                      >
                        <Linkedin className="h-4 w-4 text-gold-dark/50 transition-colors duration-300 group-hover:text-gold-dark" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Contact CTA (dark) ──────────────────────────────────────── */}
        <ContactCTA />
      </main>
    </>
  )
}
