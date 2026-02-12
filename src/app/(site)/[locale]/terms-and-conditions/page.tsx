import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Blackhorn Wealth Management',
  description:
    'Terms and conditions for using the Blackhorn Wealth Management website.',
}

export default function TermsAndConditionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Terms & Conditions', href: '/terms-and-conditions' },
        ]}
      />
      <main className="min-h-screen bg-dark pb-24 pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <p className="font-sans text-xs uppercase tracking-widest text-gold">
              Legal
            </p>
            <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl">
              Terms &amp; Conditions
            </h1>
            <div className="mt-2 h-px w-16 bg-gold/40" />
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-16 space-y-8 font-sans text-sm leading-[1.85] text-muted">
              <p>
                The use of the{' '}
                <a
                  href="https://www.blackhorngrp.com"
                  className="text-gold transition-colors duration-300 hover:text-gold-light"
                >
                  www.blackhorngrp.com
                </a>{' '}
                website (the &ldquo;website&rdquo;), requires the following
                terms and conditions to be fully accepted without reservation on
                your part.
              </p>

              <p>
                Under no circumstance should any material on the website be used
                or considered as an offer to sell or a solicitation of an offer
                to financially participate in any investment products sponsored
                or managed by Blackhorn&apos;s associates. The information
                published on this website is therefore for general information
                purpose only. The material on the website is provided in good
                faith and has been derived from sources believed to be reliable
                and accurate at the time of publication. However, we make no
                guarantees (implied or expressed) regarding the completeness,
                reliability, suitability, availability, correctness of the
                material provided. In addition, Blackhorn Wealth Management
                Limited may not, and has no obligation to, update the material on
                the website or correct any inaccuracy which subsequently becomes
                apparent. Furthermore, any subsequent changes on the website may
                be changed or withdrawn without notice. Any reliance on such
                information is therefore strictly at your own risk.
              </p>

              <p>
                The website may contain links or hyperlinks that will connect you
                to a third-party website, which Blackhorn Wealth Management
                Limited does not control. The information from these third-party
                websites is for reference only. As such, any views expressed or
                implied within these third-party websites does not represent the
                view of Blackhorn Wealth Management Limited.
              </p>

              <p>
                All personal information provided via this website will be
                considered strictly confidential, and we shall only use this
                information for internal purposes while ensuring compliance with
                our regulatory obligations. The content of this website is the
                sole property of Blackhorn Wealth Management Limited. By using
                this website, you agree not to copy, duplicate, store,
                reproduce, retransmit, distribute, disseminate, sell, publish,
                broadcast or circulate the contents of the website, directly or
                indirectly, to anyone for any purpose without our prior written
                consent.
              </p>

              <p>
                Under no circumstance shall Blackhorn Wealth Management Limited,
                its partners or its directors or employees be liable for any
                claims, liabilities, losses or any other damages arising out of
                or in any way relating to 1) any direct and indirect usage of the
                information provided on the website, or 2) any difficulties in
                accessing the website, or 3) any information extracted from
                third-party websites from links published on the website.
              </p>

              <p className="mt-4 text-xs italic text-white/40">
                By continuing to use this website, you acknowledge that you have
                read, understood, and agree to these terms and conditions.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
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
