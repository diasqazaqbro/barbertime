import type { ReactNode } from 'react'
import { cx, formatDate, formatPrice, parseDate, toMinutes, toTime } from '@/shared/lib'
import { Card } from '@/shared/ui'
import { getBookingState } from '../model/state'
import type { Booking, BookingState } from '../model/types'
import s from './BookingCard.module.css'

const STATE_LABEL: Record<BookingState, string> = {
  upcoming: 'Upcoming',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

type Props = {
  booking: Booking
  /** e.g. "Skin fade with Alikhan" — resolved by the caller, the entity doesn't know other entities. */
  title: string
  actions?: ReactNode
}

export function BookingCard({ booking, title, actions }: Props) {
  const state = getBookingState(booking, new Date())
  const end = toTime(toMinutes(booking.time) + booking.duration)

  return (
    <Card className={cx(s.card, state !== 'upcoming' && s.past)}>
      <div className={s.date} aria-hidden="true">
        <small>{formatDate(booking.date, { month: 'short' })}</small>
        <b>{parseDate(booking.date).getDate()}</b>
      </div>
      <div className={s.info}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.meta}>
          {formatDate(booking.date)} · {booking.time} – {end} · {formatPrice(booking.price)}
        </p>
      </div>
      <span className={cx(s.badge, s[state])}>{STATE_LABEL[state]}</span>
      {actions && <div className={s.actions}>{actions}</div>}
    </Card>
  )
}
