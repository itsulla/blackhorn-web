import type { Metadata } from 'next'
import ServicePageLayout from '@/components/services/ServicePageLayout'

export const metadata: Metadata = {
  title: 'Investment Advisory | Blackhorn Wealth Management',
  description:
    'Curated access to global markets, private equity, real estate, and alternative investments through Blackhorn Wealth Management.',
}

export default function InvestmentAdvisoryPage() {
  return (
    <ServicePageLayout
      title="Investment Advisory"
      overline="Our Services"
      subtitle="Institutional-grade research and curated access to opportunities across public markets, private equity, real estate, and alternatives."
      currentSlug="investment-advisory"
    >
      <h2 className="font-serif text-2xl font-light text-light">
        Curated Market Access
      </h2>
      <p>
        Our investment advisory team provides access to a carefully vetted
        universe of global investment opportunities. Leveraging deep
        relationships with leading fund managers, co-investment partners, and
        deal originators, we source opportunities that are typically
        unavailable to individual investors.
      </p>
      <p>
        Every opportunity undergoes a rigorous due diligence process before
        presentation to clients. We evaluate track record, alignment of
        interests, fee structures, and downside protections to ensure that
        each recommendation meets our exacting standards.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Alternative Investments
      </h2>
      <p>
        For clients seeking diversification beyond traditional asset classes,
        we provide access to private equity, venture capital, hedge funds,
        real assets, and structured credit. Our alternatives programme is
        designed to enhance portfolio returns while reducing correlation to
        public markets.
      </p>
      <p>
        We work with clients to determine the appropriate allocation to
        alternatives based on their liquidity requirements, time horizon,
        and risk tolerance — ensuring that illiquidity premiums are
        appropriately compensated.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Research & Insight
      </h2>
      <p>
        Our proprietary research capabilities span macroeconomic analysis,
        sector-specific deep dives, and thematic investment research. Clients
        receive regular market commentary and bespoke investment memoranda
        tailored to their areas of interest and portfolio positioning.
      </p>
    </ServicePageLayout>
  )
}
