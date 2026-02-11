import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-8 py-3 font-sans text-xs uppercase tracking-widest transition-all duration-300'

  const variants = {
    primary:
      'bg-gold text-dark hover:bg-gold-light hover:-translate-y-0.5',
    outline:
      'border border-gold text-gold hover:border-gold-light hover:text-gold-light',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const styles = `${base} ${variants[variant]} ${disabledStyles} ${className}`

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  )
}
