import type { HTMLAttributes } from 'react'
import { cx } from '@/shared/lib'
import s from './Card.module.css'

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Grey borderless variant for feature blocks. */
  flat?: boolean
  selected?: boolean
}

export function Card({ flat, selected, className, onClick, ...rest }: Props) {
  return (
    <div
      className={cx(s.card, flat && s.flat, selected && s.selected, onClick && s.clickable, className)}
      onClick={onClick}
      {...rest}
    />
  )
}
