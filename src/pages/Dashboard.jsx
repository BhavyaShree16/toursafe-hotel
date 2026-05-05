import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import '../styles/dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/tourists/stats')
      .then(({ data }) => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="dash-loading">Loading dashboard...</div>

  return (
    <div className="dash-page">
      <h1 className="dash-title">Dashboard</h1>
      <p className="dash-subtitle">Overview of your registered tourists</p>

      <div className="dash-stats">
        <div className="dash-card">
          <p className="dash-card-label">Active Tourists</p>
          <p className="dash-card-number">{stats?.active ?? 0}</p>
          <span className="dash-badge dash-badge-blue">Currently on trip</span>
        </div>
        <div className="dash-card">
          <p className="dash-card-label">Checked Out</p>
          <p className="dash-card-number">{stats?.departed ?? 0}</p>
          <span className="dash-badge dash-badge-green">This month</span>
        </div>
        <div className="dash-card">
          <p className="dash-card-label">Active Alerts</p>
          <p className="dash-card-number">{stats?.alerts ?? 0}</p>
          <span className="dash-badge dash-badge-red">Needs attention</span>
        </div>
        <div className="dash-card">
          <p className="dash-card-label">Total Registered</p>
          <p className="dash-card-number">{stats?.total ?? 0}</p>
          <span className="dash-badge dash-badge-blue">All time</span>
        </div>
      </div>

      <div className="dash-table-wrap">
        <div className="dash-table-header">
          <span>Recent Tourists</span>
          <span className="dash-table-link" onClick={() => navigate('/tourists')}>
            View all →
          </span>
        </div>

        {!stats?.recent?.length ? (
          <div className="dash-empty">
            No tourists registered yet.{' '}
            <span className="dash-empty-link" onClick={() => navigate('/register')}>
              Register your first tourist →
            </span>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Tourist</th>
                <th>Phone</th>
                <th>Destination</th>
                <th>Check-out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((t) => (
                <tr key={t._id}>
                  <td>
                    <div className="dash-tourist-cell">
                      <div className="dash-avatar">
                        {t.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="dash-tourist-name">{t.name}</p>
                        <span className="dash-tourist-nat">{t.nationality}</span>
                      </div>
                    </div>
                  </td>
                  <td>{t.phone}</td>
                  <td>{t.place}</td>
                  <td>{t.checkOut}</td>
                  <td>
                    <span className={`dash-status dash-status-${t.status}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}