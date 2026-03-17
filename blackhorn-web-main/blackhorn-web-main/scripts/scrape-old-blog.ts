/**
 * Scrape all blog posts from the old Wix site (blackhorngrp.com/news)
 *
 * Uses Playwright to render Wix's dynamic pages and extract content.
 * Saves results to scripts/scraped-posts.json and images to scripts/scraped-images/
 *
 * Usage:
 *   npx playwright install chromium   (first time only)
 *   pnpm exec tsx scripts/scrape-old-blog.ts
 */

import { chromium, type Page } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'
import https from 'https'
import http from 'http'

// ── Post URLs from sitemap ─────────────────────────────────────────────────

const POST_URLS = [
  'https://www.blackhorngrp.com/post/relocation-of-hong-kong-office',
  'https://www.blackhorngrp.com/post/industrialising-personalisation-in-asia-s-private-wealth-landscape',
  'https://www.blackhorngrp.com/post/citywire-clients-are-already-topping-up-says-blackhorn-s-lee-on-ubp-hedge-fund',
  'https://www.blackhorngrp.com/post/blackhorn-x-lgt-co-hosted-a-premium-whiskey-tasting-event',
  'https://www.blackhorngrp.com/post/blackhorn-group-family-office-summit-2023',
  'https://www.blackhorngrp.com/post/blackhorn-awarded-as-ubs-outstanding-business-partner',
  'https://www.blackhorngrp.com/post/a-toasts-to-3-years-of-excellence-in-family-office-services',
  'https://www.blackhorngrp.com/post/hubbis-the-future-of-wealth-planning-in-greater-china-conference',
  'https://www.blackhorngrp.com/post/private-wealth-management-apac-summit-2023',
  'https://www.blackhorngrp.com/post/fireside-chats-with-client',
  'https://www.blackhorngrp.com/post/\u300C\u8D85\u524D\u90E8\u7F72-\u6046\u4E45\u50B3\u627F-\u6649\u7F9A\u96C6\u5718-\u5BB6\u65CF\u8FA6\u516C\u5BA4\u7814\u8A0E\u6703\u0032\u0030\u0032\u0033\u300D-\u63A2\u8A0E\u8CA1\u5BCC\u50B3\u627F\u7684\u6A5F\u9047\u8207\u6311\u6230',
  'https://www.blackhorngrp.com/post/asian-private-banker-dpm-2025-leaders-conversation',
  'https://www.blackhorngrp.com/post/celebrating-three-years-as-ubs-s-outstanding-business-partner',
  'https://www.blackhorngrp.com/post/blackhorn-shares-insights-on-economic-trends-and-investment-opportunities-with-arizona-state-univers',
  'https://www.blackhorngrp.com/post/interview-by-asian-private-banker',
  'https://www.blackhorngrp.com/post/life-artisan-club-x-blackhorn\uFF1A\u9AD8\u7AEF\u5BA2\u6236\u7368\u7ACB\u8CA1\u5BCC\u7BA1\u7406\u7B56\u7565\u8207\u5BE6\u8E10',
  'https://www.blackhorngrp.com/post/aima-apac-annual-forum-2023',
  'https://www.blackhorngrp.com/post/blackhorn-honored-as-outstanding-business-partner-by-ubs',
  'https://www.blackhorngrp.com/post/\u6649\u7F9A\u96C6\u5718\u5275\u8FA6\u4EBA\u674E\u6C76\u81FB\u88AB\u9080\u8ACB\u64D4\u4EFB\u300C\u5927\u7C92mac\u6559\u5BA4\u300D\u95B1\u8B80\u8A08\u5283\u53CA\u300C\u8A9E\u6587\u7684\u751F\u547D\u300D\u7684\u300C\u50B3\u627F\u5927\u4F7F\u300D-1',
  'https://www.blackhorngrp.com/post/capital-ceo-of-the-year-acceptance-speech-yugi-lee',
  'https://www.blackhorngrp.com/post/from-salaries-to-startups-inspiring-journeys-of-hong-kong-s-female-eam-founders',
  'https://www.blackhorngrp.com/post/2022-china-wealth-awards-best-wealth-manager-in-greater-bay-area',
  'https://www.blackhorngrp.com/post/blackhorn-wealth-management-named-best-eam-in-hong-kong-at-the-2024-wealthbriefing-asia-awards',
  'https://www.blackhorngrp.com/post/avcj-private-equity-forum-2024',
  'https://www.blackhorngrp.com/post/blackhorn-group-enters-new-era-with-strategic-acquisition-by-ctf-services-limited',
  'https://www.blackhorngrp.com/post/lgt-s-top-valued-business-partner',
  'https://www.blackhorngrp.com/post/horn-of-plenty',
  'https://www.blackhorngrp.com/post/6th-annual-hong-kong-investors-forum-markets-group',
  'https://www.blackhorngrp.com/post/capital-\u8CC7\u672C\u5E73\u53F0-ceo-of-the-year',
  'https://www.blackhorngrp.com/post/blackhorn-x-ftlife\u300Clife-artisan-club\u300D-1',
  'https://www.blackhorngrp.com/post/elevating-operational-excellence-andy-yuen-joins-blackhorn-as-coo',
  'https://www.blackhorngrp.com/post/blackhorn-immersive-wealth-wellness-1',
  'https://www.blackhorngrp.com/post/julius-baer-recognizes-blackhorn-as-exceptional-intermediaries-partner-2025',
  'https://www.blackhorngrp.com/post/citywire-independent-wealth-symposium-2024',
  'https://www.blackhorngrp.com/post/hubbis-blackhorn-wealth-management-a-rising-force-in-hong-kong-s-eam-and-mfo-ecosystem',
  'https://www.blackhorngrp.com/post/ubp-partnered-with-blackhorn-to-launch-hedge-fund-solution',
  'https://www.blackhorngrp.com/post/blackhorn-2nd-annual-dinner',
  'https://www.blackhorngrp.com/post/blackhorn-4th-annual-dinner-party',
  'https://www.blackhorngrp.com/post/blackhorn-attends-asian-private-banker-s-ceremony-awards-for-distinction-2024',
  'https://www.blackhorngrp.com/post/capital-\u8CC7\u672C\u5E73\u53F0-ceo-of-the-year-1',
  'https://www.blackhorngrp.com/post/charity-movie-night-co-hosted-with-ctf-charity-foundation',
  'https://www.blackhorngrp.com/post/citywire-asia-independent-wealth-power-players-2024',
  'https://www.blackhorngrp.com/post/blackhorn-the-iam-charging-forward-after-china-s-re-opening',
  'https://www.blackhorngrp.com/post/blackhorn-honored-as-exceptional-intermediate-partner-by-julius-baer-private-bank',
  'https://www.blackhorngrp.com/post/blackhorn-hosted-their-inaugural-wealth-management-conference-in-dongguan',
  'https://www.blackhorngrp.com/post/on-air-at-metro-broadcast-\u7406\u8CA1\u901A\u5929\u4E0B',
  'https://www.blackhorngrp.com/post/2024-asian-private-banker-highly-commended-distinction-for-independent-wealth-manager',
  'https://www.blackhorngrp.com/post/capital-ceo-awards-post-event-feature',
  'https://www.blackhorngrp.com/post/geopolitics-asia-focus-and-active-risk-management-in-a-shifting-global-order',
  'https://www.blackhorngrp.com/post/blackhorn-x-\u60A6\u6E7E\u4F1A-investment-opportunities-options-for-hwn-individuals',
  'https://www.blackhorngrp.com/post/blackhorn-wealth-returns-to-hku-inspiring-the-next-generation-of-financial-professionals-at-hku',
  'https://www.blackhorngrp.com/post/on-air-at-metro-broadcast',
  'https://www.blackhorngrp.com/post/hubbis-wealth-solutions-forum-2023',
  'https://www.blackhorngrp.com/post/middle-east-investors-summit-2025',
  'https://www.blackhorngrp.com/post/2022-highly-commended-independent-wealth-manager-aisa-pacific-by-asian-private-banker',
  'https://www.blackhorngrp.com/post/citywire-interview-ex-ubs-bankers-boutique-aims-to-double-assets-to-2bn-in-a-year',
  'https://www.blackhorngrp.com/post/2022-capital-merits-of-achievements-in-banking-and-finance',
  'https://www.blackhorngrp.com/post/srp-insight-interview',
  'https://www.blackhorngrp.com/post/blackhorn-names-head-of-investment-solutions',
  'https://www.blackhorngrp.com/post/asian-private-banker-interview',
  'https://www.blackhorngrp.com/post/blackhorn-news-media',
  'https://www.blackhorngrp.com/post/csuite-xchange-interview-with-yugi-lee',
  'https://www.blackhorngrp.com/post/2022-wealthbriefingasia-external-asset-management-awards',
]

