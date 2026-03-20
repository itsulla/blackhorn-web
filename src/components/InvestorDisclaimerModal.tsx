'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

const STORAGE_KEY = 'blackhorn_investor_accepted'
const ACCEPT_DURATION_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

export default function InvestorDisclaimerModal() {
  const t = useTranslations('investorDisclaimer')
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const accepted = localStorage.getItem(STORAGE_KEY)
    if (accepted) {
      const acceptedAt = parseInt(accepted, 10)
      if (Date.now() - acceptedAt < ACCEPT_DURATION_MS) {
        setShow(false)
        return
      }
    }
    setShow(true)
    // Prevent scrolling while modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString())
    document.body.style.overflow = ''
    setShow(false)
  }

  const handleDecline = () => {
    // Redirect to a generic external page
    window.location.href = 'https://www.google.com'
  }

  if (!mounted || !show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 w-full max-w-lg border border-gold/15 bg-dark-section shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-gold/10 px-8 py-6">
              <div className="flex items-center gap-3">
                {/* Blackhorn horn icon */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="text-gold"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M20 8c0 0-8 6-8 16c0 2 0.5 4 1.5 5.5C15 31 17.5 32 20 32s5-1 6.5-2.5C27.5 28 28 26 28 24c0-10-8-16-8-16z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                </svg>
                <div>
                  <h2 className="font-serif text-lg font-light text-light">
                    {t('title')}
                  </h2>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold/60">
                    {t('subtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-6">
              <p className="font-sans text-sm leading-relaxed text-white/70">
                {t('body')}
              </p>

              <div className="mt-5 border-l-2 border-gold/20 pl-4">
                <p className="font-sans text-xs leading-relaxed text-white/50">
                  {t('regulatory')}
                </p>
              </div>

              <div className="mt-5">
                <p className="font-sans text-xs text-white/40">
                  {t('cookieNotice')}{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-gold/50 underline underline-offset-2 transition-colors hover:text-gold"
                  >
                    {t('privacyPolicy')}
                  </Link>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t border-gold/10 px-8 py-6 sm:flex-row">
              <button
                onClick={handleAccept}
                className="flex-1 bg-gold px-6 py-3 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
              >
                {t('accept')}
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 border border-white/15 px-6 py-3 font-sans text-xs uppercase tracking-widest text-white/50 transition-all duration-300 hover:border-white/30 hover:text-white/70"
              >
                {t('decline')}
              </button>
            </div>

            {/* Footer note */}
            <div className="border-t border-gold/6 px-8 py-4">
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                {t('footer')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
