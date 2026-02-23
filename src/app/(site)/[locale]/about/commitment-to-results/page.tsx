import type { Metadata } from 'next'
import AboutPageLayout from '@/components/about/AboutPageLayout'

export const metadata: Metadata = {
  title: 'Commitment to Results | Blackhorn Wealth Management',
  description:
    'Institutional services delivered on a personalized level — resilient and sustainable results tailored to your goals.',
}

export default function CommitmentToResultsPage() {
  return (
    <AboutPageLayout
      title="Commitment to Results"
      overline="About Blackhorn"
      subtitle="We offer institutional services on a personalized level. Our advisors are committed to deliver resilient and sustainable long-term results."
      currentSlug="commitment-to-results"
    >
      <p>
        At Blackhorn, results are measured not just by portfolio returns, but by
        the degree to which we help clients achieve their broader financial
        objectives — across generations and jurisdictions. Every recommendation
        we make is tailored to you and your family&apos;s goals.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Institutional Rigour, Personal Touch
      </h2>
      <p>
        Our team applies the same analytical frameworks and due diligence
        standards used by the world&apos;s leading institutional investors. Yet
        every client relationship is deeply personal. You will have direct
        access to senior advisors who understand your situation in detail and
        are accountable for the outcomes we deliver.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Sustainable Long-Term Performance
      </h2>
      <p>
        We focus on generating consistent, risk-adjusted returns that compound
        over time. Our investment committee meets regularly to review portfolio
        positioning, evaluate emerging opportunities, and stress-test strategies
        against evolving market conditions.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Transparency and Accountability
      </h2>
      <p>
        Clients receive comprehensive performance reporting and regular
        portfolio reviews. We believe in complete transparency regarding fees,
        risks, and investment rationale. Our advisors are always available to
        discuss portfolio strategy and address any concerns.
      </p>
    </AboutPageLayout>
  )
}
