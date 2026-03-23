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
    icon: '⮞',
    title: 'Portfolio Management',
    shortTitle: 'Portfolio Management',
    desc: 'Strategic partnerships with major international private banks. Institutional-grade research delivering unique, unbiased, and actionable insights from investment analysis to execution.',
    href: '/services/wealth-management',
  },
  {
    slug: 'family-office',
    icon: '⮞',
    title: 'Family Office',
    shortTitle: 'Family Office',
    desc: 'Comprehensive family wealth governance including trusts, estate planning, philanthropy, and next-generation financial education for multigenerational legacy.',
    href: '/services/family-office',
  },
  {
    slug: 'investment-advisory',
    icon: '⮞',
    title: 'Deal Sourcing',
    shortTitle: 'Deal Sourcing',
    desc: 'Exclusive network and capabilities to access proprietary investments across private equity, venture capital, and niche sectors with appropriate downside protection.',
    href: '/services/investment-advisory',
  },
  {
    slug: 'estate-legacy',
    icon: '⮞',
    title: 'Legacy Planning',
    shortTitle: 'Legacy Planning',
    desc: 'Enabling clients and beneficiaries to obtain maximum value through wealth transfer across multiple generations and jurisdictions.',
    href: '/services/estate-legacy',
  },
  {
    slug: 'real-estate-financing',
    icon: '⮞',
    title: 'Real Estate & Financing',
    shortTitle: 'Real Estate',
    desc: 'Structural financing and mortgages for real estate transactions, plus bespoke financing for illiquid or unique assets.',
    href: '/services/real-estate-financing',
  },
]
