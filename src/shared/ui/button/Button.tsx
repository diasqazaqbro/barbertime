import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '@/shared/lib'
import s from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'danger' | 'danger-ghost'
  size?: 'sm' | 'md'
  block?: boolean
  /** Renders a router link styled as a button. */
  to?: string
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', block, to, className, children, ...rest }: Props) {
  const classes = cx(s.btn, s[variant], size === 'sm' && s.sm, block && s.block, className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
