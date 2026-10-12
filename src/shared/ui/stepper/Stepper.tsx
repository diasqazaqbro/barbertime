import { cx } from '@/shared/lib'
import { Icon } from '../icon/Icon'
import s from './Stepper.module.css'

type Props = {
  steps: string[]
  current: number
  /** Completed steps become clickable to go back. */
  onStepClick?: (index: number) => void
}

export function Stepper({ steps, current, onStepClick }: Props) {
  return (
    <ol className={s.stepper}>
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo'
        return (
          <li key={label} className={cx(s.step, s[state])} aria-current={i === current ? 'step' : undefined}>
            {i > 0 && <span className={s.line} aria-hidden="true" />}
            <button
              type="button"
              className={s.button}
              disabled={state !== 'done' || !onStepClick}
              onClick={() => onStepClick?.(i)}
              aria-label={`Step ${i + 1}: ${label}`}
            >
              <span className={s.dot}>{state === 'done' ? <Icon name="check" size={14} /> : i + 1}</span>
              <span className={s.label}>{label}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}
