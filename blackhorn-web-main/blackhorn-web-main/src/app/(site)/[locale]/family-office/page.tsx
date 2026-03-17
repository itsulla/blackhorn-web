import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Family Office | Blackhorn Wealth Management',
  description:
    'Holistic family wealth governance, succession planning, and concierge services designed for multigenerational prosperity.',
  openGraph: {
    title: 'Family Office | Blackhorn Wealth Management',
    description:
      'Holistic family wealth governance, succession planning, and concierge services designed for multigenerational prosperity.',
  },
}

export default function FamilyOfficePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="font-serif text-4xl text-light">Family Office</h1>
    </div>
  )
}
