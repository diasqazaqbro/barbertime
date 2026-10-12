import type { ReactNode } from 'react'
import { Avatar, Card, Chip, Rating } from '@/shared/ui'
import type { Barber } from '../model/types'
import s from './BarberCard.module.css'

type Props = {
  barber: Barber
  selected?: boolean
  onClick?: () => void
  /** Bottom slot: "View profile" link, "Select" button, etc. */
  action?: ReactNode
}

export function BarberCard({ barber, selected, onClick, action }: Props) {
  return (
    <Card className={s.card} selected={selected} onClick={onClick}>
      <div className={s.head}>
        <Avatar name={barber.name} />
        <div>
          <h3 className={s.name}>{barber.name}</h3>
          <p className={s.title}>{barber.title}</p>
        </div>
      </div>
      <p className={s.meta}>
        <Rating value={barber.rating} count={barber.reviewCount} /> · {barber.experience} yrs experience
      </p>
      <div className={s.chips}>
        {barber.specialties.map((specialty) => (
          <Chip key={specialty} size="sm">
            {specialty}
          </Chip>
        ))}
      </div>
      {action}
    </Card>
  )
}
