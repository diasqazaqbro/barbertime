export interface Review {
  id: string
  barberId: string
  author: string
  rating: number
  /** YYYY-MM-DD */
  date: string
  text: string
}
