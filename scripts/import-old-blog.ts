/**
 * Import scraped Wix blog posts into Sanity CMS
 *
 * Reads scripts/scraped-posts.json, uploads cover images, converts HTML to
 * Portable Text, and creates blogPost documents in Sanity.
 *
 * Usage:
 *   pnpm exec tsx --env-file=.env.local scripts/import-old-blog.ts --dry-run
 *   pnpm exec tsx --env-file=.env.local scripts/import-old-blog.ts
 */

import { createClient } from '@sanity/client'
import { JSDOM } from 'jsdom'
import * as fs from 'fs'
import * as path from 'path'

const DRY_RUN = process.argv.includes('--dry-run')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

const SCRIPTS_DIR = path.resolve(__dirname)
const POSTS_FILE = path.join(SCRIPTS_DIR, 'scraped-posts.json')
const IMAGES_DIR = path.join(SCRIPTS_DIR, 'scraped-images')

// ── Types ──────────────────────────────────────────────────────────────────

interface ScrapedPost {
  title: string
  slug: string
  publishDate: string
  author?: string
  coverImageUrl?: string
  body: string
  excerpt: string
  category?: string
  tags?: string[]
  originalUrl: string
}

interface PortableTextBlock {
  _type: string
  _key: string
  [key: string]: any
}

// ── Key generator ──────────────────────────────────────────────────────────

