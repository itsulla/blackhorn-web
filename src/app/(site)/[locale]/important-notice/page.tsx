import type { Metadata } from 'next'
import FadeIn from '@/components/ui/FadeIn'
import ContactCTA from '@/components/home/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata')
  return {
    title: t('importantNoticeTitle'),
    description: t('importantNoticeDescription'),
    openGraph: {
      title: t('importantNoticeTitle'),
      description: t('importantNoticeDescription'),
    },
  }
}

export default async function ImportantNoticePage() {
  const t = await getTranslations('importantNotice')
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Important Notice', href: '/important-notice' },
        ]}
      />
      <main className="min-h-screen bg-dark">
        {/* Hero */}
        <section className="border-b border-gold/6 bg-dark-section pb-20 pt-32">
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-gold/20">
                  <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="font-sans text-xs uppercase tracking-widest text-gold">
                  {t('overline')}
                </p>
              </div>
              <h1 className="font-serif text-3xl font-light text-light md:text-4xl lg:text-5xl">
                {t('title')}{' '}
                <span className="italic text-gold">{t('titleHighlight')}</span>
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* Content */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-6">
            <FadeIn>
              <div className="space-y-6 font-sans text-base font-light leading-[1.85] text-muted">
                <p>{t('greeting')}</p>

                <p>
                  {t('paragraph1')}
                </p>

                <ol className="list-[lower-roman] space-y-3 pl-6">
                  <li>{t('scamType1')}</li>
                  <li>{t('scamType2')}</li>
                </ol>

                <p>
                  {t('reminder')}
                </p>

                <p>
                  {t('officialWebsite')}{' '}
                  <a href="https://www.blackhorngrp.com/" className="text-gold transition-colors duration-300 hover:underline">
                    https://www.blackhorngrp.com/
                  </a>
                  . {t('verifyIdentity')}
                </p>

                <p>
                  {t('contactPrompt')}{' '}
                  <a href="tel:+85227091388" className="text-gold transition-colors duration-300 hover:underline">(852) 2709 1388</a>
                  {' '}{t('orEmailTo')}{' '}
                  <a href="mailto:info@blackhorngrp.com" className="text-gold transition-colors duration-300 hover:underline">
                    info@blackhorngrp.com
                  </a>.
                </p>

                <div className="mt-8 border-t border-gold/10 pt-8">
                  <p className="text-sm text-muted/60">
                    {t('signoff')}
                    <br />
                    {t('date')}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact CTA */}
        <ContactCTA />
      </main>
    </>
  )
}
