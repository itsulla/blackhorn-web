import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Blackhorn Wealth Management',
  description:
    'Learn about Blackhorn Wealth Management — an independent, Hong Kong-based firm providing sophisticated investment solutions for families and institutions.',
  openGraph: {
    title: 'About | Blackhorn Wealth Management',
    description:
      'Learn about Blackhorn Wealth Management — an independent, Hong Kong-based firm providing sophisticated investment solutions for families and institutions.',
  },
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="font-serif text-4xl text-light">About</h1>
    </div>
  )
}
