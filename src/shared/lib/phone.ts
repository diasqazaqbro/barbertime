/**
 * Progressive "+7 (7XX) XXX-XX-XX" mask for Kazakhstan numbers.
 * Separators appear only once the next digit exists, so backspace never gets stuck on ")" or "-".
 */
export function formatPhone(input: string) {
  const raw = input.trim()
  if (raw === '+' || raw === '+7') return raw
  const hasCountryCode = raw.startsWith('+7')
  let digits = raw.replace(/^\+7/, '').replace(/\D/g, '')
  // Pasted "8 701 ..." or "7701..." — drop the trunk / country prefix.
  if (digits.length === 11 && (digits[0] === '8' || (!hasCountryCode && digits[0] === '7'))) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  if (!digits) return ''

  let out = `+7 (${digits.slice(0, 3)}`
  if (digits.length > 3) out += `) ${digits.slice(3, 6)}`
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`
  return out
}

/** Kazakhstan mobile numbers are +7 7XX XXX XX XX. */
export const isValidPhone = (phone: string) => /^\+7 \(7\d{2}\) \d{3}-\d{2}-\d{2}$/.test(phone)
