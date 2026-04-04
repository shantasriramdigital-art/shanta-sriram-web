'use client'

import { motion, useReducedMotion, Variants } from 'framer-motion'
import { ReactNode } from 'react'
import { viewportConfig } from '@/lib/animations'

interface Props {
  children: ReactNode
  variants: Variants
  className?: string
  delay?: number
}

export function MotionSection({ children, variants, className, delay = 0 }: Props) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={shouldReduceMotion ? {} : variants}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MotionStagger({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={shouldReduceMotion ? {} : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
