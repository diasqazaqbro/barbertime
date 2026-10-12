import { Link } from 'react-router-dom'
import { paths, SHOP } from '@/shared/config'
import { Logo } from '@/shared/ui'
import s from './Footer.module.css'

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <Logo />
          <p>Online booking for a neighbourhood barbershop in Almaty.</p>
        </div>

        <div className={s.column}>
          <h2 className={s.title}>Visit</h2>
          <p>{SHOP.address}</p>
          <p>{SHOP.hours}</p>
          <a href={SHOP.phoneHref}>{SHOP.phone}</a>
        </div>

        <nav className={s.column} aria-label="Explore">
          <h2 className={s.title}>Explore</h2>
          <Link to={paths.services}>Services</Link>
          <Link to={paths.barbers}>Barbers</Link>
          <Link to={paths.contacts}>Contacts</Link>
        </nav>

        <nav className={s.column} aria-label="Booking">
          <h2 className={s.title}>Booking</h2>
          <Link to={paths.book()}>Book now</Link>
          <Link to={paths.myBookings}>My bookings</Link>
        </nav>

        <p className={s.copy}>
          © {new Date().getFullYear()} {SHOP.name}. Demo project for the IITU Full Stack course · Dias Adilov,
          Nurmuhammed Zaitin, Zhangir Isametov, Ilmurat Kassymov · IT1-2315
        </p>
      </div>
    </footer>
  )
}
