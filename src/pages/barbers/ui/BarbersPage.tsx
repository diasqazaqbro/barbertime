import { BARBERS, BarberCard } from '@/entities/barber'
import { paths } from '@/shared/config'
import { Button, Grid, SectionHeader } from '@/shared/ui'

export function BarbersPage() {
  return (
    <>
      <SectionHeader
        as="h1"
        eyebrow="Barbers"
        title="Our barbers"
        subtitle="Pick a favourite or check who is free — every barber does every service."
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
    </>
  )
}
