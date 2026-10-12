import type { ReactNode } from 'react'
import { Icon, type IconName } from '../icon/Icon'
import s from './EmptyState.module.css'

type Props = {
  icon: IconName
  title: string
  text: string
  actions?: ReactNode
  as?: 'h1' | 'h2'
}

export function EmptyState({ icon, title, text, actions, as: Heading = 'h2' }: Props) {
  return (
    <div className={s.empty}>
      <span className={s.icon}>
        <Icon name={icon} size={26} />
      </span>
      <Heading className={s.title}>{title}</Heading>
      <p className={s.text}>{text}</p>
      {actions && <div className={s.actions}>{actions}</div>}
    </div>
  )
}
