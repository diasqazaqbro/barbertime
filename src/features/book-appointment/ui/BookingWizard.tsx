import { useEffect } from 'react'
import { Stepper } from '@/shared/ui'
import { STEPS, useBookingFlow } from '../model/useBookingFlow'
import { BarberStep } from './BarberStep'
import { BookingSuccess } from './BookingSuccess'
import { DateTimeStep } from './DateTimeStep'
import { ServiceStep } from './ServiceStep'

type Props = {
  serviceId?: string | null
  barberId?: string | null
}

export function BookingWizard(props: Props) {
  const flow = useBookingFlow(props)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [flow.step, flow.created])

  if (flow.created) return <BookingSuccess booking={flow.created} />

  return (
    <>
      <Stepper steps={STEPS} current={flow.step} onStepClick={flow.goToStep} />
      {flow.step === 0 && <ServiceStep selectedId={flow.service?.id} onSelect={flow.selectService} />}
      {flow.step === 1 && (
        <BarberStep selectedId={flow.barberId} onSelect={flow.selectBarber} onBack={() => flow.goToStep(0)} />
      )}
      {flow.step === 2 && <DateTimeStep flow={flow} />}
    </>
  )
}
