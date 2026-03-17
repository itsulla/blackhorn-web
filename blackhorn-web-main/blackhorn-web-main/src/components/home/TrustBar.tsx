'use client'

import { useLocale } from 'next-intl'
import FadeIn from '@/components/ui/FadeIn'
import Counter from '@/components/ui/Counter'

// ---------------------------------------------------------------------------
// Value parser — turns CMS strings into Counter-compatible props
// ---------------------------------------------------------------------------

interface ParsedStat {
  target: number
  prefix: string
  suffix: string
}

/**
 * Parse a stat value like "200+", "$4Bn+", "9+" into parts for the Counter.
 * Returns null for non-numeric values like "Type 4 & 9" (displayed as static text).
 */
function parseStatValue(value: string): ParsedStat | null {
  const match = value.match(/^([£€$¥]?)(\d+(?:,\d{3})*)(.*)$/)
  if (!match) return null
  return {
    prefix: match[1],
    target: parseInt(match[2].replace(/,/g, ''), 10),
    suffix: match[3],
  }
}

// ---------------------------------------------------------------------------
// Hardcoded fallbacks (used if CMS is empty)
// ---------------------------------------------------------------------------

interface TrustBarStat {
  _key?: string
  value: string
  label: string
  label_zh?: string
}

const fallbackStats: TrustBarStat[] = [
  { value: '20+', label: 'Years of Excellence', label_zh: '卓越年資' },
  { value: '11', label: 'Families Served', label_zh: '服務家族' },
  { value: '$4Bn+', label: 'Assets Under Management', label_zh: '管理資產' },
  { value: 'Type 4 & 9', label: 'SFC Licensed', label_zh: '證監會持牌' },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface TrustBarProps {
  cmsStats?: TrustBarStat[]
}

export default function TrustBar({ cmsStats }: TrustBarProps) {
  const locale = useLocale()
  const stats = cmsStats && cmsStats.length > 0 ? cmsStats : fallbackStats

  return (
    <section className="border-y border-light-border bg-white">
      <div className="mx-auto grid max-w-7xl auto-cols-fr grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 px-12 py-16">
        {stats.map((stat, i) => {
          const parsed = parseStatValue(stat.value)
          const label =
            locale === 'zh-hant' && stat.label_zh
              ? stat.label_zh
              : stat.label

          return (
            <FadeIn key={stat._key ?? i} delay={i * 0.15} className="text-center">
              <span className="font-serif text-4xl font-light text-gold">
                {parsed ? (
                  <Counter
                    target={parsed.target}
                    prefix={parsed.prefix}
                    suffix={parsed.suffix}
                  />
                ) : (
                  stat.value
                )}
              </span>
              <p className="mt-2 font-sans text-xs uppercase tracking-widest text-light-text-secondary">
                {label}
              </p>
            </FadeIn>
          )
        })}
      </div>
    </section>
  )
}
