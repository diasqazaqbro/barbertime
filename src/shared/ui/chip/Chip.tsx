import type { ReactNode } from 'react'
import { cx } from '@/shared/lib'
import s from './Chip.module.css'

type Props = {
  children: ReactNode
  active?: boolean
  /** With onClick the chip is a toggle button, otherwise a static label. */
  onClick?: () => void
  size?: 'sm' | 'md'
}

export function Chip({ children, active, onClick, size = 'md' }: Props) {
  const classes = cx(s.chip, s[size], active && s.active)

  if (!onClick) return <span className={classes}>{children}</span>
  return (
    <button type="button" className={classes} aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  )
}
