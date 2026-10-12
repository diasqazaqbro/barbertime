import { cx } from '@/shared/lib'
import s from './TimeSlotPicker.module.css'

type Slot = { time: string; taken: boolean }

type Props = {
  slots: Slot[]
  value: string | null
  onChange: (time: string) => void
  /** Always 4 columns (for small cards). */
  compact?: boolean
  showLegend?: boolean
}

export function TimeSlotPicker({ slots, value, onChange, compact, showLegend }: Props) {
  return (
    <div>
      <div className={cx(s.grid, compact && s.compact)} role="group" aria-label="Time">
        {slots.map(({ time, taken }) => (
          <button
            key={time}
            type="button"
            className={cx(s.slot, taken && s.taken, value === time && s.selected)}
            disabled={taken}
            aria-pressed={value === time}
            onClick={() => onChange(time)}
          >
            {time}
          </button>
        ))}
      </div>

      {showLegend && (
        <div className={s.legend} aria-hidden="true">
          <span><i className={s.swatch} /> Free</span>
          <span><i className={cx(s.swatch, s.taken)} /> Taken</span>
          <span><i className={cx(s.swatch, s.selected)} /> Selected</span>
        </div>
      )}
    </div>
  )
}
