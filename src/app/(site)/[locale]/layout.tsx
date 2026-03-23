import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { crimsonPro, inter } from '@/lib/fonts'
import { routing } from '@/i18n/routing'
import LayoutShell from '@/components/layout/LayoutShell'
import Footer from '@/components/layout/Footer'
import { fetchSiteSettings } from '@/lib/sanity/fetch'
import { localized } from '@/lib/i18n-utils'

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

  // Fetch CMS data for the investor gate bottom sheet
  const settings = await fetchSiteSettings()
  const investorGate = settings
    ? {
        enabled: settings.investorGateEnabled ?? true,
        title: localized(settings, 'investorGateTitle', locale) || undefined,
        body: localized(settings, 'investorGateBody', locale) || undefined,
        regulatory:
          localized(settings, 'investorGateRegulatory', locale) || undefined,
        scamAlert:
          localized(settings, 'investorGateScamAlert', locale) || undefined,
      }
    : undefined

  return (
    <div lang={locale} className={`${crimsonPro.variable} ${inter.variable}`}>
      <NextIntlClientProvider>
        <LayoutShell investorGate={investorGate} />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </div>
  )
}
