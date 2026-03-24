'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

const sectionLinks = [
  { key: 'sectionVision', href: '/about/our-vision' },
  { key: 'sectionTeam', href: '/about/leadership' },
  { key: 'sectionAwards', href: '/awards' },
  { key: 'sectionLocation', href: '/about/our-location' },
]

export default function AboutSectionNav() {
  const t = useTranslations('about')
  const pathname = usePathname()

  // Strip locale prefix (e.g. /en/about/our-vision → /about/our-vision)
  const path = pathname.replace(/^\/(en|zh-hant)/, '')

  return (
    <nav className="border-b border-light-border bg-brand-offwhite">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-6 py-5 md:gap-10">
        {sectionLinks.map((link) => {
          const isActive = path === link.href

          return (
            <Link
              key={link.key}
              href={link.href}
              className={`group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest transition-colors duration-300 ${
                isActive
                  ? 'font-bold text-brand-gold'
                  : 'text-brand-dark hover:text-brand-gold'
              }`}
            >
              <span className="text-brand-gold">›</span>
              {t(link.key)}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
