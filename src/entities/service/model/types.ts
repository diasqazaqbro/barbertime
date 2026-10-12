export type Category = 'Haircuts' | 'Beard' | 'Combo' | 'Kids'

export interface Service {
  id: string
  name: string
  category: Category
  description: string
  /** Minutes */
  duration: number
  /** Tenge */
  price: number
  popular?: boolean
}
