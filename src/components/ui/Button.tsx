import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'outline'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300'

  const variants = {
    primary: 'bg-gold text-dark hover:bg-gold-light',
    outline: 'border border-gold text-gold hover:bg-gold hover:text-dark',
  }

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  )
}
