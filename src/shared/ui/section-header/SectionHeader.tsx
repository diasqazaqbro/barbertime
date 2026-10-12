import type { ReactNode } from 'react'
import { cx } from '@/shared/lib'
import s from './SectionHeader.module.css'

type Props = {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  /** Right-aligned slot, e.g. "All services" or "Back". */
  action?: ReactNode
  as?: 'h1' | 'h2'
  /** Smaller heading for steps and sub-sections. */
  compact?: boolean
}

export function SectionHeader({ eyebrow, title, subtitle, action, as: Heading = 'h2', compact }: Props) {
  return (
    <header className={cx(s.header, compact && s.compact)}>
      <div>
        {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
        <Heading className={Heading === 'h1' ? s.h1 : s.h2}>{title}</Heading>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}
