import type { ReactNode } from 'react'

export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl bg-[color:var(--km-surface)] ring-1 ring-[color:var(--km-ring)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  )
}

