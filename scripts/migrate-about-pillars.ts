/**
 * About Pillars — Sanity migration
 *
 * Creates the 4 value pillar documents (Our Expertise, Philosophy, etc.)
 * Safe to run multiple times (idempotent via createOrReplace).
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/migrate-about-pillars.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

async function migratePillars() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Blackhorn → Sanity: About Pillars Migration')
  console.log('═══════════════════════════════════════════════════\n')

  const pillars = [
    {
      _id: 'about-pillar-expertise',
      title: 'Our Expertise',
      title_zh: '專業能力',
      description:
        'Our team comprises professionals with decades of experience in their respective fields. We believe that maintaining a diverse team of experts is the best way to serve our clients. From private wealth management to deal sourcing and legacy planning, our advisors will work with you to tailor custom solutions.',
      description_zh:
        '我們的團隊由在各自領域擁有數十年經驗的專業人士組成。我們深信，維持一支多元化的專家團隊是服務客戶的最佳方式。從私人財富管理到交易發掘及傳承規劃，我們的顧問將與您緊密合作，為您量身定制解決方案。',
      order: 1,
    },
    {
      _id: 'about-pillar-philosophy',
      title: 'Our Philosophy',
      title_zh: '我們的理念',
      description:
        'We take on a holistic view of managing client assets \u2013 looking beyond traditional investment returns. Our investment philosophy is guided by a strategic long-term view, emphasizing portfolio diversity with downside protection.',
      description_zh:
        '我們以全面的視角管理客戶資產——超越傳統投資回報的框架。我們的投資理念以策略性長遠視野為指引，強調投資組合多元化及下行保護。',
      order: 2,
    },
    {
      _id: 'about-pillar-commitment',
      title: 'Our Commitment to Results',
      title_zh: '成果承諾',
      description:
        'We offer institutional services on a personalized level. Our advisors are committed to deliver resilient and sustainable long-term results that are tailored to you and your family\u2019s goals.',
      description_zh:
        '我們以個人化方式提供機構級服務。我們的顧問致力為您及您的家庭目標，提供穩健且可持續的長期成果。',
      order: 3,
    },
    {
      _id: 'about-pillar-partnerships',
      title: 'Our Partnerships',
      title_zh: '合作夥伴',
      description:
        'As an external asset manager, we partner with the most reputable private banks. These trusted partnerships ensure that clients gain access to a diverse array of products and services to best suit their needs. Our advisors are able to manage portfolios across platforms to consolidate assets all under one roof.',
      description_zh:
        '作為獨立資產管理公司，我們與最具聲譽的私人銀行合作。這些可信賴的合作夥伴關係確保客戶能夠獲取多元化的產品及服務，以滿足其需求。我們的顧問能夠跨平台管理投資組合，將資產整合於一個平台之下。',
      order: 4,
    },
  ]

  for (const pillar of pillars) {
    await client.createOrReplace({
      _id: pillar._id,
      _type: 'aboutPillar',
      title: pillar.title,
      title_zh: pillar.title_zh,
      description: pillar.description,
      description_zh: pillar.description_zh,
      order: pillar.order,
    })
    console.log(`✓ Pillar: ${pillar.title}`)
  }

  console.log('\n═══════════════════════════════════════════════════')
  console.log(`  ✅ ${pillars.length} about pillars migrated successfully!`)
  console.log('═══════════════════════════════════════════════════')
}

migratePillars().catch((err) => {
  console.error('\n✗ Migration failed:', err)
  process.exit(1)
})
