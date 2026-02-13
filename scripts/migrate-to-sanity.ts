/**
 * Comprehensive Sanity Data Migration Script
 *
 * Extracts ALL hardcoded content from React components and populates Sanity,
 * including image uploads to Sanity's CDN.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/migrate-to-sanity.ts
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import path from 'path'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

// ─── Image upload helper ────────────────────────────────────────────────────

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')

async function uploadImage(
  relativePath: string,
  filename?: string
): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } } | null> {
  const filePath = path.join(PUBLIC_DIR, relativePath)
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ Image not found: ${relativePath}`)
    return null
  }
  try {
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: filename || path.basename(filePath),
    })
    console.log(`  📸 Uploaded: ${relativePath} → ${asset._id}`)
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    }
  } catch (err) {
    console.error(`  ✗ Failed to upload ${relativePath}:`, err)
    return null
  }
}

async function uploadImageForGallery(
  relativePath: string,
  caption: string
): Promise<{
  _type: 'image'
  _key: string
  caption: string
  asset: { _type: 'reference'; _ref: string }
} | null> {
  const img = await uploadImage(relativePath)
  if (!img) return null
  return {
    ...img,
    _key: path.basename(relativePath, path.extname(relativePath)),
    caption,
  }
}

// ─── Main migration ─────────────────────────────────────────────────────────

async function migrate() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Blackhorn → Sanity: Comprehensive Data Migration')
  console.log('═══════════════════════════════════════════════════\n')

  // ─── 1. SITE SETTINGS ──────────────────────────────────────────────────

  console.log('▸ Migrating Site Settings...')

  const fraudNoticeText = `Dear Clients & Investors,

Blackhorn Wealth Management Limited ("Blackhorn") has recently received a number of enquiries concerning suspected scams involving fraudsters impersonating Blackhorn to engage in fraudulent activities, with the intention of illegally deceiving clients and obtaining financial gains through the trust placed in Blackhorn. The forms of impersonation include but are not limited to:

(i) imitating Blackhorn's domain name or creating counterfeit Blackhorn websites;
(ii) impersonating Blackhorn employees to induce clients to transfer money to their bank accounts for investment and/or completing their forged investment forms to obtain personal details, etc.

Blackhorn hereby reminds all clients and investors to pay attention and stay vigilant against deception.

It is hereby specifically stated that Blackhorn's official website is https://www.blackhorngrp.com/. If any person attempts to claim himself/herself as a staff of Blackhorn and requests for your personal data and/or your bank information whilst inducing you to invest in any investment product and/or transfer money for the investment, stay vigilant and verify his/her identity by contacting us if you are in doubt. You may also report the suspected crime/scam activities to the local law enforcement authorities. Blackhorn reserves the right to discharge its responsibilities through legal means when fraudulent activities are identified.

Should you have any questions, please contact us at (852) 2709 1388 or email to info@blackhorngrp.com.

Blackhorn Wealth Management Limited
31 May 2024`

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
      'An independent wealth management organisation based in Hong Kong. Our team draws on decades of experience in private wealth and investing to provide best-in-class wealth solutions for our clients and their families.',
    trustBarStats: [
      { _key: 'exp', value: '20+', label: 'Years of Experience' },
      { _key: 'banks', value: '11', label: 'Private Bank Partners' },
      { _key: 'aum', value: '$4Bn+', label: 'Client Assets Managed' },
      { _key: 'sfc', value: 'Type 4 & 9', label: 'SFC Licensed' },
    ],
    disclaimerText:
      'Beware of scams — Blackhorn Wealth Management will never ask for payments via unofficial channels.',
    fraudNoticeText,
  })
  console.log('✓ Site Settings\n')

  // ─── 2. TEAM MEMBERS (with photo uploads) ──────────────────────────────

  console.log('▸ Migrating Team Members...')

  const teamData = [
    {
      _id: 'team-mary-chiu',
      name: 'Mary Chiu',
      slug: 'mary-chiu',
      role: 'Co-Founder',
      category: 'management',
      order: 1,
      isInvestmentCommittee: true,
      photo: '/images/team/mary-chiu.webp',
      bio: `Mary Chiu is the Founder of Blackhorn Group, which includes Blackhorn Wealth Management and Blackhorn Family Office, and she sits on the firm\u2019s investment committee. With more than 20 years of experience in the asset management and banking industry, Mary was previously with UBS AG, expanding their Global Family Office offering in Greater China by providing investment solutions across the wealth management and institutional banking platform to prominent Hong Kong families. She oversaw more than USD 4Bn of client assets invested across equities, bonds, derivatives, PE and cash management.

Mary started her banking career at Morgan Stanley, where she helped companies raise capital through IPOs and follow-on offerings and assisted Hong Kong listed companies in debt and equity capital issuances. During this time, she was on the deal team of the IPO of MGM China (USD 1.6Bn), the IPO of Swire Properties (USD 2Bn), Henderson Land\u2019s unrated bond offering (US$700MM) and Shangri-La Asia\u2019s unrated bond offering (US$600MM) among others.

Education: MBA with Distinction, Cornell University \u00b7 BA Honours (Economics & Philosophy), University of Toronto`,
    },
    {
      _id: 'team-yugi-lee',
      name: 'Yugi Lee',
      slug: 'yugi-lee',
      role: 'Co-Founder & CEO',
      category: 'management',
      order: 2,
      isInvestmentCommittee: true,
      photo: '/images/team/yugi-lee.webp',
      bio: `Yugi Lee is the Founder of Blackhorn Group, which includes Blackhorn Wealth Management and Blackhorn Family Office, and she is an executive member of the firm\u2019s investment committee. She was awarded the \u2018Outstanding CEO Award\u2019 by Capital CEO magazine in 2022.

Prior to setting up Blackhorn, Yugi served as a Director in UBS Wealth Management for over 6 years, primarily responsible for managing the assets of a number of prominent families and listed companies in Hong Kong and Mainland China. She rapidly rose within the industry, becoming a Director at the age of 25, with total assets under management in excess of USD 1 billion.

After graduating from HKUST, she embarked on her banking career at Bank of Shanghai, where she was a key member of the founding team that set up the Hong Kong Branch and obtained a restricted banking license from the Hong Kong Monetary Authority. In 2014, she worked in the Independent Wealth Management (EAM) team at Credit Suisse, providing investment and execution solutions for family offices.

Education: BBA (Economics), Hong Kong University of Science and Technology`,
    },
    {
      _id: 'team-alan-lee',
      name: 'Alan Lee',
      slug: 'alan-lee',
      role: 'Head of Investment Strategy, Managing Director',
      category: 'management',
      order: 3,
      isInvestmentCommittee: true,
      photo: '/images/team/alan-lee.webp',
      bio: `Alan Lee is the Managing Director at Blackhorn, and an executive member of the firm\u2019s investment committee. He is primarily responsible for the management of portfolios and the formulation of investment strategies. He has a proven record in Hong Kong and across Asia in the creation of value for families and individuals through customised solutions across multiple asset classes.

Prior to joining Blackhorn in 2022, Alan spent 15 years in banking with international experience spanning Hong Kong, Singapore, and Australia. He was a Director at UBS Wealth Management Hong Kong for over 8 years, and previously worked at HSBC in Singapore and Citi Australia in Private Banking.

Education: Master of Business (Finance), UTS \u00b7 BE (Telecommunications), UNSW`,
    },
    {
      _id: 'team-wilson-hui',
      name: 'Wilson Hui',
      slug: 'wilson-hui',
      role: 'Head of Wealth Solutions, Managing Director',
      category: 'management',
      order: 4,
      isInvestmentCommittee: true,
      photo: '/images/team/wilson-hui.webp',
      bio: `Wilson Hui is the Managing Director at Blackhorn and Head of Wealth Solutions. He is an executive member of the firm\u2019s investment committee and primarily focuses on managing family offices and ultra-high net-worth individuals.

With over 12 years of wealth management experience, Wilson was an Executive Director with UBS before joining Blackhorn. His expertise includes managing client relationships and implementing tailor-made wealth management solutions based on comprehensive research and market insights.

Education: LLB, University of Hong Kong`,
    },
    {
      _id: 'team-nejteh-demirian',
      name: 'Nejteh Demirian',
      slug: 'nejteh-demirian',
      role: 'Advisor',
      category: 'advisory',
      order: 1,
      isInvestmentCommittee: true,
      photo: '/images/team/nejteh-demirian.webp',
      bio: `Nejteh is Advisor to the Board at Blackhorn, and an executive member of the firm\u2019s investment committee. He is an early-stage venture investor, running a technology incubator and advises Asia-based family offices looking to institutionalise their investments. Prior to this, he was a portfolio manager and founding member of Fountainhead Partners, a leading Hong Kong based multi-family office, where he supported the establishment and management of the equities, fixed income and alternatives businesses over six years.

He has previously worked at Hashkey Digital Asset Group, the World Bank and State Street Global Markets. Before starting his career in investment management, Nejteh was a systems engineer at Thales Naval and served as an infantry reservist in the Australian Army for three years.

Nejteh holds a double degree, triple major in Mechanical Engineering (Honours), Finance and Economics from the University of Sydney. He speaks, reads and writes in English, Mandarin and Armenian and is actively involved in NGO activities dedicated to supporting orphans and victims of conflict.

Education: BE (Mechanical Engineering, Honours), BCom (Finance & Economics), University of Sydney`,
    },
    {
      _id: 'team-peter-tsang',
      name: 'Peter Tsang',
      slug: 'peter-tsang',
      role: 'Advisor',
      category: 'advisory',
      order: 2,
      isInvestmentCommittee: false,
      photo: null as string | null,
      bio: `Peter is a founding partner of a reputable local law firm and has been a practising lawyer for over 30 years. He specializes in wills, trusts, probate, estate planning, and the law of succession.

He is a member of the Probate Committee of The Law Society of Hong Kong and a Trust and Estate Practitioner (TEP) of STEP.`,
    },
    {
      _id: 'team-andrew-lo',
      name: 'Andrew Lo',
      slug: 'andrew-lo',
      role: 'Advisor',
      category: 'advisory',
      order: 3,
      isInvestmentCommittee: false,
      photo: null as string | null,
      bio: `Andrew is the founder and CEO of EFT Solutions Ltd (HKEX: 8062), specialising in electronic fund transfer solutions. He also founded eft Payments (Asia) Limited, which processed the first Alipay offline transaction in Hong Kong.`,
    },
  ]

  for (const member of teamData) {
    const photoRef = member.photo ? await uploadImage(member.photo) : null
    await client.createOrReplace({
      _id: member._id,
      _type: 'teamMember',
      name: member.name,
      slug: { _type: 'slug', current: member.slug },
      role: member.role,
      category: member.category,
      order: member.order,
      isInvestmentCommittee: member.isInvestmentCommittee,
      bio: member.bio,
      ...(photoRef ? { photo: photoRef } : {}),
    })
    console.log(`✓ Team: ${member.name}`)
  }
  console.log('')

  // ─── 3. SERVICES ───────────────────────────────────────────────────────

  console.log('▸ Migrating Services...')

  const services = [
    {
      _id: 'service-wealth-management',
      title: 'Portfolio Management',
      slug: 'wealth-management',
      icon: '\u25C7',
      shortDescription:
        'Strategic partnerships with 11 major international private banks. Institutional-grade research delivering unique, unbiased, and actionable insights from investment analysis to execution.',
      order: 1,
    },
    {
      _id: 'service-family-office',
      title: 'Family Office',
      slug: 'family-office',
      icon: '\u25C8',
      shortDescription:
        'Comprehensive family wealth governance including trusts, estate planning, philanthropy, and next-generation financial education for multigenerational legacy.',
      order: 2,
    },
    {
      _id: 'service-investment-advisory',
      title: 'Deal Sourcing',
      slug: 'investment-advisory',
      icon: '\u25BD',
      shortDescription:
        'Exclusive network and capabilities to access proprietary investments across private equity, venture capital, and niche sectors with appropriate downside protection.',
      order: 3,
    },
    {
      _id: 'service-estate-legacy',
      title: 'Legacy Planning',
      slug: 'estate-legacy',
      icon: '\u25B3',
      shortDescription:
        'Enabling clients and beneficiaries to obtain maximum value through wealth transfer across multiple generations and jurisdictions.',
      order: 4,
    },
    {
      _id: 'service-real-estate-financing',
      title: 'Real Estate & Financing',
      slug: 'real-estate-financing',
      icon: '\u25CB',
      shortDescription:
        'Structural financing and mortgages for real estate transactions, plus bespoke financing for illiquid or unique assets.',
      order: 5,
    },
  ]

  for (const svc of services) {
    await client.createOrReplace({
      _id: svc._id,
      _type: 'service',
      title: svc.title,
      slug: { _type: 'slug', current: svc.slug },
      icon: svc.icon,
      shortDescription: svc.shortDescription,
      order: svc.order,
    })
    console.log(`✓ Service: ${svc.title}`)
  }
  console.log('')

  // ─── 4. AWARDS (with image uploads) ────────────────────────────────────

  console.log('▸ Migrating Awards...')

  const awards = [
    {
      _id: 'award-lgt-2024',
      title: 'Top Valued Business Partner',
      organization: 'LGT Private Banking',
      year: 2024,
      category: 'Business Partner Excellence',
      description:
        'LGT Private Banking, one of the world\u2019s largest family-owned private banking groups, recognises its most valued external asset management partners annually.',
      image: '/images/awards/lgt-trophy-2024.webp' as string | null,
    },
    {
      _id: 'award-afd-2024',
      title: 'Gold Award \u2014 Outstanding Wealth Management',
      organization: 'Asian Fund Distributors',
      year: 2024,
      category: 'Industry Excellence',
      description:
        'Asian Fund Distributors recognises excellence among independent asset managers and wealth advisory firms across the Asia-Pacific region.',
      image: null as string | null,
    },
    {
      _id: 'award-ubs-gfim-2023',
      title: 'Outstanding Business Partner',
      organization: 'UBS GFIM HK',
      year: 2023,
      category: 'Business Partner Excellence',
      description:
        'UBS Global Financial Intermediaries Management (GFIM) recognises its top-performing external asset management partners in Hong Kong.',
      image: '/images/awards/ubs-gfim-2023.webp' as string | null,
    },
    {
      _id: 'award-wba-2023',
      title: 'Best Independent Wealth Manager \u2014 Hong Kong',
      organization: 'WealthBriefingAsia',
      year: 2023,
      category: 'Industry Excellence',
      description:
        'The WealthBriefingAsia Awards programme is one of the most prestigious in the Asian wealth management industry, recognising outstanding firms across the region.',
      image: '/images/awards/wba-banner-2022.webp' as string | null,
    },
    {
      _id: 'award-wba-2022-newcomer',
      title: 'Newcomer (Winner)',
      organization: 'WealthBriefingAsia EAM Awards',
      year: 2022,
      category: 'Newcomer',
      description:
        'Blackhorn was recognised as the top newcomer in the external asset management space at the WealthBriefingAsia EAM Awards.',
      image: null as string | null,
    },
    {
      _id: 'award-wba-2022-hk',
      title: 'EAM Based in Hong Kong (Winner)',
      organization: 'WealthBriefingAsia EAM Awards',
      year: 2022,
      category: 'Industry Excellence',
      description:
        'Blackhorn also won the category for best external asset manager based in Hong Kong at the same ceremony.',
      image: null as string | null,
    },
    {
      _id: 'award-capital-ceo-2022',
      title: 'Outstanding CEO Award (Yugi Lee)',
      organization: 'Capital CEO',
      year: 2022,
      category: 'Leadership',
      description:
        'Capital CEO magazine honours leading businesses and executives in Hong Kong. Co-Founder Yugi Lee received the Outstanding CEO Award at the 35th anniversary gala.',
      image: '/images/awards/capital-ceo-yugi-2022.webp' as string | null,
    },
    {
      _id: 'award-capital-ceo-merits-2022',
      title: 'Merits of Achievement in Banking and Finance',
      organization: 'Capital CEO',
      year: 2022,
      category: 'Leadership',
      description:
        'Capital CEO\u2019s Entrepreneur Nite 2022 recognised Blackhorn\u2019s co-founders Mary Chiu and Yugi Lee for their outstanding contributions to the banking and finance sector.',
      image: '/images/awards/capital-ceo-nite-2022.webp' as string | null,
    },
    {
      _id: 'award-apb-2022',
      title: 'Independent Asset Manager Award',
      organization: 'Asian Private Banker',
      year: 2022,
      category: 'Industry Excellence',
      description:
        'Asian Private Banker is the premier publication for the Asia private banking industry. Their IAM awards recognise the most impactful independent firms in the region.',
      image: null as string | null,
    },
  ]

  for (const award of awards) {
    const imageRef = award.image ? await uploadImage(award.image) : null
    await client.createOrReplace({
      _id: award._id,
      _type: 'award',
      title: award.title,
      organization: award.organization,
      year: award.year,
      category: award.category,
      description: award.description,
      ...(imageRef ? { image: imageRef } : {}),
    })
    console.log(`✓ Award: ${award.title} (${award.year})`)
  }
  console.log('')

  // ─── 5. PRESS ARTICLES (with image uploads) ────────────────────────────

  console.log('▸ Migrating Press Articles...')

  const pressArticles = [
    {
      _id: 'press-capital-ceo-yugi-2023',
      title: 'Pressing On Toward the Goal \u2014 Blackhorn Founder Yugi Lee',
      slug: 'capital-ceo-yugi-ceo-of-year-2023',
      publication: 'Capital CEO',
      publishDate: '2023-02-01',
      summary:
        'Capital CEO profiled Yugi Lee as CEO of the Year, covering her journey from founding member of Bank of Shanghai\u2019s Hong Kong branch to co-founding Blackhorn at age 30.',
      language: 'en',
      image: '/images/press/capital-ceo-interview-2022.webp',
    },
    {
      _id: 'press-capital-ceo-family-office-2022',
      title: 'Blackhorn Family Office \u2014 Interview with Mary Chiu & Yugi Lee',
      slug: 'capital-ceo-family-office-2022',
      publication: 'Capital CEO',
      publishDate: '2022-12-01',
      summary:
        'Capital CEO interviewed the co-founders on how Blackhorn Family Office serves prominent Hong Kong families with holistic wealth management solutions.',
      language: 'en',
      image: '/images/press/capital-ceo-family-office-2022.webp',
    },
    {
      _id: 'press-acclaim-wba-2022',
      title: 'WealthBriefingAsia EAM Awards 2022 \u2014 Blackhorn Feature',
      slug: 'acclaim-wba-feature-2022',
      publication: 'Acclaim Magazine (WealthBriefingAsia)',
      publishDate: '2022-10-01',
      summary:
        'Acclaim magazine featured Blackhorn following its double win at the WealthBriefingAsia EAM Awards \u2014 Newcomer and EAM Based in Hong Kong.',
      language: 'en',
      image: '/images/press/acclaim-cover-2022.webp',
    },
    {
      _id: 'press-srp-insight-2022',
      title: 'Structured Products Insight \u2014 Blackhorn Interview',
      slug: 'srp-insight-interview-2022',
      publication: 'SRP Insight',
      publishDate: '2022-09-15',
      summary:
        'SRP Insight interviewed Blackhorn on their approach to structured products and how they leverage multi-bank relationships to deliver institutional-quality solutions.',
      language: 'en',
      image: '/images/press/srp-insight-2022.webp',
    },
    {
      _id: 'press-founders-cover-2022',
      title: 'Yugi Lee \u2014 Founders Magazine Cover Story',
      slug: 'founders-magazine-cover-2022',
      publication: 'Founders Magazine',
      publishDate: '2022-09-01',
      summary:
        'Founders Magazine featured Yugi Lee on its cover, profiling her entrepreneurial journey and vision for building an independent wealth management firm in Hong Kong.',
      language: 'en',
      image: '/images/press/founders-cover-2022.webp',
    },
    {
      _id: 'press-apb-1b-aum-2022',
      title: 'US$1B Hong Kong IAM Eyes Recruiting 20 RMs from Top-Tier PBs by Late 2023',
      slug: 'apb-1b-iam-recruiting-2022',
      publication: 'Asian Private Banker',
      publishDate: '2022-06-15',
      summary:
        'Asian Private Banker reported on Blackhorn\u2019s rapid growth to US$1 billion in AUM and its ambitious plan to recruit 20 relationship managers from top private banks.',
      language: 'en',
      image: '/images/press/asian-private-banker-2022.webp',
    },
    {
      _id: 'press-citywire-boutique-2022',
      title: 'Ex-UBS Bankers\u2019 Boutique Aims to Double Assets to $2bn in a Year',
      slug: 'citywire-ex-ubs-boutique-2022',
      publication: 'Citywire Asia',
      publishDate: '2022-06-01',
      summary:
        'Citywire Asia covered Blackhorn\u2019s launch by former UBS wealth managers and their target to double assets under management within the first year.',
      language: 'en',
      image: '/images/press/citywire-2022.webp',
    },
  ]

  for (const article of pressArticles) {
    const imageRef = article.image ? await uploadImage(article.image) : null
    await client.createOrReplace({
      _id: article._id,
      _type: 'pressArticle',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      publication: article.publication,
      publishDate: article.publishDate,
      summary: article.summary,
      language: article.language,
      ...(imageRef
        ? { thumbnailImage: imageRef, heroImage: imageRef }
        : {}),
    })
    console.log(`✓ Press: ${article.title}`)
  }
  console.log('')

  // ─── 6. EVENTS (with hero + gallery image uploads) ─────────────────────

  console.log('▸ Migrating Events...')

  // --- Event 1: Investment Summit 2024 ---
  const summit2024Hero = await uploadImage('/images/events/event-photo-1.webp')
  const summit2024Gallery = (
    await Promise.all([
      uploadImageForGallery('/images/events/event-photo-1.webp', 'Summit keynote presentation'),
      uploadImageForGallery('/images/events/event-photo-2.webp', 'Panel discussion at the summit'),
      uploadImageForGallery('/images/events/event-photo-3.webp', 'Networking at the summit'),
      uploadImageForGallery('/images/events/event-photo-4.webp', 'Summit attendees'),
      uploadImageForGallery('/images/events/team-group.webp', 'Blackhorn team at the summit'),
      uploadImageForGallery('/images/events/founders-portrait.webp', 'Blackhorn founders at the summit'),
    ])
  ).filter(Boolean)

  await client.createOrReplace({
    _id: 'event-investment-summit-2024',
    _type: 'event',
    title: 'Blackhorn Immersive Wealth & Wellness Summit 2024',
    slug: { _type: 'slug', current: 'investment-summit-2024' },
    date: '2024-11-01',
    location: 'Hong Kong',
    description: [
      {
        _type: 'block',
        _key: 'desc1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'An exclusive gathering bringing together leading voices in wealth management, wellness, and lifestyle to explore holistic approaches to prosperity.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'desc2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'The Blackhorn Immersive Wealth & Wellness Summit 2024 brought together distinguished speakers and industry leaders for an exclusive exploration of holistic prosperity \u2014 spanning wealth strategy, technology, wellness, and legacy.',
            marks: [],
          },
        ],
      },
    ],
    ...(summit2024Hero ? { heroImage: summit2024Hero } : {}),
    gallery: summit2024Gallery,
    speakers: [
      { _key: 'sp1', name: 'Yugi Lee', title: 'Co-Founder & CEO, Blackhorn Wealth Management' },
      { _key: 'sp2', name: 'Mary Chiu', title: 'Co-Founder, Blackhorn Wealth Management' },
      { _key: 'sp3', name: 'Alan Lee', title: 'Head of Investment Strategy, Blackhorn' },
      { _key: 'sp4', name: 'Wilson Hui', title: 'Head of Wealth Solutions, Blackhorn' },
      { _key: 'sp5', name: 'Agnes Wong', title: 'Head of Fixed Income, Blackhorn' },
      { _key: 'sp6', name: 'Peter Tsang', title: 'Senior Partner, Legal Advisory' },
      { _key: 'sp7', name: 'Andrew Lo', title: 'Founder & CEO, EFT Solutions Ltd' },
      { _key: 'sp8', name: 'Dr. Vivian Lam', title: 'Wellness & Longevity Specialist' },
      { _key: 'sp9', name: 'Jason Cheung', title: 'Managing Partner, Asia-Pacific Ventures' },
      { _key: 'sp10', name: 'Nejteh Demirian', title: 'Advisory Board Member, Blackhorn' },
    ],
    ctaText: 'Request Invitation',
    ctaEmail: 'events@blackhorngrp.com',
  })
  console.log('✓ Event: Immersive Wealth & Wellness Summit 2024')

  // --- Event 2: Family Office Summit 2023 ---
  const summit2023Hero = await uploadImage('/images/events/group-event-1.webp')
  const summit2023Gallery = (
    await Promise.all([
      uploadImageForGallery('/images/events/group-event-1.webp', 'Family Office Summit 2023 group photo'),
      uploadImageForGallery('/images/events/event-photo-2.webp', 'Summit panel discussion'),
      uploadImageForGallery('/images/events/event-photo-3.webp', 'Summit networking session'),
    ])
  ).filter(Boolean)

  await client.createOrReplace({
    _id: 'event-family-office-summit-2023',
    _type: 'event',
    title: 'Family Office Summit 2023',
    slug: { _type: 'slug', current: 'family-office-summit-2023' },
    date: '2023-01-01',
    location: 'Hong Kong',
    description: [
      {
        _type: 'block',
        _key: 'desc1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'A focused forum on family office best practices, governance structures, and next-generation wealth transfer strategies.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'desc2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'The Blackhorn Family Office Summit 2023 gathered leading practitioners and families for an in-depth exploration of family office governance, wealth transfer strategies, and next-generation planning.',
            marks: [],
          },
        ],
      },
    ],
    ...(summit2023Hero ? { heroImage: summit2023Hero } : {}),
    gallery: summit2023Gallery,
    ctaText: 'Contact for Details',
    ctaEmail: 'events@blackhorngrp.com',
  })
  console.log('✓ Event: Family Office Summit 2023\n')

  // ─── 7. LEGAL PAGES ────────────────────────────────────────────────────

  console.log('▸ Migrating Legal Pages...')

  // Helper: create Portable Text blocks from plain text paragraphs
  function textToBlocks(paragraphs: string[]) {
    return paragraphs.map((text, i) => ({
      _type: 'block' as const,
      _key: `p${i}`,
      style: 'normal' as const,
      markDefs: [] as never[],
      children: [
        {
          _type: 'span' as const,
          _key: `s${i}`,
          text,
          marks: [] as never[],
        },
      ],
    }))
  }

  // 7a. Disclaimer
  await client.createOrReplace({
    _id: 'legal-disclaimer',
    _type: 'legalPage',
    title: 'Disclaimer',
    slug: { _type: 'slug', current: 'disclaimer' },
    lastUpdated: '2024-01-01',
    content: textToBlocks([
      'This website is published by Blackhorn Wealth Management Limited (\u201cBlackhorn\u201d), a corporation licensed and regulated by the Securities and Futures Commission of Hong Kong (CE Number: BNM924) for Type 4 (Advising on Securities) and Type 9 (Asset Management) regulated activities. Information contained in this website is intended for Hong Kong residents only. It shall not be regarded as an offer, solicitation, invitation, advertisement, inducement, recommendation, or representation of any kind or form whatsoever. Persons accessing this website are required to inform themselves and to comply with any restriction or regulation in any jurisdiction.',
      'All information contained within this website is confidential and proprietary and is the property of Blackhorn. All intellectual property rights relating to the information contained in this website, including without limitation all copyright and trademarks, are the property of Blackhorn. No reproduction, transmission, or distribution of any part of this website is permitted without the prior written consent of Blackhorn.',
      'Blackhorn does not accept any liability for the accuracy, timeliness, completeness, reliability, performance, or fitness for any particular purpose of the information contained in this website, or for any loss arising from any use of or reliance on information contained in this website. Investment involves risks. Past performance is not indicative of future performance. The value of investments and the income from them can go down as well as up.',
    ]),
  })
  console.log('✓ Legal: Disclaimer')

  // 7b. Complaint Handling
  await client.createOrReplace({
    _id: 'legal-complaint-handling',
    _type: 'legalPage',
    title: 'Complaint Handling',
    slug: { _type: 'slug', current: 'complaint-handling' },
    lastUpdated: '2024-01-01',
    content: textToBlocks([
      'Compliance Contact: Hotline: (852) 2709 1568 | Address: Room 705-708, 7/F, Bank of America Tower, 12 Harcourt Road, Central, Hong Kong | Email: compliance@blackhorngrp.com',
      'Upon the receipt of your complaint, we will issue an acknowledgement to you within 7 working days. We will undertake an initial assessment of the complaint and we may seek clarification from you to assist us in resolving it.',
      'Once the investigation is completed, a final response will be issued to you with our explanation and/or our appropriate action. Under normal circumstances, we endeavour to resolve the complaint at the earliest possible time or up to 2 months to resolve it.',
      'Depending on the complexity of the complaint or if there are exceptional circumstances that are beyond our control, there is a possibility that the assessment and investigation time may take longer. We will keep you updated on the status of the complaint.',
    ]),
  })
  console.log('✓ Legal: Complaint Handling')

  // 7c. Terms & Conditions
  await client.createOrReplace({
    _id: 'legal-terms-and-conditions',
    _type: 'legalPage',
    title: 'Terms & Conditions',
    slug: { _type: 'slug', current: 'terms-and-conditions' },
    lastUpdated: '2024-01-01',
    content: textToBlocks([
      'The use of the www.blackhorngrp.com website (the \u201cwebsite\u201d), requires the following terms and conditions to be fully accepted without reservation on your part.',
      'Under no circumstance should any material on the website be used or considered as an offer to sell or a solicitation of an offer to financially participate in any investment products sponsored or managed by Blackhorn\u2019s associates. The information published on this website is therefore for general information purpose only. The material on the website is provided in good faith and has been derived from sources believed to be reliable and accurate at the time of publication. However, we make no guarantees (implied or expressed) regarding the completeness, reliability, suitability, availability, correctness of the material provided. In addition, Blackhorn Wealth Management Limited may not, and has no obligation to, update the material on the website or correct any inaccuracy which subsequently becomes apparent. Furthermore, any subsequent changes on the website may be changed or withdrawn without notice. Any reliance on such information is therefore strictly at your own risk.',
      'The website may contain links or hyperlinks that will connect you to a third-party website, which Blackhorn Wealth Management Limited does not control. The information from these third-party websites is for reference only. As such, any views expressed or implied within these third-party websites does not represent the view of Blackhorn Wealth Management Limited.',
      'All personal information provided via this website will be considered strictly confidential, and we shall only use this information for internal purposes while ensuring compliance with our regulatory obligations. The content of this website is the sole property of Blackhorn Wealth Management Limited. By using this website, you agree not to copy, duplicate, store, reproduce, retransmit, distribute, disseminate, sell, publish, broadcast or circulate the contents of the website, directly or indirectly, to anyone for any purpose without our prior written consent.',
      'Under no circumstance shall Blackhorn Wealth Management Limited, its partners or its directors or employees be liable for any claims, liabilities, losses or any other damages arising out of or in any way relating to 1) any direct and indirect usage of the information provided on the website, or 2) any difficulties in accessing the website, or 3) any information extracted from third-party websites from links published on the website.',
      'By continuing to use this website, you acknowledge that you have read, understood, and agree to these terms and conditions.',
    ]),
  })
  console.log('✓ Legal: Terms & Conditions')

  // 7d. Important Notice
  await client.createOrReplace({
    _id: 'legal-important-notice',
    _type: 'legalPage',
    title: 'Important Notice',
    slug: { _type: 'slug', current: 'important-notice' },
    lastUpdated: '2024-05-31',
    content: textToBlocks([
      'Dear Clients & Investors,',
      'Blackhorn Wealth Management Limited (\u201cBlackhorn\u201d) has recently received a number of enquiries concerning suspected scams involving fraudsters impersonating Blackhorn to engage in fraudulent activities, with the intention of illegally deceiving clients and obtaining financial gains through the trust placed in Blackhorn. The forms of impersonation include but are not limited to: (i) imitating Blackhorn\u2019s domain name or creating counterfeit Blackhorn websites; (ii) impersonating Blackhorn employees to induce clients to transfer money to their bank accounts for investment and/or completing their forged investment forms to obtain personal details, etc.',
      'Blackhorn hereby reminds all clients and investors to pay attention and stay vigilant against deception.',
      'It is hereby specifically stated that Blackhorn\u2019s official website is https://www.blackhorngrp.com/. If any person attempts to claim himself/herself as a staff of Blackhorn and requests for your personal data and/or your bank information whilst inducing you to invest in any investment product and/or transfer money for the investment, stay vigilant and verify his/her identity by contacting us if you are in doubt. You may also report the suspected crime/scam activities to the local law enforcement authorities. Blackhorn reserves the right to discharge its responsibilities through legal means when fraudulent activities are identified.',
      'Should you have any questions, please contact us at (852) 2709 1388 or email to info@blackhorngrp.com.',
      'Blackhorn Wealth Management Limited \u2014 31 May 2024',
    ]),
  })
  console.log('✓ Legal: Important Notice')

  // 7e. Privacy Policy
  await client.createOrReplace({
    _id: 'legal-privacy-policy',
    _type: 'legalPage',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy-policy' },
    lastUpdated: '2024-01-01',
    content: [
      {
        _type: 'block',
        _key: 'h1',
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: 'sh1', text: '1. Introduction', marks: [] }],
      },
      {
        _type: 'block',
        _key: 'pp1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'sp1',
            text: 'Blackhorn Wealth Management Limited (\u201cBlackhorn\u201d, \u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d) is committed to protecting the privacy and security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'h2',
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: 'sh2', text: '2. Information We Collect', marks: [] }],
      },
      {
        _type: 'block',
        _key: 'pp2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'sp2',
            text: 'We may collect personal information that you voluntarily provide to us when you contact us through our website, subscribe to our communications, or engage our services. This may include your name, email address, phone number, and other information relevant to providing our services.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'h3',
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: 'sh3', text: '3. How We Use Your Information', marks: [] }],
      },
      {
        _type: 'block',
        _key: 'pp3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'sp3',
            text: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, to comply with legal obligations, and for other purposes described in this policy.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'h4',
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: 'sh4', text: '4. Data Protection', marks: [] }],
      },
      {
        _type: 'block',
        _key: 'pp4',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'sp4',
            text: 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised or unlawful processing, accidental loss, destruction, or damage.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'h5',
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: 'sh5', text: '5. Contact Us', marks: [] }],
      },
      {
        _type: 'block',
        _key: 'pp5',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'sp5',
            text: 'If you have any questions about this Privacy Policy, please contact us at info@blackhorngrp.com.',
            marks: [],
          },
        ],
      },
    ],
  })
  console.log('✓ Legal: Privacy Policy\n')

  // ─── DONE ──────────────────────────────────────────────────────────────

  console.log('═══════════════════════════════════════════════════')
  console.log('  ✅ Migration complete!')
  console.log('═══════════════════════════════════════════════════')
  console.log('')
  console.log('Summary:')
  console.log('  • 1 Site Settings singleton')
  console.log('  • 7 Team Members (4 management + 3 advisory) with photos')
  console.log('  • 5 Services')
  console.log('  • 9 Awards with images')
  console.log('  • 7 Press Articles with thumbnails')
  console.log('  • 2 Events with gallery images & speakers')
  console.log('  • 5 Legal Pages')
  console.log('')
  console.log('Total documents: 36')
}

migrate().catch((err) => {
  console.error('\n✗ Migration failed:', err)
  process.exit(1)
})
