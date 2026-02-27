import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutPageLayout from '@/components/about/AboutPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('expertiseTitle'),
    description: t('expertiseDescription'),
  }
}

export default async function OurExpertisePage() {
  const t = await getTranslations('expertise')
  return (
    <AboutPageLayout
      title={t('title')}
      overline={t('overline')}
      subtitle={t('subtitle')}
      currentSlug="our-expertise"
    >
      <p>
        {t('intro')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('investmentCapabilities')}
      </h2>
      <p>
        {t('investmentCapabilitiesDesc')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('structuredProducts')}
      </h2>
      <p>
        {t('structuredProductsDesc')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('diverseTeam')}
      </h2>
      <p>
        {t('diverseTeamDesc')}
      </p>
    </AboutPageLayout>
  )
}
