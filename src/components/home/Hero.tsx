// TODO: Replace hardcoded strings with useTranslations('hero')
'use client'

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

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background — swap this div's gradient for a bg image later */}
      {/* TODO: Replace with Rachel's pitchbook HK scenery images when provided */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(201,169,110,0.06) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 50% at 20% 70%, rgba(201,169,110,0.04) 0%, transparent 60%)',
            'linear-gradient(to bottom, #0A0A0F 0%, #0E0E16 50%, #0A0A0F 100%)',
          ].join(', '),
        }}
      />

      {/* Decorative geometric squares */}
      <motion.div
        initial={{ opacity: 0, rotate: 40 }}
        animate={{ opacity: 1, rotate: 45 }}
        transition={{ duration: 1.6, delay: 1, ease }}
        className="absolute -right-12 top-[15%] h-[200px] w-[200px] border-[0.5px] border-gold/8"
      />
      <motion.div
        initial={{ opacity: 0, rotate: 40 }}
        animate={{ opacity: 1, rotate: 45 }}
        transition={{ duration: 1.6, delay: 1.3, ease }}
        className="absolute -left-8 bottom-[20%] h-[120px] w-[120px] border-[0.5px] border-gold/6"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[900px] px-6 text-center">
        {/* Overline */}
        <motion.div
          {...anim(0.4)}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className="h-px w-8 bg-gold/40" />
          <span className="font-sans text-[10px] uppercase tracking-[4px] text-gold/70">
            Independent Wealth Management · Hong Kong
          </span>
          <span className="h-px w-8 bg-gold/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...anim(0.6)}
          className="font-serif font-light leading-[1.1] text-light"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
        >
          Intelligent Solutions
          <br />
          <span className="italic text-gold">Beyond Simple</span> Wealth Management
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...anim(0.9)}
          className="mx-auto mt-8 max-w-[560px] font-sans text-base font-light leading-relaxed text-muted"
        >
          An independent wealth management organisation based in Hong Kong. Our
          team draws on decades of experience in private wealth and investing to
          provide best-in-class wealth solutions for our clients and their
          families.
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
