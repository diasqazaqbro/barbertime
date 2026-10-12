export const paths = {
  home: '/',
  services: '/services',
  barbers: '/barbers',
  barber: (id: string) => `/barbers/${id}`,
  book: ({ service, barber }: { service?: string; barber?: string } = {}) => {
    const query = new URLSearchParams()
    if (service) query.set('service', service)
    if (barber) query.set('barber', barber)
    const search = query.toString()
    return search ? `/book?${search}` : '/book'
  },
  myBookings: '/my-bookings',
  contacts: '/contacts',
} as const
