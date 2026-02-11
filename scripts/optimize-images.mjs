#!/usr/bin/env node
/**
 * Image optimization script for Blackhorn Wealth Management
 * Converts JPEGs/PNGs to WebP, resizes to appropriate dimensions
 * Keeps originals in _originals/ as backups
 */

import sharp from 'sharp'
import { readdir, stat, mkdir } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const BASE = 'public/images'
const ORIGINALS = join(BASE, '_originals')

// Configuration per folder
const CONFIG = {
  team: {
    maxWidth: 800,
    maxHeight: 800,
    quality: 85,
    format: 'webp',
  },
  events: {
    maxWidth: 1200,
    maxHeight: null, // maintain aspect ratio
    quality: 85,
    format: 'webp',
  },
  awards: {
    maxWidth: 1200,
    maxHeight: null,
    quality: 85,
    format: 'webp',
  },
  stock: {
    maxWidth: 1920,
    maxHeight: null,
    quality: 85,
    format: 'webp',
  },
  logo: {
    maxWidth: null, // keep original size for logos
    maxHeight: null,
    quality: 90,
    format: 'png', // keep logos as PNG for transparency
  },
}

const results = {
  success: [],
  failed: [],
}

async function optimizeImage(srcPath, destPath, config) {
  try {
    const metadata = await sharp(srcPath).metadata()
    let pipeline = sharp(srcPath)

    // Resize if needed
    if (config.maxWidth || config.maxHeight) {
      const resizeOpts = {}
      if (config.maxWidth && metadata.width > config.maxWidth) {
        resizeOpts.width = config.maxWidth
      }
      if (config.maxHeight && metadata.height > config.maxHeight) {
        resizeOpts.height = config.maxHeight
      }
      if (Object.keys(resizeOpts).length > 0) {
        resizeOpts.fit = 'inside'
        resizeOpts.withoutEnlargement = true
        pipeline = pipeline.resize(resizeOpts)
      }
    }

    // Convert format
    if (config.format === 'webp') {
      pipeline = pipeline.webp({ quality: config.quality })
    } else if (config.format === 'png') {
      pipeline = pipeline.png({ quality: config.quality })
    }

    await pipeline.toFile(destPath)

    const srcStats = await stat(srcPath)
    const destStats = await stat(destPath)
    const savings = ((1 - destStats.size / srcStats.size) * 100).toFixed(1)

    results.success.push({
      file: basename(destPath),
      original: `${(srcStats.size / 1024).toFixed(0)}KB`,
      optimized: `${(destStats.size / 1024).toFixed(0)}KB`,
      savings: `${savings}%`,
      dimensions: `${metadata.width}x${metadata.height}`,
    })

    console.log(
      `  ✓ ${basename(destPath)} — ${(srcStats.size / 1024).toFixed(0)}KB → ${(destStats.size / 1024).toFixed(0)}KB (${savings}% saved)`
    )
  } catch (err) {
    results.failed.push({ file: basename(srcPath), error: err.message })
    console.error(`  ✗ ${basename(srcPath)} — ${err.message}`)
  }
}

async function processFolder(folder) {
  const config = CONFIG[folder]
  if (!config) return

  const srcDir = join(ORIGINALS, folder)
  const destDir = join(BASE, folder)

  // Ensure destination exists
  await mkdir(destDir, { recursive: true })

  let files
  try {
    files = await readdir(srcDir)
  } catch {
    console.log(`  Skipping ${folder}/ — no originals found`)
    return
  }

  console.log(`\n📂 ${folder}/`)

  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue

    const srcPath = join(srcDir, file)
    const nameWithoutExt = basename(file, ext)

    // Determine output extension
    const outExt = config.format === 'webp' ? '.webp' : ext === '.png' ? '.png' : '.webp'
    const destPath = join(destDir, `${nameWithoutExt}${outExt}`)

    await optimizeImage(srcPath, destPath, config)
  }
}

async function main() {
  console.log('🖼️  Blackhorn Image Optimizer')
  console.log('━'.repeat(50))

  const folders = Object.keys(CONFIG)
  for (const folder of folders) {
    await processFolder(folder)
  }

  console.log('\n' + '━'.repeat(50))
  console.log(`\n✅ ${results.success.length} images optimized`)
  if (results.failed.length > 0) {
    console.log(`❌ ${results.failed.length} failed:`)
    results.failed.forEach((f) => console.log(`   - ${f.file}: ${f.error}`))
  }

  // Total savings
  const totalOriginal = results.success.reduce(
    (sum, r) => sum + parseInt(r.original),
    0
  )
  const totalOptimized = results.success.reduce(
    (sum, r) => sum + parseInt(r.optimized),
    0
  )
  const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1)
  console.log(
    `\n📊 Total: ${totalOriginal}KB → ${totalOptimized}KB (${totalSavings}% saved)`
  )
}

main().catch(console.error)
