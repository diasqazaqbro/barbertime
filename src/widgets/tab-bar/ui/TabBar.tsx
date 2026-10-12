import { NavLink } from 'react-router-dom'
import { paths } from '@/shared/config'
import { cx } from '@/shared/lib'
import { Icon, type IconName } from '@/shared/ui'
import s from './TabBar.module.css'

const TABS: { to: string; label: string; icon: IconName }[] = [
  { to: paths.home, label: 'Home', icon: 'home' },
  { to: paths.services, label: 'Services', icon: 'scissors' },
  { to: paths.barbers, label: 'Barbers', icon: 'users' },
  { to: paths.book(), label: 'Book', icon: 'calendar' },
  { to: paths.myBookings, label: 'My bookings', icon: 'list' },
]

/** iOS-style bottom navigation, shown only below 768px instead of a hamburger menu. */
export function TabBar() {
  return (
    <nav className={s.tabbar} aria-label="Tabs">
      {TABS.map(({ to, label, icon }) => (
        <NavLink key={to} to={to} end={to === paths.home} className={({ isActive }) => cx(s.tab, isActive && s.active)}>
          <span className={s.icon}>
            <Icon name={icon} size={22} />
          </span>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
