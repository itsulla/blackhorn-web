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
      subtitle="Strategic partnerships with 11 major international private banks. Institutional-grade research delivering unique, unbiased, and actionable insights from investment analysis to execution."
      currentSlug="wealth-management"
    >
      <h2 className="font-serif text-2xl font-light text-light">
        Comprehensive Portfolio Management
      </h2>
      <p>
        Our wealth management practice begins with a deep understanding of your
        financial landscape. We construct diversified portfolios across asset
        classes and geographies, balancing growth objectives against downside
        protection. Every allocation decision is informed by rigorous
        quantitative analysis and macroeconomic insight.
      </p>
      <p>
        We believe that disciplined portfolio construction, combined with
        continuous monitoring and tactical adjustments, is the foundation of
        long-term wealth preservation. Our investment committee meets regularly
        to review market conditions and evaluate positioning across all client
        portfolios.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Risk Management
      </h2>
      <p>
        Risk management is embedded in every aspect of our process — from
        initial asset allocation through to ongoing monitoring. We employ
        sophisticated risk analytics to identify concentration risk, liquidity
        exposure, and correlation dynamics within your portfolio.
      </p>
      <p>
        Our approach is designed to weather market volatility while maintaining
        alignment with your long-term objectives. We stress-test portfolios
        against historical and hypothetical scenarios to ensure resilience
        across a range of market environments.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Personalised Strategy
      </h2>
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
