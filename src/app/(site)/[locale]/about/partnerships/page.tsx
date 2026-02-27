import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutPageLayout from '@/components/about/AboutPageLayout'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('partnershipsTitle'),
    description: t('partnershipsDescription'),
  }
}

export default async function PartnershipsPage() {
  const t = await getTranslations('partnerships')
  return (
    <AboutPageLayout
      title={t('title')}
      overline={t('overline')}
      subtitle={t('subtitle')}
      currentSlug="partnerships"
    >
      <p>
        {t('intro')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('bankingPartnersTitle')}
      </h2>
      <p>
        {t('bankingPartnersDesc')}
      </p>

      {/* Partner list */}
      <div className="my-8 border-l-2 border-gold-dark/40 pl-6">
        <h3 className="font-sans text-[11px] uppercase tracking-widest text-gold-dark">
          {t('bankingPartnersLabel')}
        </h3>
        <ul className="mt-4 space-y-3">
          {[
            'UBS',
            'BNP Paribas',
            'Credit Suisse',
            'Julius Baer',
            'DBS',
            'Bank of Singapore',
            'EFG International',
            'VP Bank',
            'Morgan Stanley',
            'HSBC Private Banking',
            'Standard Chartered',
          ].map((bank) => (
            <li key={bank} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-dark/60" />
              <span>{bank}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('eamModelTitle')}
      </h2>
      <p>
        {t('eamModelDesc')}
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        {t('portfolioConsolidation')}
      </h2>
      <p>
        {t('portfolioConsolidationDesc')}
      </p>
    </AboutPageLayout>
  )
}
