import type { Metadata } from 'next'
import ServicePageLayout from '@/components/services/ServicePageLayout'

export const metadata: Metadata = {
  title: 'Deal Sourcing | Blackhorn Wealth Management',
  description:
    'Exclusive network and capabilities to access proprietary investments across private equity, venture capital, and niche sectors from Blackhorn in Hong Kong.',
}

export default function InvestmentAdvisoryPage() {
  return (
    <ServicePageLayout
      title="Deal Sourcing"
      overline="Our Services"
      subtitle="Blackhorn Wealth Management has an exclusive network and deal sourcing capabilities to access unique proprietary investments."
      currentSlug="investment-advisory"
    >
      <p>
        Our close ties with some of the best-in-class private equity funds and
        their limited partners give us an edge in accessing loan investment and
        private equity deals across markets and industries, even within niche
        sectors like fintech start-ups. The deals are typically structured in a
        way that will generate cash returns with appropriate downside
        protection.
      </p>

      {/* Key highlights */}
      <div className="my-8 border-l-2 border-gold-dark/40 pl-6">
        <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
          Our Edge
        </h3>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
            <span>Exclusive access to proprietary deal flow</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
            <span>Deep PE fund and limited partner relationships</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
            <span>Cross-market and cross-industry coverage including niche sectors</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
            <span>Cash return focus with structured downside protection</span>
          </li>
        </ul>
      </div>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Rigorous Due Diligence
      </h2>
      <p>
        Every opportunity undergoes a rigorous due diligence process before
        presentation to clients. We evaluate track record, alignment of
        interests, fee structures, and downside protections to ensure that
        each recommendation meets our exacting standards.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Alternative Investments
      </h2>
      <p>
        For clients seeking diversification beyond traditional asset classes,
        we provide access to private equity, venture capital, hedge funds,
        real assets, and structured credit. We work with clients to determine
        the appropriate allocation based on their liquidity requirements, time
        horizon, and risk tolerance.
      </p>
    </ServicePageLayout>
  )
}
