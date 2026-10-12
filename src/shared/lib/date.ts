/** "18:30" → 1110 (minutes from midnight) */
export function toMinutes(time: string) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/** 1110 → "18:30" */
export const toTime = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

/** Local "YYYY-MM-DD". toISOString() would shift the day in UTC+5 around midnight. */
export const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

/** "YYYY-MM-DD" → Date at local midnight */
export const parseDate = (key: string) => new Date(`${key}T00:00`)

/** "2026-10-12" → "Mon 12 Oct" */
export const formatDate = (
  key: string,
  options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' },
) => parseDate(key).toLocaleDateString('en-GB', options)
