import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import About from '@/components/home/About'
import Services from '@/components/home/Services'
import Awards from '@/components/home/Awards'
import Insights from '@/components/home/Insights'
import ContactCTA from '@/components/home/ContactCTA'
import { OrganizationJsonLd, FinancialServiceJsonLd } from '@/components/seo/JsonLd'

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <FinancialServiceJsonLd />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Awards />
        <Insights />
        <ContactCTA />
      </main>
    </>
  )
}
