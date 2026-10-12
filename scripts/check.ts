// Run: npm run check — sanity checks for shared/lib (phone mask, prices, dates).
import assert from 'node:assert/strict'
import { dateKey, toMinutes, toTime } from '../src/shared/lib/date.ts'
import { formatDuration, formatPrice } from '../src/shared/lib/format.ts'
import { formatPhone, isValidPhone } from '../src/shared/lib/phone.ts'

assert.equal(formatPhone('7012345678'), '+7 (701) 234-56-78')
assert.equal(formatPhone('+7 (701) 234-56-789'), '+7 (701) 234-56-78') // extra digit ignored
assert.equal(formatPhone('8 701 234 56 78'), '+7 (701) 234-56-78') // pasted with trunk prefix
assert.equal(formatPhone('+77012345678'), '+7 (701) 234-56-78')
assert.equal(formatPhone('+7 (701) '), '+7 (701') // backspace over ")" works
assert.equal(formatPhone('+7 ('), '')
assert.equal(formatPhone('+'), '+')
assert.ok(isValidPhone('+7 (701) 234-56-78'))
assert.ok(!isValidPhone('+7 (701) 234-56'))
assert.ok(!isValidPhone('+7 (812) 234-56-78')) // not a KZ mobile code

assert.equal(formatPrice(7000).replace(/\s/g, ' '), '7 000 ₸')
assert.equal(formatDuration(75), '1 h 15 min')
assert.equal(formatDuration(60), '1 h')
assert.equal(formatDuration(45), '45 min')
assert.equal(toTime(toMinutes('18:00') + 45), '18:45')
assert.equal(dateKey(new Date(2026, 0, 5)), '2026-01-05')

console.log('shared/lib ok')
