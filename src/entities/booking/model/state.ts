import type { Booking, BookingState } from './types'

export const bookingStart = (booking: Booking) => new Date(`${booking.date}T${booking.time}`)

export function getBookingState(booking: Booking, now: Date): BookingState {
  if (booking.status === 'cancelled') return 'cancelled'
  return bookingStart(booking) > now ? 'upcoming' : 'completed'
}

/** Upcoming: soonest first. Past (completed + cancelled): latest first. */
export function splitBookings(bookings: Booking[], now: Date) {
  const byStart = (a: Booking, b: Booking) => bookingStart(a).getTime() - bookingStart(b).getTime()
  const upcoming = bookings.filter((b) => getBookingState(b, now) === 'upcoming').sort(byStart)
  const past = bookings
    .filter((b) => getBookingState(b, now) !== 'upcoming')
    .sort((a, b) => byStart(b, a))
  return { upcoming, past }
}
