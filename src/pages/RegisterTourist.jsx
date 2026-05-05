import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import '../styles/form.css'

const TN_DISTRICTS = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Vellore', 'Erode', 'Nilgiris', 'Dindigul',
  'Thanjavur', 'Kanyakumari', 'Pudukottai', 'Ramanathapuram',
  'Virudhunagar', 'Thoothukudi', 'Nagapattinam', 'Cuddalore',
  'Villupuram', 'Krishnagiri', 'Dharmapuri', 'Namakkal', 'Karur',
  'Perambalur', 'Ariyalur', 'Sivaganga', 'Theni', 'Tiruppur',
  'Tiruvallur', 'Kancheepuram', 'Tiruvannamalai', 'Kallakurichi',
  'Ranipet', 'Tenkasi', 'Chengalpattu', 'Mayiladuthurai'
]
export default function RegisterTourist() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', phone: '', nationality: '', idNumber: '',
    checkIn: '', checkOut: '', place: '',district: '',
    roomNumber: '', purpose: '',
    emergencyName: '', emergencyPhone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/api/tourists/register', form)
      setSuccess(data)
      setForm({
        name: '', phone: '', nationality: '', idNumber: '',
        checkIn: '', checkOut: '', place: '',
        roomNumber: '', purpose: '',
        emergencyName: '', emergencyPhone: ''
      })
      setTimeout(() => navigate('/tourists'), 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Register Tourist</h1>
          <p className="pageSubtitle">Tourist receives a WhatsApp safety briefing automatically on submission</p>
        </div>
      </div>

      {success && (
        <div className="successBanner">
          Tourist registered — ID: <strong>{success.touristId}</strong> — redirecting to list...
        </div>
      )}

      {error && (
        <div className="errorBanner">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="form">

        <div className="section">
          <div className="sectionLabel">
            <div className="sectionIcon">01</div>
            <span>Personal Details</span>
          </div>
          <div className="grid">
            <div className="field">
              <label className="label">Full Name</label>
              <input className="input" name="name" placeholder="e.g. Rahul Sharma"
                value={form.name} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label">Phone Number</label>
              <input className="input" name="phone" placeholder="+91 98765 43210"
                value={form.phone} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label">Nationality</label>
              <input className="input" name="nationality" placeholder="e.g. Indian"
                value={form.nationality} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label">Passport / Aadhaar</label>
              <input className="input" name="idNumber" placeholder="Document number"
                value={form.idNumber} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="sectionLabel">
            <div className="sectionIcon">02</div>
            <span>Trip Details</span>
          </div>
          <div className="grid">
            <div className="field">
              <label className="label">Check-in Date</label>
              <input className="input" type="date" name="checkIn"
                value={form.checkIn} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label">Check-out Date</label>
              <input className="input" type="date" name="checkOut"
                value={form.checkOut} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label">Room Number</label>
              <input className="input" name="roomNumber" placeholder="e.g. 204"
                value={form.roomNumber} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label">Purpose of Visit</label>
              <select className="input" name="purpose"
                value={form.purpose} onChange={handleChange} required>
                <option value="">Select purpose</option>
                <option value="leisure">Leisure / Tourism</option>
                <option value="trekking">Trekking / Adventure</option>
                <option value="pilgrimage">Pilgrimage</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="field">
              <label className="label">District</label>
              <select className="input" name="district"
                value={form.district} onChange={handleChange} required>
                <option value="">Select district</option>
                {TN_DISTRICTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="field fullWidth">
              <label className="label">Specific Destination(s)</label>
              <input className="input" name="place"
                placeholder="e.g. Ooty Lake, Botanical Garden"
                value={form.place} onChange={handleChange} required />
              <span className="hint">Specific places within the district</span>
</div>
          </div>
        </div>

        <div className="section">
          <div className="sectionLabel">
            <div className="sectionIcon">03</div>
            <span>Emergency Contact</span>
          </div>
          <div className="grid">
            <div className="field">
              <label className="label">Contact Name</label>
              <input className="input" name="emergencyName" placeholder="e.g. Priya Sharma"
                value={form.emergencyName} onChange={handleChange} required />
            </div>
            <div className="field">
              <label className="label">Contact Phone</label>
              <input className="input" name="emergencyPhone" placeholder="+91 91234 56789 (include country code"
                value={form.emergencyPhone} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="footer">
          <p className="footerNote">
            Submitting will trigger an automated WhatsApp message to the tourist's phone number
          </p>
          <button type="submit" className="submitBtn" disabled={loading}>
            {loading ? 'Registering...' : 'Register & Send WhatsApp'}
          </button>
        </div>

      </form>
    </div>
  )
}