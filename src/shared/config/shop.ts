import { toTime } from '../lib/date'

/** Working day (minutes from midnight) and booking grid step. */
export const SCHEDULE = { open: 10 * 60, close: 22 * 60, step: 30 } as const

const openingHours = `${toTime(SCHEDULE.open)}–${toTime(SCHEDULE.close)}`

export const SHOP = {
  name: 'BarberTime',
  address: 'Abay Ave 52, Almaty',
  addressNote: 'Demo address · 2 min walk from Baitursynov St',
  openingHours,
  hours: `Daily ${openingHours}`,
  phone: '+7 (700) 000-00-00',
  phoneHref: 'tel:+77000000000',
  email: 'hello@barbertime.kz',
} as const
