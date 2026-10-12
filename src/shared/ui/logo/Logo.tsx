import { Link } from 'react-router-dom'
import { paths, SHOP } from '@/shared/config'
import s from './Logo.module.css'

export function Logo() {
  return (
    <Link to={paths.home} className={s.logo}>
      <span className={s.dot} aria-hidden="true" />
      {SHOP.name}
    </Link>
  )
}
