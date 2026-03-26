import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function FadeIn({
  children,
  className = '',
  delay = 0,
  immediate = false,
}: {
  children: ReactNode
  className?: string
  delay?: number
  /** Use animate instead of whileInView — for above-the-fold content already in viewport */
  immediate?: boolean
}) {
  const reduced = useReducedMotion()

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

