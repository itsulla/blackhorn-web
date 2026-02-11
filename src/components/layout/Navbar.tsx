'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '@/lib/services'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

const eventLinks = [
  { href: '/events', label: 'All Events', icon: '◆' },
  {
    href: '/events/investment-summit-2024',
    label: 'Investment Summit 2024',
    icon: '◇',
  },
  {
    href: '/events/family-office-summit-2023',
    label: 'Family Office Summit 2023',
    icon: '◇',
  },
  { href: '/awards', label: 'Awards & Recognition', icon: '▽' },
]

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services', hasDropdown: 'services' as const },
  { href: '/events', label: 'News & Events', hasDropdown: 'events' as const },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar({ bannerVisible = false }: { bannerVisible?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setOpenDropdown(key)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  return (
    <>
      <nav
        style={{ top: bannerVisible ? '36px' : '0px' }}
        className={`fixed z-50 w-full transition-all duration-500 ${
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
            <Image
              src="/images/logo/logo-mark-light.png"
              alt="Blackhorn Wealth Management"
              width={38}
              height={38}
              sizes="38px"
              className="hidden h-[38px] w-auto lg:block"
              priority
            />
            <Image
              src="/images/logo/logo-mark-light.png"
              alt="Blackhorn Wealth Management"
              width={32}
              height={32}
              sizes="32px"
              className="h-[32px] w-auto lg:hidden"
              priority
            />
            <div className="hidden flex-col lg:flex">
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
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(link.hasDropdown)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform duration-300 ${
                        openDropdown === link.hasDropdown ? 'rotate-180' : ''
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </Link>

                  <AnimatePresence>
                    {openDropdown === link.hasDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4"
                      >
                        <div className="border border-gold/10 bg-dark/95 backdrop-blur-xl">
                          {link.hasDropdown === 'services' && (
                            <>
                              <div className="p-2">
                                {services.map((s) => (
                                  <Link
                                    key={s.slug}
                                    href={s.href}
                                    className="group flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-gold/[0.06]"
                                  >
                                    <span className="text-sm text-gold/50 transition-colors duration-200 group-hover:text-gold">
                                      {s.icon}
                                    </span>
                                    <span className="block font-sans text-xs font-medium text-light/80 transition-colors duration-200 group-hover:text-light">
                                      {s.title}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                              <div className="border-t border-gold/8 p-2">
                                <Link
                                  href="/services"
                                  className="flex items-center justify-center gap-2 px-4 py-2.5 font-sans text-[10px] uppercase tracking-widest text-gold transition-colors duration-200 hover:text-gold-light"
                                >
                                  View All Services &rarr;
                                </Link>
                              </div>
                            </>
                          )}
                          {link.hasDropdown === 'events' && (
                            <>
                              <div className="p-2">
                                {eventLinks.map((e) => (
                                  <Link
                                    key={e.href}
                                    href={e.href}
                                    className="group flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-gold/[0.06]"
                                  >
                                    <span className="text-sm text-gold/50 transition-colors duration-200 group-hover:text-gold">
                                      {e.icon}
                                    </span>
                                    <span className="block font-sans text-xs font-medium text-light/80 transition-colors duration-200 group-hover:text-light">
                                      {e.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                              <div className="border-t border-gold/8 p-2">
                                <Link
                                  href="/events"
                                  className="flex items-center justify-center gap-2 px-4 py-2.5 font-sans text-[10px] uppercase tracking-widest text-gold transition-colors duration-200 hover:text-gold-light"
                                >
                                  View All Events &rarr;
                                </Link>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="ml-2 mr-2">
              <LanguageSwitcher />
            </div>
            <Link
              href="/contact"
              className="bg-gold px-6 py-2.5 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:bg-gold-light"
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
                  className="flex flex-col items-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-3xl font-light text-light transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                  {/* Show sub-links under dropdowns in mobile */}
                  {link.hasDropdown === 'services' && (
                    <div className="mt-3 flex flex-col items-center gap-2">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={s.href}
                          onClick={() => setMobileOpen(false)}
                          className="font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                        >
                          {s.shortTitle}
                        </Link>
                      ))}
                    </div>
                  )}
                  {link.hasDropdown === 'events' && (
                    <div className="mt-3 flex flex-col items-center gap-2">
                      {eventLinks.map((e) => (
                        <Link
                          key={e.href}
                          href={e.href}
                          onClick={() => setMobileOpen(false)}
                          className="font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                        >
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  )}
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + (navLinks.length + 1) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8"
              >
                <LanguageSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
