interface SkeletonProps {
  className?: string
  /** Render as a circle (for avatars, icons) */
  circle?: boolean
}

/**
 * Content loading placeholder with a subtle shimmer animation.
 *
 * Usage:
 * ```tsx
 * // Text line
 * <Skeleton className="h-4 w-48" />
 *
 * // Paragraph block
 * <div className="space-y-3">
 *   <Skeleton className="h-4 w-full" />
 *   <Skeleton className="h-4 w-3/4" />
 *   <Skeleton className="h-4 w-5/6" />
 * </div>
 *
 * // Image placeholder
 * <Skeleton className="h-48 w-full" />
 *
 * // Avatar
 * <Skeleton circle className="h-10 w-10" />
 * ```
 */
export default function Skeleton({ className = '', circle = false }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gold/[0.06] ${circle ? 'rounded-full' : 'rounded'} ${className}`}
      aria-hidden="true"
    />
  )
}

/**
 * Pre-built skeleton for a card layout (icon + title + 3 lines of text).
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`border border-gold/8 bg-dark-card p-8 ${className}`}>
      <Skeleton className="h-8 w-8" />
      <Skeleton className="mt-5 h-5 w-32" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      <Skeleton className="mt-6 h-3 w-20" />
    </div>
  )
}

/**
 * Pre-built skeleton for a text block (heading + paragraph lines).
 */
export function SkeletonText({
  lines = 3,
  className = '',
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Skeleton className="h-6 w-48" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-3 ${i === lines - 1 ? 'w-3/5' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  )
}
