import type { Metadata } from 'next'
import ServicePageLayout from '@/components/services/ServicePageLayout'

export const metadata: Metadata = {
  title: 'Family Office Services | Blackhorn Wealth Management',
  description:
    'Multigenerational wealth governance, succession planning, and bespoke concierge services for prominent families in Asia.',
}

export default function FamilyOfficePage() {
  return (
    <ServicePageLayout
      title="Family Office Services"
      overline="Our Services"
      subtitle="Holistic governance and advisory for families seeking to preserve wealth, values, and legacy across generations."
      currentSlug="family-office"
    >
      <h2 className="font-serif text-2xl font-light text-light">
        Multigenerational Governance
      </h2>
      <p>
        Sustaining family wealth across generations requires more than
        financial expertise — it demands a framework for decision-making,
        communication, and education. We work closely with family principals
        to establish governance structures that promote alignment, transparency,
        and continuity.
      </p>
      <p>
        From family constitutions and investment policy statements to regular
        family assemblies and next-generation education programmes, our
        governance advisory is designed to evolve alongside your family.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Succession Planning
      </h2>
      <p>
        Effective succession planning safeguards both financial assets and
        family harmony. We facilitate structured conversations about leadership
        transition, wealth distribution, and philanthropic intent — helping
        families navigate complex dynamics with clarity and purpose.
      </p>
      <p>
        Our advisors coordinate with your legal and tax counsel to ensure that
        succession plans are technically sound and emotionally considered,
        respecting the unique circumstances of each family.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Concierge & Lifestyle Services
      </h2>
      <p>
        Beyond financial advisory, we provide a curated range of lifestyle
        and concierge services — from property acquisition and art advisory to
        education planning and travel coordination. Every aspect of your
        family&apos;s life receives the same level of attention and care that
        we apply to your investments.
      </p>
    </ServicePageLayout>
  )
}
