import Image from 'next/image'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import AboutSectionNav from '@/components/about/AboutSectionNav'
import { fetchSiteSettings, getHeroImage } from '@/lib/sanity/fetch'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about')
  return {
    title: `${t('locationTitle')} | Blackhorn Wealth Management`,
    description: t('locationAddress'),
  }
}

export default async function OurLocationPage() {
  const t = await getTranslations('about')
  const tc = await getTranslations('common')
  const settings = await fetchSiteSettings()
  const heroImage = getHeroImage(settings, 'about-our-location')


  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), href: '/' },
          { name: t('heroLabel'), href: '/about' },
          { name: t('locationTitle'), href: '/about/our-location' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="relative border-b border-gold/6 pb-16 pt-32">
          <Image
            src={heroImage?.src ?? "/images/redesign/about-our-location-contact.png"}
            alt={t('locationTitle')}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <FadeIn>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-peach text-shadow-hero">
                {t('heroLabel')}
              </p>
              <h1 className="mt-4 font-serif text-4xl font-light text-light text-shadow-hero md:text-5xl lg:text-6xl">
                {t('locationTitle')}
              </h1>
              <div className="mt-6 h-[0.5px] w-10 bg-gold" />
            </FadeIn>
          </div>
        </section>

        {/* ─── Section Menu Bar ──────────────────────────────────────── */}
        <AboutSectionNav />

        {/* Location content */}
        <section className="bg-brand-offwhite py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
            {/* Map */}
            <FadeIn>
              <div className="aspect-[4/3] overflow-hidden border border-light-border bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8!2d114.16!3d22.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404007b8c34c5d1%3A0x0!2sBank+of+America+Tower%2C+Central%2C+Hong+Kong!5e0!3m2!1sen!2shk!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(20%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('locationTitle')}
                />
              </div>
            </FadeIn>

            {/* Contact details */}
            <FadeIn delay={0.15}>
              <div className="space-y-8">
                {/* Address */}
                <div>
                  <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                    {tc('address')}
                  </h2>
                  <p className="mt-3 font-serif text-lg font-light text-light-text">
                    Blackhorn Wealth Management Limited
                  </p>
                  <p className="mt-2 font-sans text-sm font-light leading-relaxed text-light-text-secondary">
                    {t('locationAddress')}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                    {tc('phone')}
                  </h2>
                  <a
                    href="tel:+85227091388"
                    className="mt-3 block font-sans text-sm text-light-text transition-colors hover:text-gold-dark"
                  >
                    (852) 2709 1388
                  </a>
                </div>

                {/* Email */}
                <div>
                  <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                    {tc('email')}
                  </h2>
                  <a
                    href="mailto:info@blackhorngrp.com"
                    className="mt-3 block font-sans text-sm text-light-text transition-colors hover:text-gold-dark"
                  >
                    info@blackhorngrp.com
                  </a>
                </div>

                {/* Office hours */}
                <div>
                  <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
                    {tc('office')}
                  </h2>
                  <p className="mt-3 font-sans text-sm font-light text-light-text-secondary">
                    {t('locationOfficeHours')}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  )
}
