'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'blackhorn_fraud_notice_dismissed'

export default function FraudNoticeModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsOpen(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-gold/30 bg-dark-700 shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 text-muted transition-colors duration-300 hover:text-light"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Warning icon + heading */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-gold/20">
              <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-gold">
              Important Notice
            </h2>
          </div>

          <h3 className="mb-4 font-serif text-lg text-light">
            Beware of scams impersonating Blackhorn Wealth Management Limited
            and against deceptions
          </h3>

          <div className="space-y-4 font-sans text-sm leading-relaxed text-muted">
            <p>Dear Clients &amp; Investors,</p>

            <p>
              Blackhorn Wealth Management Limited (&ldquo;Blackhorn&rdquo;) has recently
              received a number of enquiries concerning suspected scams involving
              fraudsters impersonating Blackhorn to engage in fraudulent activities,
              with the intention of illegally deceiving clients and obtaining
              financial gains through the trust placed in Blackhorn. The forms of
              impersonation include but are not limited to:
            </p>

            <ol className="list-[lower-roman] space-y-2 pl-6">
              <li>imitating Blackhorn&apos;s domain name or creating counterfeit Blackhorn websites;</li>
              <li>impersonating Blackhorn employees to induce clients to transfer money to their bank accounts for investment and/or completing their forged investment forms to obtain personal details, etc.</li>
            </ol>

            <p>
              Blackhorn hereby reminds all clients and investors to pay attention
              and stay vigilant against deception.
            </p>

            <p>
              It is hereby specifically stated that Blackhorn&apos;s official website is{' '}
              <a href="https://www.blackhorngrp.com/" className="text-gold transition-colors duration-300 hover:underline">
                https://www.blackhorngrp.com/
              </a>
              . If any person attempts to claim himself/herself as a staff of
              Blackhorn and requests for your personal data and/or your bank
              information whilst inducing you to invest in any investment product
              and/or transfer money for the investment, stay vigilant and verify
              his/her identity by contacting us if you are in doubt. You may also
              report the suspected crime/scam activities to the local law enforcement
              authorities. Blackhorn reserves the right to discharge its
              responsibilities through legal means when fraudulent activities are
              identified.
            </p>

            <p>
              Should you have any questions, please contact us at{' '}
              <a href="tel:+85227091388" className="text-gold transition-colors duration-300 hover:underline">(852) 2709 1388</a>
              {' '}or email to{' '}
              <a href="mailto:info@blackhorngrp.com" className="text-gold transition-colors duration-300 hover:underline">
                info@blackhorngrp.com
              </a>.
            </p>

            <p className="pt-2 text-xs text-muted/60">
              Blackhorn Wealth Management Limited
              <br />
              31 May 2024
            </p>
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="mt-8 w-full bg-gold py-3 font-sans text-sm font-semibold uppercase tracking-wider text-dark transition-colors duration-300 hover:bg-gold-light"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  )
}
