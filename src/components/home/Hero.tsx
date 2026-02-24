'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

function anim(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease },
  }
}

interface HeroProps {
  heading?: string
  subtext?: string
  missionStatement?: string
}

export default function Hero({ heading, subtext, missionStatement }: HeroProps) {
  const t = useTranslations('hero')
  const tc = useTranslations('common')

  // CMS overrides — fall back to translated defaults
  const heroSubtext = subtext || t('overline')
  const heroMission = missionStatement || t('subtitle')

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background — HK Peak sunset */}
      <Image
        src="/images/hero/vh-image.webp"
        alt="Victoria Harbour, Hong Kong"
        fill
        className="object-cover"
        priority
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADwAwCdASoUAA0APzmGulOvKSWisAgB4CcJYwCdMoADTVRpWCU9YluAAPjNmOjPL+XLIc8Ea+IDVAzM5pkTBxEAVAPfx3O3ZuZf8588WMS7TEbVRGgq8PR1VkAAAA=="
        sizes="100vw"
      />

      {/* Gradient overlay — lighter at top so golden sunset shows through */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-dark-900/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        {/* Overline */}
        <motion.div
          {...anim(0.4)}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className="h-px w-8 bg-gold/40" />
          <span className="font-sans text-[10px] uppercase tracking-[4px] text-gold/70 text-shadow-hero">
            {heroSubtext} · Hong Kong
          </span>
          <span className="h-px w-8 bg-gold/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...anim(0.6)}
          className="font-serif font-light leading-[1.1] text-light"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          {heading ? (
            heading
          ) : (
            <>
              {t('headline1')}
              <br />
              <span className="italic text-gold">{t('headline2')}</span> {t('headline3')}
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...anim(0.9)}
          className="mx-auto mt-8 max-w-[560px] font-sans text-base font-light leading-relaxed text-white text-shadow-hero"
        >
          {heroMission}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...anim(1.1)}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/services" variant="primary">
            {t('ctaPrimary')}
          </Button>
          <Button href="/about" variant="outline" className="border-2 border-white/80 text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:border-white hover:text-white">
            {tc('learnMore')}
          </Button>
        </motion.div>

        {/* SFC badge */}
        <motion.div
          {...anim(1.5)}
          className="mt-16 flex items-center justify-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="font-sans text-[10px] uppercase tracking-widest text-white/70 text-shadow-hero">
            {t('sfcBadge')}
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-sans text-[9px] uppercase tracking-[3px] text-white/40 text-shadow-hero">
          {tc('scroll')}
        </span>
        <motion.div
          animate={{ scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-px origin-top bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
