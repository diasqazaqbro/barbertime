/** Stored status. "Completed" is derived from the date, see getBookingState. */
export type BookingStatus = 'booked' | 'cancelled'

export type BookingState = 'upcoming' | 'completed' | 'cancelled'

export interface Booking {
  id: string
  serviceId: string
  barberId: string
  /** YYYY-MM-DD, local time */
  date: string
  /** HH:MM */
  time: string
  /** Snapshot at booking time, so later price list changes don't rewrite history. Minutes. */
  duration: number
  /** Snapshot at booking time. Tenge. */
  price: number
  name: string
  phone: string
  status: BookingStatus
}

export type NewBooking = Omit<Booking, 'id' | 'status'>

export interface TimeSlot {
  time: string
  taken: boolean
}
