/**
 * Upload cover images to Sanity for already-imported blog posts
 *
 * The blog text was imported but images failed. This script uploads images
 * and patches the existing blogPost documents with cover image references.
 *
 * Usage:
 *   pnpm exec tsx --env-file=.env.local scripts/upload-blog-images.ts
 */

import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

const IMAGES_DIR = path.join(__dirname, 'scraped-images')

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Uploading cover images to Sanity blog posts')
  console.log('═══════════════════════════════════════════════════\n')

  // Get all blog posts that don't have a cover image
  const posts = await client.fetch<{ _id: string; slug: string; title: string; coverImage: any }[]>(
    `*[_type == "blogPost"]{ _id, "slug": slug.current, title, coverImage }`
  )

  const needsImage = posts.filter((p) => !p.coverImage)
  console.log(`  ${posts.length} total posts, ${needsImage.length} need cover images\n`)

  const imageFiles = fs.readdirSync(IMAGES_DIR)
  let success = 0
  let fail = 0

  for (let i = 0; i < needsImage.length; i++) {
    const post = needsImage[i]

    // Find matching image file
    const match = imageFiles.find((f) => {
      const name = path.parse(f).name
      // Match by slug prefix (files may be truncated)
      return post.slug.startsWith(name.slice(0, 30)) || name.startsWith(post.slug.slice(0, 30))
    })

    if (!match) {
      console.log(`  [${i + 1}/${needsImage.length}] ✗ No image found for: ${post.slug.slice(0, 50)}`)
      fail++
      continue
    }

    const filePath = path.join(IMAGES_DIR, match)
    const stat = fs.statSync(filePath)

    // Skip tiny files (< 1KB = probably error text, not a real image)
    if (stat.size < 1000) {
      console.log(`  [${i + 1}/${needsImage.length}] ⚠ Skipping tiny file (${stat.size}B): ${match}`)
      fail++
      continue
    }

    // Verify it's a real image by checking magic bytes
    const buf = Buffer.alloc(4)
    const fd = fs.openSync(filePath, 'r')
    fs.readSync(fd, buf, 0, 4, 0)
    fs.closeSync(fd)
    const isImage =
      (buf[0] === 0xff && buf[1] === 0xd8) || // JPEG
      (buf[0] === 0x89 && buf[1] === 0x50) || // PNG
      (buf[0] === 0x52 && buf[1] === 0x49)    // WebP
    if (!isImage) {
      console.log(`  [${i + 1}/${needsImage.length}] ⚠ Not a valid image: ${match}`)
      fail++
      continue
    }

    try {
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: match,
      })

      await client.patch(post._id).set({
        coverImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
      }).commit()

      console.log(`  [${i + 1}/${needsImage.length}] ✓ ${post.slug.slice(0, 50)} (${Math.round(stat.size / 1024)}KB)`)
      success++

      await new Promise((r) => setTimeout(r, 300))
    } catch (err: any) {
      console.log(`  [${i + 1}/${needsImage.length}] ✗ Upload failed: ${err.message.slice(0, 80)}`)
      fail++
    }
  }

  console.log(`\n═══════════════════════════════════════════════════`)
  console.log(`  ✅ Done! ${success} images uploaded, ${fail} skipped/failed`)
  console.log(`═══════════════════════════════════════════════════`)
}

main().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
