import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-gold/8 bg-dark-section px-12 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row md:items-start">
        <div>
          <p className="font-serif text-sm uppercase tracking-widest text-white/40">
            Blackhorn Wealth Management &middot; 晉羚財富管理
          </p>
          <p className="mt-2 font-sans text-[11px] text-white/20">
            {SITE_CONFIG.license}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 md:items-end">
          <div className="flex items-center gap-4">
            <Link
              href="/disclaimer"
              className="font-sans text-[11px] text-white/30 transition-colors duration-300 hover:text-gold"
            >
              Disclaimer
            </Link>
            <span className="text-white/15">&middot;</span>
            <Link
              href="/privacy-policy"
              className="font-sans text-[11px] text-white/30 transition-colors duration-300 hover:text-gold"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="font-sans text-[11px] text-white/20">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
