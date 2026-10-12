import { isValidPhone } from '@/shared/lib'

export interface Contact {
  name: string
  phone: string
}

export type ContactErrors = Partial<Record<keyof Contact, string>>

export function validateContact({ name, phone }: Contact): ContactErrors {
  const errors: ContactErrors = {}
  if (name.trim().length < 2) errors.name = 'Enter your name'
  if (!isValidPhone(phone)) errors.phone = 'Enter a full Kazakhstan mobile number'
  return errors
}
