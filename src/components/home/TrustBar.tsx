'use client'

import { useTranslations } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import Counter from '@/components/ui/Counter'

const metrics = [
  { target: 20, suffix: '+', labelKey: 'yearsOfExcellence' as const },
  { target: 11, labelKey: 'familiesServed' as const },
  { target: 4, prefix: '$', suffix: 'Bn+', labelKey: 'assetsUnderManagement' as const },
]

interface TrustBarProps {
  cmsStats?: Array<{ value: string; label: string }>
}

export default function TrustBar({ cmsStats }: TrustBarProps) {
  const t = useTranslations('trust')

  // CMS stats are not used for the animated counters (they're simple strings)
  void cmsStats

  return (
    <section className="border-y border-gold/8 bg-dark-section">
      <div className="mx-auto grid max-w-7xl auto-cols-fr grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 px-12 py-16">
        {metrics.map((m, i) => (
          <FadeIn key={m.labelKey} delay={i * 0.15} className="text-center">
            <span className="font-serif text-4xl font-light text-gold">
              <Counter
                target={m.target}
                prefix={m.prefix}
                suffix={m.suffix}
              />
            </span>
            <p className="mt-2 font-sans text-xs uppercase tracking-widest text-muted">
              {t(m.labelKey)}
            </p>
          </FadeIn>
        ))}
        <FadeIn delay={0.45} className="text-center">
          <span className="font-serif text-4xl font-light text-gold">
            Type 4 &amp; 9
          </span>
          <p className="mt-2 font-sans text-xs uppercase tracking-widest text-muted">
            {t('sfcLicensed')}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
