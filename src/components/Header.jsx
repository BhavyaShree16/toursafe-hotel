import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/header.css'

export default function Header() {
  const { hotel, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-dot" />
        <span className="header-system">TourSafe</span>
        <span className="header-divider">/</span>
        <span className="header-hotel">{hotel?.name}</span>
      </div>
      <div className="header-right">
        <div className="header-badge">
          <div className="header-avatar">
            {hotel?.name?.charAt(0)}
          </div>
          <div className="header-info">
            <span className="header-name">{hotel?.name}</span>
            <span className="header-email">{hotel?.email}</span>
          </div>
        </div>
        <button className="header-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}