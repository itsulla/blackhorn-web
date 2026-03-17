import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.blackhorngrp.com'),
  title: 'Blackhorn Wealth Management | Hong Kong',
  description:
    'An independent wealth management firm based in Hong Kong, providing best-in-class solutions for discerning families and institutions.',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Blackhorn Wealth Management | Hong Kong',
    description:
      'An independent wealth management firm based in Hong Kong, providing best-in-class solutions for discerning families and institutions.',
    url: 'https://www.blackhorngrp.com',
    siteName: 'Blackhorn Wealth Management',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blackhorn Wealth Management',
      },
    ],
    locale: 'en_HK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blackhorn Wealth Management | Hong Kong',
    description:
      'An independent wealth management firm based in Hong Kong, providing best-in-class solutions for discerning families and institutions.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
