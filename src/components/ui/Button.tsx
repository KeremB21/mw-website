import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition will-change-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--km-fg)] focus-visible:ring-offset-2 focus-visible:ring-offset-white'

  const styles =
    variant === 'primary'
      ? 'bg-[color:var(--km-fg)] text-zinc-950 hover:opacity-90'
      : 'bg-[color:var(--km-surface)] text-[color:var(--km-fg)] ring-1 ring-[color:var(--km-ring)] hover:bg-[color:var(--km-surface-strong)]'

  return <button {...props} className={`${base} ${styles} ${className}`} />
}

