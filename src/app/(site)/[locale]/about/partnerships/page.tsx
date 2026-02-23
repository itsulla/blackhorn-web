import type { Metadata } from 'next'
import AboutPageLayout from '@/components/about/AboutPageLayout'

export const metadata: Metadata = {
  title: 'Our Partnerships | Blackhorn Wealth Management',
  description:
    'Strategic partnerships with 11 major international private banks, giving clients access to a diverse array of products under one roof.',
}

export default function PartnershipsPage() {
  return (
    <AboutPageLayout
      title="Our Partnerships"
      overline="About Blackhorn"
      subtitle="As an external asset manager, we partner with the most reputable private banks. These trusted partnerships ensure that clients gain access to a diverse array of products and services."
      currentSlug="partnerships"
    >
      <p>
        Our advisors are able to manage portfolios across platforms to
        consolidate assets all under one roof. This multi-bank model gives
        clients the flexibility to access best-in-class products from each
        institution while maintaining a single point of contact.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Our Banking Partners
      </h2>
      <p>
        Blackhorn maintains strategic partnerships with 11 major international
        private banks, where our firm is an approved asset manager on their
        platforms. Our partners include leading global institutions across
        Europe, Asia, and North America.
      </p>

      {/* Partner list */}
      <div className="my-8 border-l-2 border-gold-dark/40 pl-6">
        <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
          Banking Partners
        </h3>
        <ul className="mt-4 space-y-3">
          {[
            'UBS',
            'BNP Paribas',
            'Credit Suisse',
            'Julius Baer',
            'DBS',
            'Bank of Singapore',
            'EFG International',
            'VP Bank',
            'Morgan Stanley',
            'HSBC Private Banking',
            'Standard Chartered',
          ].map((bank) => (
            <li key={bank} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
              <span>{bank}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        The External Asset Manager Model
      </h2>
      <p>
        As an independent external asset manager (EAM), Blackhorn operates free
        from the conflicts of interest inherent in traditional private banking.
        We are not tied to any single institution&apos;s product shelf. Instead,
        we select the best solutions from across our banking partners based
        solely on our clients&apos; interests.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Portfolio Consolidation
      </h2>
      <p>
        Many high-net-worth families hold assets across multiple banks and
        jurisdictions. Our multi-platform capability enables us to provide a
        unified view of your entire wealth — consolidating reporting, risk
        analysis, and performance tracking across all custodians.
      </p>
    </AboutPageLayout>
  )
}
