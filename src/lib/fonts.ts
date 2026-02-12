import { Crimson_Pro, Inter } from 'next/font/google'

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
