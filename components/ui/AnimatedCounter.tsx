'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Start animation on mount
    setHasStarted(true)
  }, [])

  useEffect(() => {
    if (!hasStarted) return
    const startTime = Date.now()
    const startValue = 0
    const endValue = value

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (endValue - startValue) * eased
      setCount(current)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [hasStarted, value, duration])

  const display = value < 10 ? count.toFixed(1) : Math.round(count).toLocaleString('en-IN')

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
