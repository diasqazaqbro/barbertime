import { SERVICES, ServiceCard } from '@/entities/service'
import { CategoryFilter, useCategoryFilter } from '@/features/filter-services'
import { paths } from '@/shared/config'
import { Button, Grid, SectionHeader } from '@/shared/ui'

export function ServicesPage() {
  const [category, setCategory] = useCategoryFilter()
  const services = category ? SERVICES.filter((service) => service.category === category) : SERVICES

  return (
    <>
      <SectionHeader
        as="h1"
        eyebrow="Services"
        title="Services & prices"
        subtitle="Every price is final. Duration includes wash and styling."
      />
      <CategoryFilter value={category} onChange={setCategory} />
      <Grid>
        {services.map((service) => (
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
    </>
  )
}
