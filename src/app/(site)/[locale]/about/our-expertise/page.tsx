import type { Metadata } from 'next'
import AboutPageLayout from '@/components/about/AboutPageLayout'

export const metadata: Metadata = {
  title: 'Our Expertise | Blackhorn Wealth Management',
  description:
    'A diverse team of professionals with decades of experience across private wealth management, deal sourcing, and legacy planning.',
}

export default function OurExpertisePage() {
  return (
    <AboutPageLayout
      title="Our Expertise"
      overline="About Blackhorn"
      subtitle="Our team comprises professionals with decades of experience in their respective fields. We believe that maintaining a diverse team of experts is the best way to serve our clients."
      currentSlug="our-expertise"
    >
      <p>
        From private wealth management to deal sourcing and legacy planning, our
        advisors will work with you to tailor custom solutions. Every member of
        our team brings deep domain expertise and a commitment to understanding
        your unique circumstances.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Investment Capabilities
      </h2>
      <p>
        Our investment team has managed billions in client assets across
        equities, fixed income, derivatives, private equity, and structured
        products. We combine institutional-grade research with hands-on
        portfolio management to deliver actionable insights and superior
        risk-adjusted returns.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Structured Products
      </h2>
      <p>
        Structured products represent a significant portion of our business. Our
        team has extensive experience designing and implementing bespoke
        structured solutions that provide tailored risk-return profiles,
        including capital protection features, yield enhancement, and leveraged
        exposure to specific market themes.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        A Diverse Team
      </h2>
      <p>
        Our professionals bring experience from leading institutions including
        UBS, Morgan Stanley, Credit Suisse, HSBC, and Citi. This breadth of
        backgrounds — spanning investment banking, wealth management, and family
        office advisory — enables us to deliver comprehensive solutions that
        address every dimension of our clients&apos; financial lives.
      </p>
    </AboutPageLayout>
  )
}
