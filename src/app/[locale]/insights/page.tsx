import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights | Blackhorn Wealth Management',
  description:
    'Market commentary, investment strategy, and thought leadership from the Blackhorn Wealth Management advisory team.',
  openGraph: {
    title: 'Insights | Blackhorn Wealth Management',
    description:
      'Market commentary, investment strategy, and thought leadership from the Blackhorn Wealth Management advisory team.',
  },
}

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="font-serif text-4xl text-light">Insights</h1>
    </div>
  )
}
