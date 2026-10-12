import { NavLink } from 'react-router-dom'
import { ThemeToggle } from '@/features/toggle-theme'
import { paths } from '@/shared/config'
import { cx } from '@/shared/lib'
import { Button, Logo } from '@/shared/ui'
import s from './Navbar.module.css'

const LINKS = [
  { to: paths.home, label: 'Home' },
  { to: paths.services, label: 'Services' },
  { to: paths.barbers, label: 'Barbers' },
  { to: paths.myBookings, label: 'My bookings' },
  { to: paths.contacts, label: 'Contacts' },
]

/** Sticky frosted top bar. Links are hidden on phones — the TabBar takes over. */
export function Navbar() {
  return (
    <header className={s.navbar}>
      <div className={s.inner}>
        <Logo />
        <nav className={s.links} aria-label="Main">
          {LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === paths.home} className={({ isActive }) => cx(s.link, isActive && s.active)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={s.actions}>
          <ThemeToggle />
          <Button to={paths.book()} size="sm">
            Book now
          </Button>
        </div>
      </div>
    </header>
  )
}
