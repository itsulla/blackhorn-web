import Image, { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  /** Base64 blur data URL for placeholder. When provided, shows blur placeholder while loading. */
  blurDataURL?: string
}

/**
 * Wrapper around next/image with sensible defaults:
 * - Lazy loading by default (override with `priority`)
 * - Automatic WebP/AVIF conversion via Next.js image optimizer
 * - Blur placeholder support when blurDataURL is provided
 * - Responsive srcSet generated automatically by Next.js
 *
 * Usage:
 * ```tsx
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="Hero"
 *   width={1200}
 *   height={630}
 *   blurDataURL="data:image/jpeg;base64,..."
 * />
 *
 * // Fill mode (parent must be position: relative)
 * <OptimizedImage
 *   src="/images/bg.jpg"
 *   alt="Background"
 *   fill
 *   className="object-cover"
 *   sizes="100vw"
 * />
 * ```
 */
export default function OptimizedImage({
  blurDataURL,
  loading,
  priority,
  sizes,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      {...props}
      loading={priority ? undefined : (loading ?? 'lazy')}
      priority={priority}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      sizes={sizes ?? (props.fill ? '100vw' : undefined)}
    />
  )
}
