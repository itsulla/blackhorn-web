import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { cormorantGaramond, dmSans } from '@/lib/fonts'
import { routing } from '@/i18n/routing'
import LayoutShell from '@/components/layout/LayoutShell'
import Footer from '@/components/layout/Footer'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${cormorantGaramond.variable} ${dmSans.variable}`}>
      <body>
        <NextIntlClientProvider>
          <LayoutShell />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
