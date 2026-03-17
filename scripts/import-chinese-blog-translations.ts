/**
 * Import Chinese Wix blog content into existing Sanity blog posts.
 *
 * This script is intentionally conservative. It only patches posts with
 * confirmed English <-> Chinese slug mappings and only writes Chinese excerpt
 * or body fields when the scraped source contains meaningful Chinese content.
 *
 * Usage:
 *   pnpm exec tsx --env-file=.env.local scripts/import-chinese-blog-translations.ts --dry-run
 *   pnpm exec tsx --env-file=.env.local scripts/import-chinese-blog-translations.ts
 */

import { createClient } from '@sanity/client'
import { JSDOM } from 'jsdom'
import * as fs from 'fs'
import * as path from 'path'

const DRY_RUN = process.argv.includes('--dry-run')
const OVERWRITE = process.argv.includes('--overwrite')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
})

const SCRIPTS_DIR = path.resolve(__dirname)
const POSTS_FILE = path.join(SCRIPTS_DIR, 'scraped-posts.json')

interface ScrapedPost {
  title: string
  slug: string
  publishDate: string
  excerpt: string
  body: string
  originalUrl: string
}

interface PortableTextBlock {
  _type: string
  _key: string
  [key: string]: unknown
}

interface ExistingBlogPost {
  _id: string
  slug: string
  title: string
  title_zh?: string
  excerpt_zh?: string
  body_zh?: unknown[]
}

const SLUG_MAPPINGS = [
  {
    sourceSlug: '「超前部署-恆久傳承-晉羚集團-家族辦公室研討會2023」-探討財富傳承的機遇與挑戰',
    targetSlug: 'blackhorn-group-family-office-summit-2023',
    note: 'Confirmed event recap translation',
  },
  {
    sourceSlug: 'life-artisan-club-x-blackhorn：高端客戶獨立財富管理策略與實踐',
    targetSlug: 'blackhorn-x-ftlife「life-artisan-club」-1',
    note: 'Confirmed paired post; mostly mixed-language content',
  },
  {
    sourceSlug: 'on-air-at-metro-broadcast-理財通天下',
    targetSlug: 'on-air-at-metro-broadcast',
    note: 'Confirmed paired post; Chinese title with mostly English body',
  },
] as const

let keyCounter = 0
function generateKey(): string {
  return `k${Date.now().toString(36)}${(keyCounter++).toString(36)}`
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function countChineseChars(value: string): number {
  const matches = value.match(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g)
  return matches ? matches.length : 0
}

function hasMeaningfulChinese(value: string, minCount = 24): boolean {
  return countChineseChars(value) >= minCount
}

function htmlToPortableText(html: string): PortableTextBlock[] {
  if (!html || html.trim().length === 0) return []

  const dom = new JSDOM(`<div id="root">${html}</div>`)
  const doc = dom.window.document
  const root = doc.getElementById('root')!
  const blocks: PortableTextBlock[] = []

  function processInlineChildren(node: Node): [PortableTextBlock[], Record<string, unknown>[]] {
    const children: PortableTextBlock[] = []
    const markDefs: Record<string, unknown>[] = []

    function walk(n: Node, marks: string[]): void {
      if (n.nodeType === 3) {
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

      if (n.nodeType !== 1) return
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

      for (const child of Array.from(n.childNodes)) walk(child, marks)
    }

    walk(node, [])
    return [children, markDefs]
  }

  function makeTextBlock(node: Node, style = 'normal', listItem?: string, level?: number): PortableTextBlock | null {
    const [children, markDefs] = processInlineChildren(node)
    const text = children.map((child) => String(child.text || '')).join('').trim()
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

    if (['script', 'style', 'nav', 'button', 'svg', 'noscript'].includes(tag)) return

    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
      const style = tag === 'h1' || tag === 'h2' ? 'h2' : 'h3'
      const block = makeTextBlock(el, style)
      if (block) blocks.push(block)
      return
    }

    if (tag === 'p') {
      const block = makeTextBlock(el)
      if (block) blocks.push(block)
      return
    }

    if (tag === 'blockquote') {
      const block = makeTextBlock(el, 'blockquote')
      if (block) blocks.push(block)
      return
    }

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

    if (tag === 'img') return

    if (['div', 'section', 'article', 'main', 'span', 'figure'].includes(tag)) {
      for (const child of Array.from(el.childNodes)) processNode(child)
      return
    }

    const block = makeTextBlock(el)
    if (block) blocks.push(block)
  }

  for (const child of Array.from(root.childNodes)) processNode(child)
  return blocks
}

async function main(): Promise<void> {
  const posts: ScrapedPost[] = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'))
  const postBySlug = new Map(posts.map((post) => [post.slug, post]))

  const existingPosts = await client.fetch<ExistingBlogPost[]>(
    `*[_type == "blogPost"]{
      _id,
      "slug": slug.current,
      title,
      title_zh,
      excerpt_zh,
      body_zh
    }`
  )
  const existingBySlug = new Map(existingPosts.map((post) => [post.slug, post]))

  console.log(`Checking ${SLUG_MAPPINGS.length} mapped Chinese blog translations`)
  console.log(DRY_RUN ? 'Mode: dry run' : 'Mode: live patch')
  if (OVERWRITE) console.log('Overwrite mode enabled')

  let patchedCount = 0
  let skippedCount = 0

  for (const mapping of SLUG_MAPPINGS) {
    const source = postBySlug.get(mapping.sourceSlug)
    const target = existingBySlug.get(mapping.targetSlug)

    if (!source) {
      console.warn(`Missing source post: ${mapping.sourceSlug}`)
      skippedCount++
      continue
    }

    if (!target) {
      console.warn(`Missing target blog post: ${mapping.targetSlug}`)
      skippedCount++
      continue
    }

    const plainBody = stripHtml(source.body)
    const patch: Record<string, unknown> = {}
    const summary: string[] = []

    if (countChineseChars(source.title) >= 4 && (OVERWRITE || !target.title_zh)) {
      patch.title_zh = source.title
      summary.push('title_zh')
    }

    if (hasMeaningfulChinese(source.excerpt) && (OVERWRITE || !target.excerpt_zh)) {
      patch.excerpt_zh = source.excerpt.trim()
      summary.push('excerpt_zh')
    }

    if (hasMeaningfulChinese(plainBody) && (OVERWRITE || !Array.isArray(target.body_zh) || target.body_zh.length === 0)) {
      patch.body_zh = htmlToPortableText(source.body)
      summary.push('body_zh')
    }

    if (summary.length === 0) {
      console.log(`Skip ${mapping.targetSlug} (${mapping.note})`)
      skippedCount++
      continue
    }

    console.log(`Patch ${mapping.targetSlug} <- ${mapping.sourceSlug}`)
    console.log(`  Fields: ${summary.join(', ')}`)

    if (!DRY_RUN) {
      await client.patch(target._id).set(patch).commit()
    }

    patchedCount++
  }

  console.log(`Done. patched=${patchedCount}, skipped=${skippedCount}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
