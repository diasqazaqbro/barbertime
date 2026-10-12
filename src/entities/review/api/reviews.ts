import type { Review } from '../model/types'

// Mock data — stands in for GET /barbers/:id/reviews until there is a backend.

const REVIEWS: Review[] = [
  { id: 'r1', barberId: 'arman', author: 'Yerlan K.', rating: 5, date: '2026-10-04', text: 'Best classic cut I have had in Almaty. On time, no small talk unless you want it.' },
  { id: 'r2', barberId: 'arman', author: 'Sanzhar B.', rating: 5, date: '2026-09-21', text: 'The royal shave is worth every tenge. Hot towels, zero irritation.' },
  { id: 'r3', barberId: 'arman', author: 'Ruslan T.', rating: 4, date: '2026-09-02', text: 'Great haircut, had to wait five minutes, but booking online was super quick.' },
  { id: 'r4', barberId: 'alikhan', author: 'Aibek M.', rating: 5, date: '2026-10-08', text: 'Cleanest skin fade in the city. Booked an evening slot right from my phone.' },
  { id: 'r5', barberId: 'alikhan', author: 'Dmitry S.', rating: 5, date: '2026-09-27', text: 'Line-up still looks sharp after ten days. Coming back every two weeks.' },
  { id: 'r6', barberId: 'alikhan', author: 'Nurlan A.', rating: 4, date: '2026-09-10', text: 'Very precise work. Would love more morning slots on weekends.' },
  { id: 'r7', barberId: 'timur', author: 'Askar Zh.', rating: 5, date: '2026-10-01', text: 'Finally a barber who understands beards. The shape fits my face perfectly.' },
  { id: 'r8', barberId: 'timur', author: 'Marat O.', rating: 4, date: '2026-09-15', text: 'Relaxing hot towel ritual and good advice on beard oil.' },
  { id: 'r9', barberId: 'daniyar', author: 'Aliya S.', rating: 5, date: '2026-10-06', text: 'My son usually hates haircuts. With Daniyar he was smiling the whole time.' },
  { id: 'r10', barberId: 'daniyar', author: 'Temirlan R.', rating: 5, date: '2026-09-19', text: 'Asked for a textured crop and got exactly the picture I showed. Fast and friendly.' },
]

export const getReviewsByBarber = (barberId: string) => REVIEWS.filter((review) => review.barberId === barberId)
