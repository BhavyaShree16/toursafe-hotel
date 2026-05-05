import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import '../styles/layout.css'

export default function Layout() {
  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-body">
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}