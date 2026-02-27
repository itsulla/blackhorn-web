import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutPageLayout from '@/components/about/AboutPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('commitmentTitle'),
    description: t('commitmentDescription'),
  }
}

export default async function CommitmentToResultsPage() {
  const t = await getTranslations('commitment')
  return (
    <AboutPageLayout
      title={t('title')}
      overline={t('overline')}
      subtitle={t('subtitle')}
      currentSlug="commitment-to-results"
    >
      <p>
        {t('intro')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('institutionalRigour')}
      </h2>
      <p>
        {t('institutionalRigourDesc')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('sustainablePerformance')}
      </h2>
      <p>
        {t('sustainablePerformanceDesc')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('transparency')}
      </h2>
      <p>
        {t('transparencyDesc')}
      </p>
    </AboutPageLayout>
  )
}
