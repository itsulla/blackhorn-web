import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { crimsonPro, inter } from '@/lib/fonts'
import { routing } from '@/i18n/routing'
import LayoutShell from '@/components/layout/LayoutShell'
import Footer from '@/components/layout/Footer'
import FraudNoticeModal from '@/components/FraudNoticeModal'

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
    <div lang={locale} className={`${crimsonPro.variable} ${inter.variable}`}>
      <NextIntlClientProvider>
        <LayoutShell />
        {children}
        <Footer />
        <FraudNoticeModal />
      </NextIntlClientProvider>
    </div>
  )
}
