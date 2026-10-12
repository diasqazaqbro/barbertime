import type { ReactNode } from 'react'
import s from './BookingWizard.module.css'

export function SummaryList({ rows }: { rows: [label: string, value: ReactNode][] }) {
  return (
    <dl className={s.summaryList}>
      {rows.map(([label, value]) => (
        <div key={label} className={s.summaryRow}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
