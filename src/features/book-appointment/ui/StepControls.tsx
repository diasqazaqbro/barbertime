import { Button, Icon } from '@/shared/ui'

/** The card itself handles the click; this button gives keyboard users a focus target. */
export function SelectButton({ selected, label }: { selected: boolean; label: string }) {
  return (
    <Button size="sm" block variant={selected ? 'primary' : 'secondary'} aria-pressed={selected} aria-label={`Select ${label}`}>
      {selected ? 'Selected' : 'Select'}
    </Button>
  )
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button size="sm" variant="ghost" onClick={onClick}>
      <Icon name="arrow-left" size={16} />
      Back
    </Button>
  )
}
