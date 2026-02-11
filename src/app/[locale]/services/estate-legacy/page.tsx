import type { Metadata } from 'next'
import Link from 'next/link'
import ServicePageLayout from '@/components/services/ServicePageLayout'

export const metadata: Metadata = {
  title: 'Legacy Planning | Blackhorn Wealth Management',
  description:
    'Proper portfolio and legacy planning enables clients and beneficiaries to obtain maximum value through wealth transfer across multiple generations and jurisdictions.',
}

export default function EstateLegacyPage() {
  return (
    <ServicePageLayout
      title="Legacy Planning"
      overline="Our Services"
      subtitle="Proper portfolio and legacy planning enables our clients and their beneficiaries to obtain maximum value through wealth transfer."
      currentSlug="estate-legacy"
    >
      <p>
        Our professionals have access to a comprehensive set of tools to
        deliver meaningful results across multiple generations and
        jurisdictions.
      </p>
      <p>
        Effective wealth transfer requires careful coordination of legal,
        tax, and financial strategies. We work with families to design
        structures — including trusts, foundations, and holding companies —
        that facilitate orderly and tax-efficient wealth transition while
        preserving family control and flexibility.
      </p>

      <h2 className="font-serif text-2xl font-light text-light pt-4">
        Cross-Jurisdictional Planning
      </h2>
      <p>
        For families with assets and beneficiaries across multiple
        jurisdictions, we coordinate with local legal and tax advisors to
        ensure that legacy plans are compliant, appropriately documented, and
        aligned with your family&apos;s long-term vision in each relevant
        territory.
      </p>

      {/* CTA callout */}
      {/* TODO: More detailed legacy planning content needed from Blackhorn */}
      <div className="my-8 border border-gold/15 bg-gold/[0.03] p-8 text-center">
        <p className="font-serif text-lg font-light text-light">
          Every family&apos;s legacy is unique.
        </p>
        <p className="mt-3 font-sans text-sm text-muted">
          Contact us to discuss how we can structure a legacy plan tailored to
          your family&apos;s specific needs and objectives.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center justify-center bg-gold px-8 py-3 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
        >
          Discuss Your Legacy Plan
        </Link>
      </div>
    </ServicePageLayout>
  )
}
