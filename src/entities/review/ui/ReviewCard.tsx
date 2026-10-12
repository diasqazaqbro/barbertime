import { formatDate } from '@/shared/lib'
import { Avatar, Card, Rating } from '@/shared/ui'
import type { Review } from '../model/types'
import s from './ReviewCard.module.css'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <div className={s.head}>
        <Avatar name={review.author} size="sm" tone="gray" />
        <div className={s.who}>
          <b>{review.author}</b>
          <time dateTime={review.date}>{formatDate(review.date, { day: 'numeric', month: 'short', year: 'numeric' })}</time>
        </div>
        <Rating value={review.rating} stars />
      </div>
      <p className={s.text}>{review.text}</p>
    </Card>
  )
}
