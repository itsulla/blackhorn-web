'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/family-office', label: 'Family Office' },
  { href: '/awards', label: 'Awards' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'border-b border-gold/10 bg-dark/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
            scrolled ? 'py-4' : 'py-7'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border-[1.5px] border-gold">
              <span className="font-serif text-lg text-gold">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-widest text-light">
                BLACKHORN
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[3.5px] text-muted">
                Wealth Management
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 bg-gold px-6 py-2.5 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:bg-gold-light"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-[1.5px] w-6 bg-gold transition-all duration-300 ${
                mobileOpen ? 'translate-y-[6.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-gold transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-[1.5px] w-6 bg-gold transition-all duration-300 ${
                mobileOpen ? '-translate-y-[6.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark/98 lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-3xl font-light text-light transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + navLinks.length * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-block bg-gold px-8 py-3 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:bg-gold-light"
                >
                  Book a Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
