import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('disclaimerTitle'),
    description: t('disclaimerDescription'),
  }
}

export default async function DisclaimerPage() {
  const t = await getTranslations('disclaimerPage')
  const tCommon = await getTranslations('common')
  return (
    <main className="min-h-screen bg-dark pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <p className="font-sans text-xs uppercase tracking-widest text-gold">
            {t('overline')}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl">
            {t('title')}
          </h1>
          <div className="mt-2 h-px w-16 bg-gold/40" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-16 space-y-8 font-sans text-sm leading-[1.85] text-muted">
            <p>
              {t('paragraph1')}
            </p>

            <p>
              {t('paragraph2')}
            </p>

            <p>
              {t('paragraph3')}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-16 border-t border-gold/10 pt-8">
            <Link
              href="/"
              className="font-sans text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-gold"
            >
              &larr; {tCommon('backToHome')}
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  )
}
