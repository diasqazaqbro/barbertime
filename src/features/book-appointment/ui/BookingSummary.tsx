import { useState, type FormEvent } from 'react'
import { formatDate, formatPhone, formatPrice, toMinutes, toTime } from '@/shared/lib'
import { Button, Card, TextField } from '@/shared/ui'
import type { BookingFlow } from '../model/useBookingFlow'
import { validateContact, type Contact } from '../model/validation'
import { SummaryList } from './SummaryList'
import s from './BookingWizard.module.css'

export function BookingSummary({ flow }: { flow: BookingFlow }) {
  const [contact, setContact] = useState<Contact>({ name: '', phone: '' })
  const [touched, setTouched] = useState({ name: false, phone: false })
  const { service, time } = flow
  if (!service) return null

  const errors = validateContact(contact)

  function submit(event: FormEvent) {
    event.preventDefault()
    setTouched({ name: true, phone: true })
    if (!errors.name && !errors.phone) flow.confirm({ ...contact, name: contact.name.trim() })
  }

  return (
    <Card className={s.summary}>
      <form onSubmit={submit} noValidate>
        <h3>Summary</h3>
        <SummaryList
          rows={[
            ['Service', service.name],
            ['Barber', flow.isAnyBarber ? 'Any available' : flow.barber?.name],
            ['Date', formatDate(flow.activeDate)],
            ['Time', time ? `${time} – ${toTime(toMinutes(time) + service.duration)}` : '—'],
            ['Total', <span className={s.total}>{formatPrice(service.price)}</span>],
          ]}
        />

        <div className={s.fields}>
          <TextField
            label="Your name"
            autoComplete="name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            onBlur={() => setTouched({ ...touched, name: true })}
            error={touched.name ? errors.name : undefined}
          />
          <TextField
            label="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (7__) ___-__-__"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: formatPhone(e.target.value) })}
            onBlur={() => setTouched({ ...touched, phone: true })}
            error={touched.phone ? errors.phone : undefined}
          />
        </div>

        {flow.error && (
          <p className={s.formError} role="alert">
            {flow.error}
          </p>
        )}
        <Button type="submit" block disabled={!time}>
          {time ? 'Confirm booking' : 'Pick a time to continue'}
        </Button>
        <p className={s.note}>Free cancellation up to 2 hours before.</p>
      </form>
    </Card>
  )
}
