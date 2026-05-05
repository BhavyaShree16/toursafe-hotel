import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/login.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo" />
          <div>
            <p className="login-logo-title">TourSafe</p>
            <p className="login-logo-sub">Hotel Portal</p>
          </div>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Sign in to your hotel account</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">Email address</label>
            <input className="login-input" type="email" name="email"
              placeholder="hotel@example.com"
              value={form.email} onChange={handleChange} />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input className="login-input" type="password" name="password"
              placeholder="••••••••"
              value={form.password} onChange={handleChange} />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="login-footer">Tourist safety platform</p>
      </div>
    </div>
  )
}