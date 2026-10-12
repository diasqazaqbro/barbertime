import { SCHEDULE } from '@/shared/config'
import { dateKey, toMinutes, toTime } from '@/shared/lib'
import type { Booking, TimeSlot } from './types'

const { open, close, step } = SCHEDULE

export const SLOT_TIMES = Array.from({ length: (close - open) / step }, (_, i) => toTime(open + i * step))

/** Deterministic pseudo-random "booked by other clients" pattern, ~30% of slots. */
function takenByOthers(barberId: string, date: string, time: string) {
  let hash = 2166136261
  for (const char of barberId + date + time) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  hash ^= hash >>> 15
  hash = Math.imul(hash, 0x2c1b3c6d)
  hash ^= hash >>> 12
  return (hash >>> 0) % 10 < 3
}

// Availability is simulated in the browser; becomes GET /availability once a backend exists.
export function isSlotFree(
  barberId: string,
  date: string,
  time: string,
  duration: number,
  bookings: Booking[],
  now: Date,
) {
  const start = toMinutes(time)
  const end = start + duration

  if (end > close) return false
  if (date === dateKey(now) && start <= now.getHours() * 60 + now.getMinutes()) return false
  for (let t = start; t < end; t += step) {
    if (takenByOthers(barberId, date, toTime(t))) return false
  }
  return !bookings.some(
    (b) =>
      b.status === 'booked' &&
      b.barberId === barberId &&
      b.date === date &&
      toMinutes(b.time) < end &&
      start < toMinutes(b.time) + b.duration,
  )
}

/** First barber among candidates who is free for the whole visit. */
export const findFreeBarber = (
  barberIds: string[],
  date: string,
  time: string,
  duration: number,
  bookings: Booking[],
  now: Date,
) => barberIds.find((id) => isSlotFree(id, date, time, duration, bookings, now))

/** Day grid: a slot is free if at least one of the candidate barbers is free. */
export const getSlots = (
  barberIds: string[],
  date: string,
  duration: number,
  bookings: Booking[],
  now: Date,
): TimeSlot[] =>
  SLOT_TIMES.map((time) => ({
    time,
    taken: !findFreeBarber(barberIds, date, time, duration, bookings, now),
  }))
