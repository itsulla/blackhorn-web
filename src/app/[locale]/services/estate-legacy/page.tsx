import type { Metadata } from 'next'
import ServicePageLayout from '@/components/services/ServicePageLayout'

export const metadata: Metadata = {
  title: 'Legacy Planning | Blackhorn Wealth Management',
  description:
    'Enabling clients and beneficiaries to obtain maximum value through wealth transfer across multiple generations and jurisdictions.',
}

export default function EstateLegacyPage() {
  return (
    <ServicePageLayout
      title="Legacy Planning"
      overline="Our Services"
      subtitle="Enabling clients and beneficiaries to obtain maximum value through wealth transfer across multiple generations and jurisdictions."
      currentSlug="estate-legacy"
    >
      <h2 className="font-serif text-2xl font-light text-light">
        Wealth Transfer Structuring
      </h2>
      <p>
        Effective wealth transfer requires careful coordination of legal,
        tax, and financial strategies across jurisdictions. We work with
        families to design structures — including trusts, foundations, and
        holding companies — that facilitate orderly and tax-efficient wealth
        transition while preserving family control and flexibility.
      </p>
      <p>
        Our advisors collaborate with your existing legal and tax
        professionals to ensure that all structures are compliant,
        appropriately documented, and aligned with your family&apos;s
        long-term vision.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Philanthropic Planning
      </h2>
      <p>
        For families seeking to create lasting social impact, we provide
        guidance on establishing and managing philanthropic vehicles —
        from donor-advised funds and private foundations to impact investment
        programmes. We help articulate your philanthropic mission and develop
        a giving strategy that reflects your values.
      </p>
      <p>
        Our approach integrates philanthropic planning with broader estate
        and investment strategies, ensuring that charitable objectives
        complement rather than conflict with family financial goals.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Legacy Documentation
      </h2>
      <p>
        Beyond financial structures, legacy planning encompasses the
        preservation of family values, stories, and guiding principles. We
        facilitate the creation of legacy documents — including ethical
        wills, family mission statements, and governance charters — that
        communicate your family&apos;s ethos to future generations.
      </p>
    </ServicePageLayout>
  )
}
