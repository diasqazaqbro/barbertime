import { useState } from 'react'
import { findBarber } from '@/entities/barber'
import { findService } from '@/entities/service'
import { paths, SHOP } from '@/shared/config'
import { formatPrice } from '@/shared/lib'
import { Avatar, Button, Card, Rating, TimeSlotPicker } from '@/shared/ui'
import s from './HomePage.module.css'

// Illustrative card in the hero; real availability lives on the booking page.
const PREVIEW = { barberId: 'alikhan', serviceId: 'skin-fade' }
const PREVIEW_SLOTS = [
  { time: '17:00', taken: true },
  { time: '17:30', taken: false },
  { time: '18:00', taken: false },
  { time: '18:30', taken: true },
  { time: '19:00', taken: false },
  { time: '19:30', taken: false },
  { time: '20:00', taken: true },
  { time: '20:30', taken: false },
]

export function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.heroText}>
        <span className={s.status}>
          <span className={s.live} aria-hidden="true" />
          Open today {SHOP.openingHours}
        </span>
        <h1 className={s.heroTitle}>
          Your barber, booked in <span className={s.mark}>30 seconds.</span>
        </h1>
        <p className={s.lead}>
          Pick a service, choose your barber and grab a free slot. No calls, no waiting, no back-and-forth in DMs.
        </p>
        <div className={s.heroActions}>
          <Button to={paths.book()}>Book now</Button>
          <Button to={paths.services} variant="secondary">
            See services
          </Button>
        </div>
      </div>
      <PreviewCard />
    </section>
  )
}

function PreviewCard() {
  const [time, setTime] = useState('18:00')
  const barber = findBarber(PREVIEW.barberId)
  const service = findService(PREVIEW.serviceId)
  if (!barber || !service) return null

  return (
    <Card className={s.preview}>
      <div className={s.previewHead}>
        <Avatar name={barber.name} />
        <div className={s.previewWho}>
          <b>{barber.name}</b>
          <span>{barber.title}</span>
        </div>
        <Rating value={barber.rating} />
      </div>
      <TimeSlotPicker slots={PREVIEW_SLOTS} value={time} onChange={setTime} compact />
      <div className={s.previewMeta}>
        <span>
          {service.name} · {time}
        </span>
        <b>{formatPrice(service.price)}</b>
      </div>
      <Button to={paths.book({ service: service.id, barber: barber.id })} block>
        Book with {barber.name}
      </Button>
    </Card>
  )
}
