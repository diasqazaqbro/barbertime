export interface Barber {
  id: string
  name: string
  title: string
  rating: number
  reviewCount: number
  /** Years */
  experience: number
  specialties: string[]
  bio: string
}
