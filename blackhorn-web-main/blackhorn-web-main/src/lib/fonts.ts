import { Crimson_Pro, Inter } from 'next/font/google'

/**
 * Font Configuration — Blackhorn Brand System
 *
 * Heading:     Neue Montreal Bold    → Inter 700 (stand-in)
 * Sub-heading: Crimson Pro
 * Body:        Neue Montreal Regular → Inter 400 (stand-in)
 * Sector:      Aptos (fallback in Tailwind config)
 *
 * When Neue Montreal is purchased from Pangram Pangram,
 * swap localFont() calls below — the CSS variable names stay the same.
 */
export const FONT_CONFIG = {
  heading: 'Inter',          // → 'Neue Montreal' when purchased
  subheading: 'Crimson Pro',
  body: 'Inter',             // → 'Neue Montreal' when purchased
  sector: 'Aptos',
  heading_zh: 'Noto Sans TC',
  body_zh: 'Noto Sans TC',
} as const

export const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

// TODO: Replace Inter with Neue Montreal when font files are provided by Blackhorn
// Neue Montreal is the brand font (purchase from https://pangrampangram.com/products/neue-montreal)
// Inter is the closest free match and serves as a stand-in
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
