import type { ReactNode } from 'react'
import { cx } from '@/shared/lib'
import s from './Grid.module.css'

type Props = {
  children: ReactNode
  /** md: 3 columns on desktop, sm: 4 columns. Both collapse to 1 column on phones. */
  size?: 'md' | 'sm'
  className?: string
}

export function Grid({ children, size = 'md', className }: Props) {
  return <div className={cx(s.grid, s[size], className)}>{children}</div>
}
