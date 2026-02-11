'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

interface CounterProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function Counter({
  target,
  prefix = '',
  suffix = '',
  duration = 2000,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, target, {
      duration: duration / 1000,
      ease: 'easeOut',
      onUpdate: (value) => setDisplayValue(Math.round(value)),
    })

    return () => controls.stop()
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}
