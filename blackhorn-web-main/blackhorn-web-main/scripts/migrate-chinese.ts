/**
 * Chinese Content Migration Script
 *
 * Patches existing Sanity documents with draft Chinese translations.
 * Only populates short fields (titles, roles, short descriptions).
 * Long-form content (bios, full page content) is left empty for Rachel
 * to fill in or commission professional translation.
 *
 * Usage:
 *   pnpm exec tsx --env-file=.env.local scripts/migrate-chinese.ts
 *
 * Safe to re-run — uses patch operations (won't overwrite existing _zh values).
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function patchIfMissing(
  docId: string,
  field: string,
  value: string
): Promise<boolean> {
  const doc = await client.getDocument(docId)
  if (!doc) {
    console.warn(`  ⚠ Document not found: ${docId}`)
    return false
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((doc as any)[field]) {
    console.log(`  ⏭ ${field} already set on ${docId}, skipping`)
    return false
  }
  await client.patch(docId).set({ [field]: value }).commit()
  console.log(`  ✓ Set ${field} on ${docId}`)
  return true
}

// ─── Team Members ─────────────────────────────────────────────────────────────
// Keyed by actual Sanity `name` field values

const teamChinese: Record<string, { name_zh: string; role_zh: string }> = {
  'Mary Chiu': { name_zh: '趙思', role_zh: '聯合創辦人' },
  'Yugi Lee': { name_zh: '李汶臻', role_zh: '聯合創辦人兼行政總裁' },
  'Alan Lee': { name_zh: '李田忠 Alan', role_zh: '投資策略總監、董事總經理' },
  'Wilson Hui': { name_zh: '許永鏗', role_zh: '財富方案總監、董事總經理' },
  'Nejteh Demirian': { name_zh: '内特·德米里安', role_zh: '董事會顧問' },
  'Peter Tsang': { name_zh: '曾金泉 Peter', role_zh: '法律顧問' },
  'Andrew Lo': { name_zh: '勞俊傑 Andrew', role_zh: '董事會顧問' },
}

async function migrateTeamMembers() {
  console.log('\n── Team Members ──')
  const members = await client.fetch<Array<{ _id: string; name: string }>>(
    `*[_type == "teamMember"]{ _id, name }`
  )

  for (const member of members) {
    const zh = teamChinese[member.name]
    if (!zh) {
      console.log(`  ⏭ No Chinese data for: ${member.name}`)
      continue
    }
    await patchIfMissing(member._id, 'name_zh', zh.name_zh)
    await patchIfMissing(member._id, 'role_zh', zh.role_zh)
    // bio_zh left empty — needs professional translation
  }
}

// ─── Services ─────────────────────────────────────────────────────────────────
// Keyed by actual Sanity `title` field values

const serviceChinese: Record<string, { title_zh: string; shortDescription_zh: string }> = {
  'Portfolio Management': {
    title_zh: '投資組合管理',
    shortDescription_zh: '全面的投資組合建構、風險管理及投資顧問服務，量身定制以配合您的財務目標及風險承受能力。',
  },
  'Deal Sourcing': {
    title_zh: '交易發掘',
    shortDescription_zh: '精選全球公開市場、私募股權、房地產及另類投資的機會。',
  },
  'Family Office': {
    title_zh: '家族辦公室',
    shortDescription_zh: '全方位的家族財富治理、傳承規劃及禮賓服務，為跨代繁榮而設計。',
  },
  'Legacy Planning': {
    title_zh: '傳承規劃',
    shortDescription_zh: '策略性遺產架構規劃、慈善規劃及財富轉移方案，守護家族長遠傳承。',
  },
  'Real Estate & Financing': {
    title_zh: '房地產及融資',
    shortDescription_zh: '度身定制的物業投資策略及亞太區市場融資方案。',
  },
}

async function migrateServices() {
  console.log('\n── Services ──')
  const services = await client.fetch<Array<{ _id: string; title: string }>>(
    `*[_type == "service"]{ _id, title }`
  )

  for (const service of services) {
    const zh = serviceChinese[service.title]
    if (!zh) {
      console.log(`  ⏭ No Chinese data for service: ${service.title}`)
      continue
    }
    await patchIfMissing(service._id, 'title_zh', zh.title_zh)
    await patchIfMissing(service._id, 'shortDescription_zh', zh.shortDescription_zh)
    // content_zh and features_zh left empty — long content needs translation
  }
}

// ─── Awards ───────────────────────────────────────────────────────────────────
// Keyed by actual Sanity `title` field values

const awardChinese: Record<string, string> = {
  'Gold Award — Outstanding Wealth Management': '金獎 — 傑出財富管理',
  'Top Valued Business Partner': '最具價值商業夥伴',
  'Best Independent Wealth Manager — Hong Kong': '最佳獨立財富管理公司 — 香港',
  'Outstanding Business Partner': '傑出商業夥伴',
  'Independent Asset Manager Award': '獨立資產管理獎',
  'Outstanding CEO Award (Yugi Lee)': '傑出行政總裁獎（李汶臻）',
  'Merits of Achievement in Banking and Finance': '銀行及金融業成就獎',
  'EAM Based in Hong Kong (Winner)': '駐港外部資產管理公司（得獎者）',
  'Newcomer (Winner)': '新晉獎（得獎者）',
}

async function migrateAwards() {
  console.log('\n── Awards ──')
  const awards = await client.fetch<Array<{ _id: string; title: string }>>(
    `*[_type == "award"]{ _id, title }`
  )

  for (const award of awards) {
    const titleZh = awardChinese[award.title]
    if (!titleZh) {
      console.log(`  ⏭ No Chinese title for award: ${award.title}`)
      continue
    }
    await patchIfMissing(award._id, 'title_zh', titleZh)
    // description_zh left empty
  }
}

// ─── Press Articles ───────────────────────────────────────────────────────────
// Provide Chinese titles for all press articles

const pressChinese: Record<string, string> = {
  'WealthBriefingAsia EAM Awards 2022 — Blackhorn Feature': 'WealthBriefingAsia 外部資產管理獎 2022 — 晉羚專題',
  'US$1B Hong Kong IAM Eyes Recruiting 20 RMs from Top-Tier PBs by Late 2023': '管理十億美元的香港獨立資產管理公司計劃於2023年底前從頂級私人銀行招募20名客戶經理',
  'Blackhorn Family Office — Interview with Mary Chiu & Yugi Lee': '晉羚家族辦公室 — 趙思及李汶臻專訪',
  'Pressing On Toward the Goal — Blackhorn Founder Yugi Lee': '向目標邁進 — 晉羚創辦人李汶臻',
  "Ex-UBS Bankers\u2019 Boutique Aims to Double Assets to $2bn in a Year": '前瑞銀銀行家的精品公司目標一年內資產翻倍至20億美元',
  'Yugi Lee — Founders Magazine Cover Story': '李汶臻 — Founders Magazine 封面故事',
  'Structured Products Insight — Blackhorn Interview': '結構性產品洞察 — 晉羚專訪',
}

async function migratePressArticles() {
  console.log('\n── Press Articles ──')
  const articles = await client.fetch<Array<{ _id: string; title: string; titleChinese?: string }>>(
    `*[_type == "pressArticle"]{ _id, title, titleChinese }`
  )

  for (const article of articles) {
    // First try the existing titleChinese field, then our lookup table
    const zhTitle = article.titleChinese || pressChinese[article.title]
    if (zhTitle) {
      await patchIfMissing(article._id, 'title_zh', zhTitle)
    } else {
      console.log(`  ⏭ No Chinese title for: ${article.title}`)
    }
    // summary_zh left empty — needs editorial translation
  }
}

// ─── Events ───────────────────────────────────────────────────────────────────
// Keyed by actual Sanity `title` field values

const eventChinese: Record<string, string> = {
  'Family Office Summit 2023': '家族辦公室峰會 2023',
  'Blackhorn Immersive Wealth & Wellness Summit 2024': '晉羚沉浸式財富與健康峰會 2024',
}

async function migrateEvents() {
  console.log('\n── Events ──')
  const events = await client.fetch<Array<{ _id: string; title: string }>>(
    `*[_type == "event"]{ _id, title }`
  )

  for (const event of events) {
    const titleZh = eventChinese[event.title]
    if (!titleZh) {
      console.log(`  ⏭ No Chinese title for event: ${event.title}`)
      continue
    }
    await patchIfMissing(event._id, 'title_zh', titleZh)
    // description_zh, ctaText_zh left empty
  }
}

// ─── Site Settings ────────────────────────────────────────────────────────────

async function migrateSiteSettings() {
  console.log('\n── Site Settings ──')
  const settings = await client.fetch<Array<{ _id: string }>>(
    `*[_type == "siteSettings"]{ _id }`
  )

  if (settings.length === 0) {
    console.log('  ⚠ No site settings found')
    return
  }

  const id = settings[0]._id
  await patchIfMissing(id, 'companyName_zh', '晉羚財富管理有限公司')
  await patchIfMissing(id, 'heroHeading_zh', '超越一般財富管理的智慧解決方案')
  await patchIfMissing(id, 'heroSubtext_zh', '獨立財富管理機構')
  await patchIfMissing(id, 'disclaimerText_zh', '謹防詐騙 — 晉羚財富管理絕不會透過非官方渠道要求付款。')
  // missionStatement_zh, fraudNoticeText_zh left empty — long content
}

// ─── Legal Pages ──────────────────────────────────────────────────────────────
// Keyed by actual Sanity `title` field values

const legalChinese: Record<string, string> = {
  'Disclaimer': '免責聲明',
  'Terms & Conditions': '條款及細則',
  'Complaint Handling': '投訴處理',
  'Privacy Policy': '私隱政策',
  'Important Notice': '重要通告',
}

async function migrateLegalPages() {
  console.log('\n── Legal Pages ──')
  const pages = await client.fetch<Array<{ _id: string; title: string }>>(
    `*[_type == "legalPage"]{ _id, title }`
  )

  for (const page of pages) {
    const titleZh = legalChinese[page.title]
    if (!titleZh) {
      console.log(`  ⏭ No Chinese title for: ${page.title}`)
      continue
    }
    await patchIfMissing(page._id, 'title_zh', titleZh)
    // content_zh left empty — legal text needs professional translation
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║  Chinese Content Migration — Blackhorn Wealth Management ║')
  console.log('╚══════════════════════════════════════════════════════════╝')
  console.log(`\nProject: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

  try {
    await migrateTeamMembers()
    await migrateServices()
    await migrateAwards()
    await migratePressArticles()
    await migrateEvents()
    await migrateSiteSettings()
    await migrateLegalPages()

    console.log('\n✅ Chinese content migration complete!')
    console.log('\nℹ️  Long-form content (bios, page content, legal text) was left')
    console.log('   empty for professional translation. Rachel can fill these in')
    console.log('   via Sanity Studio under the "中文 Chinese Translation" fieldsets.')
  } catch (err) {
    console.error('\n❌ Migration failed:', err)
    process.exit(1)
  }
}

main()
