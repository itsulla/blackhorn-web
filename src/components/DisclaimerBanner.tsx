'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'blackhorn_banner_dismissed'
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

export default function DisclaimerBanner({
  onVisibilityChange,
}: {
  onVisibilityChange?: (visible: boolean) => void
}) {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10)
      if (Date.now() - dismissedAt < DISMISS_DURATION_MS) {
        setVisible(false)
        onVisibilityChange?.(false)
        return
      }
    }
    setVisible(true)
    onVisibilityChange?.(true)
  }, [onVisibilityChange])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    setVisible(false)
    onVisibilityChange?.(false)
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 z-[60] w-full overflow-hidden bg-gold/10 backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2">
            <p className="font-sans text-[11px] leading-snug text-muted md:text-xs">
              <span className="text-gold">⚠</span>{' '}
              Beware of scams — Blackhorn Wealth Management will never ask for
              payments via unofficial channels.{' '}
              <Link
                href="/disclaimer"
                className="text-gold underline underline-offset-2 transition-colors duration-300 hover:text-gold-light"
              >
                Learn More
              </Link>
            </p>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 text-muted transition-colors duration-300 hover:text-light"
              aria-label="Dismiss banner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
