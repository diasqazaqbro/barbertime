import { SERVICES, ServiceCard } from '@/entities/service'
import { Grid, SectionHeader } from '@/shared/ui'
import { SelectButton } from './StepControls'

type Props = { selectedId?: string; onSelect: (id: string) => void }

export function ServiceStep({ selectedId, onSelect }: Props) {
  return (
    <section>
      <SectionHeader compact title="Choose a service" subtitle="Every price is final. Duration includes wash and styling." />
      <Grid>
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={service.id === selectedId}
            onClick={() => onSelect(service.id)}
            action={<SelectButton selected={service.id === selectedId} label={service.name} />}
          />
        ))}
      </Grid>
    </section>
  )
}
