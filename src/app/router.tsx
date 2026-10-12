import { createBrowserRouter } from 'react-router-dom'
import { BarberProfilePage } from '@/pages/barber-profile'
import { BarbersPage } from '@/pages/barbers'
import { BookingPage } from '@/pages/booking'
import { ContactsPage } from '@/pages/contacts'
import { HomePage } from '@/pages/home'
import { MyBookingsPage } from '@/pages/my-bookings'
import { NotFoundPage } from '@/pages/not-found'
import { ServicesPage } from '@/pages/services'
import { paths } from '@/shared/config'
import { RootLayout } from './layouts/RootLayout'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: paths.home, element: <HomePage /> },
      { path: paths.services, element: <ServicesPage /> },
      { path: paths.barbers, element: <BarbersPage /> },
      { path: paths.barber(':id'), element: <BarberProfilePage /> },
      { path: paths.book(), element: <BookingPage /> },
      { path: paths.myBookings, element: <MyBookingsPage /> },
      { path: paths.contacts, element: <ContactsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
