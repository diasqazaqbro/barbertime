import { useState } from 'react'
import { findBarber } from '@/entities/barber'
import { BookingCard, loadBookings, splitBookings, type Booking } from '@/entities/booking'
import { findService } from '@/entities/service'
import { CancelBookingButton } from '@/features/cancel-booking'
import { paths } from '@/shared/config'
import { formatDate } from '@/shared/lib'
import { Button, EmptyState, SectionHeader } from '@/shared/ui'
import s from './MyBookingsPage.module.css'

const titleOf = (booking: Booking) =>
  `${findService(booking.serviceId)?.name ?? 'Visit'} with ${findBarber(booking.barberId)?.name ?? 'a barber'}`

export function MyBookingsPage() {
  const [bookings, setBookings] = useState(loadBookings)
  const { upcoming, past } = splitBookings(bookings, new Date())
  const refresh = () => setBookings(loadBookings())

  return (
    <>
      <SectionHeader as="h1" eyebrow="Account" title="My bookings" />

      <section className={s.group}>
        <h2 className={s.groupTitle}>Upcoming</h2>
        {upcoming.length > 0 ? (
          <div className={s.list}>
            {upcoming.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                title={titleOf(booking)}
                actions={
                  <CancelBookingButton
                    booking={booking}
                    description={`${titleOf(booking)}, ${formatDate(booking.date)} at ${booking.time}`}
                    onCancelled={refresh}
                  />
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="calendar"
            title="No upcoming visits"
            text="Pick a service and grab a free slot — it takes about 30 seconds."
            actions={<Button to={paths.book()}>Book now</Button>}
          />
        )}
      </section>

      {past.length > 0 && (
        <section className={s.group}>
          <h2 className={s.groupTitle}>Past</h2>
          <div className={s.list}>
            {past.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                title={titleOf(booking)}
                actions={
                  <Button
                    to={paths.book({ service: booking.serviceId, barber: booking.barberId })}
                    variant="secondary"
                    size="sm"
                  >
                    Book again
                  </Button>
                }
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
