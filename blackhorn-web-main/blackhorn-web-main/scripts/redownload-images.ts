/**
 * Re-download blog post cover images using Playwright
 *
 * The initial HTTP download got "Forbidden" responses from Wix CDN.
 * This script uses Playwright to fetch images with proper browser context.
 *
 * Usage:
 *   pnpm exec tsx scripts/redownload-images.ts
 */

import { chromium } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'

const SCRIPTS_DIR = path.resolve(__dirname)
const POSTS_FILE = path.join(SCRIPTS_DIR, 'scraped-posts.json')
const IMAGES_DIR = path.join(SCRIPTS_DIR, 'scraped-images')

interface ScrapedPost {
  title: string
  slug: string
  coverImageUrl?: string
  originalUrl: string
}

async function main() {
  const posts: ScrapedPost[] = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
  const postsWithImages = posts.filter((p) => p.coverImageUrl)

  console.log(`═══════════════════════════════════════════════════`)
  console.log(`  Re-downloading ${postsWithImages.length} cover images via Playwright`)
  console.log(`═══════════════════════════════════════════════════\n`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  let success = 0
  let fail = 0

  for (let i = 0; i < postsWithImages.length; i++) {
    const post = postsWithImages[i]
    const slug = post.slug.slice(0, 80)

    // Check if we already have a valid image
    const existingFiles = fs.readdirSync(IMAGES_DIR).filter((f) => f.startsWith(slug.slice(0, 40)))
    const hasValidImage = existingFiles.some((f) => {
      const filePath = path.join(IMAGES_DIR, f)
      const stat = fs.statSync(filePath)
      if (stat.size < 1000) return false // Too small, probably error text
      // Check magic bytes
      const buf = Buffer.alloc(4)
      const fd = fs.openSync(filePath, 'r')
      fs.readSync(fd, buf, 0, 4, 0)
      fs.closeSync(fd)
      // JPEG: FF D8 FF, PNG: 89 50 4E 47, WebP: 52 49 46 46
      return (
        (buf[0] === 0xff && buf[1] === 0xd8) ||
        (buf[0] === 0x89 && buf[1] === 0x50) ||
        (buf[0] === 0x52 && buf[1] === 0x49)
      )
    })

    if (hasValidImage) {
      console.log(`  [${i + 1}/${postsWithImages.length}] Skip (valid): ${slug.slice(0, 50)}`)
      success++
      continue
    }

    console.log(`  [${i + 1}/${postsWithImages.length}] Downloading: ${slug.slice(0, 50)}`)

    try {
      // Navigate to the post page first to get cookies/referer
      await page.goto(post.originalUrl, { waitUntil: 'domcontentloaded', timeout: 20000 })
      await page.waitForTimeout(2000)

      // Get the OG image or the first Wix image from the rendered page
      const imageUrl = await page.evaluate(() => {
        const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
        if (ogImage) return ogImage
        const firstImg = document.querySelector('img[src*="static.wixstatic.com"]')
        return firstImg?.getAttribute('src') || ''
      })

      if (!imageUrl) {
        console.log(`    ⚠ No image URL found on page`)
        fail++
        continue
      }

      // Download the image using Playwright's request context (has cookies)
      const response = await context.request.get(imageUrl)
      if (response.ok()) {
        const buffer = await response.body()
        // Determine extension from content type or URL
        const contentType = response.headers()['content-type'] || ''
        let ext = 'jpg'
        if (contentType.includes('png')) ext = 'png'
        else if (contentType.includes('webp')) ext = 'webp'
        else if (imageUrl.match(/\.(png|webp|jpeg|gif)/i)) {
          ext = imageUrl.match(/\.(png|webp|jpeg|gif)/i)![1]
        }

        const filename = `${slug}.${ext}`
        fs.writeFileSync(path.join(IMAGES_DIR, filename), buffer)
        console.log(`    ✓ Saved: ${filename} (${Math.round(buffer.length / 1024)}KB)`)
        success++
      } else {
        console.log(`    ✗ HTTP ${response.status()} for image`)
        fail++
      }
    } catch (err: any) {
      console.log(`    ✗ Error: ${err.message.slice(0, 80)}`)
      fail++
    }

    await page.waitForTimeout(500)
  }

  await browser.close()

  console.log(`\n═══════════════════════════════════════════════════`)
  console.log(`  ✅ Done! ${success} success, ${fail} failures`)
  console.log(`═══════════════════════════════════════════════════`)
}

main().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
