import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Linkedin, Briefcase, Newspaper } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import ContactForm from '@/components/ContactForm'
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
      <main className="min-h-screen bg-dark pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Page header */}
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

          {/* Two-column grid */}
          <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_400px]">
            {/* Left column — form */}
            <FadeIn delay={0.1}>
              <div>
                <h2 className="mb-8 font-serif text-2xl font-light text-light">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Right column — info */}
            <div className="space-y-6">
              {/* Office card */}
              <FadeIn delay={0.2} direction="left">
                <div className="border border-gold/8 bg-dark-card p-8">
                  <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold">
                    Our Office
                  </h3>

                  <div className="mt-6 space-y-5">
                    {/* Address */}
                    <div className="flex gap-4">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                      <p className="font-sans text-sm leading-relaxed text-muted">
                        {SITE_CONFIG.address}
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                      <a
                        href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                        className="font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>

                    {/* General email */}
                    <div className="flex gap-4">
                      <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>

                    {/* Office hours */}
                    <div className="flex gap-4">
                      <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                      <p className="font-sans text-sm text-muted">
                        Monday &ndash; Friday, 9:00 AM &ndash; 6:00 PM HKT
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Department contacts */}
              <FadeIn delay={0.25} direction="left">
                <div className="border border-gold/8 bg-dark-card p-8">
                  <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold">
                    Department Contacts
                  </h3>

                  <div className="mt-6 space-y-5">
                    {/* Media enquiries */}
                    <div className="flex gap-4">
                      <Newspaper className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                      <div>
                        <p className="font-sans text-xs uppercase tracking-wide text-light/60">
                          For media enquiries
                        </p>
                        <a
                          href="mailto:rachel.ip@blackhorngrp.com"
                          className="mt-1 block font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                        >
                          rachel.ip@blackhorngrp.com
                        </a>
                      </div>
                    </div>

                    {/* Careers */}
                    <div className="flex gap-4">
                      <Briefcase className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                      <div>
                        <p className="font-sans text-xs uppercase tracking-wide text-light/60">
                          For career opportunities
                        </p>
                        <a
                          href="mailto:careers@blackhorngrp.com"
                          className="mt-1 block font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                        >
                          careers@blackhorngrp.com
                        </a>
                        <Link
                          href="/careers"
                          className="mt-1 inline-flex items-center gap-1 font-sans text-xs text-gold/60 transition-colors duration-300 hover:text-gold"
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
                <div className="overflow-hidden border border-gold/15">
                  <iframe
                    title="Blackhorn Wealth Management Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.9577726284513!2d114.15953477596484!3d22.28080474399783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404007b04e4e8e7%3A0x65b0ffe588e2a5!2sBank%20of%20America%20Tower!5e0!3m2!1sen!2shk!4v1700000000000!5m2!1sen!2shk"
                    width="100%"
                    height="280"
                    style={{
                      border: 0,
                      filter:
                        'grayscale(100%) brightness(0.4) contrast(1.2)',
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
                <div className="border border-gold/8 bg-dark-card p-8">
                  <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold">
                    Connect with Us
                  </h3>
                  <div className="mt-5">
                    <a
                      href={SITE_CONFIG.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                    >
                      <Linkedin className="h-4 w-4 text-gold/50 transition-colors duration-300 group-hover:text-gold" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
