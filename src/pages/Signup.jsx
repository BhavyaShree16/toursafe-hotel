import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import '../styles/login.css'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', city: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        city: form.city,
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('hotel', JSON.stringify(data.hotel))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
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

        <h1 className="login-title">Create account</h1>
        <p className="login-subtitle">Register your hotel on TourSafe</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">Hotel Name</label>
            <input className="login-input" type="text" name="name"
              placeholder="e.g. Hotel Japfu" value={form.name} onChange={handleChange} />
          </div>
          <div className="login-field">
            <label className="login-label">City</label>
            <input className="login-input" type="text" name="city"
              placeholder="e.g. Kohima" value={form.city} onChange={handleChange} />
          </div>
          <div className="login-field">
            <label className="login-label">Email address</label>
            <input className="login-input" type="email" name="email"
              placeholder="hotel@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="login-field">
            <label className="login-label">Password</label>
            <input className="login-input" type="password" name="password"
              placeholder="Min. 6 characters" value={form.password} onChange={handleChange} />
          </div>
          <div className="login-field">
            <label className="login-label">Confirm Password</label>
            <input className="login-input" type="password" name="confirm"
              placeholder="Repeat your password" value={form.confirm} onChange={handleChange} />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="login-switch">
          Already have an account?{' '}
          <Link to="/login" className="login-link">Sign in</Link>
        </p>
        <p className="login-footer">Tourist safety platform — Northeast India</p>
      </div>
    </div>
  )
}