let keyCounter = 0
function generateKey(): string {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`
}

// ── HTML → Portable Text converter ─────────────────────────────────────────

function htmlToPortableText(html: string): PortableTextBlock[] {
  if (!html || html.trim().length === 0) return []

  const dom = new JSDOM(`<div id="root">${html}</div>`)
  const doc = dom.window.document
  const root = doc.getElementById('root')!
  const blocks: PortableTextBlock[] = []

  function processInlineChildren(node: Node): any[] {
    const children: any[] = []
    const markDefs: any[] = []

    function walk(n: Node, marks: string[]): void {
      if (n.nodeType === 3 /* TEXT */) {
        const text = n.textContent || ''
        if (text.length > 0) {
          children.push({
            _type: 'span',
            _key: generateKey(),
            text,
            marks: [...marks],
          })
        }
        return
      }

      if (n.nodeType !== 1 /* ELEMENT */) return
      const el = n as Element
      const tag = el.tagName.toLowerCase()

      if (tag === 'br') {
        children.push({ _type: 'span', _key: generateKey(), text: '\n', marks: [...marks] })
        return
      }

      if (tag === 'strong' || tag === 'b') {
        for (const child of Array.from(n.childNodes)) walk(child, [...marks, 'strong'])
        return
      }

      if (tag === 'em' || tag === 'i') {
        for (const child of Array.from(n.childNodes)) walk(child, [...marks, 'em'])
        return
      }

      if (tag === 'u') {
        for (const child of Array.from(n.childNodes)) walk(child, [...marks, 'underline'])
        return
      }

      if (tag === 'a') {
        const href = el.getAttribute('href') || ''
        if (href) {
          const linkKey = generateKey()
          markDefs.push({ _type: 'link', _key: linkKey, href })
          for (const child of Array.from(n.childNodes)) walk(child, [...marks, linkKey])
        } else {
          for (const child of Array.from(n.childNodes)) walk(child, marks)
        }
        return
      }

      // Default: recurse into children
      for (const child of Array.from(n.childNodes)) walk(child, marks)
    }

    walk(node, [])
    return [children, markDefs]
  }

  function makeTextBlock(node: Node, style: string = 'normal', listItem?: string, level?: number): PortableTextBlock | null {
    const [children, markDefs] = processInlineChildren(node)
    // Skip empty blocks
    const text = children.map((c: any) => c.text || '').join('').trim()
    if (!text) return null

    const block: PortableTextBlock = {
      _type: 'block',
      _key: generateKey(),
      style,
      children,
      markDefs,
    }
    if (listItem) {
      block.listItem = listItem
      block.level = level || 1
    }
    return block
  }

  function processNode(node: Node): void {
    if (node.nodeType === 3) {
      const text = (node.textContent || '').trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: [{ _type: 'span', _key: generateKey(), text, marks: [] }],
          markDefs: [],
        })
      }
      return
    }

    if (node.nodeType !== 1) return
    const el = node as Element
    const tag = el.tagName.toLowerCase()

    // Skip script, style, nav, etc.
    if (['script', 'style', 'nav', 'button', 'svg', 'noscript'].includes(tag)) return

    // Headings
    if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
      // Map h1-h3 to h2-h3, h4+ to h3
      const style = tag === 'h1' || tag === 'h2' ? 'h2' : 'h3'
      const block = makeTextBlock(el, style)
      if (block) blocks.push(block)
      return
    }

    // Paragraphs
    if (tag === 'p') {
      const block = makeTextBlock(el)
      if (block) blocks.push(block)
      return
    }

    // Blockquotes
    if (tag === 'blockquote') {
      const block = makeTextBlock(el, 'blockquote')
      if (block) blocks.push(block)
      return
    }

    // Lists
    if (tag === 'ul' || tag === 'ol') {
      const listType = tag === 'ul' ? 'bullet' : 'number'
      for (const li of Array.from(el.children)) {
        if (li.tagName.toLowerCase() === 'li') {
          const block = makeTextBlock(li, 'normal', listType, 1)
          if (block) blocks.push(block)
        }
      }
      return
    }

    // Images — skip (cover image is handled separately, inline images are Wix CDN)
    if (tag === 'img') {
      return
    }

    // Wix-specific wrapper divs — just recurse into children
    if (tag === 'div' || tag === 'section' || tag === 'article' || tag === 'main' || tag === 'span' || tag === 'figure') {
      for (const child of Array.from(el.childNodes)) {
        processNode(child)
      }
      return
    }

    // Default: try to extract text from unknown elements
    const block = makeTextBlock(el)
    if (block) blocks.push(block)
  }

  for (const child of Array.from(root.childNodes)) {
    processNode(child)
  }

  return blocks
}

// ── Category mapping ───────────────────────────────────────────────────────

function categorize(post: ScrapedPost): string {
  if (post.category) return post.category
  const t = post.title.toLowerCase()
  if (t.includes('award') || t.includes('partner') || t.includes('recogni') || t.includes('honored') || t.includes('named best'))
    return 'company-news'
  if (t.includes('summit') || t.includes('event') || t.includes('conference') || t.includes('forum') || t.includes('dinner'))
    return 'event-recap'
  if (t.includes('market') || t.includes('invest') || t.includes('outlook') || t.includes('geopolit'))
    return 'market-commentary'
  if (t.includes('insight') || t.includes('interview') || t.includes('hubbis'))
    return 'investment-insights'
  return 'company-news'
}

// ── Slug sanitizer ─────────────────────────────────────────────────────────

function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\u3400-\u4dbf\uff00-\uffef-]/g, '-') // allow CJK chars
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96)
}

// ── Image upload ───────────────────────────────────────────────────────────

async function uploadCoverImage(
  slug: string
): Promise<{ _type: 'image'; asset: { _type: 'reference'; _ref: string }; alt?: string } | null> {
  // Find matching image file (slug may be truncated)
  const files = fs.readdirSync(IMAGES_DIR)
  const match = files.find((f) => {
    const name = path.parse(f).name
    return slug.startsWith(name) || name.startsWith(slug.slice(0, 60))
  })

  if (!match) return null

  const filePath = path.join(IMAGES_DIR, match)
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: match,
    })
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    }
  } catch (err: any) {
    console.warn(`  ⚠ Image upload failed for ${slug}: ${err.message}`)
    return null
  }
}

// ── Clean excerpt ──────────────────────────────────────────────────────────

function cleanExcerpt(excerpt: string, title: string): string {
  // Remove the title, date, and "X min read" prefix that Wix injects
  let clean = excerpt
    .replace(new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'), '')
    .replace(/^[A-Z][a-z]{2}\s+\d{1,2},?\s*\d{0,4}\s*/i, '') // "Mar 20, 2023"
    .replace(/^\d+\s*min\s*read\s*/i, '')
    .replace(/^Updated:.*?\d{4}\s*/i, '')
    .trim()

  // Ensure it's not too long
  if (clean.length > 200) clean = clean.slice(0, 197) + '...'
  return clean || excerpt.slice(0, 200)
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  Blackhorn → Sanity: Blog Post Import')
  console.log(DRY_RUN ? '  🔍 DRY RUN — no changes will be made' : '  🚀 LIVE RUN — writing to Sanity')
  console.log('═══════════════════════════════════════════════════\n')

  const posts: ScrapedPost[] = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
  console.log(`  ${posts.length} posts to import\n`)

  // Check for existing posts to avoid duplicates
  const existingSlugs = new Set<string>()
  if (!DRY_RUN) {
    const existing = await client.fetch<{ slug: string }[]>(
      `*[_type == "blogPost"]{ "slug": slug.current }`
    )
    existing.forEach((p) => existingSlugs.add(p.slug))
    if (existing.length > 0) {
      console.log(`  ${existing.length} posts already in Sanity — will skip duplicates\n`)
    }
  }

  let successCount = 0
  let skipCount = 0
  let failCount = 0
  const failures: string[] = []

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const slug = sanitizeSlug(post.slug)

    if (existingSlugs.has(slug)) {
      console.log(`  [${i + 1}/${posts.length}] Skip (exists): ${slug}`)
      skipCount++
      continue
    }

    console.log(`  [${i + 1}/${posts.length}] Importing: ${post.title.slice(0, 60)}...`)

    try {
      // Convert body HTML to Portable Text
      const body = htmlToPortableText(post.body)

      // Clean excerpt
      const excerpt = cleanExcerpt(post.excerpt, post.title)

      // Parse publish date
      let publishDate = post.publishDate
      if (!publishDate) {
        publishDate = '2022-01-01T00:00:00.000Z' // Fallback for missing dates
      }

      if (DRY_RUN) {
        console.log(`    → ${body.length} blocks, excerpt: "${excerpt.slice(0, 60)}..."`)
        console.log(`    → Category: ${categorize(post)}, Date: ${publishDate.slice(0, 10)}`)
        successCount++
        continue
      }

      // Upload cover image
      const coverImage = await uploadCoverImage(post.slug)
      if (coverImage) {
        console.log(`    📸 Cover image uploaded`)
      }

      // Create the document
      const doc = {
        _type: 'blogPost' as const,
        title: post.title,
        slug: { _type: 'slug' as const, current: slug },
        publishDate,
        excerpt,
        body,
        category: categorize(post),
        status: 'published',
        featured: false,
        tags: [
          ...(post.tags || []),
          'imported-from-wix', // Tag for tracking
        ],
        ...(coverImage ? { coverImage } : {}),
      }

      await client.create(doc)
      successCount++

      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 300))
    } catch (err: any) {
      console.error(`    ✗ Failed: ${err.message}`)
      failures.push(`${slug}: ${err.message}`)
      failCount++
    }
  }

  console.log('\n═══════════════════════════════════════════════════')
  console.log(`  ✅ Import complete!`)
  console.log(`  ${successCount} posts imported`)
  console.log(`  ${skipCount} skipped (already exist)`)
  console.log(`  ${failCount} failures`)
  if (failures.length) {
    console.log('\n  Failed posts:')
    failures.forEach((f) => console.log(`    - ${f}`))
  }
  console.log('═══════════════════════════════════════════════════')
}

main().catch((err) => {
  console.error('\n✗ Import failed:', err)
  process.exit(1)
})
