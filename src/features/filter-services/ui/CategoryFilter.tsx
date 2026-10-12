import { CATEGORIES, type Category } from '@/entities/service'
import { Chip } from '@/shared/ui'
import s from './CategoryFilter.module.css'

type Props = { value: Category | null; onChange: (category: Category | null) => void }

export function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className={s.chips} role="group" aria-label="Filter by category">
      <Chip active={value === null} onClick={() => onChange(null)}>
        All
      </Chip>
      {CATEGORIES.map((category) => (
        <Chip key={category} active={value === category} onClick={() => onChange(category)}>
          {category}
        </Chip>
      ))}
    </div>
  )
}
