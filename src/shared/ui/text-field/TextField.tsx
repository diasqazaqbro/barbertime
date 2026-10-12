import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import s from './TextField.module.css'

type FieldProps = { label: string; error?: string }

function Field({ id, label, error, children }: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={s.error}>
          {error}
        </p>
      )}
    </div>
  )
}

const a11y = (id: string, error?: string) => ({
  id,
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `${id}-error` : undefined,
})

export function TextField({ label, error, id, ...rest }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId()
  const fieldId = id ?? autoId
  return (
    <Field id={fieldId} label={label} error={error}>
      <input className={s.control} {...a11y(fieldId, error)} {...rest} />
    </Field>
  )
}

export function TextArea({ label, error, id, ...rest }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const autoId = useId()
  const fieldId = id ?? autoId
  return (
    <Field id={fieldId} label={label} error={error}>
      <textarea className={s.control} {...a11y(fieldId, error)} {...rest} />
    </Field>
  )
}
