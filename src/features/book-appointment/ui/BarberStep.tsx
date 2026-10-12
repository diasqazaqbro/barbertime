import { BARBERS, BarberCard } from '@/entities/barber'
import { Card, Grid, Icon, SectionHeader } from '@/shared/ui'
import { ANY_BARBER } from '../model/useBookingFlow'
import { BackButton, SelectButton } from './StepControls'
import s from './BookingWizard.module.css'

type Props = { selectedId: string | null; onSelect: (id: string) => void; onBack: () => void }

export function BarberStep({ selectedId, onSelect, onBack }: Props) {
  const anySelected = selectedId === ANY_BARBER

  return (
    <section>
      <SectionHeader
        compact
        title="Choose a barber"
        subtitle="Go with a favourite or let us match you with anyone free."
        action={<BackButton onClick={onBack} />}
      />
      <Grid size="sm">
        <Card className={s.anyCard} selected={anySelected} onClick={() => onSelect(ANY_BARBER)}>
          <span className={s.anyIcon}>
            <Icon name="sparkles" size={22} />
          </span>
          <h3 className={s.anyTitle}>Any barber</h3>
          <p className={s.anyText}>See the most free slots. We assign whoever is available.</p>
          <SelectButton selected={anySelected} label="any barber" />
        </Card>

        {BARBERS.map((barber) => (
          <BarberCard
            key={barber.id}
            barber={barber}
            selected={barber.id === selectedId}
            onClick={() => onSelect(barber.id)}
            action={<SelectButton selected={barber.id === selectedId} label={barber.name} />}
          />
        ))}
      </Grid>
    </section>
  )
}
