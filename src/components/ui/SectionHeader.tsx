interface SectionHeaderProps {
  overline: string
  title: string
  highlight?: string
  className?: string
}

export default function SectionHeader({
  overline,
  title,
  highlight,
  className = '',
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!highlight) return title

    const index = title.indexOf(highlight)
    if (index === -1) return title

    const before = title.slice(0, index)
    const after = title.slice(index + highlight.length)

    return (
      <>
        {before}
        <span className="italic text-gold">{highlight}</span>
        {after}
      </>
    )
  }

  return (
    <div className={`mb-16 text-center ${className}`}>
      <p className="font-sans text-xs uppercase tracking-widest text-gold">
        {overline}
      </p>
      <h2 className="mt-4 font-serif text-4xl font-light text-light md:text-5xl lg:text-6xl">
        {renderTitle()}
      </h2>
    </div>
  )
}
