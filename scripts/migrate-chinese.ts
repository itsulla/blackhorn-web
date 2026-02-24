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

const teamChinese: Record<string, { name_zh: string; role_zh: string }> = {
  'Mary Yuen': { name_zh: '袁嘉欣', role_zh: '聯合創辦人及行政總裁' },
  'Yugi Harada': { name_zh: '原田有希', role_zh: '聯合創辦人' },
  'Alan Lee': { name_zh: '李景洪', role_zh: '董事總經理' },
  'Wilson Hui': { name_zh: '許偉倫', role_zh: '高級副總裁' },
  'Nejteh Yaghoubian': { name_zh: 'Nejteh Yaghoubian', role_zh: '顧問' },
  'Peter Tsang': { name_zh: '曾百溢', role_zh: '顧問' },
  'Andrew Lo': { name_zh: '盧景瀚', role_zh: '顧問' },
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

const serviceChinese: Record<string, { title_zh: string; shortDescription_zh: string }> = {
  'Wealth Management': {
    title_zh: '財富管理',
    shortDescription_zh: '全面的投資組合建構、風險管理及投資顧問服務，量身定制以配合您的財務目標及風險承受能力。',
  },
  'Investment Advisory': {
    title_zh: '投資顧問',
    shortDescription_zh: '精選全球公開市場、私募股權、房地產及另類投資的機會。',
  },
  'Family Office Services': {
    title_zh: '家族辦公室服務',
    shortDescription_zh: '全方位的家族財富治理、傳承規劃及禮賓服務，為跨代繁榮而設計。',
  },
  'Estate & Legacy Planning': {
    title_zh: '遺產及傳承規劃',
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

const awardChinese: Record<string, string> = {
  'Gold Award — Outstanding Wealth Management': '金獎 — 傑出財富管理',
  'Top Valued Business Partner': '最具價值商業夥伴',
  'Best Independent Wealth Manager — Hong Kong': '最佳獨立財富管理公司 — 香港',
  'Outstanding Wealth Management Firm': '傑出財富管理公司',
  'Newcomer Award': '新晉獎',
  'Best EAM — Hong Kong (Highly Commended)': '最佳外部資產管理 — 香港（高度推薦）',
  'Outstanding Wealth Management EAM': '傑出財富管理外部資產管理',
  'CEO of the Year 2023': '2023年度行政總裁',
  'Outstanding EAM': '傑出外部資產管理',
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

// Only populate title_zh for articles that had titleChinese
async function migratePressArticles() {
  console.log('\n── Press Articles ──')
  const articles = await client.fetch<Array<{ _id: string; title: string; titleChinese?: string }>>(
    `*[_type == "pressArticle"]{ _id, title, titleChinese }`
  )

  for (const article of articles) {
    if (article.titleChinese) {
      await patchIfMissing(article._id, 'title_zh', article.titleChinese)
    } else {
      console.log(`  ⏭ No titleChinese for: ${article.title}`)
    }
    // summary_zh left empty — needs editorial translation
  }
}

// ─── Events ───────────────────────────────────────────────────────────────────

const eventChinese: Record<string, string> = {
  'Blackhorn 3rd Anniversary Dinner': '晉羚三週年晚宴',
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
  await patchIfMissing(id, 'heroHeading_zh', '超越簡單財富管理的智慧方案')
  await patchIfMissing(id, 'heroSubtext_zh', '獨立財富管理')
  await patchIfMissing(id, 'disclaimerText_zh', '謹防詐騙 — 晉羚財富管理絕不會透過非官方渠道要求付款。')
  // missionStatement_zh, fraudNoticeText_zh left empty — long content
}

// ─── Legal Pages ──────────────────────────────────────────────────────────────

const legalChinese: Record<string, string> = {
  'Disclaimer': '免責聲明',
  'Terms and Conditions': '條款及細則',
  'Complaint Handling Policy': '投訴處理政策',
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
