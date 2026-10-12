import { BARBERS, BarberCard } from '@/entities/barber'
import { SERVICES, ServiceCard } from '@/entities/service'
import { paths } from '@/shared/config'
import { Button, Card, Grid, Icon, SectionHeader, type IconName } from '@/shared/ui'
import { Hero } from './Hero'
import s from './HomePage.module.css'

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  { icon: 'clock', title: 'Live free slots', text: "See every barber's real availability for the next 7 days." },
  { icon: 'chat', title: 'No calls or DMs', text: 'Pick a service, a barber and a time — done.' },
  { icon: 'bell', title: 'Reminders', text: 'We remind you before your visit, so you never miss a slot.' },
]

const HOW_IT_WORKS = [
  { title: 'Pick a service', text: 'Haircut, fade, beard or combo. Every price is final.' },
  { title: 'Choose your barber', text: 'Go with a favourite or let us match you with anyone free.' },
  { title: 'Grab a free slot', text: 'Only real free times are shown. Confirm with your phone number.' },
]

export function HomePage() {
  const popular = SERVICES.filter((service) => service.popular)

  return (
    <>
      <Hero />

      <section aria-label="Why BarberTime">
        <Grid>
          {FEATURES.map((feature) => (
            <Card key={feature.title} flat>
              <span className={s.featureIcon}>
                <Icon name={feature.icon} />
              </span>
              <h3 className={s.cardTitle}>{feature.title}</h3>
              <p className={s.muted}>{feature.text}</p>
            </Card>
          ))}
        </Grid>
      </section>

      <section className={s.section}>
        <SectionHeader
          eyebrow="Services"
          title="Popular right now"
          subtitle="Transparent prices, honest durations."
          action={
            <Button to={paths.services} variant="secondary" size="sm">
              All services
            </Button>
          }
        />
        <Grid>
          {popular.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              action={
                <Button to={paths.book({ service: service.id })} size="sm" block>
                  Book
                </Button>
              }
            />
          ))}
        </Grid>
      </section>

      <section className={s.section}>
        <SectionHeader
          eyebrow="Barbers"
          title="Meet the team"
          subtitle="Four barbers, one standard: you leave looking sharp."
          action={
            <Button to={paths.barbers} variant="secondary" size="sm">
              All barbers
            </Button>
          }
        />
        <Grid size="sm">
          {BARBERS.map((barber) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              action={
                <Button to={paths.barber(barber.id)} variant="secondary" size="sm" block>
                  View profile
                </Button>
              }
            />
          ))}
        </Grid>
      </section>

      <section className={s.section}>
        <SectionHeader eyebrow="How it works" title="Three taps to a fresh cut" />
        <Grid>
          {HOW_IT_WORKS.map((step, i) => (
            <Card key={step.title}>
              <span className={s.stepNumber}>{i + 1}</span>
              <h3 className={s.cardTitle}>{step.title}</h3>
              <p className={s.muted}>{step.text}</p>
            </Card>
          ))}
        </Grid>
      </section>

      <section className={s.cta}>
        <div>
          <h2 className={s.ctaTitle}>Ready for a fresh look?</h2>
          <p>Free slots are going fast this week.</p>
        </div>
        <Button to={paths.book()} variant="dark">
          Book your slot
          <Icon name="arrow-right" size={18} />
        </Button>
      </section>
    </>
  )
}
