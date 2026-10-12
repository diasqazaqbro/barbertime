import { useState, type FormEvent } from 'react'
import { Button, Card, Icon, TextArea, TextField } from '@/shared/ui'
import s from './ContactForm.module.css'

/** Native constraint validation (required / type=email / minLength) — no custom rules needed. */
export function ContactForm() {
  const [sentBy, setSentBy] = useState<string | null>(null)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // No backend yet — the message is not sent anywhere, POST /messages goes here.
    setSentBy(String(new FormData(event.currentTarget).get('name')))
  }

  if (sentBy) {
    return (
      <Card className={s.card} aria-live="polite">
        <div className={s.sent}>
          <span className={s.sentIcon}>
            <Icon name="check" size={28} />
          </span>
          <h2 className={s.title}>Thanks, {sentBy}!</h2>
          <p className={s.text}>We got your message and will reply within one working day.</p>
          <Button variant="secondary" onClick={() => setSentBy(null)}>
            Send another message
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className={s.card}>
      <form onSubmit={submit}>
        <h2 className={s.title}>Write to us</h2>
        <p className={s.text}>Questions about services, gift cards or group bookings.</p>
        <TextField label="Name" name="name" autoComplete="name" required minLength={2} />
        <TextField label="Email" name="email" type="email" autoComplete="email" required />
        <TextArea label="Message" name="message" required minLength={10} />
        <Button type="submit" block className={s.submit}>
          Send message
        </Button>
      </form>
    </Card>
  )
}
