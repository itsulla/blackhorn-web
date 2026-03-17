import type { CMSTeamMember } from '@/lib/sanity/fetch'

// ─── TeamMember Interface ──────────────────────────────────────────────────

export interface TeamMember {
  name: string
  name_zh?: string
  title: string
  title_zh?: string
  image?: string
  blurDataURL?: string
  initials: string
  bio: string[]
  bio_zh?: string[]
  education?: string
  education_zh?: string
}

// ─── CMS → Local Converter ────────────────────────────────────────────────

export function cmsToTeamMember(cms: CMSTeamMember): TeamMember {
  const nameParts = cms.name.split(' ')
  const initials =
    nameParts.length >= 2
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : cms.name.substring(0, 2).toUpperCase()

  return {
    name: cms.name,
    name_zh: cms.name_zh,
    title: cms.role,
    title_zh: cms.role_zh,
    image: cms.photoUrl || undefined,
    initials,
    bio: cms.bio ? cms.bio.split('\n\n').filter(Boolean) : [cms.role],
    bio_zh: cms.bio_zh ? cms.bio_zh.split('\n\n').filter(Boolean) : undefined,
  }
}

// ─── Management Team Data (hardcoded fallback) ─────────────────────────────

export const managementTeam: TeamMember[] = [
  {
    name: 'Mary Chiu',
    title: 'Co-Founder',
    image: '/images/team/mary-chiu.webp',
    blurDataURL: 'data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAwBACdASoUABQAPzmGvVavKCajsBgIAeAnCWUAADE5JxDbZC9UksG0uEAA/ucudnOgqEZcjlU5z9GToxLiJf0luh9qDh+HYV2IgNT623HwsHXYPGiCjioDzL2gF2sGV0AAAA==',
    initials: 'MC',
    bio: [
      'Mary Chiu is the Founder of Blackhorn Group, which includes Blackhorn Wealth Management and Blackhorn Family Office, and she sits on the firm\u2019s investment committee. With more than 20 years of experience in the asset management and banking industry, Mary was previously with UBS AG, expanding their Global Family Office offering in Greater China by providing investment solutions across the wealth management and institutional banking platform to prominent Hong Kong families. She oversaw more than USD 4Bn of client assets invested across equities, bonds, derivatives, PE and cash management.',
      'Mary started her banking career at Morgan Stanley, where she helped companies raise capital through IPOs and follow-on offerings and assisted Hong Kong listed companies in debt and equity capital issuances. During this time, she was on the deal team of the IPO of MGM China (USD 1.6Bn), the IPO of Swire Properties (USD 2Bn), Henderson Land\u2019s unrated bond offering (US$700MM) and Shangri-La Asia\u2019s unrated bond offering (US$600MM) among others.',
    ],
    education:
      'MBA with Distinction, Cornell University \u00b7 BA Honours (Economics & Philosophy), University of Toronto',
  },
  {
    name: 'Yugi Lee',
    title: 'Co-Founder & CEO',
    image: '/images/team/yugi-lee.webp',
    blurDataURL: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAACwBACdASoUABQAPzmSvFgvKiWjqAqp4CcJZwAAMAGbk+XiMSVE8K6A8Ir4IlLAAP7ZXyNQABJWeos+kQPmbvUKi792DLUmKAIMvwSult/TfGmDpgmqUVs9nhdYHlvN4YwyWGcpvWW3RMLQd+yeTFsk5/gzqVA2AAAAAA==',
    initials: 'YL',
    bio: [
      'Yugi Lee is the Founder of Blackhorn Group, which includes Blackhorn Wealth Management and Blackhorn Family Office, and she is an executive member of the firm\u2019s investment committee. She was awarded the \u2018Outstanding CEO Award\u2019 by Capital CEO magazine in 2022.',
      'Prior to setting up Blackhorn, Yugi served as a Director in UBS Wealth Management for over 6 years, primarily responsible for managing the assets of a number of prominent families and listed companies in Hong Kong and Mainland China. She rapidly rose within the industry, becoming a Director at the age of 25, with total assets under management in excess of USD 1 billion.',
      'After graduating from HKUST, she embarked on her banking career at Bank of Shanghai, where she was a key member of the founding team that set up the Hong Kong Branch and obtained a restricted banking license from the Hong Kong Monetary Authority. In 2014, she worked in the Independent Wealth Management (EAM) team at Credit Suisse, providing investment and execution solutions for family offices.',
    ],
    education:
      'BBA (Economics), Hong Kong University of Science and Technology',
  },
  {
    name: 'Alan Lee',
    title: 'Head of Investment Strategy, Managing Director',
    image: '/images/team/alan-lee.webp',
    blurDataURL: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAADQBACdASoUABQAPzmSulgvKiUjqAqp4CcJZwDNhBDRF4N7iZL1i2UZBXxrBasnwAD+5x+krepkC6j25pEA+Ep9Mam7zmoGscrOy17BKTBlRMqBN9KMOIt57+1SGJwGRkoQRE2ziD4WKGuMPk4qO9S35AuQg0qksAAAAA==',
    initials: 'AL',
    bio: [
      'Alan Lee is the Managing Director at Blackhorn, and an executive member of the firm\u2019s investment committee. He is primarily responsible for the management of portfolios and the formulation of investment strategies. He has a proven record in Hong Kong and across Asia in the creation of value for families and individuals through customised solutions across multiple asset classes.',
      'Prior to joining Blackhorn in 2022, Alan spent 15 years in banking with international experience spanning Hong Kong, Singapore, and Australia. He was a Director at UBS Wealth Management Hong Kong for over 8 years, and previously worked at HSBC in Singapore and Citi Australia in Private Banking.',
    ],
    education:
      'Master of Business (Finance), UTS \u00b7 BE (Telecommunications), UNSW',
  },
  {
    name: 'Wilson Hui',
    title: 'Head of Wealth Solutions, Managing Director',
    image: '/images/team/wilson-hui.webp',
    blurDataURL: 'data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAAAQBQCdASoUABQAPzmUwFmvKiajqAgB4CcJZwDBzBBfz2c3SJgrx6c53RTP7RD2jZJwAP7D75NTqlzA5yTXPPqvevIrXQv+S7+OOCarOzMU2ZykuK1a07ce+sDqYg/CWI9a2+a/x/9Hv2e/ylFyFRbHS0AFhXb3swAAAA==',
    initials: 'WH',
    bio: [
      'Wilson Hui is the Managing Director at Blackhorn and Head of Wealth Solutions. He is an executive member of the firm\u2019s investment committee and primarily focuses on managing family offices and ultra-high net-worth individuals.',
      'With over 12 years of wealth management experience, Wilson was an Executive Director with UBS before joining Blackhorn. His expertise includes managing client relationships and implementing tailor-made wealth management solutions based on comprehensive research and market insights.',
    ],
    education: 'LLB, University of Hong Kong',
  },
]

