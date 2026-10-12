import { useState } from 'react'
import { cancelBooking, type Booking } from '@/entities/booking'
import { Button, ConfirmDialog } from '@/shared/ui'

type Props = {
  booking: Booking
  /** Human-readable booking, e.g. "Skin fade with Alikhan, Mon 12 Oct at 18:00". */
  description: string
  onCancelled: () => void
}

export function CancelBookingButton({ booking, description, onCancelled }: Props) {
  const [open, setOpen] = useState(false)

  function confirm() {
    cancelBooking(booking.id)
    setOpen(false)
    onCancelled()
  }

  return (
    <>
      <Button size="sm" variant="danger-ghost" onClick={() => setOpen(true)}>
        Cancel
      </Button>
      <ConfirmDialog
        open={open}
        title="Cancel this booking?"
        confirmLabel="Cancel booking"
        cancelLabel="Keep booking"
        onConfirm={confirm}
        onClose={() => setOpen(false)}
      >
        {description}. The slot will be released for other clients.
      </ConfirmDialog>
    </>
  )
}
