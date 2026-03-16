import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutPageLayout from '@/components/about/AboutPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('philosophyTitle'),
    description: t('philosophyDescription'),
  }
}

export default async function OurPhilosophyPage() {
  const t = await getTranslations('philosophy')
  return (
    <AboutPageLayout
      title={t('title')}
      overline={t('overline')}
      subtitle={t('subtitle')}
      currentSlug="our-philosophy"
    >
      <p>
        {t('intro')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('longTermView')}
      </h2>
      <p>
        {t('longTermViewDesc')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('downsideProtection')}
      </h2>
      <p>
        {t('downsideProtectionDesc')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('beyondTraditional')}
      </h2>
      <p>
        {t('beyondTraditionalDesc')}
      </p>
    </AboutPageLayout>
  )
}