interface ScrapedPost {
  title: string
  slug: string
  publishDate: string
  author?: string
  coverImageUrl?: string
  body: string // HTML content
  excerpt: string
  category?: string
  tags?: string[]
  originalUrl: string
}

const SCRIPTS_DIR = path.resolve(__dirname)
const OUTPUT_FILE = path.join(SCRIPTS_DIR, 'scraped-posts.json')
const IMAGES_DIR = path.join(SCRIPTS_DIR, 'scraped-images')

// ── Helpers ────────────────────────────────────────────────────────────────

function slugFromUrl(url: string): string {
  const parts = url.split('/post/')
  return decodeURIComponent(parts[1] || '').replace(/\s+/g, '-')
}

function cleanImageUrl(url: string): string {
  // Strip Wix resize params to get full quality
  return url.replace(/\/v1\/fill\/[^/]+\//, '/').replace(/\/v1\/crop\/[^/]+\//, '/')
}

function categorize(title: string, body: string): string {
  const t = title.toLowerCase()
  const b = body.toLowerCase()
  if (t.includes('award') || t.includes('partner') || t.includes('recogni') || t.includes('honored') || t.includes('named best'))
    return 'company-news'
  if (t.includes('summit') || t.includes('event') || t.includes('conference') || t.includes('forum') || t.includes('dinner') || t.includes('tasting'))
    return 'event-recap'
  if (t.includes('market') || t.includes('invest') || t.includes('outlook') || t.includes('geopolit'))
    return 'market-commentary'
  if (t.includes('insight') || t.includes('perspective') || t.includes('strategy') || t.includes('industrialising'))
    return 'investment-insights'
  if (t.includes('interview') || t.includes('on air') || t.includes('citywire') || t.includes('hubbis'))
    return 'company-news'
  return 'company-news'
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(dest)
    protocol.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        downloadFile(res.headers.location!, dest).then(resolve).catch(reject)
        return
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (err) => {
      fs.unlink(dest, () => {}) // Clean up partial file
      reject(err)
    })
  })
}

