import type { Metadata } from 'next'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Important Notice — Beware of Scams | Blackhorn Wealth Management',
  description:
    'Blackhorn Wealth Management warns clients and investors to stay vigilant against fraudsters impersonating our firm. Verify all communications through our official channels.',
  openGraph: {
    title: 'Important Notice — Beware of Scams | Blackhorn Wealth Management',
    description:
      'Blackhorn Wealth Management warns clients and investors to stay vigilant against fraudsters impersonating our firm.',
  },
}

export default function ImportantNoticePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Important Notice', href: '/important-notice' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-gold/20">
                  <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="font-sans text-xs uppercase tracking-widest text-gold">
                  Important Notice
                </p>
              </div>
              <h1 className="font-serif text-3xl font-light text-light md:text-4xl lg:text-5xl">
                Beware of Scams Impersonating{' '}
                <span className="italic text-gold">Blackhorn</span>
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* Content */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              <div className="space-y-6 font-sans text-base font-light leading-[1.85] text-muted">
                <p>Dear Clients &amp; Investors,</p>

                <p>
                  Blackhorn Wealth Management Limited (&ldquo;Blackhorn&rdquo;) has recently
                  received a number of enquiries concerning suspected scams involving
                  fraudsters impersonating Blackhorn to engage in fraudulent activities,
                  with the intention of illegally deceiving clients and obtaining
                  financial gains through the trust placed in Blackhorn. The forms of
                  impersonation include but are not limited to:
                </p>

                <ol className="list-[lower-roman] space-y-3 pl-6">
                  <li>imitating Blackhorn&apos;s domain name or creating counterfeit Blackhorn websites;</li>
                  <li>impersonating Blackhorn employees to induce clients to transfer money to their bank accounts for investment and/or completing their forged investment forms to obtain personal details, etc.</li>
                </ol>

                <p>
                  Blackhorn hereby reminds all clients and investors to pay attention
                  and stay vigilant against deception.
                </p>

                <p>
                  It is hereby specifically stated that Blackhorn&apos;s official website is{' '}
                  <a href="https://www.blackhorngrp.com/" className="text-gold transition-colors duration-300 hover:underline">
                    https://www.blackhorngrp.com/
                  </a>
                  . If any person attempts to claim himself/herself as a staff of
                  Blackhorn and requests for your personal data and/or your bank
                  information whilst inducing you to invest in any investment product
                  and/or transfer money for the investment, stay vigilant and verify
                  his/her identity by contacting us if you are in doubt. You may also
                  report the suspected crime/scam activities to the local law enforcement
                  authorities. Blackhorn reserves the right to discharge its
                  responsibilities through legal means when fraudulent activities are
                  identified.
                </p>

                <p>
                  Should you have any questions, please contact us at{' '}
                  <a href="tel:+85227091388" className="text-gold transition-colors duration-300 hover:underline">(852) 2709 1388</a>
                  {' '}or email to{' '}
                  <a href="mailto:info@blackhorngrp.com" className="text-gold transition-colors duration-300 hover:underline">
                    info@blackhorngrp.com
                  </a>.
                </p>

                <div className="mt-8 border-t border-gold/10 pt-8">
                  <p className="text-sm text-muted/60">
                    Blackhorn Wealth Management Limited
                    <br />
                    31 May 2024
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA />
      </main>
    </>
  )
}
