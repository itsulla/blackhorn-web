import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'

export const metadata: Metadata = {
  title: 'Disclaimer | Blackhorn Wealth Management',
  description:
    'Important legal disclaimers and terms of use for Blackhorn Wealth Management.',
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-dark pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <p className="font-sans text-xs uppercase tracking-widest text-gold">
            Legal
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl">
            Disclaimer
          </h1>
          <div className="mt-2 h-px w-16 bg-gold/40" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-16 space-y-8 font-sans text-sm leading-[1.85] text-muted">
            <p>
              This website is published by Blackhorn Wealth Management Limited
              (&ldquo;Blackhorn&rdquo;), a corporation licensed and regulated
              by the Securities and Futures Commission of Hong Kong (CE
              Number: BNM924) for Type 4 (Advising on Securities) and Type 9
              (Asset Management) regulated activities. Information contained
              in this website is intended for Hong Kong residents only. It
              shall not be regarded as an offer, solicitation, invitation,
              advertisement, inducement, recommendation, or representation of
              any kind or form whatsoever. Persons accessing this website are
              required to inform themselves and to comply with any restriction
              or regulation in any jurisdiction.
            </p>

            <p>
              All information contained within this website is confidential and
              proprietary and is the property of Blackhorn. All intellectual
              property rights relating to the information contained in this
              website, including without limitation all copyright and
              trademarks, are the property of Blackhorn. No reproduction,
              transmission, or distribution of any part of this website is
              permitted without the prior written consent of Blackhorn.
            </p>

            <p>
              Blackhorn does not accept any liability for the accuracy,
              timeliness, completeness, reliability, performance, or fitness
              for any particular purpose of the information contained in this
              website, or for any loss arising from any use of or reliance on
              information contained in this website. Investment involves risks.
              Past performance is not indicative of future performance. The
              value of investments and the income from them can go down as well
              as up.
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
  )
}
