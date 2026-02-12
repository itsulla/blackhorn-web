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
  { href: '/press', label: 'Press & Media', icon: '▷' },
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
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open; reset expanded state on close
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    if (!mobileOpen) setMobileExpanded(null)
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
          {/* Logo — transparent PNG (English-only variant) */}
          {/* TODO: When zh-hant locale is active, swap to blackhorn-logo-dark-transparent.png (includes 晉羚財富管理) */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/blackhorn-logo-dark-en-transparent.png"
              alt="Blackhorn Wealth Management"
              width={180}
              height={28}
              sizes="(max-width: 1024px) 140px, 180px"
              className="hidden h-auto w-[180px] lg:block"
              priority
            />
            <Image
              src="/images/logo/blackhorn-logo-dark-en-transparent.png"
              alt="Blackhorn Wealth Management"
              width={140}
              height={21}
              sizes="140px"
              className="h-auto w-[140px] lg:hidden"
              priority
            />
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
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
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
            className="fixed inset-0 z-[55] overflow-y-auto bg-[#0A0A0F] lg:hidden"
          >
            <nav className="flex min-h-full flex-col items-center justify-center gap-6 px-6 py-28">
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
                  {link.hasDropdown ? (
                    <>
                      {/* Tappable header with chevron */}
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.hasDropdown
                              ? null
                              : link.hasDropdown
                          )
                        }
                        className="inline-flex items-center gap-2 font-serif text-2xl font-light text-light transition-colors duration-300 hover:text-gold"
                      >
                        {link.label}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`text-gold/50 transition-transform duration-300 ${
                            mobileExpanded === link.hasDropdown
                              ? 'rotate-180'
                              : ''
                          }`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {/* Expandable sub-links */}
                      <AnimatePresence>
                        {mobileExpanded === link.hasDropdown && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 flex flex-col items-center gap-2.5 pb-1">
                              {link.hasDropdown === 'services' &&
                                services.map((s) => (
                                  <Link
                                    key={s.slug}
                                    href={s.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="font-sans text-sm text-muted transition-colors duration-300 hover:text-gold"
                                  >
                                    {s.shortTitle}
                                  </Link>
                                ))}
                              {link.hasDropdown === 'events' &&
                                eventLinks.map((e) => (
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-serif text-2xl font-light text-light transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
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
                  className="mt-2 inline-block bg-gold px-8 py-3 font-sans text-xs uppercase tracking-widest text-dark transition-all duration-300 hover:bg-gold-light"
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
                className="mt-4"
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
