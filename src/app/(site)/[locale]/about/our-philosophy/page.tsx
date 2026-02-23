import type { Metadata } from 'next'
import AboutPageLayout from '@/components/about/AboutPageLayout'

export const metadata: Metadata = {
  title: 'Our Philosophy | Blackhorn Wealth Management',
  description:
    'A holistic, long-term view of managing client assets with strategic portfolio diversity and downside protection.',
}

export default function OurPhilosophyPage() {
  return (
    <AboutPageLayout
      title="Our Philosophy"
      overline="About Blackhorn"
      subtitle="We take on a holistic view of managing client assets — looking beyond traditional investment returns."
      currentSlug="our-philosophy"
    >
      <p>
        Our investment philosophy is guided by a strategic long-term view,
        emphasizing portfolio diversity with downside protection. We believe that
        wealth preservation is as important as wealth creation, and our approach
        reflects this conviction at every level.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Long-Term Strategic View
      </h2>
      <p>
        We focus on identifying enduring trends and positioning portfolios to
        benefit from structural shifts in the global economy. Short-term market
        noise does not drive our decision-making; instead, we maintain a
        disciplined, research-driven approach that prioritizes sustainable
        growth over speculative gains.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Downside Protection
      </h2>
      <p>
        Protecting capital in adverse market conditions is a cornerstone of our
        philosophy. We employ rigorous risk management techniques — including
        hedging strategies, portfolio stress testing, and dynamic asset
        allocation — to ensure that client portfolios are resilient through
        market cycles.
      </p>

      <h2 className="font-serif text-2xl font-light text-light-text pt-4">
        Beyond Traditional Returns
      </h2>
      <p>
        True wealth management extends far beyond portfolio performance. We
        consider the full picture: tax efficiency, estate and succession
        planning, philanthropic goals, and family governance. Our holistic
        approach ensures that every aspect of a client&apos;s financial life is
        aligned with their broader vision and values.
      </p>
    </AboutPageLayout>
  )
}
