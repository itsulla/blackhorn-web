import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers | Blackhorn Wealth Management',
  description:
    'Explore career opportunities at Blackhorn Wealth Management. Join our team of professionals in Hong Kong.',
  openGraph: {
    title: 'Careers | Blackhorn Wealth Management',
    description:
      'Explore career opportunities at Blackhorn Wealth Management. Join our team of professionals in Hong Kong.',
  },
}

export default function CareersPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="font-serif text-4xl text-light">Careers</h1>
    </div>
  )
}
