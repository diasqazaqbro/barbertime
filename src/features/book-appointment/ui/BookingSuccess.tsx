import { findBarber } from '@/entities/barber'
import type { Booking } from '@/entities/booking'
import { findService } from '@/entities/service'
import { paths } from '@/shared/config'
import { formatDate, formatPrice } from '@/shared/lib'
import { Button, Card, Icon } from '@/shared/ui'
import { SummaryList } from './SummaryList'
import s from './BookingWizard.module.css'

export function BookingSuccess({ booking }: { booking: Booking }) {
  return (
    <section className={s.success} aria-live="polite">
      <span className={s.successIcon}>
        <Icon name="check" size={40} />
      </span>
      <h2 className={s.successTitle}>You're booked!</h2>
      <p className={s.muted}>We'll remind you 2 hours before your visit.</p>

      <Card className={s.successCard}>
        <SummaryList
          rows={[
            ['Service', findService(booking.serviceId)?.name],
            ['Barber', findBarber(booking.barberId)?.name],
            ['When', `${formatDate(booking.date)}, ${booking.time}`],
            ['Total', <span className={s.total}>{formatPrice(booking.price)}</span>],
          ]}
        />
      </Card>

      <div className={s.successActions}>
        <Button to={paths.myBookings} block>
          My bookings
        </Button>
        <Button to={paths.home} variant="secondary" block>
          Back to home
        </Button>
      </div>
    </section>
  )
}
