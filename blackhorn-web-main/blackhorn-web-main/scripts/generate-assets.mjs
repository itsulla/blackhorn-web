import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC_LOGO = path.join(ROOT, 'public/images/logo/Blackhorn Wealth Management.png')
const PUBLIC = path.join(ROOT, 'public')
const LOGO_DIR = path.join(PUBLIC, 'images/logo')

const DARK_BG = '#0A0A0F'
const GOLD = '#C9A96E'

async function main() {
  console.log('Generating image assets...\n')

  const srcMeta = await sharp(SRC_LOGO).metadata()
  console.log(`Source: ${srcMeta.width}x${srcMeta.height}`)

  // ---- Full logo variants ----
  console.log('Creating logo variants...')
  fs.copyFileSync(SRC_LOGO, path.join(LOGO_DIR, 'logo-full.png'))
  console.log('  -> logo-full.png (original)')

  await sharp(SRC_LOGO)
    .negate({ alpha: false })
    .toFile(path.join(LOGO_DIR, 'logo-full-light.png'))
  console.log('  -> logo-full-light.png (inverted)')

  // ---- Extract horn mark ----
  console.log('Extracting horn mark...')
  const markWidth = Math.round(srcMeta.width * 0.25)

  // Step 1: extract left portion to buffer
  const extractedBuf = await sharp(SRC_LOGO)
    .extract({ left: 0, top: 0, width: markWidth, height: srcMeta.height })
    .toBuffer()

  // Step 2: trim whitespace from extracted buffer
  await sharp(extractedBuf)
    .trim()
    .toFile(path.join(LOGO_DIR, 'logo-mark.png'))
  console.log('  -> logo-mark.png (dark horn)')

  // Step 3: light version
  const trimmedBuf = await sharp(extractedBuf).trim().toBuffer()
  await sharp(trimmedBuf)
    .negate({ alpha: false })
    .toFile(path.join(LOGO_DIR, 'logo-mark-light.png'))
  console.log('  -> logo-mark-light.png (light horn)')

  const markMeta = await sharp(path.join(LOGO_DIR, 'logo-mark-light.png')).metadata()
  console.log(`  Horn mark: ${markMeta.width}x${markMeta.height}`)

  // ---- Favicons ----
  console.log('Generating favicons...')

  async function createIcon(size, filename) {
    const padding = Math.round(size * 0.12)
    const innerSize = size - padding * 2

    const resizedMark = await sharp(path.join(LOGO_DIR, 'logo-mark-light.png'))
      .resize(innerSize, innerSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer()

    await sharp({
      create: { width: size, height: size, channels: 4, background: DARK_BG },
    })
      .composite([{ input: resizedMark, gravity: 'center' }])
      .png()
      .toFile(path.join(PUBLIC, filename))

    console.log(`  -> ${filename} (${size}x${size})`)
  }

  await createIcon(32, 'favicon.png')
  await createIcon(192, 'icon-192.png')
  await createIcon(512, 'icon-512.png')
  await createIcon(180, 'apple-touch-icon.png')

  fs.copyFileSync(path.join(PUBLIC, 'favicon.png'), path.join(PUBLIC, 'favicon.ico'))
  console.log('  -> favicon.ico')

  // ---- OG Image (1200x630) ----
  console.log('Generating OG image...')

  const ogW = 1200
  const ogH = 630
  const ogMarkH = Math.round(ogH * 0.7)

  const ogMark = await sharp(path.join(LOGO_DIR, 'logo-mark-light.png'))
    .resize(null, ogMarkH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .modulate({ brightness: 0.4 })
    .toBuffer()

  const ogMarkMeta = await sharp(ogMark).metadata()

  const svgOverlay = Buffer.from(`
    <svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
      <text x="520" y="285" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="300" letter-spacing="10" fill="#E8E8EC">BLACKHORN</text>
      <line x1="520" y1="315" x2="640" y2="315" stroke="${GOLD}" stroke-width="0.75" opacity="0.6"/>
      <text x="520" y="350" font-family="Arial, Helvetica, sans-serif" font-size="14" letter-spacing="3.5" fill="#8A8A9A">WEALTH MANAGEMENT  ·  HONG KONG</text>
    </svg>
  `)

  await sharp({
    create: { width: ogW, height: ogH, channels: 4, background: DARK_BG },
  })
    .composite([
      {
        input: ogMark,
        left: Math.round(ogW * 0.08),
        top: Math.round((ogH - ogMarkMeta.height) / 2),
      },
      { input: svgOverlay, left: 0, top: 0 },
    ])
    .png()
    .toFile(path.join(PUBLIC, 'og-image.png'))

  console.log('  -> og-image.png (1200x630)')

  console.log('\nDone!')
}

main().catch(console.error)
