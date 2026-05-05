import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/sidebar.css'

export default function Sidebar() {
  const { hotel, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <div className="logo-icon"></div>
          <div>
            <p className="logo-title">TourSafe</p>
            <p className="logo-sub">Hotel Portal</p>
          </div>
        </div>

        {hotel && (
          <div className="hotel-name">{hotel.name}</div>
        )}

        <nav className="nav">
          <NavLink to="/dashboard" className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'}>
            Dashboard
          </NavLink>
          <NavLink to="/register" className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'}>
            Register Tourist
          </NavLink>
          <NavLink to="/tourists" className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'}>
            Tourist List
          </NavLink>
        </nav>
      </div>
    </aside>
  )
}