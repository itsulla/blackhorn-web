'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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
  // CMS overrides — fall back to hardcoded defaults
  const heroSubtext = subtext || 'Independent Wealth Management'
  const heroMission =
    missionStatement ||
    'An independent wealth management organisation based in Hong Kong. Our team draws on decades of experience in private wealth and investing to provide best-in-class wealth solutions for our clients and their families.'
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background — HK Peak sunset */}
      <Image
        src="/images/hero/hk-peak-sunset.webp"
        alt="Hong Kong skyline at sunset from Victoria Peak"
        fill
        className="object-cover"
        priority
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADQAwCdASoUAAwAPzmGulQvKSWjMAgB4CcJZgCdACHcbQzC+KChFgAA/c6iwQTaYCjrj3KAtCEEK2Ia4us6J/JQBHXBpk6niIDb1xxMYwAAAA=="
        sizes="100vw"
      />

      {/* Gradient overlay — dark from bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-dark-900/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        {/* Overline */}
        <motion.div
          {...anim(0.4)}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className="h-px w-8 bg-gold/40" />
          <span className="font-sans text-[10px] uppercase tracking-[4px] text-gold/70">
            {heroSubtext} · Hong Kong
          </span>
          <span className="h-px w-8 bg-gold/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...anim(0.6)}
          className="font-serif font-light leading-[1.1] text-light"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
        >
          {heading ? (
            heading
          ) : (
            <>
              Intelligent Solutions
              <br />
              <span className="italic text-gold">Beyond Simple</span> Wealth Management
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...anim(0.9)}
          className="mx-auto mt-8 max-w-[560px] font-sans text-base font-light leading-relaxed text-muted"
        >
          {heroMission}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...anim(1.1)}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/services" variant="primary">
            Discover Our Approach
          </Button>
          <Button href="/about" variant="outline">
            Meet Our Team
          </Button>
        </motion.div>

        {/* SFC badge */}
        <motion.div
          {...anim(1.5)}
          className="mt-16 flex items-center justify-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="font-sans text-[10px] uppercase tracking-widest text-muted/50">
            SFC Licensed &middot; Type 4 &amp; 9 &middot; BNM924
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
        <span className="font-sans text-[9px] uppercase tracking-[3px] text-muted/40">
          Scroll
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
