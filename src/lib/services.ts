export interface ServiceItem {
  slug: string
  icon: string
  title: string
  shortTitle: string
  desc: string
  href: string
}

export const services: ServiceItem[] = [
  {
    slug: 'wealth-management',
    icon: '\u25C7',
    title: 'Wealth Management',
    shortTitle: 'Wealth Management',
    desc: 'Comprehensive portfolio construction, risk management, and investment advisory tailored to your financial objectives and risk appetite.',
    href: '/services/wealth-management',
  },
  {
    slug: 'family-office',
    icon: '\u25C8',
    title: 'Family Office Services',
    shortTitle: 'Family Office',
    desc: 'Holistic family wealth governance, succession planning, and concierge services designed for multigenerational prosperity.',
    href: '/services/family-office',
  },
  {
    slug: 'investment-advisory',
    icon: '\u25BD',
    title: 'Investment Advisory',
    shortTitle: 'Investment Advisory',
    desc: 'Curated access to global opportunities across public markets, private equity, real estate, and alternative investments.',
    href: '/services/investment-advisory',
  },
  {
    slug: 'estate-legacy',
    icon: '\u25CB',
    title: 'Estate & Legacy Planning',
    shortTitle: 'Estate & Legacy',
    desc: 'Strategic estate structuring, philanthropic planning, and wealth transfer solutions to secure your family\u2019s lasting legacy.',
    href: '/services/estate-legacy',
  },
]
