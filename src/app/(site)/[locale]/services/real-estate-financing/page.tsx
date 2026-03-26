import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import { PortableTextBlock } from '@portabletext/react'
import ServicePageLayout from '@/components/services/ServicePageLayout'
import ServicePortableText from '@/components/services/ServicePortableText'
import { fetchServiceBySlug } from '@/lib/sanity/fetch'
import { localized, localizedBlocks } from '@/lib/i18n-utils'

export const metadata: Metadata = {
  title: 'Real Estate & Financing | Blackhorn Wealth Management',
  description:
    'Structural financing and mortgages for real estate transactions, plus bespoke financing for illiquid or unique assets from Blackhorn in Hong Kong.',
}

export default async function RealEstateFinancingPage() {
  const locale = await getLocale()
  const service = await fetchServiceBySlug('real-estate-financing')

  const richContent = localizedBlocks(service, 'content', locale) as
    | PortableTextBlock[]
    | undefined

  return (
    <ServicePageLayout
      title={localized(service, 'title', locale) || 'Real Estate & Financing'}
      overline="Our Services"
      subtitle={localized(service, 'shortDescription', locale) || 'Comprehensive real estate advisory and bespoke financing solutions designed to maximise value across property transactions and illiquid assets.'}
      currentSlug="real-estate-financing"
    >
      {richContent ? (
        <ServicePortableText value={richContent} />
      ) : (
        <>
          <h2 className="font-serif text-2xl font-light text-light-text">
            Real Estate
          </h2>
          <p>
            Blackhorn Wealth Management can help you secure structural financing
            and mortgages for real estate transactions in a variety of currencies
            and loan terms.
          </p>
          <p>
            We work across residential, commercial, and mixed-use sectors in key
            Asia-Pacific markets. Leveraging deep relationships with developers,
            financial institutions, and professional service providers, we help
            clients identify and execute on high-quality real estate opportunities
            that align with their broader wealth strategy.
          </p>

          <h2 className="pt-4 font-serif text-2xl font-light text-light-text">
            Financing
          </h2>
          <p>
            Our financing services are uniquely designed to assist you to operate
            efficiently and address competitive challenges while maximizing your
            profit potential. We can also help with sourcing financing for illiquid
            or unique assets and even help with lowering financing costs on
            existing loans.
          </p>
          <p>
            Our financing capabilities extend beyond traditional real estate. We
            assist clients with asset-backed lending against illiquid holdings such
            as art collections, private company shares, and other unique assets —
            unlocking liquidity without requiring disposal.
          </p>

          <h2 className="pt-4 font-serif text-2xl font-light text-light-text">
            Cross-Border Transactions
          </h2>
          <p>
            For clients with property interests across multiple jurisdictions, we
            provide guidance on cross-border structuring, tax implications, and
            regulatory considerations. Our experience spans Hong Kong, Greater
            China, Southeast Asia, and key global markets including the UK,
            Australia, and North America.
          </p>
        </>
      )}
    </ServicePageLayout>
  )
}
