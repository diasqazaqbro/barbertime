import { paths } from '@/shared/config'
import { Button, EmptyState } from '@/shared/ui'

export function NotFoundPage() {
  return (
    <EmptyState
      as="h1"
      icon="scissors"
      title="404 — page not found"
      text="This page took a day off. The link may be broken or the page was moved."
      actions={
        <>
          <Button to={paths.home}>Back to home</Button>
          <Button to={paths.book()} variant="secondary">
            Book a visit
          </Button>
        </>
      }
    />
  )
}
