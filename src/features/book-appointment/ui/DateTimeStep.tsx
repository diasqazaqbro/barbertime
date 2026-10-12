import { formatDate, parseDate } from '@/shared/lib'
import { SectionHeader, TimeSlotPicker } from '@/shared/ui'
import type { BookingFlow } from '../model/useBookingFlow'
import { BookingSummary } from './BookingSummary'
import { BackButton } from './StepControls'
import s from './BookingWizard.module.css'

export function DateTimeStep({ flow }: { flow: BookingFlow }) {
  const whose = flow.isAnyBarber ? 'Free slots across all barbers' : `${flow.barber?.name}'s free slots`
  const hasFreeSlots = flow.slots.some((slot) => !slot.taken)

  return (
    <div className={s.dateLayout}>
      <section>
        <SectionHeader
          compact
          title="Choose date and time"
          subtitle={`${whose} for the next 7 days.`}
          action={<BackButton onClick={() => flow.goToStep(1)} />}
        />

        <div className={s.days} role="group" aria-label="Date">
          {flow.days.map((day, i) => (
            <button
              key={day}
              type="button"
              className={s.day}
              aria-pressed={day === flow.activeDate}
              aria-label={formatDate(day, { weekday: 'long', day: 'numeric', month: 'long' })}
              onClick={() => flow.selectDate(day)}
            >
              <small>{i === 0 ? 'Today' : formatDate(day, { weekday: 'short' })}</small>
              <b>{parseDate(day).getDate()}</b>
              <small>{formatDate(day, { month: 'short' })}</small>
            </button>
          ))}
        </div>

        <h3 className={s.subheading}>Time</h3>
        {hasFreeSlots ? (
          <TimeSlotPicker slots={flow.slots} value={flow.time} onChange={flow.selectTime} showLegend />
        ) : (
          <p className={s.muted}>No free slots on this day. Try another date.</p>
        )}
      </section>

      <BookingSummary flow={flow} />
    </div>
  )
}
