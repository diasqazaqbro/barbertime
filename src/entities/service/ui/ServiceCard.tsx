import type { ReactNode } from 'react'
import { formatDuration, formatPrice } from '@/shared/lib'
import { Card, Icon, type IconName } from '@/shared/ui'
import type { Category, Service } from '../model/types'
import s from './ServiceCard.module.css'

const CATEGORY_ICON: Record<Category, IconName> = {
  Haircuts: 'scissors',
  Beard: 'razor',
  Combo: 'sparkles',
  Kids: 'smile',
}

type Props = {
  service: Service
  selected?: boolean
  onClick?: () => void
  /** Bottom slot: "Book" link, "Select" button, etc. */
  action?: ReactNode
}

export function ServiceCard({ service, selected, onClick, action }: Props) {
  return (
    <Card className={s.card} selected={selected} onClick={onClick}>
      <div className={s.top}>
        <span className={s.icon}>
          <Icon name={CATEGORY_ICON[service.category]} size={18} />
        </span>
        <span className={s.tag}>{service.category}</span>
      </div>
      <h3 className={s.name}>{service.name}</h3>
      <p className={s.description}>{service.description}</p>
      <div className={s.meta}>
        <span className={s.duration}>
          <Icon name="clock" size={16} />
          {formatDuration(service.duration)}
        </span>
        <span className={s.price}>{formatPrice(service.price)}</span>
      </div>
      {action}
    </Card>
  )
}
