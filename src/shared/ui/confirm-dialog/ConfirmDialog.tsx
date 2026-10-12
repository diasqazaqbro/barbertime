import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Button } from '../button/Button'
import s from './ConfirmDialog.module.css'

type Props = {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onClose: () => void
}

/**
 * Confirmation for destructive actions. Native <dialog> gives focus trap and Esc for free.
 * Bottom sheet on phones, centred modal on desktop.
 */
export function ConfirmDialog({ open, title, children, confirmLabel, cancelLabel = 'Cancel', onConfirm, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog?.open) {
      dialog?.showModal()
      // Focus the safe option, so Enter never confirms a destructive action by accident (HIG).
      dialog?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    }
    if (!open && dialog?.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click on the dialog element itself is a click on the backdrop
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={s.body}>
        <span className={s.grabber} aria-hidden="true" />
        <h2 id={titleId} className={s.title}>
          {title}
        </h2>
        <p className={s.text}>{children}</p>
        <div className={s.actions}>
          <Button variant="danger" block onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button variant="secondary" block onClick={onClose} data-autofocus>
            {cancelLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
