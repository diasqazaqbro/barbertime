import { useMemo, useState } from 'react'
import { BARBERS, findBarber } from '@/entities/barber'
import { addBooking, findFreeBarber, getSlots, loadBookings, type Booking } from '@/entities/booking'
import { findService } from '@/entities/service'
import { addDays, dateKey } from '@/shared/lib'
import type { Contact } from './validation'

export const ANY_BARBER = 'any'
export const STEPS = ['Service', 'Barber', 'Date & time']
const DAYS_AHEAD = 7

type Step = 0 | 1 | 2

const isBarberChoice = (id?: string | null): id is string => id === ANY_BARBER || Boolean(findBarber(id))

type Options = {
  /** Preselected from the URL, e.g. "Book" on a service card. Invalid ids are ignored. */
  serviceId?: string | null
  barberId?: string | null
}

/**
 * State machine of the 3-step booking: service → barber (or "any") → date & time → confirm.
 * Preselected service/barber skip the steps they answer.
 */
export function useBookingFlow(initial: Options) {
  const [serviceId, setServiceId] = useState(() => findService(initial.serviceId)?.id ?? null)
  const [barberId, setBarberId] = useState(() => (isBarberChoice(initial.barberId) ? initial.barberId : null))
  const [step, setStep] = useState<Step>(() => (serviceId ? (barberId ? 2 : 1) : 0))
  const [date, setDate] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [bookings, setBookings] = useState(loadBookings)
  const [error, setError] = useState<string | null>(null)
  const [created, setCreated] = useState<Booking | null>(null)
  const [now] = useState(() => new Date())

  const service = findService(serviceId)
  const barber = findBarber(barberId)
  const isAnyBarber = barberId === ANY_BARBER
  const barberIds = isAnyBarber ? BARBERS.map((b) => b.id) : barber ? [barber.id] : []

  const days = useMemo(() => Array.from({ length: DAYS_AHEAD }, (_, i) => dateKey(addDays(now, i))), [now])
  const slotsFor = (day: string) => (service ? getSlots(barberIds, day, service.duration, bookings, now) : [])
  // Until the user picks a day, open the first one that still has free time.
  const activeDate = date ?? days.find((day) => slotsFor(day).some((slot) => !slot.taken)) ?? days[0]
  const slots = slotsFor(activeDate)

  function selectService(id: string) {
    setServiceId(id)
    setTime(null)
    setError(null)
    setStep(1)
  }

  function selectBarber(id: string) {
    setBarberId(id)
    setTime(null)
    setError(null)
    setStep(2)
  }

  function selectDate(day: string) {
    setDate(day)
    setTime(null)
    setError(null)
  }

  function selectTime(slot: string) {
    setTime(slot)
    setError(null)
  }

  function confirm(contact: Contact) {
    if (!service || !time) {
      setError('Pick a free time slot first.')
      return
    }

    // Re-check against fresh data: the slot may have been taken meanwhile (e.g. in another tab).
    const fresh = loadBookings()
    const assignedBarberId = findFreeBarber(barberIds, activeDate, time, service.duration, fresh, new Date())
    if (!assignedBarberId) {
      setBookings(fresh)
      setTime(null)
      setError('Sorry, that slot was just taken. Please pick another time.')
      return
    }

    const booking = addBooking({
      serviceId: service.id,
      barberId: assignedBarberId,
      date: activeDate,
      time,
      duration: service.duration,
      price: service.price,
      ...contact,
    })
    if (!booking) {
      setError("We couldn't save your booking: storage is blocked in this browser.")
      return
    }
    setCreated(booking)
  }

  return {
    step,
    goToStep: (index: number) => setStep(index as Step),
    service,
    barber,
    barberId,
    isAnyBarber,
    days,
    activeDate,
    slots,
    time,
    error,
    created,
    selectService,
    selectBarber,
    selectDate,
    selectTime,
    confirm,
  }
}

export type BookingFlow = ReturnType<typeof useBookingFlow>
