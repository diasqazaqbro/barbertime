import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from '@/widgets/footer'
import { Navbar } from '@/widgets/navbar'
import { TabBar } from '@/widgets/tab-bar'
import s from './RootLayout.module.css'

export function RootLayout() {
  return (
    <div className={s.shell}>
      <Navbar />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
      <TabBar />
      {/* Keyed by path: the default key is "default" for every fresh page load, which restores the wrong page's scroll. */}
      <ScrollRestoration getKey={(location) => location.pathname} />
    </div>
  )
}
