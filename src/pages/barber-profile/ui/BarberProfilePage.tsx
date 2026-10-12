import { Link, useParams } from 'react-router-dom'
import { findBarber } from '@/entities/barber'
import { getReviewsByBarber, ReviewCard } from '@/entities/review'
import { paths } from '@/shared/config'
import { Avatar, Button, Chip, EmptyState, Icon, Rating, SectionHeader } from '@/shared/ui'
import s from './BarberProfilePage.module.css'

export function BarberProfilePage() {
  const { id } = useParams()
  const barber = findBarber(id)

  if (!barber) {
    return (
      <EmptyState
        as="h1"
        icon="users"
        title="Barber not found"
        text="This profile doesn't exist or has been removed."
        actions={<Button to={paths.barbers}>All barbers</Button>}
      />
    )
  }

  const reviews = getReviewsByBarber(barber.id)

  return (
    <>
      <Link to={paths.barbers} className={s.back}>
        <Icon name="arrow-left" size={16} />
        All barbers
      </Link>

      <section className={s.profile}>
        <Avatar name={barber.name} size="lg" />
        <div>
          <p className={s.eyebrow}>{barber.title}</p>
          <h1 className={s.name}>{barber.name}</h1>
          <p className={s.meta}>
            <Rating value={barber.rating} count={barber.reviewCount} /> · {barber.experience} years experience
          </p>
          <p className={s.bio}>{barber.bio}</p>
          <div className={s.chips}>
            {barber.specialties.map((specialty) => (
              <Chip key={specialty}>{specialty}</Chip>
            ))}
          </div>
          <Button to={paths.book({ barber: barber.id })}>Book with {barber.name}</Button>
        </div>
      </section>

      <section className={s.reviews}>
        <SectionHeader compact title="Reviews" subtitle={`Latest of ${barber.reviewCount} reviews`} />
        <div className={s.reviewList}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </>
  )
}
