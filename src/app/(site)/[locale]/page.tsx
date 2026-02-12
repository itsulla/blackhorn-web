import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import About from '@/components/home/About'
import Services from '@/components/home/Services'
import Awards from '@/components/home/Awards'
import Insights from '@/components/home/Insights'
import ContactCTA from '@/components/home/ContactCTA'
import { OrganizationJsonLd, FinancialServiceJsonLd } from '@/components/seo/JsonLd'
import { fetchSiteSettings } from '@/lib/sanity/fetch'

export default async function Home() {
  // Fetch site settings from Sanity — components fall back to hardcoded if null
  const settings = await fetchSiteSettings()

  return (
    <>
      <OrganizationJsonLd />
      <FinancialServiceJsonLd />
      <main>
        <Hero
          heading={settings?.heroHeading}
          subtext={settings?.heroSubtext}
          missionStatement={settings?.missionStatement}
        />
        <TrustBar cmsStats={settings?.trustBarStats} />
        <About />
        <Services />
        <Awards />
        <Insights />
        <ContactCTA />
      </main>
    </>
  )
}
