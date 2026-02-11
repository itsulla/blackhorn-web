import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Awards & Recognition | Blackhorn Wealth Management',
  description:
    'Industry recognition and awards received by Blackhorn Wealth Management for excellence in wealth management and advisory services.',
  openGraph: {
    title: 'Awards & Recognition | Blackhorn Wealth Management',
    description:
      'Industry recognition and awards received by Blackhorn Wealth Management for excellence in wealth management and advisory services.',
  },
}

export default function AwardsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="font-serif text-4xl text-light">Awards</h1>
    </div>
  )
}
