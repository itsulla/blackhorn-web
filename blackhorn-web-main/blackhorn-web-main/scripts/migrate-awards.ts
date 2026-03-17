/**
 * Awards-only Sanity migration
 *
 * Uploads award images to Sanity CDN and creates/replaces award documents.
 * Safe to run multiple times (idempotent via createOrReplace).
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/migrate-awards.ts
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

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')

async function uploadImage(
  relativePath: string
): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string } } | null> {
  const filePath = path.join(PUBLIC_DIR, relativePath)
  if (!existsSync(filePath)) {
    console.warn(`  ⚠ Image not found: ${relativePath}`)
    return null
  }
  try {
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: path.basename(filePath),
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

async function migrateAwards() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Blackhorn → Sanity: Awards Migration')
  console.log('═══════════════════════════════════════════════════\n')

  const awards = [
    {
      _id: 'award-lgt-2024',
      title: 'Top Valued Business Partner',
      organization: 'LGT Private Banking',
      year: 2024,
      category: 'Business Partner Excellence',
      description:
        'LGT Private Banking, one of the world\u2019s largest family-owned private banking groups, recognises its most valued external asset management partners annually.',
      image: '/images/awards/lgt-trophy-2024.webp',
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
      image: '/images/awards/ubs-gfim-2023.webp',
    },
    {
      _id: 'award-wba-2023',
      title: 'Best Independent Wealth Manager \u2014 Hong Kong',
      organization: 'WealthBriefingAsia',
      year: 2023,
      category: 'Industry Excellence',
      description:
        'The WealthBriefingAsia Awards programme is one of the most prestigious in the Asian wealth management industry, recognising outstanding firms across the region.',
      image: '/images/awards/wba-banner-2022.webp',
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
      image: '/images/awards/capital-ceo-yugi-2022.webp',
    },
    {
      _id: 'award-capital-ceo-merits-2022',
      title: 'Merits of Achievement in Banking and Finance',
      organization: 'Capital CEO',
      year: 2022,
      category: 'Leadership',
      description:
        'Capital CEO\u2019s Entrepreneur Nite 2022 recognised Blackhorn\u2019s co-founders Mary Chiu and Yugi Lee for their outstanding contributions to the banking and finance sector.',
      image: '/images/awards/capital-ceo-nite-2022.webp',
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

  console.log('\n═══════════════════════════════════════════════════')
  console.log(`  ✅ ${awards.length} awards migrated successfully!`)
  console.log('═══════════════════════════════════════════════════')
}

migrateAwards().catch((err) => {
  console.error('\n✗ Migration failed:', err)
  process.exit(1)
})
