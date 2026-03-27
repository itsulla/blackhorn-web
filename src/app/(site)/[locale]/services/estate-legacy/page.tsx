import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import { PortableTextBlock } from '@portabletext/react'
import ServicePageLayout from '@/components/services/ServicePageLayout'
import ServicePortableText from '@/components/services/ServicePortableText'
import { fetchServiceBySlug, fetchSiteSettings, getHeroImage } from '@/lib/sanity/fetch'
import { localized, localizedBlocks } from '@/lib/i18n-utils'

export const metadata: Metadata = {
  title: 'Legacy Planning | Blackhorn Wealth Management',
  description:
    'Proper portfolio and legacy planning enables clients and beneficiaries to obtain maximum value through wealth transfer across multiple generations and jurisdictions.',
}

export default async function EstateLegacyPage() {
  const locale = await getLocale()
  const settings = await fetchSiteSettings()
  const heroImage = getHeroImage(settings, 'services-estate-legacy')
  const service = await fetchServiceBySlug('estate-legacy')

  const richContent = localizedBlocks(service, 'content', locale) as
    | PortableTextBlock[]
    | undefined

  // Build accordion items from CMS features
  const cmsFeatures =
    locale === 'zh-hant' && service?.features_zh?.length
      ? service.features_zh
      : service?.features?.length
        ? service.features
        : null

  const accordionItems = cmsFeatures
    ? cmsFeatures.map((f: { title: string; description: string }) => ({ title: f.title, content: f.description }))
    : undefined

  // Infographic
  const infographicLabel =
    locale === 'zh-hant' && service?.infographicLabel_zh
      ? service.infographicLabel_zh
      : service?.infographicLabel
  const infographicUrl = service?.infographicUrl
  const infographicAlt = service?.infographicAlt

  return (
    <ServicePageLayout
      title={localized(service, 'title', locale) || 'Legacy Planning'}
      overline="Our Services"
      subtitle={localized(service, 'shortDescription', locale) || 'Proper portfolio and legacy planning enables our clients and their beneficiaries to obtain maximum value through wealth transfer.'}
      currentSlug="estate-legacy"
      heroImageSrc={heroImage?.src}
      accordionItems={accordionItems}
      infographicUrl={infographicUrl}
      infographicLabel={infographicLabel}
      infographicAlt={infographicAlt}
      infographicSize={service?.infographicSize}
    >
      {richContent ? (
        <ServicePortableText value={richContent} />
      ) : (
        <>
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

          <h2 className="pt-4 font-serif text-2xl font-light text-light-text">
            Cross-Jurisdictional Planning
          </h2>
          <p>
            For families with assets and beneficiaries across multiple
            jurisdictions, we coordinate with local legal and tax advisors to
            ensure that legacy plans are compliant, appropriately documented, and
            aligned with your family&apos;s long-term vision in each relevant
            territory.
          </p>

          <div className="my-8 border border-gold-dark/20 bg-gold/[0.04] p-8 text-center">
            <p className="font-serif text-lg font-light text-light-text">
              Every family&apos;s legacy is unique.
            </p>
            <p className="mt-3 font-sans text-sm text-light-text-secondary">
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
        </>
      )}
    </ServicePageLayout>
  )
}
