import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-section py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" className="font-serif text-xl font-semibold text-light">
            {SITE_CONFIG.name}
          </Link>
          <p className="max-w-md text-sm text-muted">
            {SITE_CONFIG.address}
          </p>
          <p className="text-xs text-muted">{SITE_CONFIG.license}</p>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
