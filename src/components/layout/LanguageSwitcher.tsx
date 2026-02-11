'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const labels: Record<string, string> = {
  en: 'EN',
  'zh-hant': '繁',
}

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale as (typeof routing.locales)[number] })
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && (
            <span className="text-[10px] text-gold/20">/</span>
          )}
          <button
            onClick={() => switchLocale(loc)}
            className={`font-sans text-[11px] tracking-wide transition-colors duration-300 ${
              locale === loc
                ? 'text-gold'
                : 'text-muted/60 hover:text-gold/80'
            }`}
            aria-label={`Switch to ${loc === 'en' ? 'English' : 'Traditional Chinese'}`}
          >
            {labels[loc]}
          </button>
        </span>
      ))}
    </div>
  )
}
