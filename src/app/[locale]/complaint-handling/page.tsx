import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Complaint Handling | Blackhorn Wealth Management',
  description:
    'Blackhorn Wealth Management complaint handling procedures. Contact our compliance team for any concerns.',
}

export default function ComplaintHandlingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Complaint Handling', href: '/complaint-handling' },
        ]}
      />
      <main className="min-h-screen bg-dark pb-24 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="font-sans text-xs uppercase tracking-widest text-gold">
              Legal
            </p>
            <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl">
              Complaint Handling
            </h1>
            <div className="mt-2 h-px w-16 bg-gold/40" />
          </FadeIn>

          {/* Contact details card */}
          <FadeIn delay={0.15}>
            <div className="mt-12 border border-gold/10 bg-dark-card p-8">
              <h2 className="font-sans text-[11px] uppercase tracking-widest text-gold">
                Compliance Contact
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 font-sans text-xs font-medium uppercase tracking-wide text-light/50">
                    Hotline
                  </span>
                  <a
                    href="tel:+85227091568"
                    className="font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                  >
                    (852) 2709 1568
                  </a>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 font-sans text-xs font-medium uppercase tracking-wide text-light/50">
                    Address
                  </span>
                  <p className="font-sans text-sm leading-relaxed text-muted">
                    Room 705-708, 7/F, Bank of America Tower, 12 Harcourt Road,
                    Central, Hong Kong
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 font-sans text-xs font-medium uppercase tracking-wide text-light/50">
                    Email
                  </span>
                  <a
                    href="mailto:compliance@blackhorngrp.com"
                    className="font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                  >
                    compliance@blackhorngrp.com
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Note section */}
          <FadeIn delay={0.25}>
            <div className="mt-12 space-y-8 font-sans text-sm leading-[1.85] text-muted">
              <p>
                Upon the receipt of your complaint, we will issue an
                acknowledgement to you within 7 working days. We will undertake
                an initial assessment of the complaint and we may seek
                clarification from you to assist us in resolving it.
              </p>
              <p>
                Once the investigation is completed, a final response will be
                issued to you with our explanation and/or our appropriate action.
                Under normal circumstances, we endeavour to resolve the
                complaint at the earliest possible time or up to 2 months to
                resolve it.
              </p>
              <p>
                Depending on the complexity of the complaint or if there are
                exceptional circumstances that are beyond our control, there is a
                possibility that the assessment and investigation time may take
                longer. We will keep you updated on the status of the complaint.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.35}>
            <div className="mt-16 border-t border-gold/10 pt-8">
              <Link
                href="/"
                className="font-sans text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-gold"
              >
                &larr; Back to Home
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>
    </>
  )
}
