import s from './Rating.module.css'

type Props = {
  value: number
  count?: number
  /** Five-star row instead of the compact "★ 4.9 (120)". */
  stars?: boolean
}

export function Rating({ value, count, stars }: Props) {
  if (stars) {
    const full = Math.round(value)
    return (
      <span className={s.stars} role="img" aria-label={`${value} out of 5 stars`}>
        {'★'.repeat(full)}
        <span className={s.off}>{'★'.repeat(5 - full)}</span>
      </span>
    )
  }

  return (
    <span className={s.rating}>
      <span className={s.star} aria-hidden="true">
        ★
      </span>
      {value.toFixed(1)}
      {count !== undefined && <span className={s.count}>({count})</span>}
    </span>
  )
}
