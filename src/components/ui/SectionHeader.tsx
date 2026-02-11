interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 text-center ${className}`}>
      <h2 className="font-serif text-4xl font-light text-light md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted">{subtitle}</p>
      )}
      <div className="mx-auto mt-6 h-px w-16 bg-gold" />
    </div>
  )
}
