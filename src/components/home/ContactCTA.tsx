'use client'

import { useTranslations } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'

interface ContactCTAProps {
  variant?: 'dark' | 'light'
}

export default function ContactCTA({ variant = 'dark' }: ContactCTAProps) {
  const t = useTranslations('contactCta')
  const tc = useTranslations('common')
  const isLight = variant === 'light'

  return (
    <section className={`relative py-20 lg:py-24 ${isLight ? 'bg-light-bg' : 'bg-dark-800'}`}>
      {/* Subtle top border */}
      <div className={`absolute inset-x-0 top-0 h-px ${isLight ? 'bg-light-border' : 'bg-gradient-to-r from-transparent via-gold/20 to-transparent'}`} />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left — heading + text */}
        <FadeIn className="text-center lg:text-left">
          <h2 className={`font-serif text-3xl font-light lg:text-4xl ${isLight ? 'text-light-text' : 'text-light'}`}>
            {t('title').split(t('highlight'))[0]}
            <span className={`italic ${isLight ? 'text-gold-dark' : 'text-gold'}`}>{t('highlight')}</span>
            {t('title').split(t('highlight'))[1] || ''}
          </h2>
          <p className={`mt-4 max-w-md font-sans text-base font-light leading-relaxed ${isLight ? 'text-light-text-secondary' : 'text-muted'}`}>
            {t('subtitle')}
          </p>
        </FadeIn>

        {/* Right — buttons */}
        <FadeIn delay={0.15} className="flex flex-col gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            {tc('bookConsultation')}
          </Button>
          <Button href="tel:+85227091388" variant={isLight ? 'outline-dark' : 'outline'}>
            {tc('callUs', { phone: '(852) 2709 1388' })}
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
