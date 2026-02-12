/**
 * Sanity Data Migration Script
 *
 * Run ONCE after schemas are deployed to populate Sanity with existing
 * hardcoded content. Uses the write client with the SANITY_API_TOKEN.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-sanity.ts
 *
 * NOTE: Team member photos need to be uploaded manually via the Studio UI
 * or extended with the Sanity asset upload API.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
import { createClient } from '@sanity/client'

// Load .env.local — run with: npx tsx --env-file=.env.local scripts/migrate-to-sanity.ts

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

async function migrate() {
  console.log('Starting Sanity data migration...\n')

  // ─── 1. Site Settings ──────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    companyName: 'Blackhorn Wealth Management Limited',
    phone: '+852 2709 1388',
    email: 'info@blackhorngrp.com',
    careersEmail: 'careers@blackhorngrp.com',
    complianceEmail: 'compliance@blackhorngrp.com',
    compliancePhone: '+852 2709 1568',
    address:
      'Room 705-708, 7/F, Bank of America Tower, 12 Harcourt Road, Central, Hong Kong',
    sfcLicense: 'BNM924',
    sfcTypes: 'Type 4 & Type 9',
    linkedinUrl:
      'https://www.linkedin.com/company/blackhorn-wealth-management/',
    heroHeading: 'Intelligent Solutions Beyond Simple Wealth Management',
    heroSubtext: 'Independent Wealth Management',
    missionStatement:
      'Blackhorn Wealth Management is an independent wealth management organisation based in Hong Kong. Our team draws on decades of experience in private wealth and investing to provide best-in-class wealth solutions for our clients and their families.',
    trustBarStats: [
      { _key: 'exp', value: '20+', label: 'Years Experience' },
      { _key: 'banks', value: '11', label: 'Bank Partners' },
      { _key: 'aum', value: '$4Bn+', label: 'AUM' },
      { _key: 'sfc', value: 'Type 4 & 9', label: 'SFC Licensed' },
    ],
    disclaimerText:
      'Beware of scams — Blackhorn Wealth Management will never ask for payments via unofficial channels.',
  })
  console.log('✓ Site Settings')

  // ─── 2. Team Members ──────────────────────────────────────────────────────
  const teamMembers = [
    {
      _id: 'team-mary-chiu',
      _type: 'teamMember' as const,
      name: 'Mary Chiu',
      slug: { _type: 'slug' as const, current: 'mary-chiu' },
      role: 'Co-Founder',
      category: 'management',
      order: 1,
      isInvestmentCommittee: true,
      bio: `Mary Chiu is the Founder of Blackhorn Group, which includes Blackhorn Wealth Management and Blackhorn Family Office, and she sits on the firm\u2019s investment committee. With more than 20 years of experience in the asset management and banking industry, Mary was previously with UBS AG, expanding their Global Family Office offering in Greater China by providing investment solutions across the wealth management and institutional banking platform to prominent Hong Kong families. She oversaw more than USD 4Bn of client assets invested across equities, bonds, derivatives, PE and cash management.

Mary started her banking career at Morgan Stanley, where she helped companies raise capital through IPOs and follow-on offerings and assisted Hong Kong listed companies in debt and equity capital issuances. During this time, she was on the deal team of the IPO of MGM China (USD 1.6Bn), the IPO of Swire Properties (USD 2Bn), Henderson Land\u2019s unrated bond offering (US$700MM) and Shangri-La Asia\u2019s unrated bond offering (US$600MM) among others.`,
    },
    {
      _id: 'team-yugi-lee',
      _type: 'teamMember' as const,
      name: 'Yugi Lee',
      slug: { _type: 'slug' as const, current: 'yugi-lee' },
      role: 'Co-Founder & CEO',
      category: 'management',
      order: 2,
      isInvestmentCommittee: true,
      bio: `Yugi Lee is the Founder of Blackhorn Group, which includes Blackhorn Wealth Management and Blackhorn Family Office, and she is an executive member of the firm\u2019s investment committee. She was awarded the \u2018Outstanding CEO Award\u2019 by Capital CEO magazine in 2022.

Prior to setting up Blackhorn, Yugi served as a Director in UBS Wealth Management for over 6 years, primarily responsible for managing the assets of a number of prominent families and listed companies in Hong Kong and Mainland China. She rapidly rose within the industry, becoming a Director at the age of 25, with total assets under management in excess of USD 1 billion.

After graduating from HKUST, she embarked on her banking career at Bank of Shanghai, where she was a key member of the founding team that set up the Hong Kong Branch and obtained a restricted banking license from the Hong Kong Monetary Authority. In 2014, she worked in the Independent Wealth Management (EAM) team at Credit Suisse, providing investment and execution solutions for family offices.`,
    },
    {
      _id: 'team-alan-lee',
      _type: 'teamMember' as const,
      name: 'Alan Lee',
      slug: { _type: 'slug' as const, current: 'alan-lee' },
      role: 'Head of Investment Strategy, Managing Director',
      category: 'management',
      order: 3,
      isInvestmentCommittee: true,
      bio: `Alan Lee is the Managing Director at Blackhorn, and an executive member of the firm\u2019s investment committee. He is primarily responsible for the management of portfolios and the formulation of investment strategies. He has a proven record in Hong Kong and across Asia in the creation of value for families and individuals through customised solutions across multiple asset classes.

Prior to joining Blackhorn in 2022, Alan spent 15 years in banking with international experience spanning Hong Kong, Singapore, and Australia. He was a Director at UBS Wealth Management Hong Kong for over 8 years, and previously worked at HSBC in Singapore and Citi Australia in Private Banking.`,
    },
    {
      _id: 'team-wilson-hui',
      _type: 'teamMember' as const,
      name: 'Wilson Hui',
      slug: { _type: 'slug' as const, current: 'wilson-hui' },
      role: 'Head of Wealth Solutions, Managing Director',
      category: 'management',
      order: 4,
      isInvestmentCommittee: true,
      bio: `Wilson Hui is the Managing Director at Blackhorn and Head of Wealth Solutions. He is an executive member of the firm\u2019s investment committee and primarily focuses on managing family offices and ultra-high net-worth individuals.

With over 12 years of wealth management experience, Wilson was an Executive Director with UBS before joining Blackhorn. His expertise includes managing client relationships and implementing tailor-made wealth management solutions based on comprehensive research and market insights.`,
    },
    {
      _id: 'team-nejteh-demirian',
      _type: 'teamMember' as const,
      name: 'Nejteh Demirian',
      slug: { _type: 'slug' as const, current: 'nejteh-demirian' },
      role: 'Advisor to the Board',
      category: 'advisory',
      order: 1,
      isInvestmentCommittee: true,
      bio: `Nejteh is Advisor to the Board at Blackhorn, and an executive member of the firm\u2019s investment committee. He is an early-stage venture investor, running a technology incubator and advises Asia-based family offices looking to institutionalise their investments. Prior to this, he was a portfolio manager and founding member of Fountainhead Partners, a leading Hong Kong based multi-family office, where he supported the establishment and management of the equities, fixed income and alternatives businesses over six years.

He has previously worked at Hashkey Digital Asset Group, the World Bank and State Street Global Markets. Before starting his career in investment management, Nejteh was a systems engineer at Thales Naval and served as an infantry reservist in the Australian Army for three years.

Nejteh holds a double degree, triple major in Mechanical Engineering (Honours), Finance and Economics from the University of Sydney. He speaks, reads and writes in English, Mandarin and Armenian and is actively involved in NGO activities dedicated to supporting orphans and victims of conflict.`,
    },
    {
      _id: 'team-peter-tsang',
      _type: 'teamMember' as const,
      name: 'Peter Tsang',
      slug: { _type: 'slug' as const, current: 'peter-tsang' },
      role: 'Senior Advisor \u2014 Legal',
      category: 'advisory',
      order: 2,
      isInvestmentCommittee: false,
      bio: `Peter is a founding partner of a reputable local law firm and has been a practising lawyer for over 30 years. He specializes in wills, trusts, probate, estate planning, and the law of succession.

He is a member of the Probate Committee of The Law Society of Hong Kong and a Trust and Estate Practitioner (TEP) of STEP.`,
    },
    {
      _id: 'team-andrew-lo',
      _type: 'teamMember' as const,
      name: 'Andrew Lo',
      slug: { _type: 'slug' as const, current: 'andrew-lo' },
      role: 'Senior Advisor \u2014 Business Development',
      category: 'advisory',
      order: 3,
      isInvestmentCommittee: false,
      bio: `Andrew is the founder and CEO of EFT Solutions Ltd (HKEX: 8062), specialising in electronic fund transfer solutions. He also founded eft Payments (Asia) Limited, which processed the first Alipay offline transaction in Hong Kong.`,
    },
  ]

  for (const member of teamMembers) {
    await client.createOrReplace(member)
    console.log(`✓ Team: ${member.name}`)
  }

  // ─── 3. Services ──────────────────────────────────────────────────────────
  const services = [
    {
      _id: 'service-wealth-management',
      _type: 'service' as const,
      title: 'Portfolio Management',
      slug: { _type: 'slug' as const, current: 'wealth-management' },
      icon: '\u25C7',
      shortDescription:
        'Strategic partnerships with 11 major international private banks. Institutional-grade research delivering unique, unbiased, and actionable insights from investment analysis to execution.',
      order: 1,
    },
    {
      _id: 'service-family-office',
      _type: 'service' as const,
      title: 'Family Office',
      slug: { _type: 'slug' as const, current: 'family-office' },
      icon: '\u25C8',
      shortDescription:
        'Comprehensive family wealth governance including trusts, estate planning, philanthropy, and next-generation financial education for multigenerational legacy.',
      order: 2,
    },
    {
      _id: 'service-investment-advisory',
      _type: 'service' as const,
      title: 'Deal Sourcing',
      slug: { _type: 'slug' as const, current: 'investment-advisory' },
      icon: '\u25BD',
      shortDescription:
        'Exclusive network and capabilities to access proprietary investments across private equity, venture capital, and niche sectors with appropriate downside protection.',
      order: 3,
    },
    {
      _id: 'service-estate-legacy',
      _type: 'service' as const,
      title: 'Legacy Planning',
      slug: { _type: 'slug' as const, current: 'estate-legacy' },
      icon: '\u25B3',
      shortDescription:
        'Enabling clients and beneficiaries to obtain maximum value through wealth transfer across multiple generations and jurisdictions.',
      order: 4,
    },
    {
      _id: 'service-real-estate-financing',
      _type: 'service' as const,
      title: 'Real Estate & Financing',
      slug: { _type: 'slug' as const, current: 'real-estate-financing' },
      icon: '\u25CB',
      shortDescription:
        'Structural financing and mortgages for real estate transactions, plus bespoke financing for illiquid or unique assets.',
      order: 5,
    },
  ]

  for (const service of services) {
    await client.createOrReplace(service)
    console.log(`✓ Service: ${service.title}`)
  }

  // ─── 4. Awards ────────────────────────────────────────────────────────────
  const awards = [
    {
      _id: 'award-wba-2024-ind',
      _type: 'award' as const,
      title: 'Best Independent Wealth Manager — Greater China & North Asia',
      organization: 'WealthBriefingAsia',
      year: 2024,
      category: 'Industry Excellence',
    },
    {
      _id: 'award-wba-2024-new',
      _type: 'award' as const,
      title: 'Newcomer/Start-up of the Year',
      organization: 'WealthBriefingAsia',
      year: 2024,
      category: 'Newcomer',
    },
    {
      _id: 'award-lgt-2024',
      _type: 'award' as const,
      title: 'Top Valued Business Partner (Platinum)',
      organization: 'LGT Private Banking',
      year: 2024,
      category: 'Business Partner Excellence',
    },
    {
      _id: 'award-wba-2023-ind',
      _type: 'award' as const,
      title: 'Best Independent Wealth Manager — Greater China',
      organization: 'WealthBriefingAsia',
      year: 2023,
      category: 'Industry Excellence',
    },
    {
      _id: 'award-lgt-2023',
      _type: 'award' as const,
      title: 'Top Valued Business Partner (Gold)',
      organization: 'LGT Private Banking',
      year: 2023,
      category: 'Business Partner Excellence',
    },
    {
      _id: 'award-capital-ceo-2022',
      _type: 'award' as const,
      title: 'Outstanding CEO Award — Yugi Lee',
      organization: 'Capital CEO Magazine',
      year: 2022,
      category: 'Leadership',
    },
    {
      _id: 'award-wba-2022-ind',
      _type: 'award' as const,
      title: 'Best Independent Wealth Manager — Greater China',
      organization: 'WealthBriefingAsia',
      year: 2022,
      category: 'Industry Excellence',
    },
    {
      _id: 'award-wba-2022-new',
      _type: 'award' as const,
      title: 'Newcomer/Start-up of the Year',
      organization: 'WealthBriefingAsia',
      year: 2022,
      category: 'Newcomer',
    },
    {
      _id: 'award-lgt-2022',
      _type: 'award' as const,
      title: 'Top Valued Business Partner (Gold)',
      organization: 'LGT Private Banking',
      year: 2022,
      category: 'Business Partner Excellence',
    },
  ]

  for (const award of awards) {
    await client.createOrReplace(award)
    console.log(`✓ Award: ${award.title} (${award.year})`)
  }

  // ─── 5. Press Articles ────────────────────────────────────────────────────
  const pressArticles = [
    {
      _id: 'press-capital-ceo-2023',
      _type: 'pressArticle' as const,
      title: 'Yugi Lee Named CEO of the Year 2023',
      slug: {
        _type: 'slug' as const,
        current: 'capital-ceo-yugi-ceo-of-year-2023',
      },
      publication: 'Capital CEO Magazine',
      publishDate: '2023-02-01',
      summary:
        'Blackhorn CEO Yugi Lee recognised by Capital CEO for leadership in independent wealth management.',
      language: 'en',
      titleChinese: '\u8CC7\u672C\u624D\u4FCE\u96DC\u8A8C — \u5091\u51FA\u884C\u653F\u7E3D\u88C1\u734E',
    },
    {
      _id: 'press-apb-launch-2022',
      _type: 'pressArticle' as const,
      title:
        'Ex-UBS private banker duo launches multi-family office in Hong Kong',
      slug: {
        _type: 'slug' as const,
        current: 'apb-ex-ubs-duo-launches-mfo-2022',
      },
      publication: 'Asian Private Banker',
      publishDate: '2022-01-01',
      summary:
        'Mary Chiu and Yugi Lee left UBS to co-found Blackhorn, bringing over USD 4 billion in combined AUM experience.',
      externalUrl:
        'https://asianprivatebanker.com/people-moves/ex-ubs-private-banker-duo-launches-multi-family-office-in-hong-kong/',
      language: 'en',
    },
    {
      _id: 'press-citywire-boutique-2022',
      _type: 'pressArticle' as const,
      title:
        "Ex-UBS bankers' boutique firm wins wealth management award",
      slug: {
        _type: 'slug' as const,
        current: 'citywire-ex-ubs-boutique-wins-award-2022',
      },
      publication: 'Citywire Asia',
      publishDate: '2022-11-01',
      summary:
        'Blackhorn won Best Independent Wealth Manager at the WealthBriefingAsia Awards, recognised for client-first approach.',
      externalUrl:
        'https://citywire.com/asia/news/ex-ubs-bankers-boutique-firm-wins-wealth-management-award/',
      language: 'en',
    },
    {
      _id: 'press-citywire-mary-networking-2022',
      _type: 'pressArticle' as const,
      title:
        'Ex-UBS banker Mary Chiu on building a multi-family office through networking',
      slug: {
        _type: 'slug' as const,
        current: 'citywire-mary-chiu-networking-2022',
      },
      publication: 'Citywire Asia',
      publishDate: '2022-06-01',
      summary:
        'Mary Chiu discusses leveraging networks to scale Blackhorn and serve HNW families.',
      externalUrl:
        'https://citywire.com/asia/news/ex-ubs-banker-mary-chiu-on-building-a-multi-family-office-through-networking/',
      language: 'en',
    },
    {
      _id: 'press-citywire-ubs-breakaway-2021',
      _type: 'pressArticle' as const,
      title: 'UBS breakaway launches boutique wealth firm',
      slug: {
        _type: 'slug' as const,
        current: 'citywire-ubs-breakaway-launches-boutique-2021',
      },
      publication: 'Citywire Asia',
      publishDate: '2021-03-01',
      summary:
        'Founding story — Yugi Lee departs UBS to launch Blackhorn as a boutique advisory firm.',
      externalUrl:
        'https://citywire.com/asia/news/ubs-breakaway-launches-boutique-wealth-firm/',
      language: 'en',
    },
    {
      _id: 'press-apb-blackhorn-feature-2023',
      _type: 'pressArticle' as const,
      title: 'Blackhorn Wealth Management — Asian Private Banker Feature',
      slug: {
        _type: 'slug' as const,
        current: 'apb-blackhorn-feature-2023',
      },
      publication: 'Asian Private Banker',
      publishDate: '2023-06-01',
      summary:
        'A spotlight on the fast growth of Blackhorn as an emerging EAM in Greater China.',
      language: 'en',
    },
    {
      _id: 'press-citywire-hk-eam-2023',
      _type: 'pressArticle' as const,
      title:
        'Citywire Hong Kong EAM Spotlight — Blackhorn Wealth Management',
      slug: {
        _type: 'slug' as const,
        current: 'citywire-hk-eam-spotlight-2023',
      },
      publication: 'Citywire Asia',
      publishDate: '2023-09-01',
      summary:
        'Citywire profiles Blackhorn as part of their EAM industry analysis in Hong Kong.',
      language: 'en',
    },
  ]

  for (const article of pressArticles) {
    await client.createOrReplace(article)
    console.log(`✓ Press: ${article.title}`)
  }

  // ─── 6. Events ────────────────────────────────────────────────────────────
  const events = [
    {
      _id: 'event-investment-summit-2024',
      _type: 'event' as const,
      title: 'Investment Summit 2024',
      slug: { _type: 'slug' as const, current: 'investment-summit-2024' },
      date: '2024-03-15',
      location: 'Hong Kong',
      ctaText: 'Request Invitation',
      ctaEmail: 'events@blackhorngrp.com',
    },
    {
      _id: 'event-family-office-summit-2023',
      _type: 'event' as const,
      title: 'Family Office Summit 2023',
      slug: { _type: 'slug' as const, current: 'family-office-summit-2023' },
      date: '2023-11-10',
      location: 'Hong Kong',
      ctaText: 'Contact for Details',
      ctaEmail: 'events@blackhorngrp.com',
    },
  ]

  for (const event of events) {
    await client.createOrReplace(event)
    console.log(`✓ Event: ${event.title}`)
  }

  console.log('\n✅ Migration complete!')
  console.log('\nNOTE: Team member photos need to be uploaded manually via Sanity Studio.')
  console.log('Award images also need to be uploaded via Studio.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