// ─── Advisory Board Data ───────────────────────────────────────────────────

export const advisoryBoard: TeamMember[] = [
  {
    name: 'Nejteh Demirian',
    title: 'Advisor',
    image: '/images/team/nejteh-demirian.webp',
    blurDataURL: 'data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAQBACdASoUABQAPzmIvFSvKSYjKA1R4CcJZQDNwAUGxY3AGLEoiZvHgADVRfcQTnHEfgMlhJdbRLk8/IVy31wVAOlWjDet/HNWUPIcEjA3U3xThuOLZgAAAAA=',
    initials: 'ND',
    bio: [
      'Nejteh is Advisor to the Board at Blackhorn, and an executive member of the firm\u2019s investment committee. He is an early-stage venture investor, running a technology incubator and advises Asia-based family offices looking to institutionalise their investments. Prior to this, he was a portfolio manager and founding member of Fountainhead Partners, a leading Hong Kong based multi-family office, where he supported the establishment and management of the equities, fixed income and alternatives businesses over six years.',
      'He has previously worked at Hashkey Digital Asset Group, the World Bank and State Street Global Markets. Before starting his career in investment management, Nejteh was a systems engineer at Thales Naval and served as an infantry reservist in the Australian Army for three years.',
      'Nejteh holds a double degree, triple major in Mechanical Engineering (Honours), Finance and Economics from the University of Sydney. He speaks, reads and writes in English, Mandarin and Armenian and is actively involved in NGO activities dedicated to supporting orphans and victims of conflict.',
    ],
    education:
      'BE (Mechanical Engineering, Honours), BCom (Finance & Economics), University of Sydney',
  },
  {
    name: 'Peter Tsang',
    title: 'Advisor',
    initials: 'PT',
    bio: [
      'Peter is a founding partner of a reputable local law firm and has been a practising lawyer for over 30 years. He specializes in wills, trusts, probate, estate planning, and the law of succession.',
      'He is a member of the Probate Committee of The Law Society of Hong Kong and a Trust and Estate Practitioner (TEP) of STEP.',
    ],
  },
  {
    name: 'Andrew Lo',
    title: 'Advisor',
    initials: 'AL',
    bio: [
      'Andrew is the founder and CEO of EFT Solutions Ltd (HKEX: 8062), specialising in electronic fund transfer solutions. He also founded eft Payments (Asia) Limited, which processed the first Alipay offline transaction in Hong Kong.',
    ],
  },
]

// ─── About Sub-Page Links ──────────────────────────────────────────────────

export interface AboutItem {
  slug: string
  icon: string
  title: string
  shortTitle: string
  desc: string
  href: string
}

export const aboutLinks: AboutItem[] = [
  {
    slug: 'our-expertise',
    icon: '⮞',
    title: 'Our Expertise',
    shortTitle: 'Expertise',
    desc: 'A diverse team of professionals with decades of experience across private wealth management, deal sourcing, and legacy planning.',
    href: '/about/our-expertise',
  },
  {
    slug: 'our-philosophy',
    icon: '⮞',
    title: 'Our Philosophy',
    shortTitle: 'Philosophy',
    desc: 'A holistic, long-term view of managing client assets with strategic portfolio diversity and downside protection.',
    href: '/about/our-philosophy',
  },
  {
    slug: 'commitment-to-results',
    icon: '⮞',
    title: 'Commitment to Results',
    shortTitle: 'Results',
    desc: 'Institutional services delivered on a personalized level — resilient and sustainable results tailored to your goals.',
    href: '/about/commitment-to-results',
  },
  {
    slug: 'partnerships',
    icon: '⮞',
    title: 'Our Partnerships',
    shortTitle: 'Partnerships',
    desc: 'Strategic partnerships with 11 major international private banks, giving clients access to a diverse array of products under one roof.',
    href: '/about/partnerships',
  },
  {
    slug: 'leadership',
    icon: '⮞',
    title: 'Leadership',
    shortTitle: 'Leadership',
    desc: 'Meet our management team — experienced professionals from UBS, Morgan Stanley, Credit Suisse, and HSBC.',
    href: '/about/leadership',
  },
  {
    slug: 'advisors',
    icon: '⮞',
    title: 'Advisory Board',
    shortTitle: 'Advisors',
    desc: 'Our advisory board brings specialized expertise in venture investing, legal estate planning, and fintech.',
    href: '/about/advisors',
  },
]
