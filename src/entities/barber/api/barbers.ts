import type { Barber } from '../model/types'

// Mock data — stands in for GET /barbers until there is a backend.

export const BARBERS: Barber[] = [
  {
    id: 'arman',
    name: 'Arman',
    title: 'Senior barber',
    rating: 4.9,
    reviewCount: 214,
    experience: 8,
    specialties: ['Classic cuts', 'Royal shave'],
    bio: 'Arman opened the first chair at BarberTime. Calm hands, classic shapes and the best straight-razor shave on Abay Avenue.',
  },
  {
    id: 'alikhan',
    name: 'Alikhan',
    title: 'Fade specialist',
    rating: 4.8,
    reviewCount: 167,
    experience: 5,
    specialties: ['Skin fade', 'Line-ups'],
    bio: 'Alikhan lives for clean gradients. Skin fades, tapers and razor-sharp line-ups that still look good two weeks later.',
  },
  {
    id: 'timur',
    name: 'Timur',
    title: 'Beard expert',
    rating: 4.7,
    reviewCount: 98,
    experience: 6,
    specialties: ['Beard sculpting', 'Hot towel'],
    bio: 'Timur shapes beards to fit your face, not a trend. Expect hot towels, careful trimming and honest grooming advice.',
  },
  {
    id: 'daniyar',
    name: 'Daniyar',
    title: 'Barber',
    rating: 4.9,
    reviewCount: 73,
    experience: 3,
    specialties: ['Kids cuts', 'Textured crops'],
    bio: 'Daniyar is the one kids ask for by name. Patient, fast and great with modern textured crops for all ages.',
  },
]

export const findBarber = (id?: string | null) => BARBERS.find((barber) => barber.id === id)
