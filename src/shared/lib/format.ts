/** 7000 → "7 000 ₸" */
export const formatPrice = (tenge: number) => `${new Intl.NumberFormat('ru-RU').format(tenge)} ₸`

/** 75 → "1 h 15 min" */
export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(' ')
}
