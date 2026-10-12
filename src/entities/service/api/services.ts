import type { Category, Service } from '../model/types'

// Mock data — stands in for GET /services until there is a backend.

export const CATEGORIES: Category[] = ['Haircuts', 'Beard', 'Combo', 'Kids']

export const SERVICES: Service[] = [
  {
    id: 'classic-haircut',
    name: 'Classic haircut',
    category: 'Haircuts',
    description: 'Scissor and clipper cut tailored to your head shape.',
    duration: 45,
    price: 7000,
    popular: true,
  },
  {
    id: 'skin-fade',
    name: 'Skin fade',
    category: 'Haircuts',
    description: 'Seamless fade down to the skin with a sharp line-up.',
    duration: 45,
    price: 8000,
    popular: true,
  },
  {
    id: 'buzz-cut',
    name: 'Buzz cut',
    category: 'Haircuts',
    description: 'One clipper length all over. Clean, quick, no fuss.',
    duration: 30,
    price: 5000,
  },
  {
    id: 'beard-trim',
    name: 'Beard trim',
    category: 'Beard',
    description: 'Shape, line-up and a hot towel finish.',
    duration: 30,
    price: 4000,
  },
  {
    id: 'royal-shave',
    name: 'Royal shave',
    category: 'Beard',
    description: 'Straight-razor shave with hot towels and aftershave balm.',
    duration: 40,
    price: 6000,
  },
  {
    id: 'haircut-beard',
    name: 'Haircut + beard',
    category: 'Combo',
    description: 'Any haircut plus a complete beard trim, at a better price.',
    duration: 75,
    price: 10000,
    popular: true,
  },
  {
    id: 'father-son',
    name: 'Father & son',
    category: 'Combo',
    description: 'Two haircuts back to back: one for you, one for the kid.',
    duration: 75,
    price: 11000,
  },
  {
    id: 'kids-haircut',
    name: 'Kids haircut',
    category: 'Kids',
    description: 'For boys up to 12. Patient barbers, quick result.',
    duration: 30,
    price: 5000,
  },
]

export const findService = (id?: string | null) => SERVICES.find((service) => service.id === id)
