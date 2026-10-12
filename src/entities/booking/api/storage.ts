import { addDays, dateKey } from '@/shared/lib'
import type { Booking, NewBooking } from '../model/types'

// The "server" is localStorage: swap these four functions for fetch() calls later.
const STORAGE_KEY = 'barbertime:bookings'

/** Mock history so "My bookings" isn't empty on the first visit. Dates are relative to today. */
function seedBookings(): Booking[] {
  const today = new Date()
  const guest = { name: 'Dias', phone: '+7 (701) 234-56-78', status: 'booked' as const }
  return [
    { id: 'seed-1', serviceId: 'skin-fade', barberId: 'alikhan', date: dateKey(addDays(today, 2)), time: '18:00', duration: 45, price: 8000, ...guest },
    { id: 'seed-2', serviceId: 'classic-haircut', barberId: 'arman', date: dateKey(addDays(today, -28)), time: '15:00', duration: 45, price: 7000, ...guest },
    { id: 'seed-3', serviceId: 'haircut-beard', barberId: 'timur', date: dateKey(addDays(today, -53)), time: '19:30', duration: 75, price: 10000, ...guest },
  ]
}

export function loadBookings(): Booking[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (Array.isArray(stored)) return stored
  } catch {
    // Storage blocked or corrupted — fall back to mock data.
  }
  return seedBookings()
}

/** Returns false when storage is unavailable (private mode, quota, disabled cookies). */
function saveBookings(bookings: Booking[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
    return true
  } catch {
    return false
  }
}

export function addBooking(data: NewBooking): Booking | null {
  const booking: Booking = { ...data, id: Date.now().toString(36), status: 'booked' }
  return saveBookings([...loadBookings(), booking]) ? booking : null
}

export function cancelBooking(id: string) {
  return saveBookings(loadBookings().map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)))
}
