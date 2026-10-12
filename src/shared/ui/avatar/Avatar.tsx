import { cx } from '@/shared/lib'
import s from './Avatar.module.css'

type Props = { name: string; size?: 'sm' | 'md' | 'lg'; tone?: 'accent' | 'gray' }

/** Initials avatar — decorative, the name is always rendered next to it. */
export function Avatar({ name, size = 'md', tone = 'accent' }: Props) {
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <span className={cx(s.avatar, s[size], s[tone])} aria-hidden="true">
      {initials}
    </span>
  )
}
