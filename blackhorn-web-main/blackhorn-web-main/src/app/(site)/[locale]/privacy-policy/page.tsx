import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('privacyTitle'),
    description: t('privacyDescription'),
  }
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('privacyPage')
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
            <h2 className="font-serif text-xl font-light text-light">
              {t('section1Title')}
            </h2>
            <p>
              {t('section1')}
            </p>

            <h2 className="font-serif text-xl font-light text-light">
              {t('section2Title')}
            </h2>
            <p>
              {t('section2')}
            </p>

            <h2 className="font-serif text-xl font-light text-light">
              {t('section3Title')}
            </h2>
            <p>
              {t('section3')}
            </p>

            <h2 className="font-serif text-xl font-light text-light">
              {t('section4Title')}
            </h2>
            <p>
              {t('section4')}
            </p>

            <h2 className="font-serif text-xl font-light text-light">
              {t('section5Title')}
            </h2>
            <p>
              {t('section5')}{' '}
              <a
                href="mailto:info@blackhorngrp.com"
                className="text-gold transition-colors duration-300 hover:text-gold-light"
              >
                info@blackhorngrp.com
              </a>
              .
            </p>

            <p className="text-xs italic text-white/30">
              {t('placeholder')}
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
