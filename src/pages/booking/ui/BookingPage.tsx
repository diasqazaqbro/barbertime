import { useLocation, useSearchParams } from 'react-router-dom'
import { BookingWizard } from '@/features/book-appointment'
import { SectionHeader } from '@/shared/ui'

export function BookingPage() {
  const [params] = useSearchParams()
  const { key } = useLocation()

  return (
    <>
      <SectionHeader as="h1" eyebrow="Online booking" title="Book a visit" />
      {/* New location key = fresh wizard, so "Book now" while already here starts over. */}
      <BookingWizard key={key} serviceId={params.get('service')} barberId={params.get('barber')} />
    </>
  )
}
