'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { services } from '@/lib/services'

/** Only these four services appear in the section nav bar */
const navSlugs = ['wealth-management', 'family-office', 'ctfs-ecosystem', 'estate-legacy']

export default function ServiceSectionNav() {
  const pathname = usePathname()

  // Strip locale prefix (e.g. /zh-hant/services/wealth-management → /services/wealth-management)
  const path = pathname.replace(/^\/(en|zh-hant)/, '')

  const navServices = services.filter((s) => navSlugs.includes(s.slug))

  return (
    <nav className="border-b border-light-border bg-brand-offwhite">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-6 py-5 md:gap-10">
        {navServices.map((s) => {
          const isActive = path === s.href

          return (
            <Link
              key={s.slug}
              href={s.href}
              className={`group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest transition-colors duration-300 ${
                isActive
                  ? 'font-bold text-brand-gold'
                  : 'text-brand-dark hover:text-brand-gold'
              }`}
            >
              <span className="text-brand-gold">›</span>
              {s.shortTitle}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