// ── Scrape a single post ───────────────────────────────────────────────────

async function scrapePost(page: Page, url: string): Promise<ScrapedPost | null> {
  const slug = slugFromUrl(url)
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    // Wait for blog content to render (Wix lazy-loads)
    await page.waitForTimeout(3000)

    // Try to wait for a common Wix blog content selector
    try {
      await page.waitForSelector('[data-hook="blog-post-title"], h1', { timeout: 8000 })
    } catch {
      // Content might already be there or use different selectors
    }

    const data = await page.evaluate(() => {
      // ── Title ──
      const titleEl =
        document.querySelector('[data-hook="blog-post-title"]') ||
        document.querySelector('h1[data-testid="blog-post-title"]') ||
        document.querySelector('h1')
      const title = titleEl?.textContent?.trim() || ''

      // ── Date ──
      // Try meta tag first (most reliable)
      const metaDate = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content')
      // Try visible date text
      const dateEl =
        document.querySelector('[data-hook="time-since"]') ||
        document.querySelector('[data-hook="blog-post-date"]') ||
        document.querySelector('time')
      const dateText = dateEl?.getAttribute('datetime') || dateEl?.textContent?.trim() || ''
      const publishDate = metaDate || dateText || ''

      // ── Author ──
      const authorEl =
        document.querySelector('[data-hook="blog-post-author"]') ||
        document.querySelector('[data-hook="author-name"]')
      const author = authorEl?.textContent?.trim() || ''

      // ── Cover image ──
      // Look for the main blog post image
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
      const heroImg = document.querySelector('[data-hook="blog-post-hero-image"] img')?.getAttribute('src')
      const firstWixImg = document.querySelector('img[src*="static.wixstatic.com"]')?.getAttribute('src')
      const coverImageUrl = ogImage || heroImg || firstWixImg || ''

      // ── Body ──
      // Wix blog body is usually in a rich-content container
      const bodyEl =
        document.querySelector('[data-hook="post-rich-content"]') ||
        document.querySelector('[data-hook="blog-post-content"]') ||
        document.querySelector('.blog-post-content') ||
        document.querySelector('[class*="rich-content"]') ||
        document.querySelector('article')

      // Get inner HTML, clean up Wix wrapper divs
      let body = bodyEl?.innerHTML || ''

      // Also get plain text for excerpt
      const bodyText = bodyEl?.textContent?.trim() || ''
      const excerpt = bodyText.slice(0, 200).replace(/\s+/g, ' ').trim()

      // ── Tags ──
      const tagEls = document.querySelectorAll('[data-hook="blog-post-tag"], [data-hook="tag"]')
      const tags = Array.from(tagEls).map((el) => el.textContent?.trim()).filter(Boolean) as string[]

      // ── Meta description as fallback excerpt ──
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''

      return {
        title,
        publishDate,
        author,
        coverImageUrl,
        body,
        excerpt: excerpt || metaDesc,
        tags,
      }
    })

    if (!data.title) {
      console.warn(`  ⚠ No title found for ${slug}, skipping`)
      return null
    }

    return {
      ...data,
      slug,
      originalUrl: url,
      coverImageUrl: data.coverImageUrl ? cleanImageUrl(data.coverImageUrl) : undefined,
      category: categorize(data.title, data.body),
    }
  } catch (err: any) {
    console.error(`  ✗ Failed to scrape ${slug}: ${err.message}`)
    return null
  }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Blackhorn Old Wix Blog Scraper')
  console.log(`  ${POST_URLS.length} posts to scrape`)
  console.log('═══════════════════════════════════════════════════\n')

  // Ensure images directory exists
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true })
  }

  // Load existing progress if any
  let scraped: ScrapedPost[] = []
  const existingSlugs = new Set<string>()
  if (fs.existsSync(OUTPUT_FILE)) {
    scraped = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'))
    scraped.forEach((p) => existingSlugs.add(p.slug))
    console.log(`  Resuming — ${scraped.length} posts already scraped\n`)
  }

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()

  let successCount = 0
  let failCount = 0

  for (let i = 0; i < POST_URLS.length; i++) {
    const url = POST_URLS[i]
    const slug = slugFromUrl(url)

    if (existingSlugs.has(slug)) {
      console.log(`  [${i + 1}/${POST_URLS.length}] Skip (already scraped): ${slug}`)
      continue
    }

    console.log(`  [${i + 1}/${POST_URLS.length}] Scraping: ${slug}`)
    const post = await scrapePost(page, url)

    if (post) {
      scraped.push(post)
      existingSlugs.add(slug)
      successCount++

      // Download cover image
      if (post.coverImageUrl) {
        const ext = post.coverImageUrl.match(/\.(jpg|jpeg|png|webp|gif)/i)?.[1] || 'jpg'
        const imgFile = path.join(IMAGES_DIR, `${slug.slice(0, 80)}.${ext}`)
        if (!fs.existsSync(imgFile)) {
          try {
            await downloadFile(post.coverImageUrl, imgFile)
            console.log(`    📸 Image saved: ${path.basename(imgFile)}`)
          } catch (err: any) {
            console.warn(`    ⚠ Image download failed: ${err.message}`)
          }
        }
      }

      // Save progress after each post
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(scraped, null, 2))
    } else {
      failCount++
    }

    // Rate limit — 1.5s between requests
    await page.waitForTimeout(1500)
  }

  await browser.close()

  console.log('\n═══════════════════════════════════════════════════')
  console.log(`  ✅ Scraping complete!`)
  console.log(`  ${successCount} new posts scraped`)
  console.log(`  ${failCount} failures`)
  console.log(`  ${scraped.length} total posts in ${OUTPUT_FILE}`)
  console.log('═══════════════════════════════════════════════════')
}

main().catch((err) => {
  console.error('\n✗ Scraper failed:', err)
  process.exit(1)
})
