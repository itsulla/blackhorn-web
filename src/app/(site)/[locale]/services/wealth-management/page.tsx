import type { Metadata } from 'next'
import ServicePageLayout from '@/components/services/ServicePageLayout'

export const metadata: Metadata = {
  title: 'Portfolio Management | Blackhorn Wealth Management',
  description:
    'Strategic partnerships with 11 major international private banks. Institutional-grade research and portfolio management from Blackhorn in Hong Kong.',
}

export default function WealthManagementPage() {
  return (
    <ServicePageLayout
      title="Portfolio Management"
      overline="Our Services"
      subtitle="We have strategic partnerships with 11 major international private banks, where our firm is an approved asset manager on their platforms."
      currentSlug="wealth-management"
    >
      <p>
        Our team of experienced professionals combines a deep understanding of
        the market with institutional-grade research to deliver unique,
        unbiased, and actionable insights to our clients. By acting as a
        gatekeeper across all aspects of the investment cycle, we are able to
        deliver a total solution to our clients.
      </p>
      <p>
        Our advisors will guide your portfolio from investment analysis to risk
        assessment, position monitoring, and execution.
      </p>

      {/* Key highlights */}
      <div className="my-8 border-l-2 border-gold-dark/40 pl-6">
        <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
          Key Capabilities
        </h3>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
            <span>Strategic partnerships with 11 international private banks</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
            <span>Approved asset manager on all platforms</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
            <span>
              Full investment cycle coverage: analysis &rarr; risk assessment
              &rarr; monitoring &rarr; execution
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
            <span>Institutional-grade research with unbiased insights</span>
          </li>
        </ul>
      </div>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        A Total Solution
      </h2>
      <p>
        We believe that disciplined portfolio construction, combined with
        continuous monitoring and tactical adjustments, is the foundation of
        long-term wealth preservation. Our investment committee meets regularly
        to review market conditions and evaluate positioning across all client
        portfolios.
      </p>
      <p>
        No two clients are alike, and our strategies reflect this. Whether your
        priority is capital growth, income generation, or wealth preservation,
        we tailor every recommendation to your specific circumstances —
        including tax considerations, liquidity requirements, and generational
        planning needs.
      </p>
    </ServicePageLayout>
  )
}
