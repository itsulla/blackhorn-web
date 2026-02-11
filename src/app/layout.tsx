import type { Metadata } from 'next'
import { cormorantGaramond, dmSans } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Blackhorn Wealth Management | Hong Kong',
  description:
    'An independent wealth management firm based in Hong Kong, providing best-in-class solutions for discerning families and institutions.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
